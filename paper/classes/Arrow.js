export default class Arrow{
    constructor(name,linkedObject){
        this.path = new Path();

        this.path.add(new Point(80, 90));
        this.path.add(new Point(40, 90));
        this.path.add(new Point(90, 40));
        this.path.add(new Point(140, 90));
        this.path.add(new Point(100, 90));
        this.path.add(new Point(100, 150));
        this.path.add(new Point(80, 150));
        this.path.closed = true;
        this.path.fillColor = 'red';

        // Create a point-text item at {x: 30, y: 30}:
        this.linkedObjectText = new PointText(new Point(25,170));
        this.linkedObjectText.fillColor = 'white';

        this.group = new Group([this.path,this.linkedObjectText]);
        this.symbol = new Symbol(this.group);
        this.placedArrow = this.symbol.place(new Point(view.size.width * 0.90, view.size.height * 0.10));

        this.linkedObject = linkedObject;
        this.linkedObjectName = name;
    }

    follow(){
        var distance = view.center.subtract(this.linkedObject.position);
	    this.linkedObjectText.content = this.linkedObjectName +' : ('+ -distance.x.toFixed(0) +','+ distance.y.toFixed(0) +')';
        this.placedArrow.rotation = distance.angle-90;
    }

    disableArrow(){
        this.group.visible = false;
    }

    enableArrow(){
        this.group.visible = true;
    }
}