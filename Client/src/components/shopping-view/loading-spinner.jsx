import { motion } from "framer-motion";
import AfkitLogo from "../../assets/afkit-logo.png"; // update path if needed

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <motion.img
        src={AfkitLogo}
        alt="Loading..."
        className="max-w-xs sm:max-w-sm md:max-w-md w-full h-auto" // Adjusted className
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.9, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default LoadingSpinner;