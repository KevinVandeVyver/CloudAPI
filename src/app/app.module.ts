import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule} from 'angular-bootstrap-md'
import { AppComponent } from './app.component';
import { NavComponent } from './Nav-Component/Nav.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './Home-Component/home.component';
import { CitiesComponent } from './Cities-Component/cities.component';
import { CountryService } from './Services/country.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    CitiesComponent,
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
      { path: "home", component: HomeComponent},
      { path: "", redirectTo: "home", pathMatch: "full" },
      /*{ path: "**", component: PageNotFoundComponent},*/
      { path: "cities", component: CitiesComponent },
    ], { useHash: false }),
    HttpClientModule,
    FormsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA],
  providers: [CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
