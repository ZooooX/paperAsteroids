export default class Bullet{
    constructor(vector){

        this.path = new Path.Circle({
			center : [0,0],
			radius : 5,
			fillColor : 'yellow',
			strokeColor : 'black'
		});

        this.symbol = new Symbol(this.path);
        this.placedBullet = this.symbol.place(view.center);

        this.vector = vector;
        this.timeRemaining = 60;

    }

    move(){
        this.placedBullet.position = this.placedBullet.position.add(this.vector);
        this.timeRemaining--;
    }

    destroy(){
        this.placedBullet.remove();
    }

    getBullet(){
        return this.placedBullet;
    }
}