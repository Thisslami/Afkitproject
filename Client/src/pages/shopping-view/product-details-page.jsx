// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Minus, Plus } from "lucide-react";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { toast } from "sonner";
// import {
//   setProductDetails,
//   fetchProductsByBrand,
//   fetchProductDetails
// } from "@/store/shop/products-slice";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";

// export default function ShoppingProductDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { productDetails, relatedProducts } = useSelector((state) => state.shopProducts);

//   const [quantity, setQuantity] = useState(1);

//   // Fetch product details when id changes
//   useEffect(() => {
//     if (id) {
//       dispatch(fetchProductDetails(id));
//     }
//   }, [id, dispatch]);

//   // Handle cart quantity
//   useEffect(() => {
//     if (!productDetails) return;
//     const cartItem = cartItems.items?.find(
//       (item) => item.productId === productDetails._id
//     );
//     setQuantity(cartItem ? cartItem.quantity : 1);
//   }, [productDetails, cartItems.items]);

//   // Fetch related products
//   useEffect(() => {
//     if (productDetails?.brand) {
//       dispatch(fetchProductsByBrand(productDetails.brand));
//     }
//   }, [productDetails, dispatch]);

//   const handleAddToCart = () => {
//     if (!user) {
//       navigate("/auth/login");
//       toast.error("Please login to add items to the cart");
//       return;
//     }

//     if (quantity > productDetails.totalStock) {
//       toast.error(`Only ${productDetails.totalStock} quantity can be added`);
//       return;
//     }

//     dispatch(
//       addToCart({
//         userId: user?.id,
//         productId: productDetails?._id,
//         quantity,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(user?.id));
//         toast.success("Product added to cart!");
//       }
//     });
//   };

//   const handleUpdateQuantity = (type) => {
//     if (type === "plus") {
//       if (quantity + 1 > productDetails.totalStock) {
//         toast.error(`Only ${productDetails.totalStock} available`);
//         return;
//       }
//       setQuantity(quantity + 1);
//     } else {
//       if (quantity - 1 < 1) return;
//       setQuantity(quantity - 1);
//     }
//   };

//   const handleRelatedProductClick = (productId) => {
//     navigate(`/shop/product/${productId}`);
//     window.scrollTo(0, 0); // Scroll to top when navigating to new product
//   };

//   const filteredRelatedProducts =
//     relatedProducts?.filter(p => p._id !== productDetails?._id)?.slice(0, 4) || [];

//   if (!productDetails) {
//     return <div className="container py-8">Loading product details...</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//         {/* Left Column - Product Image + Related */}
//         <div className="space-y-10">
//           <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
//             <img
//               src={productDetails.image}
//               alt={productDetails.title}
//               className="object-contain w-full max-h-full p-6"
//             />
//           </div>

//           {filteredRelatedProducts.length > 0 && (
//             <div className="space-y-4">
//               <h2 className="text-xl font-bold text-center">Related Products</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
//                 {filteredRelatedProducts.map((product) => (
//                   <div
//                     key={product._id}
//                     onClick={() => handleRelatedProductClick(product._id)}
//                     className="cursor-pointer"
//                   >
//                     <ShoppingProductTile product={product} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Right Column - Product Details */}
//         <div className="space-y-6">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
//               {productDetails.title}
//             </h1>
//             <p className="text-muted-foreground mt-3 text-base md:text-lg leading-relaxed">
//               {productDetails.description}
//             </p>
//           </div>

//           <div className="flex items-center gap-6 flex-wrap">
//             <p className="text-2xl font-semibold text-primary">
//               ₦{productDetails.price}
//             </p>
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="h-10 w-10 rounded-full"
//                 disabled={quantity === 1}
//                 onClick={() => handleUpdateQuantity("minus")}
//               >
//                 <Minus className="h-4 w-4" />
//               </Button>
//               <span className="text-lg font-medium w-8 text-center">
//                 {quantity}
//               </span>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="h-10 w-10 rounded-full"
//                 onClick={() => handleUpdateQuantity("plus")}
//               >
//                 <Plus className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>

