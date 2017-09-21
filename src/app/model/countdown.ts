export class Countdown {

  distance: number;

  hour: number;
  min: number;
  sec: number;

  constructor(distance: number) {
    this.distance = distance + 1000;
  }

  getDate(): Date {
    return new Date(new Date().getTime() + this.distance);
  }

  updateCountdown(): void {

        this.distance -= 1000;

        this.hour = Math.floor(this.distance / (1000 * 60 * 60));
        this.min = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
        this.sec = Math.floor((this.distance % (1000 * 60)) / 1000);
  }
}
