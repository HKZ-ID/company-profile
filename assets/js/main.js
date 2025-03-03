(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        setupStickyNavbar();
        setupScrollSpy();
        setupSmoothScroll();
        setupSidebarToggle();
        setupKeyboardCheck();
        setupVercelAnalytics();

        const swiperContainer = document.querySelector(".mySwiper");

        if (swiperContainer) {
            Object.assign(swiperContainer, {
                slidesPerView: 1,
                pagination: { clickable: true, dynamicBullets: true },
                loop: true,
            });
            swiperContainer.initialize();
        }
    });

    /*=====================================
    Sticky Navbar & Scroll Buttons
    ======================================= */
    function setupStickyNavbar() {
        window.addEventListener("scroll", function () {
            const navbar = document.querySelector(".navbar-area");
            const scrollTopButton = document.querySelector(".scroll-top");
            const contactUsButton = document.querySelector(".contact-us");

            if (!navbar || !scrollTopButton || !contactUsButton) return;

            navbar.classList.toggle("sticky", window.scrollY > navbar.offsetTop);
            const showButtons = window.scrollY > 50;
            scrollTopButton.classList.toggle("visible", showButtons);
            contactUsButton.classList.toggle("visible", showButtons);
        });
    }

    /*=====================================
    Scroll Spy (Active Section Highlight)
    ======================================= */
    function setupScrollSpy() {
        function onScroll() {
            const sections = document.querySelectorAll(".page-scroll");
            const scrollPos = window.scrollY + 73;

            sections.forEach((link) => {
                const target = document.querySelector(link.getAttribute("href"));
                if (!target) return;

                const inView = target.offsetTop <= scrollPos && target.offsetTop + target.offsetHeight > scrollPos;
                link.classList.toggle("active", inView);
            });
        }

        document.addEventListener("scroll", onScroll);
    }

    /*=====================================
    Smooth Scroll for Anchor Links
    ======================================= */
    function setupSmoothScroll() {
        document.querySelectorAll(".page-scroll").forEach((link) => {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                const target = document.querySelector(this.getAttribute("href"));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 60,
                        behavior: "smooth",
                    });
                }
            });
        });
    }

    /*=====================================
    Sidebar Toggle
    ======================================= */
    function setupSidebarToggle() {
        const sidebar = document.querySelector(".sidebar-left");
        const overlay = document.querySelector(".overlay-left");
        const closeBtn = document.querySelector(".sidebar-close .close");
        const menuBar = document.querySelector(".navbar-nine .menu-bar");

        if (!sidebar || !overlay || !closeBtn || !menuBar) return;

        menuBar.addEventListener("click", function () {
            sidebar.classList.add("open");
            overlay.classList.add("open");
        });

        closeBtn.addEventListener("click", closeSidebar);
        overlay.addEventListener("click", closeSidebar);

        function closeSidebar() {
            sidebar.classList.remove("open");
            overlay.classList.remove("open");
        }
    }

    /*=====================================
    Hide Buttons When Keyboard is Open (Mobile)
    ======================================= */
    function setupKeyboardCheck() {
        const scrollTopButton = document.querySelector(".scroll-top");
        const contactUsButton = document.querySelector(".contact-us");

        if (!scrollTopButton || !contactUsButton) return;

        function checkKeyboard() {
            const isKeyboardOpen = window.innerHeight < 500;
            scrollTopButton.classList.toggle("hidden", isKeyboardOpen);
            contactUsButton.classList.toggle("hidden", isKeyboardOpen);
        }

        window.addEventListener("resize", checkKeyboard);
        checkKeyboard();
    }

    /*=====================================
    Vercel Analytics
    ======================================= */
    function setupVercelAnalytics() {
        window.va = window.va || function () {
            (window.vaq = window.vaq || []).push(arguments);
        };
    }
})();