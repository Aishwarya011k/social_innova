import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar' 
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#4A1D18] via-[#A64B39] to-[#D66D55] text-[#F7E6D5]">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path='/features' element={<Features />}/>

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
