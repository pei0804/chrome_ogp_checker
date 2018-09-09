// タブが変更されたとき
chrome.tabs.onSelectionChanged.addListener(function (tabid) {
  console.log("background.js.tab");
  chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.sendRequest(tab.id, {status: "changed"}, function (response) {
      console.log("response");
      console.log(response);
      need_refresh = true;
    });
  });
});

chrome.extension.onConnect.addListener(function (port) {
  console.log("background.js");
  port.onMessage.addListener(function (msg) {
    console.log(msg);
    if (msg.status == "start") {
      ogp_type = msg.ogp_type;
      ogp_title = msg.ogp_title;
      ogp_url = msg.ogp_url;
      ogp_image = msg.ogp_image;
      ogp_description = msg.ogp_description;
      need_refresh = false;
    }
  });
});

