class NumberedBox extends createjs.Container {
    constructor(game, number = 0) {
        super();

        this.game = game;

        var movieClip = new lib.NumberedBox();
        movieClip.numberText.text = number;
        this.addChild(movieClip);

        this.setBounds(0, 0, 50, 50);

        //handle click events
        this.on("click", this.handleClick.bind(this));
    }

    handleClick() {
        this.game.handleClick(this);
    }
}

class Game {
    constructor() {
        console.log(`Welcome to the game. Version ${this.version()}`);

        this.canvas = document.getElementById("gameCanvas");
        this.stage = new createjs.Stage(this.canvas);

        this.stage.width = this.canvas.width;
        this.stage.height = this.canvas.height;

        //enable retina screen
        this.retinalize();

        //enable touch support
        createjs.Touch.enable(this.stage);

        createjs.Ticker.setFPS(60);

        //keep redrawing the stage
        createjs.Ticker.on("tick", this.stage);

        //add background 
        this.stage.addChild(new lib.Background());

        this.generateBoxes(10);
    }

    version() {
        return '1.0.0';
    }

    generateBoxes(amount = 10) {
        for (var i = amount; i > 0; i--) {
            var movieClip = new NumberedBox(this,i);
            this.stage.addChild(movieClip);

            //place box randomly on stage
            movieClip.x = Math.random() * (this.stage.width - movieClip.getBounds().width);
            movieClip.y = Math.random() * (this.stage.height - movieClip.getBounds().height);
        }
    }

    handleClick(numberedBox) {
        this.stage.removeChild(numberedBox);
    }
    retinalize() {
        this.stage.width = this.canvas.width;
        this.stage.height = this.canvas.height;

        let ratio = window.devicePixelRatio;
        if (ratio === undefined) {
            return;
        }

        this.canvas.setAttribute('width', Math.round(this.stage.width * ratio));
        this.canvas.setAttribute('height', Math.round(this.stage.height * ratio));

        this.stage.scaleX = this.stage.scaleY = ratio;

        //set css width and height of canvas to original height and width
        this.canvas.style.width = this.stage.width + "px";
        this.canvas.style.height = this.stage.height + "px";
    }
}

var game = new Game();