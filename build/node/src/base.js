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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9iYXNlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRkEsSUFBQSxJQUFBOztBQUlNLGVBQUEsSUFBQSxHQUFOLE1BQUEsSUFBQSxDQUFBO0FBRVcsZUFBUixNQUFRLENBQUM7QUFBQSxJQUFBLE1BQUE7QUFBRCxJQUFBO0FBQUMsR0FBRCxFQUFBO0FBQ1gsUUFBQSxNQUFBO0FBQUksSUFBQSxNQUFBLEdBQVMsSUFBQSxpQkFBQSxDQUFhO0FBQUEsTUFBQSxNQUFBLEVBQVEsTUFBTSx3QkFBTixNQUFNO0FBQWQsS0FBYixDQUFUO0FBQ0EsSUFBQSxJQUFBLEdBQU8sTUFBTSxDQUFOLElBQUEsQ0FBQSxJQUFBLENBQVA7V0FDQSxNQUFNLENBQU4sTUFBQSxDQUFlLElBQWYsSUFBZSxFQUFmLEVBQXVCO0FBQUEsTUFBQSxDQUFBLEVBQUc7QUFBQSxRQUFBLE1BQUE7QUFBQSxRQUFBO0FBQUE7QUFBSCxLQUF2QixDO0FBSE87O0FBS1QsRUFBQSxTQUFXLENBQUM7QUFBQSxJQUFBLEtBQUE7QUFBRCxJQUFBO0FBQUMsR0FBRCxFQUFBO0FBQ1QsSUFBQSxLQUFBLEdBQVUsS0FBQyxDQUFELENBQUEsSUFBQSxDQUFGLEtBQUUsQ0FBRixDQUFBLE1BQUEsQ0FDTjtBQUFBLE1BQUEsZUFBQSxFQUFBLEtBQUE7QUFDQSxNQUFBLFVBQUEsRUFBWTtBQURaLEtBRE0sQ0FBUjtXQUdBLElBQUEsT0FBQSxDQUFZLFVBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQTthQUNWLEtBQUssQ0FBTCxTQUFBLENBQWdCLFVBQUEsS0FBQSxFQUFBLE9BQUEsRUFBQTtBQUNkLFlBQUcsS0FBQSxJQUFILElBQUEsRUFBQTtpQkFDRSxNQUFBLENBREYsS0FDRSxDO0FBREYsU0FBQSxNQUFBO2lCQUdFLE9BQUEsQ0FBUSxPQUFPLENBSGpCLENBR2lCLENBQWYsQzs7QUFKSixPQUFBLEM7QUFERixLQUFBLEM7QUFKUzs7QUFXWCxFQUFBLFNBQVcsQ0FBQztBQUFBLElBQUEsS0FBQTtBQUFBLElBQUEsS0FBQTtBQUFBLElBQUEsTUFBQTtBQUFBLElBQUEsVUFBQTtBQUFBLElBQUEsUUFBQTtBQUFBLElBQUEsSUFBQTtBQUFBLElBQUEsSUFBQTtBQUFBLElBQUEsVUFBQTtBQUFBLElBQUEsUUFBQTtBQUFELElBQUE7QUFBQyxHQUFELEVBQUE7QUFDYixRQUFBLFVBQUEsRUFBQSxPQUFBOzs7QUFBSSxNQUFBLFFBQUEsR0FBWSxHQUFaOzs7QUFDQSxJQUFBLEtBQUEsR0FBUSxLQUFDLENBQUQsQ0FBQSxJQUFBLENBQUEsS0FBQSxDQUFSO0FBQ0EsSUFBQSxPQUFBLEdBQVUsRUFBVjtBQUVBLElBQUEsVUFBQSxHQUFhO0FBQUEsTUFBQTtBQUFBLEtBQWI7O0FBQ0EsUUFBOEIsTUFBQSxJQUE5QixJQUFBLEVBQUE7QUFBQSxNQUFBLFVBQVUsQ0FBVixNQUFBLEdBQUEsTUFBQTs7O0FBQ0EsUUFBc0MsS0FBQSxJQUF0QyxJQUFBLEVBQUE7QUFBQSxNQUFBLFVBQVUsQ0FBVixlQUFBLEdBQUEsS0FBQTs7O0FBQ0EsUUFBc0MsVUFBQSxJQUF0QyxJQUFBLEVBQUE7QUFBQSxNQUFBLFVBQVUsQ0FBVixVQUFBLEdBQUEsVUFBQTs7O0FBQ0EsUUFBMEIsSUFBQSxJQUExQixJQUFBLEVBQUE7QUFBQSxNQUFBLFVBQVUsQ0FBVixJQUFBLEdBQUEsSUFBQTs7O0FBQ0EsUUFBMEIsSUFBQSxJQUExQixJQUFBLEVBQUE7QUFBQSxNQUFBLFVBQVUsQ0FBVixJQUFBLEdBQUEsSUFBQTs7O0FBQ0EsUUFBc0MsVUFBQSxJQUF0QyxJQUFBLEVBQUE7QUFBQSxNQUFBLFVBQVUsQ0FBVixVQUFBLEdBQUEsVUFBQTs7O0FBQ0EsUUFBa0MsUUFBQSxJQUFsQyxJQUFBLEVBQUE7QUFBQSxNQUFBLFVBQVUsQ0FBVixRQUFBLEdBQUEsUUFBQTs7O0FBQ0EsUUFBc0MsVUFBQSxJQUF0QyxJQUFBLEVBQUE7QUFBQSxNQUFBLFVBQVUsQ0FBVixVQUFBLEdBQUEsVUFBQTs7O1dBRUEsSUFBQSxPQUFBLENBQVksVUFBQSxPQUFBLEVBQUEsTUFBQSxFQUFBO0FBQ2hCLFVBQUEsVUFBQSxFQUFBLElBQUE7O0FBQU0sTUFBQSxVQUFBLEdBQWEsVUFBQSxXQUFBLEVBQUEsYUFBQSxFQUFBO0FBQ1gsUUFBQSxPQUFPLENBQVAsSUFBQSxDQUFhLEdBQWIsV0FBQTtlQUNBLGFBQUEsRTtBQUZXLE9BQWI7O0FBSUEsTUFBQSxJQUFBLEdBQU8sVUFBQSxLQUFBLEVBQUE7QUFDTCxZQUFHLEtBQUEsSUFBSCxJQUFBLEVBQUE7aUJBQ0UsTUFBQSxDQURGLEtBQ0UsQztBQURGLFNBQUEsTUFBQTtpQkFHRSxPQUFBLENBSEYsT0FHRSxDOztBQUpHLE9BQVA7O2FBTUEsS0FDRSxDQURGLE1BQUEsQ0FBQSxVQUFBLEVBQUEsUUFBQSxDQUFBLFVBQUEsRUFBQSxJQUFBLEM7QUFYRixLQUFBLEM7QUFmUzs7QUErQlgsRUFBQSxJQUFNLENBQUM7QUFBQSxJQUFBLEtBQUE7QUFBRCxJQUFBO0FBQUMsR0FBRCxFQUFBO1dBQ0osSUFBQSxPQUFBLENBQVksQ0FBQSxPQUFBLEVBQUEsTUFBQSxLQUFBO2FBQ1IsS0FBQyxDQUFELENBQUEsSUFBQSxDQUFGLEtBQUUsQ0FBRixDQUFBLElBQUEsQ0FBQSxFQUFBLEVBQTJCLFVBQUEsS0FBQSxFQUFBLE1BQUEsRUFBQTtBQUN6QixZQUFHLEtBQUEsSUFBSCxJQUFBLEVBQUE7QUFDRSxVQUFBLE1BQUEsQ0FERixLQUNFLENBQUE7QUFERixTQUFBLE1BQUEsQzs7ZUFHQSxPQUFBLENBQUEsTUFBQSxDO0FBSkYsT0FBQSxDO0FBREYsS0FBQSxDO0FBREk7O0FBUU4sRUFBQSxPQUFTLENBQUM7QUFBQSxJQUFBLEtBQUE7QUFBRCxJQUFBO0FBQUMsR0FBRCxFQUFBO1dBQ1AsS0FBQSxTQUFBLENBQ0U7QUFBQSxNQUFBLEtBQUEsRUFBQSxLQUFBO0FBQ0EsTUFBQSxLQUFBLEVBQVUsWUFBQTtBQUNoQixZQUFBLFVBQUE7O0FBQVEsUUFBQSxVQUFBLEdBQWdCLFlBQUE7QUFDeEIsY0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEdBQUEsRUFBQSxPQUFBO0FBQVUsVUFBQSxPQUFBLEdBQUEsRUFBQTs7QUFBQSxlQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsR0FBQSxHQUFBLEdBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxHQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQTs7b0JBQ0UsSSxDQUFBLGtCQUFBLEVBQUEsRztBQURGOzs7QUFEYyxTQUFBLEVBQWhCOztBQUdBLGVBQUEsT0FBUSxFQUFFLENBQUYsSUFBQSxDQUFBLElBQUEsRUFBUixVQUFRLENBQVIsR0FBQTtBQUpRLE9BQUE7QUFEVixLQURGLEM7QUFETzs7QUFTVCxFQUFBLE1BQVEsQ0FBQztBQUFBLElBQUEsS0FBQTtBQUFELElBQUE7QUFBQyxHQUFELEVBQUE7V0FDTixJQUFBLE9BQUEsQ0FBWSxDQUFBLE9BQUEsRUFBQSxNQUFBLEtBQUE7QUFDaEIsVUFBQSxNQUFBO2FBQVEsS0FBQyxDQUFELENBQUEsSUFBQSxDQUFGLEtBQUUsQ0FBRixDQUFBLE1BQUEsQ0FBQSxZQUFBOztBQUEyQixRQUFBLE9BQUEsR0FBQSxFQUFBOztBQUFBLGFBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxHQUFBLEdBQUEsT0FBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLEdBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxFQUFBOzt1QkFBQTtBQUFBLFlBQUEsTUFBQSxFQUFRO0FBQVIsVztBQUFBOzs7QUFBM0IsT0FBQSxFQUFBLEVBQW1FLFVBQUEsS0FBQSxFQUFBLE9BQUEsRUFBQTtBQUNqRSxZQUFHLEtBQUEsSUFBSCxJQUFBLEVBQUE7aUJBQ0UsTUFBQSxDQURGLEtBQ0UsQztBQURGLFNBQUEsTUFBQTtpQkFHRSxPQUFBLENBSEYsT0FHRSxDOztBQUpKLE9BQUEsQztBQURGLEtBQUEsQztBQURNOztBQVNSLEVBQUEsTUFBUSxDQUFDO0FBQUEsSUFBQSxLQUFBO0FBQUEsSUFBQSxFQUFBO0FBQUQsSUFBQTtBQUFDLEdBQUQsRUFBQTtXQUNOLElBQUEsT0FBQSxDQUFZLENBQUEsT0FBQSxFQUFBLE1BQUEsS0FBQTthQUNSLEtBQUMsQ0FBRCxDQUFBLElBQUEsQ0FBRixLQUFFLENBQUYsQ0FBQSxNQUFBLENBQXlCLENBQUU7QUFBQSxRQUFBLEVBQUE7QUFBM0IsUUFBQTtBQUEyQixPQUFGLENBQXpCLEVBQTZDLFVBQUEsS0FBQSxFQUFBLE9BQUEsRUFBQTtBQUMzQyxZQUFHLEtBQUEsSUFBSCxJQUFBLEVBQUE7aUJBQ0UsTUFBQSxDQURGLEtBQ0UsQztBQURGLFNBQUEsTUFBQTtpQkFHRSxPQUFBLENBQVEsT0FBTyxDQUhqQixDQUdpQixDQUFmLEM7O0FBSkosT0FBQSxDO0FBREYsS0FBQSxDO0FBRE07O0FBUVIsRUFBQSxNQUFRLENBQUM7QUFBQSxJQUFBLEtBQUE7QUFBRCxJQUFBO0FBQUMsR0FBRCxFQUFBO1dBQ04sSUFBQSxPQUFBLENBQVksQ0FBQSxPQUFBLEVBQUEsTUFBQSxLQUFBO2FBQ1IsS0FBQyxDQUFELENBQUEsSUFBQSxDQUFGLEtBQUUsQ0FBRixDQUFBLE9BQUEsQ0FBQSxFQUFBLEVBQThCLFVBQUEsS0FBQSxFQUFBLE9BQUEsRUFBQTtBQUM1QixZQUFHLEtBQUEsSUFBSCxJQUFBLEVBQUE7aUJBQ0UsTUFBQSxDQURGLEtBQ0UsQztBQURGLFNBQUEsTUFBQTtpQkFHRSxPQUhGLEU7O0FBREYsT0FBQSxDO0FBREYsS0FBQSxDO0FBRE07O0FBbkZWLENBQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBJdCBmcm9tIFwiQGRhc2hraXRlL2pveS9pdGVyYWJsZVwiXG5pbXBvcnQgeyBnZXRTZWNyZXQgfSBmcm9tIFwiQGRhc2hraXRlL2RvbG9yZXMvc2VjcmV0c1wiXG5pbXBvcnQgQWlydGFibGUgZnJvbSBcImFpcnRhYmxlXCJcblxuY2xhc3MgQmFzZVxuXG4gIEBjcmVhdGU6ICh7c2VjcmV0LCBiYXNlfSkgLT5cbiAgICBjbGllbnQgPSBuZXcgQWlydGFibGUgYXBpS2V5OiBhd2FpdCBnZXRTZWNyZXQgc2VjcmV0XG4gICAgYmFzZSA9IGNsaWVudC5iYXNlIGJhc2VcbiAgICBPYmplY3QuYXNzaWduIChuZXcgQCksIF86IHsgY2xpZW50LCBiYXNlIH1cblxuICBzZWxlY3RPbmU6ICh7IHRhYmxlLCBxdWVyeSB9KSAtPlxuICAgIHF1ZXJ5ID0gKCBAXy5iYXNlIHRhYmxlICkuc2VsZWN0XG4gICAgICBmaWx0ZXJCeUZvcm11bGE6IHF1ZXJ5XG4gICAgICBtYXhSZWNvcmRzOiAxXG4gICAgbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgLT5cbiAgICAgIHF1ZXJ5LmZpcnN0UGFnZSAoZXJyb3IsIHJlY29yZHMpIC0+XG4gICAgICAgIGlmIGVycm9yP1xuICAgICAgICAgIHJlamVjdCBlcnJvclxuICAgICAgICBlbHNlXG4gICAgICAgICAgcmVzb2x2ZSByZWNvcmRzWzBdXG5cbiAgc2VsZWN0QWxsOiAoeyB0YWJsZSwgcXVlcnksIGZpZWxkcywgbWF4UmVjb3JkcywgcGFnZVNpemUsIHNvcnQsIHZpZXcsIGNlbGxGb3JtYXQsIHRpbWVab25lLCB1c2VyTG9jYWxlIH0pIC0+XG4gICAgcGFnZVNpemUgPz0gMTAwXG4gICAgdGFibGUgPSBAXy5iYXNlIHRhYmxlXG4gICAgcmVjb3JkcyA9IFtdXG5cbiAgICBwYXJhbWV0ZXJzID0geyBwYWdlU2l6ZSB9XG4gICAgcGFyYW1ldGVycy5maWVsZHMgPSBmaWVsZHMgaWYgZmllbGRzP1xuICAgIHBhcmFtZXRlcnMuZmlsdGVyQnlGb3JtdWxhID0gcXVlcnkgaWYgcXVlcnk/XG4gICAgcGFyYW1ldGVycy5tYXhSZWNvcmRzID0gbWF4UmVjb3JkcyBpZiBtYXhSZWNvcmRzP1xuICAgIHBhcmFtZXRlcnMuc29ydCA9IHNvcnQgaWYgc29ydD9cbiAgICBwYXJhbWV0ZXJzLnZpZXcgPSB2aWV3IGlmIHZpZXc/XG4gICAgcGFyYW1ldGVycy5jZWxsRm9ybWF0ID0gY2VsbEZvcm1hdCBpZiBjZWxsRm9ybWF0P1xuICAgIHBhcmFtZXRlcnMudGltZVpvbmUgPSB0aW1lWm9uZSBpZiB0aW1lWm9uZT9cbiAgICBwYXJhbWV0ZXJzLnVzZXJMb2NhbGUgPSB1c2VyTG9jYWxlIGlmIHVzZXJMb2NhbGU/XG5cbiAgICBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSAtPlxuICAgICAgYWNjdW11bGF0ZSA9IChwYWdlUmVjb3JkcywgZmV0Y2hOZXh0UGFnZSkgLT5cbiAgICAgICAgcmVjb3Jkcy5wdXNoIHBhZ2VSZWNvcmRzLi4uXG4gICAgICAgIGZldGNoTmV4dFBhZ2UoKVxuXG4gICAgICBkb25lID0gKGVycm9yKSAtPlxuICAgICAgICBpZiBlcnJvcj9cbiAgICAgICAgICByZWplY3QgZXJyb3JcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJlc29sdmUgcmVjb3Jkc1xuICAgXG4gICAgICB0YWJsZVxuICAgICAgICAuc2VsZWN0IHBhcmFtZXRlcnNcbiAgICAgICAgLmVhY2hQYWdlIGFjY3VtdWxhdGUsIGRvbmVcblxuXG4gIGZpbmQ6ICh7IHRhYmxlLCBpZCB9KSAtPlxuICAgIG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICAoIEBfLmJhc2UgdGFibGUgKS5maW5kIGlkLCAoZXJyb3IsIHJlY29yZCkgLT5cbiAgICAgICAgaWYgZXJyb3I/XG4gICAgICAgICAgcmVqZWN0IGVycm9yXG4gICAgICAgIGVsc2VcbiAgICAgICAgcmVzb2x2ZSByZWNvcmRcblxuICBmaW5kQWxsOiAoeyB0YWJsZSwgaWRzIH0pIC0+XG4gICAgQHNlbGVjdEFsbFxuICAgICAgdGFibGU6IHRhYmxlXG4gICAgICBxdWVyeTogZG8gLT5cbiAgICAgICAgY29uZGl0aW9ucyA9IGRvIC0+XG4gICAgICAgICAgZm9yIGlkIGluIGlkc1xuICAgICAgICAgICAgXCJSRUNPUkRfSUQoKSA9ICcje2lkfSdcIlxuICAgICAgICBcIk9SKCAjeyBJdC5qb2luIFwiLCBcIiwgY29uZGl0aW9ucyB9KVwiXG5cbiAgY3JlYXRlOiAoeyB0YWJsZSwgcmVjb3JkcyB9KSAtPlxuICAgIG5ldyBQcm9taXNlICggcmVzb2x2ZSwgcmVqZWN0ICkgPT5cbiAgICAgICggQF8uYmFzZSB0YWJsZSApLmNyZWF0ZSAoIGZpZWxkczogcmVjb3JkIGZvciByZWNvcmQgaW4gcmVjb3JkcyApLCAoIGVycm9yLCByZWNvcmRzICkgLT5cbiAgICAgICAgaWYgZXJyb3I/XG4gICAgICAgICAgcmVqZWN0IGVycm9yXG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZXNvbHZlIHJlY29yZHNcblxuXG4gIHVwZGF0ZTogKHsgdGFibGUsIGlkLCBmaWVsZHMgfSkgLT5cbiAgICBuZXcgUHJvbWlzZSAoIHJlc29sdmUsIHJlamVjdCApID0+XG4gICAgICAoIEBfLmJhc2UgdGFibGUgKS51cGRhdGUgWyB7IGlkLCBmaWVsZHMgfSBdLCAoZXJyb3IsIHJlY29yZHMpIC0+XG4gICAgICAgIGlmIGVycm9yP1xuICAgICAgICAgIHJlamVjdCBlcnJvclxuICAgICAgICBlbHNlXG4gICAgICAgICAgcmVzb2x2ZSByZWNvcmRzWzBdXG5cbiAgZGVsZXRlOiAoeyB0YWJsZSwgaWQgfSkgLT5cbiAgICBuZXcgUHJvbWlzZSAoIHJlc29sdmUsIHJlamVjdCApID0+XG4gICAgICAoIEBfLmJhc2UgdGFibGUgKS5kZXN0cm95IGlkLCAoZXJyb3IsIHJlY29yZHMpIC0+XG4gICAgICAgIGlmIGVycm9yP1xuICAgICAgICAgIHJlamVjdCBlcnJvclxuICAgICAgICBlbHNlXG4gICAgICAgICAgcmVzb2x2ZSgpXG5cbmV4cG9ydCB7XG4gIEJhc2Vcbn0iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=src/base.coffee