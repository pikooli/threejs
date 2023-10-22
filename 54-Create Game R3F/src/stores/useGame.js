import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const PHASE = {
  READY: "ready",
  PLAYING: "playing",
  ENDED: "ended",
};

export default create(
  subscribeWithSelector((set) => {
    return {
      blocksCount: 10,
      phase: PHASE.READY,
      startTime: 0,
      endTime: 0,
      blocksSeed: 0,
      start: () => {
        set((state) => {
          if (state.phase === PHASE.READY) {
            return { phase: PHASE.PLAYING, startTime: Date.now() };
          }
          return {};
        });
      },
      end: () => {
        set((state) => {
          if (state.phase === PHASE.PLAYING) {
            return { phase: PHASE.ENDED, endTime: Date.now() };
          }
          return {};
        });
      },
      restart: () => {
        set((state) => {
          if (state.phase === PHASE.PLAYING || state.phase === PHASE.ENDED) {
            return { phase: PHASE.READY, blocksSeed: Math.random() };
          }
          return {};
        });
      },
    };
  })
);
