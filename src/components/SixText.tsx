import { motion, AnimatePresence } from "framer-motion";
import type { GamePhase } from "../types";

interface SixTextProps {
  phase: GamePhase;
}

export default function SixText({ phase }: SixTextProps) {
  const show = phase === "celebration";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="six"
          style={{
            position: "absolute",
            left: "50%",
            top: "40%",
            zIndex: 9,
            fontSize: "clamp(52px, 20cqw, 130px)",
            fontWeight: 900,
            letterSpacing: 4,
            fontFamily: "'Arial Black', Arial, sans-serif",
            background: "linear-gradient(180deg, #fff6c9, #ffd447 40%, #c98a00 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextStroke: "4px #fff",
            translateX: "-50%",
            translateY: "-50%"
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 1, 0],
            scale: [0, 1.25, 1, 1, 1.05],
            filter: [
              "drop-shadow(0 0 22px rgba(255,212,71,0.9)) drop-shadow(0 8px 4px rgba(0,0,0,0.35))",
              "drop-shadow(0 0 40px rgba(255,212,71,1)) drop-shadow(0 8px 4px rgba(0,0,0,0.35))",
              "drop-shadow(0 0 15px rgba(255,212,71,0.7)) drop-shadow(0 8px 4px rgba(0,0,0,0.35))",
              "drop-shadow(0 0 40px rgba(255,212,71,1)) drop-shadow(0 8px 4px rgba(0,0,0,0.35))",
              "drop-shadow(0 0 40px rgba(255,212,71,1)) drop-shadow(0 8px 4px rgba(0,0,0,0.35))"
            ]
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, times: [0, 0.18, 0.3, 0.85, 1], ease: [0.2, 1.6, 0.3, 1] }}
        >
          SIX!
        </motion.div>
      )}
    </AnimatePresence>
  );
}
