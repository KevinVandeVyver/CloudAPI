import { Component, OnInit } from '@angular/core';
import { ICountry } from '../Services/country.service';
import { CountryService } from '../Services/country.service';

@Component({
    selector: 'app-region',
    templateUrl: './region.component.html'
})

export class RegionComponent implements  OnInit{

    Regions : ICountry[];
    _search: string = "Europe";

    constructor(private _svc: CountryService) {
    }

    ngOnInit() {
        this._svc.getRegion(this._search)
            .subscribe(result => this.Regions = result);
    }

    get Search() {
        return this._search;
    }

    set Search(value:string) {
        this._search = value;
        this._svc.getRegion(this._search).subscribe(result => this.Regions = result);
    }
}