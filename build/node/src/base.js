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
    secret,
    base
  }) {
    var client;
    client = new _airtable.default({
      apiKey: await (0, _secrets.getSecret)(secret)
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
    query,
    fields,
    maxRecords,
    pageSize,
    sort,
    view,
    cellFormat,
    timeZone,
    userLocale
  }) {
    var parameters, records;

    if (pageSize == null) {
      pageSize = 100;
    }

    table = this._.base(table);
    records = [];
    parameters = {
      pageSize
    };

    if (fields != null) {
      parameters.fields = fields;
    }

    if (query != null) {
      parameters.filterByFormula = query;
    }

    if (maxRecords != null) {
      parameters.maxRecords = maxRecords;
    }

    if (sort != null) {
      parameters.sort = sort;
    }

    if (view != null) {
      parameters.view = view;
    }

    if (cellFormat != null) {
      parameters.cellFormat = cellFormat;
    }

    if (timeZone != null) {
      parameters.timeZone = timeZone;
    }

    if (userLocale != null) {
      parameters.userLocale = userLocale;
    }

    return new Promise(function (resolve, reject) {
      var accumulate, done;

      accumulate = function (pageRecords, fetchNextPage) {
        records.push(...pageRecords);
        return fetchNextPage();
      };

      done = function (error) {
        if (error != null) {
          return reject(error);
        } else {
          return resolve(records);
        }
      };

      return table.select(parameters).eachPage(accumulate, done);
    });
  }

  find({
    table,
    id
  }) {
    return new Promise((resolve, reject) => {
      return this._.base(table).find(id, function (error, record) {
        if (error != null) {
          if (error.statusCode === 404) {
            return resolve();
          } else {
            return reject(error);
          }
        } else {
          return resolve(record);
        }
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

  replace({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9iYXNlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRkEsSUFBQSxJQUFBOztBQUlNLGVBQUEsSUFBQSxHQUFOLE1BQUEsSUFBQSxDQUFBO0FBRVcsZUFBUixNQUFRLENBQUM7QUFBQSxJQUFBLE1BQUE7QUFBRCxJQUFBO0FBQUMsR0FBRCxFQUFBO0FBQ1gsUUFBQSxNQUFBO0FBQUksSUFBQSxNQUFBLEdBQVMsSUFBQSxpQkFBQSxDQUFhO0FBQUEsTUFBQSxNQUFBLEVBQVEsTUFBTSx3QkFBTixNQUFNO0FBQWQsS0FBYixDQUFUO0FBQ0EsSUFBQSxJQUFBLEdBQU8sTUFBTSxDQUFOLElBQUEsQ0FBQSxJQUFBLENBQVA7V0FDQSxNQUFNLENBQU4sTUFBQSxDQUFlLElBQWYsSUFBZSxFQUFmLEVBQXVCO0FBQUEsTUFBQSxDQUFBLEVBQUc7QUFBQSxRQUFBLE1BQUE7QUFBQSxRQUFBO0FBQUE7QUFBSCxLQUF2QixDO0FBSE87O0FBS1QsRUFBQSxTQUFXLENBQUM7QUFBQSxJQUFBLEtBQUE7QUFBRCxJQUFBO0FBQUMsR0FBRCxFQUFBO0FBQ1QsSUFBQSxLQUFBLEdBQVUsS0FBQyxDQUFELENBQUEsSUFBQSxDQUFGLEtBQUUsQ0FBRixDQUFBLE1BQUEsQ0FDTjtBQUFBLE1BQUEsZUFBQSxFQUFBLEtBQUE7QUFDQSxNQUFBLFVBQUEsRUFBWTtBQURaLEtBRE0sQ0FBUjtXQUdBLElBQUEsT0FBQSxDQUFZLFVBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQTthQUNWLEtBQUssQ0FBTCxTQUFBLENBQWdCLFVBQUEsS0FBQSxFQUFBLE9BQUEsRUFBQTtBQUNkLFlBQUcsS0FBQSxJQUFILElBQUEsRUFBQTtpQkFDRSxNQUFBLENBREYsS0FDRSxDO0FBREYsU0FBQSxNQUFBO2lCQUdFLE9BQUEsQ0FBUSxPQUFPLENBSGpCLENBR2lCLENBQWYsQzs7QUFKSixPQUFBLEM7QUFERixLQUFBLEM7QUFKUzs7QUFXWCxFQUFBLFNBQVcsQ0FBQztBQUFBLElBQUEsS0FBQTtBQUFBLElBQUEsS0FBQTtBQUFBLElBQUEsTUFBQTtBQUFBLElBQUEsVUFBQTtBQUFBLElBQUEsUUFBQTtBQUFBLElBQUEsSUFBQTtBQUFBLElBQUEsSUFBQTtBQUFBLElBQUEsVUFBQTtBQUFBLElBQUEsUUFBQTtBQUFELElBQUE7QUFBQyxHQUFELEVBQUE7QUFDYixRQUFBLFVBQUEsRUFBQSxPQUFBOzs7QUFBSSxNQUFBLFFBQUEsR0FBWSxHQUFaOzs7QUFDQSxJQUFBLEtBQUEsR0FBUSxLQUFDLENBQUQsQ0FBQSxJQUFBLENBQUEsS0FBQSxDQUFSO0FBQ0EsSUFBQSxPQUFBLEdBQVUsRUFBVjtBQUVBLElBQUEsVUFBQSxHQUFhO0FBQUEsTUFBQTtBQUFBLEtBQWI7O0FBQ0EsUUFBOEIsTUFBQSxJQUE5QixJQUFBLEVBQUE7QUFBQSxNQUFBLFVBQVUsQ0FBVixNQUFBLEdBQUEsTUFBQTs7O0FBQ0EsUUFBc0MsS0FBQSxJQUF0QyxJQUFBLEVBQUE7QUFBQSxNQUFBLFVBQVUsQ0FBVixlQUFBLEdBQUEsS0FBQTs7O0FBQ0EsUUFBc0MsVUFBQSxJQUF0QyxJQUFBLEVBQUE7QUFBQSxNQUFBLFVBQVUsQ0FBVixVQUFBLEdBQUEsVUFBQTs7O0FBQ0EsUUFBMEIsSUFBQSxJQUExQixJQUFBLEVBQUE7QUFBQSxNQUFBLFVBQVUsQ0FBVixJQUFBLEdBQUEsSUFBQTs7O0FBQ0EsUUFBMEIsSUFBQSxJQUExQixJQUFBLEVBQUE7QUFBQSxNQUFBLFVBQVUsQ0FBVixJQUFBLEdBQUEsSUFBQTs7O0FBQ0EsUUFBc0MsVUFBQSxJQUF0QyxJQUFBLEVBQUE7QUFBQSxNQUFBLFVBQVUsQ0FBVixVQUFBLEdBQUEsVUFBQTs7O0FBQ0EsUUFBa0MsUUFBQSxJQUFsQyxJQUFBLEVBQUE7QUFBQSxNQUFBLFVBQVUsQ0FBVixRQUFBLEdBQUEsUUFBQTs7O0FBQ0EsUUFBc0MsVUFBQSxJQUF0QyxJQUFBLEVBQUE7QUFBQSxNQUFBLFVBQVUsQ0FBVixVQUFBLEdBQUEs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RCxDQUFBLElBQUEsQ0FBRixLQUFFLENBQUYsQ0FBQSxPQUFBLENBQUEsRUFBQSxFQUE4QixVQUFBLEtBQUEsRUFBQSxPQUFBLEVBQUE7QUFDNUIsWUFBRyxLQUFBLElBQUgsSUFBQSxFQUFBO2lCQUNFLE1BQUEsQ0FERixLQUNFLEM7QUFERixTQUFBLE1BQUE7aUJBR0UsT0FIRixFOztBQURGLE9BQUEsQztBQURGLEtBQUEsQztBQURNOztBQTlGVixDQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgSXQgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvaXRlcmFibGVcIlxuaW1wb3J0IHsgZ2V0U2VjcmV0IH0gZnJvbSBcIkBkYXNoa2l0ZS9kb2xvcmVzL3NlY3JldHNcIlxuaW1wb3J0IEFpcnRhYmxlIGZyb20gXCJhaXJ0YWJsZVwiXG5cbmNsYXNzIEJhc2VcblxuICBAY3JlYXRlOiAoe3NlY3JldCwgYmFzZX0pIC0+XG4gICAgY2xpZW50ID0gbmV3IEFpcnRhYmxlIGFwaUtleTogYXdhaXQgZ2V0U2VjcmV0IHNlY3JldFxuICAgIGJhc2UgPSBjbGllbnQuYmFzZSBiYXNlXG4gICAgT2JqZWN0LmFzc2lnbiAobmV3IEApLCBfOiB7IGNsaWVudCwgYmFzZSB9XG5cbiAgc2VsZWN0T25lOiAoeyB0YWJsZSwgcXVlcnkgfSkgLT5cbiAgICBxdWVyeSA9ICggQF8uYmFzZSB0YWJsZSApLnNlbGVjdFxuICAgICAgZmlsdGVyQnlGb3JtdWxhOiBxdWVyeVxuICAgICAgbWF4UmVjb3JkczogMVxuICAgIG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpIC0+XG4gICAgICBxdWVyeS5maXJzdFBhZ2UgKGVycm9yLCByZWNvcmRzKSAtPlxuICAgICAgICBpZiBlcnJvcj9cbiAgICAgICAgICByZWplY3QgZXJyb3JcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJlc29sdmUgcmVjb3Jkc1swXVxuXG4gIHNlbGVjdEFsbDogKHsgdGFibGUsIHF1ZXJ5LCBmaWVsZHMsIG1heFJlY29yZHMsIHBhZ2VTaXplLCBzb3J0LCB2aWV3LCBjZWxsRm9ybWF0LCB0aW1lWm9uZSwgdXNlckxvY2FsZSB9KSAtPlxuICAgIHBhZ2VTaXplID89IDEwMFxuICAgIHRhYmxlID0gQF8uYmFzZSB0YWJsZVxuICAgIHJlY29yZHMgPSBbXVxuXG4gICAgcGFyYW1ldGVycyA9IHsgcGFnZVNpemUgfVxuICAgIHBhcmFtZXRlcnMuZmllbGRzID0gZmllbGRzIGlmIGZpZWxkcz9cbiAgICBwYXJhbWV0ZXJzLmZpbHRlckJ5Rm9ybXVsYSA9IHF1ZXJ5IGlmIHF1ZXJ5P1xuICAgIHBhcmFtZXRlcnMubWF4UmVjb3JkcyA9IG1heFJlY29yZHMgaWYgbWF4UmVjb3Jkcz9cbiAgICBwYXJhbWV0ZXJzLnNvcnQgPSBzb3J0IGlmIHNvcnQ/XG4gICAgcGFyYW1ldGVycy52aWV3ID0gdmlldyBpZiB2aWV3P1xuICAgIHBhcmFtZXRlcnMuY2VsbEZvcm1hdCA9IGNlbGxGb3JtYXQgaWYgY2VsbEZvcm1hdD9cbiAgICBwYXJhbWV0ZXJzLnRpbWVab25lID0gdGltZVpvbmUgaWYgdGltZVpvbmU/XG4gICAgcGFyYW1ldGVycy51c2VyTG9jYWxlID0gdXNlckxvY2FsZSBpZiB1c2VyTG9jYWxlP1xuXG4gICAgbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgLT5cbiAgICAgIGFjY3VtdWxhdGUgPSAocGFnZVJlY29yZHMsIGZldGNoTmV4dFBhZ2UpIC0+XG4gICAgICAgIHJlY29yZHMucHVzaCBwYWdlUmVjb3Jkcy4uLlxuICAgICAgICBmZXRjaE5leHRQYWdlKClcblxuICAgICAgZG9uZSA9IChlcnJvcikgLT5cbiAgICAgICAgaWYgZXJyb3I/XG4gICAgICAgICAgcmVqZWN0IGVycm9yXG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZXNvbHZlIHJlY29yZHNcbiAgIFxuICAgICAgdGFibGVcbiAgICAgICAgLnNlbGVjdCBwYXJhbWV0ZXJzXG4gICAgICAgIC5lYWNoUGFnZSBhY2N1bXVsYXRlLCBkb25lXG5cblxuICBmaW5kOiAoeyB0YWJsZSwgaWQgfSkgLT5cbiAgICBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgKCBAXy5iYXNlIHRhYmxlICkuZmluZCBpZCwgKGVycm9yLCByZWNvcmQpIC0+XG4gICAgICAgIGlmIGVycm9yP1xuICAgICAgICAgIGlmIGVycm9yLnN0YXR1c0NvZGUgPT0gNDA0XG4gICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICByZWplY3QgZXJyb3JcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJlc29sdmUgcmVjb3JkXG5cbiAgZmluZEFsbDogKHsgdGFibGUsIGlkcyB9KSAtPlxuICAgIEBzZWxlY3RBbGxcbiAgICAgIHRhYmxlOiB0YWJsZVxuICAgICAgcXVlcnk6IGRvIC0+XG4gICAgICAgIGNvbmRpdGlvbnMgPSBkbyAtPlxuICAgICAgICAgIGZvciBpZCBpbiBpZHNcbiAgICAgICAgICAgIFwiUkVDT1JEX0lEKCkgPSAnI3tpZH0nXCJcbiAgICAgICAgXCJPUiggI3sgSXQuam9pbiBcIiwgXCIsIGNvbmRpdGlvbnMgfSlcIlxuXG4gIGNyZWF0ZTogKHsgdGFibGUsIHJlY29yZHMgfSkgLT5cbiAgICBuZXcgUHJvbWlzZSAoIHJlc29sdmUsIHJlamVjdCApID0+XG4gICAgICAoIEBfLmJhc2UgdGFibGUgKS5jcmVhdGUgKCBmaWVsZHM6IHJlY29yZCBmb3IgcmVjb3JkIGluIHJlY29yZHMgKSwgKCBlcnJvciwgcmVjb3JkcyApIC0+XG4gICAgICAgIGlmIGVycm9yP1xuICAgICAgICAgIHJlamVjdCBlcnJvclxuICAgICAgICBlbHNlXG4gICAgICAgICAgcmVzb2x2ZSByZWNvcmRzXG5cblxuICB1cGRhdGU6ICh7IHRhYmxlLCBpZCwgZmllbGRzIH0pIC0+XG4gICAgbmV3IFByb21pc2UgKCByZXNvbHZlLCByZWplY3QgKSA9PlxuICAgICAgKCBAXy5iYXNlIHRhYmxlICkudXBkYXRlIFsgeyBpZCwgZmllbGRzIH0gXSwgKGVycm9yLCByZWNvcmRzKSAtPlxuICAgICAgICBpZiBlcnJvcj9cbiAgICAgICAgICByZWplY3QgZXJyb3JcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJlc29sdmUgcmVjb3Jkc1swXVxuXG4gIHJlcGxhY2U6ICh7IHRhYmxlLCBpZCwgZmllbGRzIH0pIC0+XG4gICAgbmV3IFByb21pc2UgKCByZXNvbHZlLCByZWplY3QgKSA9PlxuICAgICAgKCBAXy5iYXNlIHRhYmxlICkudXBkYXRlIFsgeyBpZCwgZmllbGRzIH0gXSwgKGVycm9yLCByZWNvcmRzKSAtPlxuICAgICAgICBpZiBlcnJvcj9cbiAgICAgICAgICByZWplY3QgZXJyb3JcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJlc29sdmUgcmVjb3Jkc1swXVxuXG4gIGRlbGV0ZTogKHsgdGFibGUsIGlkIH0pIC0+XG4gICAgbmV3IFByb21pc2UgKCByZXNvbHZlLCByZWplY3QgKSA9PlxuICAgICAgKCBAXy5iYXNlIHRhYmxlICkuZGVzdHJveSBpZCwgKGVycm9yLCByZWNvcmRzKSAtPlxuICAgICAgICBpZiBlcnJvcj9cbiAgICAgICAgICByZWplY3QgZXJyb3JcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJlc29sdmUoKVxuXG5leHBvcnQge1xuICBCYXNlXG59Il0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=src/base.coffee