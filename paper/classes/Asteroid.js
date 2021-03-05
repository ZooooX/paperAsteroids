export default class Asteroid{
    constructor(spawnPoint,vector){

        this.url = this.setUrl();

        this.asteroid = new Raster({
            source : this.url,
			size : new Size(50,50)
        });

        this.symbol = new Symbol(this.asteroid);

        this.placedAsteroid = this.symbol.place(spawnPoint);

        this.asteroid.scale(Math.random() * (2 - 1) + 1);

        this.rotatingDirection = this.selectRotatingDir();
        this.vector = vector;
    }

    rotate(){
        if(this.rotatingDirection == 'left'){
            this.asteroid.rotate(-3);
        }
        
        if(this.rotatingDirection == 'right'){
            this.asteroid.rotate(3);
        }
    }

    selectRotatingDir(){
        const dirs = ['left','right'];
        return dirs[Math.floor(Math.random() * Math.floor(dirs.length))];
    }

    setUrl(){
        const urls = ['./assets/svgs/asteroid.svg','./assets/svgs/rock.svg'];
        return urls[Math.floor(Math.random() * Math.floor(urls.length))];
    }

    move(vectorToAdd){
        this.placedAsteroid.position = this.placedAsteroid.position.add(this.vector).add(vectorToAdd.divide(10));
        this.rotate();
    }

    destroy(){
        this.placedAsteroid.remove();
    }

    isInside(rect){
        return this.placedAsteroid.isInside(rect);
    }

    getSize(){
        return this.placedAsteroid.size;
    }

    getAsteroid(){
        return this.placedAsteroid;
    }
}