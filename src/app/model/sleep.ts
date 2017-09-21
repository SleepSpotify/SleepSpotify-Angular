import { Countdown } from './countdown'

export class Sleep{
  ID: number;
  Uts: number;

  constructor(ID: number, Uts: number) {
    this.Uts = Uts;
    this.ID = ID;
  }

  getDate(): Date {
    return new Date(this.Uts*1000)
  }

  getCountDown(): Countdown{
    return new Countdown(new Date().getTime() - this.Uts);
  }
}
