"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toArray = exports.eq = void 0;

var Type = _interopRequireWildcard(require("@dashkite/joy/type"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var eq, toArray;
exports.toArray = toArray;
exports.eq = eq;

exports.eq = eq = function (a, b) {
  return a === b;
};

exports.toArray = toArray = function (x) {
  if (Type.isArray(x)) {
    return x;
  } else if (Type.isDefined(x)) {
    return [x];
  } else {
    return [];
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9oZWxwZXJzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7OztBQUFBLElBQUEsRUFBQSxFQUFBLE9BQUE7Ozs7QUFFQSxhQUFBLEVBQUEsR0FBSyxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7U0FBUyxDQUFBLEtBQUssQztBQUFkLENBQUw7O0FBRUEsa0JBQUEsT0FBQSxHQUFVLFVBQUEsQ0FBQSxFQUFBO0FBQ1IsTUFBRyxJQUFJLENBQUosT0FBQSxDQUFILENBQUcsQ0FBSCxFQUFBO1dBQUEsQztBQUFBLEdBQUEsTUFFSyxJQUFHLElBQUksQ0FBSixTQUFBLENBQUgsQ0FBRyxDQUFILEVBQUE7V0FDSCxDQURHLENBQ0gsQztBQURHLEdBQUEsTUFBQTtXQUFBLEU7O0FBSEcsQ0FBViIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFR5cGUgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvdHlwZVwiXG5cbmVxID0gKGEsYikgLT4gYSA9PSBiXG5cbnRvQXJyYXkgPSAoeCkgLT5cbiAgaWYgVHlwZS5pc0FycmF5IHhcbiAgICB4XG4gIGVsc2UgaWYgVHlwZS5pc0RlZmluZWQgeFxuICAgIFsgeCBdXG4gIGVsc2VcbiAgICBbXVxuXG5leHBvcnQge1xuICBlcVxuICB0b0FycmF5XG59Il0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=src/helpers.coffee