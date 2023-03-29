import { get_multiples_in_range } from "../math_utility";
import { RealPosition } from "../RealPosition";
import { CanvasInfo } from "./CanvasInfo";
import { LabledLine } from "./LabledLine";
import { StationaryPosition } from "./StationaryPosition";


export class ViewOfPlane {
    center_point: StationaryPosition;
    x_axis_length: number;
    y_axis_length: number;
    y_grid_line_resolution: number;

    x_grid_line_resolution: number;
    canvas_info: CanvasInfo;
    constructor(center_point: StationaryPosition, x_axis_length: number, y_axis_length: number, canvas_info: CanvasInfo) {
        this.center_point = center_point;
        this.x_axis_length = x_axis_length;
        this.y_axis_length = y_axis_length;
        this.x_grid_line_resolution = 5;
        this.y_grid_line_resolution = 5;
        this.canvas_info = canvas_info;
    }

    x_max() {
        return this.center_point.get_x() + this.x_axis_length / 2;
    }

    x_min() {
        return this.center_point.get_x() - this.x_axis_length / 2;
    }
    y_max() {
        return this.center_point.get_y() + this.y_axis_length / 2;
    }

    y_min() {
        return this.center_point.get_y() - this.y_axis_length / 2;
    }


    draw(c: CanvasRenderingContext2D) {
        var x_intercepts = get_multiples_in_range(this.x_grid_line_resolution, this.x_min(), this.x_max());
        var y_intercepts = get_multiples_in_range(this.y_grid_line_resolution, this.y_min(), this.y_max());
        var lines: LabledLine[] = [];
        x_intercepts.forEach(x_intercept => {
            var x_frac = this.canvas_info.to_canvas_position(new StationaryPosition(x_intercept, 0), this).x_frac();
            lines.push(this.canvas_info.get_labled_vertical_line(x_frac, String(x_intercept), x_intercept == 0 ? 'black' : '#d3d3d3', x_intercept == 0 ? 1 : 0));
        });

        y_intercepts.forEach(y_intercept => {
            var y_frac = this.canvas_info.to_canvas_position(new StationaryPosition(0, y_intercept), this).y_frac();
            lines.push(this.canvas_info.get_labled_horizontal_line(y_frac, String(y_intercept), y_intercept == 0 ? 'black' : '#d3d3d3'));
        });

        lines.sort((a, b) => a.line.draw_order - b.line.draw_order);
        lines.forEach(element => {
            element.draw(c);
        });
    }
}
