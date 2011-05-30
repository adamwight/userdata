// ==UserScript==
// @name           WP pilot
// @description    Preserve your intellectual property:::
// @namespace      http://github.com/u
// @include        http://*wordpress*/*
// @require        http://code.jquery.com/jquery-latest.min.js
// @require        http://colorpowered.com/colorbox/core/colorbox/jquery.colorbox-min.js
// @require        http://ajax.cdnjs.com/ajax/libs/json2/20110223/json2.js
// ==/UserScript==


//// Greasemonkey support
function register_menus()
{
  GM_registerMenuCommand("TEST configuration", configure_dialog);
}

save_data = GM_setValue; // (key, value)
load_data = GM_getValue; // (key) => value

inject_css = GM_addStyle; // (css)
