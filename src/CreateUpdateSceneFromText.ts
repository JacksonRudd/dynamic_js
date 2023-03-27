import { UpdateableScene } from "./UpdateableScene";
import { PointGenerator } from "./PointGenerator";

export class CreateUpdateSceneFromText {

    createMathFunction(expression: string): (x: number, y: number, t: number) => number {
        const fn = new Function('x', 'y', 't', `return ${expression};`);
        return (x: number, y: number, t: number): number => fn(x, y, t);
    }
    create_update_scene_from_equation_text(input1: string, input2: string, point_generator: PointGenerator) {

        return new UpdateableScene(
            point_generator.generate_points(),
            this.createMathFunction(input1),
            this.createMathFunction(input2)
        );
    }
}
