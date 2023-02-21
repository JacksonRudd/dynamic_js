
export function get_multiples_in_range(n: number, start: number, end: number): number[] {
    const multiples: number[] = [];
    
    for (let i = Math.round(start); i <= Math.round(end); i++) {
      if (i % n === 0) {
        multiples.push(i);
      }
    }
  
    return multiples;
  }