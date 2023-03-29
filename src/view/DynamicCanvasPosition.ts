import { IRealPosition } from "../RealPosition";
import { CanvasInfo } from './CanvasInfo';
import { Positionable } from './Positionable';
import { ViewOfPlane } from "./ViewOfPlane";



export class DynamicCanvasPosition extends Positionable {

    real_position: IRealPosition;
    canvas_info: CanvasInfo;
    view: ViewOfPlane;
    constructor(canvas_info: CanvasInfo, real_position: IRealPosition, view: ViewOfPlane) {
        super();
        this.real_position = real_position;
        this.canvas_info = canvas_info;
        this.view = view;
    }

    x_frac(): number {
        return .5 + (this.real_position.get_x() - this.view.center_point.get_x()) / this.view.x_axis_length;
    }

    y_frac(): number {
        return .5 + (this.real_position.get_y() - this.view.center_point.get_y()) / this.view.y_axis_length;
    }

    pixel_x() {
        return this.canvas_info.get_width() * this.x_frac();
    }

    pixel_y() {
        return this.canvas_info.get_height() * (1 - this.y_frac());
    }
}
