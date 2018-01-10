
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
var going_up = true;
var [lastX , lastY, hue , width] = [0 , 0 , 0 , 5];

function draw(cursor) {
    if(!drawing) { return }

    let effect = document.querySelector('button.on') ? document.querySelector('button.on').id : 'basic';

    if( effect == 'colorize' ) {
        ctx.lineWidth = slider.value;
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    }
    else if( effect == 'rainbow' ) {
        ctx.lineWidth = width
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    }
    else {
        ctx.lineWidth = slider.value;
        ctx.strokeStyle = 'black'
    }


    ctx.beginPath();
    ctx.moveTo( lastX , lastY );
    ctx.lineTo(cursor.offsetX, cursor.offsetY);
    ctx.stroke();

    [lastX , lastY] = [cursor.offsetX , cursor.offsetY];

    // No need to mess with these variables in basic mode
    if( effect != 'basic' ) {
        hue = (hue >= 360)?  0 : hue+1 ;
    
        if( width <= 0 )   { going_up = true }
        if( width >= 100 ) { going_up = false }
        width = (going_up)?  width+1 : width-1 ;
    }
    
}

canvas.addEventListener('mousedown', (e) => { 
    drawing = true;
    [lastX , lastY] = [e.offsetX , e.offsetY];
})
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', () => { drawing = false })
canvas.addEventListener('mouseout', () => { drawing = false })


