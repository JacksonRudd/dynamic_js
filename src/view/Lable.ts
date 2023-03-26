import { Drawable } from "./Drawable";
import { FixedCanvasPosition } from "./FixedCanvasPosition";

export class Lable implements Drawable {
    label: string;
    bottom_left: FixedCanvasPosition;
    pixels: number;

    constructor(label: string, bottom_left_location: FixedCanvasPosition, pixels: number = 16) {
        this.label = label;
        this.bottom_left = bottom_left_location;
        this.pixels = pixels;
    }
    draw(c: CanvasRenderingContext2D): void {
        c.fillStyle = "black";
        c.font = this.pixels + "px Arial";
        c.textAlign = 'left';
        c.textBaseline = 'middle';
        c.fillText(this.label, this.bottom_left.pixel_x() + 3, this.bottom_left.pixel_y() - this.pixels / 2);
    }
}
