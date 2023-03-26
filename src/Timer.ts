

export class Timer {
    start_seconds = new Date();

    static getTotalSecondsBetweenDates(earlier: Date, later: Date): number {
        const millisecondsDiff = Math.abs(later.getTime() - earlier.getTime());
        return millisecondsDiff / 1000;
    }

    get_t() {
        return Timer.getTotalSecondsBetweenDates(this.start_seconds, new Date());
    }

    reset_t() {
        this.start_seconds = new Date();
    }
}
