import { Injectable } from "@angular/core";
import { DateAdapter } from "@angular/material/core";
import { DateRange, MatDateRangeSelectionStrategy } from "@angular/material/datepicker";

@Injectable()
export class WeekRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {

  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createWeekRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createWeekRange(activeDate);
  }

  private _createWeekRange(date: D | null): DateRange<D> {

    if (date) {

      const weekSize = 7;
      const firstDayOfWeek = this._dateAdapter.getFirstDayOfWeek();
      // console.log(weekSize, firstDayOfWeek);

      let start = date;
      let end = date;

      for (let i = weekSize; i > 0; i--) {
        // console.log(i, firstDayOfWeek, this._dateAdapter.getDayOfWeek(start));
        
        start = this._dateAdapter.addCalendarDays(start, -1);
        if (firstDayOfWeek === this._dateAdapter.getDayOfWeek(start)) { break; }
      }

      end = this._dateAdapter.addCalendarDays(start, (weekSize - 1));

      // console.log(start, end);
      return new DateRange<D>(start, end);
      
    }

    return new DateRange<D>(null, null);
  }
  
}
