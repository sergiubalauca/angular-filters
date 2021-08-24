import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectOptions } from '../models';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnChanges {
  @Input() public form!: FormGroup;
  @Input() public triggerChip!: string;
  @Output() public selectedTrigger: EventEmitter<string> = new EventEmitter();

  get formVals() { return this.form.controls; }

  public readonly selectTriggers: string[] = [
    SelectOptions.onSchedule,
    SelectOptions.onIgnition,
    SelectOptions.onError];

  public readonly selectDefaultValue = SelectOptions.default;

  public triggerRemovedByChip = false;

  constructor() { }

  public ngOnChanges(): void {
    this.selectTriggers.forEach((element, index) => {
      if (element === this.triggerChip) this.triggerRemovedByChip = true;
    });
  }

  public selectOption(): void {
    this.triggerRemovedByChip = false;
    /* send filter to the chips container */
    this.selectedTrigger.emit(this.formVals.selectFormControl.value);
  }
}
