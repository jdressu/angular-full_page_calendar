import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ComponentType } from '@angular/cdk/portal';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { DateTime } from 'luxon';
import { DateSelectionCustomHeaderComponent } from './custom-header/custom-header.component';

@Component({
  selector: 'app-date-selection',
  templateUrl: './date-selection.component.html',
  styleUrls: ['./date-selection.component.scss']
})
export class DateSelectionComponent {
  
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

  @Input()
  get weekPreview(): boolean {
    return this._weekPreview;
  }
  set weekPreview(value: BooleanInput) {
    this._weekPreview = coerceBooleanProperty(value);
  }
  private _weekPreview: boolean = false;
  
  @Output() readonly selectedChange: EventEmitter<DateTime | null> = new EventEmitter<DateTime | null>();

  get selectedDateFilterHeader(): ComponentType<any> {
    if (!this.customHeader) {
      return this._selectedDateFilterHeader2;
    }
    return this._selectedDateFilterHeader;
  }
  set selectedDateFilterHeader(value: ComponentType<any>) {
    this._selectedDateFilterHeader = value;
  }
  private _selectedDateFilterHeader2!: ComponentType<any>;
  private _selectedDateFilterHeader: ComponentType<any> = DateSelectionCustomHeaderComponent;

  _selectedRange: DateRange<DateTime | null> = new DateRange(null, null);

  selectedChanged(selected: DateTime | null) {
    console.log(selected);
    if (selected) {
      this._selected = selected;
      this.selectedChange.emit(this._selected);
      this._selectedRange = new DateRange(selected, selected);
    } else {
      this._selected = null;
      this.selectedChange.emit(this._selected);
      this._selectedRange = new DateRange(null, null);
    }
  }

}
