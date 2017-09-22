import { Input } from '@angular/core'

export class Countdown {

  distance: number;

  @Input() hour: number;
  @Input() min: number;
  @Input() sec: number;

  constructor(hour: number, min: number, sec: number) {
    this.hour = hour;
    this.min = min;
    this.sec = sec;
  }

  getDistance(): number {
    return new Date(
      new Date().getTime() + this.sec * 1000 + this.min * 1000 * 60 + this.hour * 1000 * 60 * 60
    ).getTime()
  }

  isFinsish(): boolean {
    return this.hour <= 0 && this.min <= 0 && this.sec <= 0;
  }
}
