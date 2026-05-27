/* =============================================
   GADU STORE — script.js
   ============================================= */

/* =============================================
   HERO SLIDESHOW
   ============================================= */
(function () {
    const INTERVAL = 6000; // ms entre cambios
    let current = 0;
    let timer;

    function initSlideshow() {
        const slides = document.querySelectorAll('.hero-slideshow .slide');
        const dotsWrap = document.getElementById('hero-indicators');
        if (!slides.length || !dotsWrap) return;

        const total = slides.length;

        // Crear indicadores
        dotsWrap.innerHTML = '';
        slides.forEach((_, i) => {
            const btn = document.createElement('button');
            btn.className = 'hero-dot' + (i === 0 ? ' active' : '');
            btn.setAttribute('aria-label', `Imagen ${i + 1}`);
            btn.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(btn);
        });

        // Activar primera slide
        goTo(0);
        timer = setInterval(() => goTo((current + 1) % total), INTERVAL);
    }

    function goTo(idx) {
        const slides = document.querySelectorAll('.hero-slideshow .slide');
        const dots   = document.querySelectorAll('.hero-dot');
        if (!slides.length) return;

        // Quitar active de todas
        slides.forEach(s => { s.classList.remove('active'); });
        dots.forEach(d => d.classList.remove('active'));

        // Pequeño delay para reiniciar la animación CSS
        void slides[idx].offsetWidth;
        slides[idx].classList.add('active');
        if (dots[idx]) dots[idx].classList.add('active');
        current = idx;
    }

    // Iniciar cuando el sitio es desbloqueado por la verificación de edad
    document.addEventListener('DOMContentLoaded', () => {
        // Si ya está verificado, iniciar de inmediato
        if (sessionStorage.getItem('gaduAge')) {
            initSlideshow();
        }
        // Si no, esperar al click de confirmación
        const yesBtn = document.getElementById('yes-btn');
        if (yesBtn) {
            yesBtn.addEventListener('click', () => {
                setTimeout(initSlideshow, 100);
            }, { once: true });
        }
    });
})();

/* ===== DATOS DE VINOS ===== */
const WINES = [
    { id:  1, name: "Cordero con Piel de Lobo",         type: "Tinto",     price: 170000,  color: "#722F37" },
    { id:  2, name: "Cordero con Piel de Lobo Blanco",  type: "Blanco",    price: 180000,  color: "#8B7020" },
    { id:  3, name: "Donde Manda Capitán",              type: "Tinto",     price: 180000,  color: "#722F37" },
    { id:  4, name: "4 Monos Locos",                    type: "Tinto",     price: 190000,  color: "#6B1A1A" },
    { id:  5, name: "Saint Felicien",                   type: "Blanco",    price: 310000,  color: "#8B7020" },
    { id:  6, name: "Escorihuela Gascón Gran Reserva",  type: "Tinto",     price: 540000,  color: "#4A0E0E" },
    { id:  7, name: "D.V. Catena Cabernet Malbec",      type: "Malbec",    price: 430000,  color: "#4A0E0E" },
    { id:  8, name: "D.V. Catena Malbec Malbec",        type: "Malbec",    price: 540000,  color: "#3D0B0B" },
    { id:  9, name: "Angélica Zapata Malbec",           type: "Malbec",    price: 600000,  color: "#2E0808" },
    { id: 10, name: "Rutini Malbec",                    type: "Malbec",    price: 720000,  color: "#1A0505" },
    { id: 11, name: "El Gran Enemigo Gualtallari",       type: "Malbec",    price: 1600000, color: "#0D0303" },
    { id: 12, name: "Freixenet",                        type: "Espumante", price: 240000,  color: "#5C4A00" },
    { id: 13, name: "Chandon",                          type: "Espumante", price: 550000,  color: "#6B5B2E" },
    { id: 14, name: "Chandon Mini",                     type: "Espumante", price: 565000,  color: "#7A6A3E" },
    { id: 15, name: "Aperol",                           type: "Licor",     price: 310000,  color: "#C25A00" },
    { id: 16, name: "Cordero Espumante",                type: "Espumante", price: 230000,  color: "#8B7355" },
    { id: 17, name: "Santa Julia Dulce",                type: "Dulce",     price: 250000,  color: "#8B3A62" },
    { id: 18, name: "El Gran Capitán Malbec",           type: "Malbec",    price: 300000,  color: "#722F37" },
    { id: 19, name: "Jorge Rubio PV",                   type: "Tinto",     price: 300000,  color: "#5A1F25" },
    { id: 20, name: "Mosquita Muerta",                  type: "Tinto",     price: 300000,  color: "#722F37" },
    { id: 21, name: "Oveja Black Malbec y Red Blend",   type: "Malbec",    price: 160000,  color: "#1A1A1A" },
    { id: 22, name: "Luigi Bosca Malbec",               type: "Malbec",    price: 370000,  color: "#722F37" },
    { id: 23, name: "Federico de Alvear Espumante",     type: "Espumante", price: 170000,  color: "#6B5B2E" },
];

