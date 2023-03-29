import { IRealPosition } from "../RealPosition";



export class StationaryPosition implements IRealPosition {

    x: any;
    y: any;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    get_x(): number {
        return this.x;
    }
    get_y(): number {
        return this.y;
    }

    add_to_x(arg0: number) {
        this.x += arg0
    }
    add_to_y(arg0: number) {
        this.y += arg0
    }


}
