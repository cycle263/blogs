export const a = 123;
export var b = 456;
export function c() { }
export class d { }
export default function y() { }

/*  ====>  */

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = c;
exports["default"] = y;
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var a = 123;
exports.a = a;
var b = 456;
exports.b = b;
function c() {}
var d = function d() {
  _classCallCheck(this, d);
};
exports.d = d; function y() {}
