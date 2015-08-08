;(function() {
  "use strict";

  /**
   *  Polyfill for IE DOM XML parse.
   */
  if(!window.DOMParser && window.ActiveXObject) {
    var Parser = function(){};
    Parser.prototype.baseURI = null;
    Parser.prototype.parseFromString = function(xml, mime) {
      var doc = new ActiveXObject("Microsoft.XMLDOM");
      doc.async	= true;
      doc.validateOnParse = false;
      doc.loadXML(xml);
      return doc;
    };
    window.DOMParser = Parser;
  }

  /**
   *  Converter for the xml type.
   */
  var xml = {
    mime: 'application/xml',
    encode: function(data) {
      return data;
    },
    decode: function(data) {
      var parser = new DOMParser();
      return parser.parseFromString(data, converters.xml.mime);
    }
  }

  if(typeof(module) === "object" && typeof(module.exports) === "object") {
    module.exports = xml;
  }else if(typeof(define) == 'function' && define.amd) {
    define("ajax-xml", [], function () { return xml; });
  }else if(ajax && ajax.converters) {
    ajax.converters.xml = xml;
  }
})();
