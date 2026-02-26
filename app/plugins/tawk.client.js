// export default defineNuxtPlugin(() => {
//   if (process.client) {
//     if (!document.getElementById("tawk-script")) {
//       window.Tawk_API = window.Tawk_API || {};
//       window.Tawk_LoadStart = new Date();

//       const tawk = document.createElement("script");
//       tawk.id = "tawk-script";
//       tawk.async = true;
//       tawk.src = "https://embed.tawk.to/69233cd6025e0c19618d54d1/1jaoqbb7e";
//       tawk.charset = "UTF-8";
//       tawk.setAttribute("crossorigin", "*");

//       document.body.appendChild(tawk);

//       window.Tawk_API.onLoad = function () {
//         window.Tawk_API.hideGreeting();     // hide text
//          window.Tawk_API.setPosition("bottom-right", {
//           marginBottom: "4000px"   // Increase this to move it higher
//         }); // position
//       };
//     }
//   }
// });


export default defineNuxtPlugin(() => {
  if (process.client) {
    if (!document.getElementById("tawk-script")) {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();

      const tawk = document.createElement("script");
      tawk.id = "tawk-script";
      tawk.async = true;
      tawk.src = "https://embed.tawk.to/69233cd6025e0c19618d54d1/1jaoqbb7e";
      tawk.charset = "UTF-8";
      tawk.setAttribute("crossorigin", "*");

      document.body.appendChild(tawk);

      window.Tawk_API.onLoad = function () {
        // 1️⃣ Only show icon (no greeting text)
        window.Tawk_API.hideGreeting();

        // 2️⃣ Force position (works in all browsers)
        const style = document.createElement("style");
        style.innerHTML = `
          #tawkchat-container,
          iframe[src*="tawk.to"] {
            bottom: 120px !important;
            right: 20px !important;
            transition: transform 0.3s ease, opacity 0.3s ease;
          }

          /* Shrink effect */
          .tawk-shrink iframe {
            transform: scale(0.75);
          }

          /* Hide near footer */
          .tawk-hide iframe {
            opacity: 0;
            pointer-events: none;
          }

          /* Mobile-only position */
          @media (max-width: 768px) {
            #tawkchat-container,
            iframe[src*="tawk.to"] {
              bottom: 80px !important;
              right: 10px !important;
              transform: scale(0.7);
            }
          }
        `;
        document.head.appendChild(style);

        // 3️⃣ Scroll behavior logic
        window.addEventListener("scroll", () => {
          const chat = document.body;
          const footer = document.querySelector("footer");

          // Shrink on scroll
          if (window.scrollY > 200) {
            chat.classList.add("tawk-shrink");
          } else {
            chat.classList.remove("tawk-shrink");
          }

          // Hide near footer
          if (footer) {
            const footerTop = footer.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (footerTop < windowHeight - 100) {
              chat.classList.add("tawk-hide");
            } else {
              chat.classList.remove("tawk-hide");
            }
          }
        });
      };
    }
  }
});
