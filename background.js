// タブが変更されたとき
chrome.tabs.onSelectionChanged.addListener(function (tabid) {
  console.log("background.js.tab");
  chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.sendRequest(tab.id, {status: "changed"}, function (response) {
      console.log("response");
    });
  });
});

chrome.extension.onConnect.addListener(function (port) {
  console.log("background.js");
  port.onMessage.addListener(function (msg) {
    if (msg.status == "start") {
      ogp_type = msg.ogp_type;
      ogp_title = msg.ogp_title;
      ogp_url = msg.ogp_url;
      ogp_image = msg.ogp_image;
      ogp_description = msg.ogp_description;
    }
  });
});

