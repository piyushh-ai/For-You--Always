import { useConfig } from "@/hooks/use-config";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Loader2, Heart, Sparkles, Feather } from "lucide-react";
import { usePartner } from "@/hooks/use-partner";

export default function FinalNote() {
  const { data: config, isLoading } = useConfig();
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const { name, message } = usePartner();

  const fullText = "Loving you is not something I do—it's who I am. In every breath, every silence, every tomorrow, it's you. Happy Valentine's Day to the one my heart chose long before I ever understood love.";

  useEffect(() => {
    if (isLoading) return;
    
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => {
        if (index >= fullText.length) {
          clearInterval(timer);
          setIsTypingComplete(true);
          return prev;
        }
        index++;
        return fullText.slice(0, index);
      });
    }, 40); // Typing speed

    return () => clearInterval(timer);
  }, [fullText, isLoading]);

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
          Preparing something special for you...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Soft vintage glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/3 w-96 h-96 bg-rose-300 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-amber-300 rounded-full blur-[150px]"
        />

        {/* Floating vintage elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.2, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-3 h-3 text-rose-400/30" />
          </motion.div>
        ))}

        {/* Floating hearts */}
        {isTypingComplete && [...Array(6)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
            }}
            animate={{
              y: -200,
              opacity: [0, 0.3, 0.3, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
          >
            <Heart className="w-4 h-4 text-rose-400/30 fill-rose-300/30" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl w-full relative z-10 px-2 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ perspective: "1000px" }}
        >
          {/* Letter container with vintage paper effect */}
          <div className="relative">
            {/* Paper shadow layers for depth - hide on mobile */}
            <div className="hidden sm:block absolute inset-0 bg-amber-100/40 rounded-sm transform translate-x-1 translate-y-1 blur-sm" />
            <div className="hidden sm:block absolute inset-0 bg-amber-100/30 rounded-sm transform translate-x-2 translate-y-2 blur-md" />

            {/* Main letter */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative bg-gradient-to-br from-amber-50/95 to-rose-50/95 backdrop-blur-sm p-6 sm:p-10 md:p-16 lg:p-20 shadow-2xl rounded-sm border-2 border-amber-200/50 min-h-[75vh] sm:min-h-[70vh] flex flex-col items-center justify-center"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.05) 0%, transparent 50%),
                  radial-gradient(circle at 80% 50%, rgba(251, 146, 160, 0.05) 0%, transparent 50%)
                `,
              }}
            >
              {/* Vintage paper texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
                }}
              />

              {/* Ruled lines */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.07]"
                style={{
                  backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, rgba(191, 148, 114, 0.3) 31px, rgba(191, 148, 114, 0.3) 32px)",
                  backgroundSize: "100% 32px",
                }}
              />

              {/* Top decorative border */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden sm:block">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="bg-gradient-to-br from-amber-100 to-rose-100 p-3 rounded-full shadow-lg border-2 border-white/50"
                >
                  <Feather className="w-5 h-5 text-rose-600" />
                </motion.div>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-3 left-3 sm:top-6 sm:left-6 opacity-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-amber-600" />
                </motion.div>
              </div>
              <div className="absolute top-3 right-3 sm:top-6 sm:right-6 opacity-20">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-rose-600" />
                </motion.div>
              </div>
              <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 opacity-20">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 fill-pink-500/50" />
              </div>
              <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 opacity-20">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 fill-rose-500/50" />
              </div>

              {/* Letter content */}
              <div className="relative z-10 text-center space-y-6 sm:space-y-8 md:space-y-12 max-w-3xl mx-auto w-full">
                {/* Greeting */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="space-y-2 sm:space-y-3"
                >
                  <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="h-px w-6 sm:w-8 md:w-12 bg-gradient-to-r from-transparent to-rose-400/40" />
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-rose-500 fill-rose-400" />
                    </motion.div>
                    <div className="h-px w-6 sm:w-8 md:w-12 bg-gradient-to-l from-transparent to-rose-400/40" />
                  </div>

                  <h1 className="font-handwriting text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-rose-700 via-pink-600 to-purple-600 px-2">
                    My Dearest {name},
                  </h1>

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "4rem" }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="h-0.5 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full mx-auto opacity-50"
                  />
                </motion.div>

                {/* Main message */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="relative px-2 sm:px-4"
                >
                  {/* Quote marks - hide on very small screens */}
                  <div className="hidden sm:block absolute -left-2 md:-left-4 lg:-left-8 top-0 text-4xl md:text-6xl lg:text-8xl text-rose-300/20 font-serif leading-none">
                    "
                  </div>
                  <div className="hidden sm:block absolute -right-2 md:-right-4 lg:-right-8 bottom-0 text-4xl md:text-6xl lg:text-8xl text-rose-300/20 font-serif leading-none">
                    "
                  </div>

                  <p className="font-serif text-base sm:text-lg md:text-2xl lg:text-3xl text-gray-800 leading-relaxed sm:leading-relaxed md:leading-relaxed whitespace-pre-wrap min-h-[120px] sm:min-h-[150px] md:min-h-[200px] px-2 sm:px-4 md:px-8">
                    {displayedText}
                    {!isTypingComplete && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="text-rose-500"
                      >
                        |
                      </motion.span>
                    )}
                  </p>
                </motion.div>

                {/* Signature */}
                {isTypingComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="pt-6 sm:pt-8 md:pt-12 space-y-4 sm:space-y-6"
                  >
                    {/* Decorative divider */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                      className="flex items-center justify-center gap-1 sm:gap-2 mb-4 sm:mb-6"
                    >
                      <div className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent to-rose-400/40" />
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.4, 0.7, 0.4],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        >
                          <Heart className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-rose-500 fill-rose-400" />
                        </motion.div>
                      ))}
                      <div className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent to-rose-400/40" />
                    </motion.div>

                    <div className="space-y-2 sm:space-y-3">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 }}
                        className="font-handwriting text-lg sm:text-xl md:text-2xl text-gray-600"
                      >
                        Forever yours,
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 }}
                        className="font-serif text-xl sm:text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 italic"
                      >
                        Me
                      </motion.div>
                    </div>

                    {/* Final heart with animation */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
                      className="pt-4 sm:pt-6 relative"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, -10, 10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="inline-block"
                      >
                        <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-rose-500 fill-rose-400 mx-auto drop-shadow-lg" />
                      </motion.div>

                      {/* Sparkles around heart */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute hidden sm:block"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            x: Math.cos((i * Math.PI) / 3) * 30,
                            y: Math.sin((i * Math.PI) / 3) * 30,
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 1.5 + i * 0.1,
                          }}
                          style={{
                            left: "50%",
                            top: "50%",
                          }}
                        >
                          <Sparkles className="w-3 h-3 text-pink-400" />
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Date or extra note */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="text-xs sm:text-sm text-gray-500 italic pt-3 sm:pt-4"
                    >
                      Written with all my heart
                    </motion.p>
                  </motion.div>
                )}
              </div>

              {/* Bottom decorative border */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

              {/* Wax seal effect */}
              {isTypingComplete && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.8, type: "spring", stiffness: 150 }}
                  className="absolute -bottom-4 sm:-bottom-6 right-4 sm:right-8 md:right-12"
                >
                  <div className="relative">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-rose-600 to-pink-700 rounded-full shadow-xl border-2 sm:border-4 border-rose-200/50 flex items-center justify-center">
                      <Heart className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white fill-white" />
                    </div>
                    {/* Seal glow */}
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-rose-500/30 rounded-full blur-lg -z-10"
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}