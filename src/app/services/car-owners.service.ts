import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CarDBInterface, CarEntity, OwnerEntity } from '../models/owner.interface';

@Injectable({
  providedIn: 'root'
})
export class CarOwnersService {
  private readonly ownersUrl = 'api/owners'
  private readonly carsUrl = 'api/cars'

  constructor(private http: HttpClient) { }

  allOwners$ = this.http.get<OwnerEntity[]>(this.ownersUrl).pipe(
    map(data => data.filter(item => item.id > 0))
  );

  allCars$ = this.http.get<CarDBInterface[]>(this.carsUrl).pipe(
    map(data => data.filter(item => item.id > 0))
  );

  owner$ = (id?: number) => id ? this.http.get<OwnerEntity>(`${this.ownersUrl}/${id}`) : this.allOwners$.pipe(
    map(data => {
      return {
        firstName: '',
        lastName: '',
        patronymic: '',
        id: ++data.length,
        carsAmount: 0
      } as OwnerEntity
    })
  );

  ownerCars$ = (id?: number) => id ? this.http.get<CarDBInterface>(`${this.carsUrl}/${id}`).pipe(map(data => data.cars)) : of(this.createCarModel());

  deleteOwner$ = (id: number) => this.http.delete(`${this.ownersUrl}/${id}`);

  saveOwner$ = (owner: OwnerEntity) => this.http.post(`${this.ownersUrl}/${owner.id}`, owner);

  saveOwnerCars$ = (cars: CarDBInterface) => this.http.post(`${this.carsUrl}/${cars.id}`, cars);

  private createCarModel(): CarEntity[] {
    return [{
      id: 0,
      year: null,
      modelName: '',
      manufacturerName: '',
      carId: ''
    } as CarEntity]
  }
}
