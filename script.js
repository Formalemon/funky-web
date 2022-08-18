var slider = document.getElementById('col')
var output = document.getElementById('demo1')
var slider2 = document.getElementById('row')
var output2 = document.getElementById('demo2')
var paint = document.getElementById('paint')
var rain = document.getElementById('toggle')
var fade = document.getElementById('toggle2')
var output3 = document.getElementById('demo3')
var fix = document.getElementById('toggle3')
var reset = document.getElementById('toggle4')
var slider3 = document.getElementById('time')
var raindiv = document.getElementById('raindiv')
var timediv = document.getElementById('timediv')
const container = document.getElementById('container')

output.innerHTML = slider.value
output2.innerHTML = slider2.value
output3.innerHTML = slider3.value + " seconds"
window.onload = panelSize()

slider.oninput = function() {
	output.innerHTML = this.value
	panelSize()
}

slider2.oninput = function() {
	output2.innerHTML = this.value
	panelSize()
}

slider3.oninput = function() {
	chnageFade()
	output3.innerHTML = this.value + " seconds"
}

rain.onchange = function() {
	if(rain.checked) {
		raindiv.style.display = "none"
	} else {
		raindiv.style.display = "block"
	}
}

fade.onchange = function() {
	if(fade.checked) {
		document.querySelectorAll('.square').forEach(sq => sq.addEventListener('mouseout', removeColor))
		chnageFade()
		timediv.style.display = "block"
	} else {
		document.querySelectorAll('.square').forEach(sq => sq.removeEventListener('mouseout', removeColor))
		timediv.style.display = "none"
	}
}

fix.onchange = function() {
	if(fix.checked) {
		document.querySelectorAll('.square').forEach(sq => sq.addEventListener('mouseover', bs))
		reset.disabled = true
	} else {
		document.querySelectorAll('.square').forEach(sq => sq.removeEventListener('mouseover', bs))
		reset.disabled = false
	}
}

reset.onchange = function() {
	if(reset.checked) {
		document.querySelectorAll('.square').forEach(function(sq) {
			sq.removeEventListener('mouseover', setColor)
		})
		document.querySelectorAll('.fixed').forEach(function(sq) {
			sq.addEventListener('mouseover', bs2)
		})
		fix.disabled = true
	} else {
		document.querySelectorAll('.square:not(.fixed)').forEach(function(sq) {
			sq.addEventListener('mouseover', setColor)
		})
		document.querySelectorAll('.fixed').forEach(sq => sq.removeEventListener('mouseover', bs2))
		fix.disabled = false
	}
}


function chnageFade() {
	document.querySelectorAll('.square').forEach(sq => sq.style.transitionDuration = slider3.value + "s")
}

function panelSize() {
	document.querySelectorAll('.square').forEach(square => square.remove())

	for(let i = 0; i < slider2.value * slider.value; i++){
		container.style.maxWidth = slider.value * 20 + 'px'
		const square = document.createElement('div')
		square.classList.add('square')
		square.addEventListener('mouseover', setColor)
		square.addEventListener('mouseout', removeColor)
		square.addEventListener('click', removeEventListener)
		square.addEventListener('dblclick', resetEventListener)
		container.appendChild(square)
	}
}

function setColor() {
	let color = paint.value
	if (rain.checked) {
		color = randomColor()
	}
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
	this.classList.add('fixed')
	this.removeEventListener('mouseover', setColor)
	this.removeEventListener('mouseout', removeColor)
	this.removeEventListener('click', removeEventListener)
}

function resetEventListener() {
	this.classList.remove('fixed')
	this.addEventListener('mouseover', setColor)
	this.addEventListener('mouseout', removeColor)
	this.addEventListener('click', removeEventListener)
}

function bs() {
	this.click()
}

function bs2() {
	this.dispatchEvent(doubleClickEvent)
	this.removeEventListener('mouseover', setColor)
	this.removeEventListener('mouseover', bs2)
}

var doubleClickEvent = document.createEvent('MouseEvents')
doubleClickEvent.initEvent('dblclick', true, true)