import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimpleTimer } from 'ng2-simple-timer';

import { RootComponent } from './controler/root.component';
import { AppComponent } from './controler/app.component';
import { MenuComponent } from './controler/menu.component';
import { TimerComponent } from './controler/timer.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    MenuComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    SimpleTimer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
