#version 330

uniform mat4 uProjection;
uniform mat4 uView;
uniform mat4 uWorld;

in vec3 aPosition;
in vec2 aTexCoord;

out vec2 vTexCoord;

out float vY;

void main() {	
    gl_Position = uProjection * uView * uWorld * 
    	vec4(aPosition, 1.0);
    vTexCoord = aTexCoord * 2.0;
    vY = aPosition.y;
}