//           <Button
//             className="w-full h-12 text-lg font-semibold tracking-wide"
//             onClick={handleAddToCart}
//             disabled={productDetails.totalStock === 0}
//           >
//             {productDetails.totalStock === 0 ? "Out of Stock" : "Add to Cart"}
//           </Button>

//           <Separator />
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Minus, Plus } from "lucide-react";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { toast } from "sonner";
// import {
//   setProductDetails,
//   fetchProductsByBrand,
//   fetchProductDetails,
// } from "@/store/shop/products-slice";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import LoadingSpinner from "@/components/shopping-view/loading-spinner";

// export default function ShoppingProductDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { productDetails, relatedProducts } = useSelector(
//     (state) => state.shopProducts
//   );

//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchProductDetails(id));
//     }
//   }, [id, dispatch]);

//   useEffect(() => {
//     if (!productDetails) return;
//     const cartItem = cartItems.items?.find(
//       (item) => item.productId === productDetails._id
//     );
//     setQuantity(cartItem ? cartItem.quantity : 1);
//   }, [productDetails, cartItems.items]);

//   useEffect(() => {
//     if (productDetails?.brand) {
//       dispatch(fetchProductsByBrand(productDetails.brand));
//     }
//   }, [productDetails, dispatch]);

//   const handleAddToCart = () => {
//     if (!user) {
//       navigate("/auth/login");
//       toast.error("Please login to add items to the cart");
//       return;
//     }

//     if (quantity > productDetails.totalStock) {
//       toast.error(`Only ${productDetails.totalStock} quantity can be added`);
//       return;
//     }

//     dispatch(
//       addToCart({
//         userId: user?.id,
//         productId: productDetails?._id,
//         quantity,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(user?.id));
//         toast.success("Product added to cart!");
//       }
//     });
//   };

//   const handleUpdateQuantity = (type) => {
//     if (type === "plus") {
//       if (quantity + 1 > productDetails.totalStock) {
//         toast.error(`Only ${productDetails.totalStock} available`);
//         return;
//       }
//       setQuantity(quantity + 1);
//     } else {
//       if (quantity - 1 < 1) return;
//       setQuantity(quantity - 1);
//     }
//   };

//   const handleRelatedProductClick = (productId) => {
//     navigate(`/shop/product/${productId}`);
//     window.scrollTo(0, 0);
//   };

//   const filteredRelatedProducts =
//     relatedProducts
//       ?.filter((p) => p._id !== productDetails?._id)
//       ?.slice(0, 4) || [];

//   if (!productDetails) {
//     return <div className="container py-8"><LoadingSpinner/></div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Top Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//         {/* Left - Image */}
//         <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
//           <img
//             src={productDetails.image}
//             alt={productDetails.title}
//             className="object-contain w-full max-h-full p-6"
//           />
//         </div>

//         {/* Right - Product Details */}
//         <div className="space-y-6">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
//               {productDetails.title}
//             </h1>
//             <p className="text-muted-foreground mt-3 text-base md:text-lg leading-relaxed">
//               {productDetails.description}
//             </p>
//           </div>

//           <div className="flex items-center gap-6 flex-wrap">
//             <p className="text-2xl font-semibold text-primary">
//               ₦{Number(productDetails.price).toLocaleString("en-NG")}
//             </p>
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="h-10 w-10 rounded-full"
//                 disabled={quantity === 1}
//                 onClick={() => handleUpdateQuantity("minus")}
//               >
//                 <Minus className="h-4 w-4" />
//               </Button>
//               <span className="text-lg font-medium w-8 text-center">
//                 {quantity}
//               </span>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="h-10 w-10 rounded-full"
//                 onClick={() => handleUpdateQuantity("plus")}
//               >
//                 <Plus className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>

//           <Button
//             className="w-full h-12 text-lg font-semibold tracking-wide"
//             onClick={handleAddToCart}
//             disabled={productDetails.totalStock === 0}
//           >
//             {productDetails.totalStock === 0 ? "Out of Stock" : "Add to Cart"}
//           </Button>

//           <Separator />
//         </div>
//       </div>

