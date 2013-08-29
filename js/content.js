var ExtensionContent;

ExtensionContent = (function() {
  function ExtensionContent() {
    var self,
      _this = this;
    self = this;
    $(document).ready(function() {
      return self.doValidation();
    });
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.action === "actionClicked") {
        return sendResponse({
          message: 'ok'
        });
      } else {
        return sendResponse({});
      }
    });
  }

  ExtensionContent.prototype.doValidation = function() {
    var doctype, html, node, self, url, _ref, _ref1, _ref2;
    self = this;
    node = document.doctype;
    doctype = node.name + ((_ref = node.publicId) != null ? _ref : ' PUBLIC "' + node.publicId + {
      '"': ''
    }) + ((_ref1 = !node.publicId && node.systemId) != null ? _ref1 : {
      ' SYSTEM': ''
    }) + ((_ref2 = node.systemId) != null ? _ref2 : ' "' + node.systemId + {
      '"': ''
    });
    html = "<!DOCTYPE " + doctype + ">\n";
    html += document.documentElement.outerHTML;
    if (doctype.toLowerCase() === 'html') {
      url = 'http://html5.validator.nu/';
    } else {
      url = 'http://validator.nu/';
    }
    return $.ajax({
      type: 'POST',
      url: "" + url + "?out=json",
      data: html,
      processData: false,
      contentType: false,
      timeout: 3000,
      headers: {
        'Content-Type': 'text/html'
      },
      dataType: 'json',
      success: function(data, statux, xhr) {
        var k, v, _ref3, _results;
        chrome.runtime.sendMessage({
          action: "updateBadge",
          text: "" + data.messages.length
        });
        if (data.messages.length === 0) {
          return window.console.info("No validation errors");
        } else {
          _ref3 = data.messages;
          _results = [];
          for (k in _ref3) {
            v = _ref3[k];
            _results.push(window.console.warn("" + v.lastLine + ": " + v.message));
          }
          return _results;
        }
      },
      error: function(xhr, type, error) {
        chrome.runtime.sendMessage({
          action: "updateBadge",
          text: "!"
        });
      }
    });
  };

  return ExtensionContent;

})();

new ExtensionContent;
