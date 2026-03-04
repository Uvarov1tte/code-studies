// attribute vec3 position;

// uniform mat4 projectionMatrix;
// uniform mat4 modelViewMatrix;

// uniform mat4 modelMatrix;
// uniform mat4 viewMatrix;

uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
    vPosition = position;
    vNormal = normal;
    vUv = uv;

    //transform -> position, scale, rotation
    //modelMatrix -> position, scale, rotation
    //view -> position, orientation of camera
    //projectionmatrix -> projects our obj onto the screen (w aspect ratio and perspective)

    //MVP projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

    vec4 modelViewPosition = modelViewMatrix * vec4(vPosition, 1.0);
    vec4 projectedPosition = projectionMatrix * modelViewPosition;
    gl_Position = projectedPosition;
}