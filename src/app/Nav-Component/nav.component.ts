import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
    selector: 'app-Nav',
    templateUrl: './nav.component.html'
})

export class NavComponent{

    auth

    constructor(private _svc: AuthService) {
        this.auth = _svc.isAuthenticated();
    }

    login(){
        this._svc.login();
        this.auth = this._svc.isAuthenticated(); //moet eerst refreshen voordat de knop log out verschijnt
    }

    logout(){
        this._svc.logout();
        this.auth = this._svc.isAuthenticated();
    }
}