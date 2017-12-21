const {deltaTimeProvider} = require('./deltaTimeProvider');
const THREE = require('three');
const {getMaterial} = require('./testMaterial');

const getCubeMeshes = (xLen, yLen, zLen, size, padding) => {
	const cubes = [];
	for(let x = -xLen; x <= xLen; x ++){
		for(let y = -yLen; y <= yLen; y ++){
			for(let z = -zLen; z <= zLen; z ++){
				const geometry = new THREE.BoxBufferGeometry( size, size, size );
				const material = getMaterial();
				const cube = new THREE.Mesh(geometry, material);
				cube.position.x = x*padding;
				cube.position.y = y*padding;
				cube.position.z = z*padding;
				cubes.push(cube);
			}
		}
	}
	console.log(cubes.length);
	return cubes;
};

const sceneLoopProvider = (inputListener, windowListener) => {
	const scene = new THREE.Scene();

	const fpsCamera = new FpsCamera(inputListener);
	fpsCamera.camera.position.z = 3 * 3+ 5;
	// add ztuff to scene
	const cubeMeshes = getCubeMeshes(3, 3, 3, 1, 3);
	for(const cubeMesh of cubeMeshes){
		scene.add(cubeMesh);
	}
	return (dt, renderer) => {
		fpsCamera.update(dt)
		renderer.render(scene, fpsCamera.camera);
	};
}

class FpsCamera{
	constructor(inputListener){
		this.camera = new THREE.PerspectiveCamera();
		inputListener.subscribeToKeyboard(this);
		this.movedBetweenUpdate = new THREE.Vector3(0.0, 0.0, 0.0);
		this.moveSpeed = 5;
	}
	onKeyDown(action){
		switch(action){
			case 'up': this.movedBetweenUpdate.z = -1; break;
			case 'down': this.movedBetweenUpdate.z = 1; break;
			case 'right': this.movedBetweenUpdate.x = 1; break;
			case 'left': this.movedBetweenUpdate.x = -1; break;
		}
	}
	onKeyUp(action){
		switch(action){
			case 'up': if(this.movedBetweenUpdate.z == -1) this.movedBetweenUpdate.z = 0; break;
			case 'down': if(this.movedBetweenUpdate.z == 1) this.movedBetweenUpdate.z = 0; break;
			case 'right': if(this.movedBetweenUpdate.x == 1) this.movedBetweenUpdate.x = 0; break;
			case 'left': if(this.movedBetweenUpdate.x == -1) this.movedBetweenUpdate.x = 0; break;
		}
	}
	update(dt){
		this.camera.translateZ(this.movedBetweenUpdate.z*dt*this.moveSpeed);
		this.camera.translateX(this.movedBetweenUpdate.x*dt*this.moveSpeed);
	}
}

const mainLoopProvider = (renderer, inputListener, windowListener) => {
	const deltaTimeFunc = deltaTimeProvider(1000);
	const sceneLoop = sceneLoopProvider(inputListener, windowListener);
	const mainLoop = () => {
		requestAnimationFrame(mainLoop);
		sceneLoop(deltaTimeFunc(), renderer);
	}
	return mainLoop;
}

export {
	mainLoopProvider
}
