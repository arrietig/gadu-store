/* =============================================
   GADU STORE — script.js  v2
   ============================================= */

/* ===== VINOS ===== */
const WINES = [
    { id:  1, name:"Cordero con Piel de Lobo",         type:"Tinto",     price:170000,  color:"#722F37" },
    { id:  2, name:"Cordero con Piel de Lobo Blanco",  type:"Blanco",    price:180000,  color:"#8B7020" },
    { id:  3, name:"Donde Manda Capitán",              type:"Tinto",     price:180000,  color:"#722F37" },
    { id:  4, name:"4 Monos Locos",                    type:"Tinto",     price:190000,  color:"#6B1A1A" },
    { id:  5, name:"Saint Felicien",                   type:"Blanco",    price:310000,  color:"#8B7020" },
    { id:  6, name:"Escorihuela Gascón Gran Reserva",  type:"Tinto",     price:540000,  color:"#4A0E0E" },
    { id:  7, name:"D.V. Catena Cabernet Malbec",      type:"Malbec",    price:430000,  color:"#4A0E0E" },
    { id:  8, name:"D.V. Catena Malbec Malbec",        type:"Malbec",    price:540000,  color:"#3D0B0B" },
    { id:  9, name:"Angélica Zapata Malbec",           type:"Malbec",    price:600000,  color:"#2E0808" },
    { id: 10, name:"Rutini Malbec",                    type:"Malbec",    price:720000,  color:"#1A0505" },
    { id: 11, name:"El Gran Enemigo Gualtallari",      type:"Malbec",    price:1600000, color:"#0D0303" },
    { id: 12, name:"Freixenet",                        type:"Espumante", price:240000,  color:"#5C4A00" },
    { id: 13, name:"Chandon",                          type:"Espumante", price:550000,  color:"#6B5B2E" },
    { id: 14, name:"Chandon Mini",                     type:"Espumante", price:565000,  color:"#7A6A3E" },
    { id: 15, name:"Aperol",                           type:"Licor",     price:310000,  color:"#C25A00" },
    { id: 16, name:"Cordero Espumante",                type:"Espumante", price:230000,  color:"#8B7355" },
    { id: 17, name:"Santa Julia Dulce",                type:"Dulce",     price:250000,  color:"#8B3A62" },
    { id: 18, name:"El Gran Capitán Malbec",           type:"Malbec",    price:300000,  color:"#722F37" },
    { id: 19, name:"Jorge Rubio PV",                   type:"Tinto",     price:300000,  color:"#5A1F25" },
    { id: 20, name:"Mosquita Muerta",                  type:"Tinto",     price:300000,  color:"#722F37" },
    { id: 21, name:"Oveja Black Malbec y Red Blend",   type:"Malbec",    price:160000,  color:"#1A1A1A" },
    { id: 22, name:"Luigi Bosca Malbec",               type:"Malbec",    price:370000,  color:"#722F37" },
    { id: 23, name:"Federico de Alvear Espumante",     type:"Espumante", price:170000,  color:"#6B5B2E" },
];

const BRANDS = [
    "Cordero con Piel de Lobo","Saint Felicien","Escorihuela Gascón",
    "D.V. Catena","Angélica Zapata","Rutini","El Gran Enemigo",
    "Freixenet","Chandon","Aperol","Santa Julia","Mosquita Muerta",
    "Oveja Black","Luigi Bosca","Federico de Alvear","Jorge Rubio",
];

/* ===== CARRITO ===== */
let cart = {};

function fmtPrice(n) { return n.toLocaleString('es-PY') + ' Gs'; }

function lighten(hex, amt) {
    const n = parseInt(hex.replace('#',''), 16);
    const r = Math.min(255,(n>>16)+amt), g = Math.min(255,((n>>8)&0xFF)+amt), b = Math.min(255,(n&0xFF)+amt);
    return '#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');
}