//       {/* Related Products Section */}
//       {filteredRelatedProducts.length > 0 && (
//         <div className="mt-16">
//           <h2 className="text-xl font-bold text-center mb-8">
//             Related Products
//           </h2>
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
//             {filteredRelatedProducts.map((product) => (
//               <div
//                 key={product._id}
//                 onClick={() => handleRelatedProductClick(product._id)}
//                 className="cursor-pointer"
//               >
//                 <ShoppingProductTile product={product} />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, CheckCircle, AlertCircle } from "lucide-react";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { toast } from "sonner";
import {
  setProductDetails,
  fetchProductsByBrand,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import LoadingSpinner from "@/components/shopping-view/loading-spinner";
import { getOrCreateSessionId } from "@/components/utils/session";

export default function ShoppingProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productDetails, relatedProducts } = useSelector(
    (state) => state.shopProducts
  );

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!productDetails) return;
    const cartItem = cartItems.items?.find(
      (item) => item.productId === productDetails._id
    );
    setQuantity(cartItem ? cartItem.quantity : 1);
  }, [productDetails, cartItems.items]);

  useEffect(() => {
    if (productDetails?.brand) {
      dispatch(fetchProductsByBrand(productDetails.brand));
    }
  }, [productDetails, dispatch]);

  // Load cart items when component mounts or user changes
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

  const handleAddToCart = async () => {
    try {
      const userId = user?.id;
      const sessionId = userId ? null : getOrCreateSessionId();

      if (!userId && !sessionId) {
        navigate("/auth/login");
        toast.error("Please login to add items to the cart");
        return;
      }

      // Check stock for existing items
      const currentCartItems = cartItems?.items || [];
      const existingItem = currentCartItems.find(
        item => item.productId === productDetails._id
      );

      if (existingItem && existingItem.quantity >= productDetails.totalStock) {
        toast.error(`Maximum available quantity (${productDetails.totalStock}) reached`, {
          icon: <AlertCircle className="text-red-500" />,
        });
        return;
      }

      if (quantity > productDetails.totalStock) {
        toast.error(`Only ${productDetails.totalStock} quantity can be added`, {
          icon: <AlertCircle className="text-red-500" />,
        });
        return;
      }

      const response = await dispatch(
        addToCart({
          userId,
          productId: productDetails._id,
          quantity,
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

  const handleUpdateQuantity = (type) => {
    if (type === "plus") {
      if (quantity + 1 > productDetails.totalStock) {
        toast.error(`Only ${productDetails.totalStock} available`);
        return;
      }
      setQuantity(quantity + 1);
    } else {
      if (quantity - 1 < 1) return;
      setQuantity(quantity - 1);
    }
  };

  const handleRelatedProductClick = (productId) => {
    navigate(`/shop/product/${productId}`);
    window.scrollTo(0, 0);
  };

  const filteredRelatedProducts =
    relatedProducts
      ?.filter((p) => p._id !== productDetails?._id)
      ?.slice(0, 4) || [];

  if (!productDetails) {
    return <div className="container py-8"><LoadingSpinner/></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left - Image */}
        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
          <img
            src={productDetails.image}
            alt={productDetails.title}
            className="object-contain w-full max-h-full p-6"
          />
        </div>

        {/* Right - Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {productDetails.title}
            </h1>
            <p className="text-muted-foreground mt-3 text-base md:text-lg leading-relaxed">
              {productDetails.description}
            </p>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <p className="text-2xl font-semibold text-primary">
              ₦{Number(productDetails.price).toLocaleString("en-NG")}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                disabled={quantity === 1}
                onClick={() => handleUpdateQuantity("minus")}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium w-8 text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => handleUpdateQuantity("plus")}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button
            className="w-full h-12 text-lg font-semibold tracking-wide"
            onClick={handleAddToCart}
            disabled={productDetails.totalStock === 0}
          >
            {productDetails.totalStock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>

          <Separator />
        </div>
      </div>

      {/* Related Products Section */}
      {filteredRelatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-center mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
            {filteredRelatedProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => handleRelatedProductClick(product._id)}
                className="cursor-pointer"
              >
                <ShoppingProductTile product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}