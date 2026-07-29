```javascript
/* =========================================================
   MOHAMMAD PORTFOLIO
   script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       Elements
       ===================================================== */

    const header = document.querySelector(".header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const backToTop = document.querySelector(".back-to-top");
    const loader = document.querySelector(".page-loader");
    const revealElements = document.querySelectorAll(".reveal");
    const contactForm = document.querySelector(".contact-form");
    const sections = document.querySelectorAll("section[id]");


    /* =====================================================
       Page Loader
       ===================================================== */

    window.addEventListener("load", () => {
        if (!loader) return;

        setTimeout(() => {
            loader.classList.add("hide");

            setTimeout(() => {
                loader.style.display = "none";
            }, 500);

        }, 350);
    });


    /* =====================================================
       Header Scroll Effect
       ===================================================== */

    const updateHeader = () => {
        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };


    /* =====================================================
       Back To Top
       ===================================================== */

    const updateBackToTop = () => {
        if (!backToTop) return;

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    };


    /* =====================================================
       Mobile Menu
       ===================================================== */

    const closeMenu = () => {
        if (!menuToggle || !navMenu) return;

        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    };


    const openMenu = () => {
        if (!menuToggle || !navMenu) return;

        menuToggle.classList.add("active");
        navMenu.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );
    };


    if (menuToggle && navMenu) {

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen =
                navMenu.classList.contains("active");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });


        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                closeMenu();
            });
        });


        document.addEventListener("click", (event) => {
            if (!navMenu.classList.contains("active")) {
                return;
            }

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }
        });

    }


    /* =====================================================
       Close Menu With Escape
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* =====================================================
       Active Navigation
       ===================================================== */

    const updateActiveNavigation = () => {

        if (!sections.length || !navLinks.length) {
            return;
        }

        const scrollPosition =
            window.scrollY + 180;

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {
                currentSection =
                    section.getAttribute("id");
            }

        });


        navLinks.forEach((link) => {

            const href =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });

    };


    /* =====================================================
       Smooth Scroll
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener("click", (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    15;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            });

        });


    /* =====================================================
       Back To Top Button
       ===================================================== */

    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       Reveal Animation
       ===================================================== */

    if (
        "IntersectionObserver" in window &&
        revealElements.length
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "active"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("active");
        });

    }


    /* =====================================================
       Contact Form
       ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );

                if (!submitButton) {
                    return;
                }


                const originalContent =
                    submitButton.innerHTML;


                submitButton.disabled = true;

                submitButton.innerHTML = `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    جاري الإرسال...
                `;


                setTimeout(() => {

                    submitButton.innerHTML = `
                        <i class="fa-solid fa-check"></i>
                        تم إرسال الرسالة
                    `;

                    contactForm.reset();


                    setTimeout(() => {

                        submitButton.disabled =
                            false;

                        submitButton.innerHTML =
                            originalContent;

                    }, 1800);

                }, 900);

            }
        );

    }


    /* =====================================================
       Current Year
       ===================================================== */

    document
        .querySelectorAll("[data-year]")
        .forEach((element) => {

            element.textContent =
                new Date().getFullYear();

        });


    /* =====================================================
       Prevent Empty Placeholder Links
       ===================================================== */

    document
        .querySelectorAll('a[href="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {
                    event.preventDefault();
                }
            );

        });


    /* =====================================================
       Scroll Events
       ===================================================== */

    const handleScroll = () => {
        updateHeader();
        updateBackToTop();
        updateActiveNavigation();
    };


    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );


    /* =====================================================
       Initial State
       ===================================================== */

    updateHeader();
    updateBackToTop();
    updateActiveNavigation();

});
```
