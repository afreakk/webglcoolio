const deltaTimeProvider = (deltaTimeDivider) => {
	let lastTime = Date.now();
	return () => {
		const now = Date.now();
		const dt = (now - lastTime)/deltaTimeDivider;
		lastTime = now;
		return dt;
	};
};

export {
	deltaTimeProvider,
}
