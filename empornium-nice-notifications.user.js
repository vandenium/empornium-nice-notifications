// ==UserScript==
// @name        Empornium Nice Notifications
// @description Clickable notification alerts
// @namespace   Empornium Scripts
// @version     1.0.0
// @author      vandenium
// @grant       none
// @include     /^https://www\.empornium\.(me|sx|is)\/*/

// ==/UserScript==

// Changelog:
// Version 1.0.0
//  - Initial version.
// Todo:

const alertBarContainer = document.querySelector('div.alertbar');

// If no alertbar, exit.
if (alertBarContainer) {
  const alertsContainer = document.querySelector('div#alerts');

  // Return individual RGB values from rgb string.
  function getRGB(str) {
    var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
    return match ? {
      red: match[1],
      green: match[2],
      blue: match[3]
    } : {};
  }

  // Preserve notification bar color from style sheet.
  const computedStyle = window.getComputedStyle(alertBarContainer);
  const originalAlertBackgroundColor = computedStyle.backgroundColor;
  const originalAlertColor = computedStyle.color;

  const rgb = getRGB(originalAlertBackgroundColor);
  const hoverAlertBackgroundColor = `rgb(${rgb.red * 1 - 50}, ${rgb.green * 1 - 50}, ${rgb.blue * 1 - 50})`;

  var css = `div#alerts a:hover{ background-color: ${hoverAlertBackgroundColor} !important;}`;
  var style = document.createElement('style');

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  document.querySelector('head').appendChild(style);

  // Update notification alerts style
  alertBarContainer.classList.remove('alertbar');
  const alerts = alertBarContainer.querySelectorAll('a');

  alerts.forEach(alert => {
    alert.style.cssText = `
      width: 100%;
      background-color: ${originalAlertBackgroundColor};
      color: ${originalAlertColor};
      display: inline-block;
      vertical-align: middle;
      text-decoration: none;
      font-size: 14px;
      line-height: 25px;
      border-radius: 25px;
      margin: 5px;
      font-weight: bold;
    `;
  });
}
