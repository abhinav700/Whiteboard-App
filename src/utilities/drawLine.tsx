export default function drawLine({ ctx, prevPoint, currentPoint }: Draw) {
    if (prevPoint) {
      ctx!.beginPath();
      ctx!.strokeStyle = "black";
      ctx?.moveTo(prevPoint.x, prevPoint.y);
      ctx?.lineTo(currentPoint.x, currentPoint.y);
      ctx?.stroke();
    }
  }