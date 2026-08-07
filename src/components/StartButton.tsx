import { useState } from "react";
import type { MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StartButtonProps {
  visible: boolean;
  onClick: () => void;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function StartButton({ visible, onClick }: StartButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left - 80, y: e.clientY - rect.top - 80 }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
    onClick();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          onClick={handleClick}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "min(78cqw, 300px)",
            height: "min(23cqw, 90px)",
            background: "linear-gradient(180deg, #1c6b1f, #5fce5f)",
            border: "4px solid #ffd447",
            borderRadius: 24,
            boxShadow: "0 14px 34px rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            cursor: "pointer",
            color: "#fff",
            fontWeight: 800,
            fontSize: "clamp(20px, 6.5cqw, 32px)",
            zIndex: 5,
            overflow: "hidden",
            userSelect: "none"
          }}
          initial={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.9 }}
          animate={{
            opacity: 1,
            x: "-50%",
            y: ["-55%", "-45%", "-55%"],
            scale: 1
          }}
          exit={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.9 }}
          transition={{
            y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🏏 <span>Click to Bat</span>
          {ripples.map((r) => (
            <motion.div
              key={r.id}
              style={{
                position: "absolute",
                left: r.x,
                top: r.y,
                width: 160,
                height: 160,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.55)",
                pointerEvents: "none"
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
