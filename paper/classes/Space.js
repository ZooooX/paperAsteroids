import Stars from './Stars.js';
import Ship from './Ship.js';
import WhiteHole from './WhiteHole.js';
import Asteroid from './Asteroid.js';
import Score from './Score.js';
import {getRandomViewBorderPoint} from '../helpers/Utils.js';

/** SPACE **/
export default class Space{

    constructor(){
        this.mousePos = view.center.add([view.bounds.width / 3, 100]);
        this.position = view.center;

        this.vector = new Point({
            angle: 45,
            length: 0
        });
    
        this.mouseVector = this.vector.clone();

        //objects
        this.stars = new Stars();
        this.ship = new Ship();
        this.whiteHole = new WhiteHole();
        this.score = new Score();
        this.asteroids = [];

        //game is stopped variable
        this.stopped = false;

        //next asteroid spawn (in frames)
        this.spawnTime = 30;
        this.nextSpawn = this.spawnTime;

        this.explosionAudioFile = "./assets/sounds/SFB-explosion2.mp3";


        this.tool = new paper.Tool();

        this.setupEvents();
    }


    setupEvents(){
        // Escape pause - Pause other events and resume them if needed
        this.tool.on("keydown", this.handleKeyDown.bind(this));

        // mouse move
        view.on("mousemove", this.handleMouseMove.bind(this));


        // frame - 60frame/s
        view.on("frame", this.handleFrame.bind(this));

        // click
        view.on("click", this.handleClick.bind(this));
    }

    handleClick(event){
        if(!this.stopped){
            this.ship.fire(event.point);
        }
    }

    handleFrame(event){
        this.vector = this.vector.add((this.mouseVector.divide(4).subtract(this.vector)));
        this.stars.moveStars(this.vector);
        this.ship.moveShip(this.mouseVector, event);
        this.whiteHole.moveWhiteHole(this.vector);
        this.spawnAsteroid();

        if(this.asteroids.length != 0){
            this.moveAsteroids();
        }
    }

    handleMouseMove(event){
        this.mousePos = event.point;
        this.mouseVector = view.center.subtract(event.point);
        return false; // Prevent touch scrolling
    }

    handleKeyDown(event){
        if (event.key == "escape") {
            if (!this.stopped) {
                view.pause();
                this.stopped = true;
            }
            else {
                view.play();
                this.stopped = false;
            }
        }
    }

    spawnAsteroid(){
        // handle spawn
        if(this.nextSpawn == 0){
            let spawnPointEdge = getRandomViewBorderPoint();
            let spawnPoint = spawnPointEdge.point;
            let spawnEdge = spawnPointEdge.edge;

            let directionPoint = getRandomViewBorderPoint(spawnEdge).point;

            let vector = spawnPoint.subtract(directionPoint).multiply(-1).normalize(10);
            //console.log("created asteroid : " + spawnPoint + " / " + directionPoint);
            this.asteroids.push(new Asteroid(spawnPoint, vector));
            this.nextSpawn = this.spawnTime;
        }
        else{
            this.nextSpawn--;
        }
    }

    moveAsteroids(){
        let asteroidsToDestroy = [];
        let bulletsToDestroy = [];

        this.asteroids.forEach((asteroid,i) => {
            asteroid.move(this.vector);
            
            //if asteroid is too far, destroy it for performance 
            if(!asteroid.isInside(view.bounds.expand(1000))){
                asteroidsToDestroy.push(i);
            }

            //ship collision with asteroid
            if(asteroid.getAsteroid().contains(view.center)){
                this.resetSpace();
                this.score.resetScore();
            }

            //bullet collision with asteroids
            this.ship.bullets.forEach( (bullet,j) => {
                if(bullet.getBullet().intersects(asteroid.getAsteroid())){
                    asteroidsToDestroy.push(i);
                    bulletsToDestroy.push(j);
                    let audio = new Audio(this.explosionAudioFile);
                    audio.play();

                    this.score.addScore(1);
                }
            });
        });

        asteroidsToDestroy.reverse();

		asteroidsToDestroy.forEach(asteroid => {
			this.asteroids[asteroid].destroy();
			this.asteroids.splice(asteroid,1);
		});

        bulletsToDestroy.forEach(bullet => {
			this.ship.bullets[bullet].destroy();
			this.ship.bullets.splice(bullet,1);
		});
    }

    resetSpace(){
        this.destroyAsteroids();
        this.ship.destroyBullets();
        this.whiteHole.resetPosition();
    }

    destroyAsteroids(){
        this.asteroids.forEach(asteroid => {
            asteroid.destroy();
        });

        this.asteroids = [];
    }
}