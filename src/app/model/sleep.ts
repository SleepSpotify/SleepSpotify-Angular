import { Countdown } from './countdown'

export class Sleep{
  Uts: number;

  constructor(Uts: any) {
    this.Uts = Uts;
  }

  getDate(): Date {
    return new Date(this.Uts*1000)
  }

  getCountDown(): Countdown{
    let distance = new Date().getTime() - this.Uts;
    let hour = (-Math.floor(distance / (1000 * 60 * 60)))-1;
    let min = (-Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)))-1;
    let sec = (-Math.floor((distance % (1000 * 60)) / 1000));
    return new Countdown(hour, min, sec);
  }
}
