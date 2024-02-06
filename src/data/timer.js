
import { useCallback, useEffect, useState } from "react";
import { interval } from "./interval";

const use1Second = interval(1e3)

export const useTimer = (initialSeconds = 0, initiallyRunning = false) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(initiallyRunning)
  const [completed, setCompleted] = useState(false);

  const tick = useCallback(() => (running ? setSeconds(seconds => seconds - 1) : undefined), [running])

  const start = () => setRunning(true)
  const pause = () => setRunning(false)
  const reset = useCallback(() => setSeconds(initialSeconds), [initialSeconds])
  const stop = useCallback(() => {
    pause()
    reset()
  }, [reset]);

  use1Second(tick)

  useEffect(() => {
    if(seconds === 0) {
      setCompleted(true)
      stop()
    } else {
      running && setCompleted(false)
    }
  }, [seconds, running, stop])

  return { pause, reset, running, completed, seconds, start, stop }
}