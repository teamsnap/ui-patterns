$(document).ready(function(){
  $('.team-store-slides').slick({
    dots: true
  });
});

// Primary color controls

var toggleColorsPrimary = function() {
  $(".ColorBlocks--primary").toggleClass("is-hidden");
  if ( $(".ColorBlocks--primary").hasClass("is-hidden") ) {
    $(".js-primaryColorToggle").text("Show Colors");
  } else {
      $(".js-primaryColorToggle").text("Hide Colors");
  }
}

$(".js-primaryColorToggle").click(function() {
  toggleColorsPrimary();
})

$(".ColorBlocks-block--primary").click(function() {
  $(".ColorBlocks-block--primary").removeClass("is-active");

  $(this).toggleClass("is-active");

  var selectedColor = $(this).data("color");
  $(".js-primaryColorSelected").text(selectedColor);

  var selectedColorValue = $(this).css("background-color");
  $(".js-primaryArtColor").css("fill", selectedColorValue);
  $(".js-primaryArtColorStroke").css("fill", selectedColorValue);
});

// Secondary color controls

var toggleColorsSecondary = function() {
  $(".ColorBlocks--secondary").toggleClass("is-hidden");
  if ( $(".ColorBlocks--secondary").hasClass("is-hidden") ) {
    $(".js-secondaryColorToggle").text("Show Colors");
  } else {
      $(".js-secondaryColorToggle").text("Hide Colors");
  }
}

$(".js-secondaryColorToggle").click(function() {
  toggleColorsSecondary();
})

$(".ColorBlocks-block--secondary").click(function() {
  $(".ColorBlocks-block--secondary").removeClass("is-active");

  $(this).toggleClass("is-active");

  var selectedColor = $(this).data("color");
  $(".js-secondaryColorSelected").text(selectedColor);

  var selectedColorValue = $(this).css("background-color");
  $(".js-secondaryArtColor").css("fill", selectedColorValue);
  $(".js-secondaryArtColorStroke").css("fill", selectedColorValue);

  if ( $(window).width() < 480 ) {
    $(".ColorBlocks--primary").addClass("is-hidden");
    $(".js-primaryColorToggle").text("Show Colors");
  }
});

// Text updates

$('#PrimaryText').keyup(function() {
  var primaryText = $(this).val().toUpperCase();
  console.log(primaryText);
  $('.js-primaryText').text(primaryText);
})

$('#SecondaryText').keyup(function() {
  var secondaryText = $(this).val().toUpperCase();
  console.log(secondaryText);
  $('.js-secondaryText').text(secondaryText);
})
