import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ChunkCalendarDaysPipe } from './pipes/chunk-calendar-days.pipe';
import { DateSelectionComponent } from './components/calendar/date-selection/date-selection.component';
import { DayViewComponent } from './components/calendar/day-view/day-view.component';
import { MonthViewComponent } from './components/calendar/month-view/month-view.component';
import { WeekViewComponent } from './components/calendar/week-view/week-view.component';
import { DateSelectionCustomHeaderComponent } from './components/calendar/date-selection/custom-header/custom-header.component';
import { WeekPreviewComponent } from './components/calendar/date-selection/week-preview/week-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ChunkCalendarDaysPipe,
    DateSelectionComponent,
    DayViewComponent,
    MonthViewComponent,
    WeekViewComponent,
    DateSelectionCustomHeaderComponent,
    WeekPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
