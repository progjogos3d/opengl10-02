#version 330

uniform sampler2D uTexCloud1;
uniform sampler2D uTexCloud2;

uniform vec2 uTexOffset1;
uniform vec2 uTexOffset2;

in vec2 vTexCoord;
out vec4 outColor;

in float vY;

void main() {
    //Cores do céu a serem misturadas com o mix de acordo com a altura vy
    vec3 colorLow  = vec3(0.516, 0.986, 1.000);
    vec3 colorHigh = vec3(0.133, 0.353, 0.725);

    //Imagens de nuvem a serem somadas
    vec3 texCloud1 = texture(uTexCloud1, vTexCoord + uTexOffset1).rgb;
    vec3 texCloud2 = texture(uTexCloud2, vTexCoord + uTexOffset2).rgb;

    //Mistura as cores e soma as texturas
    vec3 color = clamp(mix(colorLow, colorHigh, vY) + texCloud1 + texCloud2, 0.0, 1.0);

    outColor = vec4(color, 1.0);
}