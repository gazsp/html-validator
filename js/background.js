var MyExtension;

MyExtension = (function() {
  MyExtension.active = false;

  function MyExtension() {
    var self;
    self = this;
    chrome.browserAction.onClicked.addListener(function(tab) {
      this.active = !this.active;
      console.log(this.active);
      return chrome.tabs.sendMessage(tab.id, {
        action: "actionClicked",
        state: this.active
      }, function(response) {});
    });
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      var color;
      if (request.action === 'updateBadge') {
        if (parseInt(request.text) === 0) {
          color = '#9ee33b';
        } else {
          color = '#c01802';
        }
        return self.performCallbackInActiveTab(function(tab) {
          var colorData, textData;
          textData = {
            text: request.text,
            tabId: tab.id
          };
          chrome.browserAction.setBadgeText(textData);
          colorData = {
            color: color,
            tabId: tab.id
          };
          return chrome.browserAction.setBadgeBackgroundColor(colorData);
        });
      }
    });
  }

  MyExtension.prototype.performCallbackInActiveTab = function(callback) {
    var self;
    self = this;
    return chrome.tabs.query({
      currentWindow: true,
      active: true
    }, function(tabArray) {
      return callback(tabArray[0]);
    });
  };

  return MyExtension;

})();

new MyExtension;
