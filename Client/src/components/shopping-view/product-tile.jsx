

import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddToCart }) {
  return (
    <div className="w-full group">
      <Card
        onClick={() => handleGetProductDetails(product?._id)}
        className="relative w-full cursor-pointer overflow-hidden transition duration-300 ease-in-out hover:shadow-lg"
      >
        <div className="relative w-full h-48 sm:h-56 md:h-64">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover rounded-lg"
          />

          {/* Condition Badge */}
          {product?.condition && (
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute top-2 right-2"
            >
              <Badge
                className={`text-[9px] px-1.5 py-0.5 h-5 ${
                  product?.condition === "Brand New"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                {product?.condition}
              </Badge>
            </motion.div>
          )}

          {/* Stock Badges */}
          <div className="absolute top-2 left-2">
            {product?.totalStock === 0 ? (
              <Badge className="text-[9px] px-1.5 py-0.5 h-5 bg-red-500 hover:bg-red-600">
                Out Of Stock
              </Badge>
            ) : product?.totalStock < 10 ? (
              <Badge className="text-[9px] px-1.5 py-0.5 h-5 bg-red-500 hover:bg-red-600">
                Only {product?.totalStock} left
              </Badge>
            ) : null}
          </div>

          {/* Hover Add to Cart Button */}
          {product?.totalStock > 0 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product?._id, product?.totalStock);
                }}
                className="text-xs sm:text-sm hover:bg-peach-600"
              >
                Add to cart
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Product Title & Price Below Card */}
      <div className="mt-2 pl-1 text-left">
        <h2 className="text-sm font-semibold truncate">{product?.title}</h2>
        <div className="flex gap-2">
          <span className="text-sm font-bold text-peach-600">
            ₦{product?.salePrice > 0 ? product?.salePrice : product?.price}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-sm line-through text-muted-foreground">
              ₦{product?.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingProductTile;
