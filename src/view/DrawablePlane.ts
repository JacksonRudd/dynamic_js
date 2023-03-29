import { Drawable } from "./Drawable";
import { CanvasInfo } from "./CanvasInfo";
import { IRealPosition } from "../RealPosition";
import { ViewOfPlane } from "./ViewOfPlane";
import { IPointable } from "../IPointable";

export class DrawablePlane {

    view_of_plane: ViewOfPlane;
    drawable_things: Drawable[] = [];
    canvas: HTMLCanvasElement;
    canvas_info: CanvasInfo;

    constructor(view: ViewOfPlane, real_scene: IRealPosition[], canvas: HTMLCanvasElement) {
        this.view_of_plane = view;
        this.canvas = canvas;
        this.canvas_info = new CanvasInfo(canvas);
        this.drawable_things.push(view);
    }

    clear() {
        this.drawable_things = [this.view_of_plane];
    }

    add_drawables(drawables: Drawable[]){
        drawables.forEach(
            element => {this.drawable_things.push(element)}
        )
    }

    add_real_point(element:IRealPosition, color='red', size=3){
        this.drawable_things.push(
            this.canvas_info.to_cavas_colored_point(element, this.view_of_plane, color, size)
        )
    }

    add_ipointable(real_point: IPointable) {
        this.drawable_things.push(
            this.canvas_info.pointable_to_cavas_colored_point(real_point, this.view_of_plane)
        )
    }

    draw() {
        this.canvas.getContext("2d")!.clearRect(0, 0, innerWidth, innerHeight);
        this.drawable_things.forEach(element => {
            element.draw(this.canvas.getContext("2d")!);
        });
    }
}