const BRANDS = [
    "Cordero con Piel de Lobo", "Saint Felicien", "Escorihuela Gascón",
    "D.V. Catena", "Angélica Zapata", "Rutini", "El Gran Enemigo",
    "Freixenet", "Chandon", "Aperol", "Santa Julia", "Mosquita Muerta",
    "Oveja Black", "Luigi Bosca", "Federico de Alvear", "Jorge Rubio",
];

/* ===== ESTADO DEL CARRITO ===== */
let cart = {}; // { id: { wine, qty } }

/* ===== UTILIDADES ===== */
function fmtPrice(n) {
    return n.toLocaleString('es-PY') + ' Gs';
}

function lighten(hex, amt) {
    const n = parseInt(hex.replace('#',''), 16);
    const r = Math.min(255, (n >> 16) + amt);
    const g = Math.min(255, ((n >> 8) & 0xFF) + amt);
    const b = Math.min(255, (n & 0xFF) + amt);
    return '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('');
}

/* =============================================
   VERIFICACIÓN DE EDAD
   ============================================= */
const ageModal   = document.getElementById('age-modal');
const underBlock = document.getElementById('underage-block');
const mainWrap   = document.getElementById('main-content');
const waFloat    = document.getElementById('wa-float');

function revealSite() {
    ageModal.style.display = 'none';
    mainWrap.style.display = 'block';
    waFloat.classList.add('show');
    sessionStorage.setItem('gaduAge', '1');
    initSite();
}

if (sessionStorage.getItem('gaduAge')) {
    revealSite();
}

document.getElementById('yes-btn').addEventListener('click', revealSite);

document.getElementById('no-btn').addEventListener('click', () => {
    ageModal.style.display = 'none';
    underBlock.style.display = 'flex';
});

/* =============================================
   INICIALIZACIÓN
   ============================================= */
function initSite() {
    buildMarquee();
    buildCatalog();
    updateCartUI();
    initNavScroll();
}

/* =============================================
   MARQUEE DE MARCAS
   ============================================= */
function buildMarquee() {
    const inner = document.getElementById('marquee-inner');
    if (!inner) return;
    // Duplicar para loop continuo
    const items = [...BRANDS, ...BRANDS];
    inner.innerHTML = items.map((b, i) =>
        `<span>${b}</span>${i < items.length - 1 ? '<span class="mdot">&#9670;</span>' : ''}`
    ).join('');
}

/* =============================================
   CATÁLOGO
   ============================================= */
function buildCatalog() {
    const track = document.getElementById('catalog-track');
    if (!track) return;

    document.getElementById('wine-count').textContent = WINES.length;

    track.innerHTML = '';
    WINES.forEach(wine => {
        track.appendChild(createCard(wine));
    });

    buildDots();
    updateScrollBtns();
    track.addEventListener('scroll', () => { buildDots(); updateScrollBtns(); });
}

