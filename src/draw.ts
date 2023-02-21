import { get_multiples_in_range } from './math_utility';

export class CanvasInfo{
    canvas:HTMLCanvasElement
    constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas
    }

    get_width(){
        return this.canvas.width
    }

    get_height(){
        return this.canvas.height
    }

    new_canvas_position(x:number,y:number){
        return new CanvasPosition(this, x,y)
    }

    horizontal_line(y_frac:number, line_width:number = 2, stroke_style:string = 'black'){
        return new CanvasLine(this,  this.new_canvas_position(0,y_frac), this.new_canvas_position(1,y_frac), line_width, stroke_style)
    }

    vertical_line(x_frac:number, line_width:number = 2, stroke_style:string = 'black'){
        return new CanvasLine(this, this.new_canvas_position(x_frac,0),this.new_canvas_position(x_frac,1) , line_width, stroke_style)
    }

    get_labled_horizontal_line(y_frac:number, label_string:string, color:string, draw_order = 0): LabledLine{
        var line = this.horizontal_line(y_frac, 2, color)
        line.draw_order = draw_order
        var lable = new Lable(label_string, this.new_canvas_position(0, y_frac), 20)
        return new LabledLine(lable, line)
    }
    
    get_labled_vertical_line(x_frac:number, label_string:string, color: string, draw_order = 0): LabledLine{
        var line = this.vertical_line(x_frac, 2, color)
        line.draw_order = draw_order
        var lable = new Lable(label_string, this.new_canvas_position(x_frac,0), 20)
        return new LabledLine(lable, line)
    }

    to_canvas_position(real_position:RealPosition, view_info:ViewOfPlane){
        var x_frac = .5 + (real_position.x-view_info.center_point.x)/view_info.x_axis_length
        var y_frac = .5 + (real_position.y-view_info.center_point.y)/view_info.y_axis_length
        return this.new_canvas_position(x_frac, y_frac)
    }

}


interface Drawable{
    draw(c: CanvasRenderingContext2D):void
}


class CanvasPosition{
    x_frac: number
    y_frac: number
    canvas_info: CanvasInfo
    constructor(canvas_info:CanvasInfo ,x:number,y:number ){
        this.x_frac = x
        this.y_frac = y
        this.canvas_info = canvas_info
    }

    pixel_x(){
        return this.canvas_info.get_width()*this.x_frac
    }

    pixel_y(){
        return this.canvas_info.get_height()*(1-this.y_frac)
    }
}

class CanvasLine implements Drawable{
    p1 :CanvasPosition
    p2: CanvasPosition
    line_width: number;
    stroke_style: string;
    draw_order: number; //the higher draw order the later it will be drawn
    canvas_info:CanvasInfo
    constructor(canvas_info:CanvasInfo, p1:CanvasPosition,p2: CanvasPosition, line_width:number = 2, stroke_style:string = 'black', draw_order = 0){
        this.p1 = p1
        this.p2 = p2
        this.line_width = line_width
        this.stroke_style = stroke_style   
        this.draw_order = draw_order
        this.canvas_info = canvas_info
    }

    draw(c: CanvasRenderingContext2D){
        c.strokeStyle = this.stroke_style;
        c.lineWidth = this.line_width;
        c.beginPath();
        c.moveTo(this.p1.pixel_x(), this.p1.pixel_y());
        c.lineTo(this.p2.pixel_x(), this.p2.pixel_y());
        c.stroke();
    }


}

class Lable implements Drawable{
    label: string;
    bottom_left: CanvasPosition;
    pixels: number;

    constructor( label: string, bottom_left_location:CanvasPosition, pixels:number = 16){
        this.label = label
        this.bottom_left = bottom_left_location
        this.pixels = pixels
    }
    draw(c: CanvasRenderingContext2D): void {
        c.fillStyle = "black";
        c.font = this.pixels+"px Arial";
        c.textAlign = 'left';
        c.textBaseline = 'middle';
        c.fillText(this.label, this.bottom_left.pixel_x() + 3, this.bottom_left.pixel_y() - this.pixels/2);
    }

}


class LabledLine implements Drawable{
    line: CanvasLine;
    label: Lable;
    constructor(label:Lable, line: CanvasLine){
        this.label = label
        this.line = line
    }
    draw(c: CanvasRenderingContext2D): void {
        this.line.draw(c)
        this.label.draw(c)
    }
    
}



export class RealPosition{
    x: number;
    y: number;
    constructor(x:number, y:number){
        this.x = x
        this.y = y
    }


}

export class ViewOfPlane{
    center_point  : RealPosition;
    x_axis_length: number;
    y_axis_length: number;
    y_grid_line_resolution:number;

    x_grid_line_resolution:number;
    canvas_info: CanvasInfo;
    constructor(center_point: RealPosition, x_axis_length: number, y_axis_length: number, canvas_info:CanvasInfo){
        this.center_point = center_point 
        this.x_axis_length = x_axis_length
        this.y_axis_length = y_axis_length
        this.x_grid_line_resolution = 5
        this.y_grid_line_resolution = 5
        this.canvas_info = canvas_info
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


    draw(c: CanvasRenderingContext2D){
        var x_intercepts = get_multiples_in_range(this.x_grid_line_resolution, this.x_min(), this.x_max())
        var y_intercepts = get_multiples_in_range(this.y_grid_line_resolution, this.y_min(), this.y_max())
        var lines: LabledLine[]= []
        x_intercepts.forEach(x_intercept => {
            var x_frac = this.canvas_info.to_canvas_position(new RealPosition(x_intercept,0),this).x_frac 
            lines.push( this.canvas_info.get_labled_vertical_line(x_frac, String(x_intercept), x_intercept == 0? 'black': '#d3d3d3',x_intercept == 0? 1: 0 ))   
        });

        y_intercepts.forEach(y_intercept => {
            var y_frac = this.canvas_info.to_canvas_position(new RealPosition(0, y_intercept),this).y_frac 
            lines.push(this.canvas_info.get_labled_horizontal_line(y_frac, String(y_intercept),  y_intercept == 0? 'black': '#d3d3d3'))
        });

        lines.sort((a,b) => a.line.draw_order - b.line.draw_order)
        lines.forEach(element => {
            element.draw(c)
        });
    }
}
