import {get_t} from './time'
import { ViewOfPlane, CanvasInfo, Drawable } from './draw';
import { RealPosition } from './real';

import {display} from './display_function'

var real_scene: RealPosition[] = []


for (let i = 0; i < 100000; i++) {
    var randomNum1 = Math.floor(Math.random() * (1000 - (-1000) + 1)) + (-1000);
    var randomNum2 = Math.floor(Math.random() * (1000 - (-1000) + 1)) + (-1000);
    real_scene.push(new RealPosition(randomNum1, -randomNum2))
}



// Display

display(real_scene, document.getElementById('canvas') as HTMLCanvasElement)