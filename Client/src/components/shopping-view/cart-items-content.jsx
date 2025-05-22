import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { motion } from "framer-motion";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      const currentItem = cartItems.items.find(
        (item) => item.productId === getCartItem?.productId
      );
      const product = productList.find(
        (product) => product._id === getCartItem?.productId
      );

      if (currentItem && product) {
        if (currentItem.quantity + 1 > product.totalStock) {
          toast.error(`Only ${product.totalStock} quantity can be added.`);
          return;
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart updated successfully");
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart item deleted successfully");
      }
    });
  }

  return (
    <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
  >
    {/* Product Image */}
    <img
      src={cartItem?.image}
      alt={cartItem?.title}
      className="w-full sm:w-20 h-32 sm:h-20 object-cover rounded"
    />
  
    {/* Product Details */}
    <div className="flex-1">
      <h3 className="font-extrabold text-base sm:text-lg">{cartItem?.title}</h3>
      <p className="text-sm text-gray-600">
        ₦{cartItem?.price.toFixed(2)} x {cartItem?.quantity}
      </p>
  
      {/* Quantity Controls */}
      <div className="flex items-center gap-2 mt-2">
        <Button
          variant="outline"
          className="h-8 w-8 rounded-full"
          size="icon"
          disabled={cartItem?.quantity === 1}
          onClick={() => handleUpdateQuantity(cartItem, "minus")}
        >
          <Minus className="w-4 h-4" />
          <span className="sr-only">Decrease quantity</span>
        </Button>
        <span className="font-semibold">{cartItem?.quantity}</span>
        <Button
          variant="outline"
          className="h-8 w-8 rounded-full"
          size="icon"
          onClick={() => handleUpdateQuantity(cartItem, "plus")}
        >
          <Plus className="w-4 h-4" />
          <span className="sr-only">Increase quantity</span>
        </Button>
      </div>
    </div>
  
    {/* Price & Delete */}
    <div className="flex sm:flex-col items-end justify-between sm:justify-end gap-2 sm:gap-1">
      <p className="font-semibold text-right">
        ₦{(cartItem?.price * cartItem?.quantity).toFixed(2)}
      </p>
      <Trash
        onClick={() => handleCartItemDelete(cartItem)}
        className="cursor-pointer text-red-500 hover:text-red-700"
        size={20}
      />
    </div>
  </motion.div>
  
  );
}

export default UserCartItemsContent;
