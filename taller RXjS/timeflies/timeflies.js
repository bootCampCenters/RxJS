function getOffset(element) {
  var doc = element.ownerDocument,
    docElem = doc.documentElement,
    body = doc.body,
    clientTop = docElem.clientTop || body.clientTop || 0,
    clientLeft = docElem.clientLeft || body.clientLeft || 0,
    scrollTop = window.pageYOffset,
    scrollLeft = window.pageXOffset;

  return { top: scrollTop - clientTop, left: scrollLeft - clientLeft };
}



// Stream que sigue el movimiento del ratón
var container = document.querySelector('#container');
var mousemove$ = Rx.Observable.fromEvent(document, 'mousemove')
  .map(function (e) {
    var offset = getOffset(container);
    return {
      offsetX: e.clientX - offset.left + document.documentElement.scrollLeft,
      offsetY: e.clientY - offset.top + document.documentElement.scrollTop
    };
  });

// Stream que recorre las letras y genera streams con movimiento de ratón
var text = 'TIME FLIES LIKE AN ARROW';
Rx.Observable.from(text).flatMap(
  function (letter, i) {
    // Crea un span para cada letra
    var span = document.createElement('span');
    span.innerHTML = letter;
    span.style.position = 'absolute';
    container.appendChild(span);

    // Mueve cada letra con un retraso en función de la posición del ratón
    return mousemove$.delay(i * 100).map(function (pos) {
      return { pos: pos, element: span, index: i };
    });
  })
  .subscribe(function (data) {
    data.element.style.top = data.pos.offsetY + 'px';
    data.element.style.left = data.pos.offsetX + data.index * 10 + 15 + 'px';
  });

