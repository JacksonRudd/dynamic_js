import { UpdateableScene } from "./UpdateableScene";
import { RandomGenerator } from "../PointGenerator";

export class CreateUpdateSceneFromText {


    create_update_scene_from_equation_text(input1: string, input2: string) {

        return new UpdateableScene(
            new RandomGenerator(100,-100, 100, -100, 1000).generate_points(),
            this.createMathFunction(input1),
            this.createMathFunction(input2)
        );
    }

    private createMathFunction(expression: string): (x: number, y: number, t: number) => number {
        const fn = new Function('x', 'y', 't', `return ${expression};`);
        return (x: number, y: number, t: number): number => fn(x, y, t);
    }
}
