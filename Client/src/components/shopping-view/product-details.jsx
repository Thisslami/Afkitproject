

// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "../ui/button";
// import { Dialog, DialogContent } from "../ui/dialog";
// import { Separator } from "../ui/separator";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { setProductDetails } from "@/store/shop/products-slice";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// function ProductDetailsDialog({ open, setOpen, productDetails }) {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const navigate = useNavigate();

//   function handleAddToCart(getCurrentProductId, getTotalStock) {
//     if (!user) {
//       navigate("/auth/login");
//       toast.error("Please login to add items to the cart");
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
//           toast.error(`Only ${getQuantity} quantity can be added for this item`);
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
//         toast.success("Product added to cart!");
//       }
//     });
//   }

//   function handleDialogClose() {
//     setOpen(false);
//     dispatch(setProductDetails());
//   }

//   return (
//     <Dialog open={open} onOpenChange={handleDialogClose}>
//       <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 max-w-[95vw] md:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[70vw] 2xl:max-w-[60vw] h-[80vh] md:h-[85vh] overflow-y-auto">
//         {/* Product Image */}
//         <div className="flex flex-col gap-4">
//           <div className="relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center h-64 sm:h-80 md:h-96">
//             <img
//               src={productDetails?.image}
//               alt={productDetails?.title}
//               className="object-contain w-full h-full p-4"
//             />
//           </div>

//           {/* Price and Add to Cart for mobile */}
//           <div className="lg:hidden space-y-4">
//             <p className="text-lg font-bold text-primary">
//               ₦{productDetails?.price}
//             </p>

//             <div className="mt-2">
//               {productDetails?.totalStock === 0 ? (
//                 <Button className="w-full opacity-60 cursor-not-allowed">
//                   Out of Stock
//                 </Button>
//               ) : (
//                 <Button
//                   className="w-full"
//                   onClick={() =>
//                     handleAddToCart(productDetails?._id, productDetails?.totalStock)
//                   }
//                 >
//                   Add to Cart
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Product Details and Price for large screens */}
//         <div className="flex flex-col gap-4 overflow-y-auto">
//           <div>
//             <h1 className="text-xl md:text-2xl font-extrabold break-words">
//               {productDetails?.title}
//             </h1>
//             <p className="text-sm md:text-base text-muted-foreground mt-2">
//               {productDetails?.description}
//             </p>
//           </div>

//           <div className="hidden lg:block space-y-4">
//             <p className="text-lg md:text-xl font-bold text-primary">
//               ₦{productDetails?.price}
//             </p>

//             <div className="mt-2">
//               {productDetails?.totalStock === 0 ? (
//                 <Button className="w-full opacity-60 cursor-not-allowed">
//                   Out of Stock
//                 </Button>
//               ) : (
//                 <Button
//                   className="w-full"
//                   onClick={() =>
//                     handleAddToCart(productDetails?._id, productDetails?.totalStock)
//                   }
//                 >
//                   Add to Cart
//                 </Button>
//               )}
//             </div>
//           </div>

//           <Separator />
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default ProductDetailsDialog;


// import { useDispatch, useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// import { Button } from "../ui/button";
// import { Dialog, DialogContent } from "../ui/dialog";
// import { Separator } from "../ui/separator";
// import { addToCart, fetchCartItems, updateCartQuantity } from "@/store/shop/cart-slice";
// import { setProductDetails } from "@/store/shop/products-slice";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { Minus, Plus } from "lucide-react";

// function ProductDetailsDialog({ open, setOpen, productDetails }) {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const navigate = useNavigate();

//   // Local state for quantity shown in dialog
//   const [quantity, setQuantity] = useState(1);

//   // Reset quantity when product changes or dialog opens
//   useEffect(() => {
//     if (!productDetails) return;
//     // Check if product is already in cart and set quantity accordingly
//     const cartItem = cartItems.items?.find(
//       (item) => item.productId === productDetails._id
//     );
//     setQuantity(cartItem ? cartItem.quantity : 1);
//   }, [productDetails, cartItems.items]);

//   function handleAddToCart() {
//     if (!user) {
//       navigate("/auth/login");
//       toast.error("Please login to add items to the cart");
//       return;
//     }

