import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import Stadium from "./components/Stadium";
import Bowler from "./components/Bowler";
import Batsman from "./components/Batsman";
import CricketBall from "./components/CricketBall";
import ImpactEffects from "./components/ImpactEffects";
import Confetti from "./components/Confetti";
import SixText from "./components/SixText";
import ResultScreen from "./components/ResultScreen";
import StartButton from "./components/StartButton";
import type { GamePhase } from "./types";

/**
 * Central timeline. Each phase change is driven by a setTimeout chain
 * (mirroring the sequence spec: run-up -> gather -> jump -> release ->
 * ball travel -> downswing -> impact -> six-flight -> celebration -> result).
 * The bowler's `onRelease` callback is what actually supplies the ball's
 * spawn point, so the ball can never appear before the hand is there.
 */
export default function App() {
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [ballOrigin, setBallOrigin] = useState<{ x: number; y: number } | null>(null);
  const [shake, setShake] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };

  const schedule = (fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay);
    timers.current.push(id);
  };

  const handleRelease = useCallback((handPosition: { x: number; y: number }) => {
    setBallOrigin(handPosition);
  }, []);

  const startGame = () => {
    clearTimers();
    setBallOrigin(null);
    setPhase("zooming");

    schedule(() => setPhase("run-up"), 500);
    schedule(() => setPhase("gather"), 500 + 240);
    schedule(() => setPhase("jump"), 500 + 500);
    schedule(() => setPhase("release"), 500 + 760);
    // release phase computes ballOrigin via Bowler's onRelease callback,
    // then ball animation (600ms) carries us through "ball-travel"
    schedule(() => setPhase("ball-travel"), 500 + 820);
    schedule(() => setPhase("downswing"), 500 + 820 + 340); // bat comes down just before contact
    schedule(() => setPhase("impact"), 500 + 820 + 600);
    schedule(() => {
      setShake(true);
      setTimeout(() => setShake(false), 120);
    }, 500 + 820 + 600);
    schedule(() => setPhase("six-flight"), 500 + 820 + 600 + 260);
    schedule(() => setPhase("celebration"), 500 + 820 + 600 + 260 + 150);
    schedule(() => setPhase("result"), 500 + 820 + 600 + 260 + 150 + 3400);
  };

  const playAgain = () => {
    clearTimers();
    setBallOrigin(null);
    setPhase("idle");
  };

  return (
    <div className="phone-frame">
      <motion.div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden"
        }}
        // Base scale is slightly over 1 so the shake's x/y translation below
        // never exposes the frame's background at the edges (that gap was
        // showing up as a thin black/white flicker bar during the impact
        // shake). Framer Motion composes scale + x/y into one transform.
        initial={{ scale: 1.04 }}
        animate={shake ? { scale: 1.04, x: [0, -8, 8, -4, 0], y: [0, 4, -4, 2, 0] } : { scale: 1.04, x: 0, y: 0 }}
        transition={{ duration: 0.1, ease: "linear" }}
      >
        <Stadium phase={phase} />

        <StartButton visible={phase === "idle"} onClick={startGame} />

        <Bowler phase={phase} onRelease={handleRelease} />
        <Batsman phase={phase} />

        <CricketBall phase={phase} origin={ballOrigin} />
        <ImpactEffects phase={phase} origin={ballOrigin} />

        <Confetti phase={phase} />
        <SixText phase={phase} />

        <ResultScreen phase={phase} onPlayAgain={playAgain} playerName="Rahul Poral" />
      </motion.div>
    </div>
  );
}
