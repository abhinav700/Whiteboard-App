"use client";
import useDraw from "@/hooks/useDraw";
import React, { useRef, useState } from "react";
import {Wheel } from '@uiw/react-color';
import { EditableInput, EditableInputRGBA, EditableInputHSLA } from '@uiw/react-color';
const page = () => {
  const { canvasRef, handler,onClearCanvas} = useDraw(drawLine);
  const [hex, setHex] = useState("#fff");


  function drawLine({ ctx, prevPoint, currentPoint }: Draw) {
    if (prevPoint) {
      ctx!.beginPath();
      ctx!.strokeStyle = hex;
      ctx?.moveTo(prevPoint.x, prevPoint.y);
      ctx?.lineTo(currentPoint.x, currentPoint.y);
      ctx?.stroke();
    }
  }
  return (
    <div className="flex flex-row justify-center items-center h-[600px]">
      <div className="flex flex-col justify-center items-center mx-4 w-[300px] h-[600px]">
        <Wheel
          style={{ marginLeft: 20 }}
          color={hex}
          onChange={(color) => {
            setHex(color.hex);
          }}
        />
        <button
          type="button"
          onClick={onClearCanvas}
          className="bg-white text-black rounded-full px-4 py-2 my-3 shadow-md hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-400"
        >
          Clear Canvas
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={1000}
        height={500}
        className="bg-white border border-3 border-solid border-gray rounded-lg"
        onMouseMove={handler}
      />
    </div>
  );
};
export default page;
