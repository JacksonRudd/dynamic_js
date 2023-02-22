import {Timer} from './time'
import { RealPosition } from './real';
import {get_draw_function} from './view/draw_function'




class UpdateableScene{
    last_t:number = 0
    timer = new Timer()
    list_of_points : RealPosition[]
    x_update : Function
    y_update : Function

    constructor(list_of_points: RealPosition[], x_update_func:Function, y_update_func:Function){
        this.list_of_points = list_of_points
        this.x_update = x_update_func
        this.y_update = y_update_func
    }

     update(){
        var t = this.timer.get_t()
        var delta = t - this.last_t
        real_scene.forEach(element => {
            element.x += this.x_update(element.x, element.y, t)*delta
            element.y += this.y_update(element.x, element.y, t)*delta
        });
        
        this.last_t = t
    }
}



var real_scene: RealPosition[] = []


for (let i = 0; i < 100; i++) {
    var randomNum1 = Math.floor(Math.random() * (100 - (-100) + 1)) + (-100);
    var randomNum2 = Math.floor(Math.random() * (100 - (-100) + 1)) + (-100);
    real_scene.push(new RealPosition(randomNum1, randomNum2))
}

function x_update(x:number,y:number, t:number){
    return -y 
}

function y_update(x:number,y:number, t:number){
    return x  
}

var scene = new UpdateableScene(real_scene, x_update, y_update)


var draw = get_draw_function(real_scene, document.getElementById('canvas') as HTMLCanvasElement)

function animate(){
    requestAnimationFrame(animate)
    
    scene.update()

    draw()
    
}
animate()