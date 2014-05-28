var Game;
(function (Game) {
    var Cell = (function () {
        function Cell(width, height, size) {
            this.cellsWidth = width;
            this.cellsHeight = height;
            this.cellSize = size;
            this.length = this.cellsWidth * this.cellsHeight;
            this.current = new Array(this.length);
            this.previous = new Array(this.length);
            for (var i = 0; i < this.length; i++) {
                if (Math.random() >= 0.2) {
                    this.current[i] = false;
                    this.previous[i] = false;
                } else {
                    this.current[i] = true;
                    this.previous[i] = true;
                }
            }
        }
        Cell.prototype.next = function () {
            var _this = this;
            for (var index = 0; index < this.length; index++) {
                var x = index % this.cellsWidth;
                var y = Math.floor(index / this.cellsWidth);
                var top = y - 1;
                var bottom = y + 1;
                var left = x - 1;
                var right = x + 1;
                var count = [
                    { x: left, y: top }, { x: x, y: top }, { x: right, y: top },
                    { x: left, y: y }, { x: right, y: y },
                    { x: left, y: bottom }, { x: x, y: bottom }, { x: right, y: bottom }
                ].filter(function (value) {
                    return _this.alive(value.x, value.y);
                }).length;

                if (this.previous[index]) {
                    if ((count === 2) || (count === 3)) {
                        this.current[index] = true;
                    } else {
                        this.current[index] = false;
                    }
                } else {
                    if (count === 3) {
                        this.current[index] = true;
                    } else {
                        this.current[index] = false;
                    }
                }
            }
            this.previous = Array.apply(null, this.current);
        };

        Cell.prototype.alive = function (x, y) {
            if (x >= this.cellsWidth) {
                return false;
            }
            if (y >= this.cellsHeight) {
                return false;
            }
            if (x < 0 || y < 0) {
                return false;
            }
            if (this.previous[x + (y * this.cellsWidth)]) {
                return true;
            }
            return false;
        };

        Cell.prototype.draw = function (context) {
            //各セルを描画
            context.fillStyle = "#39E639";
            for (var i = 0; i < this.length; i++) {
                if (this.current[i]) {
                    var x = i % this.cellsWidth;
                    var y = Math.floor(i / this.cellsWidth);
                    context.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
                }
            }
            this.next();
        };
        return Cell;
    })();
    Game.Cell = Cell;

    var Canvas = (function () {
        function Canvas() {
            this.canvas = document.getElementById('canvas');
            this.canvas.width = Canvas.WIDTH;
            this.canvas.height = Canvas.HEIGHT;
            this.context = this.canvas.getContext('2d');
            this.cells = new Game.Cell(Canvas.WIDTH_CELL_LENGTH, Canvas.HEIGHT_CELL_LENGTH, Canvas.CELL_SIZE);
        }
        Canvas.prototype.draw = function () {
            this.context.clearRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);

            //罫線の色
            this.context.strokeStyle = "#ff00ff";

            for (var wIndex = 0; wIndex <= Canvas.WIDTH_CELL_LENGTH; wIndex++) {
                this.context.beginPath();
                this.context.moveTo(Canvas.CELL_SIZE * wIndex, 0);
                this.context.lineTo(Canvas.CELL_SIZE * wIndex, Canvas.CELL_SIZE * Canvas.HEIGHT_CELL_LENGTH);
                this.context.closePath();
                this.context.stroke();
            }

            for (var hIndex = 0; hIndex <= Canvas.HEIGHT_CELL_LENGTH; hIndex++) {
                this.context.beginPath();
                this.context.moveTo(0, Canvas.CELL_SIZE * hIndex);
                this.context.lineTo(Canvas.CELL_SIZE * Canvas.WIDTH_CELL_LENGTH, Canvas.CELL_SIZE * hIndex);
                this.context.closePath();
                this.context.stroke();
            }
            this.cells.draw(this.context);
        };
        Canvas.CELL_SIZE = 20;
        Canvas.WIDTH_CELL_LENGTH = 60;
        Canvas.HEIGHT_CELL_LENGTH = 35;
        Canvas.WIDTH = Canvas.CELL_SIZE * Canvas.WIDTH_CELL_LENGTH;
        Canvas.HEIGHT = Canvas.CELL_SIZE * Canvas.HEIGHT_CELL_LENGTH;
        return Canvas;
    })();
    Game.Canvas = Canvas;
})(Game || (Game = {}));
