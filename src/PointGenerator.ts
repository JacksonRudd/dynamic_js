import { RealPosition } from "./RealPosition";

export interface PointGenerator {
    generate_points(): RealPosition[];
}
export class RandomGenerator implements PointGenerator {
    x_min: number;
    x_max: number;
    y_min: number;
    num_of_points: number;
    y_max: number;

    constructor(x_min: number, x_max: number, y_min: number, y_max: number, num_of_points: number) {
        this.x_min = x_min;
        this.x_max = x_max;
        this.y_min = y_min;
        this.y_max = y_max;
        this.num_of_points = num_of_points;
    }
    generate_points(): RealPosition[] {
        var to_return: RealPosition[] = [];
        for (let i = 0; i < this.num_of_points; i++) {
            var randomNum1 = Math.floor(Math.random() * (this.x_max - (this.x_min) + 1)) + (this.x_min);
            var randomNum2 = Math.floor(Math.random() * (this.y_max - (this.y_min) + 1)) + (this.y_min);
            to_return.push(new RealPosition(randomNum1, randomNum2));
        }
        return to_return;
    }
}
