import { RealPosition } from "./RealPosition";

export interface IRealPositionViz {
    get_real_position_position(real_point: RealPosition): RealPosition;
    
    get_real_point_color(real_point: RealPosition): string;

    get_real_point_size(real_point: RealPosition): number;
}

export class DefaultRealPositionViz implements IRealPositionViz {
    get_real_position_position(real_point: RealPosition): RealPosition {
        // generaly this should be a passthrough, but this might be used for projects for example. 
        return real_point;
    }
    get_real_point_color(real_point: RealPosition): string {
        return 'red';
    }
    get_real_point_size(real_point: RealPosition): number {
        return 3;
    }

}
