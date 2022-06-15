sap.ui.define([], function () {
  /**
   * Created by azu on 2014/01/18.
   * LICENSE : MIT
   */
  function createOutlines(outlines) {
    return outlines.map(function (outline) {
      if (outline.hasOwnProperty('_children')) {
        var children = outline['_children'];
        delete outline['_children'];
        return {
          'outline': createOutlines(children).concat({
            _attr: outline
          })
        };
      }

      return {
        "outline": {
          _attr: outline
        }
      };
    });
  }

  function createBody(outlines) {
    return xml({
      'body': createOutlines(outlines)
    });
  }

  function createHeader(header) {
    var headerObject = Object.keys(header).map(function (key) {
      var object = {};
      var value = header[key];

      if (key === "dateCreated" && value instanceof Date) {
        object[key] = value.toUTCString();
      } else {
        object[key] = value;
      }

      return object;
    });
    return xml({
      "head": headerObject
    });
  }
  /**
   *
   * @param header
   * @param outlines
   */


  function main(header, outlines) {
    var headerXML = createHeader(header);
    var outlinesXML = createBody(outlines);
    return '<?xml version="1.0" encoding="UTF-8"?><opml version="2.0">' + headerXML + outlinesXML + '</opml>';
  }

  var __exports = {
    __esModule: true
  };
  __exports.main = main;
  return __exports;
});
//# sourceMappingURL=opml-generator.js.map