/* ===== VERIFICACIÓN DE EDAD ===== */
function revealSite() {
    document.getElementById('age-modal').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('wa-float').classList.add('show');
    sessionStorage.setItem('gaduAge','1');
    initSite();
}

if (sessionStorage.getItem('gaduAge')) { revealSite(); }

document.getElementById('yes-btn').addEventListener('click', revealSite);
document.getElementById('no-btn').addEventListener('click', () => {
    document.getElementById('age-modal').style.display = 'none';
    document.getElementById('underage-block').style.display = 'flex';
});

/* ===== INICIALIZACIÓN ===== */
function initSite() {
    buildMarquee();
    buildCatalog();
    updateCartUI();
    initNavScroll();
}

/* ===== MARQUEE ===== */
function buildMarquee() {
    const inner = document.getElementById('marquee-inner');
    if (!inner) return;
    const items = [...BRANDS,...BRANDS];
    inner.innerHTML = items.map((b,i)=>
        `<span>${b}</span>${i<items.length-1?'<span class="mdot">◆</span>':''}`
    ).join('');
}

/* ===== CATÁLOGO ===== */
function buildCatalog() {
    const track = document.getElementById('catalog-track');
    if (!track) return;
    document.getElementById('wine-count').textContent = WINES.length;
    track.innerHTML = '';
    WINES.forEach(wine => track.appendChild(createCard(wine)));
    updateScrollBtns();
    track.addEventListener('scroll', updateScrollBtns);
}

function createCard(wine) {
    const qty = cart[wine.id]?.qty || 0;
    const c = wine.color, cl = lighten(c, 30);
    const card = document.createElement('div');
    card.className = 'wine-card';
    card.id = `card-${wine.id}`;
    card.innerHTML = `
        <div class="card-visual" style="background:linear-gradient(150deg,${c}22,${c}44);">
            <div class="card-bottle-wrap">
                <div class="cb-cap"      style="background:${c};opacity:.8;"></div>
                <div class="cb-neck"     style="background:linear-gradient(180deg,${cl},${c});"></div>
                <div class="cb-shoulder" style="background:${c};"></div>
                <div class="cb-body"     style="background:linear-gradient(160deg,${cl},${c},${c}CC);">
                    <div class="cb-label"></div><div class="cb-shine"></div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <span class="card-badge" style="background:${c};">${wine.type}</span>
            <p class="card-name">${wine.name}</p>
            <p class="card-price">${fmtPrice(wine.price)}</p>
            <div class="card-qty-row">
                <button class="cq-btn" onclick="changeQty(${wine.id},-1)">−</button>
                <span class="cq-num" id="qty-${wine.id}">${qty}</span>
                <button class="cq-btn" onclick="changeQty(${wine.id},1)">+</button>
            </div>
            <button class="card-add-btn ${qty>0?'added':''}" id="btn-${wine.id}" onclick="addToCart(${wine.id})">
                ${qty>0?'✓ Agregado':'AGREGAR AL PEDIDO'}
            </button>
        </div>`;
    return card;
}

function scrollCatalog(dir) {
    document.getElementById('catalog-track').scrollBy({ left:dir*240*3, behavior:'smooth' });
}

function updateScrollBtns() {
    const t = document.getElementById('catalog-track');
    const prev = document.querySelector('.slide-prev');
    const next = document.querySelector('.slide-next');
    if (!t||!prev||!next) return;
    prev.disabled = t.scrollLeft <= 0;
    next.disabled = t.scrollLeft >= t.scrollWidth - t.clientWidth - 5;
}

/* ===== CANTIDAD ===== */
function changeQty(id, delta) {
    const current = cart[id]?.qty || 0;
    const next = Math.max(0, current + delta);
    if (next === 0) delete cart[id];
    else { const wine = WINES.find(w=>w.id===id); cart[id]={wine,qty:next}; }
    refreshCard(id);
    updateCartUI();
}

function addToCart(id) {
    const wine = WINES.find(w=>w.id===id);
    if (!cart[id]) cart[id]={wine,qty:1};
    refreshCard(id);
    updateCartUI();
    openCartPanel();
}

