"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _configuration2 = _interopRequireDefault(require("./_configuration.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configuration, environment, ref;
environment = (ref = process.env.mode) != null ? ref : "development";
console.log(`Loading configuration for ${environment}`);
configuration = _configuration2.default[environment];
var _default = configuration;
exports.default = _default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvY29uZmlndXJhdGlvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxJQUFBLGFBQUEsRUFBQSxXQUFBLEVBQUEsR0FBQTtBQUNBLFdBQUEsR0FBQSxDQUFBLEdBQUEsR0FBQSxPQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsS0FBQSxJQUFBLEdBQUEsR0FBQSxHQUFpQyxhQUFqQztBQUNBLE9BQU8sQ0FBUCxHQUFBLENBQVksNkJBQUEsV0FBWixFQUFBO0FBQ0EsYUFBQSxHQUFnQix3QkFBYyxXQUFkLENBQWhCO2VBRWUsYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfY29uZmlndXJhdGlvbiBmcm9tIFwiLi9fY29uZmlndXJhdGlvblwiXG5lbnZpcm9ubWVudCA9IHByb2Nlc3MuZW52Lm1vZGUgPyBcImRldmVsb3BtZW50XCJcbmNvbnNvbGUubG9nIFwiTG9hZGluZyBjb25maWd1cmF0aW9uIGZvciAje2Vudmlyb25tZW50fVwiXG5jb25maWd1cmF0aW9uID0gX2NvbmZpZ3VyYXRpb25bIGVudmlyb25tZW50IF1cblxuZXhwb3J0IGRlZmF1bHQgY29uZmlndXJhdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=test/configuration.coffee