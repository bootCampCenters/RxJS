/// <reference path="../typings/tsd.d.ts" />

import {Component} from 'angular2/core';
import { Observable } from 'rxjs/Rx';
import { SpotifyService } from './app.spotify.service';
import { HTTP_PROVIDERS } from 'angular2/http';

@Component({
    selector: 'my-app',
    template: `
        <input id="search" type="text" class="form-control">
        <button class="btn btn-primary" (click)="cancelSubscription()">Cancelar subscripción</button>
        <button class="btn btn-default" (click)="createSubscription()">Crear subscripción</button>
    `,
    providers: [ SpotifyService , HTTP_PROVIDERS ]
})
export class AppComponent {
    public keysup: Observable<any>;
    public subscripcion: any;

    constructor(private spotifyService: SpotifyService){
        this.createSubscription();
    }

    cancelSubscription() {
        if(!this.subscripcion.isUnsubscribed) {
            this.subscripcion.unsubscribe();
            this.subscripcion === undefined;
            console.log("Desubscrito");
        }
    }   

    createSubscription() {
        if(this.subscripcion === undefined || this.subscripcion.isUnsubscribed) {
            this.keysup = Observable.fromEvent($("#search"), 'keyup')
            .map(e => e.target.value)
            .filter(text => text.length >= 3)
            .debounceTime(400)
            .distinctUntilChanged()
            /*.flatMap(searchTerm => {
                var observable = Observable.from(this.spotifyService.getArtist(searchTerm));
                return observable;
            })*/
            .flatMap(searchTerm => {
                return this.spotifyService.getArtist(searchTerm);
            });
                            
            this.subscripcion = this.keysup.subscribe(data => console.log(data));
        }
    }
}