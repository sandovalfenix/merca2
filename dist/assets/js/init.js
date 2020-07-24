/* eslint-disable no-undef */

$(document).on("ready", function () {

  // initialization of HSMegaMenu component
  $(".js-breadcrumb-menu").HSMegaMenu({
    event: "hover",
    pageContainer: $(".container"),
    breakpoint: 991.98,
    hideTimeOut: 0
  });

  // initialization of popups
  $.HSCore.components.HSModalWindow.init("[data-modal-target]");
  
  // initialization of custom scroll
  $.HSCore.components.HSMalihuScrollBar.init($(".js-custom-scroll"));

  // initialization of sidebar navigation component
  $.HSCore.components.HSSideNav.init(".js-side-nav");

  // initialization of dropdown component
  $.HSCore.components.HSUnfold.init($("[data-unfold-target]"), {
    unfoldHideOnScroll: false,
  });

  // initialization of slick carousel
  $.HSCore.components.HSSlickCarousel.init(".js-slick-carousel");

  // initialization of form validation
  $.HSCore.components.HSValidation.init(".js-validate", {
    rules: {
      confirmPassword: {
        equalTo: "#signupPassword"
      }
    }
  });

  // initialization of forms
  $.HSCore.components.HSFocusState.init();

  // initialization of show animations
  $.HSCore.components.HSShowAnimation.init(".js-animation-link");

  // initialization of step form
  $.HSCore.components.HSStepForm.init(".js-step-form");

  // initialization of show on type module
  $.HSCore.components.HSHeaderSearch.init(".js-header-search");
});