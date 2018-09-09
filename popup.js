$(function () {
  var bg = chrome.extension.getBackgroundPage();

  var ogp_title = bg.ogp_title;
  var ogp_url = bg.ogp_url;
  var ogp_image = bg.ogp_image;
  var ogp_description = bg.ogp_description;

  // 文字列を配列にする
  String.prototype.toArray = function () {
    var array = new Array;
    for (var i = 0; i < this.length; i++) {
      array.push(this.charAt(i));
    }
    return array;
  };

  if (ogp_title) {
    ogp_title_length = '<span style="display:inline-block;color:#ffffff;background-color:#666666;padding:0.4em;">' + ogp_title.length + "文字</span>";
    ogp_title = ogp_title + ogp_title_length;
  }
  $("#ogp_title").append(ogp_title);

  if (ogp_url) {
    $("#ogp_url").append('' + ogp_url + '');
  } else {
    $("#ogp_url").append("未設定");
  }

  if (ogp_image) {
    var image = new Image();
    image.src = ogp_image;
    width = image.naturalWidth;
    $("#ogp_image").append(ogp_image + '<br><img src="' + ogp_image + '" width="250" >');
  } else {
    $("#ogp_image").append("未設定");
  }

  $("#ogp_description").append(ogp_description);
});
