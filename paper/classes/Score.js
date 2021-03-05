export default class Score{
    constructor(){
        this.score = 0;

        this.text = new PointText({
            point : [0,0],
            fontSize: 25,
            fillColor : "red",
        });

        this.refreshScore();

        this.symbol = new Symbol(this.text);

        this.placedText = this.symbol.place(new Point(view.size.width * 0.90, view.size.height * 0.90));
    }

    addScore(number){
        this.score += number;
        this.refreshScore();
    }

    refreshScore(){
        this.text.content = 'Score : ' + this.score;
    }

    resetScore(){
        this.score = 0;
        this.refreshScore();
    }
}