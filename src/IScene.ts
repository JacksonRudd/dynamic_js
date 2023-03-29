import { IPointable } from "./IPointable";


export interface IScene {
    update(): void;
    get_real_points(): IPointable[];
}
