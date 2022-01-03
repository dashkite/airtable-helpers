function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_rethrow(e,n,r,t){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||t))throw e.message+=" on line "+r,e;var o,a,i,s;try{t=t||require("fs").readFileSync(n,{encoding:"utf8"}),o=3,a=t.split("\n"),i=Math.max(r-o,0),s=Math.min(a.length,r+o)}catch(t){return e.message+=" - could not read from "+n+" ("+t.message+")",void pug_rethrow(e,null,r)}o=a.slice(i,s).map(function(e,n){var t=n+i+1;return(t==r?"  > ":"    ")+t+"| "+e}).join("\n"),e.path=n;try{e.message=(n||"Pug")+":"+r+"\n"+o+"\n\n"+e.message}catch(e){}throw e}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;
    var locals_for_with = (locals || {});
    
    (function (aside, fonts, footer, head, header, layout, main, theme, title) {
      ;pug_debug_line = 1;pug_debug_filename = "test\u002Fhelpers\u002Fmixins.pug";
pug_mixins["figure"] = pug_interp = function(description){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "test\u002Fhelpers\u002Fmixins.pug";
pug_html = pug_html + "\u003Cfigure\u003E";
;pug_debug_line = 3;pug_debug_filename = "test\u002Fhelpers\u002Fmixins.pug";
pug_html = pug_html + "\u003Cpicture\u003E";
;pug_debug_line = 4;pug_debug_filename = "test\u002Fhelpers\u002Fmixins.pug";
if (description.dark) {
;pug_debug_line = 5;pug_debug_filename = "test\u002Fhelpers\u002Fmixins.pug";
pug_html = pug_html + "\u003Csource" + (pug_attr("srcset", description.dark.url, true, false)+" media=\"(prefers-color-scheme: dark)\"") + "\u002F\u003E";
}
;pug_debug_line = 9;pug_debug_filename = "test\u002Fhelpers\u002Fmixins.pug";
pug_html = pug_html + "\u003Cimg" + (pug_attr("alt", description.title, true, false)+pug_attr("src", description.default.url, true, false)) + "\u002F\u003E\u003C\u002Fpicture\u003E";
;pug_debug_line = 13;pug_debug_filename = "test\u002Fhelpers\u002Fmixins.pug";
if (description.copy) {
;pug_debug_line = 14;pug_debug_filename = "test\u002Fhelpers\u002Fmixins.pug";
pug_html = pug_html + "\u003Cfigcaption\u003E";
;pug_debug_line = 14;pug_debug_filename = "test\u002Fhelpers\u002Fmixins.pug";
pug_html = pug_html + (null == (pug_interp = description.copy) ? "" : pug_interp) + "\u003C\u002Ffigcaption\u003E";
}
pug_html = pug_html + "\u003C\u002Ffigure\u003E";
};
;pug_debug_line = 3;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["headings"] = pug_interp = function(description){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 4;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.title) {
;pug_debug_line = 5;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.boost) {
;pug_debug_line = 6;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 6;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = description.title) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E";
;pug_debug_line = 7;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.subtitle) {
;pug_debug_line = 8;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ch2\u003E";
;pug_debug_line = 8;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = description.subtitle) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E";
}
}
else {
;pug_debug_line = 10;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ch2\u003E";
;pug_debug_line = 10;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = description.title) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E";
;pug_debug_line = 11;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.subtitle) {
;pug_debug_line = 12;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 12;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = description.subtitle) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
}
}
}
};
;pug_debug_line = 14;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["byline"] = pug_interp = function(description){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 15;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cdiv class=\"byline\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cspan class=\"published\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = description.published) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
;pug_debug_line = 17;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cdiv class=\"authors\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
// iterate description.authors
;(function(){
  var $$obj = description.authors;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var author = $$obj[pug_index0];
;pug_debug_line = 19;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cspan class=\"author\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = author.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var author = $$obj[pug_index0];
;pug_debug_line = 19;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cspan class=\"author\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = author.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 21;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content-banner"] = pug_interp = function(description){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 22;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Csection\u003E";
;pug_debug_line = 23;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 24;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["headings"](description);
pug_html = pug_html + "\u003C\u002Fheader\u003E";
;pug_debug_line = 25;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cdiv class=\"main\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.copy) {
;pug_debug_line = 27;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (null == (pug_interp = description.copy) ? "" : pug_interp);
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 28;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cfooter\u003E";
;pug_debug_line = 29;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.hasSocials) {
;pug_debug_line = 30;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["socials"](description);
}
pug_html = pug_html + "\u003C\u002Ffooter\u003E\u003C\u002Fsection\u003E";
};
;pug_debug_line = 32;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content-section"] = pug_interp = function(description){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 33;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Csection\u003E";
;pug_debug_line = 34;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 35;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["headings"](description);
pug_html = pug_html + "\u003C\u002Fheader\u003E";
;pug_debug_line = 36;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cdiv class=\"main\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.copy) {
;pug_debug_line = 38;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.glyph) {
;pug_debug_line = 39;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ci" + (pug_attr("class", pug_classes([description.glyph], [true]), false, false)) + "\u003E\u003C\u002Fi\u003E";
}
;pug_debug_line = 40;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (null == (pug_interp = description.copy) ? "" : pug_interp);
}
;pug_debug_line = 41;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.image) {
;pug_debug_line = 42;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["figure"](description.image);
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 43;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cfooter\u003E";
;pug_debug_line = 44;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.hasSocials) {
;pug_debug_line = 45;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["socials"](description);
}
pug_html = pug_html + "\u003C\u002Ffooter\u003E\u003C\u002Fsection\u003E";
};
;pug_debug_line = 47;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content-article"] = pug_interp = function(description){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 48;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Carticle\u003E";
;pug_debug_line = 49;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 50;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["headings"](description);
;pug_debug_line = 51;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["byline"](description);
pug_html = pug_html + "\u003C\u002Fheader\u003E";
;pug_debug_line = 52;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cdiv class=\"main\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.copy) {
;pug_debug_line = 54;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.glyph) {
;pug_debug_line = 55;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ci" + (pug_attr("class", pug_classes([description.glyph], [true]), false, false)) + "\u003E\u003C\u002Fi\u003E";
}
;pug_debug_line = 56;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (null == (pug_interp = description.copyWithFigures) ? "" : pug_interp);
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 57;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cfooter\u003E";
;pug_debug_line = 58;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.hasSocials) {
;pug_debug_line = 59;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["socials"](description);
}
pug_html = pug_html + "\u003C\u002Ffooter\u003E\u003C\u002Farticle\u003E";
};
;pug_debug_line = 61;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content-image"] = pug_interp = function(description){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 62;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Csection\u003E";
;pug_debug_line = 63;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", description.link, true, false)) + "\u003E";
;pug_debug_line = 64;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["figure"]( description.image );
pug_html = pug_html + "\u003C\u002Fa\u003E\u003C\u002Fsection\u003E";
};
;pug_debug_line = 66;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content-nav"] = pug_interp = function(description){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 67;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cnav\u003E";
;pug_debug_line = 68;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
// iterate description.pages
;(function(){
  var $$obj = description.pages;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var page = $$obj[pug_index1];
;pug_debug_line = 69;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", page.link, true, false)) + "\u003E";
;pug_debug_line = 69;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = page.title) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var page = $$obj[pug_index1];
;pug_debug_line = 69;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", page.link, true, false)) + "\u003E";
;pug_debug_line = 69;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = page.title) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fnav\u003E";
};
;pug_debug_line = 71;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content-button"] = pug_interp = function(description){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 72;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Csection\u003E";
;pug_debug_line = 73;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ca" + (" class=\"copy\""+pug_attr("href", description.link || description.pages[0].link, true, false)) + "\u003E";
;pug_debug_line = 74;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.image) {
;pug_debug_line = 75;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["figure"]( description.image );
}
;pug_debug_line = 76;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 76;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = description.title) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fsection\u003E";
};
;pug_debug_line = 78;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["socials"] = pug_interp = function(description){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 79;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Csection class=\"socials\"\u003E";
;pug_debug_line = 80;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.social.github) {
;pug_debug_line = 81;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", description.social.github, true, false)) + "\u003E";
;pug_debug_line = 82;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ci class=\"fab fa-github\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 83;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 83;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "GitHub\u003C\u002Fspan\u003E\u003C\u002Fa\u003E";
}
;pug_debug_line = 84;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.social.linkedin) {
;pug_debug_line = 85;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", description.social.linkedin, true, false)) + "\u003E";
;pug_debug_line = 86;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ci class=\"fab fa-linkedin\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 87;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 87;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "LinkedIn\u003C\u002Fspan\u003E\u003C\u002Fa\u003E";
}
;pug_debug_line = 88;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.social.twitter) {
;pug_debug_line = 89;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", description.social.twitter, true, false)) + "\u003E";
;pug_debug_line = 90;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ci class=\"fab fa-twitter\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 91;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 91;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "Twitter\u003C\u002Fspan\u003E\u003C\u002Fa\u003E";
}
;pug_debug_line = 92;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.social.blog) {
;pug_debug_line = 93;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", description.social.blog, true, false)) + "\u003E";
;pug_debug_line = 94;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ci class=\"far fa-paragraph\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 95;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 95;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "Blog\u003C\u002Fspan\u003E\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\u003C\u002Fsection\u003E";
};
;pug_debug_line = 97;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["summary-article"] = pug_interp = function(description){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 98;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["block",description.classes], [false,true]), false, false)+pug_attr("name", description.name, true, false)) + "\u003E";
;pug_debug_line = 98;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + " ";
;pug_debug_line = 99;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", description.path, true, false)) + "\u003E";
;pug_debug_line = 100;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Csection\u003E";
;pug_debug_line = 101;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 102;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["headings"](description);
;pug_debug_line = 103;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["byline"](description);
pug_html = pug_html + "\u003C\u002Fheader\u003E";
;pug_debug_line = 104;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cdiv class=\"main\"\u003E";
;pug_debug_line = 105;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.blurb) {
;pug_debug_line = 106;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.glyph) {
;pug_debug_line = 107;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ci" + (pug_attr("class", pug_classes([description.glyph], [true]), false, false)) + "\u003E\u003C\u002Fi\u003E";
}
;pug_debug_line = 108;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (null == (pug_interp = description.blurb) ? "" : pug_interp);
}
;pug_debug_line = 109;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.image) {
;pug_debug_line = 110;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["figure"](description.image);
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 111;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cfooter\u003E";
;pug_debug_line = 112;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.hasSocials) {
;pug_debug_line = 113;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["socials"](description);
}
pug_html = pug_html + "\u003C\u002Ffooter\u003E\u003C\u002Fsection\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 115;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["summary"] = pug_interp = function(description){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 116;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.type == "article") {
;pug_debug_line = 117;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["summary-article"](description);
}
else {
;pug_debug_line = 119;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content"](description);
}
};
;pug_debug_line = 121;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content-collection"] = pug_interp = function(description){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 122;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Csection\u003E";
;pug_debug_line = 122;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + " ";
;pug_debug_line = 123;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 124;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["headings"](description);
;pug_debug_line = 125;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Csection\u003E";
;pug_debug_line = 125;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (null == (pug_interp = description.copy) ? "" : pug_interp) + "\u003C\u002Fsection\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 126;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cdiv class=\"main\"\u003E";
;pug_debug_line = 127;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
// iterate description.content
;(function(){
  var $$obj = description.content;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var item = $$obj[pug_index2];
;pug_debug_line = 128;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["summary"](item);
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var item = $$obj[pug_index2];
;pug_debug_line = 128;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["summary"](item);
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";
};
;pug_debug_line = 130;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["header-section"] = pug_interp = function(description){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 131;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.hints.includes("largest")) {
;pug_debug_line = 132;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 132;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = description.title) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E";
;pug_debug_line = 133;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["socials"](description);
}
else {
;pug_debug_line = 135;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content-section"](description);
}
};
;pug_debug_line = 137;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content"] = pug_interp = function(description){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 138;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["block",description.classes], [false,true]), false, false)+pug_attr("name", description.name, true, false)) + "\u003E";
;pug_debug_line = 138;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + " ";
;pug_debug_line = 139;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.type == "banner") {
;pug_debug_line = 140;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content-banner"].call({
block: function(){
;pug_debug_line = 140;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "  ";
}
}, description);
}
else
if (description.type == "nav") {
;pug_debug_line = 142;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content-nav"](description);
}
else
if (description.type == "section") {
;pug_debug_line = 144;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content-section"](description);
}
else
if (description.type == "article") {
;pug_debug_line = 146;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content-article"](description);
}
else
if (description.type == "image") {
;pug_debug_line = 148;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content-image"](description);
}
else
if (description.type == "button") {
;pug_debug_line = 150;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content-button"](description);
}
else
if (description.type == "collection") {
;pug_debug_line = 152;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content-collection"](description);
}
else {
;pug_debug_line = 154;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content-section"](description);
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 156;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["header-content"] = pug_interp = function(description){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 157;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (description.type == "section") {
;pug_debug_line = 158;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["header-section"](description);
}
else {
;pug_debug_line = 160;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content"](description);
}
};
;pug_debug_line = 162;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["footer-content"] = pug_interp = function(description){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 163;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content"](description);
};
;pug_debug_line = 165;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 166;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Chtml" + (pug_attr("class", pug_classes([`${layout} ${theme}`], [true]), false, true)) + "\u003E";
;pug_debug_line = 167;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 168;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Ctitle\u003E";
;pug_debug_line = 168;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E";
;pug_debug_line = 169;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cmeta key=\"charset\" charset=\"utf-8\"\u003E";
;pug_debug_line = 170;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cmeta key=\"viewport\" name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"\u003E";
;pug_debug_line = 176;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Clink rel=\"stylesheet\" href=\"\u002Fdashkite\u002Fassets\u002Fcss\u002Fsites.css\"\u003E";
;pug_debug_line = 178;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cscript src=\"https:\u002F\u002Fkit.fontawesome.com\u002F2a37c5fc17.js\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E";
;pug_debug_line = 182;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
// iterate main
;(function(){
  var $$obj = main;
  if ('number' == typeof $$obj.length) {
      for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
        var content = $$obj[pug_index3];
;pug_debug_line = 183;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (content.type == "banner" && content.image) {
;pug_debug_line = 184;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cstyle\u003E";
;pug_debug_line = 185;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "main \u003E .block[name='";
;pug_debug_line = 185;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = content.name) ? "" : pug_interp));
;pug_debug_line = 185;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "'] {";
;pug_debug_line = 186;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 186;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "  background-image: var(--background-gradient), url(";
;pug_debug_line = 186;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = content.image.default.url) ? "" : pug_interp));
;pug_debug_line = 186;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + ")";
;pug_debug_line = 187;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 187;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "}\u003C\u002Fstyle\u003E";
;pug_debug_line = 188;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (content.image.dark && theme.includes("preferred")) {
;pug_debug_line = 189;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cstyle media=\"(prefers-color-scheme: dark)\"\u003E";
;pug_debug_line = 190;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "main \u003E .block[name='";
;pug_debug_line = 190;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = content.name) ? "" : pug_interp));
;pug_debug_line = 190;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "'] {";
;pug_debug_line = 191;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 191;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "  background-image: var(--background-gradient), url(";
;pug_debug_line = 191;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = content.image.dark.url) ? "" : pug_interp));
;pug_debug_line = 191;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + ")";
;pug_debug_line = 192;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 192;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "}\u003C\u002Fstyle\u003E";
}
}
      }
  } else {
    var $$l = 0;
    for (var pug_index3 in $$obj) {
      $$l++;
      var content = $$obj[pug_index3];
;pug_debug_line = 183;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (content.type == "banner" && content.image) {
;pug_debug_line = 184;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cstyle\u003E";
;pug_debug_line = 185;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "main \u003E .block[name='";
;pug_debug_line = 185;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = content.name) ? "" : pug_interp));
;pug_debug_line = 185;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "'] {";
;pug_debug_line = 186;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 186;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "  background-image: var(--background-gradient), url(";
;pug_debug_line = 186;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = content.image.default.url) ? "" : pug_interp));
;pug_debug_line = 186;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + ")";
;pug_debug_line = 187;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 187;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "}\u003C\u002Fstyle\u003E";
;pug_debug_line = 188;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (content.image.dark && theme.includes("preferred")) {
;pug_debug_line = 189;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cstyle media=\"(prefers-color-scheme: dark)\"\u003E";
;pug_debug_line = 190;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "main \u003E .block[name='";
;pug_debug_line = 190;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = content.name) ? "" : pug_interp));
;pug_debug_line = 190;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "'] {";
;pug_debug_line = 191;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 191;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "  background-image: var(--background-gradient), url(";
;pug_debug_line = 191;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = content.image.dark.url) ? "" : pug_interp));
;pug_debug_line = 191;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + ")";
;pug_debug_line = 192;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 192;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "}\u003C\u002Fstyle\u003E";
}
}
    }
  }
}).call(this);

