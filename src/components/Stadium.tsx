import { motion } from "framer-motion";
import stadiumImg from "../assets/stadium.png";
import type { GamePhase } from "../types";

interface StadiumProps {
  phase: GamePhase;
}

/**
 * Full-screen stadium background.
 * Zooms in gently once the game starts, and eases back out for the
 * six celebration — the camera angle itself (behind the batsman,
 * centered pitch) never changes, only the scale.
 */
export default function Stadium({ phase }: StadiumProps) {
  const isZoomed = phase !== "idle";
  const isZoomedOut = phase === "celebration" || phase === "result";

  return (
    <motion.img
      src={stadiumImg}
      alt="Cricket stadium"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        transformOrigin: "50% 60%"
      }}
      animate={{
        scale: isZoomedOut ? 1.12 : isZoomed ? 1.3 : 1
      }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    />
  );
}
