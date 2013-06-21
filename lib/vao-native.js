"use strict"

var bindAttribs = require("./do-bind.js")

function VAONative(gl, ext, handle) {
  this.gl = gl
  this.ext = ext
  this.handle = handle
}

VAONative.prototype.bind = function() {
  this.ext.bindVertexArrayOES(this.handle)
}

VAONative.prototype.unbind = function() {
  this.ext.bindVertexArrayOES(null)
}

VAONative.prototype.dispose = function() {
  this.ext.deleteVertexArrayOES(this.handle)
}

VAONative.prototype.update = function(elements, attributes) {
  this.bind()
  bindAttribs(this.gl, elements, attributes)
  this.unbind()
}

function createVAONative(gl, ext) {
  return new VAONative(gl, ext, ext.createVertexArrayOES())
}

module.exports = createVAONative