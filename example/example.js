var shell = require("gl-now")()
var createBuffer = require("gl-buffer")
var createVAO = require("../vao.js")
var glslify = require("glslify")

var createShader = glslify({
  vertex: "\
    attribute vec2 position;\
    attribute vec3 color;\
    varying vec3 fragColor;\
    void main() {\
      gl_Position = vec4(position, 0, 1.0);\
      fragColor = color;\
    }",
  fragment: "\
    precision highp float;\
    varying vec3 fragColor;\
    void main() {\
      gl_FragColor = vec4(fragColor, 1.0);\
    }",
  inline: true
})

var vao, shader

shell.on("gl-init", function() {
  var gl = shell.gl
  
  //Create shader object
  shader = createShader(gl)
  shader.attributes.position.location = 0
  shader.attributes.color.location = 1
  
  //Create vertex array object
  vao = createVAO(gl, [
    { "buffer": createBuffer(gl, [-1, 0, 0, -1, 1, 1]),
      "type": gl.FLOAT,
      "size": 2
    },
    [0.8, 1, 0.5]
  ])
})

shell.on("gl-render", function(t) {
  var gl = shell.gl

  //Bind the shader
  shader.bind()
  
  //Bind vertex array object and draw it
  vao.bind()
  vao.draw(gl.TRIANGLES, 3)
  
  //Unbind vertex array when fini
  vao.unbind()
})