function createCard(wine) {
    const qty = cart[wine.id]?.qty || 0;
    const c   = wine.color;
    const cl  = lighten(c, 28);

    const card = document.createElement('div');
    card.className = 'wine-card';
    card.id = `card-${wine.id}`;

    card.innerHTML = `
        <div class="card-visual" style="background: linear-gradient(150deg, ${c}1A, ${c}33);">
            <div class="card-visual-bg" style="background: radial-gradient(circle at 70% 30%, ${cl}55, transparent 70%);"></div>
            <div class="card-bottle-wrap">
                <div class="cb-cap"   style="background:${c}; opacity:.85;"></div>
                <div class="cb-neck"  style="background: linear-gradient(180deg, ${cl}, ${c});"></div>
                <div class="cb-shoulder" style="background:${c};"></div>
                <div class="cb-body"  style="background: linear-gradient(160deg, ${cl} 0%, ${c} 50%, ${c}CC 100%);">
                    <div class="cb-label"></div>
                    <div class="cb-shine"></div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <span class="card-badge" style="background:${c};">${wine.type}</span>
            <p class="card-name">${wine.name}</p>
            <p class="card-price">${fmtPrice(wine.price)}</p>
            <div class="card-qty-row">
                <button class="cq-btn" onclick="changeQty(${wine.id},-1)">&#8722;</button>
                <span class="cq-num" id="qty-${wine.id}">${qty}</span>
                <button class="cq-btn" onclick="changeQty(${wine.id},1)">+</button>
            </div>
            <button class="card-add-btn ${qty > 0 ? 'added' : ''}"
                    id="btn-${wine.id}"
                    onclick="addToCart(${wine.id})">
                ${qty > 0 ? '&#10003; Agregado' : 'Agregar al pedido'}
            </button>
        </div>
    `;
    return card;
}

/* ===== SCROLL DEL CATÁLOGO ===== */
function scrollCatalog(dir) {
    const track = document.getElementById('catalog-track');
    track.scrollBy({ left: dir * 260 * 3, behavior: 'smooth' });
}

function updateScrollBtns() {
    const track = document.getElementById('catalog-track');
    const prev  = document.getElementById('slide-prev');
    const next  = document.getElementById('slide-next');
    if (!track || !prev || !next) return;
    prev.disabled = track.scrollLeft <= 0;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 5;
}

function buildDots() {
    const track = document.getElementById('catalog-track');
    const dotsEl = document.getElementById('catalog-dots');
    if (!track || !dotsEl) return;
    const total = Math.ceil(WINES.length / 4);
    const current = Math.round((track.scrollLeft / (track.scrollWidth - track.clientWidth)) * (total - 1));
    dotsEl.innerHTML = Array.from({ length: total }, (_, i) =>
        `<div class="catalog-dot ${i === current ? 'active' : ''}" onclick="jumpDot(${i},${total})"></div>`
    ).join('');
}

function jumpDot(i, total) {
    const track = document.getElementById('catalog-track');
    const fraction = total > 1 ? i / (total - 1) : 0;
    track.scrollTo({ left: fraction * (track.scrollWidth - track.clientWidth), behavior: 'smooth' });
}

/* =============================================
   CANTIDAD Y CARRITO
   ============================================= */
function changeQty(id, delta) {
    const current = cart[id]?.qty || 0;
    const next    = Math.max(0, current + delta);
    if (next === 0) {
        delete cart[id];
    } else {
        const wine = WINES.find(w => w.id === id);
        cart[id] = { wine, qty: next };
    }
    refreshCard(id);
    updateCartUI();
}