//     if (quantity > productDetails.totalStock) {
//       toast.error(`Only ${productDetails.totalStock} quantity can be added for this item`);
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
//   }

//   function handleUpdateQuantity(typeOfAction) {
//     if (typeOfAction === "plus") {
//       if (quantity + 1 > productDetails.totalStock) {
//         toast.error(`Only ${productDetails.totalStock} quantity can be added.`);
//         return;
//       }
//       setQuantity(quantity + 1);
//     } else {
//       if (quantity - 1 < 1) return; // minimum 1
//       setQuantity(quantity - 1);
//     }
//   }

//   function handleDialogClose() {
//     setOpen(false);
//     dispatch(setProductDetails());
//     setQuantity(1); // reset on close
//   }

//   return (
//     <Dialog open={open} onOpenChange={handleDialogClose}>
//       <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 max-w-[95vw] md:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[70vw] 2xl:max-w-[60vw] h-[80vh] md:h-[85vh] overflow-y-auto">
//         {/* Product Image */}
//         <div className="flex flex-col gap-4">
//           <div className="relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center h-64 sm:h-80 md:h-96">
//             <img
//               src={productDetails?.image}
//               alt={productDetails?.title}
//               className="object-contain w-full h-full p-4"
//             />
//           </div>

//           {/* Price and Quantity Controls for mobile */}
//           <div className="lg:hidden space-y-4">
//             <p className="text-lg font-bold text-primary">₦{productDetails?.price}</p>

//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 className="h-8 w-8 rounded-full"
//                 size="icon"
//                 disabled={quantity === 1}
//                 onClick={() => handleUpdateQuantity("minus")}
//               >
//                 <Minus className="w-4 h-4" />
//                 <span className="sr-only">Decrease quantity</span>
//               </Button>
//               <span className="font-semibold">{quantity}</span>
//               <Button
//                 variant="outline"
//                 className="h-8 w-8 rounded-full"
//                 size="icon"
//                 onClick={() => handleUpdateQuantity("plus")}
//               >
//                 <Plus className="w-4 h-4" />
//                 <span className="sr-only">Increase quantity</span>
//               </Button>
//             </div>

//             <div className="mt-2">
//               {productDetails?.totalStock === 0 ? (
//                 <Button className="w-full opacity-60 cursor-not-allowed" disabled>
//                   Out of Stock
//                 </Button>
//               ) : (
//                 <Button className="w-full" onClick={handleAddToCart}>
//                   Add to Cart
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Product Details and Price for large screens */}
//         <div className="flex flex-col gap-4 overflow-y-auto">
//           <div>
//             <h1 className="text-xl md:text-2xl font-extrabold break-words">
//               {productDetails?.title}
//             </h1>
//             <p className="text-sm md:text-base text-muted-foreground mt-2">
//               {productDetails?.description}
//             </p>
//           </div>

//           <div className="hidden lg:block space-y-4">
//             <p className="text-lg md:text-xl font-bold text-primary">
//               ₦{productDetails?.price}
//             </p>

//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 className="h-8 w-8 rounded-full"
//                 size="icon"
//                 disabled={quantity === 1}
//                 onClick={() => handleUpdateQuantity("minus")}
//               >
//                 <Minus className="w-4 h-4" />
//                 <span className="sr-only">Decrease quantity</span>
//               </Button>
//               <span className="font-semibold">{quantity}</span>
//               <Button
//                 variant="outline"
//                 className="h-8 w-8 rounded-full"
//                 size="icon"
//                 onClick={() => handleUpdateQuantity("plus")}
//               >
//                 <Plus className="w-4 h-4" />
//                 <span className="sr-only">Increase quantity</span>
//               </Button>
//             </div>

//             <div className="mt-2">
//               {productDetails?.totalStock === 0 ? (
//                 <Button className="w-full opacity-60 cursor-not-allowed" disabled>
//                   Out of Stock
//                 </Button>
//               ) : (
//                 <Button className="w-full" onClick={handleAddToCart}>
//                   Add to Cart
//                 </Button>
//               )}
//             </div>
//           </div>

//           <Separator />
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default ProductDetailsDialog;


