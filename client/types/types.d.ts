type Point = {
    x:number 
    y:number
}

type Draw = {
    ctx:  CanvasRenderingContext2D | null,
    prevPoint : Point | null,
    currentPoint: Point,
    hex:string,
    lineWidth:number
}
type DrawLineEventProps = {
    prevPoint:Point | null,
    currentPoint: Point,
    hex:string,
    lineWidth:mumber
}