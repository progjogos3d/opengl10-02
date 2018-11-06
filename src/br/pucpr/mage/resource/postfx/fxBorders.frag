#version 330

uniform sampler2D uTexture;
uniform float width;
uniform float height;

in vec2 vTexCoord;
out vec4 outColor;

void main(void)
{
    float dx = 1.0 / width;
    float dy = 1.0 / height;

    vec3 color1 = texture(uTexture, vTexCoord + vec2(-dx, -dy)).rgb;
    vec3 color2 = 2.0 * texture(uTexture, vTexCoord + vec2(-dx, 0)).rgb;
    vec3 color3 = texture(uTexture, vTexCoord + vec2(-dx, dy)).rgb;

    vec3 color4 = texture(uTexture, vTexCoord + vec2(dx, -dy)).rgb;
    vec3 color5 = 2.0 * texture(uTexture, vTexCoord + vec2(dx, 0)).rgb;
    vec3 color6 = texture(uTexture, vTexCoord + vec2(dx, dy)).rgb;

    outColor = vec4((color1 + color2 + color3 - color4 - color5 - color6).rrr, 1.0);
}