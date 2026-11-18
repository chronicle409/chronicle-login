
(() => {
  const intro = document.getElementById("chronicle-intro");
  const scenes = document.getElementById("intro-scenes");
  const logo = document.getElementById("intro-logo");

  function finishIntro() {
    window.dispatchEvent(new Event("chronicle:intro-finished"));
  }

  if (!intro || !scenes || !logo) {
    finishIntro();
    return;
  }

  if (sessionStorage.getItem("chronicleIntroPlayed")) {
    intro.remove();
    finishIntro();
    return;
  }

  const drawings = [
    {
      caption: "Explore the world",
      svg: `<circle cx="150" cy="135" r="83" fill="#A88AE8" stroke="#292044" stroke-width="7"/>
      <path d="M105 75 Q130 55 145 82 L135 108 115 116 108 145 87 125 80 96Z" fill="#E9DDFB" stroke="#292044" stroke-width="5"/>
      <path d="M160 60 L195 78 188 103 165 112 172 140 150 160 139 125 151 99Z" fill="#E9DDFB" stroke="#292044" stroke-width="5"/>
      <path d="M95 170 L125 155 151 173 142 202 111 207Z" fill="#E9DDFB" stroke="#292044" stroke-width="5"/>
      <path d="M185 160 L210 145 225 170 205 195 180 188Z" fill="#E9DDFB" stroke="#292044" stroke-width="5"/>`
    },
    {
      caption: "Listen to every sound",
      svg: `<rect x="116" y="45" width="68" height="115" rx="34" fill="#A88AE8" stroke="#292044" stroke-width="7"/>
      <path d="M101 120 V137 A49 49 0 0 0 199 137 V120" fill="none" stroke="#292044" stroke-width="7" stroke-linecap="round"/>
      <path d="M150 186 V218 M120 220 H180" fill="none" stroke="#292044" stroke-width="7" stroke-linecap="round"/>
      <path d="M136 78 V125 M150 68 V135 M164 78 V125" stroke="#E9DDFB" stroke-width="7" stroke-linecap="round"/>`
    },
    {
      caption: "Create on your laptop",
      svg: `<rect x="49" y="57" width="202" height="133" rx="13" fill="#A88AE8" stroke="#292044" stroke-width="7"/>
      <rect x="64" y="72" width="172" height="102" rx="5" fill="#E9DDFB"/>
      <path d="M25 199 H275 L252 220 H48Z" fill="#A88AE8" stroke="#292044" stroke-width="7" stroke-linejoin="round"/>
      <circle cx="150" cy="123" r="24" fill="#A88AE8" stroke="#292044" stroke-width="5"/>
      <path d="M141 110 L165 123 141 137Z" fill="#292044"/>`
    },
    {
      caption: "Bring your ideas to life",
      svg: `<path d="M82 48 H194 L222 76 V213 H82Z" fill="#E9DDFB" stroke="#292044" stroke-width="7" stroke-linejoin="round"/>
      <path d="M194 48 V77 H222" fill="#A88AE8" stroke="#292044" stroke-width="6"/>
      <path d="M108 111 H190 M108 135 H190 M108 159 H170" stroke="#A88AE8" stroke-width="7" stroke-linecap="round"/>
      <path d="M185 190 L226 126 Q233 116 243 124 Q251 131 244 141 L203 205 181 215Z" fill="#A88AE8" stroke="#292044" stroke-width="6" stroke-linejoin="round"/>`
    },
    {
      caption: "Discover new possibilities",
      svg: `<path d="M150 45 C104 45 83 79 91 119 C96 145 119 157 123 178 H177 C181 157 204 145 209 119 C217 79 196 45 150 45Z" fill="#E9DDFB" stroke="#292044" stroke-width="7"/>
      <path d="M125 181 H175 M128 196 H172 M137 211 H163" stroke="#292044" stroke-width="7" stroke-linecap="round"/>
      <path d="M150 12 V27 M65 47 L78 60 M235 47 L222 60 M53 120 H70 M230 120 H247" stroke="#A88AE8" stroke-width="8" stroke-linecap="round"/>
      <path d="M150 76 V119 M132 98 L150 119 168 98" fill="none" stroke="#A88AE8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`
    }
  ];

  function makeScene(item) {
    const scene = document.createElement("div");
    scene.className = "intro-scene";
    scene.innerHTML = `
      <svg viewBox="0 0 300 260" role="img" aria-label="${item.caption}">
        ${item.svg}
      </svg>
      <div class="intro-caption">${item.caption}</div>`;
    scenes.appendChild(scene);
    return scene;
  }

  const allScenes = drawings.map(makeScene);
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function play() {
    document.documentElement.classList.add("chronicle-intro-active");

    for (const scene of allScenes) {
      scene.classList.add("active");
      await wait(1900);
      scene.classList.remove("active");
      scene.classList.add("exit");
      await wait(650);
    }

    const video = document.createElement("video");
    video.src = "/chronicle-logo.mp4";
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;
    video.controls = false;
    video.preload = "auto";

    Object.assign(video.style, {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      background: "#c9b5f5"
    });

    logo.appendChild(video);
    logo.style.opacity = "1";

    const videoFinished = new Promise(resolve => {
      video.addEventListener("ended", resolve, { once: true });
      video.addEventListener("error", resolve, { once: true });
    });

    try {
      await video.play();
      await videoFinished;
    } catch (error) {
      await wait(3000);
    }

    intro.style.transition = "opacity .7s ease";
    intro.style.opacity = "0";
    await wait(750);

    intro.remove();
    document.documentElement.classList.remove("chronicle-intro-active");

    sessionStorage.setItem("chronicleIntroPlayed", "yes");
    finishIntro();
  }

  play();
})();
