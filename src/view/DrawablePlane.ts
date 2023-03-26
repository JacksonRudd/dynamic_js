import { Drawable } from "./Drawable";
import { CanvasInfo } from "./CanvasInfo";
import { RealPosition } from '../real';
import { ViewOfPlane } from "./ViewOfPlane";

export class DrawablePlane {
    view_of_plane: ViewOfPlane;
    drawable_things: Drawable[] = [];
    canvas: HTMLCanvasElement;
    canvas_info: CanvasInfo;

    constructor(view: ViewOfPlane, real_scene: RealPosition[], canvas: HTMLCanvasElement) {
        this.view_of_plane = view;
        this.canvas = canvas;
        this.canvas_info = new CanvasInfo(canvas);
        this.drawable_things.push(view);
    }

    clear() {
        this.drawable_things = [this.view_of_plane];
    }

    add_real_scene(real_scene: RealPosition[]) {
        real_scene.forEach(element => {
            var colored_point = this.canvas_info.to_cavas_colored_point(element, this.view_of_plane, 'red', 3);
            this.drawable_things.push(colored_point);
        });
    }

    draw() {
        this.canvas.getContext("2d")!.clearRect(0, 0, innerWidth, innerHeight);
        this.drawable_things.forEach(element => {
            element.draw(this.canvas.getContext("2d")!);
        });
    }
}
