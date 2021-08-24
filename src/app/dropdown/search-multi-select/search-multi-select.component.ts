import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MultiSelect, SelectOptions } from '../models';

@Component({
  selector: 'app-search-multi-select',
  templateUrl: './search-multi-select.component.html',
  styleUrls: ['./search-multi-select.component.scss']
})
export class SearchMultiSelectComponent implements OnChanges, AfterViewInit {
  @Input() public form!: FormGroup;
  @Input() public triggerChip!: string;
  @Output() public selectedTrigger: EventEmitter<MultiSelect[]> = new EventEmitter();
  @ViewChild("checkboxContainer", { static: false }) public checkboxContainer!: ElementRef;

  public options: MultiSelect[] = [
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

  public constructor(private renderer: Renderer2) { }

  ngOnChanges(): void {
    /* listen for changes in the chips container, to check/uncheck filters in the dropdown */
    this.options.filter(opts => opts.value === this.triggerChip).map(opts => {
      opts.selected = false;
      this.allOption.selected = false;
    });
  }

  public ngAfterViewInit() {
  }

  public expandContainer(): void {
    if (!this.expanded) {
      this.renderer.setStyle(this.checkboxContainer.nativeElement, 'display', 'block');
      this.expanded = true;
    } else {
      this.renderer.setStyle(this.checkboxContainer.nativeElement, 'display', 'none');
      this.expanded = false;
    }
  }

  public filterOptions(): void {
    this.filteredOptions = this.options.filter((item: any) => {
      return item.value.toLowerCase().startsWith(this.formControlsVals.multiSelectInputFormControl.value.toLowerCase());
    });

    if (this.formControlsVals.multiSelectInputFormControl.value !== '') {
      this.options = this.filteredOptions;
    }
    else {
      /* reset state - can be improved */
      this.options = [
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
    /* set the state for the options and send it to the chips component */
    if (event.value === SelectOptions.all) {
      this.options.forEach(opts =>
        event.selected === true ? opts.selected = true : opts.selected = false
      );
    }

    this.selectedTrigger.emit(this.options);
  }
}
