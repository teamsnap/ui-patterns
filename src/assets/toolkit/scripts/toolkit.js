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

// * 2. Button Group

u('.js-ButtonGroupDemo > .Button').on('click', function() {
  u('.js-ButtonGroupDemo > .Button').removeClass('is-active');
  u(this).addClass('is-active');
});


// * 3. Radial Progress Bar

// 1. Only run radial progress code if present
// Note: Builds off example of adding in-line css based on percentage used for bar loading indicators

if(u('.RadialProgress').length) { // 1

  u('.RadialProgress').each(function(node, i) {

    var progress = u(node).data('progress'),
        progressDegrees = (360 * (progress/100)),
        circle = u(node).find('.RadialProgress-circle'),
        firstHalf = u(node).find('.RadialProgress-status').first(),
        secondHalf =  u(node).find('.RadialProgress-status').last();

    if(progressDegrees <= 180) {
     firstHalf.style.transform = 'rotate(' + progressDegrees + 'deg)';
     secondHalf.style.display = 'rotate(0deg)';
    } else if(progressDegrees > 180) {
     firstHalf.style.transform = 'rotate(180deg)';
     secondHalf.style.transform = 'rotate(' + progressDegrees + 'deg)';
     circle.addClass('whole');
   }

 });

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

// * 5. Feedback trigger and dismiss

u('#FeedbackBox--trigger').on('click', function() {
  u('#FeedbackBox--triggeredPopup').addClass('js-active');
});

u('#FeedbackBox--triggeredPopup .Feedback-dismiss').on('click', function() {
  u('#FeedbackBox--triggeredPopup').removeClass('js-active');
});
