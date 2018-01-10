
var header = document.querySelector('header');

var slider = document.querySelector('input');
slider.value = 5;

var buttons = Array.from([...document.querySelectorAll('button')]);

buttons.forEach( (button) => {
    button.addEventListener('click', function() {
        this.classList.toggle('on');

        if( this.classList.contains('on') ) {
            // Change header background to the same as button border (except basic)
            if( this.id === 'colorize' || this.id === 'rainbow') {
                header.style.background = window.getComputedStyle(this).borderImageSource;
            }
            else {
                header.style.background = 'linear-gradient(to right, gray, white)'
            }

            // Only one button can be on (so remove class from siblings)
            let siblings = buttons.filter( (button) => {return button != this} );
            siblings.forEach( (sibling) => { sibling.classList.remove('on') })
        }
    })
})


// --------------------------------------------

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - header.offsetHeight;
var ctx = canvas.getContext('2d');
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

var drawing = false;
var [lastX , lastY] = [0 , 0];

function draw(cursor, effect) {
    if(!drawing) { return }

    if( effect == "none") {
        console.log("effect worked");
    }

    ctx.lineWidth = slider.value;

    ctx.beginPath();
    ctx.moveTo( lastX , lastY );
    ctx.lineTo(cursor.offsetX, cursor.offsetY);
    ctx.stroke();
    [lastX , lastY] = [cursor.offsetX , cursor.offsetY];
}

canvas.addEventListener('mousedown', (e) => { 
    drawing = true ;
    [lastX , lastY] = [e.offsetX , e.offsetY];
})
canvas.addEventListener('mousemove', (e) => { draw(e, 'none') })
canvas.addEventListener('mouseup', () => { drawing = false })


