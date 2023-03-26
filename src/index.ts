import {UpdateableScene} from './scene'
import { RealPosition } from './real';
import { ControllableDrawablePlane } from "./view/ControllableDrawablePlane";
import { ViewOfPlane } from "./view/ViewOfPlane";
import { CanvasInfo } from './view/CanvasInfo';


function createMathFunction(expression: string): (x: number, y: number, t: number) => number {
    const fn = new Function('x', 'y', 't', `return ${expression};`);
    return (x: number, y: number, t: number): number => fn(x, y, t);
  }

const button = document.getElementById('start') as HTMLButtonElement;

function create_scene(input1: string, input2:string){
    var real_scene: RealPosition[] = []

    for (let i = 0; i < 1000; i++) {
        var randomNum1 = Math.floor(Math.random() * (100 - (-100) + 1)) + (-100);
        var randomNum2 = Math.floor(Math.random() * (100 - (-100) + 1)) + (-100);
        real_scene.push(new RealPosition(randomNum1, randomNum2))
    }
    return new UpdateableScene(real_scene, createMathFunction(input1), createMathFunction(input2))

}
var canvas = document.getElementById('canvas') as HTMLCanvasElement
var canvas_info = new CanvasInfo(canvas)
canvas.width = .95*window.innerWidth
canvas.height = .95*window.innerHeight



var draw_plane = new ControllableDrawablePlane(new ViewOfPlane(new RealPosition(0,0), 100, 100, canvas_info),[], canvas)
draw_plane.draw()
// add an event listener to the button
button.addEventListener('click', function() {
    // get the values of the user inputs
    draw_plane.clear()
    draw_plane.add_arrow_key_controls()
    const input1 = document.getElementById('input1') as HTMLInputElement;
    const input2 = document.getElementById('input2') as HTMLInputElement;

    var scene = create_scene(input1.value, input2.value)
    draw_plane.add_real_scene(scene.list_of_points)
    
    function animate(){
        requestAnimationFrame(animate)
        scene.update()
        draw_plane.draw()  
    }
    animate()


  })












