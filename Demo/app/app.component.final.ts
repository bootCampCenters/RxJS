/// <reference path="../typings/tsd.d.ts" />

import {Component} from 'angular2/core';
// Import para crear Observables (tiene muchísimo código)
import {Observable} from 'rxjs/Rx';

// Estos tres imports ocupan mucho menos...
//import {Observable} from 'rxjs/Observable';
//import 'rxjs/add/operator/debounceTime';
//import 'rxjs/add/operator/filter';

@Component({
    selector: 'my-app',
    template: `
        <input id="search" type="text" class="form-control">
    `
})
export class AppComponent {
    constructor(){
        // Esperaremos un poquito por si el usuario escribe muy rápido...
        var debounced = _.debounce(function(text){
            // Hacemos la petición y enviamos en el callback a la consola el resultado
            var url = "https://api.spotify.com/v1/search?type=artist&q=" + text;
            $.getJSON(url, function(artists) {
                console.log(artists);
            });
        }, 400);

        $("#search").keyup(function(e) {
            // Obtenemos el texto que se ha escrito en #search
            var text = e.target.value;
            
            // Si la longitud es menor de 3, hacemos return y no hacemos la petición
            if(text.length < 3)
                return;

            debounced(text);
        });

        /*
        // Creamos el observable (from event de un text box)
        var keyups = Observable.fromEvent($("#search"), "keyup")
        // Pasamos cada evento a map, y lo que hacemos es acceder al evento.target.value
        // que es el texto que tenemos metido en la box
            .map(e => e.target.value)
            // Vamos a filtrar,
            .filter(text => text.length >= 3)
            // Implementamos el retardo...
            .debounceTime(400)
            // Con esto evitamos que al "movernos por el input" se vuelva a dar la petición
            .distinctUntilChanged()
            // Cada vez que esto se cumpla, lo convertirmos en un searchTerm y ejecutamos
            // la petición jSON, como al final se devuelve un Observable y en el "suscribe" tenemos
            // un JSON, ejecutamos un flatMap para aplanar los "observables"
            .flatMap(searchTerm => {
                var url = "https://api.spotify.com/v1/search?type=artist&q=" + searchTerm;
                // Lo metemos en una promesa...
                var promise = $.getJSON(url);
                // Devolvemos un Observable a partir de la promera...
                return Observable.fromPromise(promise);
            });

        // Nos suscribimos
        var subscription = keyups.subscribe(data => console.log(data));

        console.log(new Observable());*/
    }
}