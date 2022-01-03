"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.table = exports.fields = void 0;

var Fn = _interopRequireWildcard(require("@dashkite/joy/function"));

var Meta = _interopRequireWildcard(require("@dashkite/joy/metaclass"));

var Arr = _interopRequireWildcard(require("@dashkite/joy/array"));

var It = _interopRequireWildcard(require("@dashkite/joy/iterable"));

var _helpers = require("./helpers.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var fields,
    table,
    indexOf = [].indexOf;
exports.table = table;
exports.fields = fields;

exports.table = table = function (table) {
  return function (type) {
    type._ = {
      cms: {},
      pending: []
    };
    type.table = table;

    type.fromRecord = function (record) {
      var self;
      self = Object.assign(new type(), {
        _: record
      });

      if (typeof self.prepare === "function") {
        self.prepare();
      }

      return self;
    };

    type.fromID = function (id) {
      return this._.cms[id];
    };

    type.enqueue = function (ids) {
      var i, id, len;

      for (i = 0, len = ids.length; i < len; i++) {
        id = ids[i];

        if (!(this._.cms[id] != null || indexOf.call(this._.pending, id) >= 0)) {
          this._.pending.push(id);
        }
      }

      return type._.pending = It.uniqueBy(_helpers.eq, Arr.cat(ids, type._.pending));
    };

    return type.load = async function ({
      base,
      site
    }) {
      var i, len, object, record, records, results;

      if (this._.pending.length !== 0) {
        records = await base.findAll({
          table: this.table,
          ids: this._.pending
        });
        this._.pending = [];
        results = [];

        for (i = 0, len = records.length; i < len; i++) {
          record = records[i];
          object = this.fromRecord(record);
          object.site = site;
          results.push(this._.cms[record.id] = object);
        }

        return results;
      }
    };
  };
};

exports.fields = fields = function (map) {
  return function (type) {
    type.fields = map;

    type.prototype.prepare = function () {
      var field, key, ref, results;
      ref = this.constructor.fields;
      results = [];

      for (key in ref) {
        field = ref[key];

        if (field.list != null) {
          results.push(field.list.enqueue((0, _helpers.toArray)(this._.get(field.from))));
        }
      }

      return results;
    };

    return Meta.mixin(type.prototype, function () {
      var description, name, results;
      results = [];

      for (name in map) {
        description = map[name];
        results.push(Meta.getter(name, function (name, description) {
          if (description.transform == null) {
            description.transform = function () {
              if (description.list != null) {
                return function (value) {
                  var i, id, len, ref, results1;

                  if (value != null) {
                    ref = (0, _helpers.toArray)(value);
                    results1 = [];

                    for (i = 0, len = ref.length; i < len; i++) {
                      id = ref[i];
                      results1.push(description.list.fromID(id));
                    }

                    return results1;
                  } else {
                    return [];
                  }
                };
              } else {
                return Fn.identity;
              }
            }();
          }

          return function () {
            return description.transform.call(this, this._.get(description.from));
          };
        }(name, description)));
      }

      return results;
    }());
  };
};
//# sourceMappingURL=data:application/json;base64,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QUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxHQUFBLEdBQUEsR0FBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLEdBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxFQUFBOztvQ0FBQSxXQUFXLENBQUMsSUFBWixDQUFBLE1BQUEsQ0FBQSxFQUFBLEM7QUFBQTs7MkJBREYsUTtBQUFBLG1CQUFBLE1BQUE7MkJBQUEsRTs7QUFGSixpQjtBQUFBLGVBQUEsTUFBQTt1QkFPRSxFQUFFLENBUEosUTs7QUFEMEIsYUFBQSxFQUE1Qjs7O2lCQVVBLFlBQUE7bUJBQUcsV0FBVyxDQUFDLFNBQVosQ0FBQSxJQUFBLENBQUEsSUFBQSxFQUE4QixLQUFDLENBQUQsQ0FBQSxHQUFBLENBQU8sV0FBVyxDQUFoRCxJQUE4QixDQUE5QixDO0FBQUgsVztBQVhtQixTQUFBLENBQUMsSUFBRCxFQUFyQixXQUFxQixDQUFyQixDO0FBREY7OztBQURGLEtBQXNCLEVBQXRCLEM7QUFQRixHO0FBRk8sQ0FBVCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEZuIGZyb20gXCJAZGFzaGtpdGUvam95L2Z1bmN0aW9uXCJcbmltcG9ydCAqIGFzIE1ldGEgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvbWV0YWNsYXNzXCJcbmltcG9ydCAqIGFzIEFyciBmcm9tIFwiQGRhc2hraXRlL2pveS9hcnJheVwiXG5pbXBvcnQgKiBhcyBJdCBmcm9tIFwiQGRhc2hraXRlL2pveS9pdGVyYWJsZVwiXG5pbXBvcnQgeyBlcSwgdG9BcnJheSB9IGZyb20gXCIuL2hlbHBlcnNcIlxuXG50YWJsZSA9ICh0YWJsZSkgLT5cbiAgKHR5cGUpIC0+XG4gICAgdHlwZS5fID1cbiAgICAgIGNtczoge31cbiAgICAgIHBlbmRpbmc6IFtdXG4gICAgdHlwZS50YWJsZSA9IHRhYmxlXG4gICAgdHlwZS5mcm9tUmVjb3JkID0gKHJlY29yZCkgLT5cbiAgICAgIHNlbGYgPSBPYmplY3QuYXNzaWduIChuZXcgdHlwZSksIF86IHJlY29yZFxuICAgICAgc2VsZi5wcmVwYXJlPygpXG4gICAgICBzZWxmXG4gICAgdHlwZS5mcm9tSUQgPSAoaWQpIC0+IEBfLmNtc1sgaWQgXVxuICAgIHR5cGUuZW5xdWV1ZSA9IChpZHMpIC0+XG4gICAgICBmb3IgaWQgaW4gaWRzIHdoZW4gISAoKCBAXy5jbXNbIGlkIF0/ICkgfHwgKCBpZCBpbiBAXy5wZW5kaW5nICkpXG4gICAgICAgIEBfLnBlbmRpbmcucHVzaCBpZFxuICAgICAgdHlwZS5fLnBlbmRpbmcgPSBJdC51bmlxdWVCeSBlcSwgQXJyLmNhdCBpZHMsIHR5cGUuXy5wZW5kaW5nXG4gICAgdHlwZS5sb2FkID0gKHsgYmFzZSwgc2l0ZSB9KSAtPlxuICAgICAgdW5sZXNzIEBfLnBlbmRpbmcubGVuZ3RoID09IDBcbiAgICAgICAgcmVjb3JkcyA9IGF3YWl0IGJhc2UuZmluZEFsbCB0YWJsZTogQHRhYmxlLCBpZHM6IEBfLnBlbmRpbmdcbiAgICAgICAgQF8ucGVuZGluZyA9IFtdXG4gICAgICAgIGZvciByZWNvcmQgaW4gcmVjb3Jkc1xuICAgICAgICAgIG9iamVjdCA9IEBmcm9tUmVjb3JkIHJlY29yZFxuICAgICAgICAgIG9iamVjdC5zaXRlID0gc2l0ZVxuICAgICAgICAgIEBfLmNtc1sgcmVjb3JkLmlkIF0gPSBvYmplY3RcblxuZmllbGRzID0gKG1hcCkgLT5cblxuICAodHlwZSkgLT5cbiAgICB0eXBlLmZpZWxkcyA9IG1hcFxuXG4gICAgdHlwZTo6cHJlcGFyZSA9IC0+XG4gICAgICBmb3Iga2V5LCBmaWVsZCBvZiBAY29uc3RydWN0b3IuZmllbGRzIHdoZW4gZmllbGQubGlzdD9cbiAgICAgICAgZmllbGQubGlzdC5lbnF1ZXVlIHRvQXJyYXkgQF8uZ2V0IGZpZWxkLmZyb21cblxuICAgIE1ldGEubWl4aW4gdHlwZTo6LCBkbyAtPlxuICAgICAgZm9yIG5hbWUsIGRlc2NyaXB0aW9uIG9mIG1hcFxuICAgICAgICBNZXRhLmdldHRlciBuYW1lLCBkbyAobmFtZSwgZGVzY3JpcHRpb24pIC0+XG4gICAgICAgICAgZGVzY3JpcHRpb24udHJhbnNmb3JtID89IGRvIC0+XG4gICAgICAgICAgICBpZiBkZXNjcmlwdGlvbi5saXN0P1xuICAgICAgICAgICAgICAodmFsdWUpIC0+XG4gICAgICAgICAgICAgICAgaWYgdmFsdWU/XG4gICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbi5saXN0LmZyb21JRCBpZCBmb3IgaWQgaW4gKCB0b0FycmF5IHZhbHVlIClcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICBbXVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBGbi5pZGVudGl0eVxuXG4gICAgICAgICAgLT4gZGVzY3JpcHRpb24udHJhbnNmb3JtLmNhbGwgQCwgQF8uZ2V0IGRlc2NyaXB0aW9uLmZyb21cblxuZXhwb3J0IHtcbiAgdGFibGVcbiAgZmllbGRzXG59Il0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=src/mixins.coffee