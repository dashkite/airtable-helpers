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
  site
}) {
  (0, _amenConsole.default)(await test("Airtable Helpers", [// await test "Base", [
  //   await test "Get Site", ->
  //     base = await Base.create configuration.airtable
  //     site = await base.selectOne
  //       table: "Sites"
  //       query: "{Name} = 'pandastrike'"
  //     assert.equal "appyqbB9hZDPhtTma", site.get "Base"
  //   await test "Get Content", ->
  //     { key } = configuration.airtable
  //     base = site.get "Base"
  //     base = await Base.create { key, base }
  //     content = await base.selectOne
  //       table: "Pages"
  //       query: "{Name} = 'Home'"
  //     assert.equal "Panda Strike", content.get "Title"
  // ]
  await test("Panda Strike", [await test("Site", async function () {
    _index.Site.configuration = _configuration.default.airtable;
    site = await _index.Site.find({
      name: "pandastrike"
    });
    return _assert.default.equal("appyqbB9hZDPhtTma", site.base);
  }), await test("Page", async function () {
    var page, ref, ref1, ref2, ref3, ref4, ref5;
    page = await site.find({
      path: "home"
    });
    (0, _assert.default)(page.title != null);
    (0, _assert.default)(((ref = page.main) != null ? (ref1 = ref[0]) != null ? ref1.title : void 0 : void 0) != null);
    (0, _assert.default)((page != null ? (ref2 = page.main) != null ? (ref3 = ref2[0]) != null ? (ref4 = ref3.image) != null ? (ref5 = ref4.default) != null ? ref5.url : void 0 : void 0 : void 0 : void 0 : void 0) != null); // test that we can generate the page

    return (0, _assert.default)((0, _html.default)(page) != null);
  })]), await test("Finn Mack", [await test("Site", async function () {
    _index.Site.configuration = _configuration.default.airtable;
    site = await _index.Site.find({
      name: "finnmack"
    });
    return _assert.default.equal("appO5rOuvzueUI9P7", site.base);
  }), await test("Page", async function () {
    var page, ref, ref1;
    page = await site.find({
      path: "home"
    });
    (0, _assert.default)(page.title != null);
    (0, _assert.default)(((ref = page.main) != null ? (ref1 = ref[0]) != null ? ref1.title : void 0 : void 0) != null); // test that we can generate the page

    return (0, _assert.default)((0, _html.default)(page) != null);
  })]), await test("DashKite", [await test("Content", async function () {
    var content;
    _index.Site.configuration = _configuration.default.airtable;
    site = await _index.Site.find({
      name: "dashkite"
    });
    content = await _index.Content.find({
      site,
      name: "Sites Intro"
    });

    _assert.default.equal("sites-intro", content.name);

    return _assert.default.equal("Blog Post Template", content.pages[0].name);
  })])]));
  return process.exit(_amen.success);
})({});
//# sourceMappingURL=data:application/json;base64,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QSxDQUFBLEtBQUEsSUFBUCxJQUFBO0FBQ0EseUJBQU8sQ0FBQSxDQUFBLEdBQUEsR0FBQSxJQUFBLENBQUEsSUFBQSxLQUFBLElBQUEsR0FBQSxDQUFBLElBQUEsR0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUEsSUFBQSxHQUFBLElBQUEsQ0FBQSxLQUFBLEdBQUEsS0FBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLEtBRmYsSUFFUSxFQUhpQixDOztXQU1qQixxQkFBTyxtQkFBQSxJQUFBLENBQUEsSUFBUCxJQUFBLEM7QUFib0IsR0FPaEIsQ0FQZ0IsQ0FBbEIsQ0F4QzZCLEVBeURuQyxNQUFNLElBQUEsQ0FBQSxVQUFBLEVBQWlCLENBRXJCLE1BQU0sSUFBQSxDQUFBLFNBQUEsRUFBZ0Isa0JBQUE7QUFDNUIsUUFBQSxPQUFBO0FBQVEsZ0JBQUEsYUFBQSxHQUFxQix1QkFBYyxRQUFuQztBQUNBLElBQUEsSUFBQSxHQUFPLE1BQU0sWUFBQSxJQUFBLENBQVU7QUFBQSxNQUFBLElBQUEsRUFBTTtBQUFOLEtBQVYsQ0FBYjtBQUNBLElBQUEsT0FBQSxHQUFVLE1BQU0sZUFBQSxJQUFBLENBQWE7QUFBQSxNQUFBLElBQUE7QUFBUSxNQUFBLElBQUEsRUFBTTtBQUFkLEtBQWIsQ0FBaEI7O0FBQ0Esb0JBQUEsS0FBQSxDQUFBLGFBQUEsRUFBNEIsT0FBTyxDQUFuQyxJQUFBOztXQUNBLGdCQUFBLEtBQUEsQ0FBQSxvQkFBQSxFQUFtQyxPQUFPLENBQUMsS0FBUixDQUFhLENBQWIsRUFBbkMsSUFBQSxDO0FBUG1CLEdBRWYsQ0FGZSxDQUFqQixDQXpENkIsQ0FBekIsQ0FBWjtTQXVFQSxPQUFPLENBQVAsSUFBQSxDQUFBLGFBQUEsQztBQXpFQyxDQUFBLEVBQVksRUFBWiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRlc3QgYXMgX3Rlc3QsIHN1Y2Nlc3MgfSBmcm9tIFwiQGRhc2hraXRlL2FtZW5cIlxuaW1wb3J0IHByaW50IGZyb20gXCJAZGFzaGtpdGUvYW1lbi1jb25zb2xlXCJcbmltcG9ydCBhc3NlcnQgZnJvbSBcIkBkYXNoa2l0ZS9hc3NlcnRcIlxuXG5pbXBvcnQgY29uZmlndXJhdGlvbiBmcm9tIFwiLi9jb25maWd1cmF0aW9uXCJcblxuaW1wb3J0IHsgQmFzZSB9IGZyb20gXCIuLi9zcmMvYmFzZVwiXG5pbXBvcnQgeyBTaXRlLCBDb250ZW50IH0gZnJvbSBcIi4uL3NyY1wiXG5cbmltcG9ydCBodG1sIGZyb20gXCIuL2hlbHBlcnMvaHRtbFwiXG5cbnRlc3QgPSAobmFtZSwgZikgLT5cbiAgX3Rlc3RcbiAgICBkZXNjcmlwdGlvbjogbmFtZVxuICAgIHdhaXQ6IDMwMDAwXG4gICAgZlxuXG5kbyAoeyBzaXRlIH0gPSB7fSkgLT5cblxuICBwcmludCBhd2FpdCB0ZXN0IFwiQWlydGFibGUgSGVscGVyc1wiLCBbXG5cbiAgICAjIGF3YWl0IHRlc3QgXCJCYXNlXCIsIFtcblxuICAgICMgICBhd2FpdCB0ZXN0IFwiR2V0IFNpdGVcIiwgLT5cbiAgICAjICAgICBiYXNlID0gYXdhaXQgQmFzZS5jcmVhdGUgY29uZmlndXJhdGlvbi5haXJ0YWJsZVxuICAgICMgICAgIHNpdGUgPSBhd2FpdCBiYXNlLnNlbGVjdE9uZVxuICAgICMgICAgICAgdGFibGU6IFwiU2l0ZXNcIlxuICAgICMgICAgICAgcXVlcnk6IFwie05hbWV9ID0gJ3BhbmRhc3RyaWtlJ1wiXG4gICAgIyAgICAgYXNzZXJ0LmVxdWFsIFwiYXBweXFiQjloWkRQaHRUbWFcIiwgc2l0ZS5nZXQgXCJCYXNlXCJcblxuICAgICMgICBhd2FpdCB0ZXN0IFwiR2V0IENvbnRlbnRcIiwgLT5cbiAgICAjICAgICB7IGtleSB9ID0gY29uZmlndXJhdGlvbi5haXJ0YWJsZVxuICAgICMgICAgIGJhc2UgPSBzaXRlLmdldCBcIkJhc2VcIlxuICAgICMgICAgIGJhc2UgPSBhd2FpdCBCYXNlLmNyZWF0ZSB7IGtleSwgYmFzZSB9XG4gICAgIyAgICAgY29udGVudCA9IGF3YWl0IGJhc2Uuc2VsZWN0T25lXG4gICAgIyAgICAgICB0YWJsZTogXCJQYWdlc1wiXG4gICAgIyAgICAgICBxdWVyeTogXCJ7TmFtZX0gPSAnSG9tZSdcIlxuICAgICMgICAgIGFzc2VydC5lcXVhbCBcIlBhbmRhIFN0cmlrZVwiLCBjb250ZW50LmdldCBcIlRpdGxlXCJcblxuICAgICMgXVxuXG4gICAgYXdhaXQgdGVzdCBcIlBhbmRhIFN0cmlrZVwiLCBbXG5cbiAgICAgIGF3YWl0IHRlc3QgXCJTaXRlXCIsIC0+XG4gICAgICAgIFNpdGUuY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb24uYWlydGFibGVcbiAgICAgICAgc2l0ZSA9IGF3YWl0IFNpdGUuZmluZCBuYW1lOiBcInBhbmRhc3RyaWtlXCJcbiAgICAgICAgYXNzZXJ0LmVxdWFsIFwiYXBweXFiQjloWkRQaHRUbWFcIiwgc2l0ZS5iYXNlXG5cbiAgICAgIGF3YWl0IHRlc3QgXCJQYWdlXCIsIC0+XG4gICAgICAgIHBhZ2UgPSBhd2FpdCBzaXRlLmZpbmQgcGF0aDogXCJob21lXCJcbiAgICAgICAgYXNzZXJ0IHBhZ2UudGl0bGU/XG4gICAgICAgIGFzc2VydCBwYWdlLm1haW4/WzBdPy50aXRsZT9cbiAgICAgICAgYXNzZXJ0IHBhZ2U/Lm1haW4/WzBdPy5pbWFnZT8uZGVmYXVsdD8udXJsP1xuXG4gICAgICAgICMgdGVzdCB0aGF0IHdlIGNhbiBnZW5lcmF0ZSB0aGUgcGFnZVxuICAgICAgICBhc3NlcnQgKGh0bWwgcGFnZSk/XG5cbiAgICBdXG5cbiAgICBhd2FpdCB0ZXN0IFwiRmlubiBNYWNrXCIsIFtcblxuICAgICAgYXdhaXQgdGVzdCBcIlNpdGVcIiwgLT5cbiAgICAgICAgU2l0ZS5jb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbi5haXJ0YWJsZVxuICAgICAgICBzaXRlID0gYXdhaXQgU2l0ZS5maW5kIG5hbWU6IFwiZmlubm1hY2tcIlxuICAgICAgICBhc3NlcnQuZXF1YWwgXCJhcHBPNXJPdXZ6dWVVSTlQN1wiLCBzaXRlLmJhc2VcblxuICAgICAgYXdhaXQgdGVzdCBcIlBhZ2VcIiwgLT5cbiAgICAgICAgcGFnZSA9IGF3YWl0IHNpdGUuZmluZCBwYXRoOiBcImhvbWVcIlxuICAgICAgICBhc3NlcnQgcGFnZS50aXRsZT9cbiAgICAgICAgYXNzZXJ0IHBhZ2UubWFpbj9bMF0/LnRpdGxlP1xuXG4gICAgICAgICMgdGVzdCB0aGF0IHdlIGNhbiBnZW5lcmF0ZSB0aGUgcGFnZVxuICAgICAgICBhc3NlcnQgKGh0bWwgcGFnZSk/XG5cbiAgICBdXG4gIFxuICAgIGF3YWl0IHRlc3QgXCJEYXNoS2l0ZVwiLCBbXG5cbiAgICAgIGF3YWl0IHRlc3QgXCJDb250ZW50XCIsIC0+XG4gICAgICAgIFNpdGUuY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb24uYWlydGFibGVcbiAgICAgICAgc2l0ZSA9IGF3YWl0IFNpdGUuZmluZCBuYW1lOiBcImRhc2hraXRlXCJcbiAgICAgICAgY29udGVudCA9IGF3YWl0IENvbnRlbnQuZmluZCB7IHNpdGUsIG5hbWU6IFwiU2l0ZXMgSW50cm9cIiB9XG4gICAgICAgIGFzc2VydC5lcXVhbCBcInNpdGVzLWludHJvXCIsIGNvbnRlbnQubmFtZVxuICAgICAgICBhc3NlcnQuZXF1YWwgXCJCbG9nIFBvc3QgVGVtcGxhdGVcIiwgY29udGVudC5wYWdlc1swXS5uYW1lXG5cbiAgICBdXG5cblxuICBdXG4gIFxuICBwcm9jZXNzLmV4aXQgc3VjY2Vzc1xuXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=test/index.coffee