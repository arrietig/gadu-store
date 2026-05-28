/* =============================================
   GADU STORE — script.js  v3
   Sistema de marcas con filtro de catálogo
   ============================================= */

/* ===== VINOS ===== */
const WINES = [
    /* ── Catena Zapata ── */
    { id: 25, name:"Nicassia",                             brand:"catena",      type:"Malbec",    price:270000,  color:"#8B3A3A" },
    { id:  7, name:"D.V. Catena Cabernet Malbec",          brand:"catena",      type:"Malbec",    price:430000,  color:"#4A0E0E" },
    { id:  8, name:"D.V. Catena Malbec Malbec",            brand:"catena",      type:"Malbec",    price:540000,  color:"#3D0B0B" },
    { id: 26, name:"D.V. Catena Chardonnay",               brand:"catena",      type:"Blanco",    price:540000,  color:"#8B7020" },
    { id:  9, name:"Angélica Zapata Malbec",               brand:"catena",      type:"Malbec",    price:600000,  color:"#2E0808" },
    /* ── Mosquita Muerta ── */
    { id: 27, name:"Pispi",                                brand:"mosquita",    type:"Tinto",     price:300000,  color:"#722F37" },
    { id: 28, name:"Perro Callejero",                      brand:"mosquita",    type:"Tinto",     price:230000,  color:"#8B3A3A" },
    { id: 29, name:"Sapo de Otro Pozo",                    brand:"mosquita",    type:"Tinto",     price:400000,  color:"#5A1020" },
    { id: 24, name:"Malcriado",                            brand:"mosquita",    type:"Tinto",     price:580000,  color:"#5A1020" },
    { id:  1, name:"Cordero con Piel de Lobo",             brand:"mosquita",    type:"Tinto",     price:170000,  color:"#722F37" },
    { id:  2, name:"Cordero con Piel de Lobo Chardonnay",  brand:"mosquita",    type:"Blanco",    price:180000,  color:"#8B7020" },
    { id: 20, name:"Mosquita Muerta",                      brand:"mosquita",    type:"Tinto",     price:260000,  color:"#722F37" },
    { id: 16, name:"Cordero Espumante",                    brand:"mosquita",    type:"Espumante", price:230000,  color:"#8B7355" },
    /* ── El Gran Enemigo ── */
    { id: 11, name:"El Gran Enemigo Gualtallari",          brand:"enemigo",     type:"Malbec",    price:1600000, color:"#0D0303" },
    /* ── Escorihuela Gascón ── */
    { id:  6, name:"Escorihuela Gascón Gran Reserva",      brand:"escorihuela", type:"Tinto",     price:540000,  color:"#4A0E0E" },
    /* ── Rutini ── */
    { id: 10, name:"Rutini Malbec",                        brand:"rutini",      type:"Malbec",    price:720000,  color:"#1A0505" },
    /* ── Espumantes ── */
    { id: 23, name:"Federico de Alvear Espumante",         brand:"espumantes",  type:"Espumante", price:170000,  color:"#6B5B2E" },
    { id: 12, name:"Freixenet",                            brand:"espumantes",  type:"Espumante", price:240000,  color:"#5C4A00" },
    { id: 13, name:"Chandon",                              brand:"espumantes",  type:"Espumante", price:550000,  color:"#6B5B2E" },
    { id: 14, name:"Chandon Mini",                         brand:"espumantes",  type:"Espumante", price:565000,  color:"#7A6A3E" },
    { id: 15, name:"Aperol",                               brand:"espumantes",  type:"Licor",     price:320000,  color:"#C25A00" },
    /* ── Más Marcas ── */
    { id:  3, name:"Donde Manda Capitán",                  brand:"otros",       type:"Tinto",     price:180000,  color:"#722F37" },
    { id:  4, name:"4 Monos Locos",                        brand:"otros",       type:"Tinto",     price:190000,  color:"#6B1A1A" },
    { id:  5, name:"Saint Felicien",                       brand:"otros",       type:"Blanco",    price:320000,  color:"#8B7020" },
    { id: 17, name:"Santa Julia Dulce",                    brand:"otros",       type:"Dulce",     price:350000,  color:"#8B3A62" },
    { id: 18, name:"El Gran Capitán Malbec",               brand:"otros",       type:"Malbec",    price:300000,  color:"#722F37" },
    { id: 19, name:"Jorge Rubio PV",                       brand:"otros",       type:"Tinto",     price:300000,  color:"#5A1F25" },
    { id: 21, name:"Oveja Black Malbec y Red Blend",       brand:"otros",       type:"Malbec",    price:160000,  color:"#1A1A1A" },
    { id: 22, name:"Luigi Bosca Malbec",                   brand:"otros",       type:"Malbec",    price:375000,  color:"#722F37" },
    { id: 30, name:"Alma Mora",                            brand:"otros",       type:"Tinto",     price:200000,  color:"#8B2020" },
];

