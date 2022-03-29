import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ComponentType } from '@angular/cdk/portal';
import { DateRange, MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { DateTime } from 'luxon';

import { WeekRangeSelectionStrategy } from '../week-range-selection-strategy';

@Component({
  selector: 'app-date-selection-week-preview',
  templateUrl: './week-preview.component.html',
  styleUrls: ['./week-preview.component.scss'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: WeekRangeSelectionStrategy,
    },
  ],
})
export class WeekPreviewComponent {

  @Input()
  get selected(): DateTime | null {
    return this._selected;
  }
  set selected(value: DateTime | null) {
    this._selected = value;
    this._selectedRange = new DateRange(this._selected, this._selected);
  }
  private _selected!: DateTime | null;

  @Input()
  get customHeader(): boolean {
    return this._customHeader;
  }
  set customHeader(value: BooleanInput) {
    this._customHeader = coerceBooleanProperty(value);
  }
  private _customHeader: boolean = false;
  
  @Input() headerComponent!: ComponentType<any>;

  @Output() readonly selectedChange: EventEmitter<DateTime | null> = new EventEmitter<DateTime | null>();

  _selectedRange: DateRange<DateTime | null> = new DateRange(null, null);

  selectedChanged(selected: DateTime | null) {
    if (selected) {
      this._selected = selected;
      this.selectedChange.emit(this._selected);
      this._selectedRange = new DateRange(selected, selected);
    } else {
      this._selected = null;
      this.selectedChange.emit(this._selected);
      this._selectedRange = new DateRange(null, null);
    }
    
    // console.log('selectedChanged - selected', selected);
    // console.log('selectedChanged - this._selected', this._selected);
    // console.log('selectedChanged - this._selectedRange', this._selectedRange);
  }

}
