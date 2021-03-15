import $ from "jquery";

const setAvatarStyle = css => {
  $("#avator")
    .removeClass()
    .removeAttr("style")
    .css(css);
};

const getAvatarStyle = key => {
  return $("#avator").css(key);
};

export { getAvatarStyle, setAvatarStyle };
