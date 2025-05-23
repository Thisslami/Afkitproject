// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import {
//   Airplay,
//   Apple,
//   CloudLightning,
//   Laptop,
//   LaptopMinimal,
//   ShoppingBag,
//   Smartphone,
//   TabletSmartphone,
//   Tv
// } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllFilteredProducts,
//   fetchProductDetails,
// } from "@/store/shop/products-slice";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { useNavigate } from "react-router-dom";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { getFeatureImages } from "@/store/common-slice";
// import { FaTruck, FaCreditCard, FaHeadset, FaShieldAlt } from "react-icons/fa";
// import CustomerReviews from "@/components/shopping-view/customer-reviews";
// import { toast } from "sonner";

// const categoriesWithIcon = [
//   { id: "smartphones", label: "Smartphones", icon: Smartphone },
//   { id: "laptops", label: "Laptops", icon: Laptop },
//   { id: "monitors", label: "Monitors", icon: Tv },
//   { id: "accessories", label: "Accessories", icon: CloudLightning },
//   { id: "products", label: "All Products", icon: ShoppingBag },
// ];

// const brandsWithIcon = [
//   { id: "apple", label: "Apple", icon: Apple },
//   { id: "samsung", label: "Samsung", icon: Airplay },
//   { id: "dell", label: "Dell", icon: LaptopMinimal },
//   { id: "hp", label: "HP", icon: TabletSmartphone },
//   { id: "products", label: "All Products", icon: ShoppingBag },
// ];

// const supportFeatures = [
//   {
//     icon: FaTruck,
//     title: "Swift & Secure Delivery",
//     description:
//       "Our fast delivery policy applies to all orders, regardless of the order value or destination.",
//   },
//   {
//     icon: FaCreditCard,
//     title: "Secure & Seamless Payment",
//     description:
//       "Your payment is always safe, secure, and protected at all times.",
//   },
//   {
//     icon: FaHeadset,
//     title: "24/7 Support",
//     description:
//       "We are available 24/7 to assist you with any question, or issues you may have.",
//   },
//   {
//     icon: FaShieldAlt,
//     title: "Six Month Warranty",
//     description:
//       "All products come with a 6-month warranty for your peace of mind.",
//   },
// ];

// function ShoppingHome() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const { productList, productDetails } = useSelector(
//     (state) => state.shopProducts
//   );
//   const { featureImageList } = useSelector((state) => state.commonFeature);
//   const { user } = useSelector((state) => state.auth);
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [featuredIndex, setFeaturedIndex] = useState(0);
//   const [featuredProducts, setFeaturedProducts] = useState([]);

//   // Responsive breakpoints
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const isMobile = windowWidth < 640;
//   const isTablet = windowWidth >= 640 && windowWidth < 1024;
//   const [isSmallScreen, setIsSmallScreen] = useState(false);

//   useEffect(() => {
//     const checkScreen = () => setIsSmallScreen(window.innerWidth < 640);
//     checkScreen();
//     window.addEventListener("resize", checkScreen);
//     return () => window.removeEventListener("resize", checkScreen);
//   }, []);

//   const categoriesToShow = isSmallScreen ? categoriesWithIcon.slice(0, 4) : categoriesWithIcon;
//   const brandsToShow = isSmallScreen ? brandsWithIcon.slice(0, 4) : brandsWithIcon;

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const shuffleArray = (array) => {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   };

//   useEffect(() => {
//     shuffleFeaturedProducts();
//     const interval = setInterval(shuffleFeaturedProducts, 60 * 60 * 1000);
//     return () => clearInterval(interval);
//   }, [productList]);

//   const shuffleFeaturedProducts = () => {
//     if (productList.length > 0) {
//       const shuffledProducts = shuffleArray([...productList]).slice(0, 8);
//       setFeaturedProducts(shuffledProducts);
//     }
//   };

