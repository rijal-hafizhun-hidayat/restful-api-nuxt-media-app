export class DateUtils {
  static async addMinutes(date: Date, minutes: number) {
    const dateCopy = new Date(date);
    dateCopy.setMinutes(date.getMinutes() + minutes);

    return dateCopy;
  }
}
