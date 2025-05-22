// import { Button } from "../ui/button";
// import { Card, CardContent, CardFooter } from "../ui/card";

// function AdminProductTile({
//   product,
//   setFormData,
//   setOpenCreateProductsDialog,
//   setCurrentEditedId,
//   handleDelete,
// }) {
//   return (
//     <Card className="w-full max-w-sm mx-auto transform transition duration-300 hover:scale-105 hover:bg-gray-200 shadow hover:shadow-lg rounded-lg">
//       <div>
//         <div className="relative">
//           <img
//             src={product?.image}
//             alt={product?.title}
//             className="w-full h-[300px] object-cover rounded-t-lg"
//           />
//         </div>
//         <CardContent>
//           <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
//           <div className="flex justify-between items-center mb-2">
//             <span
//               className={`${
//                 product?.salePrice > 0 ? "line-through" : ""
//               } text-lg font-semibold text-primary`}
//             >
//               ₦{product?.price}
//             </span>
//             {product?.salePrice > 0 ? (
//               <span className="text-lg font-bold">₦{product?.salePrice}</span>
//             ) : null}
//           </div>
//           {/* <div className="text-sm text-gray-600">Condition: {product?.condition === "new" ? "Brand New" : "Used"}</div> */}
//           <div className="text-lg font-semibold ">
//             Condition: {product?.condition}{" "}
//             {/* Directly display the condition */}
//           </div>
//         </CardContent>
//         <CardFooter className="flex justify-between items-center">
//           <Button
//             onClick={() => {
//               setOpenCreateProductsDialog(true);
//               setCurrentEditedId(product?._id);
//               console.log("Editing product data:", product);
//               setFormData(product);
//             }}
//           >
//             Edit
//           </Button>
//           <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
//         </CardFooter>
//       </div>
//     </Card>
//   );
// }

// export default AdminProductTile;

import { Button } from "../ui/button";
import { motion } from "framer-motion";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  // Format price with commas for NGN
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG").format(price);
  };

  return (
    <motion.div
      className="w-full max-w-sm mx-auto bg-white rounded-lg shadow hover:shadow-lg overflow-hidden"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover"
          />
        </motion.div>
      </div>

      <div className="p-4">
        {/* Product title and price */}
        <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
        <div className="text-lg font-semibold text-primary mb-3">
          ₦{formatPrice(product?.price)}
        </div>

        {/* Product condition */}
        <div className="text-lg font-semibold mb-4">
          Condition: {product?.condition}{" "}
        </div>

        {/* Action buttons */}
        <div className="flex justify-between gap-2">
          <Button
            className="flex-1"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => handleDelete(product?._id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default AdminProductTile;
