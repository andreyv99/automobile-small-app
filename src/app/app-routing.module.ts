import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { RoutePath } from './models/route-path.model';

const routes: Routes = [
  {
    path: '',
    redirectTo: RoutePath.owners,
    pathMatch: 'full'
  },
  {
    path: RoutePath.owners,
    component: ListComponent
  },
  {
    path: `${RoutePath.owners}/${RoutePath.new}`,
    component: EditComponent
  },
  {
    path: `${RoutePath.owners}/:id/:term`,
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
