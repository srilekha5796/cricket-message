# Cricket Landing Page

React + TypeScript + Vite + Framer Motion cricket game demo, built from
the provided illustrated stadium/batsman/bowler artwork.

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/
    Stadium.tsx        - full-screen background, zoom in/out
    StartButton.tsx     - floating "Click to Bat" button + ripple
    Bowler.tsx           - anchored at the far crease, sprite-swap run-up/gather/jump/release
    Batsman.tsx          - idle breathing + stance/backlift/downswing/follow-through poses
    CricketBall.tsx      - delivery bounce trajectory + six-flight arc
    ImpactEffects.tsx    - flash + spark particles on bat-ball contact
    Confetti.tsx          - falling confetti + cheering crowd banner
    SixText.tsx            - glowing "SIX!" pop text
    ResultScreen.tsx     - "What a Shot! / Good Morning" + Play Again
  assets/                  - extracted from the provided artwork (stadium,
                             batsman x4 poses, bowler x4 poses, bat, ball,
                             stumps, confetti, crowd)
  types.ts                 - GamePhase union driving the whole timeline
  App.tsx                   - phase state machine / timeline orchestration
  main.tsx                   - React root
```

## Notes on the assets

The batsman and bowler each have 4 illustrated pose frames (rather than a
fully rigged skeleton), extracted from the original artwork:

- Batsman: stance → backlift → downswing → follow-through
- Bowler: run-up → gather → jump → release

`Bowler.tsx` and `Batsman.tsx` swap between these images as the game
phase advances, combined with Framer Motion transforms for position/scale,
so the motion reads as continuous even though the underlying artwork is a
fixed set of poses rather than an interpolatable skeleton.
