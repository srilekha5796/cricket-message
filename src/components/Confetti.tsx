import { useMemo } from "react";
import { motion } from "framer-motion";
import confettiImg from "../assets/confetti.png";
import crowdImg from "../assets/crowd.png";
import type { GamePhase } from "../types";

interface ConfettiProps {
  phase: GamePhase;
}

const PIECE_COUNT = 50;

export default function Confetti({ phase }: ConfettiProps) {
  const active = phase === "celebration" || phase === "result";

  const pieces = useMemo(
    () =>
      Array.from({ length: PIECE_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 10,
        duration: 2.2 + Math.random() * 1.8,
        delay: Math.random() * 0.6
      })),
    []
  );

  return (
    <>
      {phase === "celebration" &&
        pieces.map((p) => (
          <motion.div
            key={p.id}
            style={{
              position: "absolute",
              top: -30,
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              zIndex: 9,
              pointerEvents: "none"
            }}
            initial={{ y: 0, opacity: 1, rotate: 0 }}
            animate={{ y: "110vh", opacity: 1, rotate: 540 }}
            transition={{ duration: p.duration, delay: p.delay, ease: "linear" }}
          >
            <img src={confettiImg} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </motion.div>
        ))}

      <motion.img
        src={crowdImg}
        alt="Cheering crowd"
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: "14%",
          objectFit: "cover",
          objectPosition: "center bottom",
          zIndex: 3,
          pointerEvents: "none"
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: active ? 0.9 : 0,
          y: active ? [0, -6, 0] : 0
        }}
        transition={{
          opacity: { duration: 0.4 },
          y: { duration: 0.5, repeat: active ? Infinity : 0, ease: "easeInOut" }
        }}
      />
    </>
  );
}
