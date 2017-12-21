require('./theme/index.css');
const THREE = require('three');
const {WindowListener} = require('./windowListener');
const {InputListener} = require('./inputListener');
const {mainLoopProvider} = require('./update');

// only handles onWindowResize currenlty, .. todo: remove this class
class RendererController{
	constructor(windowListener){
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.onWindowResize.bind(this);
		windowListener.subscribeToWindowResize(this);
	}
	onWindowResize({width, height}){
		this.renderer.setSize(width, height);
	}
	getRenderer(){
		return this.renderer;
	}
}

const initApp = () => {
	//listeners
	const inputListener = new InputListener();
	const windowListener = new WindowListener();

	//renderer
	const rendererController = new RendererController(windowListener);
	const renderer = rendererController.getRenderer();
    document.body.appendChild(renderer.domElement);

	const mainLoop = mainLoopProvider(renderer, inputListener, windowListener);
	//phony resize, so everyone gets the windowsize
	windowListener.onWindowResize();
	//start mainLoop
	mainLoop();
}

initApp();
