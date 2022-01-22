"use strict";

var _amen = require("@dashkite/amen");

var _amenConsole = _interopRequireDefault(require("@dashkite/amen-console"));

var _assert = _interopRequireDefault(require("@dashkite/assert"));

var _configuration = _interopRequireDefault(require("./configuration.js"));

var _base = require("../src/base.js");

var _index = require("../src/index.js");

var _html = _interopRequireDefault(require("./helpers/html.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var test;

test = function (name, f) {
  return (0, _amen.test)({
    description: name,
    wait: 30000
  }, f);
};

(async function ({
  base,
  record
}) {
  (0, _amenConsole.default)(await test("Airtable Helpers", [await test("Base", [await test("create", async function () {
    base = await _base.Base.create(_configuration.default.airtable);
    return await base.create({
      table: "Test",
      records: [{
        "Name": "Test",
        "Notes": "This is a test."
      }]
    });
  }), await test("selectOne", async function () {
    record = await base.selectOne({
      table: "Test",
      query: "{Name} = 'Test'"
    });
    return _assert.default.equal("Test", record.get("Name"));
  }), await test("update", async function () {
    var notes;
    notes = record.get("Notes");

    if (notes === "This is a test.") {
      notes = "This is not a test.";
    } else {
      notes = "This is a test.";
    }

    record = await base.update({
      table: "Test",
      id: record.id,
      fields: {
        Notes: notes
      }
    });
    return _assert.default.equal(notes, record.get("Notes"));
  }), await test("delete", async function () {
    return await base.delete({
      table: "Test",
      id: record.id
    });
  })])]));
  return process.exit(_amen.success);
})({});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUZBLElBQUEsSUFBQTs7QUFXQSxJQUFBLEdBQU8sVUFBQSxJQUFBLEVBQUEsQ0FBQSxFQUFBO1NBQ0wsZ0JBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBQSxJQUFBO0FBQ0EsSUFBQSxJQUFBLEVBQU07QUFETixHQURGLEVBQUEsQ0FBQSxDO0FBREssQ0FBUDs7QUFNRyxDQUFBLGdCQUFDO0FBQUEsRUFBQSxJQUFBO0FBQUQsRUFBQTtBQUFDLENBQUQsRUFBQTtBQUVELDRCQUFNLE1BQU0sSUFBQSxDQUFBLGtCQUFBLEVBQXlCLENBRW5DLE1BQU0sSUFBQSxDQUFBLE1BQUEsRUFBYSxDQUVqQixNQUFNLElBQUEsQ0FBQSxRQUFBLEVBQWUsa0JBQUE7QUFDbkIsSUFBQSxJQUFBLEdBQU8sTUFBTSxXQUFBLE1BQUEsQ0FBWSx1QkFBbEIsUUFBTSxDQUFiO0FBQ0EsV0FBQSxNQUFNLElBQUksQ0FBSixNQUFBLENBQ0o7QUFBQSxNQUFBLEtBQUEsRUFBQSxNQUFBO0FBQ0EsTUFBQSxPQUFBLEVBQVMsQ0FDUDtBQUFBLGdCQUFBLE1BQUE7QUFDQSxpQkFBUztBQURULE9BRE87QUFEVCxLQURJLENBQU47QUFKZSxHQUVYLENBRlcsRUFXakIsTUFBTSxJQUFBLENBQUEsV0FBQSxFQUFrQixrQkFBQTtBQUN0QixJQUFBLE1BQUEsR0FBUyxNQUFNLElBQUksQ0FBSixTQUFBLENBQ2I7QUFBQSxNQUFBLEtBQUEsRUFBQSxNQUFBO0FBQ0EsTUFBQSxLQUFBLEVBQU87QUFEUCxLQURhLENBQWY7V0FHQSxnQkFBQSxLQUFBLENBQUEsTUFBQSxFQUFxQixNQUFNLENBQU4sR0FBQSxDQUFyQixNQUFxQixDQUFyQixDO0FBZmUsR0FXWCxDQVhXLEVBaUJqQixNQUFNLElBQUEsQ0FBQSxRQUFBLEVBQWUsa0JBQUE7QUFFM0IsUUFBQSxLQUFBO0FBQVEsSUFBQSxLQUFBLEdBQVEsTUFBTSxDQUFOLEdBQUEsQ0FBQSxPQUFBLENBQVI7O0FBRUEsUUFBRyxLQUFBLEtBQUgsaUJBQUEsRUFBQTtBQUNFLE1BQUEsS0FBQSxHQURGLHFCQUNFO0FBREYsS0FBQSxNQUFBO0FBR0UsTUFBQSxLQUFBLEdBSEYsaUJBR0U7OztBQUVGLElBQUEsTUFBQSxHQUFTLE1BQU0sSUFBSSxDQUFKLE1BQUEsQ0FDYjtBQUFBLE1BQUEsS0FBQSxFQUFBLE1BQUE7QUFDQSxNQUFBLEVBQUEsRUFBSSxNQUFNLENBRFYsRUFBQTtBQUVBLE1BQUEsTUFBQSxFQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU87QUFBUDtBQUhGLEtBRGEsQ0FBZjtXQU1BLGdCQUFBLEtBQUEsQ0FBQSxLQUFBLEVBQW9CLE1BQU0sQ0FBTixHQUFBLENBQXBCLE9BQW9CLENBQXBCLEM7QUFoQ2UsR0FpQlgsQ0FqQlcsRUFrQ2pCLE1BQU0sSUFBQSxDQUFBLFFBQUEsRUFBZSxrQkFBQTtBQUNuQixXQUFBLE1BQU0sSUFBSSxDQUFKLE1BQUEsQ0FDSjtBQUFBLE1BQUEsS0FBQSxFQUFBLE1BQUE7QUFDQSxNQUFBLEVBQUEsRUFBSSxNQUFNLENBQUM7QUFEWCxLQURJLENBQU47QUFuQ2UsR0FrQ1gsQ0FsQ1csQ0FBYixDQUY2QixDQUF6QixDQUFaO1NBK0NBLE9BQU8sQ0FBUCxJQUFBLENBQUEsYUFBQSxDO0FBakRDLENBQUEsRUFBb0IsRUFBcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0ZXN0IGFzIF90ZXN0LCBzdWNjZXNzIH0gZnJvbSBcIkBkYXNoa2l0ZS9hbWVuXCJcbmltcG9ydCBwcmludCBmcm9tIFwiQGRhc2hraXRlL2FtZW4tY29uc29sZVwiXG5pbXBvcnQgYXNzZXJ0IGZyb20gXCJAZGFzaGtpdGUvYXNzZXJ0XCJcblxuaW1wb3J0IGNvbmZpZ3VyYXRpb24gZnJvbSBcIi4vY29uZmlndXJhdGlvblwiXG5cbmltcG9ydCB7IEJhc2UgfSBmcm9tIFwiLi4vc3JjL2Jhc2VcIlxuaW1wb3J0IHsgU2l0ZSwgUGFnZSwgQ29udGVudCB9IGZyb20gXCIuLi9zcmNcIlxuXG5pbXBvcnQgaHRtbCBmcm9tIFwiLi9oZWxwZXJzL2h0bWxcIlxuXG50ZXN0ID0gKG5hbWUsIGYpIC0+XG4gIF90ZXN0XG4gICAgZGVzY3JpcHRpb246IG5hbWVcbiAgICB3YWl0OiAzMDAwMFxuICAgIGZcblxuZG8gKHsgYmFzZSwgcmVjb3JkIH0gPSB7fSkgLT5cblxuICBwcmludCBhd2FpdCB0ZXN0IFwiQWlydGFibGUgSGVscGVyc1wiLCBbXG5cbiAgICBhd2FpdCB0ZXN0IFwiQmFzZVwiLCBbXG5cbiAgICAgIGF3YWl0IHRlc3QgXCJjcmVhdGVcIiwgLT5cbiAgICAgICAgYmFzZSA9IGF3YWl0IEJhc2UuY3JlYXRlIGNvbmZpZ3VyYXRpb24uYWlydGFibGVcbiAgICAgICAgYXdhaXQgYmFzZS5jcmVhdGVcbiAgICAgICAgICB0YWJsZTogXCJUZXN0XCJcbiAgICAgICAgICByZWNvcmRzOiBbXG4gICAgICAgICAgICBcIk5hbWVcIjogXCJUZXN0XCJcbiAgICAgICAgICAgIFwiTm90ZXNcIjogXCJUaGlzIGlzIGEgdGVzdC5cIlxuICAgICAgICAgIF1cblxuICAgICAgYXdhaXQgdGVzdCBcInNlbGVjdE9uZVwiLCAtPlxuICAgICAgICByZWNvcmQgPSBhd2FpdCBiYXNlLnNlbGVjdE9uZVxuICAgICAgICAgIHRhYmxlOiBcIlRlc3RcIlxuICAgICAgICAgIHF1ZXJ5OiBcIntOYW1lfSA9ICdUZXN0J1wiXG4gICAgICAgIGFzc2VydC5lcXVhbCBcIlRlc3RcIiwgcmVjb3JkLmdldCBcIk5hbWVcIlxuXG4gICAgICBhd2FpdCB0ZXN0IFwidXBkYXRlXCIsIC0+XG5cbiAgICAgICAgbm90ZXMgPSByZWNvcmQuZ2V0IFwiTm90ZXNcIlxuXG4gICAgICAgIGlmIG5vdGVzID09IFwiVGhpcyBpcyBhIHRlc3QuXCJcbiAgICAgICAgICBub3RlcyA9IFwiVGhpcyBpcyBub3QgYSB0ZXN0LlwiXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBub3RlcyA9IFwiVGhpcyBpcyBhIHRlc3QuXCJcblxuICAgICAgICByZWNvcmQgPSBhd2FpdCBiYXNlLnVwZGF0ZVxuICAgICAgICAgIHRhYmxlOiBcIlRlc3RcIlxuICAgICAgICAgIGlkOiByZWNvcmQuaWRcbiAgICAgICAgICBmaWVsZHM6XG4gICAgICAgICAgICBOb3Rlczogbm90ZXNcbiAgICAgICAgXG4gICAgICAgIGFzc2VydC5lcXVhbCBub3RlcywgcmVjb3JkLmdldCBcIk5vdGVzXCJcblxuICAgICAgYXdhaXQgdGVzdCBcImRlbGV0ZVwiLCAtPlxuICAgICAgICBhd2FpdCBiYXNlLmRlbGV0ZVxuICAgICAgICAgIHRhYmxlOiBcIlRlc3RcIlxuICAgICAgICAgIGlkOiByZWNvcmQuaWRcblxuICAgIF1cblxuXG4gIF1cblxuICBcbiAgcHJvY2Vzcy5leGl0IHN1Y2Nlc3NcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=test/index.coffee