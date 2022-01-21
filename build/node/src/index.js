"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Site = exports.Page = exports.Image = exports.Content = void 0;

var Meta = _interopRequireWildcard(require("@dashkite/joy/metaclass"));

var Arr = _interopRequireWildcard(require("@dashkite/joy/array"));

var It = _interopRequireWildcard(require("@dashkite/joy/iterable"));

var Text = _interopRequireWildcard(require("@dashkite/joy/text"));

var _marked = require("marked");

var _base = require("./base.js");

var _mixins = require("./mixins.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Content, Image, Page, People, Site, buildClassList, buildFAClassList, whenDefined;
exports.Site = Site;
exports.Page = Page;
exports.Image = Image;
exports.Content = Content;

// some property transforms
whenDefined = function (f) {
  return function (value) {
    if (value != null) {
      return f(value);
    }
  };
};

buildClassList = function (tags) {
  if (tags != null) {
    return It.join(" ", function () {
      var i, len, results, tag;
      results = [];

      for (i = 0, len = tags.length; i < len; i++) {
        tag = tags[i];
        results.push(Text.dashed(Text.toLowerCase(tag)));
      }

      return results;
    }());
  } else {
    return "";
  }
};

buildFAClassList = function (value) {
  var family, label, size; // ex: solid-lightbuld-dollar
  // ex: brand-github

  if (value != null) {
    [family, ...label] = Text.split("-", value);
    label = It.join("-", label);
    family = family[0];
    size = this.hints.includes("larger") ? "2x" : this.hints.includes("largest") ? "4x" : "1x";
    return `fa${family} fa-${label} fa-${size}`;
  } else {
    return "";
  }
}; // start with empty classes so we can reference them
// in the class methods and mixins we add later


exports.Site = Site = class Site {};
People = class People {};
exports.Page = Page = class Page {};
exports.Content = Content = class Content {};
exports.Image = Image = class Image {};
/* Site */

Meta.mixin(Site, [(0, _mixins.table)("Sites"), (0, _mixins.fields)({
  key: {
    from: "Account Name",
    transform: function (name) {
      return `dashkite-sites-${name}-airtable-key`;
    }
  },
  base: {
    from: "Base"
  },
  name: {
    from: "Name"
  }
})]);

Site.find = async function ({
  name
}) {
  if (name != null) {
    if (this.base == null) {
      this.base = await (() => {
        var base, key;

        if (this.configuration != null) {
          ({
            key,
            base
          } = this.configuration);
          return _base.Base.create({
            key,
            base
          });
        } else {
          throw new Error("Site configuration not set");
        }
      })();
    } // we have the metadata to build this query dynamically,
    // but since we only do this twice so far (here and in Page)
    // i haven't bothered...


    return this.fromRecord(await this.base.selectOne({
      table: "Sites",
      query: `{Name} = '${name}'`
    }));
  } else {
    throw new Error("Site only supports find by name");
  }
};

Site.prototype.find = function ({
  path
}) {
  return Page.find({
    site: this,
    path: path
  });
};
/* People */


Meta.mixin(People, [(0, _mixins.table)("People"), (0, _mixins.fields)({
  name: {
    from: "Name"
  }
})]);
/* Page */

Meta.mixin(Page, [(0, _mixins.table)("Pages"), (0, _mixins.fields)({
  name: {
    from: "Name"
  },
  path: {
    from: "Path"
  },
  title: {
    from: "Title"
  },
  theme: {
    from: "Theme",
    transform: buildClassList
  },
  layout: {
    from: "Layout",
    transform: buildClassList
  },
  head: {
    from: "Head",
    list: Content
  },
  header: {
    from: "Header",
    list: Content
  },
  main: {
    from: "Main",
    list: Content
  },
  aside: {
    from: "Aside",
    list: Content
  },
  footer: {
    from: "Footer",
    list: Content
  }
})]);
Meta.mixin(Page.prototype, [Meta.getters({
  link: function () {
    return `/${this.site.name}/${this.path}`;
  },
  fonts: function () {
    var fonts;

    if ((fonts = this._.get("Fonts")) != null) {
      return {
        heading: fonts[0],
        copy: fonts[1],
        accent: fonts[2],
        monospace: fonts[3]
      };
    }
  }
}), // allow these to be overwritten
Meta.setters({
  main: function (values) {
    return Object.defineProperty(this, "main", {
      value: values
    });
  },
  title: function (value) {
    return Object.defineProperty(this, "title", {
      value
    });
  }
})]);

Page.find = async function ({
  site,
  path
}) {
  var base, self;

  if (site != null && path != null) {
    base = await _base.Base.create(site); // see note above for Site....

    self = this.fromRecord(await base.selectOne({
      table: this.table,
      query: `{Path} = '${path}'`
    }));

    if (self != null) {
      // remember which site we're on
      self.site = site; // there's probably a way to do this automatically
      // but i initially just want to make sure the mechanics
      // are all working
      // okay get the content for the pages

      await Content.load({
        base,
        site
      }); // repeat for nested content
      // we only do this for one level tho

      await Page.load({
        base,
        site
      });
      await Content.load({
        base,
        site
      }); // finally, we can load all the images at once

      await Image.load({
        base,
        site
      });
      await People.load({
        base,
        site
      });
      return self;
    }
  } else {
    throw new Error("Page only supports find by site and path");
  }
};
/* Content */


Content.find = async function ({
  site,
  name
}) {
  var base, key, page, self;

  if (site != null && name != null) {
    ({
      key
    } = Site.configuration);
    base = await _base.Base.create({
      key,
      base: site.base
    }); // see note above for Site....

    self = this.fromRecord(await base.selectOne({
      table: this.table,
      query: `{Name} = '${name}'`
    })); // there's probably a way to do this automatically
    // but i initially just want to make sure the mechanics
    // are all working
    // load the content's page

    page = await Page.load({
      base,
      site
    }); // remember which site we're on

    page.site = site;
    self.site = site; // load all the related content

    await Content.load({
      base,
      site
    }); // finally, we can load all the images at once

    await Image.load({
      base,
      site
    }); // same with people

    await People.load({
      base,
      site
    });
    return self;
  } else {
    throw new Error("Content only supporsts find by site and name");
  }
};

Meta.mixin(Content, [(0, _mixins.table)("Content"), (0, _mixins.fields)({
  name: {
    from: "Name",
    transform: whenDefined(Text.dashed)
  },
  type: {
    from: "Type",
    transform: whenDefined(Text.dashed)
  },
  hints: {
    from: "Hints",
    transform: buildClassList
  },
  title: {
    from: "Title"
  },
  subtitle: {
    from: "Subtitle"
  },
  published: {
    from: "Published"
  },
  authors: {
    from: "Authors",
    list: People
  },
  // TODO possibly add a fallback for blurb
  blurb: {
    from: "Blurb",
    transform: whenDefined(_marked.marked)
  },
  copy: {
    from: "Copy",
    transform: whenDefined(_marked.marked)
  },
  images: {
    from: "Image",
    list: Image
  },
  pages: {
    from: "Pages",
    list: Page
  },
  content: {
    from: "Content",
    list: Content
  },
  link: {
    from: "Link",
    transform: function (path) {
      return `/${this.site.name}/${path}`;
    }
  },
  glyph: {
    from: "Glyph",
    transform: buildFAClassList
  }
})]);
Meta.mixin(Content.prototype, [Meta.getters({
  path: function () {
    if (this.type === "article") {
      return encodeURI(`/${this.site.name}/articles/${this._.get('Name')}`);
    }
  },
  classes: function () {
    var classList;
    classList = this.type;

    if (this.hints !== "") {
      classList += ` ${this.hints}`;
    }

    return classList;
  },
  image: function () {
    return Arr.first(this.images);
  },
  social: function () {
    return {
      github: this._.get("GitHub"),
      linkedin: this._.get("LinkedIn"),
      twitter: this._.get("Twitter"),
      blog: this._.get("Blog")
    };
  },
  hasSocials: function () {
    return this.social.github != null || this.social.linkedin != null || this.social.twitter != null || this.social.blog != null;
  }
})]);
/* Image */

Meta.mixin(Image, [(0, _mixins.table)("Images"), (0, _mixins.fields)({
  attachments: {
    from: "Attachments"
  },
  description: {
    from: "Description"
  },
  caption: {
    from: "Caption"
  }
})]);
Meta.mixin(Image.prototype, [Meta.getters({
  default: function () {
    return Arr.first(this.attachments);
  },
  dark: function () {
    return Arr.second(this.attachments);
  }
})]);
//# sourceMappingURL=data:application/json;base64,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STtBQURsRDtBQWZaLENBRkYsQ0FEb0IsQ0FBdEI7OztBQXlCQSxJQUFJLENBQUosS0FBQSxDQUFBLEtBQUEsRUFBa0IsQ0FDaEIsbUJBRGdCLFFBQ2hCLENBRGdCLEVBRWhCLG9CQUNFO0FBQUEsRUFBQSxXQUFBLEVBQWE7QUFBQSxJQUFBLElBQUEsRUFBTTtBQUFOLEdBQWI7QUFDQSxFQUFBLFdBQUEsRUFBYTtBQUFBLElBQUEsSUFBQSxFQUFNO0FBQU4sR0FEYjtBQUVBLEVBQUEsT0FBQSxFQUFTO0FBQUEsSUFBQSxJQUFBLEVBQU07QUFBTjtBQUZULENBREYsQ0FGZ0IsQ0FBbEI7QUFRQSxJQUFJLENBQUosS0FBQSxDQUFXLEtBQUssQ0FBaEIsU0FBQSxFQUFvQixDQUNsQixJQUFJLENBQUosT0FBQSxDQUNFO0FBQUEsRUFBQSxPQUFBLEVBQVMsWUFBQTtXQUFHLEdBQUcsQ0FBSCxLQUFBLENBQVUsS0FBVixXQUFBLEM7QUFBWixHQUFBO0FBQ0EsRUFBQSxJQUFBLEVBQU0sWUFBQTtXQUFHLEdBQUcsQ0FBSCxNQUFBLENBQVcsS0FBWCxXQUFBLEM7QUFBSDtBQUROLENBREYsQ0FEa0IsQ0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBNZXRhIGZyb20gXCJAZGFzaGtpdGUvam95L21ldGFjbGFzc1wiXG5pbXBvcnQgKiBhcyBBcnIgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvYXJyYXlcIlxuaW1wb3J0ICogYXMgSXQgZnJvbSBcIkBkYXNoa2l0ZS9qb3kvaXRlcmFibGVcIlxuaW1wb3J0ICogYXMgVGV4dCBmcm9tIFwiQGRhc2hraXRlL2pveS90ZXh0XCJcbmltcG9ydCB7IG1hcmtlZCB9IGZyb20gXCJtYXJrZWRcIlxuaW1wb3J0IHsgQmFzZSB9IGZyb20gXCIuL2Jhc2VcIlxuaW1wb3J0IHsgdGFibGUsIGZpZWxkcyB9IGZyb20gXCIuL21peGluc1wiXG5cbiMgc29tZSBwcm9wZXJ0eSB0cmFuc2Zvcm1zXG5cbndoZW5EZWZpbmVkID0gKGYpIC0+ICh2YWx1ZSkgLT4gaWYgdmFsdWU/IHRoZW4gZiB2YWx1ZVxuXG5idWlsZENsYXNzTGlzdCA9ICh0YWdzKSAtPlxuICBpZiB0YWdzP1xuICAgIEl0LmpvaW4gXCIgXCIsIGRvIC0+XG4gICAgICBmb3IgdGFnIGluIHRhZ3NcbiAgICAgICAgVGV4dC5kYXNoZWQgVGV4dC50b0xvd2VyQ2FzZSB0YWdcbiAgZWxzZVxuICAgIFwiXCJcblxuYnVpbGRGQUNsYXNzTGlzdCA9ICh2YWx1ZSkgLT5cbiAgIyBleDogc29saWQtbGlnaHRidWxkLWRvbGxhclxuICAjIGV4OiBicmFuZC1naXRodWJcbiAgaWYgdmFsdWU/XG4gICAgWyBmYW1pbHksIGxhYmVsLi4uIF0gPSBUZXh0LnNwbGl0IFwiLVwiLCB2YWx1ZVxuICAgIGxhYmVsID0gSXQuam9pbiBcIi1cIiwgbGFiZWxcbiAgICBmYW1pbHkgPSBmYW1pbHlbMF1cbiAgICBzaXplID0gaWYgQGhpbnRzLmluY2x1ZGVzIFwibGFyZ2VyXCIgdGhlbiBcIjJ4XCJcbiAgICBlbHNlIGlmIEBoaW50cy5pbmNsdWRlcyBcImxhcmdlc3RcIiB0aGVuIFwiNHhcIlxuICAgIGVsc2UgXCIxeFwiXG4gICAgXCJmYSN7ZmFtaWx5fSBmYS0je2xhYmVsfSBmYS0je3NpemV9XCJcbiAgZWxzZVxuICAgIFwiXCJcblxuIyBzdGFydCB3aXRoIGVtcHR5IGNsYXNzZXMgc28gd2UgY2FuIHJlZmVyZW5jZSB0aGVtXG4jIGluIHRoZSBjbGFzcyBtZXRob2RzIGFuZCBtaXhpbnMgd2UgYWRkIGxhdGVyXG5cbmNsYXNzIFNpdGVcbmNsYXNzIFBlb3BsZVxuY2xhc3MgUGFnZVxuY2xhc3MgQ29udGVudFxuY2xhc3MgSW1hZ2VcblxuIyMjIFNpdGUgIyMjXG5cbk1ldGEubWl4aW4gU2l0ZSwgW1xuICB0YWJsZSBcIlNpdGVzXCJcbiAgZmllbGRzXG4gICAga2V5OiBmcm9tOiBcIkFjY291bnQgTmFtZVwiLCB0cmFuc2Zvcm06IChuYW1lKSAtPiBcImRhc2hraXRlLXNpdGVzLSN7bmFtZX0tYWlydGFibGUta2V5XCJcbiAgICBiYXNlOiBmcm9tOiBcIkJhc2VcIlxuICAgIG5hbWU6IGZyb206IFwiTmFtZVwiXG5dXG5cblNpdGUuZmluZCA9ICh7IG5hbWUgfSkgLT5cbiAgaWYgbmFtZT9cbiAgICBAYmFzZSA/PSBhd2FpdCBkbyA9PlxuICAgICAgaWYgQGNvbmZpZ3VyYXRpb24/XG4gICAgICAgIHsga2V5LCBiYXNlIH0gPSBAY29uZmlndXJhdGlvblxuICAgICAgICBCYXNlLmNyZWF0ZSB7IGtleSwgYmFzZSB9XG4gICAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvciBcIlNpdGUgY29uZmlndXJhdGlvbiBub3Qgc2V0XCJcblxuICAgICMgd2UgaGF2ZSB0aGUgbWV0YWRhdGEgdG8gYnVpbGQgdGhpcyBxdWVyeSBkeW5hbWljYWxseSxcbiAgICAjIGJ1dCBzaW5jZSB3ZSBvbmx5IGRvIHRoaXMgdHdpY2Ugc28gZmFyIChoZXJlIGFuZCBpbiBQYWdlKVxuICAgICMgaSBoYXZlbid0IGJvdGhlcmVkLi4uXG4gICAgQGZyb21SZWNvcmQgYXdhaXQgQGJhc2Uuc2VsZWN0T25lXG4gICAgICB0YWJsZTogXCJTaXRlc1wiXG4gICAgICBxdWVyeTogXCJ7TmFtZX0gPSAnI3tuYW1lfSdcIlxuICBlbHNlXG4gICAgdGhyb3cgbmV3IEVycm9yIFwiU2l0ZSBvbmx5IHN1cHBvcnRzIGZpbmQgYnkgbmFtZVwiXG5cblNpdGU6OmZpbmQgPSAoe3BhdGh9KSAtPiBQYWdlLmZpbmQgc2l0ZTogQCwgcGF0aDogcGF0aFxuXG4jIyMgUGVvcGxlICMjI1xuXG5NZXRhLm1peGluIFBlb3BsZSwgW1xuICB0YWJsZSBcIlBlb3BsZVwiXG4gIGZpZWxkc1xuICAgIG5hbWU6IGZyb206IFwiTmFtZVwiXG5dXG5cbiMjIyBQYWdlICMjI1xuXG5NZXRhLm1peGluIFBhZ2UsIFtcbiAgICB0YWJsZSBcIlBhZ2VzXCJcbiAgICBmaWVsZHNcbiAgICAgIG5hbWU6IGZyb206IFwiTmFtZVwiXG4gICAgICBwYXRoOiBmcm9tOiBcIlBhdGhcIlxuICAgICAgdGl0bGU6IGZyb206IFwiVGl0bGVcIlxuICAgICAgdGhlbWU6IGZyb206IFwiVGhlbWVcIiwgdHJhbnNmb3JtOiBidWlsZENsYXNzTGlzdFxuICAgICAgbGF5b3V0OiBmcm9tOiBcIkxheW91dFwiLCB0cmFuc2Zvcm06IGJ1aWxkQ2xhc3NMaXN0XG4gICAgICBoZWFkOiBmcm9tOiBcIkhlYWRcIiwgbGlzdDogQ29udGVudFxuICAgICAgaGVhZGVyOiBmcm9tOiBcIkhlYWRlclwiLCBsaXN0OiBDb250ZW50XG4gICAgICBtYWluOiBmcm9tOiBcIk1haW5cIiwgbGlzdDogQ29udGVudFxuICAgICAgYXNpZGU6IGZyb206IFwiQXNpZGVcIiwgbGlzdDogQ29udGVudFxuICAgICAgZm9vdGVyOiBmcm9tOiBcIkZvb3RlclwiLCBsaXN0OiBDb250ZW50XG5dXG5cbk1ldGEubWl4aW4gUGFnZTo6LCBbXG4gIE1ldGEuZ2V0dGVyc1xuICAgIGxpbms6IC0+IFwiLyN7QHNpdGUubmFtZX0vI3tAcGF0aH1cIlxuICAgIGZvbnRzOiAtPlxuICAgICAgaWYgKCBmb250cyA9IEBfLmdldCBcIkZvbnRzXCIgKT9cbiAgICAgICAgaGVhZGluZzogZm9udHNbMF1cbiAgICAgICAgY29weTogZm9udHNbMV1cbiAgICAgICAgYWNjZW50OiBmb250c1syXVxuICAgICAgICBtb25vc3BhY2U6IGZvbnRzWzNdXG5cbiAgIyBhbGxvdyB0aGVzZSB0byBiZSBvdmVyd3JpdHRlblxuICBNZXRhLnNldHRlcnNcbiAgICBtYWluOiAodmFsdWVzKSAtPiBPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXCJtYWluXCIsIHZhbHVlOiB2YWx1ZXNcbiAgICB0aXRsZTogKHZhbHVlKSAtPiBPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXCJ0aXRsZVwiLCB7IHZhbHVlIH1cblxuXVxuXG5QYWdlLmZpbmQgPSAoeyBzaXRlLCBwYXRoIH0pIC0+XG5cbiAgaWYgc2l0ZT8gJiYgcGF0aD9cbiAgICBiYXNlID0gYXdhaXQgQmFzZS5jcmVhdGUgc2l0ZVxuICAgICMgc2VlIG5vdGUgYWJvdmUgZm9yIFNpdGUuLi4uXG4gICAgc2VsZiA9IEBmcm9tUmVjb3JkIGF3YWl0IGJhc2Uuc2VsZWN0T25lXG4gICAgICB0YWJsZTogQHRhYmxlXG4gICAgICBxdWVyeTogXCJ7UGF0aH0gPSAnI3twYXRofSdcIlxuXG4gICAgaWYgc2VsZj9cbiAgICAgIFxuICAgICAgIyByZW1lbWJlciB3aGljaCBzaXRlIHdlJ3JlIG9uXG4gICAgICBzZWxmLnNpdGUgPSBzaXRlXG5cbiAgICAgICMgdGhlcmUncyBwcm9iYWJseSBhIHdheSB0byBkbyB0aGlzIGF1dG9tYXRpY2FsbHlcbiAgICAgICMgYnV0IGkgaW5pdGlhbGx5IGp1c3Qgd2FudCB0byBtYWtlIHN1cmUgdGhlIG1lY2hhbmljc1xuICAgICAgIyBhcmUgYWxsIHdvcmtpbmdcblxuICAgICAgIyBva2F5IGdldCB0aGUgY29udGVudCBmb3IgdGhlIHBhZ2VzXG4gICAgICBhd2FpdCBDb250ZW50LmxvYWQgeyBiYXNlLCBzaXRlIH1cbiAgICAgICMgcmVwZWF0IGZvciBuZXN0ZWQgY29udGVudFxuICAgICAgIyB3ZSBvbmx5IGRvIHRoaXMgZm9yIG9uZSBsZXZlbCB0aG9cbiAgICAgIGF3YWl0IFBhZ2UubG9hZCB7IGJhc2UsIHNpdGUgfVxuICAgICAgYXdhaXQgQ29udGVudC5sb2FkIHsgYmFzZSwgc2l0ZSB9XG4gICAgICAjIGZpbmFsbHksIHdlIGNhbiBsb2FkIGFsbCB0aGUgaW1hZ2VzIGF0IG9uY2VcbiAgICAgIGF3YWl0IEltYWdlLmxvYWQgeyBiYXNlLCBzaXRlIH1cbiAgICAgIGF3YWl0IFBlb3BsZS5sb2FkIHsgYmFzZSwgc2l0ZSB9XG4gICAgICBzZWxmXG4gIGVsc2VcbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJQYWdlIG9ubHkgc3VwcG9ydHMgZmluZCBieSBzaXRlIGFuZCBwYXRoXCJcblxuIyMjIENvbnRlbnQgIyMjXG5cbkNvbnRlbnQuZmluZCA9ICh7IHNpdGUsIG5hbWUgfSkgLT5cblxuICBpZiBzaXRlPyAmJiBuYW1lP1xuICAgIHsga2V5IH0gPSBTaXRlLmNvbmZpZ3VyYXRpb25cbiAgICBiYXNlID0gYXdhaXQgQmFzZS5jcmVhdGUgeyBrZXksIGJhc2U6IHNpdGUuYmFzZSB9XG4gICAgIyBzZWUgbm90ZSBhYm92ZSBmb3IgU2l0ZS4uLi5cbiAgICBzZWxmID0gQGZyb21SZWNvcmQgYXdhaXQgYmFzZS5zZWxlY3RPbmVcbiAgICAgIHRhYmxlOiBAdGFibGVcbiAgICAgIHF1ZXJ5OiBcIntOYW1lfSA9ICcje25hbWV9J1wiXG5cbiAgICAjIHRoZXJlJ3MgcHJvYmFibHkgYSB3YXkgdG8gZG8gdGhpcyBhdXRvbWF0aWNhbGx5XG4gICAgIyBidXQgaSBpbml0aWFsbHkganVzdCB3YW50IHRvIG1ha2Ugc3VyZSB0aGUgbWVjaGFuaWNzXG4gICAgIyBhcmUgYWxsIHdvcmtpbmdcblxuICAgICMgbG9hZCB0aGUgY29udGVudCdzIHBhZ2VcbiAgICBwYWdlID0gYXdhaXQgUGFnZS5sb2FkIHsgYmFzZSwgc2l0ZSB9XG4gICAgIyByZW1lbWJlciB3aGljaCBzaXRlIHdlJ3JlIG9uXG4gICAgcGFnZS5zaXRlID0gc2l0ZVxuICAgIHNlbGYuc2l0ZSA9IHNpdGVcblxuICAgICMgbG9hZCBhbGwgdGhlIHJlbGF0ZWQgY29udGVudFxuICAgIGF3YWl0IENvbnRlbnQubG9hZCB7IGJhc2UsIHNpdGUgfVxuICAgICMgZmluYWxseSwgd2UgY2FuIGxvYWQgYWxsIHRoZSBpbWFnZXMgYXQgb25jZVxuICAgIGF3YWl0IEltYWdlLmxvYWQgeyBiYXNlLCBzaXRlIH1cbiAgICAjIHNhbWUgd2l0aCBwZW9wbGVcbiAgICBhd2FpdCBQZW9wbGUubG9hZCB7IGJhc2UsIHNpdGUgfVxuICAgIHNlbGZcbiAgZWxzZVxuICAgIHRocm93IG5ldyBFcnJvciBcIkNvbnRlbnQgb25seSBzdXBwb3JzdHMgZmluZCBieSBzaXRlIGFuZCBuYW1lXCJcblxuTWV0YS5taXhpbiBDb250ZW50LCBbXG5cbiAgdGFibGUgXCJDb250ZW50XCJcblxuICBmaWVsZHNcbiAgICBuYW1lOiBmcm9tOiBcIk5hbWVcIiwgdHJhbnNmb3JtOiB3aGVuRGVmaW5lZCBUZXh0LmRhc2hlZFxuICAgIHR5cGU6IGZyb206IFwiVHlwZVwiLCB0cmFuc2Zvcm06IHdoZW5EZWZpbmVkIFRleHQuZGFzaGVkXG4gICAgaGludHM6IGZyb206IFwiSGludHNcIiwgdHJhbnNmb3JtOiBidWlsZENsYXNzTGlzdFxuICAgIHRpdGxlOiBmcm9tOiBcIlRpdGxlXCJcbiAgICBzdWJ0aXRsZTogZnJvbTogXCJTdWJ0aXRsZVwiXG4gICAgcHVibGlzaGVkOiBmcm9tOiBcIlB1Ymxpc2hlZFwiXG4gICAgYXV0aG9yczogZnJvbTogXCJBdXRob3JzXCIsIGxpc3Q6IFBlb3BsZVxuICAgICMgVE9ETyBwb3NzaWJseSBhZGQgYSBmYWxsYmFjayBmb3IgYmx1cmJcbiAgICBibHVyYjogZnJvbTogXCJCbHVyYlwiLCB0cmFuc2Zvcm06IHdoZW5EZWZpbmVkIG1hcmtlZFxuICAgIGNvcHk6IGZyb206IFwiQ29weVwiLCB0cmFuc2Zvcm06IHdoZW5EZWZpbmVkIG1hcmtlZFxuICAgIGltYWdlczogZnJvbTogXCJJbWFnZVwiLCBsaXN0OiBJbWFnZVxuICAgIHBhZ2VzOiBmcm9tOiBcIlBhZ2VzXCIsIGxpc3Q6IFBhZ2VcbiAgICBjb250ZW50OiBmcm9tOiBcIkNvbnRlbnRcIiwgbGlzdDogQ29udGVudFxuICAgIGxpbms6IGZyb206IFwiTGlua1wiLCB0cmFuc2Zvcm06IChwYXRoKSAtPiBcIi8je0BzaXRlLm5hbWV9LyN7cGF0aH1cIlxuICAgIGdseXBoOiBmcm9tOiBcIkdseXBoXCIsIHRyYW5zZm9ybTogYnVpbGRGQUNsYXNzTGlzdFxuXVxuXG5NZXRhLm1peGluIENvbnRlbnQ6OiwgW1xuICBNZXRhLmdldHRlcnNcblxuICAgIHBhdGg6IC0+XG4gICAgICBpZiBAdHlwZSA9PSBcImFydGljbGVcIlxuICAgICAgICBlbmNvZGVVUkkgXCIvI3tAc2l0ZS5uYW1lfS9hcnRpY2xlcy8je0BfLmdldCAnTmFtZSd9XCJcblxuICAgIGNsYXNzZXM6IC0+XG4gICAgICBjbGFzc0xpc3QgPSBAdHlwZVxuICAgICAgaWYgQGhpbnRzICE9IFwiXCIgdGhlbiBjbGFzc0xpc3QgKz0gXCIgI3tAaGludHN9XCJcbiAgICAgIGNsYXNzTGlzdFxuXG4gICAgaW1hZ2U6IC0+IEFyci5maXJzdCBAaW1hZ2VzXG4gICAgc29jaWFsOiAtPlxuICAgICAgZ2l0aHViOiBAXy5nZXQgXCJHaXRIdWJcIlxuICAgICAgbGlua2VkaW46IEBfLmdldCBcIkxpbmtlZEluXCJcbiAgICAgIHR3aXR0ZXI6IEBfLmdldCBcIlR3aXR0ZXJcIlxuICAgICAgYmxvZzogQF8uZ2V0IFwiQmxvZ1wiXG4gICAgaGFzU29jaWFsczogLT5cbiAgICAgIEBzb2NpYWwuZ2l0aHViPyB8fCBAc29jaWFsLmxpbmtlZGluPyB8fCBAc29jaWFsLnR3aXR0ZXI/IHx8IEBzb2NpYWwuYmxvZz9cblxuXVxuXG4jIyMgSW1hZ2UgIyMjI1xuXG5NZXRhLm1peGluIEltYWdlLCBbXG4gIHRhYmxlIFwiSW1hZ2VzXCJcbiAgZmllbGRzXG4gICAgYXR0YWNobWVudHM6IGZyb206IFwiQXR0YWNobWVudHNcIlxuICAgIGRlc2NyaXB0aW9uOiBmcm9tOiBcIkRlc2NyaXB0aW9uXCJcbiAgICBjYXB0aW9uOiBmcm9tOiBcIkNhcHRpb25cIlxuXVxuXG5NZXRhLm1peGluIEltYWdlOjosIFtcbiAgTWV0YS5nZXR0ZXJzXG4gICAgZGVmYXVsdDogLT4gQXJyLmZpcnN0IEBhdHRhY2htZW50c1xuICAgIGRhcms6IC0+IEFyci5zZWNvbmQgQGF0dGFjaG1lbnRzXG5dXG5cbmV4cG9ydCB7XG4gIFNpdGVcbiAgUGFnZVxuICBDb250ZW50XG4gIEltYWdlXG59Il0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=src/index.coffee