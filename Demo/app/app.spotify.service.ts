import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class SpotifyService {
    
    constructor(private http: Http) {
        
    }

    getArtist(search: string) {
        return this.http.get("https://api.spotify.com/v1/search?type=artist&q=" + search)
            .map(res => res.json());
    }
}