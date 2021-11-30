export interface OwnerEntity {
  firstName: string,
  lastName: string,
  patronymic: string,
  id: number,
  carsAmount: number
}

export interface CarDBInterface {
  id: number,
  cars: CarEntity[]
}

export interface CarEntity {
  year: number | null,
  modelName: string,
  manufacturerName: string,
  carId: string,
  id: number
}
