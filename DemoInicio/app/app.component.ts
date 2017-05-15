/// <reference path="../typings/tsd.d.ts" />

import {Component} from 'angular2/core';
import { Observable } from 'rxjs/Rx';
import { SpotifyService } from './app.spotify.service';
import { HTTP_PROVIDERS } from 'angular2/http';

@Component({
    selector: 'my-app',
    template: `
        <input id="search" type="text" class="form-control">
    `,
    providers: [ SpotifyService , HTTP_PROVIDERS ]
})
export class AppComponent {
    
}