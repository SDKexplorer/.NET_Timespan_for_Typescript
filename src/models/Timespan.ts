import {DateTimeConverter} from '../converter/DateTimeConverter';

export class Timespan {

  private readonly hourMinutesAndSecondSplitChar: string = ':';
  private readonly daysSplitChar: string = '.';
  private readonly negativeValueChar: string = '-';

  private _totalTimeInSeconds: number = 0;

  private _days: number = 0;
  private _hours: number = 0;
  private _minutes: number = 0;
  private _seconds: number = 0;

  get days() {
    var timeValue = this._days;
    return timeValue;
  }
  get hours(): string {
    var timeValue = this._hours;
    return DateTimeConverter.numberToTimeDecimal(timeValue);
  }
  get minutes(): string {
    var timeValue = this._minutes;
    return DateTimeConverter.numberToTimeDecimal(timeValue);
  }
  get seconds(): string {
    var timeValue = this._seconds;
    return DateTimeConverter.numberToTimeDecimal(timeValue);
  }

  constructor(timespanStringValue: any = null) {
    if(timespanStringValue) {
      this.initTimespanFromString(timespanStringValue.toString());
    }
  }

  public toString(): string {
    var nChar = this.negativeValueChar;
    var smhChar = this.hourMinutesAndSecondSplitChar;
    var dChar = this.daysSplitChar;

    var days = DateTimeConverter.numberNegativeToPositive(this.days);
    var ifHasDaysValue = days ? days + dChar : new String();
    var ifNegativeValue = this._totalTimeInSeconds < 0 ? nChar : new String();
    return `${ifNegativeValue}${ifHasDaysValue}${this.hours}${smhChar}${this.minutes}${smhChar}${this.seconds}`;
  }

  private initTimespanFromString(timespanStringValue: string) { // Expected value D.HH:MM:SS or HH:MM:SS

    var timeValues = timespanStringValue.split(this.hourMinutesAndSecondSplitChar);

    if(timeValues.length != 3) {
      return;
    }

    var secondsStringValue = +timeValues[2];
    var minutesStringValue = +timeValues[1];

    var hourDays = timeValues[0].split(this.daysSplitChar);

    if(hourDays.length == 2) {
      var hoursStringValue = +hourDays[1];
      var daysStringValue = +hourDays[0];
    }
    else {
      var hoursStringValue = +hourDays[0];
    }

    this.addSeconds(secondsStringValue || 0);
    this.addMinutes(minutesStringValue || 0);
    this.addHours(hoursStringValue || 0);
    this.addDays(daysStringValue || 0);
  }

  private _totalSecondsToIntData() {

    var totalTimeInSeconds = this._totalTimeInSeconds;
    var moduloSeconds = totalTimeInSeconds % DateTimeConverter.secondsInOneMinute;

    var totalTimeInMinutes = (totalTimeInSeconds - moduloSeconds) / DateTimeConverter.secondsInOneMinute;
    var moduloMinutes = totalTimeInMinutes % DateTimeConverter.minutesInOneHour;

    var totalTimeInHours = (totalTimeInMinutes - moduloMinutes) / DateTimeConverter.minutesInOneHour;
    var moduloHours = totalTimeInHours % DateTimeConverter.hoursInOneDay;

    var totalTimeInDays = (totalTimeInHours - moduloHours) / DateTimeConverter.hoursInOneDay;

    this._seconds = moduloSeconds;
    this._minutes = moduloMinutes;
    this._hours = moduloHours;
    this._days = totalTimeInDays;

  }

  addSeconds(seconds: number) {
    this._totalTimeInSeconds += seconds;
    this._totalSecondsToIntData();
  }

  addMinutes(minutes: number) {
    this._totalTimeInSeconds += DateTimeConverter.minutesToSeconds(minutes);
    this._totalSecondsToIntData();
  }

  addHours(hours: number) {
    this._totalTimeInSeconds += DateTimeConverter.hoursToSeconds(hours);
    this._totalSecondsToIntData();
  }

  addDays(days: number) {
    this._totalTimeInSeconds += DateTimeConverter.daysToSeconds(days);
    this._totalSecondsToIntData();
  }

}
