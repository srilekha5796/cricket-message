import { motion } from "framer-motion";
import batsmanStance from "../assets/batsman.png";
import batsmanBacklift from "../assets/batsman-backlift.png";
import batsmanDownswing from "../assets/batsman-downswing.png";
import batsmanFollowThrough from "../assets/batsman-followthrough.png";
import type { GamePhase } from "../types";

interface BatsmanProps {
  phase: GamePhase;
}

/**
 * Batsman stands near the camera (left side), fully visible, at roughly
 * 46% of stage height (the character within the image occupies the
 * ~28-30% screen-height range the artwork was drawn at). Position and
 * scale are untouched by any bowler-related fixes.
 */
export default function Batsman({ phase }: BatsmanProps) {
  const shown = phase !== "idle";

  let pose = batsmanStance;
  if (phase === "ball-travel") pose = batsmanBacklift;
  else if (phase === "downswing") pose = batsmanDownswing;
  else if (
    phase === "impact" ||
    phase === "six-flight" ||
    phase === "celebration"
  )
    pose = batsmanFollowThrough;

  const isIdlePose = phase === "zooming" || phase === "run-up" || phase === "gather" || phase === "jump" || phase === "release";

  return (
    <motion.img
      src={pose}
      alt="Batsman"
      style={{
        position: "absolute",
        left: "4%",
        bottom: "2%",
        height: "46%",
        zIndex: 4,
        filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.35))"
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: shown ? 1 : 0,
        y: isIdlePose ? [0, -3, 0] : 0
      }}
      transition={
        isIdlePose
          ? { y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.4 } }
          : { duration: 0.3 }
      }
    />
  );
}
