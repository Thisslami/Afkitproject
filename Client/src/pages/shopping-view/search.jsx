



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
// import { getOrCreateSessionId } from "@/components/utils/session";

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

//   const handleAddToCart = async (getCurrentProductId, getTotalStock) => {
//     try {
//       const userId = user?.id;
//       const sessionId = userId ? null : getOrCreateSessionId(); // fallback sessionId only if userId is not available
  
//       if (!userId && !sessionId) {
//         throw new Error("Neither userId nor sessionId is available");
//       }
  
//       // Check stock for existing items
//       const currentCartItems = cartItems?.items || [];
//       const existingItem = currentCartItems.find(
//         item => item.productId === getCurrentProductId
//       );
  
//       if (existingItem && existingItem.quantity >= getTotalStock) {
//         toast.error(`Maximum available quantity (${getTotalStock}) reached`, {
//           icon: <AlertCircle className="text-red-500" />,
//         });
//         return;
//       }
  
//       const response = await dispatch(
//         addToCart({
//           userId,
//           productId: getCurrentProductId,
//           quantity: 1,
//           sessionId
//         })
//       ).unwrap();
  
//       if (response.success) {
//         await dispatch(fetchCartItems({ userId, sessionId })).unwrap();
//         toast.success("Product added to cart", {
//           icon: <CheckCircle className="text-green-500" />,
//         });
//       }
//     } catch (error) {
//       console.error('Add to cart error:', error);
//       toast.error("Failed to add product to cart");
//     }
//   };
  
  
//   // In your useEffect for loading cart:
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const userId = user?.id;
//         const sessionId = userId ? null : getOrCreateSessionId();
  
//         if (!userId && !sessionId) {
//           console.warn("No user or session info available");
//           return;
//         }
  
//         await dispatch(fetchCartItems({ userId, sessionId })).unwrap();
//       } catch (error) {
//         console.error('Failed to fetch cart:', error);
//         if (!user) {
//           localStorage.removeItem('guestSessionId');
//         }
//       }
//     };
  
//     fetchCart();
//   }, [dispatch, user]);
  

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
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { motion } from "framer-motion";
import debounce from "lodash.debounce";
import { CheckCircle, AlertCircle, Search, X } from "lucide-react";
import { toast } from "sonner";
import { getOrCreateSessionId } from "@/components/utils/session";
import { Button } from "@/components/ui/button";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  // Handle initial search from URL
  useEffect(() => {
    const searchQuery = searchParams.get("keyword");
    if (searchQuery) {
      setKeyword(searchQuery);
      setIsLoading(true);
      dispatch(getSearchResults(searchQuery)).finally(() => setIsLoading(false));
    } else {
      dispatch(resetSearchResults());
    }
  }, [location.search, dispatch]);

  const debouncedSearch = debounce((value) => {
    if (value.trim().length >= 2) {
      setSearchParams(new URLSearchParams(`?keyword=${value}`));
      setIsLoading(true);
      dispatch(getSearchResults(value)).finally(() => setIsLoading(false));
    } else {
      setSearchParams(new URLSearchParams());
      dispatch(resetSearchResults());
    }
  }, 500);

  const handleSearchInputChange = (event) => {
    setKeyword(event.target.value);
    debouncedSearch(event.target.value);
  };

  const clearSearch = () => {
    setKeyword("");
    setSearchParams(new URLSearchParams());
    dispatch(resetSearchResults());
  };

  const handleAddToCart = async (getCurrentProductId, getTotalStock) => {
    try {
      const userId = user?.id;
      const sessionId = userId ? null : getOrCreateSessionId();
  
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
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col items-center mb-8">
        <div className="w-full max-w-2xl relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              value={keyword}
              name="keyword"
              onChange={handleSearchInputChange}
              className="pl-10 pr-10 py-6 text-lg shadow-sm"
              placeholder="Search for products..."
            />
            {keyword && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </motion.div>
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="loader border-t-2 border-gray-600 rounded-full w-5 h-5 animate-spin" />
            </div>
          )}
        </div>
      </div>

      {!isLoading && searchResults.length === 0 && keyword && (
        <motion.div
          className="flex flex-col items-center justify-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Search className="h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            No results found
          </h2>
          <p className="text-gray-500 mb-6">
            We couldn't find any products matching "{keyword}"
          </p>
          <Button
            variant="outline"
            onClick={() => navigate("/shop/listing")}
          >
            Browse All Products
          </Button>
        </motion.div>
      )}

      {searchResults.length > 0 && (
        <>
          <motion.h2
            className="text-xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Search Results for "{keyword}"
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {searchResults.map((item) => (
              <motion.div 
                key={item.id} 
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ShoppingProductTile
                  product={item}
                  handleAddToCart={handleAddToCart}
                  handleViewDetails={handleViewProductDetails}
                />
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}

export default SearchProducts;