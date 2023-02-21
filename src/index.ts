import {get_t} from './time'
import { ViewOfPlane, RealPosition, CanvasInfo, Drawable } from './draw';



var real_scene: RealPosition[] = []


for (let i = 0; i < 100000; i++) {
    var randomNum1 = Math.floor(Math.random() * (1000 - (-1000) + 1)) + (-1000);
    var randomNum2 = Math.floor(Math.random() * (1000 - (-1000) + 1)) + (-1000);
    real_scene.push(new RealPosition(randomNum1, -randomNum2))
}







// Display

let canvas = document.getElementById('canvas') as
                HTMLCanvasElement;
canvas.width = .95*window.innerWidth
canvas.height = .95*window.innerHeight
let c = canvas.getContext("2d")!;


var canvas_info = new CanvasInfo(canvas)
var plane = new ViewOfPlane(new RealPosition(0,0), 100, 100, canvas_info)

var drawable_things: Drawable[] = []
drawable_things.push(plane)


real_scene.forEach(element => {
    var colored_point = canvas_info.to_cavas_colored_point(element, plane, 'red', 3)
    drawable_things.push(colored_point)

});




function draw(){
    drawable_things.forEach(element => {
        element.draw(c)
    });
}


function getCursorPosition(canvas: HTMLCanvasElement, event:any) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}

canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})


document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp") {
        if (event.ctrlKey){
            plane.x_axis_length -= 10
            plane.y_axis_length -= 10
        }else{
            plane.center_point.y += plane.y_axis_length/100
        }
    } else if (event.key === "ArrowDown") {
        if (event.ctrlKey){
            plane.x_axis_length += 10
            plane.y_axis_length += 10

        }else{
            plane.center_point.y -= plane.y_axis_length/100
        }
    } else if (event.key === "ArrowLeft") {
        plane.center_point.x -= plane.x_axis_length/100
    } else if (event.key === "ArrowRight") {
        plane.center_point.x += plane.x_axis_length/100
    }
    c.clearRect(0,0,innerWidth, innerHeight)
    plane.draw(c)
  });
  
function animate(){
    requestAnimationFrame(animate)
    real_scene.forEach(element => {
        element.x = element.x + element.y*Math.sin(get_t())/10
        element.y = element.y -element.x/10
    });
    c.clearRect(0,0,innerWidth, innerHeight)

    draw()
    
}

animate()