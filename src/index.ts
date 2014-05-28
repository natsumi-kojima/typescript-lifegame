/// <reference path="game.ts" />
var exec : ()=>void = function(){
	var canvas:Game.Canvas = new Game.Canvas();

	setInterval(() => {
		canvas.draw();
	}, 100)
	// animationFrame(exec());
}

var animationFrame = window.requestAnimationFrame;

exec();
