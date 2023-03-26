import { RealPosition } from '../real';
import { CanvasColoredPoint } from "./CanvasColoredPoint";
import { CanvasLine } from './CanvasLine';
import { DynamicCanvasPosition } from "./DynamicCanvasPosition";
import { FixedCanvasPosition } from "./FixedCanvasPosition";
import { Lable } from './Lable';
import { LabledLine } from './LabledLine';
import { ViewOfPlane } from "./ViewOfPlane";


export class CanvasInfo {
    canvas: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    get_width() {
        return this.canvas.width;
    }

    get_height() {
        return this.canvas.height;
    }

    new_canvas_position(x: number, y: number) {
        return new FixedCanvasPosition(this, x, y);
    }

    horizontal_line(y_frac: number, line_width: number = 2, stroke_style: string = 'black') {
        return new CanvasLine(this, this.new_canvas_position(0, y_frac), this.new_canvas_position(1, y_frac), line_width, stroke_style);
    }

    vertical_line(x_frac: number, line_width: number = 2, stroke_style: string = 'black') {
        return new CanvasLine(this, this.new_canvas_position(x_frac, 0), this.new_canvas_position(x_frac, 1), line_width, stroke_style);
    }

    get_labled_horizontal_line(y_frac: number, label_string: string, color: string, draw_order = 0): LabledLine {
        var line = this.horizontal_line(y_frac, 2, color);
        line.draw_order = draw_order;
        var lable = new Lable(label_string, this.new_canvas_position(0, y_frac), 20);
        return new LabledLine(lable, line);
    }

    get_labled_vertical_line(x_frac: number, label_string: string, color: string, draw_order = 0): LabledLine {
        var line = this.vertical_line(x_frac, 2, color);
        line.draw_order = draw_order;
        var lable = new Lable(label_string, this.new_canvas_position(x_frac, 0), 20);
        return new LabledLine(lable, line);
    }

    to_canvas_position(real_position: RealPosition, view: ViewOfPlane) {

        return new DynamicCanvasPosition(this, real_position, view);
    }

    to_cavas_colored_point(real_position: RealPosition, view_info: ViewOfPlane, color: string, size: number) {
        return new CanvasColoredPoint(this.to_canvas_position(real_position, view_info), color, size);
    }

}
