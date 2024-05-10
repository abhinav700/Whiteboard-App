"use client";
import useDraw from "@/hooks/useDraw";
import React, { useEffect, useRef, useState } from "react";
import { Wheel } from "@uiw/react-color";
import LineWidth from "@/Components/LineWidth";
import { drawLine } from "@/utils/utils";
import { Socket } from "socket.io-client";

const { io } = require("socket.io-client");
const socket:Socket = io("ws://localhost:8080")

const page = () => {

  const [hex, setHex] = useState<string>("#fff");
  const [lineWidth, setLineWidth] = useState<number>(1);
  const { canvasRef, handler, clearCanvas } = useDraw(createLine, hex, lineWidth);

  const onClickClearCanvas = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    socket.emit("clear-canvas");
    clearCanvas()
  }   
  const onDecrease = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    setLineWidth((lineWidth) => Math.max(1, lineWidth - 1));
  };
  const onIncrease = (e: any) => {
    setLineWidth((lineWidth) => Math.min(20, lineWidth + 1));
    
  };
  
 function createLine({ctx, prevPoint, currentPoint, hex, lineWidth }: Draw){
    socket.emit("draw-line",{prevPoint, currentPoint, hex,lineWidth});
    drawLine({ctx,prevPoint, currentPoint, hex, lineWidth});
    
 }

 socket.on("draw-line",({prevPoint, currentPoint, hex, lineWidth})=>{
  const ctx = canvasRef.current?.getContext("2d")!;
  drawLine({ctx,prevPoint,currentPoint, hex, lineWidth});
 }) 

 socket.on("clear-canvas",()=> clearCanvas())
  return (
    <div className="flex flex-row justify-center items-center h-[600px]">
      <div className="flex flex-col justify-center items-center mx-4 w-[300px] h-[600px]">
        <LineWidth
          lineWidth={lineWidth}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
        <Wheel
          style={{ marginLeft: 20 }}
          color={hex}
          onChange={(color) => {
            setHex(color.hex);
          }}
        />
        <button
          type="button"
          onClick={onClickClearCanvas}
          className="bg-white text-black rounded-full px-4 py-2 my-3 shadow-md hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-400"
        >
          Clear Canvas
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="bg-white border border-3 border-solid border-gray rounded-lg"
        onMouseMove={handler}
      />
    </div>
  );
};
export default page;
