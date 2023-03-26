import { IScene, UpdateableScene } from "./UpdateableScene";
import { DrawablePlane } from "./view/DrawablePlane";
import { draw_plane } from "./index";
import { IRealPositionViz } from "./IRealPositionViz";

export class ViewableScene {
    drawable_plane: DrawablePlane;
    real_scene: IScene;
    how_to_view: IRealPositionViz;

    constructor(drawable_plane: DrawablePlane, real_scene: IScene, how_to_view:IRealPositionViz) {
        this.drawable_plane = drawable_plane;
        this.real_scene = real_scene;
        this.how_to_view = how_to_view
        this.real_scene.get_real_points().forEach(real_point => {
            draw_plane.add_real_point(
                this.how_to_view.get_real_position_position(real_point), 
                this.how_to_view.get_real_point_color(real_point), 
                this.how_to_view.get_real_point_size(real_point));
        });
    }

    step() {
        this.real_scene.update();
        this.drawable_plane.draw();
    }
}
