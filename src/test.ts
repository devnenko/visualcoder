
console.log("hi2");
window.addEventListener("contextmenu", e => e.preventDefault());
var elem = document.createElement('div');
console.log(elem);
elem.className="buttoncss"
document.body.appendChild(elem);
var elem2 = document.createElement('h1');
elem2.textContent="hello"
elem2.className="textcss"
elem.appendChild(elem2);
 