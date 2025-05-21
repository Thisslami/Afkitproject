

// import { motion } from "framer-motion";

// const LoadingSpinner = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#FFE5D4] via-[#FFC4A3] to-[#FFA88C]">
//       <motion.div
//         className="w-16 h-16 border-4 bg-[#2C2C2C] border-t-transparent rounded-full"
//         animate={{ rotate: 360 }}
//         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//       />
//     </div>
//   );
// };

// export default LoadingSpinner;


import { motion } from "framer-motion";
import AfkitLogo from "../../assets/afkit-logo.png"; // update path if needed

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <motion.img
        src={AfkitLogo}
        alt="Loading..."
        className="w-38 h-auto"
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
