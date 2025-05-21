import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails, setProductDetails } from "@/store/shop/products-slice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function ProductDetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productDetails } = useSelector((state) => state.shoppingProducts);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }

    return () => {
      dispatch(setProductDetails());
    };
  }, [id, dispatch]);

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

  if (!productDetails) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex flex-col gap-6">
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
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold break-words">
              {productDetails?.title}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-4">
              {productDetails?.description}
            </p>
          </div>

          <div className="hidden lg:block space-y-4">
            <p className="text-xl md:text-2xl font-bold text-primary">
              ₦{productDetails?.price}
            </p>

            <div className="mt-4">
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
      </div>
    </div>
  );
}

export default ProductDetailsPage;