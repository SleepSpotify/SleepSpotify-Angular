import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Location, NgSwitch } from '@angular/common';

import { SimpleTimer } from 'ng2-simple-timer';

import { SleepService } from '../service/sleep.service';
import { AccountService } from '../service/account.service'
import { Sleep } from '../model/sleep'
import { Countdown } from '../model/countdown'

@Component({
  selector: 'sleep-root',
  templateUrl: '../vue/timer.html',
  styleUrls: ['../css/all.css',
    '../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
  ]
})
export class TimerComponent implements OnInit {
  private sleep: Sleep;
  private timerID: string;
  private sleepService: SleepService;
  timeleft: Countdown;
  state = 0;

  constructor(
    private http: Http,
    private location: Location,
    private st: SimpleTimer
  ) { }

  ngOnInit(): void {
    let accountService = new AccountService(this.http);
    this.sleepService = new SleepService(this.http);

    accountService.isConnected().then(account => {
      if (!account.IsConnected) {
        window.location.href = 'http://localhost:8000/login'
        return;
      }

      this.st.newTimer('countdown', 1);

      this.sleepService.get().then(sleep => {
        if (sleep === null) {
          this.state = 1;
          this.sleep = null;
          this.timeleft = new Countdown(0, 0, 0)
          return;
        }
        this.sleep = sleep;
        this.timeleft = this.sleep.getCountDown();
        this.timerID = this.st.subscribe('countdown', () => this.updateCountdown());
        this.state = 2;
      });
    }).catch(e =>
      alert(e)
      );
  }

  updateCountdown(): void {
    this.timeleft = this.sleep.getCountDown()
    if (this.timeleft.isFinsish()) {
      this.state = 4;
      this.st.unsubscribe(this.timerID);
      this.timeleft = new Countdown(0, 0, 0);
    }
  }

  countdownPause(): void {
    // DELETE SLEEP
    this.sleepService.delete().then(message => {
      this.st.unsubscribe(this.timerID);
      this.state = 3;
    }).catch(message => {
      alert(message);
    });
  }

  countdownReset(): void {
    //DELETE SLEEP
    if (this.timeleft.isFinsish()) {
      this.state = 1;
      return
    }
    this.sleepService.delete().then(message => {
      this.st.unsubscribe(this.timerID)
      this.sleep = null;
      this.timeleft = new Countdown(0, 0, 0);
      this.state = 1;
    })
  }

  countdownStart(): void {
    // POST SLEEP

    this.sleepService.post(this.timeleft.getDistance()).then(sleep => {
      this.sleep = sleep;
      this.timeleft = this.sleep.getCountDown();
      this.timerID = this.st.subscribe('countdown', () => this.updateCountdown());
      this.state = 2
    });
  }

  countdownResume(): void {
    //POST SLEEP
    this.sleepService.post(this.timeleft.getDistance()).then(sleep => {
      this.sleep = sleep;
      this.timeleft = this.sleep.getCountDown();
      this.timerID = this.st.subscribe('countdown', () => this.updateCountdown());
      this.state = 2
    });
  }
}
