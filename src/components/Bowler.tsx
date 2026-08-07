import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import bowlerRunUp from "../assets/bowler.png";
import bowlerGather from "../assets/bowler-gather.png";
import bowlerJump from "../assets/bowler-jump.png";
import bowlerRelease from "../assets/bowler-release.png";
import type { GamePhase } from "../types";

interface BowlerProps {
  phase: GamePhase;
  /** Called once, exactly when the ball should leave the bowler's hand. */
  onRelease: (handPosition: { x: number; y: number }) => void;
}

const POSES: Record<string, string> = {
  "run-up": bowlerRunUp,
  gather: bowlerGather,
  jump: bowlerJump,
  release: bowlerRelease
};

/**
 * Bowler is anchored to the far bowling crease (fixed left/bottom position
 * matching the stumps in the stadium artwork) and is scaled to ~19% of
 * screen height so he reads as farther from camera than the batsman.
 * His feet never leave that ground anchor — only a small forward shift
 * plays during the run-up, and he never approaches the viewport edges.
 */
export default function Bowler({ phase, onRelease }: BowlerProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const releasedRef = useRef(false);

  const visible =
    phase === "run-up" ||
    phase === "gather" ||
    phase === "jump" ||
    phase === "release" ||
    phase === "ball-travel" ||
    phase === "downswing" ||
    phase === "impact";

  const pose =
    phase === "gather"
      ? bowlerGather
      : phase === "jump"
      ? bowlerJump
      : phase === "release" ||
        phase === "ball-travel" ||
        phase === "downswing" ||
        phase === "impact"
      ? bowlerRelease
      : bowlerRunUp;

  useEffect(() => {
    if (phase === "release" && !releasedRef.current && wrapRef.current) {
      releasedRef.current = true;
      const rect = wrapRef.current.getBoundingClientRect();
      // Hand position: roughly the top-right of the bowler's bounding box,
      // where the raised bowling arm holds the ball at release.
      onRelease({ x: rect.left + rect.width * 0.72, y: rect.top + rect.height * 0.08 });
    }
    if (phase === "idle" || phase === "zooming") {
      releasedRef.current = false;
    }
  }, [phase, onRelease]);

  return (
    <motion.div
      ref={wrapRef}
      style={{
        position: "absolute",
        left: "53%",
        bottom: "31%",
        height: "19%",
        transformOrigin: "bottom center",
        zIndex: 3,
        filter: "drop-shadow(0 6px 6px rgba(0,0,0,0.3))"
      }}
      initial={{ opacity: 0, x: "-50%", scale: 0.82 }}
      animate={{
        opacity: visible ? 1 : 0,
        x: "-50%",
        // Small forward approach into the fixed crease anchor during run-up;
        // he settles at full scale by the gather/jump/release poses and never
        // drifts from the crease position after that.
        scale: phase === "run-up" ? 0.88 : 0.94
      }}
      transition={{ duration: 0.7, ease: [0.3, 0.1, 0.3, 1] }}
    >
      <img
        src={POSES[phase] ?? pose}
        alt="Bowler"
        style={{ height: "100%", width: "auto", display: "block" }}
      />
    </motion.div>
  );
}
