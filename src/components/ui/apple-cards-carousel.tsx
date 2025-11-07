import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "../../lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useOutsideClick } from "../../hooks/use-outside-click";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
  onEndReachChange?: (atEnd: boolean) => void;
}

type Card = {
  src?: string;
  title: string;
  category?: string;
  content: React.ReactNode;
  backgroundClass?: string;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({
  items,
  initialScroll = 0,
  onEndReachChange,
}: CarouselProps) => {
  const prefersReducedMotion = useReducedMotion();
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const endReachedRef = useRef(false);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);

      const maxScrollLeft = Math.max(scrollWidth - clientWidth, 0);
      const threshold = 48;
      const atEnd =
        scrollWidth <= clientWidth
          ? true
          : scrollLeft >= maxScrollLeft - threshold;

      if (onEndReachChange && atEnd !== endReachedRef.current) {
        endReachedRef.current = atEnd;
        onEndReachChange(atEnd);
      }
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 192 : 320; // (md:w-80)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return typeof window !== "undefined" && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          ref={carouselRef}
          onScroll={checkScrollability}
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
            )}
          ></div>

          <motion.div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "mx-auto max-w-7xl",
            )}
            variants={
              prefersReducedMotion
                ? undefined
                : {
                    hidden: { opacity: 1 },
                    visible: {
                      opacity: 1,
                      transition: {
                        delayChildren: 0.1,
                        staggerChildren: 0.18,
                      },
                    },
                  }
            }
            initial={prefersReducedMotion ? undefined : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={
              prefersReducedMotion ? undefined : { once: true, amount: 0.55 }
            }
          >
            {items.map((item, index) => (
              <motion.div
                variants={
                  prefersReducedMotion
                    ? undefined
                    : {
                        hidden: {
                          opacity: 0,
                          y: 80,
                          scale: 0.9,
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                            type: "spring",
                            stiffness: 110,
                            damping: 18,
                            mass: 0.85,
                          },
                        },
                      }
                }
                key={"card" + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="mr-10 flex justify-end gap-2">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const { onCardClose } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleClose = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setOpen(false);
    closeTimeoutRef.current = window.setTimeout(() => {
      onCardClose(index);
      closeTimeoutRef.current = null;
    }, 300);
  };

  return (
    <>
      {/* SVG Filter for Glass Effect */}
      <svg style={{ display: "none" }}>
        <filter
          id="glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.001 0.005"
            numOctaves="1"
            seed="17"
            result="turbulence"
          />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="35"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-50 min-h-screen overflow-y-auto overscroll-contain touch-pan-y"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full pointer-events-none"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-auto my-10 flex w-full max-w-5xl max-h-[92vh] flex-col rounded-3xl p-4 font-sans md:p-10"
              style={{
                boxShadow: "0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {/* Glass Layers */}
              <div
                className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-3xl"
                style={{
                  backdropFilter: "blur(3px)",
                  filter: "url(#glass-distortion)",
                  isolation: "isolate",
                }}
              />
              {!card.src && (
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 z-[5] rounded-3xl",
                    card.backgroundClass ??
                      "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
                  )}
                />
              )}
              <div
                className="pointer-events-none absolute inset-0 z-10 rounded-3xl"
                style={{ background: "rgba(255, 255, 255, 0.25)" }}
              />
              <div className="pointer-events-none absolute inset-0 z-[15] rounded-3xl bg-black/60 backdrop-blur-sm" />
              <div
                className="pointer-events-none absolute inset-0 z-20 rounded-3xl overflow-hidden"
                style={{
                  boxShadow:
                    "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5)",
                }}
              />

              {/* Content */}
              <div className="relative z-30 flex flex-1 flex-col gap-4">
                <button
                  className="sticky top-0 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/40"
                  onClick={handleClose}
                >
                  <IconX className="h-6 w-6 text-white" />
                </button>
                <div
                  className="flex-1 min-h-0 overflow-y-auto overscroll-contain pr-2 touch-pan-y sm:pr-4 md:pr-6 md:overscroll-auto"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  <div className="grid gap-8 md:grid-cols-[minmax(0,320px),1fr] md:items-start">
                    <div className="relative min-h-[260px] overflow-hidden rounded-2xl border border-white/25 bg-white/5 shadow-[0_30px_90px_-45px_rgba(15,23,42,0.9)] md:min-h-[360px]">
                      {card.src ? (
                        <BlurImage
                          src={card.src}
                          alt={card.title}
                          fill
                          className="absolute inset-0 object-cover"
                        />
                      ) : (
                        <div
                          className={cn(
                            "absolute inset-0",
                            card.backgroundClass ??
                              "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
                          )}
                        />
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>

                    <div className="flex flex-col gap-6 text-white">
                      {card.category && (
                        <motion.p
                          layoutId={layout ? `category-${card.title}` : undefined}
                          className="text-base font-medium text-white/80"
                        >
                          {card.category}
                        </motion.p>
                      )}
                      <motion.p
                        layoutId={layout ? `title-${card.title}` : undefined}
                        className="text-2xl font-semibold text-white md:text-5xl"
                      >
                        {card.title}
                      </motion.p>
                      <div className="py-6 text-white/90 leading-relaxed [&_*]:text-inherit">
                        {card.content}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className={cn(
          "relative z-10 flex h-64 w-48 flex-col items-start justify-start overflow-hidden rounded-3xl md:h-[32rem] md:w-80",
          card.src ? "bg-gray-100 dark:bg-neutral-900" : "bg-transparent",
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="relative z-40 p-8">
          {card.category && (
            <motion.p
              layoutId={layout ? `category-${card.title}` : undefined}
              className="text-left font-sans text-sm font-medium text-white drop-shadow-lg md:text-base"
            >
              {card.category}
            </motion.p>
          )}
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white drop-shadow-lg md:text-3xl"
          >
            {card.title}
          </motion.p>
        </div>
        {card.src ? (
          <BlurImage
            src={card.src}
            alt={card.title}
            fill={true}
            className="absolute inset-0 z-10 object-cover"
          />
        ) : (
          <div
            className={cn(
              "absolute inset-0 z-10",
              card.backgroundClass ??
                "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
            )}
          />
        )}
      </motion.button>
    </>
  );
};

interface BlurImageProps {
  src: string;
  alt?: string;
  className?: string;
  fill?: boolean;
}

export const BlurImage = ({
  src,
  className,
  alt,
  fill,
}: BlurImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        fill ? "absolute inset-0 object-cover" : "",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src}
      loading="lazy"
      decoding="async"
      alt={alt ? alt : "Background of a beautiful view"}
    />
  );
};
