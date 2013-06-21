"use strict"

var bindAttribs = require("./do-bind.js")

function VAOEmulated(gl) {
  this.gl = gl
  this.elements = null
  this.attributes = null
}

VAOEmulated.prototype.bind = function() {
  bindAttribs(this.gl, this.elements, this.attributes)
}

VAOEmulated.prototype.update = function(elements, attributes) {
  this.elements = elements
  this.attributes = attributes
}

VAOEmulated.prototype.dispose = function() { }
VAOEmulated.prototype.unbind = function() { }

function createVAOEmulated(gl) {
  return new VAOEmulated(gl)
}

module.exports = createVAOEmulated