import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { setProductDetails, fetchProductsByBrand } from "@/store/shop/products-slice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";
import ShoppingProductTile from "../../components/shopping-view/product-tile";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { relatedProducts } = useSelector((state) => state.shopProducts);

  const [quantity, setQuantity] = useState(1);
  const [currentProduct, setCurrentProduct] = useState(productDetails);

  useEffect(() => {
    setCurrentProduct(productDetails);
    setQuantity(1);
  }, [productDetails]);

  useEffect(() => {
    if (!currentProduct) return;
    const cartItem = cartItems.items?.find(
      (item) => item.productId === currentProduct._id
    );
    setQuantity(cartItem ? cartItem.quantity : 1);
  }, [currentProduct, cartItems.items]);

  useEffect(() => {
    if (currentProduct?.brand) {
      dispatch(fetchProductsByBrand(currentProduct.brand));
    }
  }, [currentProduct, dispatch]);

  const handleSwitchProduct = (product) => {
    setCurrentProduct(product);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate("/auth/login");
      toast.error("Please login to add items to the cart");
      return;
    }

    if (quantity > currentProduct.totalStock) {
      toast.error(`Only ${currentProduct.totalStock} quantity can be added for this item`);
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: currentProduct?._id,
        quantity,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product added to cart!");
      }
    });
  };

  const handleUpdateQuantity = (typeOfAction) => {
    if (typeOfAction === "plus") {
      if (quantity + 1 > currentProduct.totalStock) {
        toast.error(`Only ${currentProduct.totalStock} quantity can be added.`);
        return;
      }
      setQuantity(quantity + 1);
    } else {
      if (quantity - 1 < 1) return;
      setQuantity(quantity - 1);
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
    setQuantity(1);
  };

  const filteredRelatedProducts = relatedProducts
    ?.filter(p => p._id !== currentProduct?._id)
    ?.slice(0, 4) || [];

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 max-w-[95vw] md:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[70vw] 2xl:max-w-[60vw] h-[80vh] md:h-[85vh] overflow-y-auto">
        {/* Left Column - Product Image and Related Products */}
        <div className="flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center h-64 sm:h-80 md:h-96">
            <img
              src={currentProduct?.image}
              alt={currentProduct?.title}
              className="object-contain w-full h-full p-4"
            />
          </div>

          {filteredRelatedProducts.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-3">Related Products</h3>
              <div className="grid grid-cols-2 gap-3">
                {filteredRelatedProducts.map((product) => (
                  <ShoppingProductTile
                    key={product._id}
                    product={product}
                    handleGetProductDetails={() => handleSwitchProduct(product)}
                    handleAddToCart={(productId) => {
                      if (!user) {
                        navigate("/auth/login");
                        toast.error("Please login to add items to the cart");
                        return;
                      }
                      dispatch(
                        addToCart({
                          userId: user?.id,
                          productId,
                          quantity: 1,
                        })
                      );
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="lg:hidden space-y-4">
            <p className="text-lg font-bold text-primary">₦{currentProduct?.price}</p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="h-8 w-8 rounded-full"
                size="icon"
                disabled={quantity === 1}
                onClick={() => handleUpdateQuantity("minus")}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="font-semibold">{quantity}</span>
              <Button
                variant="outline"
                className="h-8 w-8 rounded-full"
                size="icon"
                onClick={() => handleUpdateQuantity("plus")}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <Button 
              className="w-full" 
              onClick={handleAddToCart}
              disabled={currentProduct?.totalStock === 0}
            >
              {currentProduct?.totalStock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="flex flex-col gap-4 overflow-y-auto">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold break-words">
              {currentProduct?.title}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              {currentProduct?.description}
            </p>
          </div>

          <div className="hidden lg:block space-y-4">
            <p className="text-lg md:text-xl font-bold text-primary">
              ₦{currentProduct?.price}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="h-8 w-8 rounded-full"
                size="icon"
                disabled={quantity === 1}
                onClick={() => handleUpdateQuantity("minus")}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="font-semibold">{quantity}</span>
              <Button
                variant="outline"
                className="h-8 w-8 rounded-full"
                size="icon"
                onClick={() => handleUpdateQuantity("plus")}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <Button 
              className="w-full" 
              onClick={handleAddToCart}
              disabled={currentProduct?.totalStock === 0}
            >
              {currentProduct?.totalStock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>

          <Separator />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;