'use strict';

console.log(`toolkit.js is being used at ${Date.now()}.`);

import {u} from 'umbrellajs';

u('.js-ButtonGroupDemo > .Button').on('click', function() {
  u('.js-ButtonGroupDemo > .Button').removeClass('is-active');
  u(this).addClass('is-active');
});
