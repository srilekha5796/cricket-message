import { motion, AnimatePresence } from "framer-motion";
import type { GamePhase } from "../types";

interface ResultScreenProps {
  phase: GamePhase;
  onPlayAgain: () => void;
}

export default function ResultScreen({
  phase,
  onPlayAgain,
}: ResultScreenProps) {
  const show = phase === "result";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="result"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
            zIndex: 7,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            style={{
              fontSize: "clamp(42px, 10cqw, 74px)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "#F8FBFF",
              WebkitTextStroke: "2px #45B8FF",
              textShadow: `
      0 0 8px rgba(69,184,255,.9),
      0 0 20px rgba(69,184,255,.8),
      0 6px 24px rgba(0,0,0,.45)
    `,
              textAlign: "center",
              marginBottom: 8,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            🏏 WHAT A  SHOT!
          </motion.h1>

      

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              padding: "18px 30px",
              borderRadius: 22,
              background: "rgba(10, 30, 55, 0.35)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: "0 12px 30px rgba(0,0,0,.25)",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                color: "#F8FBFF",
                fontSize: "clamp(28px, 6.5cqw, 54px)",
                fontWeight: 700,
                textShadow: `
        0 2px 8px rgba(0,0,0,.45),
        0 0 12px rgba(96,165,250,.45)
      `,
              }}
            >
              Good Morning ☀️
            </div>

            <div
              style={{
                color: "#D8ECFF",
                fontSize: "clamp(22px, 5.8cqw, 36px)",
                fontWeight: 600,
                textShadow: "0 2px 8px rgba(0,0,0,.5)",
              }}
            >
              All the Best! 💙
            </div>
          </motion.div>

          <motion.button
            onClick={onPlayAgain}
            style={{
              width: "200px",
              height: "54px",
              borderRadius: "12px",
              background: "rgba(37,99,235,0.9)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: "18px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
            whileHover={{
              background: "rgba(37,99,235,1)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            whileTap={{ scale: 0.95 }}
          >
            Play Again
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