function addToCart(id) {
    const wine = WINES.find(w => w.id === id);
    if (!cart[id]) {
        cart[id] = { wine, qty: 1 };
    }
    refreshCard(id);
    updateCartUI();

    // Scroll suave hacia el pedido
    document.getElementById('pedido').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function refreshCard(id) {
    const qty    = cart[id]?.qty || 0;
    const qtyEl  = document.getElementById(`qty-${id}`);
    const btnEl  = document.getElementById(`btn-${id}`);
    if (qtyEl) qtyEl.textContent = qty;
    if (btnEl) {
        if (qty > 0) {
            btnEl.textContent = '✓ Agregado';
            btnEl.classList.add('added');
        } else {
            btnEl.innerHTML = 'Agregar al pedido';
            btnEl.classList.remove('added');
        }
    }
}

function removeItem(id) {
    delete cart[id];
    refreshCard(id);
    updateCartUI();
}

function clearCart() {
    Object.keys(cart).forEach(id => {
        delete cart[id];
        refreshCard(parseInt(id));
    });
    updateCartUI();
}

/* =============================================
   UI DEL CARRITO
   ============================================= */
function updateCartUI() {
    const items = Object.values(cart);
    const totalQty = items.reduce((s, i) => s + i.qty, 0);
    const totalGs  = items.reduce((s, i) => s + i.wine.price * i.qty, 0);

    // Pill del nav
    document.getElementById('cart-count').textContent = totalQty;

    const emptyEl  = document.getElementById('cart-empty');
    const filledEl = document.getElementById('cart-filled');

    if (items.length === 0) {
        if (emptyEl)  emptyEl.style.display  = 'block';
        if (filledEl) filledEl.style.display = 'none';
        return;
    }

    if (emptyEl)  emptyEl.style.display  = 'none';
    if (filledEl) filledEl.style.display = 'block';

    const tbody = document.getElementById('cart-tbody');
    tbody.innerHTML = '';

    items.forEach(({ wine, qty }) => {
        const sub = wine.price * qty;
        const tr  = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${wine.name}</strong></td>
            <td>${fmtPrice(wine.price)}</td>
            <td>
                <div class="cart-qty-ctrl">
                    <button class="cqc-btn" onclick="changeQty(${wine.id},-1)">&#8722;</button>
                    <span style="min-width:24px;text-align:center;font-weight:700;">${qty}</span>
                    <button class="cqc-btn" onclick="changeQty(${wine.id},1)">+</button>
                </div>
            </td>
            <td><strong>${fmtPrice(sub)}</strong></td>
            <td>
                <button class="remove-btn" onclick="removeItem(${wine.id})" title="Eliminar">&#10005;</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('cart-total').textContent = fmtPrice(totalGs);
}

function scrollToPedido() {
    document.getElementById('pedido').scrollIntoView({ behavior: 'smooth' });
}

/* =============================================
   ENVIAR POR WHATSAPP
   ============================================= */
function sendWhatsAppOrder() {
    const items = Object.values(cart);
    if (!items.length) return;

    const total = items.reduce((s, i) => s + i.wine.price * i.qty, 0);

    let msg = '🍷 *Pedido — Gadu Store*\n\n';
    items.forEach(({ wine, qty }) => {
        msg += `• ${wine.name} ×${qty} = ${fmtPrice(wine.price * qty)}\n`;
    });
    msg += `\n*Total: ${fmtPrice(total)}*`;
    msg += '\n\n¡Hola! Me gustaría hacer este pedido 🙌';

    window.open(`https://wa.me/595993330038?text=${encodeURIComponent(msg)}`, '_blank');
}

/* =============================================
   NAV: scroll activo + sticky sombra
   ============================================= */
function initNavScroll() {
    const header = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.scrollY > 10
            ? '0 2px 20px rgba(0,0,0,.1)'
            : 'none';
    }, { passive: true });
}

/* =============================================
   MENÚ HAMBURGUESA
   ============================================= */
function toggleMenu() {
    document.getElementById('mobile-menu').classList.toggle('open');
}
