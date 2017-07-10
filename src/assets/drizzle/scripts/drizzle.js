'use strict';

import 'prismjs';
import {u} from 'umbrellajs';

const dom = {};

dom.nav = document.getElementById('nav');
dom.navMenu = document.getElementById('nav-menu');
dom.navToggle = dom.nav.querySelector('a[href="#nav"]');
dom.navLinks = dom.navMenu.querySelectorAll('a');

function setActiveNavItem (pathname) {
  const noIndex = str => str.replace(/index\.html$/, '');
  const isMatch = a => noIndex(a.pathname) === noIndex(pathname);
  const item = Array.from(dom.navLinks).find(isMatch);
  if (item) {
    item.classList.add('is-active');
  }
}

dom.navToggle.addEventListener('click', event => {
  event.preventDefault();
  dom.nav.classList.toggle('is-active');
});

setActiveNavItem(window.location.pathname);

dom.frameContainers = document.querySelectorAll('[data-drizzle-append-iframe]');

if (dom.frameContainers.length) {
  window.addEventListener('load', () => {
    Array.from(dom.frameContainers).forEach(container => {
      const src = container.getAttribute('data-drizzle-append-iframe');
      const iframe = document.createElement('iframe');
      iframe.addEventListener('load', () => {
        container.classList.add('is-loaded');
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
