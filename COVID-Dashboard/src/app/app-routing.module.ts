//@LV_OneLess
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JandJComponent } from './jand-j/jand-j.component';
import { ListofComorbiditiesComponent } from './listof-comorbidities/listof-comorbidities.component';
import { ModernaComponent } from './moderna/moderna.component';
import { PfizerComponent } from './pfizer/pfizer.component';
import { PublicationsComponent } from './publications/publications.component';
import { VaccinePageComponent } from './vaccine-page/vaccine-page.component';

/* Creates a list of routes for each component
 * This list is used in the nav bar so that when a certain
 * nav option is chosen, it sets the router-outlet to the specified component
 */
const routes: Routes = [
  {path: '', component: VaccinePageComponent},
  {path: 'publications', component: PublicationsComponent},
  {path: 'pfizer', component: PfizerComponent},
  {path: 'moderna', component: ModernaComponent},
  {path: 'jandj', component: JandJComponent},
  {path: "listofcomorbidities", component: ListofComorbiditiesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
