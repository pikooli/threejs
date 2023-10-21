import { Effect } from "postprocessing";
import { Uniform } from "three";
import { BlendFunction } from "postprocessing";

const fragmentShader = /* glsl*/ `
    uniform float frequency;
    uniform float amplitude;
    uniform float offset;

    void mainUv(inout vec2 uv){
        uv.y += sin(uv.x * frequency + offset) * amplitude;
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor){
        vec4 color = inputColor;
        color.rgb *= vec3(0.8, 1.0, 0.5);
        outputColor = color;
    }
`;

export default class DrunkEffect extends Effect {
  constructor({
    drufrequency,
    amplitude,
    blendFunction = BlendFunction.DARKEN,
  }) {
    super("DrunkEffect", fragmentShader, {
      blendFunction: blendFunction,
      uniforms: new Map([
        // ["frequency", { value: drufrequency }],
        // ["amplitude", { value: amplitude }],
        ["frequency", new Uniform(drufrequency)],
        ["amplitude", new Uniform(amplitude)],
        ["offset", new Uniform(0)],
      ]),
    });
  }

  update(rendered, inputBuffer, deltaTime) {
    this.uniforms.get("offset").value += deltaTime;
  }
}
