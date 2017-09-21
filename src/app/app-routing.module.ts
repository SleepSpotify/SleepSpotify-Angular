import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RootComponent }   from './controler/root.component';
import { TimerComponent } from './controler/timer.component';

const routes: Routes = [
  { path: '',  component: RootComponent },
  { path: 'timer', component: TimerComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
