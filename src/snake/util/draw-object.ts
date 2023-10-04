export interface IObjectBody {
  x: number;
  y: number;
}

export const drawObject = (
  context: CanvasRenderingContext2D,
  objectBody: IObjectBody[],
  fillColor: string,
  strokeStyle = '#146356'
) => {
  if(context) {
    objectBody.forEach((obj: IObjectBody) => {
      context.fillStyle = fillColor;
      context.strokeStyle = strokeStyle;
      context?.fillRect(obj.x, obj.y, 20, 20);
      context?.strokeRect(obj.x, obj.y, 20, 20);
    });
  }
};