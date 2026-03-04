// precision mediump float;
uniform float uTime;
uniform float uRadius;
uniform sampler2D uTexture;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

//signed distance fields
float drawCircle(vec2 position, vec2 center, float radius) {
    return step(radius, distance(position, center));
}

float sdBox(in vec2 p, in vec2 b) {
    vec2 d = abs(p) - b;
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

void main() {
    // vec2 uv = vUv;
    // uv -= vec2(0.5);
    // uv *= 2.0;

    // vec3 vectorA = vec3(1.0);
    // vec3 vectorB = vec3(0.0);
    // float dotProduct = dot(vectorA, vectorB);
    // dot product = 1 -> same direction
    // dot product = 0 -> prependicular

    // vec3 viewDirection = normalize(cameraPosition - vPosition);
    // float fresnel = 1.0 - dot(viewDirection, vNormal);
    // line 
    // step(0.99, 1.0 - abs(vUv.y - 0.5))
    // circle 
    // step(uRadius, length(vUv - 0.5))
    // drawCircle(vUv, vec2(0.5), uRadius)

    //rounded square
    // step(0.8, 1.0-sdBox(vUv - 0.5, vec2(0.15)))

    const vec3 DESATURATE = vec3(0.2126, 0.7152, 0.0722);
    vec3 color = texture2D(uTexture, vUv).xyz;

    float finalColor = dot(DESATURATE, color);

    vec4 defaultColor = vec4(vec3(finalColor), 1.00);
    gl_FragColor = defaultColor;
}