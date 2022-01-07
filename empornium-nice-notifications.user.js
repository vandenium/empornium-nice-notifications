// ==UserScript==
// @name        Empornium Nice Notifications
// @description Clickable notification alerts
// @namespace   Empornium Scripts
// @version     1.1.0
// @author      vandenium
// @grant       none
// @include     /^https://www\.empornium\.(me|sx|is)\/*/

// ==/UserScript==

// Changelog:
// Version 1.1.0
//  - Add forum subscription notifications
// Version 1.0.1
//  - Bugfix: Fix issue of applying to only first alert.
// Version 1.0.0
//  - Initial version.
// Todo:

const alertBarContainers = document.querySelectorAll('div#alerts div.alertbar');
const  isSubscriptionNotifications = () => {
  const el = document.querySelector('a.new-subscriptions');
  if (el) {
    const elTextMatch = /\(([0-9]+)\)/.exec(el.textContent);
    if (elTextMatch) {
      return elTextMatch[1];
    }
    return false;
  }
  return false;
};

const insertAfter = (newNode, existingNode) => existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);

const subscriptionNotificationCount = isSubscriptionNotifications();

if (subscriptionNotificationCount) {

  // create stylesheet
  const css = `
    div.subscription-alerts a:hover { 
      background-color: #eee;
    }

    div#menu {
      margin-bottom: 2px;
    }

    div.subscription-alerts {
      margin: 0 auto;
      text-align: center;
      max-width: 700px;
      width: 50%;
    }

    div.subscription-alerts a {
      background-color: #ccc;
      color: #333;
      width: 100%;
      display: inline-block;
      vertical-align: middle;
      text-decoration: none;
      line-height: 20px;
      border-radius: 25px;
      margin: 1px;
      font-weight: bold;
    }
  `;
  var style = document.createElement('style');
  style.appendChild(document.createTextNode(css));
  style.appendChild(document.createTextNode(css));
  document.querySelector('head').appendChild(style);

  const subscriptionAlertContainer = document.createElement('div');
  subscriptionAlertContainer.classList.add('subscription-alerts');

  const createNotification = (text) => {
    const el = document.createElement('a');
    el.href = '/userhistory.php?action=subscriptions';
    el.innerText = text;
    return el;
  }

  
  const notification = createNotification(`You have ${subscriptionNotificationCount} new forum notification${subscriptionNotificationCount * 1 === 1 ? '' : 's'}`);
  subscriptionAlertContainer.append(notification);

  insertAfter(subscriptionAlertContainer, document.getElementById('menu'));
}

// If no alertbar, exit.
if (alertBarContainers.length > 0) {
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
  const computedStyle = window.getComputedStyle(alertBarContainers[0]);
  const originalAlertBackgroundColor = computedStyle.backgroundColor;
  const originalAlertColor = computedStyle.color;

  const rgb = getRGB(originalAlertBackgroundColor);
  const hoverAlertBackgroundColor = `rgb(${rgb.red * 1 - 20}, ${rgb.green * 1 - 20}, ${rgb.blue * 1 - 20})`;

  var css = `
    div#alerts a:hover { 
      background-color: ${hoverAlertBackgroundColor} !important;
    }

    div#alerts a {
      width: 100%;
      display: inline-block;
      vertical-align: middle;
      text-decoration: none;
      line-height: 20px;
      border-radius: 25px;
      margin: 1px;
      font-weight: bold;
    }
    `;
  var style = document.createElement('style');

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  document.querySelector('head').appendChild(style);

  // Update notification alerts style
  alertBarContainers.forEach(alertBar => {
    alertBar.classList.remove('alertbar');
  })

  const alerts = alertsContainer.querySelectorAll('a');

  const styleAlerts = (alerts) => {
    alerts.forEach(alert => {
      alert.style.backgroundColor = originalAlertBackgroundColor;
      alert.style.color = originalAlertColor;
      ;
    })
  }

  styleAlerts(alerts);
}