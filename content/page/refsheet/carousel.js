(() => {
    const root = document.querySelector("[data-gallery-carousel]");
    if (!root) return;

    const viewport = root.querySelector(".gallery-carousel__viewport");
    const track = root.querySelector(".gallery-carousel__track");
    const dotsRoot = root.querySelector("[data-carousel-dots]");
    const slides = Array.from(root.querySelectorAll(".gallery-carousel__slide"));
    const prevBtn = root.querySelector("[data-carousel-prev]");
    const nextBtn = root.querySelector("[data-carousel-next]");
    const counter = root.querySelector("[data-carousel-counter]");
    const total = slides.length;
    let index = 0;

    if (!viewport || !track || total === 0) return;

    let dots = [];

    const goTo = (nextIndex) => {
        index = Math.max(0, Math.min(total - 1, nextIndex));
        update();
    };

    const update = () => {
        track.style.transform = `translateX(-${viewport.clientWidth * index}px)`;
        slides.forEach((slide, i) => {
            slide.setAttribute("aria-hidden", i === index ? "false" : "true");
        });
        dots.forEach((dot, i) => {
            const active = i === index;
            dot.classList.toggle("is-active", active);
            dot.setAttribute("aria-current", active ? "true" : "false");
        });
        if (counter) counter.textContent = `${index + 1} / ${total}`;
        if (prevBtn) prevBtn.disabled = index === 0;
        if (nextBtn) nextBtn.disabled = index === total - 1;
    };

    dots = slides.map((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "gallery-carousel__dot";
        dot.setAttribute("aria-label", `Show image ${i + 1}`);
        dot.addEventListener("click", () => goTo(i));
        dotsRoot?.appendChild(dot);
        return dot;
    });

    prevBtn?.addEventListener("click", () => goTo(index - 1));
    nextBtn?.addEventListener("click", () => goTo(index + 1));

    root.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(index - 1);
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            goTo(index + 1);
        }
    });

    let touchStartX = 0;
    let touchDeltaX = 0;

    track.addEventListener(
        "touchstart",
        (event) => {
            touchStartX = event.changedTouches[0].clientX;
            touchDeltaX = 0;
        },
        { passive: true }
    );

    track.addEventListener(
        "touchmove",
        (event) => {
            touchDeltaX = event.changedTouches[0].clientX - touchStartX;
        },
        { passive: true }
    );

    track.addEventListener("touchend", () => {
        if (Math.abs(touchDeltaX) < 40) return;
        if (touchDeltaX > 0) goTo(index - 1);
        else goTo(index + 1);
    });

    window.addEventListener("resize", update);
    update();
})();
