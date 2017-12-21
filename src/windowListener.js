
class WindowListener{
	constructor(){
		this.windowResizeSubscribers = [];
		this.onWindowResize = this.onWindowResize.bind(this);
		window.addEventListener('resize', this.onWindowResize, false);
	}
	subscribeToWindowResize(subsriber) {
		this.windowResizeSubscribers.push(subsriber)
	}
	onWindowResize() {
		sendNotificationToSubscribers(this.windowResizeSubscribers, 'onWindowResize', {
			width: window.innerWidth, height: window.innerHeight
		});
	};
}

const sendNotificationToSubscribers = (subscribers, callbackName, message) => {
	for(const subsriber of subscribers){
		subsriber[callbackName](message);
	}
}

export {
	WindowListener
}
