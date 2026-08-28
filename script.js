document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
    initRole();
    initNameScramble();
    initCursor();
    initProjectTilt();
    initSmoothScroll();
});


/* SCROLL REVEAL */

function initScrollReveal() {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    }, {
        threshold: 0.1
    });

    document
        .querySelectorAll(".reveal")
        .forEach(el => observer.observe(el));
}


/* CHANGING ROLE */

function initRole() {

    const element = document.querySelector("#role");

    if (!element) return;

    const roles = [
        "Software Developer",
        "Full-Stack Developer",
        "Backend Developer",
        "AI & Data Developer"
    ];

    let role = 0;
    let index = 0;
    let deleting = false;

    function type() {

        const text = roles[role];

        element.textContent =
            text.substring(0, index);

        if (!deleting) {

            index++;

            if (index > text.length) {

                deleting = true;

                setTimeout(type, 1300);

                return;
            }

        } else {

            index--;

            if (index < 0) {

                index = 0;
                deleting = false;

                role =
                    (role + 1) % roles.length;
            }
        }

        setTimeout(
            type,
            deleting ? 45 : 75
        );
    }

    type();
}


/* NAME SCRAMBLE */

function initNameScramble() {

    const element =
        document.querySelector("#name");

    if (!element) return;

    const letters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const original =
        element.innerText;

    let interval = null;

    element.onmouseover = event => {

        let iteration = 0;

        clearInterval(interval);

        interval = setInterval(() => {

            event.target.innerText =
                original
                    .split("")
                    .map((letter, index) => {

                        if (letter === " ") {
                            return " ";
                        }

                        if (index < iteration) {
                            return original[index];
                        }

                        return letters[
                            Math.floor(
                                Math.random() *
                                letters.length
                            )
                        ];

                    })
                    .join("");

            if (iteration >= original.length) {

                clearInterval(interval);

                event.target.innerText =
                    original;
            }

            iteration += 1 / 3;

        }, 30);
    };
}


/* CURSOR GLOW */

function initCursor() {

    const glow =
        document.querySelector(".cursor-glow");

    if (!glow) return;

    document.addEventListener(
        "mousemove",
        event => {

            glow.style.left =
                `${event.clientX}px`;

            glow.style.top =
                `${event.clientY}px`;

            glow.style.opacity = "1";
        }
    );
}


/* PROJECT TILT */

function initProjectTilt() {

    document
        .querySelectorAll(".project-card")
        .forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        (event.clientX -
                            rect.left) /
                        rect.width -
                        0.5;

                    const y =
                        (event.clientY -
                            rect.top) /
                        rect.height -
                        0.5;

                    card.style.transform =
                        `perspective(1000px)
                         rotateX(${y * -2}deg)
                         rotateY(${x * 2}deg)
                         translateY(-4px)`;
                }
            );

            card.addEventListener(
                "mouseleave",
                () => {
                    card.style.transform = "";
                }
            );
        });
}


/* SMOOTH SCROLL */

function initSmoothScroll() {

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function (e) {

                    e.preventDefault();

                    document
                        .querySelector(
                            this.getAttribute("href")
                        )
                        .scrollIntoView({
                            behavior: "smooth"
                        });
                }
            );
        });
}