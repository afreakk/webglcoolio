class InputListener{
	constructor(){
		this.keyToActionMapping = {
			's': 'down',
			'w': 'up',
			'a': 'left',
			'd': 'right',
		};
		this.movementSubscribers = [];
		this.mouseSubscribers = [];
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		window.addEventListener('mousemove', this.onMouseMove)
		window.addEventListener('keydown', this.onKeyDown);
		window.addEventListener('keyup', this.onKeyUp);
	}
	subscribeToKeyboard(subsriber){
		this.movementSubscribers.push(subsriber);
	}
	subscribeToMouse(subsriber){
		this.mouseSubscribers.push(subsriber);
	}
	onKeyDown(keyboardEvent) {
		const key = keyboardEvent.key;
		if(key in this.keyToActionMapping){
			sendNotificationToSubscribers(
				this.movementSubscribers, 'onKeyDown', this.keyToActionMapping[key]
			);
		}
	};
	onKeyUp(keyboardEvent) {
		const key = keyboardEvent.key;
		if(key in this.keyToActionMapping){
			sendNotificationToSubscribers(
				this.movementSubscribers, 'onKeyUp', this.keyToActionMapping[key]
			);
		}
	};
	onMouseMove(mouseEvent) {
		sendNotificationToSubscribers(this.mouseSubscribers, 'onMouseMove', {
			x: mouseEvent.pageX,
			y: mouseEvent.pageY
		});
	};
}

const sendNotificationToSubscribers = (subscribers, callbackName, message) => {
	for(const subsriber of subscribers){
		subsriber[callbackName](message);
	}
}

export {
	InputListener
}
