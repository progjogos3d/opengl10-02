package br.pucpr.mage.phong;

import static org.lwjgl.opengl.GL13.GL_TEXTURE0;
import static org.lwjgl.opengl.GL13.glActiveTexture;

import java.util.HashMap;
import java.util.Map;

import br.pucpr.mage.Material;
import br.pucpr.mage.Shader;
import br.pucpr.mage.Texture;
import org.joml.Vector2f;

public class SkyMaterial implements Material {
	
    private Map<String, Texture> textures = new HashMap<>();
    private Shader shader = Shader.loadProgram("/br/pucpr/mage/resource/phong/sky");

    @Override
    public Shader getShader() {
        return shader;
    }

    @Override
    public void setShader(Shader shader) {
        if (shader == null) {
            throw new IllegalArgumentException("Shader cannot be null!");
        }
        this.shader = shader;
    }
    
    public SkyMaterial setTexture(String name, Texture texture) {
        if (texture == null) {
            textures.remove(name);
        } else {
            textures.put(name, texture);
        }
        return this;
    }

    public SkyMaterial update(float secs) {
        return this;
    }

    public SkyMaterial setCloud1(Texture texture) {
        return setTexture("uTexCloud1", texture);
    }

    public SkyMaterial setCloud2(Texture texture) {
        return setTexture("uTexCloud2", texture);
    }

    public SkyMaterial setOffset1(Vector2f offset) {
        shader.bind().setUniform("uTexOffset1", offset).unbind();
        return this;
    }

    public SkyMaterial setOffset2(Vector2f offset) {
        shader.bind().setUniform("uTexOffset2", offset).unbind();
        return this;
    }

    @Override
    public void apply() {
        int texCount = 0;        
        for (Map.Entry<String, Texture> entry : textures.entrySet()) {
            glActiveTexture(GL_TEXTURE0 + texCount);
            entry.getValue().bind();
            shader.setUniform(entry.getKey(), texCount);
            texCount = texCount + 1;            
        }
    }


}
