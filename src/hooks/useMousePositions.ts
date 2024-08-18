import { useRef, useEffect, MutableRefObject, useState } from "react";

export interface MousePosition {
  x: number;
  y: number;
}

function useMousePosition(
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
) {
  const mousePosition = useRef<MousePosition>({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  useEffect(() => {
    let mouseMoveTimeout: NodeJS.Timeout;

    const handleMouseMove = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const newPosition = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      mousePosition.current = newPosition;
      setIsMouseMoving(true);

      clearTimeout(mouseMoveTimeout);

      mouseMoveTimeout = setTimeout(() => {
        setIsMouseMoving(false);
      }, 80);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(mouseMoveTimeout);
    };
  }, [canvasRef]);

  return { mousePosition, isMouseMoving };
}

export default useMousePosition;
