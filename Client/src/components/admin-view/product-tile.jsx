import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto transform transition duration-300 hover:scale-105 hover:bg-gray-200 shadow hover:shadow-lg rounded-lg">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ₦{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">₦{product?.salePrice}</span>
            ) : null}
          </div>
          {/* <div className="text-sm text-gray-600">Condition: {product?.condition === "new" ? "Brand New" : "Used"}</div> */}
          <div className="text-lg font-semibold ">
            Condition: {product?.condition}{" "}
            {/* Directly display the condition */}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              console.log("Editing product data:", product);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
