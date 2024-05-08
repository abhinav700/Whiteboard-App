type Coordinates = {
    x:number 
    y:number
}

type Draw = {
    ctx:  CanvasRenderingContext2D | null,
    prevPoint : Coordinates,
    currentPoint: Coordinates
}