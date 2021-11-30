import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FormControlNames } from 'src/app/models/control-name.model';
import { OwnerEntity } from 'src/app/models/owner.interface';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalInfoComponent implements OnInit {
  @Input() personalInfo: OwnerEntity;

  controlNames = FormControlNames;

  constructor(private parentForm: FormGroupDirective, private fb: FormBuilder) { }

  get form(): FormGroup {
    return this.parentForm.form;
  }

  ngOnInit(): void {
    this.form.addControl(this.controlNames.personalInfo, this.fb.group({
      [this.controlNames.firstName]: this.fb.control(this.personalInfo.firstName, Validators.required),
      [this.controlNames.lastName]: this.fb.control(this.personalInfo.lastName, Validators.required),
      [this.controlNames.patronymic]: this.fb.control(this.personalInfo.patronymic, Validators.required),
      [this.controlNames.id]: this.fb.control(this.personalInfo.id)
    }))
  }

}
