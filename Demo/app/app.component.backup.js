/// <reference path="../typings/tsd.d.ts" />
System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            // Estos tres imports ocupan mucho menos...
            //import {Observable} from 'rxjs/Observable';
            //import 'rxjs/add/operator/debounceTime';
            //import 'rxjs/add/operator/filter';
            AppComponent = (function () {
                function AppComponent() {
                    // Esperaremos un poquito por si el usuario escribe muy rápido...
                    var debounced = _.debounce(function (text) {
                        // Hacemos la petición y enviamos en el callback a la consola el resultado
                        var url = "https://api.spotify.com/v1/search?type=artist&q=" + text;
                        $.getJSON(url, function (artists) {
                            console.log(artists);
                        });
                    }, 400);
                    $("#search").keyup(function (e) {
                        // Obtenemos el texto que se ha escrito en #search
                        var text = e.target.value;
                        // Si la longitud es menor de 3, hacemos return y no hacemos la petición
                        if (text.length < 3)
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
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n        <input id=\"search\" type=\"text\" class=\"form-control\">\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.backup.js.map