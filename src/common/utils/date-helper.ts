class DateHelper {
  static addMinute(minutes: number, date: Date = new Date()) {
    const createdDate = new Date(date);
    createdDate.setMinutes(createdDate.getMinutes() + minutes);

    return createdDate;
  }
}

export default DateHelper;
