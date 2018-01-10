var canvas = document.querySelector('canvas');
var header = document.querySelector('header');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - header.offsetHeight;

var ctx = canvas.getContext('2d');

// --------------------------------------------

// var drawing = false;
// var [lastX , lastY] = [0 , 0];

// function draw(cursor) {
//     if(!drawing) { return }

//     ctx.beginPath();
//     ctx.moveTo( lastX , lastY );
//     ctx.lineTo(cursor.offsetX, cursor.offsetY);
//     ctx.stroke();
//     [lastX , lastY] = [cursor.offsetX , cursor.offsetY];
// }

// canvas.addEventListener('mousedown', (e) => { 
//     drawing = true ;
//     [lastX , lastY] = [e.offsetX , e.offsetY];
// })
// canvas.addEventListener('mousemove', draw)
// canvas.addEventListener('mouseup', () => { drawing = false })


