#pragma glslify: noise = require(glsl-noise/simplex/2d)

varying vec2 vUv;
varying vec3 vPosition;

void main() {
	float brightness = noise(gl_FragCoord.xy);

	float xColor = sin((vUv.x*3.14+3.14/1.1-0.15)*1.105)*2.0;
	float yColor = sin((vUv.y*3.14+3.14/1.1-0.15)*1.105)*2.0;
	gl_FragColor = vec4(vec3(0.0, max(xColor, 0.0) + max(yColor, 0.0), 0.0), 1.);
}
