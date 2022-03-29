import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateTime } from 'luxon';
import { CalendarDay } from 'src/app/classes/calendar-day';

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeekViewComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('getTop') topElement!: ElementRef<HTMLDivElement>;

  @Input() calendar: Array<CalendarDay> = [];
  @Input() selectedDay!: DateTime | null;

  @Output() readonly selectedDayChange: EventEmitter<DateTime | null> = new EventEmitter<DateTime | null>();

  calendarWeek: Array<CalendarDay> = [];

  innerHeight = 0;
  topOffset = 0;
  contentSize = 0;
  weekHeight = 0;

  constructor() { }

  ngOnInit(): void {
    this.getCalendarWeekDaysOnly();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDay']) {
      console.log('week-view ngOnChanges', changes['selectedDay']);
      this.getCalendarWeekDaysOnly();
    }
  }
  
  ngAfterViewInit(): void {
    this.calcWeekHeight();
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

  getCalendarWeekDaysOnly() {
    if (this.calendar.length > 0) {
      this.calendarWeek = this.calendar.filter((cd: CalendarDay) => cd.date.weekNumber === this.selectedDay?.weekNumber);
    } else {
      this.calendarWeek = [];
    }
  }

  changeDate(date: DateTime) {
    this.selectedDayChange.emit(date);
  }

}
