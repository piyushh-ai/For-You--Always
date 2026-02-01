import { useMemories } from "@/hooks/use-memories";
import { PolaroidCard } from "@/components/PolaroidCard";
import { Loader2, Heart, Sparkles, Camera, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useEffect, useState } from "react";

export default function Memories() {
  const { data: memories, isLoading } = useMemories();
  const [hoveredButton, setHoveredButton] = useState(false);

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "instant" });
}, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Loader2 className="w-12 h-12 text-pink-400" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 font-handwriting text-xl text-pink-600"
        >
          Loading our precious moments...
        </motion.p>
      </div>
    );
  }

  // Placeholder data if empty, just for demo visuals
  const displayMemories = (memories && memories.length > 0) ? memories : [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80",
      type: "image",
      caption: "The way you smile",
      date: "Always",
      rotation: -2
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80",
      type: "image",
      caption: "Beautiful moments",
      date: "Spring 2023",
      rotation: 3
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80",
      type: "image",
      caption: "Never letting go",
      date: "Forever",
      rotation: -4
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80",
      type: "image",
      caption: "Chasing sunsets",
      date: "Summer Vacation",
      rotation: 2
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80",
      type: "image",
      caption: "Surprises",
      date: "Your Birthday",
      rotation: 5
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80",
      type: "image",
      caption: "Coffee dates",
      date: "Every Weekend",
      rotation: -3
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-rose-50/50 via-pink-50/30 to-purple-50/50">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.08, 0.03],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-400 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.03, 0.08, 0.03],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full blur-[150px]"
        />

        {/* Floating hearts */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
              opacity: 0,
            }}
            animate={{
              y: -200,
              opacity: [0, 0.3, 0.3, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
          >
            <Heart className="w-4 h-4 text-pink-300/40 fill-pink-200/40" />
          </motion.div>
        ))}

        {/* Sparkles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-3 h-3 text-pink-400/40" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 pt-24 md:pt-32 pb-24 md:pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-16 md:mb-24"
          >
            {/* Top decorative element */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-pink-400" />
              </motion.div>
              <div className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent via-pink-400/50 to-transparent" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Camera className="w-6 h-6 text-rose-500" />
              </motion.div>
              <div className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent via-pink-400/50 to-transparent" />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-pink-400" />
              </motion.div>
            </motion.div>

            {/* Main title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4 md:space-y-6"
            >
              <motion.h1
                animate={{
                  textShadow: [
                    "0 0 20px rgba(244, 114, 182, 0.1)",
                    "0 0 30px rgba(244, 114, 182, 0.2)",
                    "0 0 20px rgba(244, 114, 182, 0.1)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 leading-tight px-4"
              >
                Captured Moments
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="font-handwriting text-xl sm:text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 px-4"
              >
                Snapshots of our love story
              </motion.p>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-sm md:text-base text-gray-600 italic max-w-2xl mx-auto px-4"
              >
                Each photo holds a thousand emotions, each moment a lifetime of memories
              </motion.p>
            </motion.div>

            {/* Floating hearts decoration */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="flex items-center justify-center gap-2 mt-6"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  <Heart className="w-2 h-2 md:w-3 md:h-3 text-pink-400/50 fill-pink-300/50" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Memories Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 px-4 md:px-8"
          >
            {displayMemories.map((memory, idx) => (
              <PolaroidCard key={memory.id} memory={memory} index={idx} />
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center justify-center mt-20 md:mt-32 px-4 relative"
          >
            {/* Decorative background for CTA */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-[100px]" />
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-xs mb-12 relative"
            >
              <div className="h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent" />
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full"
              >
                <Heart className="w-4 h-4 text-rose-500 fill-rose-400" />
              </motion.div>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 space-y-8 text-center">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-handwriting text-2xl md:text-3xl text-transparent mb-5 bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600"
              >
                But the best part is yet to come...
              </motion.p>

              <Link href="/surprise">
                <motion.button
                  onHoverStart={() => setHoveredButton(true)}
                  onHoverEnd={() => setHoveredButton(false)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white rounded-full font-serif text-base md:text-lg lg:text-xl shadow-2xl shadow-pink-400/50 overflow-hidden transition-all duration-500"
                >
                  {/* Animated gradient overlay */}
                  <motion.div
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />

                  {/* Button glow effect */}
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-white/10 rounded-full blur-lg"
                  />

                  <span className="relative flex items-center gap-3 whitespace-nowrap">
                    <Heart className="w-5 h-5 fill-white" />
                    I have a surprise for you
                    <motion.div
                      animate={{ x: hoveredButton ? [0, 5, 0] : 0 }}
                      transition={{ duration: 1, repeat: hoveredButton ? Infinity : 0 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </span>

                  {/* Sparkles on hover */}
                  {hoveredButton && (
                    <motion.div className="absolute inset-0 pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                            x: Math.cos((i * Math.PI) / 4) * 40,
                            y: Math.sin((i * Math.PI) / 4) * 40,
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                          style={{
                            left: "50%",
                            top: "50%",
                          }}
                        >
                          <Sparkles className="w-4 h-4 text-white" />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </motion.button>
              </Link>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xs md:text-sm text-gray-500 italic"
              >
                Click when your heart is ready to feel even more special
              </motion.p>
            </div>
          </motion.div>

          {/* Bottom decorative element */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.5, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center justify-center gap-2 mt-16"
          >
            <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-pink-300/50" />
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <Heart className="w-2 h-2 md:w-3 md:h-3 text-pink-400/60 fill-pink-300/40" />
              </motion.div>
            ))}
            <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-pink-300/50" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}