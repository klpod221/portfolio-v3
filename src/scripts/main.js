// load scss
import "../styles/main.scss";

// load js
import "./init";

import $ from "jquery";

$(() => {
  const emailValidate = (email) => {
    const emailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailReg.test(email);
  };

  const phoneValidate = (phone) => {
    const phoneReg =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    return phoneReg.test(phone);
  };

  let validated = ["name", "email", "phone", "subject", "message", "captcha"];

  const validateSuccess = (item) => {
    validated = validated.filter((i) => i !== item);
  };

  const validateError = (item) => {
    if (!validated.includes(item)) {
      validated.push(item);
    }
  };

  const email = $('input[name="email"]');
  const phone = $('input[name="phone"]');

  email.on("change", function () {
    if (email.val().trim().length > 0) {
      if (!emailValidate(email.val())) {
        email.parent().removeClass("success").addClass("error");
        validateError("email");
      } else {
        email.parent().removeClass("error").addClass("success");
        validateSuccess("email");
      }
    } else {
      email.parent().removeAttr("class");
      validateError("email");
    }
  });

  phone.on("change", function () {
    if (phone.val().trim().length > 0) {
      if (!phoneValidate(phone.val())) {
        phone.parent().removeClass("success").addClass("error");
        validateError("phone");
      } else {
        phone.parent().removeClass("error").addClass("success");
        validateSuccess("phone");
      }
    } else {
      phone.parent().removeAttr("class");
      validateError("phone");
    }
  });

  $("select[name='subject']").on("change", function () {
    const item = $(this);
    const sNull = item.find("option").eq(0).val();

    if (item.val() === sNull) {
      item.parent().removeClass("success").addClass("error");
      validateError("subject");
    } else {
      item.parent().removeClass("error").addClass("success");
      validateSuccess("subject");
    }
  });

  $(".cf-form-control:not([name='email'], [name='phone'])").on(
    "change",
    function () {
      if ($(this).val().trim().length > 0) {
        $(this).parent().removeClass("error").addClass("success");
        validateSuccess($(this).attr("name"));
      } else {
        $(this).parent().removeAttr("class");
        $(this).parent().addClass("error");
        validateError($(this).attr("name"));
      }
    }
  );

  const textCaptcha = $("#txtCaptcha");
  const textCaptchaSpan = $("#txtCaptchaSpan");
  const textInput = $("#txtInput");

  const randomNumber = () => {
    let a = Math.ceil(Math.random() * 9) + "",
      b = Math.ceil(Math.random() * 9) + "",
      c = Math.ceil(Math.random() * 9) + "",
      d = Math.ceil(Math.random() * 9) + "",
      e = Math.ceil(Math.random() * 9) + "",
      code = a + b + c + d + e;
    textCaptcha.val(code);
    textCaptchaSpan.html(code);
  };

  randomNumber();

  const validateCaptcha = () => {
    let str1 = textCaptcha.val();
    let str2 = textInput.val();
    if (str1 == str2) {
      return true;
    } else {
      return false;
    }
  };

  textInput.on("change", function () {
    if (textInput.val().trim().length > 0) {
      if (validateCaptcha()) {
        textInput.parent().removeClass("error").addClass("success");
        validateSuccess("captcha");
      } else {
        textInput.parent().removeClass("success").addClass("error");
        validateError("captcha");
      }
    } else {
      textInput.parent().removeAttr("class");
      validateError("captcha");
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();

    const $this = $("#contact-form");

    const name = $this.find('input[name="name"]').val().trim();
    const email = $this.find('input[name="email"]').val().trim();
    const phone = $this.find('input[name="phone"]').val().trim();
    const subject = $this.find('select[name="subject"]').val().trim();
    const message = $this.find('textarea[name="message"]').val().trim();

    console.log(validated);

    // check validated
    if (validated.length > 0) {
      if (
        name.length === 0 ||
        email.length === 0 ||
        phone.length === 0 ||
        subject.length === 0 ||
        message.length === 0
      ) {
        $this.find("li").addClass("error");
        if ($("#empty-form").css("display") == "none") {
          $("#empty-form").stop().slideDown().delay(3000).slideUp();
        } else {
          return false;
        }
      } else if (validated.includes("email")) {
        if ($("#email-invalid").css("display") == "none") {
          $("#email-invalid").stop().slideDown().delay(3000).slideUp();
        } else {
          return false;
        }
      } else if (validated.includes("phone")) {
        if ($("#phone-invalid").css("display") == "none") {
          $("#phone-invalid").stop().slideDown().delay(3000).slideUp();
        } else {
          return false;
        }
      } else if (validated.includes("subject")) {
        if ($("#subject-invalid").css("display") == "none") {
          $("#subject-invalid").stop().slideDown().delay(3000).slideUp();
        } else {
          return false;
        }
      } else if (validated.includes("captcha")) {
        if ($("#captcha-invalid").css("display") == "none") {
          $("#captcha-invalid").stop().slideDown().delay(3000).slideUp();
        } else {
          return false;
        }
      }

      return false;
    }

    // send email
    if ($("#loading-mail").css("display") == "none") {
      $("#loading-mail").stop().slideDown();
    }

    // disable submit form
    $this.find("button").attr("disabled", true);

    $.ajax({
      type: "POST",
      url: "https://formspree.io/f/mbjnvwbq",
      data: {
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
      },
      dataType: "json",
      success: function () {
        if ($("#success-mail").css("display") == "none") {
          $("#success-mail").stop().slideDown().delay(3000).slideUp();
        }
        $this.find("input, textarea").val("");
        $this.find("li").removeAttr("class");
        randomNumber();
      },
      error: function () {
        if ($("#error-mail").css("display") == "none") {
          $("#error-mail").stop().slideDown().delay(3000).slideUp();
        }
      },
      complete: function () {
        if ($("#loading-mail").css("display") == "block") {
          $("#loading-mail").stop().slideUp();
        }
      },
    });
  };

  $("#contact-form").on("submit", onSubmit);
  $("#send-message").on("click", onSubmit);
});
