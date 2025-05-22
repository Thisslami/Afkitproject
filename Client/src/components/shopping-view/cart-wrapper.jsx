


// import { useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
// import UserCartItemsContent from "./cart-items-content";
// import { ScrollArea } from "../ui/scroll-area";
// import { Separator } from "../ui/separator";
// import { motion } from "framer-motion";
// import { ShoppingBag } from "lucide-react";

// function UserCartWrapper({ cartItems, setOpenCartSheet }) {
//   const navigate = useNavigate();

//   const totalCartAmount =
//     cartItems && cartItems.length > 0
//       ? cartItems.reduce(
//           (sum, currentItem) => sum + currentItem.price * currentItem.quantity,
//           0
//         )
//       : 0;

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     show: { y: 0, opacity: 1 },
//   };

//   return (
//     <SheetContent className="sm:max-w-md">
//       <SheetHeader>
//         <SheetTitle>Your Cart</SheetTitle>
//       </SheetHeader>
//       <ScrollArea className="h-[calc(100vh-200px)] pr-4">
//         <div className="mt-4 space-y-4">
//           {cartItems && cartItems.length > 0 ? (
//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               animate="show"
//             >
//               {cartItems.map((item, index) => (
//                 <motion.div key={item.productId} variants={itemVariants}>
//                   <UserCartItemsContent cartItem={item} />
//                   {index < cartItems.length - 1 && (
//                     <Separator className="my-4" />
//                   )}
//                 </motion.div>
//               ))}
//             </motion.div>
//           ) : (
//             <motion.div
//               className="flex flex-col items-center justify-center h-[calc(100vh-300px)]"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               {/* Empty cart animation */}
//               <motion.div
//                 animate={{
//                   y: [0, -10, 0],
//                   rotate: [0, 5, -5, 0],
//                 }}
//                 transition={{
//                   repeat: Infinity,
//                   repeatType: "reverse",
//                   duration: 2,
//                 }}
//                 className="mb-6"
//               >
//                 <ShoppingBag
//                   size={80}
//                   className="text-gray-300 dark:text-gray-600"
//                   strokeWidth={1}
//                 />
//               </motion.div>

//               <motion.h3
//                 className="text-xl font-bold text-center mb-2"
//                 initial={{ y: -20 }}
//                 animate={{ y: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 Your cart feels lonely
//               </motion.h3>
              
//               <motion.p
//                 className="text-center text-gray-500 mb-6"
//                 initial={{ y: -20 }}
//                 animate={{ y: 0 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 Add some products to make it happy!
//               </motion.p>

//               <motion.div
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <Button
//                   onClick={() => {
//                     navigate("/shop/listing");
//                     setOpenCartSheet(false);
//                   }}
//                   className="w-full max-w-xs"
//                 >
//                   Explore Products
//                 </Button>
//               </motion.div>
//             </motion.div>
//           )}
//         </div>
//       </ScrollArea>
//       {cartItems && cartItems.length > 0 && (
//         <motion.div 
//           className="mt-6 space-y-4"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           <div className="flex justify-between">
//             <span className="font-bold">Total</span>
//             <span className="font-bold">₦{totalCartAmount.toFixed(2)}</span>
//           </div>
//           {/* <Button
//             onClick={() => {
//               navigate("/shop/checkout");
//               setOpenCartSheet(false);
//             }}
//             className="w-full mt-4"
//             disabled={cartItems.length === 0}
//           >
//             Checkout
//           </Button> */}
//           <Button
//   onClick={() => {
//     const message = cartItems
//       .map(
//         (item, index) =>
//           `${index + 1}. ${item.name} x${item.quantity} - ₦${(
//             item.price * item.quantity
//           ).toLocaleString()}`
//       )
//       .join("%0A");

//     const total = `Total: ₦${totalCartAmount.toLocaleString()}`;
//     const whatsappMessage = `Hello, I'd like to order the following:%0A${message}%0A%0A${total}`;

//     const phoneNumber = "2348164014304"; // Your WhatsApp number
//     const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

//     window.open(whatsappURL, "_blank");
//     setOpenCartSheet(false);
//   }}
//   className="w-full mt-4"
//   disabled={cartItems.length === 0}
// >
//   Checkout
// </Button>

//         </motion.div>
//       )}
//     </SheetContent>
//   );
// }

// export default UserCartWrapper;


import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) => sum + currentItem.price * currentItem.quantity,
          0
        )
      : 0;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    // Format the cart items into a WhatsApp message - using title instead of name
    const itemsList = cartItems.map(item => 
      `- ${item.title || 'Product'} (${item.quantity} x ₦${item.price.toFixed(2)})`
    ).join("%0a"); // %0a is URL-encoded new line
    
    const total = `Total: ₦${totalCartAmount.toFixed(2)}`;
    
    const message = `Hello! I'd like to place an order:%0a%0a${itemsList}%0a%0a${total}%0a%0aPlease let me know how to proceed with payment and delivery.`;
    
    // Replace with your actual WhatsApp number (in international format without + or 00)
    const whatsappNumber = "+2348164014304"; // Example Nigerian number
    
    // Create WhatsApp link - using encodeURIComponent for better encoding
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      `Hello! I'd like to place an order:\n\n${cartItems.map(item => 
        `- ${item.title || 'Product'} (${item.quantity} x ₦${item.price.toFixed(2)})`
      ).join('\n')}\n\nTotal: ₦${totalCartAmount.toFixed(2)}\n\nPlease let me know how to proceed with payment and delivery.`
    )}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Close the cart sheet
    setOpenCartSheet(false);
  };

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <ScrollArea className="h-[calc(100vh-200px)] pr-4">
        <div className="mt-4 space-y-4">
          {cartItems && cartItems.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {cartItems.map((item, index) => (
                <motion.div key={item.productId} variants={itemVariants}>
                  <UserCartItemsContent cartItem={item} />
                  {index < cartItems.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center h-[calc(100vh-300px)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Empty cart animation */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2,
                }}
                className="mb-6"
              >
                <ShoppingBag
                  size={80}
                  className="text-gray-300 dark:text-gray-600"
                  strokeWidth={1}
                />
              </motion.div>

              <motion.h3
                className="text-xl font-bold text-center mb-2"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Your cart feels lonely
              </motion.h3>
              
              <motion.p
                className="text-center text-gray-500 mb-6"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Add some products to make it happy!
              </motion.p>

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  onClick={() => {
                    navigate("/shop/listing");
                    setOpenCartSheet(false);
                  }}
                  className="w-full max-w-xs"
                >
                  Explore Products
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </ScrollArea>
      {cartItems && cartItems.length > 0 && (
        <motion.div 
          className="mt-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">₦{totalCartAmount.toFixed(2)}</span>
          </div>
          <Button
            onClick={handleCheckout}
            className="w-full mt-4"
          >
            Checkout via WhatsApp
          </Button>
        </motion.div>
      )}
    </SheetContent>
  );
}

export default UserCartWrapper;