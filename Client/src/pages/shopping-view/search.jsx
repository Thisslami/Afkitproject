// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { fetchProductDetails } from "@/store/shop/products-slice";
// import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
// import { motion } from "framer-motion";
// import debounce from "lodash.debounce";
// import { CheckCircle, AlertCircle } from "lucide-react";
// import { toast } from "sonner"; // ✅ replaced useToast with Sonner

// function SearchProducts() {
//   const [keyword, setKeyword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const dispatch = useDispatch();
//   const { searchResults } = useSelector((state) => state.shopSearch);
//   const { productDetails } = useSelector((state) => state.shopProducts);
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const navigate = useNavigate();

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

//   function handleAddToCart(getCurrentProductId, getTotalStock) {
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
//   }

//   function handleGetProductDetails(getCurrentProductId) {
//     dispatch(fetchProductDetails(getCurrentProductId));
//   }

//   useEffect(() => {
//     if (productDetails !== null) setOpenDetailsDialog(true);
//   }, [productDetails]);

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
//               handleAddToCart={handleAddToCart}
//               product={item}
//               handleGetProductDetails={handleGetProductDetails}
//             />
//           </motion.div>
//         ))}
//       </motion.div>

//       <ProductDetailsDialog
//         open={openDetailsDialog}
//         setOpen={setOpenDetailsDialog}
//         productDetails={productDetails}
//       />
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

  const handleAddToCart = (getCurrentProductId, getTotalStock) => {
    if (!user) {
      navigate("/auth/login");
      toast.warning("Please login to add to cart.");
      return;
    }

    let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.error(`Only ${getQuantity} quantity can be added for this item`, {
            icon: <AlertCircle className="text-red-500" />,
          });
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product is added to cart", {
          icon: <CheckCircle className="text-green-500" />,
        });
      }
    });
  };

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