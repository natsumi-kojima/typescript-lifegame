/// <reference path="game.ts" />
var exec = function () {
    var canvas = new Game.Canvas();

    setInterval(function () {
        canvas.draw();
    }, 100);
    // animationFrame(exec());
};

var animationFrame = window.requestAnimationFrame;

exec();
