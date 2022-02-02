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

      if (record != null) {
        self = Object.assign(new type(), {
          _: record
        });

        if (typeof self.prepare === "function") {
          self.prepare();
        }

        return self;
      }
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

    type.load = async function ({
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

    return type.prototype.save = function () {
      return this.site.base.update({
        table: this.constructor.table,
        id: this._.id,
        fields: this.changes
      });
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
        results.push(function (name, description) {
          var _get;

          _get = function (self) {
            var ref;
            return (ref = self._.get(description.from)) != null ? ref : description.default;
          };

          if (description.list != null) {
            return Meta.getter(name, function () {
              var i, id, len, ref, results1, value;

              if ((value = _get(this)) != null) {
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
            });
          } else if (description.transform != null) {
            return Meta.getter(name, function () {
              var value;

              if ((value = _get(this)) != null) {
                return description.transform.call(this, value);
              }
            });
          } else {
            // TODO handle mapping linked objects?
            return Meta.property(name, {
              get: function () {
                var ref, ref1;
                return (ref = (ref1 = this.changes) != null ? ref1[description.from] : void 0) != null ? ref : _get(this);
              },
              set: function (value) {
                if (this.changes == null) {
                  this.changes = {};
                }

                return this.changes[description.from] = value;
              }
            });
          }
        }(name, description));
      }

      return results;
    }());
  };
};
//# sourceMappingURL=data:application/json;base64,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LEdBQUEsRUFBSyxVQUFBLEtBQUEsRUFBQTs7QUFDSCx1QkFBQyxPQUFELEdBQVksRUFBWjs7O3VCQUNBLEtBQUMsT0FBRCxDQUFVLFdBQVcsQ0FBckIsSUFBQSxJQUErQixLO0FBRjVCO0FBREwsYUFERixDOztBQWRELFNBQUEsQ0FBQyxJQUFELEVBQU8sV0FBUCxDO0FBREw7OztBQURGLEtBQXNCLEVBQXRCLEM7QUFQRixHO0FBRk8sQ0FBVCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEZuIGZyb20gXCJAZGFzaGtpdGUvam95L2Z1bmN0aW9uXCJcbmltcG9ydCAqIGFzIE1ldGEgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvbWV0YWNsYXNzXCJcbmltcG9ydCAqIGFzIEFyciBmcm9tIFwiQGRhc2hraXRlL2pveS9hcnJheVwiXG5pbXBvcnQgKiBhcyBJdCBmcm9tIFwiQGRhc2hraXRlL2pveS9pdGVyYWJsZVwiXG5pbXBvcnQgeyBlcSwgdG9BcnJheSB9IGZyb20gXCIuL2hlbHBlcnNcIlxuXG50YWJsZSA9ICh0YWJsZSkgLT5cbiAgKHR5cGUpIC0+XG4gICAgdHlwZS5fID1cbiAgICAgIGNtczoge31cbiAgICAgIHBlbmRpbmc6IFtdXG4gICAgdHlwZS50YWJsZSA9IHRhYmxlXG4gICAgdHlwZS5mcm9tUmVjb3JkID0gKHJlY29yZCkgLT5cbiAgICAgIGlmIHJlY29yZD9cbiAgICAgICAgc2VsZiA9IE9iamVjdC5hc3NpZ24gKG5ldyB0eXBlKSwgXzogcmVjb3JkXG4gICAgICAgIHNlbGYucHJlcGFyZT8oKVxuICAgICAgICBzZWxmXG4gICAgdHlwZS5mcm9tSUQgPSAoaWQpIC0+IEBfLmNtc1sgaWQgXVxuICAgIHR5cGUuZW5xdWV1ZSA9IChpZHMpIC0+XG4gICAgICBmb3IgaWQgaW4gaWRzIHdoZW4gISAoKCBAXy5jbXNbIGlkIF0/ICkgfHwgKCBpZCBpbiBAXy5wZW5kaW5nICkpXG4gICAgICAgIEBfLnBlbmRpbmcucHVzaCBpZFxuICAgICAgdHlwZS5fLnBlbmRpbmcgPSBJdC51bmlxdWVCeSBlcSwgQXJyLmNhdCBpZHMsIHR5cGUuXy5wZW5kaW5nXG4gICAgdHlwZS5sb2FkID0gKHsgYmFzZSwgc2l0ZSB9KSAtPlxuICAgICAgdW5sZXNzIEBfLnBlbmRpbmcubGVuZ3RoID09IDBcbiAgICAgICAgcmVjb3JkcyA9IGF3YWl0IGJhc2UuZmluZEFsbCB0YWJsZTogQHRhYmxlLCBpZHM6IEBfLnBlbmRpbmdcbiAgICAgICAgQF8ucGVuZGluZyA9IFtdXG4gICAgICAgIGZvciByZWNvcmQgaW4gcmVjb3Jkc1xuICAgICAgICAgIG9iamVjdCA9IEBmcm9tUmVjb3JkIHJlY29yZFxuICAgICAgICAgIG9iamVjdC5zaXRlID0gc2l0ZVxuICAgICAgICAgIEBfLmNtc1sgcmVjb3JkLmlkIF0gPSBvYmplY3RcbiAgICB0eXBlOjpzYXZlID0gLT5cbiAgICAgIEBzaXRlLmJhc2UudXBkYXRlIFxuICAgICAgICB0YWJsZTogQGNvbnN0cnVjdG9yLnRhYmxlXG4gICAgICAgIGlkOiBAXy5pZFxuICAgICAgICBmaWVsZHM6IEBjaGFuZ2VzXG5cbmZpZWxkcyA9IChtYXApIC0+XG5cbiAgKHR5cGUpIC0+XG4gICAgdHlwZS5maWVsZHMgPSBtYXBcblxuICAgIHR5cGU6OnByZXBhcmUgPSAtPlxuICAgICAgZm9yIGtleSwgZmllbGQgb2YgQGNvbnN0cnVjdG9yLmZpZWxkcyB3aGVuIGZpZWxkLmxpc3Q/XG4gICAgICAgIGZpZWxkLmxpc3QuZW5xdWV1ZSB0b0FycmF5IEBfLmdldCBmaWVsZC5mcm9tXG5cbiAgICBNZXRhLm1peGluIHR5cGU6OiwgZG8gLT5cbiAgICAgIGZvciBuYW1lLCBkZXNjcmlwdGlvbiBvZiBtYXBcbiAgICAgICAgZG8gKG5hbWUsIGRlc2NyaXB0aW9uKSAtPlxuICAgICAgICAgIF9nZXQgPSAoc2VsZikgLT4gKHNlbGYuXy5nZXQgZGVzY3JpcHRpb24uZnJvbSkgPyBkZXNjcmlwdGlvbi5kZWZhdWx0XG4gICAgICAgICAgaWYgZGVzY3JpcHRpb24ubGlzdD9cbiAgICAgICAgICAgIE1ldGEuZ2V0dGVyIG5hbWUsIC0+XG4gICAgICAgICAgICAgIGlmICggdmFsdWUgPSBfZ2V0IEAgKT9cbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbi5saXN0LmZyb21JRCBpZCBmb3IgaWQgaW4gKCB0b0FycmF5IHZhbHVlIClcbiAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIFtdXG4gICAgICAgICAgZWxzZSBpZiBkZXNjcmlwdGlvbi50cmFuc2Zvcm0/XG4gICAgICAgICAgICBNZXRhLmdldHRlciBuYW1lLCAtPlxuICAgICAgICAgICAgICBpZiAoIHZhbHVlID0gX2dldCBAICk/XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24udHJhbnNmb3JtLmNhbGwgQCwgdmFsdWVcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAjIFRPRE8gaGFuZGxlIG1hcHBpbmcgbGlua2VkIG9iamVjdHM/XG4gICAgICAgICAgICBNZXRhLnByb3BlcnR5IG5hbWUsXG4gICAgICAgICAgICAgIGdldDogLT4gQGNoYW5nZXM/WyBkZXNjcmlwdGlvbi5mcm9tIF0gPyBfZ2V0IEBcbiAgICAgICAgICAgICAgc2V0OiAodmFsdWUpIC0+XG4gICAgICAgICAgICAgICAgQGNoYW5nZXMgPz0ge31cbiAgICAgICAgICAgICAgICBAY2hhbmdlc1sgZGVzY3JpcHRpb24uZnJvbSBdID0gdmFsdWVcblxuZXhwb3J0IHtcbiAgdGFibGVcbiAgZmllbGRzXG59Il0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=src/mixins.coffee