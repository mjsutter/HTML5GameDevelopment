class NumberedBox extends createjs.Container {
    constructor(number = 0) {
        super();

        var movieClip = new lib.NumberedBox();
        movieClip.numberText.text = number;
        this.addChild(movieClip);

        movieClip.x = Math.random() * 200;
        movieClip.y = Math.random() * 200;
    }
}

class Game {
    constructor() {
        console.log(`Welcome to the game. Version ${this.version()}`);

        this.canvas = document.getElementById("gameCanvas");
        this.stage = new createjs.Stage(this.canvas);

        createjs.Ticker.setFPS(60);
        createjs.Ticker.on("tick", this.stage);

        var circle = new createjs.Shape();
        circle.graphics.beginFill("red").drawCircle(0, 0, 40);
        circle.x = circle.y = 100;
        this.stage.addChild(circle);
    }

    version() {
        return '1.0.0';
    }
} 

var game = new Game();