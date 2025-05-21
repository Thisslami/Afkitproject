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
//         {/* Product Image - Full width on mobile, half on larger screens */}
//         <div className="flex flex-col gap-4">
//           <div className="relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center h-64 sm:h-80 md:h-96">
//             <img
//               src={productDetails?.image}
//               alt={productDetails?.title}
//               className="object-contain w-full h-full p-4"
//             />
//           </div>

//           {/* Price and Add to Cart - Show below image on mobile, but could be moved to right column if preferred */}
//           <div className="lg:hidden space-y-4">
//             <div className="flex items-center justify-between">
//               <p
//                 className={`text-lg font-bold text-primary ${
//                   productDetails?.salePrice > 0 ? "line-through" : ""
//                 }`}
//               >
//                 ₦{productDetails?.price}
//               </p>
//               {productDetails?.salePrice > 0 && (
//                 <p className="text-lg font-bold text-muted-foreground">
//                   ₦{productDetails?.salePrice}
//                 </p>
//               )}
//             </div>

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

//         {/* Product Details - Full width on mobile, half on larger screens */}
//         <div className="flex flex-col gap-4 overflow-y-auto">
//           <div>
//             <h1 className="text-xl md:text-2xl font-extrabold break-words">
//               {productDetails?.title}
//             </h1>
//             <p className="text-sm md:text-base text-muted-foreground mt-2">
//               {productDetails?.description}
//             </p>
//           </div>

//           {/* Price and Add to Cart - Hidden on mobile, shown in right column on larger screens */}
//           <div className="hidden lg:block space-y-4">
//             <div className="flex items-center justify-between">
//               <p
//                 className={`text-lg md:text-xl font-bold text-primary ${
//                   productDetails?.salePrice > 0 ? "line-through" : ""
//                 }`}
//               >
//                 ₦{productDetails?.price}
//               </p>
//               {productDetails?.salePrice > 0 && (
//                 <p className="text-lg md:text-xl font-bold text-muted-foreground">
//                   ₦{productDetails?.salePrice}
//                 </p>
//               )}
//             </div>

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

import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/products-slice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const navigate = useNavigate();

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    if (!user) {
      navigate("/auth/login");
      toast.error("Please login to add items to the cart");
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
          toast.error(`Only ${getQuantity} quantity can be added for this item`);
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
        toast.success("Product added to cart!");
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 max-w-[95vw] md:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[70vw] 2xl:max-w-[60vw] h-[80vh] md:h-[85vh] overflow-y-auto">
        {/* Product Image */}
        <div className="flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center h-64 sm:h-80 md:h-96">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              className="object-contain w-full h-full p-4"
            />
          </div>

          {/* Price and Add to Cart for mobile */}
          <div className="lg:hidden space-y-4">
            <p className="text-lg font-bold text-primary">
              ₦{productDetails?.price}
            </p>

            <div className="mt-2">
              {productDetails?.totalStock === 0 ? (
                <Button className="w-full opacity-60 cursor-not-allowed">
                  Out of Stock
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() =>
                    handleAddToCart(productDetails?._id, productDetails?.totalStock)
                  }
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Product Details and Price for large screens */}
        <div className="flex flex-col gap-4 overflow-y-auto">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold break-words">
              {productDetails?.title}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              {productDetails?.description}
            </p>
          </div>

          <div className="hidden lg:block space-y-4">
            <p className="text-lg md:text-xl font-bold text-primary">
              ₦{productDetails?.price}
            </p>

            <div className="mt-2">
              {productDetails?.totalStock === 0 ? (
                <Button className="w-full opacity-60 cursor-not-allowed">
                  Out of Stock
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() =>
                    handleAddToCart(productDetails?._id, productDetails?.totalStock)
                  }
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </div>

          <Separator />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
