import { useScroll, useSpring, motion } from 'motion/react';

/**
 * Thin branded progress bar pinned to the very top of the viewport.
 * Only visible on mobile (hidden on md+).
 * Spring physics give it a satisfying, slightly "lagging" feel.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[200] h-[3px] origin-left md:hidden pointer-events-none"
      style={{
        scaleX,
        background: 'linear-gradient(to right, #D22D23, #E69E3C)',
        boxShadow: '0 0 8px 0 rgba(210,45,35,0.55)',
      }}
    />
  );
}
