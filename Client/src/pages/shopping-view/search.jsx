

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
// import { motion } from "framer-motion";
// import debounce from "lodash.debounce";
// import { CheckCircle, AlertCircle } from "lucide-react";
// import { toast } from "sonner";

// function SearchProducts() {
//   const [keyword, setKeyword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { searchResults } = useSelector((state) => state.shopSearch);
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);

//   const debouncedSearch = debounce((value) => {
//     if (value.trim().length >= 3) {
//       setSearchParams(new URLSearchParams(`?keyword=${value}`));
//       setIsLoading(true);
//       dispatch(getSearchResults(value)).finally(() => setIsLoading(false));
//     } else {
//       setSearchParams(new URLSearchParams());
//       dispatch(resetSearchResults());
//     }
//   }, 300);

//   const handleSearchInputChange = (event) => {
//     setKeyword(event.target.value);
//     debouncedSearch(event.target.value);
//   };

//   const handleAddToCart = (getCurrentProductId, getTotalStock) => {
//     if (!user) {
//       navigate("/auth/login");
//       toast.warning("Please login to add to cart.");
//       return;
//     }

//     let getCartItems = cartItems.items || [];
//     if (getCartItems.length) {
//       const indexOfCurrentItem = getCartItems.findIndex(
//         (item) => item.productId === getCurrentProductId
//       );
//       if (indexOfCurrentItem > -1) {
//         const getQuantity = getCartItems[indexOfCurrentItem].quantity;
//         if (getQuantity + 1 > getTotalStock) {
//           toast.error(`Only ${getQuantity} quantity can be added for this item`, {
//             icon: <AlertCircle className="text-red-500" />,
//           });
//           return;
//         }
//       }
//     }

//     dispatch(
//       addToCart({
//         userId: user?.id,
//         productId: getCurrentProductId,
//         quantity: 1,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(user?.id));
//         toast.success("Product is added to cart", {
//           icon: <CheckCircle className="text-green-500" />,
//         });
//       }
//     });
//   };

//   const handleViewProductDetails = (productId) => {
//     navigate(`/shop/product/${productId}`);
//   };

//   return (
//     <div className="container mx-auto md:px-6 px-4 py-8">
//       <div className="flex justify-center mb-8">
//         <div className="w-full flex items-center">
//           <motion.div
//             initial={{ boxShadow: "0 0 0px rgba(0,0,0,0.2)" }}
//             whileFocus={{ boxShadow: "0 0 10px rgba(0,0,0,0.5)" }}
//           >
//             <Input
//               value={keyword}
//               name="keyword"
//               onChange={handleSearchInputChange}
//               className="py-6"
//               placeholder="Search Products..."
//             />
//           </motion.div>
//           {isLoading && (
//             <div className="loader border-t-4 border-gray-600 rounded-full w-6 h-6 animate-spin ml-2" />
//           )}
//         </div>
//       </div>

//       {!searchResults.length && !isLoading && (
//         <motion.h1
//           className="text-5xl font-extrabold"
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//         >
//           No result found!
//         </motion.h1>
//       )}

//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {searchResults.map((item) => (
//           <motion.div key={item.id} whileHover={{ scale: 1.05 }}>
//             <ShoppingProductTile
//               product={item}
//               handleAddToCart={handleAddToCart}
//               handleViewDetails={handleViewProductDetails}
//             />
//           </motion.div>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

// export default SearchProducts;



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { motion } from "framer-motion";
import debounce from "lodash.debounce";
import { CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { getOrCreateSessionId } from "@/components/utils/session";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  const debouncedSearch = debounce((value) => {
    if (value.trim().length >= 3) {
      setSearchParams(new URLSearchParams(`?keyword=${value}`));
      setIsLoading(true);
      dispatch(getSearchResults(value)).finally(() => setIsLoading(false));
    } else {
      setSearchParams(new URLSearchParams());
      dispatch(resetSearchResults());
    }
  }, 300);

  const handleSearchInputChange = (event) => {
    setKeyword(event.target.value);
    debouncedSearch(event.target.value);
  };

  const handleAddToCart = async (getCurrentProductId, getTotalStock) => {
    try {
      const userId = user?.id;
      const sessionId = userId ? null : getOrCreateSessionId(); // fallback sessionId only if userId is not available
  
      if (!userId && !sessionId) {
        throw new Error("Neither userId nor sessionId is available");
      }
  
      // Check stock for existing items
      const currentCartItems = cartItems?.items || [];
      const existingItem = currentCartItems.find(
        item => item.productId === getCurrentProductId
      );
  
      if (existingItem && existingItem.quantity >= getTotalStock) {
        toast.error(`Maximum available quantity (${getTotalStock}) reached`, {
          icon: <AlertCircle className="text-red-500" />,
        });
        return;
      }
  
      const response = await dispatch(
        addToCart({
          userId,
          productId: getCurrentProductId,
          quantity: 1,
          sessionId
        })
      ).unwrap();
  
      if (response.success) {
        await dispatch(fetchCartItems({ userId, sessionId })).unwrap();
        toast.success("Product added to cart", {
          icon: <CheckCircle className="text-green-500" />,
        });
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error("Failed to add product to cart");
    }
  };
  
  
  // In your useEffect for loading cart:
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = user?.id;
        const sessionId = userId ? null : getOrCreateSessionId();
  
        if (!userId && !sessionId) {
          console.warn("No user or session info available");
          return;
        }
  
        await dispatch(fetchCartItems({ userId, sessionId })).unwrap();
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        if (!user) {
          localStorage.removeItem('guestSessionId');
        }
      }
    };
  
    fetchCart();
  }, [dispatch, user]);
  

  const handleViewProductDetails = (productId) => {
    navigate(`/shop/product/${productId}`);
  };

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <motion.div
            initial={{ boxShadow: "0 0 0px rgba(0,0,0,0.2)" }}
            whileFocus={{ boxShadow: "0 0 10px rgba(0,0,0,0.5)" }}
          >
            <Input
              value={keyword}
              name="keyword"
              onChange={handleSearchInputChange}
              className="py-6"
              placeholder="Search Products..."
            />
          </motion.div>
          {isLoading && (
            <div className="loader border-t-4 border-gray-600 rounded-full w-6 h-6 animate-spin ml-2" />
          )}
        </div>
      </div>

      {!searchResults.length && !isLoading && (
        <motion.h1
          className="text-5xl font-extrabold"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          No result found!
        </motion.h1>
      )}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {searchResults.map((item) => (
          <motion.div key={item.id} whileHover={{ scale: 1.05 }}>
            <ShoppingProductTile
              product={item}
              handleAddToCart={handleAddToCart}
              handleViewDetails={handleViewProductDetails}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default SearchProducts;