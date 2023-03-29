import { IScene } from "./IScene";
import { DrawablePlane } from "./view/DrawablePlane";

export class ViewableScene {
    drawable_plane: DrawablePlane;
    real_scene: IScene;

    constructor(drawable_plane: DrawablePlane, real_scene: IScene) {
        this.drawable_plane = drawable_plane;
        this.real_scene = real_scene;
        this.real_scene.get_real_points().forEach(real_point => {this.drawable_plane.add_ipointable(real_point);})
    }

    step() {
        this.real_scene.update();
        this.drawable_plane.draw();
    }
}
