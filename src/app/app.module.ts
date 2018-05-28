import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule} from 'angular-bootstrap-md'
import { AppComponent } from './app.component';
import { NavComponent } from './Nav-Component/Nav.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './Home-Component/home.component';
import { CapitalComponent } from './Capital-Component/capital.component';
import { CountryService } from './Services/country.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LanguagesComponent } from './languages-Component/languages.component';
import { RegionComponent } from './Region-Component/region.component';
import { CountryComponent } from './Country-Component/country.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    CapitalComponent,
    LanguagesComponent,
    RegionComponent,
    CountryComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
      { path: "home", component: HomeComponent},
      { path: "", redirectTo: "home", pathMatch: "full" },
      /*{ path: "**", component: PageNotFoundComponent},*/
      { path: "cities", component: CapitalComponent },
      { path: "languages", component: LanguagesComponent },
      { path: "regions", component: RegionComponent },
      { path: "country", component: CountryComponent },
    ], { useHash: false }),
    HttpClientModule,
    FormsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA],
  providers: [CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
