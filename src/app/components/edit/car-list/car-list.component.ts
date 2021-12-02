import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { FormControlNames } from 'src/app/models/control-name.model';
import { CarEntity } from 'src/app/models/owner.interface';
import { CarOwnersService } from 'src/app/services/car-owners.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarListComponent implements OnInit {
  @Input() carsData: CarEntity[];
  @Input() isEditPageState: boolean;

  controlNames = FormControlNames;
  carIdRegex = '[A-Z]{2}[0-9]{4}[A-Z]{2}';

  get form(): FormGroup {
    return this.parentForm.form;
  }

  get cars(): FormArray {
    return this.form.get(this.controlNames.cars) as FormArray;
  }

  constructor(private parentForm: FormGroupDirective, private fb: FormBuilder, private carOwnersService: CarOwnersService) { }

  ngOnInit(): void {
    this.form.addControl(this.controlNames.cars, this.fb.array(this.carsData.map(car => this.createCarForm(car))))
  }

  deleteCar(carIndex: number): void {
    if (this.cars.controls.length > 1) {
      this.cars.removeAt(carIndex)
    }
  }

  createCarForm(car?: CarEntity): FormGroup {
    const carForm = this.fb.group({
      [this.controlNames.year]: this.fb.control(car ? car.year : null, {
        validators: [Validators.required, Validators.min(1990), Validators.max(new Date().getFullYear())]
      }),
      [this.controlNames.modelName]: this.fb.control(car ? car.modelName : '', Validators.required),
      [this.controlNames.manufacturerName]: this.fb.control(car ? car.manufacturerName : '', Validators.required),
      [this.controlNames.carId]: this.fb.control(car ? car.carId : '', {
        validators: [Validators.required, Validators.pattern(this.carIdRegex)],
        asyncValidators: [this.uniqueCarIdAsyncValidator()]
      })
    })

    return carForm;
  }

  private uniqueCarIdAsyncValidator(): any {
    return (input: FormControl) => this.carOwnersService.allCars$.pipe(
      map(result => {
        // seems that this solution is not perfect :(
        const isOriginalValue = input.parent?.value.carId === input.value;
        const rawCarIds = result.map(id => id.cars.map(car => car.carId))
        return !isOriginalValue && JSON.stringify(rawCarIds).indexOf(input.value) > -1 ? { unique: false } : null
      })
    )
  }

  addCar(): void {
    this.cars.push(this.createCarForm())
  }
}
