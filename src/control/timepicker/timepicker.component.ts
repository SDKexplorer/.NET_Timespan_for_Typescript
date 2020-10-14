
import {Component, Input} from "@angular/core";
import {Timespan} from '../../models/Timespan';

@Component({
  selector: 'timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.css']
})

export class TimepickerComponent {

  private readonly maxTimespanValue : Timespan = new Timespan("24:00:00");
  private readonly minTimespanValue : Timespan = new Timespan();

  @Input() time: Timespan;
  @Input() maxMinTimeFields: boolean = false;
  @Input() hiddenSeconds: boolean = false;
  @Input() hourStep: number = 1;
  @Input() minuteStep: number = 1;
  @Input() secondStep: number = 1;


  onHoursChanged(value: number) {
    this.time.addHours(-this.time.hours);
    this.time.addHours(value);
    this.checkMinMaxInterval();
  }

  onMinutesChanged(value: number){
    this.time.addMinutes(-this.time.minutes);
    this.time.addMinutes(value);
    this.checkMinMaxInterval();
  }

  onSecondsChanged(value: number){
    this.time.addSeconds(-this.time.seconds);
    this.time.addSeconds(value);
    this.checkMinMaxInterval();
  }

  onHourStepIncrement() {
    this.time.addHours(this.hourStep);
    this.checkMinMaxInterval();
  }

  onHourStepDecrement() {
    this.time.addHours(-this.hourStep);
    this.checkMinMaxInterval();
  }

  onMinuteStepIncrement() {
    this.time.addMinutes(this.minuteStep);
    this.checkMinMaxInterval();
  }

  onMinuteStepDecrement() {
    this.time.addMinutes(-this.minuteStep);
    this.checkMinMaxInterval();
  }

  onSecondStepIncrement() {
    this.time.addSeconds(this.secondStep);
    this.checkMinMaxInterval();
  }

  onSecondStepDecrement() {
    this.time.addSeconds(-this.secondStep);
    this.checkMinMaxInterval();
  }

  private checkMinMaxInterval() {
    var max = this.maxTimespanValue.totalSeconds;
    var min = this.minTimespanValue.totalSeconds;
    var value = this.time.totalSeconds;
    if(value > max) {
      var newValue = value - max;
      this.time.addSeconds(-this.time.totalSeconds);
      this.time.addSeconds(newValue);
      return;
    }
    if(value < min) {
      var newValue = max + value;
      this.time.addSeconds(-this.time.totalSeconds);
      this.time.addSeconds(newValue);
      return;
    }
  }
}
