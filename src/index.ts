import { UpdateableScene } from "./UpdateableScene";
import { RealPosition } from "./RealPosition";
import { ControllableDrawablePlane } from "./view/ControllableDrawablePlane";
import { ViewOfPlane } from "./view/ViewOfPlane";
import { CanvasInfo } from './view/CanvasInfo';
import { ViewableScene } from "./ViewableScene";
import { DefaultRealPositionViz } from "./IRealPositionViz";


function createMathFunction(expression: string): (x: number, y: number, t: number) => number {
    const fn = new Function('x', 'y', 't', `return ${expression};`);
    return (x: number, y: number, t: number): number => fn(x, y, t);
  }

const button = document.getElementById('start') as HTMLButtonElement;

function create_update_scene_from_equation_text(input1: string, input2:string){
    var real_scene: RealPosition[] = []

    for (let i = 0; i < 1000; i++) {
        var randomNum1 = Math.floor(Math.random() * (100 - (-100) + 1)) + (-100);
        var randomNum2 = Math.floor(Math.random() * (100 - (-100) + 1)) + (-100);
        real_scene.push(new RealPosition(randomNum1, randomNum2))
    }
    return new UpdateableScene(real_scene, createMathFunction(input1), createMathFunction(input2))
}

function create_update_scene_from_html(){
    const input1 = document.getElementById('input1') as HTMLInputElement;
    const input2 = document.getElementById('input2') as HTMLInputElement;
    return create_update_scene_from_equation_text(input1.value, input2.value)
}

function create_viewable_scene(){
    draw_plane.clear()
    var scene = create_update_scene_from_html()
    return new ViewableScene(draw_plane, scene, new DefaultRealPositionViz())
}

var canvas = document.getElementById('canvas') as HTMLCanvasElement
var canvas_info = new CanvasInfo(canvas)
canvas.width = .95*window.innerWidth
canvas.height = .95*window.innerHeight

export var draw_plane = new ControllableDrawablePlane(new ViewOfPlane(new RealPosition(0,0), 100, 100, canvas_info),[], canvas)
draw_plane.add_arrow_key_controls()
draw_plane.draw()
// add an event listener to the button

button.addEventListener('click', function() {
    // get the values of the user inputs
    var viewable_scene = create_viewable_scene()
    function animate(){
        requestAnimationFrame(animate)
        viewable_scene.step()
 
    }
    animate()
  })