//   function handleNavigateToListingPage(getCurrentItem, section) {
//     sessionStorage.removeItem("filters");
//     const currentFilter = { [section]: [getCurrentItem.id] };
//     sessionStorage.setItem("filters", JSON.stringify(currentFilter));
//     navigate(`/shop/listing`);
//   }

//   const handleViewProductDetails = (productId) => {
//     navigate(`/shop/product/${productId}`);
//   };

//   function handleAddToCart(getCurrentProductId) {
//     if (!user) {
//       navigate("/auth/login");
//       toast.error("Please login to add to cart.");
//       return;
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
//       } else if (data?.payload?.message) {
//         toast.error(data?.payload?.message);
//       }
//     });
//   }

//   useEffect(() => {
//     if (productDetails !== null) setOpenDetailsDialog(true);
//   }, [productDetails]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [featureImageList]);

//   useEffect(() => {
//     if (productList.length > 4) {
//       const interval = setInterval(() => {
//         setFeaturedIndex((prevIndex) => (prevIndex + 4) % productList.length);
//       }, 8000);
//       return () => clearInterval(interval);
//     }
//   }, [productList]);

//   useEffect(() => {
//     if (productList.length === 0) {
//       dispatch(
//         fetchAllFilteredProducts({
//           filterParams: {},
//           sortParams: "price-lowtohigh",
//         })
//       );
//     }
//   }, [dispatch, productList.length]);

//   useEffect(() => {
//     dispatch(getFeatureImages());
//   }, [dispatch]);

//   const displayedProducts =
//     productList.length > 4
//       ? [...productList, ...productList].slice(featuredIndex, featuredIndex + 4)
//       : productList;

//   return (
//     <div className="flex flex-col min-h-screen">
//       <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">
//         <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="bg-white p-6 sm:p-10 rounded-xl shadow-md flex flex-col justify-center items-start h-full text-center md:text-left"
//           >
//             <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-700 mb-6 leading-tight">
//               At <span className="text-orange-500 font-bold">Afkit</span>, we
//               sell integrity and value for your money with a six months warranty
//             </h1>

