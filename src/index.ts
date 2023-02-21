import {get_t} from './time'
import { ViewOfPlane, CanvasInfo, Drawable } from './view/draw';
import { RealPosition } from './real';

import {get_draw_function} from './view/draw_function'

var real_scene: RealPosition[] = []


for (let i = 0; i < 100000; i++) {
    var randomNum1 = Math.floor(Math.random() * (1000 - (-1000) + 1)) + (-1000);
    var randomNum2 = Math.floor(Math.random() * (1000 - (-1000) + 1)) + (-1000);
    real_scene.push(new RealPosition(randomNum1, -randomNum2))
}



// Display

var draw = get_draw_function(real_scene, document.getElementById('canvas') as HTMLCanvasElement)

function animate(){
    requestAnimationFrame(animate)
    real_scene.forEach(element => {
        element.x = element.x + element.y*Math.sin(get_t())/10
        element.y = element.y -element.x/10
    });

    draw()
    
}
animate()