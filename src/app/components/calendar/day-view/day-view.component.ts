import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input,
  OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateTime } from 'luxon';
import { CalendarDay } from 'src/app/classes/calendar-day';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DayViewComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('getTop') topElement!: ElementRef<HTMLDivElement>;

  @Input() calendar: Array<CalendarDay> = [];
  @Input() selectedDay!: DateTime | null;

  @Output() readonly selectedDayChange: EventEmitter<DateTime | null> = new EventEmitter<DateTime | null>();

  calendarDay!: CalendarDay | null;

  innerHeight = 0;
  topOffset = 0;
  contentSize = 0;
  weekHeight = 0;

  ngOnInit(): void {
    this.getCalendarDayOnly();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDay']) {
      console.log('week-view ngOnChanges', changes['selectedDay']);
      this.getCalendarDayOnly();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.calcWeekHeight(), 200);
  }

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.calcWeekHeight();
  }
  
  private calcTopOffset(): number {
    try {
      const rect = this.topElement.nativeElement.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      return rect.top + scrollTop;
    } catch (e) {
      return 0;
    }
  }

  private calcWeekHeight(): void {
    this.innerHeight = window.innerHeight;
    this.topOffset = this.calcTopOffset();
    this.contentSize = innerHeight - this.topOffset;
    this.weekHeight = this.contentSize / 6;
    this.weekHeight -= 1;
  }

  getCalendarDayOnly() {
    if (this.calendar.length > 0) {
      this.calendarDay = this.calendar.find((cd: CalendarDay) => cd.date.weekNumber === this.selectedDay?.weekNumber) ?? null;
    } else {
      this.calendarDay = null;
    }
  }

  changeDate(date: DateTime) {
    this.selectedDayChange.emit(date);
  }

}
