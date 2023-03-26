import { CanvasInfo } from './CanvasInfo';
import { Positionable } from './Positionable';



export class FixedCanvasPosition extends Positionable {
    x_frac0: number;
    y_frac0: number;
    canvas_info: CanvasInfo;
    constructor(canvas_info: CanvasInfo, x: number, y: number) {
        super();
        this.x_frac0 = x;
        this.y_frac0 = y;
        this.canvas_info = canvas_info;
    }
    x_frac() {
        return this.x_frac0;
    }

    y_frac() {
        return this.y_frac0;
    }

    pixel_x() {
        return this.canvas_info.get_width() * this.x_frac0;
    }

    pixel_y() {
        return this.canvas_info.get_height() * (1 - this.y_frac0);
    }
}
