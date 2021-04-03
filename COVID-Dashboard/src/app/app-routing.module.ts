import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicationsComponent } from './publications/publications.component';
import { VaccinePageComponent } from './vaccine-page/vaccine-page.component';

const routes: Routes = [
  {path: 'vaccinepage', component: VaccinePageComponent},
  {path: 'publications', component: PublicationsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
