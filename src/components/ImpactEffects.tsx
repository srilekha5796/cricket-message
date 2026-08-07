import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { GamePhase } from "../types";

interface ImpactEffectsProps {
  phase: GamePhase;
  origin: { x: number; y: number } | null;
}

/**
 * White flash + gold spark burst, fired once at the moment of bat-ball
 * contact. Paired with a tiny camera shake driven from App via a CSS class.
 */
export default function ImpactEffects({ phase, origin }: ImpactEffectsProps) {
  const show = phase === "impact" && !!origin;

  const sparks = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 30 + Math.random() * 50;
        return {
          id: i,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
          delay: Math.random() * 0.05
        };
      }),
    [phase === "impact"] // regenerate each time we enter impact
  );

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            key="flash"
            style={{ position: "absolute", inset: 0, background: "#fff", zIndex: 8, pointerEvents: "none" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {show &&
        origin &&
        sparks.map((s) => (
          <motion.div
            key={s.id}
            style={{
              position: "absolute",
              left: origin.x,
              top: origin.y,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#ffd447",
              zIndex: 8
            }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{ x: s.dx, y: s.dy, opacity: 0 }}
            transition={{ duration: 0.5 + Math.random() * 0.3, delay: s.delay, ease: "easeOut" }}
          />
        ))}
    </>
  );
}
