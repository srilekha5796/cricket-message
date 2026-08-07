import { motion, AnimatePresence } from "framer-motion";
import type { GamePhase } from "../types";

interface ResultScreenProps {
  phase: GamePhase;
  onPlayAgain: () => void;
  /** Player's display name for the greeting line. */
  playerName?: string;
}

// ---- design tokens ----
const COLORS = {
  overlay: "rgba(8, 20, 45, 0.4)", // 35-45% dark blue overlay over the stadium
  white: "#FFFFFF",
  lightBlue: "#DCEEFF",
  gold: "#FFD447",
  buttonFrom: "#3B82F6",
  buttonTo: "#2563EB"
};

const headingFont =
  "'Bebas Neue', 'Oswald', 'Arial Narrow', 'Segoe UI', Arial, sans-serif";
const bodyFont = "'Segoe UI', Arial, sans-serif";

const RefreshIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M4 12a8 8 0 0 1 13.66-5.66M20 12a8 8 0 0 1-13.66 5.66"
      stroke="#fff"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path d="M17 3v4.5H12.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 21v-4.5h4.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ResultScreen({ phase, onPlayAgain, playerName = "PLAYER" }: ResultScreenProps) {
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
            padding: "10cqw 6cqw 8cqw",
            zIndex: 7,
            background: COLORS.overlay,
            gap:"70px"
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Top: headline */}
          <motion.div
            style={{ textAlign: "center", lineHeight: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.4, 0.64, 1] }}
          >
            <div
              style={{
                fontFamily: headingFont,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "clamp(30px, 12.5cqw, 58px)",
                color: COLORS.white,
                textShadow:
                  "0 0 14px rgba(100,160,255,0.55), 0 0 30px rgba(59,130,246,0.4), 0 2px 4px rgba(0,0,0,0.4)"
              }}
            >
              What a Shot!
            </div>
          </motion.div>

          {/* Middle: greeting */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3cqw" }}>
            <motion.div
              style={{
                textAlign: "center",
                fontFamily: bodyFont,
                textShadow: "0 2px 6px rgba(0,0,0,0.45)"
              }}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.55, ease: "easeOut" }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(16px, 5.3cqw, 22px)",
                  color: COLORS.white,
                  marginBottom: "16px"
                }}
              >
                ☀️ Good Morning,
              </div>
              <div
                style={{
                  display: "inline-block",
                  fontWeight: 800,
                  fontSize: "clamp(24px, 7.5cqw, 32px)",
                  color: COLORS.white,
                  letterSpacing: "1px",
                  background: `linear-gradient(180deg, ${COLORS.buttonFrom}, ${COLORS.buttonTo})`,
                  padding: "1.4cqw 7cqw",
                  clipPath:
                    "polygon(4% 0, 96% 0, 100% 50%, 96% 100%, 4% 100%, 0 50%)",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.3)"
                }}
              >
                {playerName}
              </div>
            </motion.div>

            <motion.div
              style={{
                fontFamily: bodyFont,
                fontWeight: 600,
                fontSize: "clamp(15px, 5cqw, 20px)",
                color: COLORS.white,
                textShadow: "0 2px 6px rgba(0,0,0,0.45)"
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              ✨ All the Best! 👍
            </motion.div>
          </div>

          {/* Bottom: button */}
          <motion.button
            onClick={onPlayAgain}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2cqw",
              width: "min(50cqw, 200px)",
              padding: "3cqw 0",
              borderRadius: 15,
              background: "none",
              border: "none",
              boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
              color: COLORS.white,
              fontFamily: bodyFont,
              fontWeight: 700,
              fontSize: "clamp(14px, 4.5cqw, 18px)",
              cursor: "pointer"
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{ scale: 1.03, boxShadow: "0 4px 18px rgba(37,99,235,0.5)" }}
            whileTap={{ scale: 0.97 }}
          >
            <RefreshIcon />
            Play Again
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
