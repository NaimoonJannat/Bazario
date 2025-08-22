import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="relative w-full h-screen bg-[#001f3f] flex flex-col md:flex-row items-center justify-between overflow-hidden px-6 md:px-16 py-32 md:py-12">
      {/* Background Image with blur and darkness */}
      <motion.img
        src="https://i.pinimg.com/736x/c5/9c/ce/c59cce10929410537aa224149cf5aed0.jpg"
        alt="Department Store"
        className="absolute inset-0 w-full h-full object-cover opacity-80 blur-sm"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
      />
      <div className="absolute inset-0 bg-[#001f3f]/60 z-0" />

      {/* Left Content */}
      <motion.div
        className="relative z-10 w-full md:w-1/2 text-white font-title"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg leading-tight">
          Smart Department Store <br /> Management System
        </h1>
        <p className="mt-4 text-lg text-[#d4ff00] font-medium max-w-md drop-shadow-md">
          Boost operational efficiency, track inventory in real time, and make data-driven decisions.
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          className="mt-6 px-6 py-3 bg-[#d4ff00] text-[#001f3f] font-bold rounded-xl shadow-xl flex items-center gap-2"
        >
          Get Started <ArrowRight size={18} />
        </motion.button>
      </motion.div>

      {/* Right Image */}
      <motion.div
        className="relative z-10 w-full md:w-1/2 flex justify-center mt-10 md:mt-0"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <img
          src="./hero2.png" 
          alt="Store Illustration"
          className="w-4/5 max-w-md rounded-2xl shadow-2xl"
        />
      </motion.div>
    </div>
  );
};

export default HeroBanner;
