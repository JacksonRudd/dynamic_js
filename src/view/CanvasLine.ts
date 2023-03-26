import { CanvasInfo } from "./CanvasInfo";
import { Drawable } from "./Drawable";
import { FixedCanvasPosition } from "./FixedCanvasPosition";

export class CanvasLine implements Drawable {
    p1: FixedCanvasPosition;
    p2: FixedCanvasPosition;
    line_width: number;
    stroke_style: string;
    draw_order: number; //the higher draw order the later it will be drawn
    canvas_info: CanvasInfo;
    constructor(canvas_info: CanvasInfo, p1: FixedCanvasPosition, p2: FixedCanvasPosition, line_width: number = 2, stroke_style: string = 'black', draw_order = 0) {
        this.p1 = p1;
        this.p2 = p2;
        this.line_width = line_width;
        this.stroke_style = stroke_style;
        this.draw_order = draw_order;
        this.canvas_info = canvas_info;
    }

    draw(c: CanvasRenderingContext2D) {
        c.strokeStyle = this.stroke_style;
        c.lineWidth = this.line_width;
        c.beginPath();
        c.moveTo(this.p1.pixel_x(), this.p1.pixel_y());
        c.lineTo(this.p2.pixel_x(), this.p2.pixel_y());
        c.stroke();
    }
}
