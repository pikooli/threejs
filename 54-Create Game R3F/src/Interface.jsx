import { useKeyboardControls } from "@react-three/drei";
import useGame, { PHASE } from "./stores/useGame";
import { useRef, useEffect } from "react";
import { addEffect } from "@react-three/fiber";

export default function Interface() {
  const timeRef = useRef();

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();
      let elapsedTime = 0;
      if (state.phase === PHASE.PLAYING) {
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === PHASE.ENDED) {
        elapsedTime = state.endTime - state.startTime;
      }
      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);
      if (timeRef.current) {
        timeRef.current.textContent = elapsedTime;
      }
    });

    return () => unsubscribeEffect();
  }, [timeRef]);

  return (
    <div className="interface">
      <div className="time" ref={timeRef}>
        0.00
      </div>
      {phase === PHASE.ENDED && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}>z</div>
        </div>
        <div className="raw">
          <div className={`key ${leftward ? "active" : ""}`}>q</div>
          <div className={`key ${backward ? "active" : ""}`}>s</div>
          <div className={`key ${rightward ? "active" : ""}`}>d</div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? "active" : ""}`}></div>
        </div>
      </div>
    </div>
  );
}
