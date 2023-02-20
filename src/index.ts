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


interface Drawable{
    draw():void
}

// draw a red line

class CanvasPosition{
    x_frac: number
    y_frac: number
    constructor(x:number,y:number){
        this.x_frac = x
        this.y_frac = y
    }

    pixel_x(){
        return canvas.width*this.x_frac
    }

    pixel_y(){
        return canvas.height*this.y_frac
    }
}

class CanvasLine implements Drawable{
    p1 :CanvasPosition
    p2: CanvasPosition
    line_width: number;
    stroke_style: string;

    constructor(p1:CanvasPosition,p2: CanvasPosition, line_width:number = 2, stroke_style:string = 'black'){
        this.p1 = p1
        this.p2 = p2
        this.line_width = line_width
        this.stroke_style = stroke_style
        
    }

    draw(){
        c.strokeStyle = this.stroke_style;
        c.lineWidth = this.line_width;
        c.beginPath();
        c.moveTo(this.p1.pixel_x(), this.p1.pixel_y());
        c.lineTo(this.p2.pixel_x(), this.p2.pixel_y());
        c.stroke();
    }

    static horizontal_line(y_frac:number){
        return new CanvasLine(new CanvasPosition(0,y_frac),new CanvasPosition(1,y_frac))
    }

    static vertical_line(x_frac:number){
        return new CanvasLine(new CanvasPosition(x_frac,0),new CanvasPosition(x_frac,1))
    }
}

class LabledLine implements Drawable{
    label: string;
    bottom_left: CanvasPosition;
    pixels: number;

    constructor( label: string, bottom_left_location:CanvasPosition, pixels:number = 16){
        this.label = label
        this.bottom_left = bottom_left_location
        this.pixels = pixels
    }
    draw(): void {
        c.fillStyle = "black";
        c.font = this.pixels+"px Arial";
        c.textAlign = 'left';
        c.textBaseline = 'middle';
        c.fillText(this.label, this.bottom_left.pixel_x() + 3, this.bottom_left.pixel_y() - this.pixels/2);
    }

}



for (let index = 0; index < 10; index++) {
    CanvasLine.horizontal_line(index*.1).draw()
    new LabledLine(String(index), new CanvasPosition(0, index*.1), 20).draw()
    CanvasLine.vertical_line(index*.1).draw()
    new LabledLine(String(index), new CanvasPosition(index*.1, 1), 20).draw()

}

// function animate(){
//     requestAnimationFrame(animate)
//     c.clearRect(0,0,innerWidth, innerHeight)
    
// }

// animate()