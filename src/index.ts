

let canvas = document.getElementById('canvas') as
                HTMLCanvasElement;
let context = canvas.getContext("2d")!;
context.lineCap = 'round';
context.lineJoin = 'round';
context.strokeStyle = 'black';
context.lineWidth = 1;

context.arc(1,100,300,0,5)
context.closePath()
context.fillStyle = "rgb(200, 0, 0)";
context.fillRect(10, 10, 50, 50);

context.fillStyle = "rgba(0, 0, 200, 0.5)";
context.fillRect(30, 30, 50, 50);