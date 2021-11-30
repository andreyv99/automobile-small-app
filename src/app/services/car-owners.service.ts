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

  allOwners$ = this.http.get<OwnerEntity[]>(this.ownersUrl);

  allCars$ = this.http.get<CarEntity[]>(this.carsUrl);

  owner$ = (id?: number) => id ? this.http.get<OwnerEntity>(`${this.ownersUrl}/${id}`) : of(this.createOwnerModel());

  ownerCars$ = (id?: number) => id ? this.http.get<CarDBInterface>(`${this.carsUrl}/${id}`).pipe(map(data => data.cars)) : of(this.createCarModel());

  deleteOwner$ = (id: number) => this.http.delete(`${this.ownersUrl}/${id}`);

  saveOwner$ = (owner: OwnerEntity) => {
    return this.http.put(`${this.ownersUrl}/${owner.id}`, owner)
  };

  saveOwnerCars$ = (cars: CarDBInterface) => this.http.put(`${this.carsUrl}/${cars.id}`, cars);

  private createCarModel(): CarEntity[] {
    return [{
      id: 0,
      year: null,
      modelName: '',
      manufacturerName: '',
      carId: ''
    } as CarEntity]
  }

  private createOwnerModel(): OwnerEntity {
    return {
      firstName: '',
      lastName: '',
      patronymic: '',
      id: 0,
      carsAmount: 0
    } as OwnerEntity
  }

}
