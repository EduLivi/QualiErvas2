const STORE = {
  name: "Qualiervas Produtos Naturais",
  phoneDisplay: "(69) 3221-6870",
  phoneIntl: "556932216870",
  email: "substituir@seudominio.com", // <-- SUBSTITUA PELO E-MAIL REAL
  address:
    "R. Afonso Pena, 1101 - Nossa Sra. das Graças, Porto Velho - RO, 76804-118, Brasil",
  placeId: "ChIJEV2hH8RcMpIRqeoNkN52cn4",
  mapsPlaceUrl:
    "https://www.google.com/maps/search/?api=1&query=Qualiervas+Produtos+Naturais&query_place_id=ChIJEV2hH8RcMpIRqeoNkN52cn4",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJEV2hH8RcMpIRqeoNkN52cn4&destination=Qualiervas+Produtos+Naturais",
  googleRating: "4.8",
  googleReviews: "733"
};

/* =========================================================
   MENU MOBILE
========================================================= */
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.classList.remove("open"));
  });
}

/* =========================================================
   ANO ATUAL NO RODAPÉ
========================================================= */
const currentYear = document.getElementById("currentYear");
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* =========================================================
   ANIMAÇÃO DE ENTRADA DOS ELEMENTOS
========================================================= */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

/* =========================================================
   FORMULÁRIO DE CONTATO
   Envia a mensagem para o WhatsApp com texto pré-preenchido.
   Se quiser integrar com backend depois, é só trocar esta lógica.
========================================================= */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !phone || !message) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const text = `Olá, meu nome é ${name}.
Telefone: ${phone}
Mensagem: ${message}`;

    const whatsappUrl = `https://wa.me/${STORE.phoneIntl}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    contactForm.reset();
  });
}

/* =========================================================
   MAPA DO GOOGLE MAPS
   Exibe a localização usando a API do Google Maps.
   Observação:
   - Você precisa substituir SUA_CHAVE_GOOGLE_MAPS_API no HTML.
========================================================= */
function showMapFallback() {
  const map = document.getElementById("map");
  const fallback = document.getElementById("mapFallback");

  if (map) {
    map.style.display = "none";
  }

  if (fallback) {
    fallback.classList.remove("hidden");
  }
}

window.renderMapFallback = showMapFallback;

window.initMap = function initMap() {
  const mapElement = document.getElementById("map");
  if (!mapElement || !window.google || !window.google.maps) {
    showMapFallback();
    return;
  }

  const defaultCenter = { lat: -8.76194, lng: -63.90389 }; // Centro aproximado de Porto Velho como fallback

  const map = new google.maps.Map(mapElement, {
    center: defaultCenter,
    zoom: 15,
    styles: [
      {
        featureType: "poi.business",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "transit",
        stylers: [{ visibility: "off" }]
      }
    ],
    mapTypeControl: false,
    streetViewControl: true,
    fullscreenControl: true
  });

  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ address: STORE.address }, (results, status) => {
    if (status === "OK" && results[0]) {
      const position = results[0].geometry.location;

      map.setCenter(position);

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="max-width:240px;padding:4px 2px;font-family:Inter,Arial,sans-serif;">
            <h3 style="margin:0 0 6px;font-size:16px;color:#204b2b;">${STORE.name}</h3>
            <p style="margin:0 0 8px;color:#4b5b51;font-size:13px;">${STORE.address}</p>
            <a
              href="${STORE.directionsUrl}"
              target="_blank"
              rel="noopener noreferrer"
              style="display:inline-block;padding:8px 12px;border-radius:999px;background:#2f6b3f;color:#fff;text-decoration:none;font-size:13px;font-weight:700;"
            >
              Como chegar
            </a>
          </div>
        `
      });

      const marker = new google.maps.Marker({
        map,
        position,
        title: STORE.name,
        animation: google.maps.Animation.DROP
      });

      marker.addListener("click", () => infoWindow.open(map, marker));
    } else {
      showMapFallback();
    }
  });
};

/* =========================================================
   SE A API NÃO CARREGAR EM ALGUNS SEGUNDOS, EXIBE FALLBACK
========================================================= */
setTimeout(() => {
  if (!window.google || !window.google.maps) {
    showMapFallback();
  }
}, 4000);