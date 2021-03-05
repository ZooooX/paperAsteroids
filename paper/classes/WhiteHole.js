import Arrow from "./Arrow.js";

/** WHITE HOLE **/
export default class WhiteHole{
	constructor(){
        this.name = 'White Hole'; 

		// white hole
		this.whiteHoleStartPoint = new Point(-2000,-2000);
		this.whiteHole = new Path.Star({
			center: [0, 0],
			points:100,
			radius1:100,
			radius2:300,
			fillColor: 'white',
		});
	
		this.symbolWhiteHole = new Symbol(this.whiteHole);
	
		this.placedWhiteHole = this.symbolWhiteHole.place(this.whiteHoleStartPoint);
        
        this.arrow = new Arrow(this.name,this.placedWhiteHole);
	}

	moveWhiteHole(vector){
        var length = vector.length / 10;
		this.placedWhiteHole.position = this.placedWhiteHole.position.add(vector.normalize(length).add(this.placedWhiteHole.data.vector));
        this.arrow.follow();
        if(this.isInFrame(this.placedWhiteHole)){
            this.arrow.disableArrow();
        }
        else{
            this.arrow.enableArrow();
        }

        if(this.placedWhiteHole.contains(view.center)){
            this.resetPosition();
        }
    }

    isInFrame(obj){
        return (obj.position.x > 0 && obj.position.x < view.bounds.width && obj.position.y > 0 && obj.position.y < view.bounds.height);
    }

    resetPosition(){
        this.placedWhiteHole.position = this.whiteHoleStartPoint;
    }
}