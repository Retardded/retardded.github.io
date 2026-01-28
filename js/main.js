(function () {
  "use strict";

  const initImageSliders = () => {
    const sliders = document.querySelectorAll(".project-slider");

    sliders.forEach((slider) => {
      const images = slider.querySelectorAll(".project-image");
      const prevBtn = slider.querySelector(".slider-btn.prev");
      const nextBtn = slider.querySelector(".slider-btn.next");
      const dotsContainer = slider.querySelector(".slider-dots");

      let currentIndex = 0;
      const totalImages = images.length;

      if (totalImages <= 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        return;
      }

      for (let i = 0; i < totalImages; i++) {
        const dot = document.createElement("div");
        dot.classList.add("slider-dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }

      const dots = dotsContainer.querySelectorAll(".slider-dot");

      function updateSlider() {
        images.forEach((img) => {
          img.classList.remove("active");
        });

        setTimeout(() => {
          images[currentIndex].classList.add("active");
        }, 10);

        dots.forEach((dot, index) => {
          dot.classList.toggle("active", index === currentIndex);
        });
      }

      function goToSlide(index) {
        currentIndex = index;
        updateSlider();
      }

      function nextSlide() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateSlider();
      }

      function prevSlide() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateSlider();
      }

      prevBtn.addEventListener("click", prevSlide);
      nextBtn.addEventListener("click", nextSlide);

      slider.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") prevSlide();
        if (e.key === "ArrowRight") nextSlide();
      });

      let touchStartX = 0;
      let touchEndX = 0;

      slider.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });

      slider.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });

      function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
          nextSlide();
        }
        if (touchEndX - touchStartX > swipeThreshold) {
          prevSlide();
        }
      }
    });
  };

  const initSmoothScroll = () => {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = this.getAttribute("href");

        if (target === "#") {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          const element = document.querySelector(target);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      });
    });
  };

  const initScrollAnimations = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(20px)";
      section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(section);
    });
  };

  const initTypingEffect = () => {
    const titles = document.querySelectorAll(".section-title");

    titles.forEach((title, index) => {
      const originalText = title.textContent.replace("_", "");
      title.textContent = "";

      setTimeout(() => {
        let charIndex = 0;
        const typeInterval = setInterval(() => {
          if (charIndex < originalText.length) {
            title.textContent += originalText[charIndex];
            charIndex++;
          } else {
            title.innerHTML +=
              '<span style="animation: blink 1s infinite; color: var(--accent);">_</span>';
            clearInterval(typeInterval);
          }
        }, 50);
      }, index * 200);
    });
  };

  const initLazyLoading = () => {
    const images = document.querySelectorAll(".project-image");

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = "1";
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => {
        img.style.opacity = "0";
        img.style.transition = "opacity 0.5s ease";
        imageObserver.observe(img);
      });
    }
  };

  const initCursorEffect = () => {
    const cursor = document.createElement("div");
    cursor.className = "cursor";
    cursor.style.cssText = `
            width: 10px;
            height: 10px;
            border: 2px solid var(--accent);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
            display: none;
        `;
    document.body.appendChild(cursor);

    if (window.innerWidth > 768) {
      cursor.style.display = "block";

      document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX - 6 + "px";
        cursor.style.top = e.clientY - 6 + "px";
      });

      const links = document.querySelectorAll("a, .skill-item, .project");
      links.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          cursor.style.transform = "scale(2)";
        });
        link.addEventListener("mouseleave", () => {
          cursor.style.transform = "scale(1)";
        });
      });
    }
  };

  // ============================================
  // CONSOLE MESSAGE
  // ============================================

  const showConsoleMessage = () => {
    const styles = [
      "color: #0066ff",
      "font-family: monospace",
      "font-size: 14px",
      "font-weight: bold",
    ].join(";");

    console.log("%c> sup there, reviewer! 👋", styles);
  };

  const init = () => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        initImageSliders();
        initSmoothScroll();
        initScrollAnimations();
        initLazyLoading();
        showConsoleMessage();
      });
    } else {
      initImageSliders();
      initSmoothScroll();
      initScrollAnimations();
      initLazyLoading();
      showConsoleMessage();
    }

    window.addEventListener("load", () => {
      document.body.classList.add("loaded");
    });
  };

  init();
})();
