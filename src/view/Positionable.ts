export abstract class Positionable {
    abstract pixel_x(): number;

    abstract pixel_y(): number;

    abstract x_frac(): number;

    abstract y_frac(): number;

    draw(color: string, size: number, c: CanvasRenderingContext2D) {
        c.strokeStyle = color;
        c.strokeRect(this.pixel_x(), this.pixel_y(), size, size);
    }
}
