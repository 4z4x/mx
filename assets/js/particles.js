```javascript
/* =========================================================
   MOHAMMED PORTFOLIO
   particles.js
   Lightweight animated background particles
   ========================================================= */

(() => {
    "use strict";

    const canvas = document.getElementById("particles-canvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let particles = [];
    let animationFrame = null;
    let resizeTimer = null;

    const settings = {
        desktopCount: 55,
        mobileCount: 28,
        connectionDistance: 125,
        speed: reducedMotion ? 0 : 0.22,
        minSize: 0.7,
        maxSize: 1.6
    };

    const random = (min, max) => {
        return Math.random() * (max - min) + min;
    };

    const resizeCanvas = () => {
        const devicePixelRatio = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = Math.floor(width * devicePixelRatio);
        canvas.height = Math.floor(height * devicePixelRatio);

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(
            devicePixelRatio,
            0,
            0,
            devicePixelRatio,
            0,
            0
        );
    };

    const createParticle = () => {
        return {
            x: random(0, width),
            y: random(0, height),

            vx: random(
                -settings.speed,
                settings.speed
            ),

            vy: random(
                -settings.speed,
                settings.speed
            ),

            size: random(
                settings.minSize,
                settings.maxSize
            ),

            opacity: random(0.12, 0.5)
        };
    };

    const createParticles = () => {
        const isMobile = window.innerWidth <= 768;

        const count = isMobile
            ? settings.mobileCount
            : settings.desktopCount;

        particles = [];

        for (let i = 0; i < count; i++) {
            particles.push(createParticle());
        }
    };

    const updateParticles = () => {
        if (reducedMotion) return;

        particles.forEach((particle) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < -10) {
                particle.x = width + 10;
            }

            if (particle.x > width + 10) {
                particle.x = -10;
            }

            if (particle.y < -10) {
                particle.y = height + 10;
            }

            if (particle.y > height + 10) {
                particle.y = -10;
            }
        });
    };

    const drawConnections = () => {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {

                const first = particles[i];
                const second = particles[j];

                const dx = first.x - second.x;
                const dy = first.y - second.y;

                const distance = Math.sqrt(
                    dx * dx + dy * dy
                );

                if (
                    distance >
                    settings.connectionDistance
                ) {
                    continue;
                }

                const opacity =
                    (1 - distance / settings.connectionDistance) *
                    0.09;

                ctx.beginPath();

                ctx.moveTo(
                    first.x,
                    first.y
                );

                ctx.lineTo(
                    second.x,
                    second.y
                );

                ctx.strokeStyle =
                    `rgba(255, 255, 255, ${opacity})`;

                ctx.lineWidth = 1;

                ctx.stroke();
            }
        }
    };

    const drawParticles = () => {
        particles.forEach((particle) => {
            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(255, 255, 255, ${particle.opacity})`;

            ctx.fill();
        });
    };

    const render = () => {
        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        updateParticles();
        drawConnections();
        drawParticles();

        animationFrame =
            window.requestAnimationFrame(render);
    };

    const initialize = () => {
        resizeCanvas();
        createParticles();

        if (animationFrame !== null) {
            window.cancelAnimationFrame(
                animationFrame
            );
        }

        render();
    };

    window.addEventListener(
        "resize",
        () => {
            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {
                initialize();
            }, 150);
        },
        { passive: true }
    );

    initialize();
})();
```
