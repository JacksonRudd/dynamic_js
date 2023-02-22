
function getTotalSecondsBetweenDates(earlier: Date, later: Date): number {
    const millisecondsDiff = Math.abs(later.getTime() - earlier.getTime());
    return millisecondsDiff/1000
  }

export class Timer{
    start_seconds = new Date()

    
    get_t() {
        return getTotalSecondsBetweenDates(this.start_seconds, new Date())
    }
    
    reset_t(){
        this.start_seconds = new Date()
    }
}

