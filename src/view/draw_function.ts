import { ViewOfPlane, CanvasInfo, Drawable } from './draw';
import { RealPosition } from '../real';

export function get_draw_function(real_scene: RealPosition[], canvas: HTMLCanvasElement ){
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

    function getCursorPosition(canvas: HTMLCanvasElement, event:any) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
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
    

    function draw(){
        c.clearRect(0,0,innerWidth, innerHeight)

        drawable_things.forEach(element => {
            element.draw(c)
        });
    }
    return draw
}


