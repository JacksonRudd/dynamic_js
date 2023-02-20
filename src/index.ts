import {get_t} from './time'

let canvas = document.getElementById('canvas') as
                HTMLCanvasElement;
canvas.width = .9*window.innerWidth
canvas.height = .9*window.innerHeight
let c = canvas.getContext("2d")!;

function getCursorPosition(canvas: HTMLCanvasElement, event:any) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}

canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})



function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,innerWidth, innerHeight)
    var seconds = get_t()
    c.fillStyle = "rgb(200, 0, 0)";
    c.fillRect((100*seconds+ 100*Math.sin(6*seconds))%canvas.width, (100*seconds) %canvas.height, 5, 5);
}

animate()