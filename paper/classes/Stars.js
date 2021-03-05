/** STARS **/
export default class Stars {
	constructor() {
		// The amount of stars we want to place;
		this.count = 50;

		// Create a symbol, which we will use to place instances of later:
		// little stars
		this.path = new Path.Circle({
			center: [0, 0],
			radius: 5,
			fillColor: 'white',
			strokeColor: 'black'
		});

		this.symbol = new Symbol(this.path);

		// Place the instances of the symbol:
		for (var i = 0; i < this.count; i++) {
			// The center position is a random point in the view:
			var center = Point.random().multiply(view.size);
			var placed = this.symbol.place(center);
			placed.scale(i / this.count + 0.001);
			placed.data.vector = new Point({
				angle: Math.random() * 360,
				length: (i / this.count) * Math.random() / 5
			});
		}
	}

	keepInView(item){
		var position = item.position;
		var viewBounds = view.bounds;
		if (position.isInside(viewBounds))
			return;
		var itemBounds = item.bounds;
		if (position.x > viewBounds.width + 5) {
			position.x = -item.bounds.width;
		}

		if (position.x < -itemBounds.width - 5) {
			position.x = viewBounds.width;
		}

		if (position.y > viewBounds.height + 5) {
			position.y = -itemBounds.height;
		}

		if (position.y < -itemBounds.height - 5) {
			position.y = viewBounds.height;
		}
	};

	moveStars(vector){
		// Run through the active layer's children list and change
		// the position of the placed symbols:
		var layer = project.activeLayer;
		for (var i = 0; i < this.count; i++) {
			var item = layer.children[i];
			var size = item.bounds.size;
			var length = vector.length / 10 * size.width / 10;
			item.position = item.position.add(vector.normalize(length).add(item.data.vector));
			this.keepInView(item);
		}
	};
}