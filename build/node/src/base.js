"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Base = void 0;

var It = _interopRequireWildcard(require("@dashkite/joy/iterable"));

var _secrets = require("@dashkite/dolores/secrets");

var _airtable = _interopRequireDefault(require("airtable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Base;
exports.Base = Base;
exports.Base = Base = class Base {
  static async create({
    key,
    base
  }) {
    var client;
    client = new _airtable.default({
      apiKey: await (0, _secrets.getSecret)(key)
    });
    base = client.base(base);
    return Object.assign(new this(), {
      _: {
        client,
        base
      }
    });
  }

  selectOne({
    table,
    query
  }) {
    query = this._.base(table).select({
      filterByFormula: query,
      maxRecords: 1
    });
    return new Promise(function (resolve, reject) {
      return query.firstPage(function (error, records) {
        if (error != null) {
          return reject(error);
        } else {
          return resolve(records[0]);
        }
      });
    });
  }

  selectAll({
    table,
    query
  }) {
    query = this._.base(table).select({
      filterByFormula: query
    });
    return new Promise(function (resolve, reject) {
      return query.firstPage(function (error, records) {
        if (error != null) {
          return reject(error);
        } else {
          return resolve(records);
        }
      });
    });
  }

  find({
    table,
    id
  }) {
    return new Promise((resolve, reject) => {
      return this._.base(table).find(id, function (error, record) {
        if (error != null) {
          reject(error);
        } else {}

        return resolve(record);
      });
    });
  }

  findAll({
    table,
    ids
  }) {
    return this.selectAll({
      table: table,
      query: function () {
        var conditions;

        conditions = function () {
          var i, id, len, results;
          results = [];

          for (i = 0, len = ids.length; i < len; i++) {
            id = ids[i];
            results.push(`RECORD_ID() = '${id}'`);
          }

          return results;
        }();

        return `OR( ${It.join(", ", conditions)})`;
      }()
    });
  }

};
//# sourceMappingURL=data:application/json;base64,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LEVBQUEsRUFBQSxFQUFBLEdBQUEsRUFBQSxPQUFBO0FBQVUsVUFBQSxPQUFBLEdBQUEsRUFBQTs7QUFBQSxlQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsR0FBQSxHQUFBLEdBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxHQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQTs7b0JBQ0UsSSxDQUFBLGtCQUFBLEVBQUEsRztBQURGOzs7QUFEYyxTQUFBLEVBQWhCOztBQUdBLGVBQUEsT0FBUSxFQUFFLENBQUYsSUFBQSxDQUFBLElBQUEsRUFBUixVQUFRLENBQVIsR0FBQTtBQUpRLE9BQUE7QUFEVixLQURGLEM7QUFETzs7QUFwQ1gsQ0FBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEl0IGZyb20gXCJAZGFzaGtpdGUvam95L2l0ZXJhYmxlXCJcbmltcG9ydCB7IGdldFNlY3JldCB9IGZyb20gXCJAZGFzaGtpdGUvZG9sb3Jlcy9zZWNyZXRzXCJcbmltcG9ydCBBaXJ0YWJsZSBmcm9tIFwiYWlydGFibGVcIlxuXG5jbGFzcyBCYXNlXG5cbiAgQGNyZWF0ZTogKHtrZXksIGJhc2V9KSAtPlxuICAgIGNsaWVudCA9IG5ldyBBaXJ0YWJsZSBhcGlLZXk6IGF3YWl0IGdldFNlY3JldCBrZXlcbiAgICBiYXNlID0gY2xpZW50LmJhc2UgYmFzZVxuICAgIE9iamVjdC5hc3NpZ24gKG5ldyBAKSwgXzogeyBjbGllbnQsIGJhc2UgfVxuXG4gIHNlbGVjdE9uZTogKHsgdGFibGUsIHF1ZXJ5IH0pIC0+XG4gICAgcXVlcnkgPSAoIEBfLmJhc2UgdGFibGUgKS5zZWxlY3RcbiAgICAgIGZpbHRlckJ5Rm9ybXVsYTogcXVlcnlcbiAgICAgIG1heFJlY29yZHM6IDFcbiAgICBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSAtPlxuICAgICAgcXVlcnkuZmlyc3RQYWdlIChlcnJvciwgcmVjb3JkcykgLT5cbiAgICAgICAgaWYgZXJyb3I/XG4gICAgICAgICAgcmVqZWN0IGVycm9yXG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZXNvbHZlIHJlY29yZHNbMF1cblxuICBzZWxlY3RBbGw6ICh7IHRhYmxlLCBxdWVyeSB9KSAtPlxuICAgIHF1ZXJ5ID0gKCBAXy5iYXNlIHRhYmxlICkuc2VsZWN0XG4gICAgICBmaWx0ZXJCeUZvcm11bGE6IHF1ZXJ5XG4gICAgbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgLT5cbiAgICAgIHF1ZXJ5LmZpcnN0UGFnZSAoZXJyb3IsIHJlY29yZHMpIC0+XG4gICAgICAgIGlmIGVycm9yP1xuICAgICAgICAgIHJlamVjdCBlcnJvclxuICAgICAgICBlbHNlXG4gICAgICAgICAgcmVzb2x2ZSByZWNvcmRzXG5cbiAgZmluZDogKHsgdGFibGUsIGlkIH0pIC0+XG4gICAgbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICAgICggQF8uYmFzZSB0YWJsZSApLmZpbmQgaWQsIChlcnJvciwgcmVjb3JkKSAtPlxuICAgICAgICBpZiBlcnJvcj9cbiAgICAgICAgICByZWplY3QgZXJyb3JcbiAgICAgICAgZWxzZVxuICAgICAgICByZXNvbHZlIHJlY29yZFxuXG4gIGZpbmRBbGw6ICh7IHRhYmxlLCBpZHMgfSkgLT5cbiAgICBAc2VsZWN0QWxsXG4gICAgICB0YWJsZTogdGFibGVcbiAgICAgIHF1ZXJ5OiBkbyAtPlxuICAgICAgICBjb25kaXRpb25zID0gZG8gLT5cbiAgICAgICAgICBmb3IgaWQgaW4gaWRzXG4gICAgICAgICAgICBcIlJFQ09SRF9JRCgpID0gJyN7aWR9J1wiXG4gICAgICAgIFwiT1IoICN7IEl0LmpvaW4gXCIsIFwiLCBjb25kaXRpb25zIH0pXCJcblxuZXhwb3J0IHtcbiAgQmFzZVxufSJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=src/base.coffee