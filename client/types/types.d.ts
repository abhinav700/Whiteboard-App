type Point = {
    x:number 
    y:number
}

type Draw = {
    ctx:  CanvasRenderingContext2D | null,
    prevPoint : Point,
    currentPoint: Point,
    hex:string,
    lineWidth:number
}