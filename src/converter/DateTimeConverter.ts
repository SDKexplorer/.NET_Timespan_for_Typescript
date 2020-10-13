export class DateTimeConverter {

  public static readonly secondsInOneMinute = 60;
  public static readonly minutesInOneHour = 60;
  public static readonly hoursInOneDay = 24;


  public static minutesToSeconds(minutes: number): number {
    return minutes * this.secondsInOneMinute;
  }

  public static hoursToMinutes(hours: number): number {
    return hours * this.minutesInOneHour;
  }

  public static hoursToSeconds(hours: number): number {
    var minutes = this.hoursToMinutes(hours);
    return this.minutesToSeconds(minutes);
  }

  public static daysToHours(days: number): number {
    return days * this.hoursInOneDay;
  }

  public static daysToSeconds(days: number): number {
    const hours = this.daysToHours(days);
    return this.hoursToSeconds(hours);
  }

  public static numberToTimeDecimal(value: number): string {
    const isSingleDecimal = value > -10 && value < 10;
    value = this.numberNegativeToPositive(value);
    return isSingleDecimal ? '0' + value : value.toString();
  }

  public static numberNegativeToPositive(value: number): number {
    if (value < 0) {
      value *= -1;
    }
    return value;
  }
}
