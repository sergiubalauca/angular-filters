import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MultiSelect, SelectOptions } from '../models';

@Component({
  selector: 'app-search-multi-select',
  templateUrl: './search-multi-select.component.html',
  styleUrls: ['./search-multi-select.component.scss']
})
export class SearchMultiSelectComponent implements OnInit, OnChanges {
  @Input() public form!: FormGroup;
  @Input() public triggerChip!: string;
  @Output() public selectedTrigger: EventEmitter<MultiSelect[]> = new EventEmitter();
  @ViewChild('checkbox') public checkbox!: ElementRef;

  public options: MultiSelect[] = [
    // { value: SelectOptions.all, selected: false },
    { value: SelectOptions.p0010, selected: false },
    { value: SelectOptions.p0011, selected: false },
    { value: SelectOptions.p0012, selected: false },
    { value: SelectOptions.p0013, selected: false },
    { value: SelectOptions.p0014, selected: false },
    { value: SelectOptions.p0015, selected: false },
    { value: SelectOptions.p0016, selected: false },
    { value: SelectOptions.p0017, selected: false },
    { value: SelectOptions.p0018, selected: false },
  ];


  public allOption: MultiSelect = {
    value: SelectOptions.all,
    selected: false
  };

  public selectedUser: any;
  public filteredOptions: any;
  public expanded = false;
  public multiSelectOptions: any[] = [];
  get formControlsVals() { return this.form.controls; }

  public constructor() { }

  public ngOnInit(): void {
    // console.log('triggerChip: ', this.triggerChip);
  }

  ngOnChanges() {
    console.log('triggerChip: ', this.triggerChip);
    this.options.filter(opts => opts.value === this.triggerChip).map(opts => {
      opts.selected = false;
      this.allOption.selected = false;
    });
  }

  public showCheckboxes() {
    let checkboxes = document.getElementById("checkboxes");

    if (checkboxes) {
      if (!this.expanded) {
        checkboxes.style.display = "block";
        this.expanded = true;
      } else {
        checkboxes.style.display = "none";
        this.expanded = false;
      }
    }
  }

  public filterUsers(): void {
    this.filteredOptions = this.options.filter((item: any) => {
      return item.value.toLowerCase().startsWith(this.formControlsVals.multiSelectInputFormControl.value.toLowerCase());
    });
    console.log(this.filteredOptions);

    if (this.formControlsVals.multiSelectInputFormControl.value !== '') {
      this.options = this.filteredOptions;
    }
    else {
      this.options = [
        // { value: SelectOptions.all, selected: false },
        { value: SelectOptions.p0010, selected: false },
        { value: SelectOptions.p0011, selected: false },
        { value: SelectOptions.p0012, selected: false },
        { value: SelectOptions.p0013, selected: false },
        { value: SelectOptions.p0014, selected: false },
        { value: SelectOptions.p0015, selected: false },
        { value: SelectOptions.p0016, selected: false },
        { value: SelectOptions.p0017, selected: false },
        { value: SelectOptions.p0018, selected: false },
      ];
    }
  }

  public selectOption(event: any): void {
    event.selected = !event.selected;

    // if (event.value === SelectOptions.all) {
    //   console.log('AAALL!');
    //   this.options.forEach(opts => opts.selected = true);
    // }
    if (event.value === SelectOptions.all) {
      this.options.forEach(opts =>
        event.selected ? opts.selected = true : opts.selected = false
      );
      console.log('All option: ', this.allOption)
      // this.selectedTrigger.emit([this.allOption]);
    }
    // else
      // console.log(this.options.filter(opts => opts.selected));
      this.selectedTrigger.emit(this.options);
  }
}
