'use strict';

console.log(`toolkit.js is being used at ${Date.now()}.`);

import {u} from 'umbrellajs';

u('.js-ButtonGroupDemo > .Button').on('click', function() {
  u('.js-ButtonGroupDemo > .Button').removeClass('is-active');
  u(this).addClass('is-active');
});

// Example code for radial loading indicator
// Building off example of adding in-line css based on percentage used for bar loading indicators

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
