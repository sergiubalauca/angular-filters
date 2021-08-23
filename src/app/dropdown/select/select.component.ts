import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectOptions } from '../models';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() public form!: FormGroup;
  @Input() public triggerChip!: string;
  @Output() public selectedTrigger: EventEmitter<string> = new EventEmitter();

  get f() { return this.form.controls; }

  public readonly selectTriggers: string[] = [SelectOptions.onSchedule, SelectOptions.onIgnition, SelectOptions.onError];
  public readonly selectDefaultValue = SelectOptions.default;
  public triggerRemovedByChip = false;

  constructor() { }

  public ngOnInit(): void {
    
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes: ', changes);

    this.selectTriggers.forEach((element, index) => {
      // console.log('element: ', element); 
      // console.log('the input: ', this.triggerChip);

      if (element === this.triggerChip) this.triggerRemovedByChip = true;
    });
  }

  public selectOption(): void {
    // console.log(this.f.selectFormControl.value);
    // console.log(this.f.chipFormControl.value);
    this.triggerRemovedByChip = false;
    this.selectedTrigger.emit(this.f.selectFormControl.value);
  }
}
