import React, { useEffect, useRef, useState } from "react";
const useDraw = (
  onDraw: ({ ctx, prevPoint, currentPoint }: Draw) => void,
  hex: string,
  lineWidth: number
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentPoint = useRef<Point | null>(null);
  const prevPoint = useRef<Point | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const onMouseDown = () => setIsMouseDown((isMouseDown) => true);
  const onMouseUp = () => {
    prevPoint.current = null;
    setIsMouseDown((isMouseDown) => false);
  };
  console.log("RERENDERING USE DRAW")
  const handler = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const ctx = canvasRef.current?.getContext("2d")!;
    currentPoint.current = computeRelativePoint(e);

    if (!currentPoint.current || !ctx) return;

    if (isMouseDown) {
      onDraw({
        ctx,
        prevPoint: prevPoint.current!,
        currentPoint: currentPoint.current,
        lineWidth: lineWidth,
        hex: hex,
      });

      prevPoint.current = currentPoint.current;
    }
  };

  const onClearCanvas = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const ctx = canvasRef.current?.getContext("2d")!;
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
  };


  function computeRelativePoint(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ): Point {
    let rect = canvasRef.current?.getBoundingClientRect();
    const relativePoint =  {
      x: e.clientX - rect?.left!,
      y: e.clientY - rect?.top!,
    };
    
    return relativePoint;
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
