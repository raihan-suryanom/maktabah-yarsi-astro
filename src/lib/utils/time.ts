export default class Time {
  private static readonly ONE_SECOND = 1000;
  private static readonly ONE_MINUTE = this.ONE_SECOND * 60;
  private static readonly ONE_HOUR = this.ONE_MINUTE * 60;
  private static readonly ONE_DAY = this.ONE_HOUR * 24;

  static seconds(value: number) {
    return this.ONE_SECOND * value;
  }

  static minutes(value: number, secondsValue: number = 0) {
    return this.ONE_MINUTE * value + this.seconds(secondsValue);
  }

  static hours(
    value: number,
    minutesValue: number = 0,
    secondsValue: number = 0,
  ) {
    return (
      this.ONE_HOUR * value +
      this.minutes(minutesValue) +
      this.seconds(secondsValue)
    );
  }

  static days(
    value: number,
    hoursValue: number = 0,
    minutesValue: number = 0,
    secondsValue: number = 0,
  ) {
    return (
      this.ONE_DAY * value +
      this.hours(hoursValue) +
      this.minutes(minutesValue) +
      this.seconds(secondsValue)
    );
  }
}
