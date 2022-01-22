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
    var result;
    table = this._.base(table);
    result = query != null ? table.select({
      filterByFormula: query
    }) : table.select();
    return new Promise(function (resolve, reject) {
      return result.firstPage(function (error, records) {
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

  create({
    table,
    records
  }) {
    return new Promise((resolve, reject) => {
      var record;
      return this._.base(table).create(function () {
        var i, len, results;
        results = [];

        for (i = 0, len = records.length; i < len; i++) {
          record = records[i];
          results.push({
            fields: record
          });
        }

        return results;
      }(), function (error, records) {
        if (error != null) {
          return reject(error);
        } else {
          return resolve(records);
        }
      });
    });
  }

  update({
    table,
    id,
    fields
  }) {
    return new Promise((resolve, reject) => {
      return this._.base(table).update([{
        id,
        fields
      }], function (error, records) {
        if (error != null) {
          return reject(error);
        } else {
          return resolve(records[0]);
        }
      });
    });
  }

  delete({
    table,
    id
  }) {
    return new Promise((resolve, reject) => {
      return this._.base(table).destroy(id, function (error, records) {
        if (error != null) {
          return reject(error);
        } else {
          return resolve();
        }
      });
    });
  }

};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9iYXNlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRkEsSUFBQSxJQUFBOztBQUlNLGVBQUEsSUFBQSxHQUFOLE1BQUEsSUFBQSxDQUFBO0FBRVcsZUFBUixNQUFRLENBQUM7QUFBQSxJQUFBLEdBQUE7QUFBRCxJQUFBO0FBQUMsR0FBRCxFQUFBO0FBQ1gsUUFBQSxNQUFBO0FBQUksSUFBQSxNQUFBLEdBQVMsSUFBQSxpQkFBQSxDQUFhO0FBQUEsTUFBQSxNQUFBLEVBQVEsTUFBTSx3QkFBTixHQUFNO0FBQWQsS0FBYixDQUFUO0FBQ0EsSUFBQSxJQUFBLEdBQU8sTUFBTSxDQUFOLElBQUEsQ0FBQSxJQUFBLENBQVA7V0FDQSxNQUFNLENBQU4sTUFBQSxDQUFlLElBQWYsSUFBZSxFQUFmLEVBQXVCO0FBQUEsTUFBQSxDQUFBLEVBQUc7QUFBQSxRQUFBLE1BQUE7QUFBQSxRQUFBO0FBQUE7QUFBSCxLQUF2QixDO0FBSE87O0FBS1QsRUFBQSxTQUFXLENBQUM7QUFBQSxJQUFBLEtBQUE7QUFBRCxJQUFBO0FBQUMsR0FBRCxFQUFBO0FBQ1QsSUFBQSxLQUFBLEdBQVUsS0FBQyxDQUFELENBQUEsSUFBQSxDQUFGLEtBQUUsQ0FBRixDQUFBLE1BQUEsQ0FDTjtBQUFBLE1BQUEsZUFBQSxFQUFBLEtBQUE7QUFDQSxNQUFBLFVBQUEsRUFBWTtBQURaLEtBRE0sQ0FBUjtXQUdBLElBQUEsT0FBQSxDQUFZLFVBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQTthQUNWLEtBQUssQ0FBTCxTQUFBLENBQWdCLFVBQUEsS0FBQSxFQUFBLE9BQUEsRUFBQTtBQUNkLFlBQUcsS0FBQSxJQUFILElBQUEsRUFBQTtpQkFDRSxNQUFBLENBREYsS0FDRSxDO0FBREYsU0FBQSxNQUFBO2lCQUdFLE9BQUEsQ0FBUSxPQUFPLENBSGpCLENBR2lCLENBQWYsQzs7QUFKSixPQUFBLEM7QUFERixLQUFBLEM7QUFKUzs7QUFXWCxFQUFBLFNBQVcsQ0FBQztBQUFBLElBQUEsS0FBQTtBQUFELElBQUE7QUFBQyxHQUFELEVBQUE7QUFDYixRQUFBLE1BQUE7QUFBSSxJQUFBLEtBQUEsR0FBUSxLQUFDLENBQUQsQ0FBQSxJQUFBLENBQUEsS0FBQSxDQUFSO0FBQ0EsSUFBQSxNQUFBLEdBQVksS0FBQSxJQUFILElBQUcsR0FDVixLQUFLLENBQUwsTUFBQSxDQUFhO0FBQUEsTUFBQSxlQUFBLEVBQWlCO0FBQWpCLEtBQWIsQ0FEVSxHQUdWLEtBQUssQ0FBTCxNQUFBLEVBSEY7V0FJQSxJQUFBLE9BQUEsQ0FBWSxVQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUE7YUFDVixNQUFNLENBQU4sU0FBQSxDQUFpQixVQUFBLEtBQUEsRUFBQSxPQUFBLEVBQUE7QUFDZixZQUFHLEtBQUEsSUFBSCxJQUFBLEVBQUE7aUJBQ0UsTUFBQSxDQURGLEtBQ0UsQztBQURGLFNBQUEsTUFBQTtpQkFHRSxPQUFBLENBSEYsT0FHRSxDOztBQUpKLE9BQUEsQztBQURGLEtBQUEsQztBQU5TOztBQWFYLEVBQUEsSUFBTSxDQUFDO0FBQUEsSUFBQSxLQUFBO0FBQUQsSUFBQTtBQUFDLEdBQUQsRUFBQTtXQUNKLElBQUEsT0FBQSxDQUFZLENBQUEsT0FBQSxFQUFBLE1BQUEsS0FBQTthQUNSLEtBQUMsQ0FBRCxDQUFBLElBQUEsQ0FBRixLQUFFLENBQUYsQ0FBQSxJQUFBLENBQUEsRUFBQSxFQUEyQixVQUFBLEtBQUEsRUFBQSxNQUFBLEVBQUE7QUFDekIsWUFBRyxLQUFBLElBQUgsSUFBQSxFQUFBO0FBQ0UsVUFBQSxNQUFBLENBREYsS0FDRSxDQUFBO0FBREYsU0FBQSxNQUFBLEM7O2VBR0EsT0FBQSxDQUFBLE1BQUEsQztBQUpGLE9BQUEsQztBQURGLEtBQUEsQztBQURJOztBQVFOLEVBQUEsT0FBUyxDQUFDO0FBQUEsSUFBQSxLQUFBO0FBQUQsSUFBQTtBQUFDLEdBQUQsRUFBQTtXQUNQLEtBQUEsU0FBQSxDQUNFO0FBQUEsTUFBQSxLQUFBLEVBQUEsS0FBQTtBQUNBLE1BQUEsS0FBQSxFQUFVLFlBQUE7QUFDaEIsWUFBQSxVQUFBOztBQUFRLFFBQUEsVUFBQSxHQUFnQixZQUFBO0FBQ3hCLGNBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxHQUFBLEVBQUEsT0FBQTtBQUFVLFVBQUEsT0FBQSxHQUFBLEVBQUE7O0FBQUEsZUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLEdBQUEsR0FBQSxHQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsR0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUE7O29CQUNFLEksQ0FBQSxrQkFBQSxFQUFBLEc7QUFERjs7O0FBRGMsU0FBQSxFQUFoQjs7QUFHQSxlQUFBLE9BQVEsRUFBRSxDQUFGLElBQUEsQ0FBQSxJQUFBLEVBQVIsVUFBUSxDQUFSLEdBQUE7QUFKUSxPQUFBO0FBRFYsS0FERixDO0FBRE87O0FBU1QsRUFBQSxNQUFRLENBQUM7QUFBQSxJQUFBLEtBQUE7QUFBRCxJQUFBO0FBQUMsR0FBRCxFQUFBO1dBQ04sSUFBQSxPQUFBLENBQVksQ0FBQSxPQUFBLEVBQUEsTUFBQSxLQUFBO0FBQ2hCLFVBQUEsTUFBQTthQUFRLEtBQUMsQ0FBRCxDQUFBLElBQUEsQ0FBRixLQUFFLENBQUYsQ0FBQSxNQUFBLENBQUEsWUFBQTs7QUFBMkIsUUFBQSxPQUFBLEdBQUEsRUFBQTs7QUFBQSxhQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsR0FBQSxHQUFBLE9BQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxHQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQTs7dUJBQUE7QUFBQSxZQUFBLE1BQUEsRUFBUTtBQUFSLFc7QUFBQTs7O0FBQTNCLE9BQUEsRUFBQSxFQUFtRSxVQUFBLEtBQUEsRUFBQSxPQUFBLEVBQUE7QUFDakUsWUFBRyxLQUFBLElBQUgsSUFBQSxFQUFBO2lCQUNFLE1BQUEsQ0FERixLQUNFLEM7QUFERixTQUFBLE1BQUE7aUJBR0UsT0FBQSxDQUhGLE9BR0UsQzs7QUFKSixPQUFBLEM7QUFERixLQUFBLEM7QUFETTs7QUFTUixFQUFBLE1BQVEsQ0FBQztBQUFBLElBQUEsS0FBQTtBQUFBLElBQUEsRUFBQTtBQUFELElBQUE7QUFBQyxHQUFELEVBQUE7V0FDTixJQUFBLE9BQUEsQ0FBWSxDQUFBLE9BQUEsRUFBQSxNQUFBLEtBQUE7YUFDUixLQUFDLENBQUQsQ0FBQSxJQUFBLENBQUYsS0FBRSxDQUFGLENBQUEsTUFBQSxDQUF5QixDQUFFO0FBQUEsUUFBQSxFQUFBO0FBQTNCLFFBQUE7QUFBMkIsT0FBRixDQUF6QixFQUE2QyxVQUFBLEtBQUEsRUFBQSxPQUFBLEVBQUE7QUFDM0MsWUFBRyxLQUFBLElBQUgsSUFBQSxFQUFBO2lCQUNFLE1BQUEsQ0FERixLQUNFLEM7QUFERixTQUFBLE1BQUE7aUJBR0UsT0FBQSxDQUFRLE9BQU8sQ0FIakIsQ0FHaUIsQ0FBZixDOztBQUpKLE9BQUEsQztBQURGLEtBQUEsQztBQURNOztBQVFSLEVBQUEsTUFBUSxDQUFDO0FBQUEsSUFBQSxLQUFBO0FBQUQsSUFBQTtBQUFDLEdBQUQsRUFBQTtXQUNOLElBQUEsT0FBQSxDQUFZLENBQUEsT0FBQSxFQUFBLE1BQUEsS0FBQTthQUNSLEtBQUMsQ0FBRCxDQUFBLElBQUEsQ0FBRixLQUFFLENBQUYsQ0FBQSxPQUFBLENBQUEsRUFBQSxFQUE4QixVQUFBLEtBQUEsRUFBQSxPQUFBLEVBQUE7QUFDNUIsWUFBRyxLQUFBLElBQUgsSUFBQSxFQUFBO2lCQUNFLE1BQUEsQ0FERixLQUNFLEM7QUFERixTQUFBLE1BQUE7aUJBR0UsT0FIRixFOztBQURGLE9BQUEsQztBQURGLEtBQUEsQztBQURNOztBQWpFVixDQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgSXQgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvaXRlcmFibGVcIlxuaW1wb3J0IHsgZ2V0U2VjcmV0IH0gZnJvbSBcIkBkYXNoa2l0ZS9kb2xvcmVzL3NlY3JldHNcIlxuaW1wb3J0IEFpcnRhYmxlIGZyb20gXCJhaXJ0YWJsZVwiXG5cbmNsYXNzIEJhc2VcblxuICBAY3JlYXRlOiAoe2tleSwgYmFzZX0pIC0+XG4gICAgY2xpZW50ID0gbmV3IEFpcnRhYmxlIGFwaUtleTogYXdhaXQgZ2V0U2VjcmV0IGtleVxuICAgIGJhc2UgPSBjbGllbnQuYmFzZSBiYXNlXG4gICAgT2JqZWN0LmFzc2lnbiAobmV3IEApLCBfOiB7IGNsaWVudCwgYmFzZSB9XG5cbiAgc2VsZWN0T25lOiAoeyB0YWJsZSwgcXVlcnkgfSkgLT5cbiAgICBxdWVyeSA9ICggQF8uYmFzZSB0YWJsZSApLnNlbGVjdFxuICAgICAgZmlsdGVyQnlGb3JtdWxhOiBxdWVyeVxuICAgICAgbWF4UmVjb3JkczogMVxuICAgIG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpIC0+XG4gICAgICBxdWVyeS5maXJzdFBhZ2UgKGVycm9yLCByZWNvcmRzKSAtPlxuICAgICAgICBpZiBlcnJvcj9cbiAgICAgICAgICByZWplY3QgZXJyb3JcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJlc29sdmUgcmVjb3Jkc1swXVxuXG4gIHNlbGVjdEFsbDogKHsgdGFibGUsIHF1ZXJ5IH0pIC0+XG4gICAgdGFibGUgPSBAXy5iYXNlIHRhYmxlXG4gICAgcmVzdWx0ID0gaWYgcXVlcnk/XG4gICAgICB0YWJsZS5zZWxlY3QgZmlsdGVyQnlGb3JtdWxhOiBxdWVyeVxuICAgIGVsc2VcbiAgICAgIHRhYmxlLnNlbGVjdCgpXG4gICAgbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgLT5cbiAgICAgIHJlc3VsdC5maXJzdFBhZ2UgKGVycm9yLCByZWNvcmRzKSAtPlxuICAgICAgICBpZiBlcnJvcj9cbiAgICAgICAgICByZWplY3QgZXJyb3JcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJlc29sdmUgcmVjb3Jkc1xuXG4gIGZpbmQ6ICh7IHRhYmxlLCBpZCB9KSAtPlxuICAgIG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICAoIEBfLmJhc2UgdGFibGUgKS5maW5kIGlkLCAoZXJyb3IsIHJlY29yZCkgLT5cbiAgICAgICAgaWYgZXJyb3I/XG4gICAgICAgICAgcmVqZWN0IGVycm9yXG4gICAgICAgIGVsc2VcbiAgICAgICAgcmVzb2x2ZSByZWNvcmRcblxuICBmaW5kQWxsOiAoeyB0YWJsZSwgaWRzIH0pIC0+XG4gICAgQHNlbGVjdEFsbFxuICAgICAgdGFibGU6IHRhYmxlXG4gICAgICBxdWVyeTogZG8gLT5cbiAgICAgICAgY29uZGl0aW9ucyA9IGRvIC0+XG4gICAgICAgICAgZm9yIGlkIGluIGlkc1xuICAgICAgICAgICAgXCJSRUNPUkRfSUQoKSA9ICcje2lkfSdcIlxuICAgICAgICBcIk9SKCAjeyBJdC5qb2luIFwiLCBcIiwgY29uZGl0aW9ucyB9KVwiXG5cbiAgY3JlYXRlOiAoeyB0YWJsZSwgcmVjb3JkcyB9KSAtPlxuICAgIG5ldyBQcm9taXNlICggcmVzb2x2ZSwgcmVqZWN0ICkgPT5cbiAgICAgICggQF8uYmFzZSB0YWJsZSApLmNyZWF0ZSAoIGZpZWxkczogcmVjb3JkIGZvciByZWNvcmQgaW4gcmVjb3JkcyApLCAoIGVycm9yLCByZWNvcmRzICkgLT5cbiAgICAgICAgaWYgZXJyb3I/XG4gICAgICAgICAgcmVqZWN0IGVycm9yXG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZXNvbHZlIHJlY29yZHNcblxuXG4gIHVwZGF0ZTogKHsgdGFibGUsIGlkLCBmaWVsZHMgfSkgLT5cbiAgICBuZXcgUHJvbWlzZSAoIHJlc29sdmUsIHJlamVjdCApID0+XG4gICAgICAoIEBfLmJhc2UgdGFibGUgKS51cGRhdGUgWyB7IGlkLCBmaWVsZHMgfSBdLCAoZXJyb3IsIHJlY29yZHMpIC0+XG4gICAgICAgIGlmIGVycm9yP1xuICAgICAgICAgIHJlamVjdCBlcnJvclxuICAgICAgICBlbHNlXG4gICAgICAgICAgcmVzb2x2ZSByZWNvcmRzWzBdXG5cbiAgZGVsZXRlOiAoeyB0YWJsZSwgaWQgfSkgLT5cbiAgICBuZXcgUHJvbWlzZSAoIHJlc29sdmUsIHJlamVjdCApID0+XG4gICAgICAoIEBfLmJhc2UgdGFibGUgKS5kZXN0cm95IGlkLCAoZXJyb3IsIHJlY29yZHMpIC0+XG4gICAgICAgIGlmIGVycm9yP1xuICAgICAgICAgIHJlamVjdCBlcnJvclxuICAgICAgICBlbHNlXG4gICAgICAgICAgcmVzb2x2ZSgpXG5cbmV4cG9ydCB7XG4gIEJhc2Vcbn0iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=src/base.coffee