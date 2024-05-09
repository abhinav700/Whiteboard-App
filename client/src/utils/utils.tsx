export const drawLine = ({ ctx, prevPoint, currentPoint, hex, lineWidth }: Draw) => {
    if (prevPoint) {
      ctx!.beginPath();
      ctx!.strokeStyle = hex;
      ctx!.lineWidth = lineWidth? lineWidth+7:1;
      ctx?.moveTo(prevPoint.x, prevPoint.y);
      ctx?.lineTo(currentPoint.x, currentPoint.y);
      ctx?.stroke();

      ctx?.beginPath();  
      ctx?.arc(currentPoint.x, currentPoint.y, lineWidth, 0, Math.PI * 2);
      ctx?.stroke()
    }
  }