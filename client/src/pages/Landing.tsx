import { motion, useMotionValue, useTransform } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { useAudio } from "@/hooks/use-audio";
import { useConfig } from "@/hooks/use-config";
import { usePartner } from "@/hooks/use-partner";
import { useState, useEffect } from "react";

export default function Landing() {
  const [, setLocation] = useLocation();
  const { toggle } = useAudio();
  const { isLoading } = useConfig();
  const { name } = usePartner();
  const [isHovering, setIsHovering] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const rotateX = useTransform(mouseY, [-300, 300], [8, -8]);
  const rotateY = useTransform(mouseX, [-300, 300], [-8, 8]);

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = async () => {
    toggle();
    await new Promise((r) => setTimeout(r, 500));
    setLocation("/story");
  };

  return (
    <div 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 px-4"
      onMouseMove={handleMouseMove}
    >
      {/* Dreamy background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-200/20 via-transparent to-transparent" />
      
      {/* Multiple glowing auras */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[700px] h-[700px] bg-gradient-to-r from-pink-300/30 to-purple-300/30 rounded-full blur-[140px]"
      />
      
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.3, 0.15],
          rotate: [90, 0, 90]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute w-[600px] h-[600px] bg-gradient-to-l from-rose-300/30 to-pink-300/30 rounded-full blur-[120px]"
      />

      {/* Floating hearts */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
              opacity: 0,
            }}
            animate={{
              y: -200,
              opacity: [0, 0.6, 0.6, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear",
            }}
          >
            <Heart className="w-4 h-4 text-pink-400/40 fill-pink-300/40" />
          </motion.div>
        ))}
      </motion.div>

      {/* Sparkle particles */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-3 h-3 text-pink-400/50" />
          </motion.div>
        ))}
      </motion.div>

      {/* Main content container */}
      <motion.div 
        className="z-10 flex flex-col items-center text-center space-y-14 max-w-2xl"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Top decorative element */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 text-pink-400/70" />
          </motion.div>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-pink-400/50 to-transparent" />
          <Heart className="w-4 h-4 text-rose-400 fill-rose-300/50" />
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-pink-400/50 to-transparent" />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 text-pink-400/70" />
          </motion.div>
        </motion.div>

        {/* Heading section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="space-y-6"
        >
          <motion.span 
            className="font-handwriting text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 block leading-relaxed"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            I've been carrying this in my heart for so long…
          </motion.span>

          <motion.div
            animate={{ 
              textShadow: [
                "0 0 20px rgba(244, 114, 182, 0.1)",
                "0 0 30px rgba(244, 114, 182, 0.2)",
                "0 0 20px rgba(244, 114, 182, 0.1)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <h1 className="font-serif text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-rose-600 via-pink-600 to-purple-600 tracking-tight leading-tight">
              {isLoading ? (
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  …
                </motion.span>
              ) : (
                name
              )}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="space-y-2"
          >
            <p className="text-base md:text-lg text-rose-700/80 font-light italic leading-relaxed px-4">
              Every moment since you walked into my life,
              <br />
              <span className="text-pink-600/90">the universe feels a little more magical.</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Interactive heart button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <motion.button
            onClick={handleStart}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="relative group cursor-pointer"
          >
            {/* Outer glow rings */}
            {isHovering && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400/30 to-rose-400/30"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 0, 0.6]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400/20 to-purple-400/20"
                  animate={{ 
                    scale: [1, 1.8, 1],
                    opacity: [0.4, 0, 0.4]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                />
              </>
            )}

            {/* Main button */}
            <div className="relative z-10 bg-gradient-to-br from-white via-pink-50 to-white p-10 rounded-full shadow-2xl shadow-pink-300/50 border-4 border-pink-200 group-hover:border-rose-300 transition-all duration-500 group-hover:shadow-pink-400/60">
              {/* Heartbeat animation */}
              <motion.div
                animate={{ 
                  scale: isHovering ? [1, 1.15, 1] : [1, 1.05, 1]
                }}
                transition={{
                  duration: isHovering ? 0.6 : 1.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart
                  className="w-20 h-20 text-rose-500 fill-pink-200 group-hover:fill-rose-400 transition-all duration-500"
                  strokeWidth={1.8}
                />
              </motion.div>

              {/* Inner sparkles */}
              {isHovering && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: Math.cos(i * 60 * Math.PI / 180) * 50,
                        y: Math.sin(i * 60 * Math.PI / 180) * 50,
                      }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                    >
                      <Sparkles className="w-3 h-3 text-pink-400" />
                    </motion.div>
                  ))}
                </>
              )}
            </div>

            {/* Pulse rings */}
            <motion.span 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400/20 to-rose-400/20"
              animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400/15 to-purple-400/15"
              animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
            />
          </motion.button>

          {/* Hover message */}
          {isHovering && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-rose-600 font-handwriting text-xl whitespace-nowrap"
            >
              Yes, this is for you ♡
            </motion.p>
          )}
        </motion.div>

        {/* Bottom whisper text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showMessage ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="space-y-3"
        >
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-rose-600/80 font-handwriting text-lg"
          >
            Click the heart when you're ready…
          </motion.p>
          
          <p className="text-pink-500/60 text-xs italic">
            (Some feelings are too precious to rush)
          </p>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1.2, delay: 2 }}
          className="flex items-center gap-2"
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-pink-300/50" />
          <Heart className="w-3 h-3 text-pink-400/60 fill-pink-300/40" />
          <div className="h-px w-16 bg-gradient-to-r from-pink-300/50 via-rose-300/50 to-pink-300/50" />
          <Heart className="w-3 h-3 text-rose-400/60 fill-rose-300/40" />
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-pink-300/50" />
        </motion.div>
      </motion.div>
    </div>
  );
}