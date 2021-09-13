'use strict';

const dom = {};

dom.nav = document.getElementById('nav');
dom.navMenu = document.getElementById('nav-menu');
dom.navToggle = (dom.navMenu) ? dom.nav.querySelector('a[href="#nav"]') : [];
dom.navLinks = (dom.navMenu) ? dom.navMenu.querySelectorAll('a') : [];

function setActiveNavItem (pathname) {
  const noIndex = str => str.replace(/index\.html$/, '');
  const isMatch = a => noIndex(a.pathname) === noIndex(pathname);
  const item = Array.from(dom.navLinks).find(isMatch);
  if (item) {
    item.classList.add('drizzle-is-active');
  }
}

if (dom.navToggle) {
  dom.navToggle.addEventListener('click', event => {
    event.preventDefault();
    dom.nav.classList.toggle('drizzle-is-active');
  });
}

setActiveNavItem(window.location.pathname);

dom.frameContainers = document.querySelectorAll('[data-drizzle-append-iframe]');

if (dom.frameContainers.length) {
  window.addEventListener('load', () => {
    Array.from(dom.frameContainers).forEach(container => {
      const src = container.getAttribute('data-drizzle-append-iframe');
      const iframe = document.createElement('iframe');
      iframe.addEventListener('load', () => {
        container.classList.add('drizzle-is-loaded');
      });
      iframe.setAttribute('src', src);
      container.appendChild(iframe);
    });
  });
}


u('.js-drizzleCodePreviewToggle').on('click', () => {
  u('.js-drizzleCodePreview').toggleClass('drizzle-u-hidden');
});

u('.js-drizzleClassicCssToggle').on('click', () => {
  const style = u('link[rel="stylesheet"][href*="app-team-"]');
  if(style.attr('disabled')) {
    style.each(function(element){
      element.removeAttribute('disabled');
    });
  } else {
    style.attr('disabled', 'disabled');
  }
});

// Theme switching
// From A List Apart article: http://alistapart.com/article/alternate
// (http://alistapart.com/d/alternate/styleswitcher.js)

document.getElementById('js-themeSelect').addEventListener('change', function() {
  var themeSelect = this;
  var theme = themeSelect.value;

  setActiveStyleSheet(theme);
  return false;
})

function setActiveStyleSheet(title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
}

function getActiveStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
  }
  return null;
}

function getPreferredStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1
       && a.getAttribute("rel").indexOf("alt") == -1
       && a.getAttribute("title")
       ) return a.getAttribute("title");
  }
  return null;
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

window.onload = function(e) {
  var cookie = readCookie("style");
  var title = cookie ? cookie : getPreferredStyleSheet();
  setActiveStyleSheet(title);

  var themeSelector = document.getElementById('js-themeSelect');
  themeSelector.value = title;
}

window.onunload = function(e) {
  var title = getActiveStyleSheet();
  createCookie("style", title, 365);
}

var cookie = readCookie("style");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);
