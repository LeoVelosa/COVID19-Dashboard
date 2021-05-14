//@ALL_OneLess
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { VaccinePageComponent } from './vaccine-page/vaccine-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { PublicationsComponent } from './publications/publications.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from './card/card.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { AvalibilityDropDownCardComponent } from './avalibilityDropDownCard/card.component';
import { EligibilityDropDownCardComponent } from './eligibilityDropDownCard/card.component';

import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PfizerComponent } from './pfizer/pfizer.component';
import { ModernaComponent } from './moderna/moderna.component';
import { JandJComponent } from './jand-j/jand-j.component';
import { NgxSpinner, NgxSpinnerComponent, NgxSpinnerModule } from 'ngx-spinner';
import { ListofComorbiditiesComponent } from './listof-comorbidities/listof-comorbidities.component';
import { VaccinedataComponent } from './vaccinedata/vaccinedata.component';
import { VaccinetypedataComponent } from './vaccinetypedata/vaccinetypedata.component';
import { PubmeddataComponent } from './pubmeddata/pubmeddata.component';
import { PubmeddropdownComponent } from './pubmeddropdown/pubmeddropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    VaccinePageComponent,
    PublicationsComponent,
    CardComponent,
    AvalibilityDropDownCardComponent,
    EligibilityDropDownCardComponent,
    PfizerComponent,
    ModernaComponent,
    JandJComponent,
    ListofComorbiditiesComponent,
    VaccinedataComponent,
    VaccinetypedataComponent,
    PubmeddataComponent,
    PubmeddropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    NgbModule,
    MatTabsModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    MatSlideToggleModule
  ],
  providers: [
    {provide : LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
