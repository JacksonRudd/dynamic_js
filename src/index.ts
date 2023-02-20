import {get_t} from './time'
import { get_multiples_in_range } from './math_utility';
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
        return canvas.height*(1-this.y_frac)
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


    static horizontal_line(y_frac:number, line_width:number = 2, stroke_style:string = 'black'){
        return new CanvasLine(new CanvasPosition(0,y_frac),new CanvasPosition(1,y_frac), line_width, stroke_style)
    }

    static vertical_line(x_frac:number, line_width:number = 2, stroke_style:string = 'black'){
        return new CanvasLine(new CanvasPosition(x_frac,0),new CanvasPosition(x_frac,1) , line_width, stroke_style)
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

function get_labled_horizontal_line(y_frac:number, label:string, color:string){
    CanvasLine.horizontal_line(y_frac, 2, color).draw()
    return new LabledLine(label, new CanvasPosition(0, y_frac), 20)
}

function get_labled_vertical_line(x_frac:number, label:string, color: string){
    CanvasLine.vertical_line(x_frac, 2, color).draw()
    return new LabledLine(label, new CanvasPosition(x_frac,0), 20)
}

class RealPosition{
    x: number;
    y: number;
    constructor(x:number, y:number){
        this.x = x
        this.y = y
    }

    to_canvas_position(view_info:ViewOfPlane){
        var x_frac = .5 + (this.x-view_info.center_point.x)/view_info.x_axis_length
        var y_frac = .5 + (this.y-view_info.center_point.y)/view_info.y_axis_length
        return new CanvasPosition(x_frac, y_frac)
    }
}

class ViewOfPlane{
    center_point  : RealPosition;
    x_axis_length: number;
    y_axis_length: number;
    y_grid_line_resolution:number;

    x_grid_line_resolution:number;
    constructor(center_point: RealPosition, x_axis_length: number, y_axis_length: number){
        this.center_point = center_point 
        this.x_axis_length = x_axis_length
        this.y_axis_length = y_axis_length
        this.x_grid_line_resolution = 5
        this.y_grid_line_resolution = 5
    }

    x_max(){
        return this.center_point.x + this.x_axis_length/2
    }

    x_min(){
        return this.center_point.x - this.x_axis_length/2
    }
    y_max(){
        return this.center_point.y + this.y_axis_length/2
    }

    y_min(){
        return this.center_point.y - this.y_axis_length/2
    }


    draw(){
        get_multiples_in_range(this.x_grid_line_resolution, this.x_min(), this.x_max()).forEach(x_intercept => {
            var x_frac = new RealPosition(x_intercept,0).to_canvas_position(this).x_frac 

            get_labled_vertical_line(x_frac, String(x_intercept), x_intercept == 0? 'black': '#d3d3d3').draw()   
        });

        get_multiples_in_range(this.y_grid_line_resolution, this.y_min(), this.y_max()).forEach(y_intercept => {
            var y_frac = new RealPosition(y_intercept,0).to_canvas_position(this).x_frac 
            get_labled_horizontal_line(y_frac, String(y_intercept),  y_intercept == 0? 'black': '#d3d3d3').draw()   
        });

    }
}


new ViewOfPlane(new RealPosition(0,0), 100, 100).draw()

// function animate(){
//     requestAnimationFrame(animate)
//     c.clearRect(0,0,innerWidth, innerHeight)
    
// }

// animate()