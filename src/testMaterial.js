const fragmentShader = require('./shaders/test.frag');
const vertexShader = require('./shaders/test.vert');
const THREE = require('three');

const getMaterial = () => {
	const uniforms = () => ({
		u_time: {
			type: "f",
			value: 1.0
		},
		u_resolution: {
			type: "v2",
			value: new THREE.Vector2()
		},
		u_mouse: {
			type: "v2",
			value: new THREE.Vector2()
		}
	});
    return new THREE.ShaderMaterial({
		uniforms,
        vertexShader,
        fragmentShader
    });
}

export {
	getMaterial
}
