import { RealPosition } from "./RealPosition";



export interface IScene {
    update(): void;
    get_real_points(): RealPosition[];
}
