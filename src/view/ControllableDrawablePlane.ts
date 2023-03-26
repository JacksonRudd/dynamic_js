import { RealPosition } from "../RealPosition";
import { ViewOfPlane } from "./ViewOfPlane";
import {DrawablePlane} from './DrawablePlane'

export class ControllableDrawablePlane extends DrawablePlane {

    constructor(view: ViewOfPlane, real_scene: RealPosition[], canvas: HTMLCanvasElement) {
        super(view, real_scene, canvas);
        this.add_arrow_key_controls();
    }

    add_arrow_key_controls() {
        var c = this.canvas.getContext("2d")!;
        var view = this.view_of_plane;

        document.addEventListener("keydown", function (event) {
            if (event.key === "ArrowUp") {
                if (event.ctrlKey) {
                    view.x_axis_length -= 10;
                    view.y_axis_length -= 10;
                } else {
                    view.center_point.y += view.y_axis_length / 100;
                }
            } else if (event.key === "ArrowDown") {
                if (event.ctrlKey) {
                    view.x_axis_length += 10;
                    view.y_axis_length += 10;

                } else {
                    view.center_point.y -= view.y_axis_length / 100;
                }
            } else if (event.key === "ArrowLeft") {
                view.center_point.x -= view.x_axis_length / 100;
            } else if (event.key === "ArrowRight") {
                view.center_point.x += view.x_axis_length / 100;
            }
            c.clearRect(0, 0, innerWidth, innerHeight);
            view.draw(c);
        });
    }

}
