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
  (0, _amenConsole.default)(await test("Airtable Helpers", [await test("Base", [await test("selectOne", async function () {
    base = await _base.Base.create(_configuration.default.airtable);
    record = await base.selectOne({
      table: "Test",
      query: "{Name} = 'Test'"
    });
    return _assert.default.equal("Test", record.get("Name"));
  }), await test("update", async function () {
    var notes;
    notes = records.get("Notes");

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
  })])])); // await test "Panda Strike", [
  //   await test "Site", ->
  //     Site.configuration = configuration.airtable
  //     site = await Site.find name: "pandastrike"
  //     assert.equal "appyqbB9hZDPhtTma", site.base
  //   await test "Page", ->
  //     page = await site.find path: "home"
  //     assert page.title?
  //     assert page.main?[0]?.title?
  //     assert page?.main?[0]?.image?.default?.url?
  //     # test that we can generate the page
  //     assert (html page)?
  // ]
  // await test "Finn Mack", [
  //   await test "Site", ->
  //     Site.configuration = configuration.airtable
  //     site = await Site.find name: "finnmack"
  //     assert.equal "appO5rOuvzueUI9P7", site.base
  //   await test "Page", ->
  //     page = await site.find path: "home"
  //     assert page.title?
  //     assert page.main?[0]?.title?
  //     # test that we can generate the page
  //     assert (html page)?
  // ]
  // await test "DashKite", [
  //   await test "Content", ->
  //     Site.configuration = configuration.airtable
  //     site = await Site.find name: "dashkite"
  //     content = await Content.find { site, name: "Sites Intro" }
  //     assert.equal "sites-intro", content.name
  //     assert.equal "Blog Post Template", content.pages[0].name
  // ]
  // await test "Chand (Different Key)", [
  //   await test "Page", ->
  //     Site.configuration = configuration.airtable
  //     site = await Site.find name: "chand-test-01"
  //     page = await site.find path: "home"
  // ]

  return process.exit(_amen.success);
})({});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUZBLElBQUEsSUFBQTs7QUFXQSxJQUFBLEdBQU8sVUFBQSxJQUFBLEVBQUEsQ0FBQSxFQUFBO1NBQ0wsZ0JBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBQSxJQUFBO0FBQ0EsSUFBQSxJQUFBLEVBQU07QUFETixHQURGLEVBQUEsQ0FBQSxDO0FBREssQ0FBUDs7QUFNRyxDQUFBLGdCQUFDO0FBQUEsRUFBQSxJQUFBO0FBQUQsRUFBQTtBQUFDLENBQUQsRUFBQTtBQUVELDRCQUFNLE1BQU0sSUFBQSxDQUFBLGtCQUFBLEVBQXlCLENBRW5DLE1BQU0sSUFBQSxDQUFBLE1BQUEsRUFBYSxDQUVqQixNQUFNLElBQUEsQ0FBQSxXQUFBLEVBQWtCLGtCQUFBO0FBQ3RCLElBQUEsSUFBQSxHQUFPLE1BQU0sV0FBQSxNQUFBLENBQVksdUJBQWxCLFFBQU0sQ0FBYjtBQUNBLElBQUEsTUFBQSxHQUFTLE1BQU0sSUFBSSxDQUFKLFNBQUEsQ0FDYjtBQUFBLE1BQUEsS0FBQSxFQUFBLE1BQUE7QUFDQSxNQUFBLEtBQUEsRUFBTztBQURQLEtBRGEsQ0FBZjtXQUdBLGdCQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQXFCLE1BQU0sQ0FBTixHQUFBLENBQXJCLE1BQXFCLENBQXJCLEM7QUFQZSxHQUVYLENBRlcsRUFTakIsTUFBTSxJQUFBLENBQUEsUUFBQSxFQUFlLGtCQUFBO0FBRTNCLFFBQUEsS0FBQTtBQUFRLElBQUEsS0FBQSxHQUFRLE9BQU8sQ0FBUCxHQUFBLENBQUEsT0FBQSxDQUFSOztBQUVBLFFBQUcsS0FBQSxLQUFILGlCQUFBLEVBQUE7QUFDRSxNQUFBLEtBQUEsR0FERixxQkFDRTtBQURGLEtBQUEsTUFBQTtBQUdFLE1BQUEsS0FBQSxHQUhGLGlCQUdFOzs7QUFFRixJQUFBLE1BQUEsR0FBUyxNQUFNLElBQUksQ0FBSixNQUFBLENBQ2I7QUFBQSxNQUFBLEtBQUEsRUFBQSxNQUFBO0FBQ0EsTUFBQSxFQUFBLEVBQUksTUFBTSxDQURWLEVBQUE7QUFFQSxNQUFBLE1BQUEsRUFDRTtBQUFBLFFBQUEsS0FBQSxFQUFPO0FBQVA7QUFIRixLQURhLENBQWY7V0FNQSxnQkFBQSxLQUFBLENBQUEsS0FBQSxFQUFvQixNQUFNLENBQU4sR0FBQSxDQUFwQixPQUFvQixDQUFwQixDO0FBeEJlLEdBU1gsQ0FUVyxDQUFiLENBRjZCLENBQXpCLENBQVosRUFGQyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBMEZELE9BQU8sQ0FBUCxJQUFBLENBQUEsYUFBQSxDO0FBMUZDLENBQUEsRUFBb0IsRUFBcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0ZXN0IGFzIF90ZXN0LCBzdWNjZXNzIH0gZnJvbSBcIkBkYXNoa2l0ZS9hbWVuXCJcbmltcG9ydCBwcmludCBmcm9tIFwiQGRhc2hraXRlL2FtZW4tY29uc29sZVwiXG5pbXBvcnQgYXNzZXJ0IGZyb20gXCJAZGFzaGtpdGUvYXNzZXJ0XCJcblxuaW1wb3J0IGNvbmZpZ3VyYXRpb24gZnJvbSBcIi4vY29uZmlndXJhdGlvblwiXG5cbmltcG9ydCB7IEJhc2UgfSBmcm9tIFwiLi4vc3JjL2Jhc2VcIlxuaW1wb3J0IHsgU2l0ZSwgUGFnZSwgQ29udGVudCB9IGZyb20gXCIuLi9zcmNcIlxuXG5pbXBvcnQgaHRtbCBmcm9tIFwiLi9oZWxwZXJzL2h0bWxcIlxuXG50ZXN0ID0gKG5hbWUsIGYpIC0+XG4gIF90ZXN0XG4gICAgZGVzY3JpcHRpb246IG5hbWVcbiAgICB3YWl0OiAzMDAwMFxuICAgIGZcblxuZG8gKHsgYmFzZSwgcmVjb3JkIH0gPSB7fSkgLT5cblxuICBwcmludCBhd2FpdCB0ZXN0IFwiQWlydGFibGUgSGVscGVyc1wiLCBbXG5cbiAgICBhd2FpdCB0ZXN0IFwiQmFzZVwiLCBbXG5cbiAgICAgIGF3YWl0IHRlc3QgXCJzZWxlY3RPbmVcIiwgLT5cbiAgICAgICAgYmFzZSA9IGF3YWl0IEJhc2UuY3JlYXRlIGNvbmZpZ3VyYXRpb24uYWlydGFibGVcbiAgICAgICAgcmVjb3JkID0gYXdhaXQgYmFzZS5zZWxlY3RPbmVcbiAgICAgICAgICB0YWJsZTogXCJUZXN0XCJcbiAgICAgICAgICBxdWVyeTogXCJ7TmFtZX0gPSAnVGVzdCdcIlxuICAgICAgICBhc3NlcnQuZXF1YWwgXCJUZXN0XCIsIHJlY29yZC5nZXQgXCJOYW1lXCJcblxuICAgICAgYXdhaXQgdGVzdCBcInVwZGF0ZVwiLCAtPlxuXG4gICAgICAgIG5vdGVzID0gcmVjb3Jkcy5nZXQgXCJOb3Rlc1wiXG5cbiAgICAgICAgaWYgbm90ZXMgPT0gXCJUaGlzIGlzIGEgdGVzdC5cIlxuICAgICAgICAgIG5vdGVzID0gXCJUaGlzIGlzIG5vdCBhIHRlc3QuXCJcbiAgICAgICAgZWxzZVxuICAgICAgICAgIG5vdGVzID0gXCJUaGlzIGlzIGEgdGVzdC5cIlxuXG4gICAgICAgIHJlY29yZCA9IGF3YWl0IGJhc2UudXBkYXRlXG4gICAgICAgICAgdGFibGU6IFwiVGVzdFwiXG4gICAgICAgICAgaWQ6IHJlY29yZC5pZFxuICAgICAgICAgIGZpZWxkczpcbiAgICAgICAgICAgIE5vdGVzOiBub3Rlc1xuICAgICAgICBcbiAgICAgICAgYXNzZXJ0LmVxdWFsIG5vdGVzLCByZWNvcmQuZ2V0IFwiTm90ZXNcIlxuXG4gICAgXVxuXG4gICAgIyBhd2FpdCB0ZXN0IFwiUGFuZGEgU3RyaWtlXCIsIFtcblxuICAgICMgICBhd2FpdCB0ZXN0IFwiU2l0ZVwiLCAtPlxuICAgICMgICAgIFNpdGUuY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb24uYWlydGFibGVcbiAgICAjICAgICBzaXRlID0gYXdhaXQgU2l0ZS5maW5kIG5hbWU6IFwicGFuZGFzdHJpa2VcIlxuICAgICMgICAgIGFzc2VydC5lcXVhbCBcImFwcHlxYkI5aFpEUGh0VG1hXCIsIHNpdGUuYmFzZVxuXG4gICAgIyAgIGF3YWl0IHRlc3QgXCJQYWdlXCIsIC0+XG4gICAgIyAgICAgcGFnZSA9IGF3YWl0IHNpdGUuZmluZCBwYXRoOiBcImhvbWVcIlxuICAgICMgICAgIGFzc2VydCBwYWdlLnRpdGxlP1xuICAgICMgICAgIGFzc2VydCBwYWdlLm1haW4/WzBdPy50aXRsZT9cbiAgICAjICAgICBhc3NlcnQgcGFnZT8ubWFpbj9bMF0/LmltYWdlPy5kZWZhdWx0Py51cmw/XG5cbiAgICAjICAgICAjIHRlc3QgdGhhdCB3ZSBjYW4gZ2VuZXJhdGUgdGhlIHBhZ2VcbiAgICAjICAgICBhc3NlcnQgKGh0bWwgcGFnZSk/XG5cbiAgICAjIF1cblxuICAgICMgYXdhaXQgdGVzdCBcIkZpbm4gTWFja1wiLCBbXG5cbiAgICAjICAgYXdhaXQgdGVzdCBcIlNpdGVcIiwgLT5cbiAgICAjICAgICBTaXRlLmNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uLmFpcnRhYmxlXG4gICAgIyAgICAgc2l0ZSA9IGF3YWl0IFNpdGUuZmluZCBuYW1lOiBcImZpbm5tYWNrXCJcbiAgICAjICAgICBhc3NlcnQuZXF1YWwgXCJhcHBPNXJPdXZ6dWVVSTlQN1wiLCBzaXRlLmJhc2VcblxuICAgICMgICBhd2FpdCB0ZXN0IFwiUGFnZVwiLCAtPlxuICAgICMgICAgIHBhZ2UgPSBhd2FpdCBzaXRlLmZpbmQgcGF0aDogXCJob21lXCJcbiAgICAjICAgICBhc3NlcnQgcGFnZS50aXRsZT9cbiAgICAjICAgICBhc3NlcnQgcGFnZS5tYWluP1swXT8udGl0bGU/XG5cbiAgICAjICAgICAjIHRlc3QgdGhhdCB3ZSBjYW4gZ2VuZXJhdGUgdGhlIHBhZ2VcbiAgICAjICAgICBhc3NlcnQgKGh0bWwgcGFnZSk/XG5cbiAgICAjIF1cbiAgXG4gICAgIyBhd2FpdCB0ZXN0IFwiRGFzaEtpdGVcIiwgW1xuXG4gICAgIyAgIGF3YWl0IHRlc3QgXCJDb250ZW50XCIsIC0+XG4gICAgIyAgICAgU2l0ZS5jb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbi5haXJ0YWJsZVxuICAgICMgICAgIHNpdGUgPSBhd2FpdCBTaXRlLmZpbmQgbmFtZTogXCJkYXNoa2l0ZVwiXG4gICAgIyAgICAgY29udGVudCA9IGF3YWl0IENvbnRlbnQuZmluZCB7IHNpdGUsIG5hbWU6IFwiU2l0ZXMgSW50cm9cIiB9XG4gICAgIyAgICAgYXNzZXJ0LmVxdWFsIFwic2l0ZXMtaW50cm9cIiwgY29udGVudC5uYW1lXG4gICAgIyAgICAgYXNzZXJ0LmVxdWFsIFwiQmxvZyBQb3N0IFRlbXBsYXRlXCIsIGNvbnRlbnQucGFnZXNbMF0ubmFtZVxuXG4gICAgIyBdXG5cbiAgICAjIGF3YWl0IHRlc3QgXCJDaGFuZCAoRGlmZmVyZW50IEtleSlcIiwgW1xuXG4gICAgIyAgIGF3YWl0IHRlc3QgXCJQYWdlXCIsIC0+XG4gICAgIyAgICAgU2l0ZS5jb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbi5haXJ0YWJsZVxuICAgICMgICAgIHNpdGUgPSBhd2FpdCBTaXRlLmZpbmQgbmFtZTogXCJjaGFuZC10ZXN0LTAxXCJcbiAgICAjICAgICBwYWdlID0gYXdhaXQgc2l0ZS5maW5kIHBhdGg6IFwiaG9tZVwiXG5cbiAgICAjIF1cblxuICBdXG5cbiAgXG4gIHByb2Nlc3MuZXhpdCBzdWNjZXNzXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=test/index.coffee