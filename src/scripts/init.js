import $ from "jquery";
import jQueryBridget from "jquery-bridget";
import Isotope from "isotope-layout";
import "magnific-popup";

jQueryBridget("isotope", Isotope, $);

$(() => {
  myLoad();
  modal();
  modalNews();
  modalPortfolio();
  popup();
  backgroundEffect();
  menuTrigger();
  sectionTop();
  canvasEffect();
  pageTransition();
  borders();
  projects();
  portfolio();
  dateCounter();
});

function dateCounter() {
  const $exp = $("#exp");
  const $age = $("#age");

  const now = new Date();

  const birth = new Date("2001-12-17");
  $age.text(1 + Math.floor((now - birth) / (365.25 * 24 * 60 * 60 * 1000)));

  const exp = new Date("2021-12-01");
  $exp.text(1 + Math.floor((now - exp) / (365.25 * 24 * 60 * 60 * 1000)) + "+");
}

function preloader() {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const preloader = document.querySelector("#preloader");

  if (!isMobile) {
    setTimeout(() => {
      preloader.classList.add("preloaded");
    }, 800);

    setTimeout(() => {
      preloader.remove();
    }, 2000);
  } else {
    preloader.remove();
  }
}

function myLoad() {
  const speed = 500;

  setTimeout(() => {
    preloader();
  }, speed);

  setTimeout(() => {
    $(".main").addClass("ready");
  }, speed + 2000);
}

function modal() {
  $(".main").prepend(`
        <div class="modal">
            <div class="modal-content">
                <div class="close"><a href="#"><i class="fa fa-times"></i></a></div>
                <div class="description-wrap"></div>
            </div>
        </div>
    `);
}

function modalNews() {
  const modalBox = $(".modal");
  const button = $(
    ".news .full-link, .news .news-list .title a, .news .button a"
  );
  const closePopup = modalBox.find(".close");

  button.on("click", function () {
    const element = $(this);
    const parent = element.closest("li");
    const content = parent.find(".news-hidden-details").html();
    const meta = parent.find(".meta").html();
    const title = parent.find(".title a").text();
    const date = parent.find(".date").text();

    modalBox.addClass("opened");
    modalBox.find(".description-wrap").html(content);
    modalBox
      .find(".news-popup-information")
      .prepend('<div class="image"><img src="/images/1.jpg" alt="" /></div>');
    modalBox
      .find(".news-popup-information .image")
      .append('<span class="date">' + date + "</span>");
    modalBox
      .find(".news-popup-information .image")
      .after(
        '<div class="details-news"><div class="meta">' +
          meta +
          '</div><div class="title"><h3>' +
          title +
          "</h3></div></div>"
      );

    dataImages();

    return false;
  });

  closePopup.on("click", function () {
    modalBox.removeClass("opened");
    modalBox.find(".description-wrap").html("");
    return false;
  });
}
function modalPortfolio() {
  const modalBox = $(".modal");
  const button = $(".portfolio .portfolio-popup");

  button.on("click", function () {
    const element = $(this);
    const parent = element.closest(".inner");
    const image = parent.find(".abs-image").data("img-url");
    const details = parent.find(".hidden-content-portfolio").html();
    const title = parent.find(".entry").data("title");
    const category = parent.find(".entry").data("category");

    modalBox.addClass("opened");
    modalBox.find(".description-wrap").html(details);
    modalBox
      .find(".popup-details")
      .prepend(
        '<div class="top-image"><img src="/images/1.jpg" alt="" /><div class="main" data-img-url="' +
          image +
          '"></div></div>'
      );
    modalBox
      .find(".popup-details .top-image")
      .after(
        '<div class="portfolio-main-title"><h3 class="title">' +
          title +
          '</h3><span class="category"><a href="#">' +
          category +
          "</a></span></div>"
      );

    dataImages();
    return false;
  });
}

function dataImages() {
  const data = $("*[data-img-url]");
  data.each(function () {
    const element = $(this);
    const url = element.data("img-url");
    element.css({ backgroundImage: "url(" + url + ")" });
  });
}

function popup() {
  $(".gallery-zoom").each(function () {
    $(this).magnificPopup({
      delegate: "a.zoom",
      type: "image",
      gallery: { enabled: true },
      removalDelay: 300,
      mainClass: "mfp-fade",
    });
  });

  $(".popup-youtube, .popup-vimeo").each(function () {
    $(this).magnificPopup({
      disableOn: 100,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: true,
    });
  });

  $(".soundcloud-link").magnificPopup({
    type: "image",
    gallery: { enabled: true },
  });
}

function backgroundEffect() {
  const box = $(".background-effects");
  const wrapper = $(".background-effects").data("style");

  if (wrapper === "canvas") {
    box.append('<div class="canvas-effects"></div>');
  }

  if (wrapper === "lines") {
    box.append(
      '<div class="lines"><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div></div>'
    );
  }

  if (wrapper === "circles") {
    box.append(
      '<div class="circles_wrapper"><ul class="circles"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul></div>'
    );
  }

  if (wrapper === "noise") {
    box.append('<div class="noise"></div>');
  }
}

