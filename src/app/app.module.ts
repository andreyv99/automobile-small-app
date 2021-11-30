import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarListComponent } from './components/edit/car-list/car-list.component';
import { EditComponent } from './components/edit/edit.component';
import { PersonalInfoComponent } from './components/edit/personal-info/personal-info.component';
import { ListComponent } from './components/list/list.component';
import { AppDataService } from './services/app-data.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    EditComponent,
    PersonalInfoComponent,
    CarListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(AppDataService, { delay: 0 }),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
