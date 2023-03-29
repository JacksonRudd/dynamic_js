import { IRealPosition } from "./RealPosition";


export interface IPointable extends IRealPosition{
    get_x(): number 

    get_y(): number 

    get_real_point_color(): string;

    get_real_point_size(): number;
}

export interface IScene {
    update(): void;
    get_real_points(): IPointable[];
}
