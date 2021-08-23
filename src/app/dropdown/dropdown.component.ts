import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { dropdownItems, MultiSelect } from './models';
import { FormBuilderService } from './services/form-builder.service';

type chipModel = {
  chip: string,
  isExpanded: boolean,
  isTrigger?: boolean
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

  public currentIndex: number = 1;
  public chipsMap = new Map();
  public currentInput: string = '';
  public triggerInput: string = '';
  public form!: FormGroup;
  public set: boolean = true;

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
    console.log(i);
    this.chips.forEach((element, index) => {
      if (index === i) {
        this.triggerInput = this.chips[i].chip;
        this.chips.splice(index, 1);
      }
    });

    this.chipsMap.forEach((key, val) => {
      // console.log('key, val: ', key, val);

      // this.chips = [...this.chips, {chip: val, isExpanded: false}];
    })

  }

  public saveChip() {
    console.log('saveChip')
    if (this.formControlsVals.chipFormControl.value) {
      this.currentInput = this.formControlsVals.chipFormControl.value;

      this.chipsMap.set(this.currentInput, { val: this.currentIndex });
      this.currentIndex++;

      // this.chipsMap.forEach((key, val) => {
      this.chips = [...this.chips, { chip: this.currentInput, isExpanded: false }];
      // })
    }

    this.currentInput = '';
    this.form.controls['chipFormControl'].patchValue('');
  }

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

  public readFromTriggersMulti(triggerItems: MultiSelect[]) {
    console.log('triggerItems input: ', triggerItems);
    let chipsVals: string[] = [];

    this.chips.map(chip => {
      chipsVals = [...chipsVals, chip.chip];
    });

    triggerItems
      // .filter(trigger => trigger.selected)
      .forEach(trigger => {
        // console.log('found trigger: ', trigger);
        if (chipsVals.includes(trigger.value) && !trigger.selected) {
          console.log('found trigger to delete: ', trigger.value);
          // this.deleteChip(chipsVals.indexOf(trigger.value));
          let triggerIndex = chipsVals.indexOf(trigger.value);
          this.chips.forEach((element, index) => {
            if (index === triggerIndex) {
              this.triggerInput = this.chips[triggerIndex].chip;
              this.chips.splice(index, 1);
            }
          });
        }

        if (!chipsVals.includes(trigger.value) && trigger.selected) {
          console.log('pushin')
          this.chips.push({
            chip: trigger.value,
            isExpanded: false,
            isTrigger: true
          })
        }
      });
  }
}
