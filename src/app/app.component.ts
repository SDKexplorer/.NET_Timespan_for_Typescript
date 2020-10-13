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
    this.timeValue = new Timespan('0.29:30:00');
  }

  onSecondsAdded(value: number) {
    this.timeValue.addSeconds(value);
  }

  onMinutesAdded(value: number) {
    this.timeValue.addMinutes(value);
  }

  onHoursAdded(value: number) {
    this.timeValue.addHours(value);
  }

  onDaysAdded(value: number) {
    this.timeValue.addDays(value);
  }

}
