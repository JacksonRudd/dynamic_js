import { CanvasLine } from "./CanvasLine";
import { Drawable } from "./Drawable";
import { Lable } from "./Lable";


export class LabledLine implements Drawable {
    line: CanvasLine;
    label: Lable;
    constructor(label: Lable, line: CanvasLine) {
        this.label = label;
        this.line = line;
    }
    draw(c: CanvasRenderingContext2D): void {
        this.line.draw(c);
        this.label.draw(c);
    }

}