;pug_debug_line = 193;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (fonts) {
;pug_debug_line = 194;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Clink rel=\"preconnect\" href=\"https:\u002F\u002Ffonts.googleapis.com\"\u003E";
;pug_debug_line = 195;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Clink" + (" rel=\"preconnect\" href=\"https:\u002F\u002Ffonts.gstatic.com\""+pug_attr("crossorigin", true, true, true)) + "\u003E";
;pug_debug_line = 196;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
// iterate fonts
;(function(){
  var $$obj = fonts;
  if ('number' == typeof $$obj.length) {
      for (var type = 0, $$l = $$obj.length; type < $$l; type++) {
        var name = $$obj[type];
;pug_debug_line = 197;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (name) {
;pug_debug_line = 198;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Clink" + (pug_attr("href", `https://fonts.googleapis.com/css2?family=${name}&display=swap`, true, true)+" rel=\"stylesheet\"") + "\u003E";
;pug_debug_line = 202;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cstyle\u003E";
;pug_debug_line = 203;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + ":root {";
;pug_debug_line = 204;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 204;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "  --";
;pug_debug_line = 204;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = type) ? "" : pug_interp));
;pug_debug_line = 204;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "-font: \"";
;pug_debug_line = 204;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = name) ? "" : pug_interp));
;pug_debug_line = 204;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\";";
;pug_debug_line = 205;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 205;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "}\u003C\u002Fstyle\u003E";
}
      }
  } else {
    var $$l = 0;
    for (var type in $$obj) {
      $$l++;
      var name = $$obj[type];
;pug_debug_line = 197;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (name) {
;pug_debug_line = 198;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Clink" + (pug_attr("href", `https://fonts.googleapis.com/css2?family=${name}&display=swap`, true, true)+" rel=\"stylesheet\"") + "\u003E";
;pug_debug_line = 202;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cstyle\u003E";
;pug_debug_line = 203;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + ":root {";
;pug_debug_line = 204;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 204;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "  --";
;pug_debug_line = 204;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = type) ? "" : pug_interp));
;pug_debug_line = 204;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "-font: \"";
;pug_debug_line = 204;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = name) ? "" : pug_interp));
;pug_debug_line = 204;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\";";
;pug_debug_line = 205;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 205;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "}\u003C\u002Fstyle\u003E";
}
    }
  }
}).call(this);

}
;pug_debug_line = 206;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
// iterate head
;(function(){
  var $$obj = head;
  if ('number' == typeof $$obj.length) {
      for (var pug_index5 = 0, $$l = $$obj.length; pug_index5 < $$l; pug_index5++) {
        var content = $$obj[pug_index5];
;pug_debug_line = 207;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (content.type == "embed") {
;pug_debug_line = 208;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (null == (pug_interp = content.copy) ? "" : pug_interp);
}
      }
  } else {
    var $$l = 0;
    for (var pug_index5 in $$obj) {
      $$l++;
      var content = $$obj[pug_index5];
;pug_debug_line = 207;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (content.type == "embed") {
;pug_debug_line = 208;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + (null == (pug_interp = content.copy) ? "" : pug_interp);
}
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fhead\u003E";
;pug_debug_line = 209;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cbody\u003E";
;pug_debug_line = 210;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 211;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
// iterate header
;(function(){
  var $$obj = header;
  if ('number' == typeof $$obj.length) {
      for (var pug_index6 = 0, $$l = $$obj.length; pug_index6 < $$l; pug_index6++) {
        var content = $$obj[pug_index6];
;pug_debug_line = 212;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["header-content"]( content );
      }
  } else {
    var $$l = 0;
    for (var pug_index6 in $$obj) {
      $$l++;
      var content = $$obj[pug_index6];
;pug_debug_line = 212;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["header-content"]( content );
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fheader\u003E";
;pug_debug_line = 213;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cmain\u003E";
;pug_debug_line = 214;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
// iterate main
;(function(){
  var $$obj = main;
  if ('number' == typeof $$obj.length) {
      for (var pug_index7 = 0, $$l = $$obj.length; pug_index7 < $$l; pug_index7++) {
        var content = $$obj[pug_index7];
;pug_debug_line = 215;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content"]( content );
      }
  } else {
    var $$l = 0;
    for (var pug_index7 in $$obj) {
      $$l++;
      var content = $$obj[pug_index7];
;pug_debug_line = 215;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content"]( content );
    }
  }
}).call(this);

;pug_debug_line = 216;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
if (aside) {
;pug_debug_line = 217;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Caside\u003E";
;pug_debug_line = 218;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
// iterate aside
;(function(){
  var $$obj = aside;
  if ('number' == typeof $$obj.length) {
      for (var pug_index8 = 0, $$l = $$obj.length; pug_index8 < $$l; pug_index8++) {
        var content = $$obj[pug_index8];
;pug_debug_line = 219;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content"]( content );
      }
  } else {
    var $$l = 0;
    for (var pug_index8 in $$obj) {
      $$l++;
      var content = $$obj[pug_index8];
;pug_debug_line = 219;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["content"]( content );
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Faside\u003E";
}
pug_html = pug_html + "\u003C\u002Fmain\u003E";
;pug_debug_line = 220;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_html = pug_html + "\u003Cfooter\u003E";
;pug_debug_line = 221;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
// iterate footer
;(function(){
  var $$obj = footer;
  if ('number' == typeof $$obj.length) {
      for (var pug_index9 = 0, $$l = $$obj.length; pug_index9 < $$l; pug_index9++) {
        var content = $$obj[pug_index9];
;pug_debug_line = 222;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["footer-content"]( content );
      }
  } else {
    var $$l = 0;
    for (var pug_index9 in $$obj) {
      $$l++;
      var content = $$obj[pug_index9];
;pug_debug_line = 222;pug_debug_filename = "test\u002Fhelpers\u002Fhtml.pug";
pug_mixins["footer-content"]( content );
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ffooter\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";
    }.call(this, "aside" in locals_for_with ?
        locals_for_with.aside :
        typeof aside !== 'undefined' ? aside : undefined, "fonts" in locals_for_with ?
        locals_for_with.fonts :
        typeof fonts !== 'undefined' ? fonts : undefined, "footer" in locals_for_with ?
        locals_for_with.footer :
        typeof footer !== 'undefined' ? footer : undefined, "head" in locals_for_with ?
        locals_for_with.head :
        typeof head !== 'undefined' ? head : undefined, "header" in locals_for_with ?
        locals_for_with.header :
        typeof header !== 'undefined' ? header : undefined, "layout" in locals_for_with ?
        locals_for_with.layout :
        typeof layout !== 'undefined' ? layout : undefined, "main" in locals_for_with ?
        locals_for_with.main :
        typeof main !== 'undefined' ? main : undefined, "theme" in locals_for_with ?
        locals_for_with.theme :
        typeof theme !== 'undefined' ? theme : undefined, "title" in locals_for_with ?
        locals_for_with.title :
        typeof title !== 'undefined' ? title : undefined));
    ;} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}
module.exports = template;