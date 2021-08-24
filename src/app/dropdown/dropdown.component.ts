import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { dropdownItems, MultiSelect } from './models';
import { FormBuilderService } from './services/form-builder.service';

type chipModel = {
  chip: string,
  isExpanded: boolean,
  isTrigger?: boolean,
  selected?: boolean
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})

export class DropdownComponent implements OnInit {
  public chips: chipModel[] = [
    { chip: 'CV Pro CV', isExpanded: false },
    { chip: 'CV Pro AI', isExpanded: false },
    { chip: 'ELV 2', isExpanded: false }];

  public currentIndex = 1;
  public chipsMap = new Map();
  public currentInput = '';
  public triggerInput = '';
  public form!: FormGroup;
  public set = true;
  public chipsVals: string[] = [];

  get formControlsVals() { return this.form.controls; }

  public readonly formControls = [{
    key: 'chipFormControl',
    value: ''
  },
  {
    key: 'selectFormControl',
    value: ''
  },
  {
    key: 'multiSelectInputFormControl',
    value: ''
  },
  {
    key: 'multiSelectFormControl',
    value: ''
  }
  ];

  public constructor(private formBuilderService: FormBuilderService) { }

  public ngOnInit(): void {
    this.form = this.formBuilderService.buildFormGroup$(this.formControls);
  }

  public deleteChip(i: number) {
    this.chips.forEach((element, index) => {
      if (index === i) {
        this.triggerInput = this.chips[i].chip;
        this.chips.splice(index, 1);
      }
    });
  }

  /* manually add chip filters via the input */
  public saveChip() {
    if (this.formControlsVals.chipFormControl.value) {
      this.currentInput = this.formControlsVals.chipFormControl.value;

      this.chipsMap.set(this.currentInput, { val: this.currentIndex });
      this.currentIndex++;

      this.chips = [...this.chips, { chip: this.currentInput, isExpanded: false }];
    }

    this.currentInput = '';
    this.form.controls['chipFormControl'].patchValue('');
  }

  /* get filters from the simple dropdown component */
  public readFromTriggers(trigger: string) {
    let chipsVals: string[] = [];

    this.chips.map(chip => {
      chipsVals = [...chipsVals, chip.chip];
    });

    const found = chipsVals.some(chip => dropdownItems.includes(chip));

    if (!found) {
      this.chips.push({
        chip: trigger,
        isExpanded: false,
        isTrigger: true
      })
    }

    const triggerIndex = this.chips.findIndex(chip => dropdownItems.find(item => item === chip.chip));

    if (triggerIndex > -1) {
      this.chips[triggerIndex].chip = trigger;
    }
  }

  /* get filters from the multiselect dropdown */
  public readFromTriggersMulti(triggerItems: MultiSelect[]) {
    this.chipsVals = [];

    this.chips.map(chip => {
      this.chipsVals = [...this.chipsVals, chip.chip];
    });

    triggerItems
      .forEach(trigger => {
        if (this.chips.map(chips => chips.chip === trigger.value) && !trigger.selected) {
          /* sync chip filters with the multiselect dropdown - partially working (all options needs improvements) */
          let triggerIndex = this.chipsVals.indexOf(trigger.value);
          this.chips.forEach((element, index) => {
            if (index === triggerIndex) {
              this.triggerInput = this.chips[triggerIndex].chip;
              this.chips.splice(index, 1);
            }
          });
        }

        if (!this.chipsVals.includes(trigger.value) && trigger.selected) {
          this.chips.push({
            chip: trigger.value,
            isExpanded: false,
            isTrigger: true,
            selected: trigger.selected
          });
        }
      });
  }

  public getFilters() {
    console.log(this.form.value);
  }
}
