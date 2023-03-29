import { RealPosition } from "./RealPosition";


export interface IPointable{
    get_real_position_position(): RealPosition;
    
    get_real_point_color(): string;

    get_real_point_size(): number;
}

export interface IScene {
    update(): void;
    get_real_points(): IPointable[];
}
