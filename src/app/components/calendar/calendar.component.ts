import { Component, OnInit } from '@angular/core';

import { DateTime, Info } from 'luxon';

import { CalendarDay } from 'src/app/classes/calendar-day';
import { Item } from 'src/app/classes/item';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  selectedViewValue!: string;
  selectedDate!: DateTime | null;

  filterDrawerOpened!: boolean;

  views: Item[] = [
    { value: 'd', viewValue: 'Day' },
    { value: 'w', viewValue: 'Week' },
    { value: 'm', viewValue: 'Month' },
  ];

  public calendar: Array<CalendarDay> = [];
  public dayOfWeekNames: Array<string> = [];
  public dateToDisplayMonth!: DateTime;
  private monthIndex = 0;

  constructor(
  ) {
    this.filterDrawerOpened = true;
    this.selectedDate = DateTime.local();
    this.selectedViewValue = 'w';
    this.dayOfWeekNames = Info.weekdays('long');
  }

  ngOnInit(): void {
    this.generateCalendarDays(this.monthIndex);
  }

  private generateCalendarDays(monthIndex: number): void {
    // we reset our calendar
    this.calendar = [];

    // we set the date
    let day: DateTime = DateTime.now();

    // console.log(monthIndex);
    
    if (monthIndex > 0) { day = day.plus({ month: monthIndex }); }
    if (monthIndex < 0) { day = day.minus({ month: monthIndex }); }

    // console.log(day.toISO());

    // set the dispaly month for UI
    this.dateToDisplayMonth = day;

    const startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;

    const totalDays = this.dayOfWeekNames.length * (4 + 2)

    for (let i = 0; i < totalDays; i++) {
      this.calendar.push(new CalendarDay(dateToAdd));
      dateToAdd = dateToAdd.plus({ day: 1 });
    }
  }

  get selectViewViewValue(): string {
    const v = this.views.find(v => v.value === this.selectedViewValue);
    return v ? v.viewValue : '';
  }

  selectViewValue(value: string | number) {
    this.selectedViewValue = (typeof value === 'string' ? value : '');
  }

  getViewValue(value: string | number) {
    return (typeof value === 'string' ? value : '');
  }

  private getStartDateForCalendar(selectedDate: DateTime){
    // for the day we selected let's get the previous month last day
    const lastDayOfPreviousMonth = selectedDate.minus({ month: 1 }).endOf('month');
    // console.log('lastDayOfPreviousMonth', lastDayOfPreviousMonth.toISO());

    // start by setting the starting date of the calendar same as the last day of previous month
    let startingDateOfCalendar: DateTime = lastDayOfPreviousMonth;

    // but since we actually want to find the last Monday of previous month
    // we will start going back in days intil we encounter our last Monday of previous month
    if (startingDateOfCalendar.weekday !== 1) {
      do {
        startingDateOfCalendar = startingDateOfCalendar.minus({ day: 1});
      } while (startingDateOfCalendar.weekday !== 1);
    }

    return startingDateOfCalendar;
  }

   public increaseMonth() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
  }

  public decreaseMonth() {
    this.monthIndex--
    this.generateCalendarDays(this.monthIndex);
  }

  public setCurrentMonth() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }

}
