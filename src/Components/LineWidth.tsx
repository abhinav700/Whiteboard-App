"use client"
import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { GrSubtractCircle } from "react-icons/gr";


type Props = {
    lineWidth:number,
    onIncrease:(e:React.MouseEvent<SVGElement, MouseEvent>) => void,
    onDecrease:(e:React.MouseEvent<SVGElement, MouseEvent>) => void,

};

const LineWidth = ({lineWidth,onIncrease,onDecrease}: Props) => {

  return (
    <div className="w-[50px] flex flex-row justify-center items-center">
      <div className="">
        <GrSubtractCircle className="cursor-pointer hover:opacity-70" onClick={onDecrease} />
      </div>
      <p className="mx-[10px]">{lineWidth}</p>
      <div className="">
        <MdAddCircle className="cursor-pointer hover:opacity-70" onClick={onIncrease} />
      </div>
    </div>
  );
};

export default LineWidth;
