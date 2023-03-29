import { IRealPosition } from "../RealPosition";
import { IPointable } from "../IScene";
import { ScenePosition } from "./ScenePosition";

export class PhaseDisplayPoint implements IPointable, IRealPosition {
    real_position: ScenePosition;

    constructor(real_position: ScenePosition) {
        this.real_position = real_position;
    }
    get_x(): number {
        return this.real_position.x;
    }
    get_y(): number {
        return this.real_position.y;
    }
    
    get_real_point_color(): string {
        return 'red';
    }
    get_real_point_size(): number {
        return 3;
    }
}
