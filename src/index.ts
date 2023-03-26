import {UpdateableScene} from './scene'
import { RealPosition } from './real';
import {get_draw_function} from './view/draw_function'


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

get_draw_function([], document.getElementById('canvas') as HTMLCanvasElement)()
// add an event listener to the button
button.addEventListener('click', function() {
    // get the values of the user inputs
    const input1 = document.getElementById('input1') as HTMLInputElement;
    const input2 = document.getElementById('input2') as HTMLInputElement;

    var scene = create_scene(input1.value, input2.value)
    
    var draw = get_draw_function(scene.list_of_points, document.getElementById('canvas') as HTMLCanvasElement)

    function animate(){
        requestAnimationFrame(animate)
        scene.update()
        draw()  
    }
    animate()


  })












