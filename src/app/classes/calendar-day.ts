import { DateTime } from "luxon";

import { CalendarEvent } from "./calendar-event";

export class CalendarDay {

  public date: DateTime;
  public today: DateTime;
  public title!: string;
  public isPastDate: boolean;
  public isToday: boolean;

  public events!: Array<CalendarEvent>;

  constructor(d: DateTime) {

    this.date = d.set({ hour: 0, minute: 0, second: 0, millisecond: 0});
    this.today = DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0});
    // console.log('Day:', d.day);
    // console.log('D', d.set({ hour: 0, minute: 0, second: 0, millisecond: 0}));
    // console.log('N', this.today);

    this.isPastDate = this.date < this.today;
    this.isToday = this.date.equals(this.today);
    
  }

  public getDateString() {
    return this.date.toISODate();
  }

}
