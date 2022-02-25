import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setHistory([mode, ...history]);
    if (replace) setHistory([...history]);
    setMode(newMode);
  };

  const back = () => {
    const [prevMode, ...rest] = history;
    setMode(prevMode);
    setHistory(rest);
  };

  return { mode, transition, back };
}
