// Initialize validation and set options
jQuery.validator.setDefaults({
  errorClass: "FieldGroup-message FieldGroup-message--error",
  highlight: function(element) {
    $(element).closest(".FieldGroup").addClass("is-notValid");
  },
  unhighlight: function(element) {
    $(element).closest(".FieldGroup").removeClass("is-notValid");
  },
  errorElement: "div",
  errorPlacement: function(error, element) {
    error.appendTo( element.closest(".FieldGroup"));
  }
});

var donationForm = $("#donationForm");
var submitButton = $(".js-donateButton");

donationForm.validate( {
  // Modify default keyup rule:
  // For "Other" amount, validate immediately (rather than after submit)
  onkeyup: function (element, event) {
    if (event.which === 9 && this.elementValue(element) === "") {
      return;
    } else if ($(element).attr('name') == 'contributionAmountOther') {
      this.element(element);
    } else if ( element.name in this.submitted || element === this.lastElement ) {
        this.element(element);
    }
  },
  rules: {
    "contributionAmountOther": {
      required: {
        depends: function(element) {
          return $(".js-donationRadioOther").is(":checked");
        }
      },
      digits: true,
      range: [1, 10000],
    },
  },

  // Define custom error messages
  messages: {
    "terms_and_conditions": {
      required: "You must agree to the terms before proceeding."
    },
    "donorFirstName": {
      required: "First name is required."
    },
    "donorLastName": {
      required: "Last name is required."
    },
    "donorEmail": {
      required: "Email is required."
    },
    "contributionAmount": {
      required: "Please select a donation amount."
    },
    "contributionAmountOther": {
      required: "Please enter a donation amount.",
      digits: "Please enter a number.",
      range: "Please enter an amount less than $10,000."
    }
  }
});

var formSubmitted = false;

submitButton.on("click", function(e) {
  e.preventDefault();
  if ( donationForm.valid() ) {
    submitButton.prop("disabled", true);
    $(".js-donateButtonText").addClass("u-hidden");
    $(".js-donateSubmit").removeClass("u-hidden");
    donationForm.submit();
  } else {
    submitButton.prop("disabled", true);
    formSubmitted = true;
  }
})

$("input").on("blur keyup change", function() {
  // Once form is submitted and returns invalid:
  // Enable/disable submit button based on form's validity
  if ( formSubmitted && donationForm.valid() ) {
    submitButton.prop("disabled", false);
  } else if (formSubmitted && !donationForm.valid()) {
    submitButton.prop("disabled", true);
  }
})

// Toggle visibility of "Other" input field
$('.js-donationRadio').click(function() {
  if ($('.js-donationRadioOther').is(':checked')) {
    $('.js-donationOtherAmount').addClass("is-open");
  } else {
    $('.js-donationOtherAmount').removeClass("is-open");
  }
});

// Update donation button with selected/other donation amount
$(".js-donationRadio").on("change", function() {
  var donationAmount = $(".js-donationRadio:checked").val();

  if (donationAmount != "Other") {
    $(".js-donationAmount").text("$" + donationAmount);

  } else if (donationAmount == "Other") {

    var otherAmountInput = $(".js-donationOtherAmount input");
    var otherAmount = otherAmountInput.val();

    otherAmountInput.focus();

    function amountIsValid(amount) {
      var isValid = false;
      if ( $.isNumeric(amount) && parseInt(amount) <= 10000 ) {
        isValid = true;
      }
      return isValid;
    }

    function populateDonateButton(amount) {
      if ( amountIsValid(amount) ) {
        $(".js-donationAmount").text("$" + amount);
      } else {
        $(".js-donationAmount").text("");
      }
    }

    populateDonateButton(otherAmount);

    otherAmountInput.on("keyup", function() {
      var otherAmount = $(this).val();
      populateDonateButton(otherAmount);
    })
  }
})
