import {get_t} from './time'
import { ViewOfPlane, RealPosition, CanvasInfo } from './draw';
let canvas2 = document.getElementById('canvas') as
                HTMLCanvasElement;
canvas2.width = .9*window.innerWidth
canvas2.height = .9*window.innerHeight
let c = canvas2.getContext("2d")!;


var plane = new ViewOfPlane(new RealPosition(0,0), 100, 100, new CanvasInfo(canvas2))
plane.draw(c)

function getCursorPosition(canvas: HTMLCanvasElement, event:any) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}

canvas2.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas2, e)
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
  
// function animate(){
//     requestAnimationFrame(animate)
//     c.clearRect(0,0,innerWidth, innerHeight)
    
// }

// animate()