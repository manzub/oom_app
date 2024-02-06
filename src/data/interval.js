import { useEffect } from "react";

export const interval = (delay = 0) =>
/** @param {() => void} callback */ callback =>
    useEffect(() => {
      const id = setInterval(callback, delay)

      return () => clearInterval(id)
    }, [callback])