// Elementos DOM
const $box = document.querySelector('textarea')
const $words = document.getElementById('words')
const $sentences = document.getElementById('sentences')
const $lines = document.getElementById('lines')
const $chars = document.getElementById('chars')

// Función para imprimir contadores
const updateLabel = $target => str => $target.innerHTML = str

// Funciones para calcular
const getWords = str => str.split(/[\s']+/)
const getSentences = str => str.split(/[\.\?]+/)
const getLines = str => str.split(/\n+/)
const getChars = str => str.replace(/\W/gm, '')
const getLength = thing => thing ? thing.length : 0
const getNotEmpty = arr => arr.filter(id)
const id = x => x

// Observable base de teclado
const content$ = Rx.Observable
  .fromEvent($box, 'keyup')
  .map(e => e.target.value.trim())

// Contador de palabras
content$
  .map(getWords)
  .map(getNotEmpty)
  .map(getLength)
  .subscribe(updateLabel($words))

// Contador de frases
content$
  .map(getSentences)
  .map(getNotEmpty)
  .map(getLength)
  .subscribe(updateLabel($sentences))

// Contador de líneas
content$
  .map(getLines)
  .map(getNotEmpty)
  .map(getLength)
  .subscribe(updateLabel($lines))

// Contador de caracteres
content$
  .map(getChars)
  .map(getLength)
  .subscribe(updateLabel($chars))