var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');


ctx.fillStyle = "#3b7ed9";
ctx.fillRect(100, 100, 100, 100);
ctx.fillStyle = "#d94646";
ctx.fillRect(400, 100, 100, 100);
ctx.fillStyle = "#5cd93b";
ctx.fillRect(300, 300, 100, 100);
console.log(canvas)

// Line

ctx.beginPath();
ctx.moveTo(50, 300);
ctx.lineTo(300, 100);
ctx.lineTo(400, 300);
ctx.strokeStyle = "#d94646";
ctx.stroke()

// Arc/ Circle
ctx.beginPath();
ctx.arc(300, 300, 30, 0, Math.PI * 2, false);
ctx.strokeStyle = "#3b7ed9";
ctx.stroke();

for (var i = 0; i < 10; i++) {
	var x = Math.random() * window.innerWidth;
	var y = Math.random() * window.innerHeight;
	ctx.beginPath();
	ctx.arc(x, y, 30, 0, Math.PI * 2, false);
	ctx.strokeStyle = "#3b7ed9";
	ctx.stroke();
};
 var x = Math.random() * innerWidth;
 var y = Math.random() * innerHeight;
 var dx = (Math.random() - 0.5) * 3;
 var dy = (Math.random() - 0.5) * 3;
 var radius = 40

var mouse = {
	x: undefined,
	y: undefined,
};
var maxRadius = 60;
var minRadius = 8;

var colorArray = [
	'#105B63',
	'#FFFAD5',
	'#FFD34E',
	'#DB9E36',
	'#BD4932',
];
window.addEventListener('mousemove',function(event){
	mouse.x = event.x;
	mouse.y = event.y;
});
window.addEventListener('resize',function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

function Circle (x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.draw = function () {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
	};
	this.update = function () {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
		this.dx = -this.dx;
		};

		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		};
	
		this.x += this.dx;
		this.y += this.dy;

		// interactivity
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y -this.y < 50 && mouse.y - this.y > -50 ){
			if (this.radius < maxRadius) {
				this.radius += 1;
			};
		} 
		else if (this.radius > this.minRadius){
			this.radius -= 1;
		};
		this.draw();
	};

};

var circleArray = [];
for (var i = 0; i < 300; i++) {
	var radius = Math.random() * 9 + 1;
	var x = Math.random() * (innerWidth - radius * 2) + radius;
 	var y = Math.random() * (innerHeight - radius * 2) + radius;
 	var dx = (Math.random() - 0.5) * 3;
 	var dy = (Math.random() - 0.5) * 3;
	circleArray.push(new Circle(x, y, dx, dy, radius));
};

function animate () {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);

	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	};
};

animate();