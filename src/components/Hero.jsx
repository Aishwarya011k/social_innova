import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';
import { heroImg } from '../assets';
import { motion } from "framer-motion";
const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[calc(100vh-4rem)] w-full flex flex-col lg:flex-row items-center justify-between px-4 py-8 lg:py-0">
      {/* Text Content (40%) */}
      <div className="w-full lg:w-[40%] space-y-6 text-left z-10">
        <h1 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-bold text-[#F7E6D5] leading-tight">
          Introducing!, <span className="text-4xl md:text-5xl lg:text-6xl text-[#E7C7BC]"><Typewriter words={["Heart2Hand"]} loop cursor cursorStyle="|" /></span>
        </h1>
        <p className="font-poppins text-lg text-[#F7E6D5] leading-relaxed max-w-xl">
          At Heart2Hand, we believe that small acts of kindness can change lives. Our mission is to connect generous donors with those in need by making clothing donations simple, accessible, and impactful.
        </p>
        <div className="flex gap-4 pt-4">
          <button
            onClick={() => navigate('/about')}
            className="px-8 py-3 bg-[#D66D55] text-white rounded-lg hover:bg-[#A64B39] transition font-semibold"
          >
            Start Donating
          </button>
          <button className="px-6 py-3 border border-[#E7C7BC] text-[#F7E6D5] font-semibold rounded-lg hover:bg-[#D66D55]/10 transition">
            View Documentation
          </button>
        </div>
      </div>
       <motion.div
  className="flex-1 max-w-md mt-10 md:mt-0 md:ml-12 rounded-lg overflow-hidden shadow-lg cursor-pointer"
  style={{ maxHeight: 490 }}  // limit height to 300px
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(214, 109, 85, 0.4)" }}
>
  <img
    src={heroImg}
    alt="Hero Visual"
    className="w-full h-full object-contain rounded-lg"
    draggable={false}
  />
</motion.div>

    </section>
  );
};

export default Hero;