/* ===== MARCAS ===== */
const BRAND_GROUPS = [
    {
        id:    'catena',
        label: 'Catena Zapata',
        sub:   'Nicassia · D.V. Catena · Angélica Zapata',
        desc:  'La familia Catena lleva generaciones elaborando los vinos más premiados de Argentina. Malbecs de altura que definen una era.',
        img:   'IMAGENES/logos/catena-zapata/catena.jpg',
        logo:  'IMAGENES/logos/catena-zapata/logo-oficial.png',
        side:  'right' /* imagen a la derecha */
    },
    {
        id:    'mosquita',
        label: 'Mosquita Muerta',
        sub:   'Cordero · Pispi · Perro Callejero · Malcriado · y más',
        desc:  'La bodega irreverente de Mendoza. Cordero con Piel de Lobo, Pispi, Perro Callejero, Sapo de Otro Pozo y Malcriado — vinos con identidad única.',
        img:   'IMAGENES/logos/mosquita-muerta/presentacion.jpg',
        logo:  'IMAGENES/logos/mosquita-muerta/logo.png',
        side:  'left'
    },
    {
        id:    'enemigo',
        label: 'El Gran Enemigo',
        sub:   'Gualtallari · Malbec de Altura',
        desc:  'El ícono de Alejandro Vigil. Un Cabernet Franc que desafía todo lo conocido del vino mendocino. Gualtallari en su máxima expresión.',
        img:   'IMAGENES/logos/gran-enemigo/presentacion.jpg',
        logo:  'IMAGENES/logos/gran-enemigo/logo.png',
        side:  'right'
    },
    {
        id:    'escorihuela',
        label: 'Escorihuela Gascón',
        sub:   'Gran Reserva',
        desc:  'Una de las bodegas históricas de Mendoza. Su Gran Reserva es sinónimo de elegancia y tradición vitivinícola argentina.',
        img:   'IMAGENES/logos/escorihuela/presentacion.jpg',
        logo:  'IMAGENES/logos/escorihuela/logo.png',
        side:  'left'
    },
    {
        id:    'rutini',
        label: 'Rutini Wines',
        sub:   'Malbec · Colección',
        desc:  'Desde Mendoza, Rutini elabora Malbecs de altura con carácter único. Tradición italiana en tierras argentinas desde 1885.',
        img:   'IMAGENES/logos/rutini/presentacion.jpg',
        logo:  'IMAGENES/logos/rutini/logo.png',
        side:  'right'
    },
    {
        id:    'espumantes',
        label: 'Espumantes',
        sub:   'Chandon · Freixenet · Federico de Alvear · Aperol',
        desc:  'Para cada celebración. Desde el clásico Chandon hasta la elegancia de Freixenet y la frescura de Federico de Alvear.',
        img:   'IMAGENES/logos/espumantes/presentacion.jpg',
        logo:  null,
        logos: [
            'IMAGENES/logos/espumantes/chandon.png',
            'IMAGENES/logos/espumantes/freixenet.png',
            'IMAGENES/logos/espumantes/alvear.png',
            'IMAGENES/logos/espumantes/aperol.png',
        ],
        side:  'left'
    },
    {
        id:    'otros',
        label: 'Más Marcas',
        sub:   'Luigi Bosca · Alma Mora · Oveja Black · Saint Felicien · y más',
        desc:  'Nuestra selección incluye joyas de bodegas como Luigi Bosca, Alma Mora, Oveja Black, Santa Julia, 4 Monos y muchos más.',
        img:   'IMAGENES/logos/otras-marcas/presentacion.jpg',
        logo:  null,
        logos: [
            'IMAGENES/logos/otras-marcas/luigi.png',
            'IMAGENES/logos/otras-marcas/saint.png',
            'IMAGENES/logos/otras-marcas/santajulia.png',
            'IMAGENES/logos/otras-marcas/oveja.png',
            'IMAGENES/logos/otras-marcas/4monos.png',
            'IMAGENES/logos/otras-marcas/primavera.png',
        ],
        side:  'right'
    },
];

