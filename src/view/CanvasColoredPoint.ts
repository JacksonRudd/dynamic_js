import { Positionable } from './Positionable';
import { Drawable } from "./Drawable";

export class CanvasColoredPoint implements Drawable {
    canvas_position: Positionable;
    color: string;
    size: number;
    constructor(canvas_position: Positionable, color: string, size: number) {
        this.canvas_position = canvas_position;
        this.color = color;
        this.size = size;
    }
    draw(c: CanvasRenderingContext2D): void {
        this.canvas_position.draw(this.color, this.size, c);
    }



}
