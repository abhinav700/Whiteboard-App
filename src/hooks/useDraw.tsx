import React, { useEffect, useRef, useState } from "react";
const useDraw = (onDraw: ({ ctx, prevPoint, currentPoint }: Draw) => void) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentPoint = useRef<Coordinates | null>(null);
  const prevPoint = useRef<Coordinates | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const onMouseDown = () => setIsMouseDown((isMouseDown) => true);
  const onMouseUp = () => {
    prevPoint.current = null;
    setIsMouseDown((isMouseDown) => false);
  };

  const handler = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const ctx = canvasRef.current?.getContext("2d")!;
    currentPoint.current = computeRelativeCoordinates(e);

    console.log(isMouseDown);
    if (!currentPoint.current || !ctx) return;

    if (isMouseDown) {
      onDraw({
        ctx,
        prevPoint: prevPoint.current!,
        currentPoint: currentPoint.current,
      });

      prevPoint.current = currentPoint.current;
    }
  };

  const onClearCanvas = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const ctx = canvasRef.current?.getContext("2d")!;
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
  };

  function computeRelativeCoordinates(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ): Coordinates {
    let rect = canvasRef.current?.getBoundingClientRect();
    return {
      x: e.clientX - rect?.left!,
      y: e.clientY - rect?.top!,
    };
  }

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    canvasRef.current?.addEventListener("mousedown", onMouseDown);

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      canvasRef.current?.removeEventListener("mousedown", onMouseDown);
    };
  }, [onDraw]);

  return { canvasRef, handler, onClearCanvas };
};
export default useDraw;
