function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(e,n,r,t){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||t))throw e.message+=" on line "+r,e;var o,a,i,s;try{t=t||require("fs").readFileSync(n,{encoding:"utf8"}),o=3,a=t.split("\n"),i=Math.max(r-o,0),s=Math.min(a.length,r+o)}catch(t){return e.message+=" - could not read from "+n+" ("+t.message+")",void pug_rethrow(e,null,r)}o=a.slice(i,s).map(function(e,n){var t=n+i+1;return(t==r?"  > ":"    ")+t+"| "+e}).join("\n"),e.path=n;try{e.message=(n||"Pug")+":"+r+"\n"+o+"\n\n"+e.message}catch(e){}throw e}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;
    var locals_for_with = (locals || {});
    
    (function (image) {
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
;pug_debug_line = 3;pug_debug_filename = "test\u002Fhelpers\u002Ffigure.pug";
pug_mixins["figure"](image);
    }.call(this, "image" in locals_for_with ?
        locals_for_with.image :
        typeof image !== 'undefined' ? image : undefined));
    ;} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}
module.exports = template;