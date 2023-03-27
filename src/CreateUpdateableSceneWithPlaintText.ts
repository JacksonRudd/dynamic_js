import { UpdateableScene } from "./UpdateableScene";
import { PointGenerator, RandomGenerator } from "./PointGenerator";


export class CreateUpdateableSceneWithPlaintTextEquations {
    random_generator: PointGenerator;
    
    constructor(random_generator: PointGenerator){
        this.set_up_html()
        this.random_generator = random_generator 
    }

    set_up_html(){
        const scene = document.getElementById("scene")!;
        
        const label1 = document.createElement("label");
        label1.setAttribute("for", "input1");
        label1.textContent = "X update:";
        scene.appendChild(label1);

        const input1 = document.createElement("input");
        input1.setAttribute("type", "text");
        input1.setAttribute("id", "input1");
        scene.appendChild(input1);

        const label2 = document.createElement("label");
        label2.setAttribute("for", "input2");
        label2.textContent = "Y update:";
        scene.appendChild(label2);

        const input2 = document.createElement("input");
        input2.setAttribute("type", "text");
        input2.setAttribute("id", "input2");
        scene.appendChild(input2);
    }

    create_update_scene_from_html() {
        const input1 = document.getElementById('input1') as HTMLInputElement;
        const input2 = document.getElementById('input2') as HTMLInputElement;
        return this.create_update_scene_from_equation_text(input1.value, input2.value);
    }

    private createMathFunction(expression: string): (x: number, y: number, t: number) => number {
        const fn = new Function('x', 'y', 't', `return ${expression};`);
        return (x: number, y: number, t: number): number => fn(x, y, t);
    }


    private create_update_scene_from_equation_text(input1: string, input2: string) {

        return new UpdateableScene(this.random_generator.generate_points(), this.createMathFunction(input1), this.createMathFunction(input2));
    }
}
