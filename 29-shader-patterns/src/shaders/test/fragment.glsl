varying vec2 vUv;

void main()
{
    // Pattern 1
    // gl_FragColor = vec4(vUv, 1.0, 1.0);
    // gl_FragColor = vec4(vUv.x,vUv.y, 1.0, 1.0);

    // Pattern 2
    // gl_FragColor = vec4(vUv.x,vUv.y, 0.0, 1.0);

    // Pattern 3
    // gl_FragColor = vec4(vUv.x,vUv.y, 0.5, 1.0);

    // Pattern 4
    // gl_FragColor = vec4(vUv.x, vUv.x, vUv.x, 1.0);

    // Pattern 5
    // float strength = vUv.x;
    // gl_FragColor = vec4(vec3(strength), 1.0);

    // Pattern 6
    // float strength = vUv.y;
    // gl_FragColor = vec4(vec3(strength), 1.0);

    // Pattern 7
    // float strength = 1.0 - vUv.y ;
    // gl_FragColor = vec4(vec3(strength), 1.0);

    // Pattern 8
    // float strength = vUv.y  * 10.0;
    // gl_FragColor = vec4(vec3(strength), 1.0);

    // Pattern 9 
    // float strength = mod(vUv.y * 10.0, 1.0);
    // gl_FragColor = vec4(vec3(strength), 1.0);

    // Pattern 10
    // float strength = mod(vUv.y * 10.0, 1.0);
    // // Don't use if , it bad for performance
    // // strength = strength < 0.5 ? 0.0 : 1.0 ;
    // // use step instead
    // strength = step(0.5, strength);
    // gl_FragColor = vec4(vec3(strength), 1.0);

    // Pattern 11
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.8, strength);
    // gl_FragColor = vec4(vec3(strength), 1.0);

    // Pattern 12
    // float strength = mod(vUv.x * 10.0, 1.0); 
    // strength = step(0.8, strength);
    // gl_FragColor = vec4(vec3(strength), 1.0);

    // Pattern 13
    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0)); 
    // strength += step(0.8, mod(vUv.y * 10.0, 1.0));

    // gl_FragColor = vec4(vec3(strength), 1.0);

    // Pattern 14
    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0)); 
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

    // gl_FragColor = vec4(vec3(strength), 1.0);

    // Pattern 15
    // float strength = step(0.4, mod(vUv.x * 10.0, 1.0)); 
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

    // gl_FragColor = vec4(vec3(strength), 1.0); 

    // Pattern 16
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0)); 
    // barX *= step(0.8, mod(vUv.y * 10.0, 1.0));

    // float barY = step(0.8, mod(vUv.x * 10.0, 1.0)); 
    // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

    // float strength = barX + barY;

    // gl_FragColor = vec4(vec3(strength), 1.0); 

    // Pattern 17
    // float barX = step(0.4 , mod(vUv.x * 10.0, 1.0)); 
    // barX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));

    // float barY = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0)); 
    // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

    // float strength = barX + barY;
    
    // gl_FragColor = vec4(vec3(strength), 1.0); 

    // Pattern 18
    // float strength = abs(vUv.x - 0.5);
    // gl_FragColor = vec4(vec3(strength), 1.0); 

    // Pattern 19
    // float strength =  min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    // gl_FragColor = vec4(vec3(strength), 1.0); 

    // Pattern 20
    float strength =  max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    gl_FragColor = vec4(vec3(strength), 1.0);  
} 