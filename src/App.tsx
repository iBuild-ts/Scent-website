import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, Menu, Search, Fingerprint, Sparkles, Droplets, Globe, ChevronDown, Play } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

// 3D Tilt Card Component for Luxury Interactivity
const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full h-full relative"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  
  // Parallax ref for Sourcing Section
  const sourcingRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sourcingRef,
    offset: ["start end", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Elegant, slow easing for luxury feel
  const ease = [0.25, 0.1, 0.25, 1];

  // Reusable blur reveal animation variants
  const blurReveal = {
    hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" }
  };

  return (
    <div className="min-h-screen bg-[#030705] text-[#F5F2ED] font-sans selection:bg-[#D4AF37]/30">
      
      {/* Ultra-Minimal Luxury Navbar */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease }}
        className={`fixed top-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-8 transition-all duration-700 ${
          scrolled ? 'glass-panel py-6' : 'bg-transparent'
        }`}
      >
        {/* Left Links */}
        <div className="hidden md:flex items-center space-x-12 text-[10px] tracking-[0.25em] uppercase text-[#F5F2ED]/70">
          <a href="#collection" className="hover:text-gold transition-colors duration-500">Collection</a>
          <a href="#synthesis" className="hover:text-gold transition-colors duration-500">Synthesis</a>
          <a href="#maison" className="hover:text-gold transition-colors duration-500">Maison</a>
        </div>
        
        {/* Center Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="text-2xl md:text-3xl font-serif tracking-[0.3em] uppercase font-light">
            Aura
          </div>
          <div className="text-[8px] tracking-[0.4em] uppercase text-gold mt-1 shimmer-text">
            Parfumerie
          </div>
        </div>
        
        {/* Right Links */}
        <div className="hidden md:flex items-center space-x-8 text-[10px] tracking-[0.25em] uppercase text-[#F5F2ED]/70">
          <button className="hover:text-gold transition-colors duration-500 flex items-center">
            <Search className="w-3 h-3 mr-2" /> Search
          </button>
          <button className="hover:text-gold transition-colors duration-500 flex items-center">
            Cart (0)
          </button>
        </div>
        
        {/* Mobile Menu */}
        <button className="md:hidden text-[#F5F2ED]">
          <Menu size={20} strokeWidth={1} />
        </button>
      </motion.nav>

      {/* Vertical Text (Editorial Magazine Feel) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1, ease }}
        className="hidden lg:block fixed left-8 top-1/2 transform -translate-y-1/2 z-40 pointer-events-none"
      >
        <div className="vertical-text text-[9px] tracking-[0.4em] uppercase text-[#F5F2ED]/40 flex items-center space-x-4">
          <span>AI-Generated Olfactory Experience</span>
          <div className="w-[1px] h-12 bg-[#F5F2ED]/20 my-4"></div>
          <span>No. 01</span>
        </div>
      </motion.div>

      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex items-center px-8 md:px-24 pt-24 pb-12">
        {/* Fixed Background Image for Hero */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, ease }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat fixed"
            style={{
              backgroundImage: `url('https://image2url.com/r2/default/images/1772413494248-37a68b3f-f6a7-4a15-96bd-efc345a6ecc3.png')`, 
            }}
          />
          {/* Subtle gradient to ensure text readability on the left, leaving the right (candle) clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030705]/90 via-[#030705]/40 to-transparent fixed"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#030705] via-transparent to-transparent fixed"></div>
        </div>

        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center relative z-10">
          {/* Left Content - Typography Focus */}
          <div className="w-full md:w-1/2 lg:w-5/12 pt-12 md:pt-0">
            <motion.div
              variants={blurReveal}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1.5, delay: 0.2, ease }}
              className="flex items-center space-x-4 mb-8"
            >
              <div className="w-8 h-[1px] bg-gold"></div>
              <span className="text-gold uppercase tracking-[0.3em] text-[9px] font-medium shimmer-text">
                The Signature Collection
              </span>
            </motion.div>
            
            <motion.h1 
              variants={blurReveal}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1.5, delay: 0.4, ease }}
              className="text-6xl md:text-7xl lg:text-[110px] font-serif leading-[0.9] mb-8 font-light"
            >
              Freesia & <br />
              <span className="italic text-[#F5F2ED]/80">Bitter Orange</span>
            </motion.h1>
            
            <motion.p 
              variants={blurReveal}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1.5, delay: 0.6, ease }}
              className="text-[#F5F2ED]/60 text-xs md:text-sm font-light mb-12 leading-[2] tracking-[0.05em] max-w-md"
            >
              Delight yourself with peaceful scent. A great aromatherapy companion, synthesized through advanced biometric analysis to perfectly match your aura.
            </motion.p>
            
            <motion.div 
              variants={blurReveal}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1.5, delay: 0.8, ease }}
              className="flex items-center space-x-8"
            >
              <button className="group relative flex items-center justify-center w-16 h-16 rounded-full border border-gold/30 hover:border-gold transition-colors duration-700">
                <div className="absolute inset-0 rounded-full bg-gold/5 scale-0 group-hover:scale-100 transition-transform duration-700 ease-out"></div>
                <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform duration-500" strokeWidth={1.5} />
              </button>
              <div className="flex flex-col">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#F5F2ED]/50 mb-1">Commence</span>
                <span className="text-xs tracking-[0.2em] uppercase font-medium">AI Analysis</span>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Empty space to let the background image (candle) shine */}
          <div className="w-full md:w-1/2 lg:w-7/12 hidden md:flex justify-end items-end h-[60vh]">
            {/* Floating Glass Widget */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)", y: 20 }}
              animate={{ opacity: 1, backdropFilter: "blur(16px)", y: 0 }}
              transition={{ duration: 2, delay: 1.2, ease }}
              className="glass-panel shimmer-bg p-6 rounded-sm flex flex-col space-y-4 max-w-xs"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#F5F2ED]/50">Synthesis Status</span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-gold shimmer-text">Active</span>
              </div>
              <div>
                <div className="text-2xl font-serif font-light mb-1">99.8%</div>
                <div className="text-[9px] tracking-[0.2em] uppercase text-[#F5F2ED]/50">Biometric Match Rate</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2, ease }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
        >
          <span className="text-[8px] tracking-[0.3em] uppercase text-[#F5F2ED]/40 mb-2 shimmer-text">Scroll</span>
          <motion.div 
            animate={{ y: [0, 5, 0] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-[#F5F2ED]/40" strokeWidth={1} />
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: PHILOSOPHY (The Alchemy of Algorithm) */}
      <section id="maison" className="relative z-20 bg-[#030705] py-32 md:py-48 px-8 md:px-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            variants={blurReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease }}
          >
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-8 h-[1px] bg-gold"></div>
              <span className="text-gold uppercase tracking-[0.3em] text-[9px] font-medium shimmer-text">Our Philosophy</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-light mb-8 leading-[1.1]">
              The Alchemy of <br />
              <span className="italic text-gold">Algorithm</span>
            </h2>
            <p className="text-[#F5F2ED]/60 text-xs md:text-sm font-light leading-[2] tracking-[0.05em] mb-8">
              We have transcended traditional perfumery. By mapping your digital footprint, emotional resonance, and biometric data, our neural networks compose a fragrance that is mathematically, perfectly you. It is not just a scent; it is your aura, distilled.
            </p>
            <button className="text-[10px] tracking-[0.25em] uppercase border-b border-gold/30 pb-1 hover:border-gold transition-colors duration-500 text-gold">
              Discover the Maison
            </button>
          </motion.div>
          
          <motion.div 
            variants={blurReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, delay: 0.2, ease }}
            className="relative"
          >
            <TiltCard className="w-full aspect-[3/4] max-w-md mx-auto">
              <div className="w-full h-full relative rounded-sm overflow-hidden border border-white/10 group shimmer-bg">
                <img 
                  src="https://images.unsplash.com/photo-1616940844649-535215ae4eb1?q=80&w=1000&auto=format&fit=crop" 
                  alt="Abstract liquid glass" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030705] via-transparent to-transparent opacity-80"></div>
                
                {/* 3D Floating Element inside TiltCard */}
                <div 
                  className="absolute bottom-8 left-8 right-8 glass-panel p-6"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <div className="text-[9px] tracking-[0.3em] uppercase text-gold mb-2">01 / Formulation</div>
                  <div className="text-xl font-serif font-light">Precision Extraction</div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: THE COLLECTION */}
      <section id="collection" className="relative z-20 bg-[#020403] py-32 md:py-48 px-8 md:px-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={blurReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-4 h-[1px] bg-gold"></div>
              <span className="text-gold uppercase tracking-[0.3em] text-[9px] font-medium shimmer-text">Curated</span>
              <div className="w-4 h-[1px] bg-gold"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-light mb-6">
              The <span className="italic text-gold">Syntheses</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                name: "Oud & Neural Network",
                price: "$450",
                img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
                tag: "No. 02"
              },
              {
                name: "Santal & Algorithm",
                price: "$380",
                img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop",
                tag: "No. 03"
              },
              {
                name: "Bergamot & Data",
                price: "$410",
                img: "https://images.unsplash.com/photo-1615397323048-18e3dd50195e?q=80&w=800&auto=format&fit=crop",
                tag: "No. 04"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={blurReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, delay: idx * 0.2, ease }}
              >
                <TiltCard className="w-full aspect-[3/4] mb-6">
                  <div className="w-full h-full relative rounded-sm overflow-hidden border border-white/5 group bg-[#030705] shimmer-bg">
                    <img 
                      src={item.img} 
                      alt={item.name}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute top-6 left-6 glass-panel px-3 py-1 rounded-full" style={{ transform: "translateZ(30px)" }}>
                      <span className="text-[8px] tracking-[0.2em] uppercase text-gold">{item.tag}</span>
                    </div>
                  </div>
                </TiltCard>
                <div className="text-center">
                  <h3 className="text-lg font-serif font-light mb-2">{item.name}</h3>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#F5F2ED]/50">{item.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: AI PROCESS */}
      <section id="synthesis" className="relative z-20 bg-[#030705] py-32 md:py-48 px-8 md:px-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="flex flex-col justify-center">
              <motion.div
                variants={blurReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease }}
              >
                <h2 className="text-4xl md:text-5xl font-serif font-light mb-12 leading-[1.1]">
                  The Architecture of <br />
                  <span className="italic text-gold">Your Scent</span>
                </h2>
                
                <div className="space-y-12">
                  {[
                    {
                      icon: <Fingerprint className="w-5 h-5 text-gold" strokeWidth={1} />,
                      title: "Biometric Mapping",
                      desc: "We analyze your skin chemistry, natural pheromone baseline, and lifestyle data points."
                    },
                    {
                      icon: <Sparkles className="w-5 h-5 text-gold" strokeWidth={1} />,
                      title: "Neural Synthesis",
                      desc: "Our AI cross-references 10,000+ olfactory notes to formulate a mathematically perfect accord."
                    },
                    {
                      icon: <Droplets className="w-5 h-5 text-gold" strokeWidth={1} />,
                      title: "Artisanal Blending",
                      desc: "Master perfumers in Grasse, France hand-blend your AI-generated formula using raw, pure extracts."
                    }
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-6 group">
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-gold/50 transition-colors duration-500">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-serif mb-2 group-hover:text-gold transition-colors duration-500">{step.title}</h3>
                        <p className="text-[#F5F2ED]/50 text-xs font-light leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              variants={blurReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3, ease }}
              className="relative h-[600px] hidden lg:block"
            >
              <TiltCard className="absolute inset-0">
                <div className="w-full h-full border border-white/5 rounded-sm relative overflow-hidden bg-[#020403] flex items-center justify-center shimmer-bg">
                  {/* Abstract AI Visualization */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent"></div>
                  <div className="w-64 h-64 border border-gold/20 rounded-full absolute animate-[spin_20s_linear_infinite]"></div>
                  <div className="w-48 h-48 border border-gold/30 rounded-full absolute animate-[spin_15s_linear_infinite_reverse]"></div>
                  <div className="w-32 h-32 border border-gold/40 rounded-full absolute flex items-center justify-center backdrop-blur-md">
                    <Globe className="w-8 h-8 text-gold opacity-80" strokeWidth={1} />
                  </div>
                  
                  <div className="absolute bottom-8 left-8" style={{ transform: "translateZ(50px)" }}>
                    <div className="text-[8px] tracking-[0.4em] uppercase text-gold mb-1 shimmer-text">Live Processing</div>
                    <div className="text-sm font-serif">Neural Network Active</div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PARALLAX SOURCING */}
      <section ref={sourcingRef} className="relative z-20 h-[80vh] overflow-hidden flex items-center justify-center">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0 w-full h-[130%]"
        >
          <img 
            src="https://images.unsplash.com/photo-1605265115264-b81602951c34?q=80&w=2000&auto=format&fit=crop" 
            alt="Dark moody leaves" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030705] via-[#030705]/50 to-[#030705]"></div>
        </motion.div>
        
        <div className="relative z-10 text-center px-8 max-w-3xl mx-auto">
          <motion.div
            variants={blurReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease }}
          >
            <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center mx-auto mb-8 hover:bg-gold/10 transition-colors cursor-pointer">
              <Play className="w-4 h-4 text-gold ml-1" fill="currentColor" />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-light mb-6">
              Sourced from <span className="italic text-gold">Nature</span>, <br />
              Refined by <span className="italic text-gold">Code</span>.
            </h2>
            <p className="text-[#F5F2ED]/60 text-xs md:text-sm font-light leading-[2] tracking-[0.05em]">
              Watch our documentary on how we ethically source the world's rarest botanicals, from the mountains of Calabria to the fields of Grasse, before digitizing their essence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS & PRESS */}
      <section className="relative z-20 bg-[#030705] py-32 px-8 md:px-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={blurReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease }}
          >
            <div className="text-gold text-4xl font-serif mb-8 shimmer-text">"</div>
            <h3 className="text-2xl md:text-4xl font-serif font-light leading-relaxed mb-12">
              Aura has completely disrupted the luxury fragrance market. It is the most <span className="italic text-gold">intimate, personalized</span> luxury product ever created.
            </h3>
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#F5F2ED]/50">
              — Vogue Magazine
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: FOOTER */}
      <footer className="relative z-20 bg-[#020403] pt-32 pb-12 px-8 md:px-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={blurReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease }}
            className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24"
          >
            <div className="col-span-1 md:col-span-2">
              <div className="text-3xl font-serif tracking-[0.3em] uppercase font-light mb-2">Aura</div>
              <div className="text-[8px] tracking-[0.4em] uppercase text-gold mb-8 shimmer-text">Parfumerie</div>
              <p className="text-[#F5F2ED]/40 text-xs font-light leading-relaxed max-w-sm mb-8">
                The intersection of artificial intelligence and haute parfumerie. Crafting your unique olfactory signature.
              </p>
              <div className="flex space-x-4">
                <input 
                  type="email" 
                  placeholder="ENTER EMAIL FOR EXCLUSIVE ACCESS" 
                  className="bg-transparent border-b border-white/20 pb-2 text-[9px] tracking-[0.2em] uppercase w-64 focus:outline-none focus:border-gold transition-colors"
                />
                <button className="text-[9px] tracking-[0.2em] uppercase text-gold hover:text-white transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-8">Maison</h4>
              <ul className="space-y-4 text-xs font-light text-[#F5F2ED]/60">
                <li><a href="#" className="hover:text-gold transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">The AI Process</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Boutiques</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-8">Client Services</h4>
              <ul className="space-y-4 text-xs font-light text-[#F5F2ED]/60">
                <li><a href="#" className="hover:text-gold transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Track Order</a></li>
              </ul>
            </div>
          </motion.div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-[9px] tracking-[0.2em] uppercase text-[#F5F2ED]/30">
            <div>&copy; 2026 AURA AI PARFUMERIE. ALL RIGHTS RESERVED.</div>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
