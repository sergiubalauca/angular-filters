import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class FormBuilderService {
	public constructor() { }

	public buildFormGroup$(formControls: any[]): FormGroup {
		const group: { [key: string]: AbstractControl } = {};

		formControls.forEach((formControl) => {
			group[formControl.key] = new FormControl(formControl.value || '');
		});

		return new FormGroup(group);
	}
}
