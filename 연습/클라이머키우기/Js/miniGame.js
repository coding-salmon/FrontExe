const holdBox = document.getElementById('hold-box');
const hold = document.getElementById('hold');

holdBox.addEventListener('click', function(event){
    const boxWidth = holdBox.offsetWidth;
    const boxHeight = holdBox.offsetHeight;

    const holdWidht = hold.offsetWidth;
    const holdHeight = hold.offsetHeight;

    const maxLeft = boxWidth - holdWidth;
    const maxTop = boxHeight - holdHeight;

    const randomLeft = Math.floor(Math.random()*maxLeft);
    const randomTop = Math.floor(Math.random()*maxTop);

    hold.style.left = randomLeft + 'px';
    hold.style.top = randomTop + 'px'
});