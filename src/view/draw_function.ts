import { ViewOfPlane, CanvasInfo, Drawable } from './draw';
import { RealPosition } from '../real';


class DrawablePlane{
    view_of_plane: ViewOfPlane 
    drawable_things:Drawable[] = []
    canvas : HTMLCanvasElement
    canvas_info: CanvasInfo;
    
    
    constructor(view: ViewOfPlane, real_scene: RealPosition[], canvas: HTMLCanvasElement){
        this.view_of_plane = view
        this.canvas = canvas
        this.canvas_info = new CanvasInfo(canvas)
        this.drawable_things.push(view)
    }

    clear(){
        this.drawable_things = [this.view_of_plane]
    }

    add_real_scene(real_scene: RealPosition[]){
        real_scene.forEach(element => {
            var colored_point = this.canvas_info.to_cavas_colored_point(element, this.view_of_plane, 'red', 3)
            this.drawable_things.push(colored_point)
        });
    }
    
    draw(){
        this.canvas.getContext("2d")!.clearRect(0,0,innerWidth, innerHeight)
        this.drawable_things.forEach(element => {
            element.draw(this.canvas.getContext("2d")!)
        });
    }
}


class ControllableDrawablePlane extends DrawablePlane{
    
    constructor(view: ViewOfPlane, real_scene: RealPosition[], canvas: HTMLCanvasElement){
        super(view, real_scene, canvas)
        this.add_arrow_key_controls()
    }
    
    add_arrow_key_controls(){
        var c =  this.canvas.getContext("2d")!
        var view = this.view_of_plane

        document.addEventListener("keydown", function(event) {
            if (event.key === "ArrowUp") {
                if (event.ctrlKey){
                    view.x_axis_length -= 10
                    view.y_axis_length -= 10
                }else{
                    view.center_point.y += view.y_axis_length/100
                }
            } else if (event.key === "ArrowDown") {
                if (event.ctrlKey){
                    view.x_axis_length += 10
                    view.y_axis_length += 10
    
                }else{
                    view.center_point.y -= view.y_axis_length/100
                }
            } else if (event.key === "ArrowLeft") {
                view.center_point.x -= view.x_axis_length/100
            } else if (event.key === "ArrowRight") {
                view.center_point.x += view.x_axis_length/100
            }
            c.clearRect(0,0,innerWidth, innerHeight)
            view.draw(c)
        });
    }

}

export {DrawablePlane, ControllableDrawablePlane}


