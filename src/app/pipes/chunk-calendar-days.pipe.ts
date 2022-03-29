import { Pipe, PipeTransform } from '@angular/core';

import { CalendarDay } from '../classes/calendar-day';

@Pipe({
  name: 'chunkCalendarDays'
})
export class ChunkCalendarDaysPipe implements PipeTransform {

  transform(calendarDaysArray: Array<CalendarDay>, chunkSize: number): any {

    const calendarDays: Array<Array<CalendarDay>> = [];
    const weekDays: Array<CalendarDay> = [];

    for (let index = 0; index < calendarDaysArray.length; index++) {

      const day: CalendarDay = calendarDaysArray[index];

      weekDays.push(day);

      if ((index+1) % chunkSize === 0) { calendarDays.push(weekDays.splice(0)); }

    }

    return calendarDays as any;

  }

}
