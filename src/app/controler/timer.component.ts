import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common';

import { Observable, Subscription } from 'rxjs/Rx';

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
  private timeleft: Countdown;
  private started: boolean;
  private o: Observable<number>

  constructor(private http: Http, private location: Location) {
    this.o = Observable.timer(1000, 1000);
  }

  ngOnInit(): void {
    let accountService = new AccountService(this.http);
    let sleepService = new SleepService(this.http);


    accountService.isConnected().then(account=>{
      if (!account.IsConnected){
        window.location.href = 'http://localhost:8000/login'
        return;
      }

      sleepService.get().then(sleep => {
        if (sleep === null){
          console.log('hit');
          return;
        }
        this.sleep = sleep;
        this.startTimerFromSleep()
      });

    });
  }

  startTimerFromSleep(): void {
    this.timeleft = this.sleep.getCountDown();
    console.log(this.timeleft);
    this.o.subscribe(this.updateCountdown);
  }

  startTimerFromCountdown(): void {

  }

  updateCountdown(): void {
    this.timeleft.updateCountdown();
    console.log(this.timeleft);
  }
}
