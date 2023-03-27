import { RealPosition } from "./RealPosition";
import { ControllableDrawablePlane } from "./view/ControllableDrawablePlane";
import { ViewOfPlane } from "./view/ViewOfPlane";
import { CanvasInfo } from './view/CanvasInfo';
import { ViewableScene } from "./ViewableScene";
import { DefaultRealPositionViz } from "./IRealPositionViz";
import { ISceneCreator } from "./ISceneCreator";

export function setup_given_scene_creator(scene_factory: ISceneCreator) {
    var canvas = document.getElementById('canvas') as HTMLCanvasElement;
    var canvas_info = new CanvasInfo(canvas);
    canvas.width = .95 * window.innerWidth;
    canvas.height = .95 * window.innerHeight;

    var draw_plane = new ControllableDrawablePlane(new ViewOfPlane(new RealPosition(0, 0), 100, 100, canvas_info), [], canvas);
    draw_plane.add_arrow_key_controls();
    draw_plane.draw();
    // add an event listener to the button
    function create_viewable_scene() {
        draw_plane.clear();
        var scene = scene_factory.create_scene();
        return new ViewableScene(draw_plane, scene, new DefaultRealPositionViz());
    }

    const button = document.getElementById('start') as HTMLButtonElement;

    button.addEventListener('click', function () {
        // get the values of the user inputs
        var viewable_scene = create_viewable_scene();
        function animate() {
            requestAnimationFrame(animate);
            viewable_scene.step();
        }
        animate();
    });
}
