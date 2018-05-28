import { Component, OnInit } from '@angular/core';
import { ICountry } from '../Services/country.service';
import { CountryService } from '../Services/country.service';

@Component({
    selector: 'app-Country',
    templateUrl: './country.component.html'
})

export class CountryComponent implements  OnInit{

    Land : ICountry;
    _search: string = "Belgium";

    constructor(private _svc: CountryService) {
    }

    ngOnInit() {
        this._svc.getCountry(this._search)
            .subscribe(result => this.Land = result[0]);
    }

    get Search() {
        return this._search;
    }

    set Search(value:string) {
        this._search = value;
        this._svc.getCountry(this._search).subscribe(result => this.Land = result[0]);
    }
}