import { motion } from "framer-motion";
import ballImg from "../assets/ball.png";
import type { GamePhase } from "../types";

interface CricketBallProps {
  phase: GamePhase;
  /** Origin point (viewport px) — the bowler's hand at the moment of release. */
  origin: { x: number; y: number } | null;
}

/**
 * The ball only exists once `origin` is set (i.e. after release — it never
 * spawns mid-air). It travels on a bounce trajectory (pitches on a length,
 * small bounce) to the bat during "ball-travel"/"downswing", then on
 * impact switches to a big rising arc out of the ground for the six.
 */
export default function CricketBall({ phase, origin }: CricketBallProps) {
  if (!origin) return null;

  const isPreImpact =
    phase === "ball-travel" || phase === "downswing" || phase === "release";
  const isSixFlight = phase === "six-flight" || phase === "celebration";

  if (!isPreImpact && !isSixFlight) return null;

  return (
    <motion.div
      style={{
        position: "absolute",
        left: origin.x,
        top: origin.y,
        width: 22,
        height: 22,
        zIndex: 6,
        filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.4))"
      }}
      initial={{ x: 0, y: 0, scale: 1, opacity: 0 }}
      animate={
        isSixFlight
          ? {
              opacity: 1,
              x: [0, 200, 430],
              y: [0, -260, -560],
              scale: [1, 0.7, 0.25],
              rotate: [0, 540, 1080]
            }
          : {
              opacity: 1,
              // release -> pitches on a good length -> small bounce -> reaches bat
              x: [0, -260, -300, -430],
              y: [0, 190, 168, 120],
              rotate: [0, 320, 420, 680]
            }
      }
      transition={
        isSixFlight
          ? { duration: 1.5, ease: [0.2, 0.6, 0.4, 1] }
          : { duration: 0.6, ease: [0.35, 0.15, 0.4, 1], times: [0, 0.55, 0.66, 1] }
      }
    >
      <img src={ballImg} alt="Cricket ball" style={{ width: "100%", height: "100%", display: "block" }} />
    </motion.div>
  );
}
