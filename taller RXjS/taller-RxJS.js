// Observables a partir de arrays

Rx.Observable
    .from(['One', 'Two', 'Three'])
    .subscribe(
    function (dato) { write('Next: ' + dato); },
    function (error) { write('Error: ', error); },
    function () { write('Completed'); }
    );


// Observables a partir de eventos JS

Rx.Observable.fromEvent(document, 'mousemove')
    .subscribe(function (event) {
        write('mousemove: ' + event.clientX + ',' + event.clientY);
    });

Rx.Observable.fromEvent(document, 'click')
    .subscribe(function (event) {
        write('click: ' + event.clientX + ',' + event.clientY);
    });


// Interval

Rx.Observable.interval(2000)
    .subscribe(function (event) {
        write('interval: ' + event);
    });


// Observable para hacer peticiones Ajax

const url = "http://api.openweathermap.org/data/2.5/weather?q=Seville,es&units=metric&APPID=f151b01828fe2aa596e99d34f1b67acd";

Rx.DOM.ajax({ url: url, crossDomain: true })
    .subscribe(
    function onNext(data) {
        const temp = JSON.parse(data.response).main.temp;
        write(temp);
    },
    function onError(err) { write(err); }
    );


// Observables a la medida

const observable = Rx.Observable.create(function (observer) {
    observer.onNext('One');
    observer.onNext('Two');
    observer.onNext('Three');
    observer.onCompleted();
});

const observer = Rx.Observer.create(
    function onNext(x) { write('Next: ' + x); },
    function onError(err) { write('Error: ' + err); },
    function onCompleted() { write('Completed'); }
);

observable.subscribe(observer);


// Range, filter

Rx.Observable.range(1, 10)
    .filter(x => x % 2 !== 0)
    .subscribe(function (event) {
        write('filter: ' + event);
    });


// Map

Rx.Observable.range(1, 10)
    .filter(x => x % 2 !== 0)
    .map(x => x * 2)
    .subscribe(function (event) {
        write('map: ' + event);
    });


// Reduce

Rx.Observable.range(1, 10)
    .filter(x => x % 2 !== 0)
    .map(x => x * 2)
    .reduce((acc, x) => acc + x)
    .subscribe(function (event) {
        write('reduce: ' + event);
    });


// Scan. Como reduce, pero emite también resultados intermedios

Rx.Observable.interval(1000)
    .scan((acc, x) => acc + x)
    .subscribe(function (event) {
        write('scan: ' + event);
    });


// Merge

const a = Rx.Observable.interval(2000).map(function (i) {
    return 'A' + i;
});
const b = Rx.Observable.interval(1000).map(function (i) {
    return 'B' + i;
});
Rx.Observable.merge(a, b).subscribe(function (event) {
    write('merge: ' + event);
});


// CombineLatest

const clicks = Rx.Observable.fromEvent(document, 'click')
    .map(function (event) { return 'click: ' + event.clientX + ',' + event.clientY; });

const mousemove = Rx.Observable.fromEvent(document, 'mousemove')
    .map(function (event) { return 'mousemove: ' + event.clientX + ',' + event.clientY; });

var combination = clicks.combineLatest(mousemove, function (clicksdata, mousemovedata) {
    return 'combineLatest: ' + clicksdata + ' ' + mousemovedata;
});

combination.subscribe(function (data) { write(data); });


// FlatMap

const urlw = "http://api.openweathermap.org/data/2.5/weather?q=Seville,es&units=metric&APPID=f151b01828fe2aa596e99d34f1b67acd";

Rx.Observable.interval(3000)
    .flatMap(function (event) {
        return Rx.Observable.interval(500).take(3).map(function (data) {
            return event * 3 + data * 0.5;
        });
    })
    .flatMap(function (event) {
        return Rx.DOM.ajax({ url: urlw, crossDomain: true }).map(function (data) {
            return event + ' --> ' + JSON.parse(data.response).main.temp;
        });
    })
    .subscribe(function (event) {
        write('interval: ' + event);
    });

var o1 = Rx.Observable.from([1,2,3]).map(x => [x, x * 10]);
o1.subscribe(x => document.write(x + " "));

var o2 = Rx.Observable.from([1,2,3]).flatMap(x => [x, x * 10]);
o2.subscribe(x => document.write(x + " "));