import { InMemoryDbService } from 'angular-in-memory-web-api';

import { OwnerEntity } from '../models/owner.interface';

export class AppDataService implements InMemoryDbService {

  createDb(): { owners: OwnerEntity[], cars: any[] } {
    const owners = [
      { id: 0, firstName: '', lastName: '', patronymic: '', carsAmount: 0 },
      { id: 1, firstName: 'Andrey', lastName: 'Bubkin', patronymic: 'Vladimirovich', carsAmount: 1 },
      { id: 2, firstName: 'Dmitriy', lastName: 'Smith', patronymic: 'Ivanovich', carsAmount: 2 }

    ];
    const cars = [
      { id: 0, cars: [{ year: 0, modelName: '', manufacturerName: '', carId: '' }] },
      { id: 1, cars: [{ year: 1999, modelName: 'CX-3', manufacturerName: 'Mazda', carId: 'AX9800PO' }] },
      {
        id: 2, cars: [{ year: 2009, modelName: 'CX-5', manufacturerName: 'Mazda', carId: 'AX9122YI' },
        { year: 2020, modelName: 'etron', manufacturerName: 'Audi', carId: 'KX7777KX' }]
      }
    ];
    return { owners, cars };
  }
}
