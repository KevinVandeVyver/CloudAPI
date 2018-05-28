import { Component, OnInit } from '@angular/core';
import { ICountry } from '../Services/country.service';
import { CountryService } from '../Services/country.service';

@Component({
    selector: 'app-Capital',
    templateUrl: './capital.component.html'
})

export class CapitalComponent implements  OnInit{

    Hoofdstad : ICountry;
    _search: string = "brussel";

    constructor(private _svc: CountryService) {
    }

    ngOnInit() {
        this._svc.getCapitalCity(this._search)
            .subscribe(result => this.Hoofdstad = result[0]);
    }

    get Search() {
        return this._search;
    }

    set Search(value:string) {
        this._search = value;
        this._svc.getCapitalCity(this._search).subscribe(result => this.Hoofdstad = result[0]);
    }
}