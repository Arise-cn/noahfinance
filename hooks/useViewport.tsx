"use client";
import { useEffect, useState } from "react";

export const useViewport = () => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const updateViewport = () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    };

    updateViewport(); // 初始化

    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  return { height, width };
};
