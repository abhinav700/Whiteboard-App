"use client";
import useDraw from "@/hooks/useDraw";
import React, { useRef } from "react";

const page = () => {
  const { canvasRef, handler,onClearCanvas} = useDraw(drawLine);
  function drawLine({ ctx, prevPoint, currentPoint }: Draw) {
    if (prevPoint) {
      ctx!.beginPath();
      ctx!.strokeStyle = "black";
      ctx?.moveTo(prevPoint.x, prevPoint.y);
      ctx?.lineTo(currentPoint.x, currentPoint.y);
      ctx?.stroke();
    }
  }
  return (
    <div className="flex flex-row justify-center items-center h-[600px]">
      <div className="flex flex-col justify-center items-center mx-4 w-[100px] ">
        <button type="button" onClick={onClearCanvas} className="bg-white text-black bg-round-full">
          Clear Canvas
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={700}
        height={500}
        className="bg-white border border-3 border-solid border-gray rounded-lg"
        onMouseMove={handler}
      />
    </div>
  );
};
export default page;