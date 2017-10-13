//------------------------------------------------------------//

// * Demo Javascript
// * 1. Basic Setup
// * 2. Button Group
// * 3. Radial Progress Bar
// * 4. Collapsable Panel Row

// Notes:
// *

//------------------------------------------------------------//

// * 1. Basic Setup

'use strict';

console.log(`toolkit.js is being used at ${Date.now()}.`);

import {u} from 'umbrellajs';

//
// Polyfills
//

// Array.from()
import arrayFrom from 'array.from';
arrayFrom.shim();

// Object.assign()\
import objectAssign from 'object.assign';
objectAssign.shim();

// Array.prototype.findIndex()
import arrayPrototypeFindIndex from 'array.prototype.findindex';
arrayPrototypeFindIndex.shim();

// Element.classList
require('./vendor/classList');



//
// Primary Navigation
//

import debounce from 'debounce';
import PriorityPlus from './components/PriorityPlus';

window.addEventListener('load', function load (event) {
  // remove listener since the page has already loaded/
  window.removeEventListener('load', load, false);
  // find any PriorityPlus elements/
  var elements = document.querySelectorAll('.js-PriorityPlus');
  // if any were found, loop through them and initialize the menu/
  if (elements.length) {
    Array.from(elements).forEach(function (element) {
      var thisPriorityPlus = new PriorityPlus(element);
      // update the nav on resize (but not _too_ often)/
      window.addEventListener('resize', debounce(() => thisPriorityPlus.update(), 200));
    });
  }
});



// 2. Demo JS for ButtonGroup

u('.js-ButtonGroupDemo > .Button').on('click', function() {
  u('.js-ButtonGroupDemo > .Button').removeClass('is-active');
  u(this).addClass('is-active');
});


// * 3. Radial Progress Bar

// 1. Only run radial progress code if present
// Note: Builds off example of adding in-line css based on percentage used for bar loading indicators

if(u('.ProgressBar--radial.demo').length) { // 1

  var firstHalf = u('.ProgressBar--radial.demo .first-half').nodes[0],
      secondHalf = u('.ProgressBar--radial.demo .second-half').nodes[0],
      circleDiv = u('.ProgressBar--radial.demo .circle'),
      loadingProgress = 85, // loading progress in precentage
      loadingDegrees = (loadingProgress*360)/100; // convert percentage loaded to degrees rotation

  // rotate only firstHalf upto 180 degrees, second half if > 180 degrees
  if(loadingDegrees <= 180) {
   firstHalf.style.transform = 'rotate(' + loadingDegrees + 'deg)';
   secondHalf.style.transform = 'rotate(0deg)';
   circleDiv.removeClass('whole').addClass('half');
  } else if(loadingDegrees > 180) {
   firstHalf.style.transform = 'rotate(180deg)';
   secondHalf.style.transform = 'rotate(' + loadingDegrees + 'deg)';
   circleDiv.addClass('whole').removeClass('half');
  }

}

// * 4. Collapsable Panel Row

u('.js-expandableControlDemo').on('click', function(e) {
  e.preventDefault();
  var childRows = u(this).data('control');
  if( u(this).hasClass('is-expanded')) {
    u(this).removeClass('is-expanded')
    u('[data-childRows="'+ childRows +'"]').removeClass('is-expanded')
  }
  else {
    u(this).addClass('is-expanded')
    u('[data-childRows="'+ childRows +'"]').addClass('is-expanded')
  }
});
