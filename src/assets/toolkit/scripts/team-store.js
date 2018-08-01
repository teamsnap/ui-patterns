// Primary color controls

var toggleColorsPrimary = function() {
  $(".ColorBlocks--primary").toggleClass("is-hidden");
  if ( $(".ColorBlocks--primary").hasClass("is-hidden") ) {
    $(".js-primaryColorToggle").text("Show");
  } else {
      $(".js-primaryColorToggle").text("Hide");
  }
}

$(".js-primaryColorToggle").click(function() {
  toggleColorsPrimary();
})

$(".ColorBlocks-block--primary").click(function() {
  $(".ColorBlocks-block--primary").removeClass("is-active");

  $(this).toggleClass("is-active");

  if ( $(this).parent().hasClass("is-hidden") ) {
    toggleColorsPrimary();
  }

  var selectedColor = $(this).data("color");
  $(".js-primaryColorSelected").text(selectedColor);

  var selectedColorValue = $(this).css("background-color");
  // Fill SVG text
  $(".js-primaryArtColor").css("fill", selectedColorValue);
  $(".js-primaryArtColorStroke").css("fill", selectedColorValue);

  // Fill Review Step Color Block
  $(".js-primaryColor").css("background-color", selectedColorValue);
});

// Secondary color controls

var toggleColorsSecondary = function() {
  $(".ColorBlocks--secondary").toggleClass("is-hidden");
  if ( $(".ColorBlocks--secondary").hasClass("is-hidden") ) {
    $(".js-secondaryColorToggle").text("Show");
  } else {
      $(".js-secondaryColorToggle").text("Hide");
  }
}

$(".js-secondaryColorToggle").click(function() {
  toggleColorsSecondary();
})

$(".ColorBlocks-block--secondary").click(function() {
  $(".ColorBlocks-block--secondary").removeClass("is-active");

  $(this).toggleClass("is-active");

  if ( $(this).parent().hasClass("is-hidden") ) {
    toggleColorsSecondary();
  }

  var selectedColor = $(this).data("color");
  $(".js-secondaryColorSelected").text(selectedColor);

  var selectedColorValue = $(this).css("background-color");
  $(".js-secondaryArtColor").css("fill", selectedColorValue);
  $(".js-secondaryArtColorStroke").css("fill", selectedColorValue);
  $(".js-secondaryColor").css("background-color", selectedColorValue);

  if ( $(window).width() < 480 ) {
    $(".ColorBlocks--primary").addClass("is-hidden");
    $(".js-primaryColorToggle").text("Show");
  }
});

// Live Text updates

$('#PrimaryText').keyup(function() {
  var primaryText = $(this).val().toUpperCase();
  var primaryTextReview = $(this).val();
  $('.js-primaryText').text(primaryText);
  $('.js-primaryTextReview').text(primaryTextReview);
})

$('#SecondaryText').keyup(function() {
  var secondaryText = $(this).val().toUpperCase();
  var secondaryTextReview = $(this).val();
  $('.js-secondaryText').text(secondaryText);
  $('.js-secondaryTextReview').text(secondaryTextReview);
})

// Logo Upload

$(".js-ChooseFile").click(function() {
  $(".js-LogoDemo").removeClass("is-hidden");
  $(".js-LogoUpload").hide();
  $(".js-LayoutToggle").show();
  $(".js-LogoUploaded").show();
  $(".js-LogoNotUploaded").hide();
})

$(".js-RemoveImage").click(function() {
  $(".js-LogoDemo").addClass("is-hidden");
  $(".js-LogoUpload").show();
  $(".js-LayoutToggle").hide();
  $(".js-LogoUploaded").hide();
  $(".js-LogoNotUploaded").show();
})

$(".js-ShowLogo").click(function() {
    $(".js-LogoPreview").show();
    $(".js-TextPreview").hide();
    $(".js-ShowLogo").hide();
    $(".js-ShowText").show();
})

$(".js-ShowText").click(function() {
    $(".js-TextPreview").show();
    $(".js-LogoPreview").hide();
    $(".js-ShowText").hide();
    $(".js-ShowLogo").show();
})


// Show/Hide Review/Edit

$(".js-EditText").click(function() {
  $(".js-SettingsReview").hide();
  $(".js-Text").show();
  $(".js-PageTitle").text("Add Your Team Name");
})

$(".js-EditColor").click(function() {
  $(".js-SettingsReview").hide();
  $(".js-Color").show();
  $(".js-PageTitle").text("Add Your Team Colors");
})

$(".js-EditLogo").click(function() {
  $(".js-SettingsReview").hide();
  $(".js-Logo").show();
  $(".js-PageTitle").text("Add Your Team Logo");
  $(".js-TitleOptional").show();
  $(".js-ApparelPreview").hide();
})

$(".js-EditClose").click(function() {
  $(".js-Color").hide();
  $(".js-Text").hide();
  $(".js-Logo").hide();
  $(".js-SettingsReview").show();
  $(".js-PageTitle").text("Tell Us About Your Team");
  $(".js-TitleOptional").hide();
  $(".js-ApparelPreview").show();
})
