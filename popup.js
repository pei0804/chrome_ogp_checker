$(function () {
  var bg = chrome.extension.getBackgroundPage();

  var ogp_type = bg.ogp_type;
  var ogp_title = bg.ogp_title;
  var ogp_url = bg.ogp_url;
  var ogp_image = bg.ogp_image;
  var ogp_description = bg.ogp_description;
  var need_refresh = bg.need_refresh;

  if (need_refresh) {
    $('#status').append('再読込してください');
    $('#contents').remove();
    return;
  }

  // 文字列を配列にする
  String.prototype.toArray = function () {
    var array = new Array;
    for (var i = 0; i < this.length; i++) {
      array.push(this.charAt(i));
    }
    return array;
  };

  function cleanClass(target) {
    $(target).removeClass('alert-*');
  }

  function ok(target) {
    cleanClass(target);
    $(target).addClass('alert-info');
  }

  function warn(target) {
    cleanClass(target);
    $(target).addClass('alert-warning');
  }

  function ng(target) {
    cleanClass(target);
    $(target).addClass('alert-danger');
  }

  function setOg(ogp_obj, target, required) {
    if (ogp_obj) {
      ok(target + '_key');
      $(target).append('' + ogp_obj + '');
    } else {
      if (required) {
        ng(target + '_key');
      } else {
        warn(target + '_key');
      }
      $(target).append('未設定');
    }
  }

  if (ogp_type) {
    if (ogp_type != 'article') {
      ng('#ogp_type_key');
    } else {
      ok('#ogp_type_key');
    }
    $('#ogp_type').append(ogp_type);
  } else {
    ng('#ogp_type_key');
    $('#ogp_type').append('未設定');
  }

  if (ogp_image) {
    ok('#ogp_image_key');
    $("#ogp_image").append(ogp_image + '<br><img src="' + ogp_image + '" width="250" >');
  } else {
    ng('#ogp_image_key');
    $("#ogp_image").append("未設定");
  }

  setOg(ogp_title, '#ogp_title', true);
  setOg(ogp_url, '#ogp_url', false);
  setOg(ogp_description, '#ogp_description', false);
});
