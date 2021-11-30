import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, scan, startWith } from 'rxjs/operators';
import { OwnerEntity } from 'src/app/models/owner.interface';
import { RoutePath } from 'src/app/models/route-path.model';
import { CarOwnersService } from 'src/app/services/car-owners.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  routePath = RoutePath;

  deleteOwnerSubject = new Subject<any>();
  deleteOwner$ = this.deleteOwnerSubject.asObservable().pipe(
    startWith([]),
    scan((acc: number[], curr: number) => [...acc, curr])
  );

  vm$: Observable<OwnerEntity[]> = combineLatest([this.carOwnersService.allOwners$, this.deleteOwner$]).pipe(
    map(([owners, ids]) => {
      return owners.filter(x => !ids.includes(x.id))
    })
  )

  constructor(private carOwnersService: CarOwnersService) { }

  deleteOwner(id: number): void {
    this.carOwnersService.deleteOwner$(id).subscribe(() => this.deleteOwnerSubject.next(id))
  }
}
