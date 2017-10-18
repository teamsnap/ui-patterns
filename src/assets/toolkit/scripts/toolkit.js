'use strict';

console.log(`toolkit.js is being used at ${Date.now()}.`);

import {u} from 'umbrellajs';

u('.js-ButtonGroupDemo > .Button').on('click', function() {
  u('.js-ButtonGroupDemo > .Button').removeClass('is-active');
  u(this).addClass('is-active');
});

// Example code for radial loading indicator
// Building off example of adding in-line css based on percentage used for bar loading indicators



// rotate only firstHalf upto 180 degrees, second half if > 180 degrees
var radialProgress = function() {
  var firstHalf = u('.ProgressBar--radial.demo .first-half').nodes[0],
    secondHalf = u('.ProgressBar--radial.demo .second-half').nodes[0],
    circleDiv = u('.ProgressBar--radial.demo .circle'),
    loadingProgress = 85, // loading progress in precentage

    loadingDegrees = (loadingProgress*360)/100; // convert percentage loaded to degrees rotation

  if(firstHalf && loadingDegrees <= 180) {
    firstHalf.style.transform = 'rotate(' + loadingDegrees + 'deg)';
    secondHalf.style.transform = 'rotate(0deg)';
    circleDiv.removeClass('whole').addClass('half');
  } else if(firstHalf && loadingDegrees > 180) {
    firstHalf.style.transform = 'rotate(180deg)';
    secondHalf.style.transform = 'rotate(' + loadingDegrees + 'deg)';
    circleDiv.addClass('whole').removeClass('half');
  } else {
    return;
  }
}

radialProgress();

// Tree Menu and Miller Menu
var treeBranch = u('.TreeMenu-branch'),
    millerBranch = u('.MillerMenu-branch'),
    treeAccordion = function(e) {
      e.preventDefault();
      e.stopPropagation();
      if(u(this).hasClass('collapsed')) {
        u(this).removeClass('collapsed').addClass('open');
      } else if(u(this).hasClass('open')) {
        u(this).removeClass('open').addClass('collapsed');
      }
    },
    millerMenuSlide = function(e) {
      e.preventDefault();
      e.stopPropagation();
      var childPanelId = u(this).children('a').attr('href'),
          breadcrumbContent = u(this).text(),
          breadcrumbContainer = u('.MillerMenu-breadcrumb'),
          breadcrumbUpdate = function(){
            breadcrumbContainer.append('<a href=' + childPanelId + ' >' + breadcrumbContent + ' / </a> /');
            var breadcrumbs = u('.MillerMenu-breadcrumb a');
            breadcrumbs.on('click', function(){
              u('.MillerMenu-level').removeClass('active-level');
              u(childPanelId).addClass('active-level');
            })
          };

      if(u(this).hasClass('has-child')) {
        u('.MillerMenu-level').removeClass('active-level');
        u(childPanelId).addClass('active-level');
        breadcrumbUpdate();
      }
    };

u(treeBranch).on('click', treeAccordion);
u(millerBranch).on('click', treeAccordion).on('click', millerMenuSlide);


