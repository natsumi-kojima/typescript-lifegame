module Game{
	export class Cell{
		private current:boolean[];
		private previous:boolean[];
		private cellsWidth:number;
		private cellsHeight:number;
		private cellSize:number;
		private length:number;

		constructor(width, height, size){
			this.cellsWidth = width;
			this.cellsHeight = height;
			this.cellSize = size;
			this.length = this.cellsWidth * this.cellsHeight;
			this.current = new Array<boolean>(this.length);
			this.previous = new Array<boolean>(this.length);
			for(var i = 0; i < this.length; i++){
				if(Math.random() >= 0.2){
					this.current[i] = false;
					this.previous[i] = false;
				}else{
					this.current[i] = true;
					this.previous[i] = true;
				}
			}
		}

		next():void {
			for(var index = 0; index < this.length; index++){
				var x = index % this.cellsWidth;
				var y = Math.floor(index / this.cellsWidth);
				var top = y - 1;
				var bottom = y + 1;
				var left = x - 1;
				var right = x + 1;
				var count = [
				{x : left, y : top},    {x : x, y: top},	{x : right, y: top},
				{x : left, y : y},								{x : right, y: y},
				{x : left, y : bottom}, {x : x, y: bottom}, {x : right, y: bottom}
				].filter(value => this.alive(value.x, value.y)).length;

				if(this.previous[index]){
					if((count === 2) || (count === 3)){
						this.current[index] = true;
					}else{
						this.current[index] = false;
					}
				}else{
					if(count === 3){
						this.current[index] = true;
					}else{
						this.current[index] = false;
					}
				}

			}
			this.previous = Array.apply(null, this.current);
		}

		alive(x:number, y:number){
			if(x >= this.cellsWidth){
				return false;
			}
			if(y >= this.cellsHeight){
				return false;
			}
			if(x < 0 || y < 0){
				return false;
			}
			if(this.previous[x + (y * this.cellsWidth)]){
				return true;
			}
			return false;
		}

		draw(context:CanvasRenderingContext2D) : void {
			//各セルを描画
			context.fillStyle = "#39E639";
			for(var i = 0; i < this.length; i++){
				if(this.current[i]){
					var x = i % this.cellsWidth;
					var y = Math.floor(i / this.cellsWidth);
					context.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
				}
			}
			this.next();
		}
	}

	export class Canvas{

		private static CELL_SIZE:number = 20;		
		private static WIDTH_CELL_LENGTH:number = 60;
		private static HEIGHT_CELL_LENGTH:number = 35;
		private static WIDTH = Canvas.CELL_SIZE * Canvas.WIDTH_CELL_LENGTH;
		private static HEIGHT = Canvas.CELL_SIZE * Canvas.HEIGHT_CELL_LENGTH;
		private canvas:HTMLCanvasElement;
		private context:CanvasRenderingContext2D;
		private cells:Game.Cell;

		constructor(){
			this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
			this.canvas.width = Canvas.WIDTH;
			this.canvas.height = Canvas.HEIGHT;
			this.context = this.canvas.getContext('2d');
			this.cells = new Game.Cell(Canvas.WIDTH_CELL_LENGTH, Canvas.HEIGHT_CELL_LENGTH, Canvas.CELL_SIZE);
		}

		draw() : void {
			this.context.clearRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
			//罫線の色
			this.context.strokeStyle = "#ff00ff";
			//縦罫線
			for(var wIndex = 0; wIndex <= Canvas.WIDTH_CELL_LENGTH; wIndex++){
				this.context.beginPath();
				this.context.moveTo(Canvas.CELL_SIZE * wIndex, 0);
				this.context.lineTo(Canvas.CELL_SIZE * wIndex,  Canvas.CELL_SIZE * Canvas.HEIGHT_CELL_LENGTH);
				this.context.closePath();
				this.context.stroke();
			}
			//横罫線
			for(var hIndex = 0; hIndex <= Canvas.HEIGHT_CELL_LENGTH; hIndex++){
				this.context.beginPath();
				this.context.moveTo(0, Canvas.CELL_SIZE * hIndex);
				this.context.lineTo(Canvas.CELL_SIZE * Canvas.WIDTH_CELL_LENGTH, Canvas.CELL_SIZE * hIndex);
				this.context.closePath();
				this.context.stroke();
			}
			this.cells.draw(this.context);
		}
	}
}
