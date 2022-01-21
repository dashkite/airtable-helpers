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
          if (description.list != null) {
            return Meta.getter(name, function () {
              var i, id, len, ref, results1, value;

              if ((value = this._.get(description.from)) != null) {
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

              if ((value = this._.get(description.from)) != null) {
                return description.transform.call(this, value);
              }
            });
          } else {
            // TODO handle mapping linked objects?
            return Meta.property(name, {
              get: function () {
                var ref, ref1;
                return (ref = (ref1 = this.changes) != null ? ref1[description.from] : void 0) != null ? ref : this._.get(description.from);
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
//# sourceMappingURL=data:application/json;base64,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QUFBOztBQUNILHVCQUFDLE9BQUQsR0FBWSxFQUFaOzs7dUJBQ0EsS0FBQyxPQUFELENBQVUsV0FBVyxDQUFyQixJQUFBLElBQStCLEs7QUFGNUI7QUFETCxhQURGLEM7O0FBYkQsU0FBQSxDQUFDLElBQUQsRUFBTyxXQUFQLEM7QUFETDs7O0FBREYsS0FBc0IsRUFBdEIsQztBQVBGLEc7QUFGTyxDQUFUIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgRm4gZnJvbSBcIkBkYXNoa2l0ZS9qb3kvZnVuY3Rpb25cIlxuaW1wb3J0ICogYXMgTWV0YSBmcm9tIFwiQGRhc2hraXRlL2pveS9tZXRhY2xhc3NcIlxuaW1wb3J0ICogYXMgQXJyIGZyb20gXCJAZGFzaGtpdGUvam95L2FycmF5XCJcbmltcG9ydCAqIGFzIEl0IGZyb20gXCJAZGFzaGtpdGUvam95L2l0ZXJhYmxlXCJcbmltcG9ydCB7IGVxLCB0b0FycmF5IH0gZnJvbSBcIi4vaGVscGVyc1wiXG5cbnRhYmxlID0gKHRhYmxlKSAtPlxuICAodHlwZSkgLT5cbiAgICB0eXBlLl8gPVxuICAgICAgY21zOiB7fVxuICAgICAgcGVuZGluZzogW11cbiAgICB0eXBlLnRhYmxlID0gdGFibGVcbiAgICB0eXBlLmZyb21SZWNvcmQgPSAocmVjb3JkKSAtPlxuICAgICAgaWYgcmVjb3JkP1xuICAgICAgICBzZWxmID0gT2JqZWN0LmFzc2lnbiAobmV3IHR5cGUpLCBfOiByZWNvcmRcbiAgICAgICAgc2VsZi5wcmVwYXJlPygpXG4gICAgICAgIHNlbGZcbiAgICB0eXBlLmZyb21JRCA9IChpZCkgLT4gQF8uY21zWyBpZCBdXG4gICAgdHlwZS5lbnF1ZXVlID0gKGlkcykgLT5cbiAgICAgIGZvciBpZCBpbiBpZHMgd2hlbiAhICgoIEBfLmNtc1sgaWQgXT8gKSB8fCAoIGlkIGluIEBfLnBlbmRpbmcgKSlcbiAgICAgICAgQF8ucGVuZGluZy5wdXNoIGlkXG4gICAgICB0eXBlLl8ucGVuZGluZyA9IEl0LnVuaXF1ZUJ5IGVxLCBBcnIuY2F0IGlkcywgdHlwZS5fLnBlbmRpbmdcbiAgICB0eXBlLmxvYWQgPSAoeyBiYXNlLCBzaXRlIH0pIC0+XG4gICAgICB1bmxlc3MgQF8ucGVuZGluZy5sZW5ndGggPT0gMFxuICAgICAgICByZWNvcmRzID0gYXdhaXQgYmFzZS5maW5kQWxsIHRhYmxlOiBAdGFibGUsIGlkczogQF8ucGVuZGluZ1xuICAgICAgICBAXy5wZW5kaW5nID0gW11cbiAgICAgICAgZm9yIHJlY29yZCBpbiByZWNvcmRzXG4gICAgICAgICAgb2JqZWN0ID0gQGZyb21SZWNvcmQgcmVjb3JkXG4gICAgICAgICAgb2JqZWN0LnNpdGUgPSBzaXRlXG4gICAgICAgICAgQF8uY21zWyByZWNvcmQuaWQgXSA9IG9iamVjdFxuICAgIHR5cGU6OnNhdmUgPSAtPlxuICAgICAgQHNpdGUuYmFzZS51cGRhdGUgXG4gICAgICAgIHRhYmxlOiBAY29uc3RydWN0b3IudGFibGVcbiAgICAgICAgaWQ6IEBfLmlkXG4gICAgICAgIGZpZWxkczogQGNoYW5nZXNcblxuZmllbGRzID0gKG1hcCkgLT5cblxuICAodHlwZSkgLT5cbiAgICB0eXBlLmZpZWxkcyA9IG1hcFxuXG4gICAgdHlwZTo6cHJlcGFyZSA9IC0+XG4gICAgICBmb3Iga2V5LCBmaWVsZCBvZiBAY29uc3RydWN0b3IuZmllbGRzIHdoZW4gZmllbGQubGlzdD9cbiAgICAgICAgZmllbGQubGlzdC5lbnF1ZXVlIHRvQXJyYXkgQF8uZ2V0IGZpZWxkLmZyb21cblxuICAgIE1ldGEubWl4aW4gdHlwZTo6LCBkbyAtPlxuICAgICAgZm9yIG5hbWUsIGRlc2NyaXB0aW9uIG9mIG1hcFxuICAgICAgICBkbyAobmFtZSwgZGVzY3JpcHRpb24pIC0+XG4gICAgICAgICAgaWYgZGVzY3JpcHRpb24ubGlzdD9cbiAgICAgICAgICAgIE1ldGEuZ2V0dGVyIG5hbWUsIC0+XG4gICAgICAgICAgICAgIGlmICggdmFsdWUgPSBAXy5nZXQgZGVzY3JpcHRpb24uZnJvbSApP1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLmxpc3QuZnJvbUlEIGlkIGZvciBpZCBpbiAoIHRvQXJyYXkgdmFsdWUgKVxuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgW11cbiAgICAgICAgICBlbHNlIGlmIGRlc2NyaXB0aW9uLnRyYW5zZm9ybT9cbiAgICAgICAgICAgIE1ldGEuZ2V0dGVyIG5hbWUsIC0+XG4gICAgICAgICAgICAgIGlmICggdmFsdWUgPSBAXy5nZXQgZGVzY3JpcHRpb24uZnJvbSApP1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLnRyYW5zZm9ybS5jYWxsIEAsIHZhbHVlXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgIyBUT0RPIGhhbmRsZSBtYXBwaW5nIGxpbmtlZCBvYmplY3RzP1xuICAgICAgICAgICAgTWV0YS5wcm9wZXJ0eSBuYW1lLFxuICAgICAgICAgICAgICBnZXQ6IC0+IEBjaGFuZ2VzP1sgZGVzY3JpcHRpb24uZnJvbSBdID8gQF8uZ2V0IGRlc2NyaXB0aW9uLmZyb21cbiAgICAgICAgICAgICAgc2V0OiAodmFsdWUpIC0+XG4gICAgICAgICAgICAgICAgQGNoYW5nZXMgPz0ge31cbiAgICAgICAgICAgICAgICBAY2hhbmdlc1sgZGVzY3JpcHRpb24uZnJvbSBdID0gdmFsdWVcblxuZXhwb3J0IHtcbiAgdGFibGVcbiAgZmllbGRzXG59Il0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=src/mixins.coffee