function refreshCard(id) {
    const qty = cart[id]?.qty || 0;
    const qtyEl = document.getElementById(`qty-${id}`);
    const btnEl = document.getElementById(`btn-${id}`);
    if (qtyEl) qtyEl.textContent = qty;
    if (btnEl) {
        btnEl.textContent = qty > 0 ? '✓ Agregado' : 'AGREGAR AL PEDIDO';
        qty > 0 ? btnEl.classList.add('added') : btnEl.classList.remove('added');
    }
}

function removeItem(id) { delete cart[id]; refreshCard(id); updateCartUI(); }

function clearCart() {
    Object.keys(cart).forEach(id => { delete cart[id]; refreshCard(parseInt(id)); });
    updateCartUI();
}

/* ===== UI CARRITO ===== */
function updateCartUI() {
    const items = Object.values(cart);
    const totalQty = items.reduce((s,i)=>s+i.qty, 0);
    const totalGs  = items.reduce((s,i)=>s+i.wine.price*i.qty, 0);

    document.getElementById('cart-count').textContent = totalQty;

    const emptyEl  = document.getElementById('cart-empty-msg');
    const itemsWrap = document.getElementById('cart-items-wrap');

    if (items.length === 0) {
        if (emptyEl)   emptyEl.style.display = 'flex';
        if (itemsWrap) itemsWrap.style.display = 'none';
        return;
    }

    if (emptyEl)   emptyEl.style.display = 'none';
    if (itemsWrap) itemsWrap.style.display = 'flex';

    const list = document.getElementById('cart-items-list');
    list.innerHTML = '';

    items.forEach(({wine,qty}) => {
        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
            <div class="cart-item-info">
                <p class="cart-item-name">${wine.name}</p>
                <p class="cart-item-price">${fmtPrice(wine.price)} × ${qty} = ${fmtPrice(wine.price*qty)}</p>
            </div>
            <div class="cart-item-qty">
                <button class="ciq-btn" onclick="changeQty(${wine.id},-1)">−</button>
                <span style="color:var(--beige-lt);font-size:.85rem;min-width:20px;text-align:center;">${qty}</span>
                <button class="ciq-btn" onclick="changeQty(${wine.id},1)">+</button>
            </div>
            <button class="cart-item-remove" onclick="removeItem(${wine.id})">✕</button>`;
        list.appendChild(row);
    });

    document.getElementById('cart-total').textContent = fmtPrice(totalGs);
}

/* ===== PANEL CARRITO ===== */
function openCartPanel() {
    document.getElementById('cart-panel').classList.add('open');
    document.getElementById('cart-backdrop').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function toggleCartPanel() {
    const panel = document.getElementById('cart-panel');
    const backdrop = document.getElementById('cart-backdrop');
    const isOpen = panel.classList.contains('open');
    panel.classList.toggle('open');
    backdrop.classList.toggle('show');
    document.body.style.overflow = isOpen ? '' : 'hidden';
}

/* ===== WHATSAPP ORDER ===== */
function sendWhatsAppOrder() {
    const items = Object.values(cart);
    if (!items.length) return;
    const total = items.reduce((s,i)=>s+i.wine.price*i.qty, 0);
    let msg = '🍷 *Pedido — Gadu Store*\n\n';
    items.forEach(({wine,qty}) => { msg += `• ${wine.name} ×${qty} = ${fmtPrice(wine.price*qty)}\n`; });
    msg += `\n*Total: ${fmtPrice(total)}*\n\n¡Hola! Me gustaría hacer este pedido 🙌`;
    window.open(`https://wa.me/595993330038?text=${encodeURIComponent(msg)}`,'_blank');
}

/* ===== NAVBAR SCROLL ===== */
function initNavScroll() {
    const header = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,.3)' : 'none';
    }, { passive:true });
}

/* ===== HAMBURGUESA ===== */
function toggleMenu() {
    document.getElementById('mobile-menu').classList.toggle('open');
}
