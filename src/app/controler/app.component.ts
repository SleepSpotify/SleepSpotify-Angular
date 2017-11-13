import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: '../vue/app.html',
  styleUrls: ['../css/all.css',
    '../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
  ]
})
export class AppComponent {
  title = 'Sleep Spotify';
}