//             <motion.div
//               initial={{ scale: 1 }}
//               animate={{ scale: [1, 1.05, 1] }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//                 repeatType: "loop",
//                 ease: "easeInOut",
//               }}
//             >
//               <Button
//                 onClick={() => navigate("/shop/listing")}
//                 className="bg-blue-900 hover:bg-blue-700 text-white font-bold px-6 py-3 uppercase text-sm sm:text-base transition rounded"
//               >
//                 Shop Now
//               </Button>
//             </motion.div>
//           </motion.div>
//           <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[600px] overflow-hidden rounded-xl shadow-md">
//             {featureImageList?.map((slide, index) => (
//               <motion.div
//                 key={index}
//                 className="absolute top-0 left-0 w-full h-full"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: index === currentSlide ? 1 : 0 }}
//                 transition={{ duration: 1 }}
//               >
//                 <img
//                   src={slide?.image}
//                   className="w-full h-full object-cover"
//                   alt={`Slide ${index + 1}`}
//                 />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Trending Products */}
//       <section className="py-8 sm:py-12 px-4 sm:px-6">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-xl sm:text-2xl font-bold justify-start mb-6 sm:mb-8">
//             Top Products
//           </h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
//             {displayedProducts.map((productItem, index) => (
//               <motion.div
//                 key={productItem.id}
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 whileHover={{ scale: 1.03 }}
//                 className="cursor-pointer"
//               >
//                 <ShoppingProductTile
//                   product={productItem}
//                   handleAddToCart={handleAddToCart}
//                   handleViewDetails={handleViewProductDetails}
//                 />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-8 sm:py-12 bg-gray-50 px-4 sm:px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex justify-start mb-6 sm:mb-8">
//             <h2 className="text-xl sm:text-2xl font-bold">Shop by category</h2>
//           </div>
//           <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
//             {categoriesToShow.map(({ id, label, icon: Icon }) => (
//               <motion.div
//                 key={id}
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <Card
//                   onClick={() => handleNavigateToListingPage({ id }, "category")}
//                   className="cursor-pointer hover:shadow-md h-full"
//                 >
//                   <CardContent className="flex flex-col items-center justify-center p-2 sm:p-3">
//                     <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1 text-peach-500" />
//                     <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-center leading-tight">
//                       {label}
//                     </span>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-8 sm:py-12 bg-gray-50 px-4 sm:px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex justify-start mb-6 sm:mb-8">
//             <h2 className="text-xl sm:text-2xl font-bold">Shop by Brand</h2>
//           </div>
//           <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
//             {brandsToShow.map(({ id, label, icon: Icon }) => (
//               <motion.div
//                 key={id}
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <Card
//                   onClick={() => handleNavigateToListingPage({ id }, "brand")}
//                   className="cursor-pointer hover:shadow-md h-full"
//                 >
//                   <CardContent className="flex flex-col items-center justify-center p-2 sm:p-3">
//                     <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1 text-peach-500" />
//                     <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-center leading-tight">
//                       {label}
//                     </span>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="py-8 sm:py-12 px-4 sm:px-6">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-xl sm:text-2xl font-bold justify-start mb-6 sm:mb-8">
//             Featured Products
//           </h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
//             {featuredProducts.map((productItem, index) => (
//               <motion.div
//                 key={productItem.id}
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 whileHover={{ scale: 1.03 }}
//               >
//                 <ShoppingProductTile
//                   handleViewDetails={handleViewProductDetails}
//                   product={productItem}
//                   handleAddToCart={handleAddToCart}
//                 />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Support Features */}
//       <section className="py-8 sm:py-12 bg-gray-50 px-4 sm:px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//             {supportFeatures.map((feature, index) => {
//               const Icon = feature.icon;
//               return (
//                 <motion.div
//                   key={index}
//                   className="flex justify-center"
//                   whileHover={{ scale: 1.03 }}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <Card className="w-full">
//                     <CardContent className="flex flex-col items-center p-4 sm:p-6">
//                       <Icon className="w-8 h-8 sm:w-10 sm:h-10 mb-3 text-peach-500" />
//                       <h3 className="font-bold text-base sm:text-lg mb-2 text-center">
//                         {feature.title}
//                       </h3>
//                       <p className="text-xs sm:text-sm text-center text-gray-600">
//                         {feature.description}
//                       </p>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       <CustomerReviews />
//     </div>
//   );
// }

// export default ShoppingHome;

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Airplay, Apple, CloudLightning, Laptop, LaptopMinimal, ShoppingBag, Smartphone, TabletSmartphone, Tv, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { getFeatureImages } from "@/store/common-slice";
import { FaTruck, FaCreditCard, FaHeadset, FaShieldAlt } from "react-icons/fa";
import CustomerReviews from "@/components/shopping-view/customer-reviews";
import { toast } from "sonner";
import { getOrCreateSessionId } from "@/components/utils/session";

const categoriesWithIcon = [
  { id: "smartphones", label: "Smartphones", icon: Smartphone },
  { id: "laptops", label: "Laptops", icon: Laptop },
  { id: "monitors", label: "Monitors", icon: Tv },
  { id: "accessories", label: "Accessories", icon: CloudLightning },
  { id: "products", label: "All Products", icon: ShoppingBag },
];

const brandsWithIcon = [
  { id: "apple", label: "Apple", icon: Apple },
  { id: "samsung", label: "Samsung", icon: Airplay },
  { id: "dell", label: "Dell", icon: LaptopMinimal },
  { id: "hp", label: "HP", icon: TabletSmartphone },
  { id: "products", label: "All Products", icon: ShoppingBag },
];

