import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { RoutePath } from 'src/app/models/route-path.model';
import { CarOwnersService } from 'src/app/services/car-owners.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent {
  routePath = RoutePath;
  form: FormGroup;

  vm$ = this.route.params.pipe(
    switchMap(route => combineLatest([this.carOwnersService.owner$(route['id']), this.carOwnersService.ownerCars$(route['id'])]).pipe(
      map(([owner, cars]) => {
        return {
          personalInfo: owner,
          cars: cars,
          isEditPageState: route['term'] !== this.routePath.view
        }
      }),
      tap(() => {
        this.buildForm();
      }))))

  constructor(private carOwnersService: CarOwnersService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {

  }

  onSubmit(): void {
    console.log(this.form);
    combineLatest([this.carOwnersService.saveOwner$({ carsAmount: this.form.value.cars.length, ...this.form.value.personalInfo }),
    this.carOwnersService.saveOwnerCars$({ id: this.form.value.personalInfo.id, cars: this.form.value.cars })]).subscribe(() => {
      this.router.navigate(['/'])
    })
  }

  private buildForm(): void {
    this.form = this.fb.group({})
  }

}
