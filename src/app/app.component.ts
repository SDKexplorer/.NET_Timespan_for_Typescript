import { Component } from '@angular/core';
import { Timespan } from '../models/Timespan';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'timespan-to-typescript';

  public timeValue: Timespan;

  constructor() {
    this.timeValue = new Timespan('0.24:24:24');
  }

}
