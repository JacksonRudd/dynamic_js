export class RealPosition {
    x: number;
    y: number;
    properties: string[]
    constructor(x: number, y: number, properties = []) {
        this.x = x;
        this.y = y;
        this.properties = properties
    }
}
