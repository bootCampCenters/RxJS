/// <reference path="../typings/tsd.d.ts" />
System.register(['angular2/core', 'rxjs/Rx', './app.spotify.service', 'angular2/http'], function(exports_1, context_1) {
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
    var core_1, Rx_1, app_spotify_service_1, http_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (app_spotify_service_1_1) {
                app_spotify_service_1 = app_spotify_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(spotifyService) {
                    this.spotifyService = spotifyService;
                    /*var retardada = _.debounce(function(text) {
                        var url = "https://api.spotify.com/v1/search?type=artist&q=" + text;
                        $.getJSON(url, function(artists) {
                            console.log(artists);
                        });
                    }, 400);
            
                    $("#search").keyup(function(e) {
                        var text = e.target.value;
                        
            
                        if(text.length < 3) {
                            return;
                        }
            
                        retardada(text);
                        
                    });*/
                    this.createSubscription();
                }
                AppComponent.prototype.cancelSubscription = function () {
                    if (!this.subscripcion.isUnsubscribed) {
                        this.subscripcion.unsubscribe();
                        this.subscripcion === undefined;
                        console.log("Desubscrito");
                    }
                };
                AppComponent.prototype.createSubscription = function () {
                    var _this = this;
                    if (this.subscripcion === undefined || this.subscripcion.isUnsubscribed) {
                        this.keysup = Rx_1.Observable.fromEvent($("#search"), 'keyup')
                            .map(function (e) { return e.target.value; })
                            .filter(function (text) { return text.length >= 3; })
                            .debounceTime(400)
                            .distinctUntilChanged()
                            .flatMap(function (searchTerm) {
                            var observable = Rx_1.Observable.from(_this.spotifyService.getArtist(searchTerm));
                            return observable;
                        });
                        this.subscripcion = this.keysup.subscribe(function (data) { return console.log(data); });
                    }
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n        <input id=\"search\" type=\"text\" class=\"form-control\">\n        <button class=\"btn btn-primary\" (click)=\"cancelSubscription()\">Cancelar subscripci\u00F3n</button>\n        <button class=\"btn btn-default\" (click)=\"createSubscription()\">Crear subscripci\u00F3n</button>\n    ",
                        providers: [app_spotify_service_1.SpotifyService, http_1.HTTP_PROVIDERS]
                    }), 
                    __metadata('design:paramtypes', [app_spotify_service_1.SpotifyService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.finalTaller.js.map