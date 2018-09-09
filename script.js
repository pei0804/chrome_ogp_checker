getPageInformation();

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse)
  {
    getPageInformation();
  }
);

/**
 *
 *
 */
function getPageInformation()
{
  var port = chrome.extension.connect({name:"ogpcheck"});

  var ogp_title        = $("meta[property='og:title']").attr("content");
  var ogp_url          = $("meta[property='og:url']").attr("content");
  var ogp_image        = $("meta[property='og:image']").attr("content");
  var ogp_description  = $("meta[property='og:description']").attr("content");
  var ogp_image_width  = 0;

  port.postMessage({
    ogp_title: ogp_title,
    ogp_url: ogp_url,
    ogp_image: ogp_image,
    ogp_image_width: ogp_image_width,
    ogp_description: ogp_description,
    status:"start"
  });

  port.onMessage.addListener(function(msg){
    if (msg.status == "loading"){
      port.postMessage({status: "loading"});
    }
  });
}
