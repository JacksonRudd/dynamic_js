import { IScene } from "../IScene";
import { CreateUpdateSceneFromText } from "./CreateUpdateSceneFromText";
import { ISceneCreator } from "../ISceneCreator";

export class CreateUpdateableSceneWithPlainTextEquations implements ISceneCreator {
    
    constructor(){
        this.set_up_html()
    }

    create_scene(): IScene {
        const input1 = document.getElementById('input1') as HTMLInputElement;
        const input2 = document.getElementById('input2') as HTMLInputElement;
        return new CreateUpdateSceneFromText().create_update_scene_from_equation_text(input1.value, input2.value);
    }

    private create_labled_field(field_id:string, field_prompt: string, field_type: string){
        const scene = document.getElementById("scene")!;
        const label1 = document.createElement("label");
        label1.setAttribute("for", field_id);
        label1.textContent = field_prompt;
        scene.appendChild(label1);
        const input1 = document.createElement("input");
        input1.setAttribute("type", field_type);
        input1.setAttribute("id", field_id);
        scene.appendChild(input1);
    }

    private set_up_html(){
        this.create_labled_field("input1", "x update:", "text")
        this.create_labled_field("input2", "y update:", "text")
    }




}


