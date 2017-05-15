
// Elementos DOM
var firstNameInput = document.querySelector('#firstName');
var lastNameInput = document.querySelector('#lastName');
var fullNameInput = document.querySelector('#fullName');

// Observables de entrada y enlaces con elementos DOM
var firstName$ = new Rx.BehaviorSubject('');
var lastName$ = new Rx.BehaviorSubject('');

Rx.Observable.fromEvent(firstNameInput, 'keyup')
    .subscribe(function (e) { firstName$.onNext(e.target.value); })

Rx.Observable.fromEvent(lastNameInput, 'keyup')
    .subscribe(function (e) { lastName$.onNext(e.target.value); })

// Observable calculado y enlace con elemento DOM
var fullName$ = firstName$.combineLatest(lastName$, function (first, last) {
    return first + ' ' + last;
});
fullName$.subscribe(function (text) { fullNameInput.value = text });


