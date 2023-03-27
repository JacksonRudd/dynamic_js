import { IScene } from "./IScene";


export interface ISceneCreator {
    create_scene(): IScene;
}
