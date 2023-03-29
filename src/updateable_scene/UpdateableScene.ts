import { RealPosition } from "../RealPosition";
import { Timer } from "../Timer";
import { IPointable, IScene } from "../IScene";


class PhaseDisplayPoint implements IPointable{
    real_position: RealPosition;
    
    constructor(real_position: RealPosition){
        this.real_position = real_position
    }
    
    get_real_position_position(): RealPosition {
        return this.real_position;
    }
    get_real_point_color(): string {
        return 'red'
    }
    get_real_point_size(): number {
        return 3
    }
    
} 

class ScenePosition{
    x:number
    y:number
    constructor(x:number,y:number){
        this.x = x
        this.y = y
    }
}

export class UpdateableScene implements IScene {
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
    get_real_points(): IPointable[] {
        return this.list_of_points.map(element => new PhaseDisplayPoint(element))
    }

    update(): void {
        var t = this.timer.get_t();
        var delta = t - this.last_t;
        this.list_of_points.forEach(element => {
            element.x += this.x_update(element.x, element.y, t) * delta;
            element.y += this.y_update(element.x, element.y, t) * delta;
        });

        this.last_t = t;
    }
}
