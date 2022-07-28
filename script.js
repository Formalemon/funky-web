const container = document.getElementById('container')
const squares = 500

for(let i = 0; i < squares; i++){
	const square = document.createElement('div')
	square.classList.add('square')

	square.addEventListener('mouseover', setColor)

	square.addEventListener('mouseout', removeColor)

	square.addEventListener('click', removeEventListener)

	container.appendChild(square)
}

function setColor() {
	const color = randomColor()
	this.style.background = color
	this.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}


function removeColor() {
	this.style.background = '#1d1d1d'
	this.style.boxShadow = '0 0 2px #000'
}

function randomColor() {
	return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}

function removeEventListener() {
	this.removeEventListener('mouseover', setColor)
	this.removeEventListener('mouseout', removeColor)
	this.removeEventListener('click', removeEventListener)
}