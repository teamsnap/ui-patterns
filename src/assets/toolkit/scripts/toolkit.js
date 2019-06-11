//------------------------------------------------------------//

// * Demo Javascript
// * 1. Basic Setup
// * 2. Button Group
// * 3. Radial Progress Bar
// * 4. Collapsable Panel Row
// * 5. Feedback trigger and dismiss
// * 6. Popup Javascript
// * 7. Tabs Javascript

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
  u('#FeedbackBox--triggeredPopup').addClass('is-active');
});

u('#FeedbackBox--triggeredPopup .Feedback-dismiss').on('click', function() {
  u('#FeedbackBox--triggeredPopup').removeClass('is-active');
});

// * 6. Popup Javascript

u('[data-control="popup"]').on('click', function() {
  var $this          = u(this),
      target         = $this.data("open"),
      $content       = u('[data-popup="' + target + '"]');

  $content.toggleClass("is-open");
});

u('[data-dismiss]').on('click', function() {
  var $this          = u(this),
      $content       = $this.closest('[data-popup]');

  $content.removeClass("is-open");
});

// * 7. Tabs Javascript

// grabs all demo tab objects
var $demoTabs      = u('[data-control="tab"]'),
    $demoTabContent  = u("[data-tab]");

// sets the default content
u('[data-default="Tab"]').addClass('is-active');

// function to change active tab and tab content
u('[data-control="tab"]').on('click', function() {

  var $this          = u(this),
      target         = $this.data('open'),
      $content       = $demoTabContent.filter('[data-tab="' + target + '"]'),
      group          = u('[data-tab="' + target + '"]').data("group"),
      $tabGroup      = $demoTabs.filter('[data-group="' + group + '"]'),
      $contentGroup  = $demoTabContent.filter('[data-group="' + group + '"]');

      if ($this.hasClass("is-active")) return;

      $tabGroup.not($this).removeClass("is-active");
      $this.addClass("is-active");

      $contentGroup.not($content).removeClass('is-active');
      $content.addClass('is-active');

});

// Show Hide logic

u(".Input-showHideButton").on('click', function () {
  var showHideField = u(this).siblings(".Input--showHide");
  if (showHideField.attr("type") === "password") {
    u(showHideField).attr("type", "text");
    u(this).html("Hide")
  }
  else {
    u(showHideField).attr("type", "password");
    u(this).html("Show")
  }
});
