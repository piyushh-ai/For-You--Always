import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Heart, Sparkles, ArrowRight } from "lucide-react";

function StorySection({
  item,
  index,
  total,
}: {
  item: any;
  index: number;
  total: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isImageHovered, setIsImageHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className="min-h-[70vh] flex items-center justify-center py-16 md:py-24 px-4 md:px-6 relative"
    >
      {/* Floating decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.4 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-4 h-4 text-pink-400/30" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        style={{ opacity, y, scale }}
        className={cn(
          "max-w-6xl w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10",
          !isEven && "md:grid-flow-dense",
        )}
      >
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={cn("space-y-6", !isEven && "md:col-start-2")}
        >
          {/* Chapter Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full text-rose-600 font-handwriting text-sm md:text-base shadow-sm border border-pink-200/50"
          >
            <Heart className="w-3 h-3 fill-rose-400" />
            Chapter {index + 1} of {total}
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-rose-700 via-pink-600 to-purple-600 leading-tight"
          >
            {item.title}
          </motion.h2>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "4rem" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full shadow-sm"
          />

          {/* Content */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base sm:text-lg md:text-xl text-gray-700 font-body leading-relaxed md:leading-loose"
          >
            {item.content}
          </motion.p>

          {/* Quote Mark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center gap-2 text-pink-400/50"
          >
            <Heart className="w-4 h-4 fill-pink-300/50" />
            <div className="h-px flex-1 bg-gradient-to-r from-pink-300/50 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 50 : -50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={cn("relative group w-full", !isEven && "md:col-start-1")}
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          {/* Background decorative layers */}
          <motion.div
            animate={{
              rotate: isImageHovered ? 6 : 3,
              scale: isImageHovered ? 1.02 : 1,
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-200 rounded-3xl transform shadow-lg"
          />

          <motion.div
            animate={{
              rotate: isImageHovered ? -3 : -1.5,
              scale: isImageHovered ? 1.01 : 1,
            }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute inset-0 bg-gradient-to-tl from-purple-200 to-pink-200 rounded-3xl transform shadow-md"
          />

          {/* Main image container */}
          <motion.div
            animate={{
              y: isImageHovered ? -8 : 0,
            }}
            transition={{ duration: 0.5 }}
            className="relative bg-white p-2 sm:p-3 rounded-3xl shadow-2xl border-2 border-white overflow-hidden aspect-[4/3]"
          >
            {/* Sparkle overlay on hover */}
            {isImageHovered && (
              <motion.div className="absolute inset-0 pointer-events-none z-10">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: Math.random() * 100 - 50,
                      y: Math.random() * 100 - 50,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="absolute top-1/2 left-1/2"
                  >
                    <Sparkles className="w-4 h-4 text-pink-400" />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {item.imageUrl ? (
              <motion.img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover rounded-2xl"
                animate={{
                  scale: isImageHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.5 }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl flex items-center justify-center">
                <motion.span
                  animate={{
                    scale: isImageHovered ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.6, repeat: isImageHovered ? Infinity : 0 }}
                  className="text-6xl md:text-8xl"
                >
                  ♥
                </motion.span>
              </div>
            )}

            {/* Corner heart decoration */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
            >
              <Heart className="w-5 h-5 text-rose-500 fill-rose-400" />
            </motion.div>
          </motion.div>

          {/* Floating hearts around image */}
          {isImageHovered && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: -60,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  className="absolute"
                  style={{
                    left: `${20 + i * 20}%`,
                    bottom: 0,
                  }}
                >
                  <Heart className="w-3 h-3 text-pink-400/60 fill-pink-300/60" />
                </motion.div>
              ))}
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Section connector line */}
      {index < total - 1 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-pink-300 to-transparent hidden md:block"
        />
      )}
    </section>
  );
}

export default function Story() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  // ✅ LOCAL STORY ARRAY (NO API)
  const story = [
    {
      id: 1,
      order: 1,
      title: "The First Hello",
      content:
        "It started with a simple hello, but even then, the universe knew this was never meant to stay simple. Somewhere between words and silence, my heart chose you.",
      imageUrl: "https://images.unsplash.com/photo-1513279922550-250c2129b13a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cGxlc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      order: 2,
      title: "Falling Without Fear",
      content:
        "I didn't fall for you all at once. I fell in moments—your laugh, your kindness, the way you felt like home without trying.",
      imageUrl: "https://images.unsplash.com/photo-1627964464837-6328f5931576?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y291cGxlc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      order: 3,
      title: "Still Choosing You",
      content:
        "Even now, in every version of tomorrow, I'd still choose you. Again and again. Loving you is the most honest thing I've ever done.",
      imageUrl: "https://images.unsplash.com/photo-1615966650071-855b15f29ad1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvdXBsZXN8ZW58MHx8MHx8fDA%3D",
    },
  ];

  const sortedStory = story.sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/30 via-white to-rose-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-pink-300 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300 rounded-full blur-[120px]"
        />
      </div>

      {/* Vertical timeline (desktop only) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-pink-200 to-transparent opacity-30 hidden md:block" />

      {/* Music Player - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <MusicPlayer />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header ref={headerRef} className="text-center py-16 md:py-24 px-4 relative">
          {/* Decorative top element */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-pink-400" />
            </motion.div>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
            <Heart className="w-5 h-5 text-rose-500 fill-rose-400" />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-pink-400" />
            </motion.div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
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
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 leading-tight"
            >
              Our Journey
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 font-serif italic max-w-2xl mx-auto px-4"
            >
              Every moment with you is a favorite memory waiting to be cherished forever.
            </motion.p>
          </motion.div>

          {/* Floating hearts decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex items-center justify-center gap-2 mt-8"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <Heart className="w-3 h-3 text-pink-400/50 fill-pink-300/50" />
              </motion.div>
            ))}
          </motion.div>
        </header>

        {/* Story Sections */}
        <div className="space-y-0">
          {sortedStory.map((segment, idx) => (
            <StorySection
              key={segment.id}
              item={segment}
              index={idx}
              total={sortedStory.length}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center py-20 md:py-32 px-4 relative"
        >
          {/* Decorative background */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-[80px]" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 space-y-8  text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-handwriting text-xl md:text-2xl mb-3 text-pink-600"
            >
              But wait, there's more to our story...
            </motion.p>

            <Link href="/memories">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white rounded-full font-serif text-base md:text-lg shadow-2xl shadow-pink-300/50 overflow-hidden"
              >
                {/* Button glow effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-white/20 rounded-full"
                />

                <span className="relative flex items-center gap-3">
                  See Our Memories
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>

                {/* Sparkles on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: Math.cos((i * Math.PI) / 3) * 30,
                        y: Math.sin((i * Math.PI) / 3) * 30,
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                      style={{
                        left: "50%",
                        top: "50%",
                      }}
                    >
                      <Sparkles className="w-3 h-3 text-white" />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.button>
            </Link>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm md:text-base text-gray-500 italic"
            >
              Every picture tells a thousand words of love
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}