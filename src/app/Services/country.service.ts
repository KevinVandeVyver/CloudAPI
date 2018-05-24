import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

Injectable()
export class AirQualityDataService {

    constructor(private _http: HttpClient) { }

    getCapitalCity(capital): Observable<IRootObject> {
        return this._http.get<IRootObject>(`https://restcountries.eu/rest/v2/capital/${capital}`)
    }

    getLanguage(language): Observable<IRootObject> {
        return this._http.get<IRootObject>(`https://restcountries.eu/rest/v2/lang/${language}`)
    }
    
    getCurrency(currency): Observable<IRootObject> {
        return this._http.get<IRootObject>(`https://restcountries.eu/rest/v2/currency/${currency}`)
    }
}

export interface ICurrency {
    code: string;
    name: string;
    symbol: string;
}

export interface ILanguage {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
}

export interface ITranslations {
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    br: string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
}

export interface IRegionalBloc {
    acronym: string;
    name: string;
    otherAcronyms: string[];
    otherNames: string[];
}

export interface IRootObject {
    name: string;
    topLevelDomain: string[];
    alpha2Code: string;
    alpha3Code: string;
    callingCodes: string[];
    capital: string;
    altSpellings: string[];
    region: string;
    subregion: string;
    population: number;
    latlng: number[];
    demonym: string;
    area?: number;
    gini?: number;
    timezones: string[];
    borders: string[];
    nativeName: string;
    numericCode: string;
    currencies: ICurrency[];
    languages: ILanguage[];
    translations: ITranslations;
    flag: string;
    regionalBlocs: IRegionalBloc[];
    cioc: string;
}