function menuTrigger() {
  const hamburger = $(".topbar .trigger .hamburger");

  const mobileMenu = $(".mobile-menu");
  const mobileMenuList = $(".mobile-menu ul li a");

  hamburger.on("click", function () {
    const element = $(this);

    if (element.hasClass("is-active")) {
      element.removeClass("is-active");
      mobileMenu.removeClass("opened");
    } else {
      element.addClass("is-active");
      mobileMenu.addClass("opened");
    }

    return false;
  });

  mobileMenuList.on("click", function () {
    $(".topbar .trigger .hamburger").removeClass("is-active");
    mobileMenu.removeClass("opened");
    return false;
  });
}

function sectionTop() {
  const button = $(
    ".sidebar-menu .menu ul li a,.mobile-menu .mobile-list ul li a"
  );

  const section = $(".section");

  button.on("click", function () {
    section.animate({ scrollTop: 0 }, "slow");
    return false;
  });
}

function canvasEffect() {
  if ($(".canvas-effects").length) {
    const maxx = document.body.clientWidth;
    const maxy = document.body.clientHeight;
    const halfx = maxx / 2;
    const halfy = maxy / 2;
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.width = maxx;
    canvas.height = maxy;
    const context = canvas.getContext("2d");
    const dotCount = 200;
    const dots = [];
    for (let i = 0; i < dotCount; i++) {
      dots.push(new dot());
    }
    function render() {
      context.fillStyle = "#eee";
      context.fillRect(0, 0, maxx, maxy);
      for (let i = 0; i < dotCount; i++) {
        dots[i].draw();
        dots[i].move();
      }
      requestAnimationFrame(render);
    }
    function dot() {
      this.rad_x = 2 * Math.random() * halfx + 1;
      this.rad_y = 1.2 * Math.random() * halfy + 1;
      this.alpha = Math.random() * 360 + 1;
      this.speed = Math.random() * 100 < 50 ? 1 : -1;
      this.speed *= 0.1;
      this.size = Math.random() * 5 + 1;
      this.color = Math.floor(Math.random() * 256);
    }
    dot.prototype.draw = function () {
      const dx = halfx + this.rad_x * Math.cos((this.alpha / 180) * Math.PI);
      const dy = halfy + this.rad_y * Math.sin((this.alpha / 180) * Math.PI);
      context.fillStyle = "#999";
      context.fillRect(dx, dy, this.size, this.size);
    };
    dot.prototype.move = function () {
      this.alpha += this.speed;
      if (Math.random() * 100 < 50) {
        this.color += 1;
      } else {
        this.color -= 1;
      }
    };
    render();
  }
}

function pageTransition() {
  const section = $(".section");
  const allLi = $(".transition-link li");
  const button = $(".transition-link a");
  const wrapper = $(".main");
  const enter = wrapper.data("enter");
  const exit = wrapper.data("exit");

  button.on("click", function () {
    const element = $(this);
    const href = element.attr("href");

    if (element.parent().hasClass("button")) {
      $('.menu .transition-link a[href="' + href + '"]').trigger("click");
      return false;
    }

    const sectionID = $(href);
    const parent = element.closest("li");

    if (!parent.hasClass("active")) {
      allLi.removeClass("active");

      wrapper.find(section).removeClass("animated " + enter);

      if (wrapper.hasClass("opened")) {
        wrapper.find(section).addClass("animated " + exit);
      }

      parent.addClass("active");
      wrapper.addClass("opened");

      wrapper
        .find(sectionID)
        .removeClass("animated " + exit)
        .addClass("animated " + enter);

      $(section).addClass("hidden");
      $(sectionID).removeClass("hidden").addClass("active");
    }

    return false;
  });
}

function borders() {
  $(".container").append(
    '<span class="left-border"></span><span class="right-border"></span><span class="top-border"></span><span class="bottom-border"></span>'
  );
}

function projects() {
  $(".portfolio-animation-wrap").each(function () {
    $(this)
      .on("mouseenter", function () {
        if ($(this).data("title")) {
          $(".portfolio-titles").html(
            $(this).data("title") +
              '<span class="work__cat">' +
              $(this).data("category") +
              "</span>"
          );
          $(".portfolio-titles").addClass("visible");
        }
        $(document).on("mousemove", function (e) {
          $(".portfolio-titles").css({
            left: e.clientX - 10,
            top: e.clientY + 25,
          });
        });
      })
      .on("mouseleave", function () {
        $(".portfolio-titles").removeClass("visible");
      });
  });
}

function portfolio() {
  const list = $(".portfolio .portfolio-item");
  const filter = $(".portfolio .portfolio-filter ul");

  if (filter.length) {
    filter.find("a").on("click", function () {
      const selector = $(this).attr("data-filter");

      list.isotope({
        filter: selector,
        animationOptions: { duration: 750, easing: "linear", queue: false },
      });

      return false;
    });

    filter.find("a").on("click", function () {
      filter.find("a").removeClass("current");
      $(this).addClass("current");
      return false;
    });
  }
}