const BRANDS_MARQUEE = [
    { src:'IMAGENES/logos/catena-zapata/logo-oficial.png',  alt:'Catena Zapata'       },
    { src:'IMAGENES/logos/mosquita-muerta/logo.png',        alt:'Mosquita Muerta'      },
    { src:'IMAGENES/logos/gran-enemigo/logo.png',           alt:'El Gran Enemigo'      },
    { src:'IMAGENES/logos/escorihuela/logo.png',            alt:'Escorihuela Gascón'   },
    { src:'IMAGENES/logos/rutini/logo.png',                 alt:'Rutini Wines'         },
    { src:'IMAGENES/logos/espumantes/chandon.png',          alt:'Chandon'              },
    { src:'IMAGENES/logos/espumantes/freixenet.png',        alt:'Freixenet'            },
    { src:'IMAGENES/logos/espumantes/alvear.png',           alt:'Federico de Alvear'   },
    { src:'IMAGENES/logos/espumantes/aperol.png',           alt:'Aperol'               },
    { src:'IMAGENES/logos/otras-marcas/luigi.png',          alt:'Luigi Bosca'          },
    { src:'IMAGENES/logos/otras-marcas/saint.png',          alt:'Saint Felicien'       },
    { src:'IMAGENES/logos/otras-marcas/santajulia.png',     alt:'Santa Julia'          },
    { src:'IMAGENES/logos/otras-marcas/oveja.png',          alt:'Oveja Black'          },
    { src:'IMAGENES/logos/otras-marcas/4monos.png',         alt:'4 Monos Locos'        },
    { src:'IMAGENES/logos/otras-marcas/primavera.png',      alt:'Casa La Primavera'    },
    { src:'IMAGENES/logos/espumantes/aperol.png',           alt:'Aperol'               },
];

/* ===== CARRITO ===== */
let cart = {};
let activeBrand = 'all';

/* Persistencia del carrito en sessionStorage */
function saveCart() {
    const data = {};
    Object.keys(cart).forEach(id => { data[id] = { qty: cart[id].qty }; });
    sessionStorage.setItem('gaduCart', JSON.stringify(data));
}
function loadCart() {
    try {
        const saved = sessionStorage.getItem('gaduCart');
        if (!saved) return;
        const data = JSON.parse(saved);
        Object.keys(data).forEach(id => {
            const wine = WINES.find(w => w.id === parseInt(id));
            if (wine) cart[parseInt(id)] = { wine, qty: data[id].qty };
        });
    } catch(e) {}
}

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
    if (document.getElementById('catalog-grid')) {
        initCatalogPage();
    } else {
        initSite();
    }
}

if (sessionStorage.getItem('gaduAge')) { revealSite(); }

document.getElementById('yes-btn').addEventListener('click', revealSite);
document.getElementById('no-btn').addEventListener('click', () => {
    document.getElementById('age-modal').style.display = 'none';
    document.getElementById('underage-block').style.display = 'flex';
});

/* ===== INICIALIZACIÓN ===== */
function initSite() {
    loadCart();
    buildBrandPanels();
    buildMarquee();
    updateCartUI();
    initNavScroll();
}

function initCatalogPage() {
    loadCart();
    const params = new URLSearchParams(window.location.search);
    activeBrand = params.get('marca') || 'all';
    buildCatalogHero(activeBrand);
    buildFilterBtns();
    buildCatalogGrid();
    updateCartUI();
    initNavScroll();
}

/* ===== PANELES DE MARCAS ===== */
function buildBrandPanels() {
    const main = document.getElementById('inicio');
    if (!main) return;
    main.innerHTML = '';

    BRAND_GROUPS.forEach(brand => {
        const pair = document.createElement('div');
        pair.className = 'pair';

        const logoHtml = brand.logos
            ? `<div class="brand-logos-grid">${brand.logos.map(l =>
                `<img src="${l}" alt="${brand.label}" class="brand-logo-multi">`).join('')}</div>`
            : brand.logo
                ? `<img src="${brand.logo}" alt="${brand.label}" class="brand-logo-img">`
                : `<p class="brand-logo-text">${brand.label}</p>`;

        const textPanel = `
            <div class="panel panel-text brand-panel" onclick="window.location='catalogo.html?marca=${brand.id}'">
                <div class="panel-text-inner">
                    ${logoHtml}
                    <div class="panel-line"></div>
                    <p class="brand-sub">${brand.sub}</p>
                    <p>${brand.desc}</p>
                    <span class="panel-cta">VER CATÁLOGO →</span>
                </div>
            </div>`;

        const imgPanel = `
            <div class="panel panel-img" onclick="window.location='catalogo.html?marca=${brand.id}'">
                <div class="panel-img-inner" style="background-image:url('${brand.img}')"></div>
            </div>`;

        pair.innerHTML = brand.side === 'right'
            ? textPanel + imgPanel
            : imgPanel + textPanel;

        main.appendChild(pair);
    });
}

/* ===== MARQUEE ===== */
function buildMarquee() {
    const inner = document.getElementById('marquee-inner');
    if (!inner) return;
    const items = [...BRANDS_MARQUEE, ...BRANDS_MARQUEE];
    inner.innerHTML = items.map((b,i) =>
        `<img src="${b.src}" alt="${b.alt}" class="marquee-logo">${i < items.length-1 ? '<span class="mdot">◆</span>' : ''}`
    ).join('');
}

