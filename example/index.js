var shell = require("gl-now")()
var createBuffer = require("gl-buffer")
var createVAO = require("../vao.js")
var createSimpleShader = require("simple-2d-shader")

var vao, shader

shell.on("gl-init", function() {
  var gl = shell.gl
  
  shader = createSimpleShader(gl)
  
  //Create vertex array object
  vao = createVAO(gl, [
    { "buffer": createBuffer(gl, [-1, 0, 0, -1, 1, 1]),
      "type": gl.FLOAT,
      "size": 2,
      "offset": 0,
      "stride": 0,
      "normalized": false
    },
    [0.8, 1, 0.5]
  ])

  gl.vertexAttrib3f(1, 1, 0, 0)
})

shell.on("gl-render", function(t) {
  var gl = shell.gl

  shader.bind()
  
  //Bind vertex array object and set locations
  vao.bind()
  shader.attributes.position.location = 0
  shader.attributes.color.location = 1

  //Draw stuff
  vao.draw(gl.TRIANGLES, 3)
  
  //Unbind vertex array when fini
  vao.unbind()
})