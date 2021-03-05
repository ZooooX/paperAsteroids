import Bullet from './Bullet.js';

/** SHIP **/
export default class Ship{
	constructor(){
		this.spaceshipUrl = './assets/svgs/spaceship.svg';

		this.spaceship = new Raster({
			source : this.spaceshipUrl,
			position: view.center,
			size : new Size(50,50)
		});
		
		this.bullets = [];

		this.fireAudioFile = "./assets/sounds/sf_laser_15.mp3"; 
	}


	moveShip(vector,event){
		this.spaceship.rotation = vector.angle-130;
		this.moveBullets();
	}

	moveBullets(){
		let bulletsToDestroy = [];

		this.bullets.forEach((bullet,i) => {
			bullet.move();
			if(bullet.timeRemaining == 0){
				bulletsToDestroy.push(i);
			}
		});

		bulletsToDestroy.reverse();

		bulletsToDestroy.forEach(bullet => {
			this.bullets[bullet].destroy();
			this.bullets.splice(bullet,1);
		});
	}

	fire(point){
		let audio = new Audio(this.fireAudioFile);
		audio.play();
		this.bullets.push(new Bullet(view.center.subtract(point).multiply(-1).normalize(10)));	
	}

	destroyBullets(){
		this.bullets.forEach(bullet => {
			bullet.destroy();
		});

		this.bullets = [];
	}

}