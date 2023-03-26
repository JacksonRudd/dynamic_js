import { RealPosition } from "./RealPosition";
import { Timer } from "./Timer";


export class UpdateableScene {
    last_t: number = 0;
    timer = new Timer();
    list_of_points: RealPosition[];
    x_update: Function;
    y_update: Function;

    constructor(list_of_points: RealPosition[], x_update_func: Function, y_update_func: Function) {
        this.list_of_points = list_of_points;
        this.x_update = x_update_func;
        this.y_update = y_update_func;
    }

    update() {
        var t = this.timer.get_t();
        var delta = t - this.last_t;
        this.list_of_points.forEach(element => {
            element.x += this.x_update(element.x, element.y, t) * delta;
            element.y += this.y_update(element.x, element.y, t) * delta;
        });

        this.last_t = t;
    }
}