/* ===== FILTROS DE CATÁLOGO ===== */
function buildFilterBtns() {
    const wrap = document.getElementById('brand-filters');
    if (!wrap) return;

    const filters = [
        { id: 'all', label: 'Todos' },
        ...BRAND_GROUPS.map(b => ({ id: b.id, label: b.label }))
    ];

    wrap.innerHTML = filters.map(f =>
        `<button class="filter-btn ${f.id === activeBrand ? 'active' : ''}"
                 onclick="filterByBrand('${f.id}')">${f.label}</button>`
    ).join('');
}

/* ===== FILTRAR POR MARCA (página catálogo) ===== */
function filterByBrand(brandId) {
    activeBrand = brandId;
    const url = brandId === 'all' ? 'catalogo.html' : `catalogo.html?marca=${brandId}`;
    history.replaceState(null, '', url);
    buildCatalogHero(brandId);
    buildFilterBtns();
    buildCatalogGrid();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ===== HERO DE MARCA (página catálogo) ===== */
function buildCatalogHero(brandId) {
    const hero = document.getElementById('catalog-hero');
    if (!hero) return;

    if (brandId === 'all') {
        hero.style.backgroundImage = '';
        hero.innerHTML = `
            <div class="catalog-hero-inner">
                <p class="catalog-hero-eyebrow">SELECCIÓN COMPLETA</p>
                <h1 class="catalog-hero-title">CATÁLOGO DE VINOS</h1>
                <p class="catalog-hero-sub">Todas nuestras marcas y etiquetas</p>
            </div>
            <a href="index.html" class="catalog-back-link">← VOLVER</a>`;
        return;
    }

    const brand = BRAND_GROUPS.find(b => b.id === brandId);
    if (!brand) return;

    const logoHtml = brand.logos
        ? `<div class="catalog-hero-logos">${brand.logos.map(l =>
            `<img src="${l}" alt="${brand.label}" class="catalog-hero-logo-multi">`).join('')}</div>`
        : brand.logo
            ? `<img src="${brand.logo}" alt="${brand.label}" class="catalog-hero-logo">`
            : `<p class="catalog-hero-title">${brand.label.toUpperCase()}</p>`;

    hero.style.backgroundImage = `url('${brand.img}')`;
    hero.innerHTML = `
        <div class="catalog-hero-inner">
            ${logoHtml}
            <p class="catalog-hero-sub">${brand.sub}</p>
        </div>
        <a href="index.html" class="catalog-back-link">← VOLVER</a>`;
}

/* ===== GRILLA DE CATÁLOGO (página catálogo) ===== */
function buildCatalogGrid() {
    const grid = document.getElementById('catalog-grid');
    if (!grid) return;

    const filtered = activeBrand === 'all'
        ? WINES
        : WINES.filter(w => w.brand === activeBrand);

    const countEl = document.getElementById('wine-count');
    if (countEl) countEl.textContent = filtered.length;
    grid.innerHTML = '';
    filtered.forEach(wine => grid.appendChild(createCard(wine)));
}

/* ===== CATÁLOGO (carrusel — legacy, ya no se usa en producción) ===== */
function buildCatalog() {
    const track = document.getElementById('catalog-track');
    if (!track) return;

    const filtered = activeBrand === 'all'
        ? WINES
        : WINES.filter(w => w.brand === activeBrand);

    document.getElementById('wine-count').textContent = filtered.length;
    track.innerHTML = '';
    filtered.forEach(wine => track.appendChild(createCard(wine)));
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
    saveCart();
}

function addToCart(id) {
    const wine = WINES.find(w=>w.id===id);
    if (!cart[id]) cart[id]={wine,qty:1};
    refreshCard(id);
    updateCartUI();
    saveCart();
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

function removeItem(id) { delete cart[id]; refreshCard(id); updateCartUI(); saveCart(); }

function clearCart() {
    Object.keys(cart).forEach(id => { delete cart[id]; refreshCard(parseInt(id)); });
    updateCartUI();
    saveCart();
}

/* ===== UI CARRITO ===== */
function updateCartUI() {
    const items = Object.values(cart);
    const totalQty = items.reduce((s,i)=>s+i.qty, 0);
    const totalGs  = items.reduce((s,i)=>s+i.wine.price*i.qty, 0);

    document.getElementById('cart-count').textContent = totalQty;

    const emptyEl   = document.getElementById('cart-empty-msg');
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
    const panel    = document.getElementById('cart-panel');
    const backdrop = document.getElementById('cart-backdrop');
    const isOpen   = panel.classList.contains('open');
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