const supportFeatures = [
  {
    icon: FaTruck,
    title: "Swift & Secure Delivery",
    description: "Our fast delivery policy applies to all orders, regardless of the order value or destination.",
  },
  {
    icon: FaCreditCard,
    title: "Secure & Seamless Payment",
    description: "Your payment is always safe, secure, and protected at all times.",
  },
  {
    icon: FaHeadset,
    title: "24/7 Support",
    description: "We are available 24/7 to assist you with any question, or issues you may have.",
  },
  {
    icon: FaShieldAlt,
    title: "Six Month Warranty",
    description: "All products come with a 6-month warranty for your peace of mind.",
  },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList } = useSelector((state) => state.shopProducts);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const checkScreen = () => setIsSmallScreen(window.innerWidth < 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const categoriesToShow = isSmallScreen ? categoriesWithIcon.slice(0, 4) : categoriesWithIcon;
  const brandsToShow = isSmallScreen ? brandsWithIcon.slice(0, 4) : brandsWithIcon;

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    const shuffledProducts = shuffleArray([...productList]).slice(0, 8);
    setFeaturedProducts(shuffledProducts);
    const interval = setInterval(() => {
      setFeaturedProducts(shuffleArray([...productList]).slice(0, 8));
    }, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [productList]);

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = { [section]: [getCurrentItem.id] };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  const handleViewProductDetails = (productId) => {
    navigate(`/shop/product/${productId}`);
  };

  const handleAddToCart = async (getCurrentProductId, getTotalStock) => {
    try {
      const userId = user?.id;
      const sessionId = userId ? null : getOrCreateSessionId();

      if (!userId && !sessionId) {
        toast.error("Session information missing. Please log in or enable cookies.", {
          icon: <AlertCircle className="text-red-500" />,
        });
        return;
      }

      const currentCartItems = Array.isArray(cartItems?.items) ? cartItems.items : [];
      const existingItem = currentCartItems.find(
        (item) => item.productId === getCurrentProductId
      );

      if (existingItem && existingItem.quantity >= getTotalStock) {
        toast.error(`Maximum available quantity (${getTotalStock}) reached for this product.`, {
          icon: <AlertCircle className="text-red-500" />,
        });
        return;
      }

      if (!existingItem && 1 > getTotalStock) {
        toast.error(`Only ${getTotalStock} quantity available for this product.`, {
          icon: <AlertCircle className="text-red-500" />,
        });
        return;
      }

      if (existingItem && existingItem.quantity + 1 > getTotalStock) {
        toast.error(`Adding one more would exceed available stock of ${getTotalStock}.`, {
          icon: <AlertCircle className="text-red-500" />,
        });
        return;
      }

      const response = await dispatch(
        addToCart({
          userId,
          productId: getCurrentProductId,
          quantity: 1,
          sessionId,
        })
      ).unwrap();

      if (response.success) {
        await dispatch(fetchCartItems({ userId, sessionId })).unwrap();
        toast.success("Product added to cart!", {
          icon: <CheckCircle className="text-green-500" />,
        });
      } else {
        toast.error(response.message || "Failed to add product to cart.", {
          icon: <AlertCircle className="text-red-500" />,
        });
      }
    } catch (error) {
      toast.error(error.message || "Failed to add product to cart.");
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = user?.id;
        const sessionId = userId ? null : getOrCreateSessionId();
        if (userId || sessionId) {
          await dispatch(fetchCartItems({ userId, sessionId })).unwrap();
        }
      } catch (error) {
        if (!user) localStorage.removeItem("guestSessionId");
      }
    };
    fetchCart();
  }, [dispatch, user]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    if (productList.length === 0) {
      dispatch(fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      }));
    }
  }, [dispatch, productList.length]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col space-y-8 sm:space-y-12 px-4 sm:px-6">
      {/* Hero Section */}
      <section className="w-full flex items-center justify-center py-8 sm:py-12">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-center items-start h-full text-center md:text-left"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-6 leading-tight">
              At <span className="text-orange-500 font-bold">Afkit</span>, we sell integrity and value for your money with a six months warranty
            </h1>
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            >
              <Button
                onClick={() => navigate("/shop/listing")}
                className="bg-blue-900 hover:bg-blue-700 text-white font-bold px-6 py-3 uppercase text-sm sm:text-base"
              >
                Shop Now
              </Button>
            </motion.div>
          </motion.div>
          <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden rounded-xl shadow-md">
            {featureImageList?.map((slide, index) => (
              <motion.div
                key={index}
                className="absolute top-0 left-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentSlide ? 1 : 0 }}
                transition={{ duration: 1 }}
              >
                <img
                  src={slide?.image}
                  className="w-full h-full object-cover"
                  alt={`Slide ${index + 1}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Products */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">Top Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {productList.slice(0, 8).map((productItem, index) => (
            <motion.div
              key={productItem._id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <ShoppingProductTile
                product={productItem}
                handleAddToCart={handleAddToCart}
                handleViewDetails={handleViewProductDetails}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories & Brands */}
      {/* <section className="max-w-7xl mx-auto space-y-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Shop by category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {categoriesToShow.map(({ id, label, icon: Icon }) => (
              <motion.div
                key={id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  onClick={() => handleNavigateToListingPage({ id }, "category")}
                  className="cursor-pointer hover:shadow-md h-full"
                >
                  <CardContent className="flex flex-col items-center justify-center p-3">
                    <Icon className="w-6 h-6 mb-1 text-peach-500" />
                    <span className="text-xs sm:text-sm font-medium text-center">{label}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Shop by Brand</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {brandsToShow.map(({ id, label, icon: Icon }) => (
              <motion.div
                key={id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  onClick={() => handleNavigateToListingPage({ id }, "brand")}
                  className="cursor-pointer hover:shadow-md h-full"
                >
                  <CardContent className="flex flex-col items-center justify-center p-3">
                    <Icon className="w-6 h-6 mb-1 text-peach-500" />
                    <span className="text-xs sm:text-sm font-medium text-center">{label}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

        {/* Shop by category - Reduced vertical padding */}
        <section className="py-6 sm:py-8 bg-gray-50 px-4 sm:px-6"> {/* Changed py-8 sm:py-12 to py-6 sm:py-8 */}
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-start mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold">Shop by category</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {categoriesToShow.map(({ id, label, icon: Icon }) => (
              <motion.div
                key={id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  onClick={() =>
                    handleNavigateToListingPage({ id }, "category")
                  }
                  className="cursor-pointer hover:shadow-md h-full"
                >
                  <CardContent className="flex flex-col items-center justify-center p-2 sm:p-3">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1 text-peach-500" />
                    <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-center leading-tight">
                      {label}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Brand - Reduced vertical padding */}
      <section className="py-6 sm:py-8 bg-gray-50 px-4 sm:px-6"> {/* Changed py-8 sm:py-12 to py-6 sm:py-8 */}
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-start mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold">Shop by Brand</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {brandsToShow.map(({ id, label, icon: Icon }) => (
              <motion.div
                key={id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  onClick={() => handleNavigateToListingPage({ id }, "brand")}
                  className="cursor-pointer hover:shadow-md h-full"
                >
                  <CardContent className="flex flex-col items-center justify-center p-2 sm:p-3">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1 text-peach-500" />
                    <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-center leading-tight">
                      {label}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {featuredProducts.map((productItem, index) => (
            <motion.div
              key={productItem._id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <ShoppingProductTile
                product={productItem}
                handleAddToCart={handleAddToCart}
                handleViewDetails={handleViewProductDetails}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Support Features */}
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {supportFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardContent className="flex flex-col items-center p-4">
                    <Icon className="w-8 h-8 mb-3 text-peach-500" />
                    <h3 className="font-bold text-base mb-2 text-center">{feature.title}</h3>
                    <p className="text-xs text-center text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      <CustomerReviews />
    </div>
  );
}

export default ShoppingHome;