import { Component, OnInit } from '@angular/core';
import { ICountry } from '../Services/country.service';
import { CountryService } from '../Services/country.service';

@Component({
    selector: 'app-languages',
    templateUrl: './languages.component.html'
})

export class LanguagesComponent implements  OnInit{

    Languages : ICountry[];
    _search: string = "nl";

    constructor(private _svc: CountryService) {
    }

    ngOnInit() {
        this._svc.getLanguage(this._search)
            .subscribe(result => this.Languages = result);
    }

    get Search() {
        return this._search;
    }

    set Search(value:string) {
        this._search = value;
        this._svc.getLanguage(this._search).subscribe(result => this.Languages = result);
    }
}