// ===== DATA STORE =====
let products = JSON.parse(localStorage.getItem("rky_products")) || getDefaultProducts();
migrateNewDefaultProducts();
let cart = JSON.parse(localStorage.getItem("rky_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("rky_wishlist")) || [];
let orders = JSON.parse(localStorage.getItem("rky_orders")) || [];
let adminNotifications = JSON.parse(localStorage.getItem("rky_notifs")) || [];
let buyerProfile = JSON.parse(localStorage.getItem("rky_buyer")) || null;
let users = JSON.parse(localStorage.getItem("rky_users")) || [];
let currentUserId = localStorage.getItem("rky_current_user") || null;
let isAdmin = false;
let currentCategory = "all";
let currentSort = "default";
let editingIndex = -1;
let chatHistory = [];
let heroSlideIndex = 0;
let heroInterval = null;

// ===== DEFAULT PRODUCTS =====
function getDefaultProducts() {
  const base = Date.now();
  return [
    { id: base+1, name: "iPhone 15 Pro Max 256GB", category: "elektronik", price: 21999000, origPrice: 25000000, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop", stock: 15, rating: 4.9, sold: 234, desc: "Smartphone terbaru Apple dengan chip A17 Pro, kamera 48MP, dan layar Super Retina XDR 6.7 inci.", flash: true, createdAt: base },
    { id: base+2, name: "Samsung Galaxy S24 Ultra", category: "elektronik", price: 19500000, origPrice: 22000000, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop", stock: 8, rating: 4.8, sold: 178, desc: "Flagship Samsung terbaru dengan S Pen terintegrasi, kamera 200MP, dan layar Dynamic AMOLED 2X 6.8 inci.", flash: true, createdAt: base },
    { id: base+3, name: "Nike Air Jordan 1 Retro", category: "fashion", price: 2800000, origPrice: 3500000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", stock: 25, rating: 4.7, sold: 456, desc: "Sepatu ikonik Nike Air Jordan 1 Retro High OG. Upper kulit asli berkualitas tinggi.", flash: false, createdAt: base },
    { id: base+4, name: "Mie Ayam Premium Pak Kumis", category: "makanan", price: 45000, origPrice: null, image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&h=400&fit=crop", stock: 100, rating: 4.9, sold: 1230, desc: "Mie ayam premium dengan kuah kaldu ayam kampung asli, topping ayam melimpah.", flash: false, createdAt: base },
    { id: base+5, name: "SK-II Facial Treatment Essence", category: "kecantikan", price: 1250000, origPrice: 1650000, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop", stock: 30, rating: 4.8, sold: 892, desc: "Essence perawatan wajah mewah SK-II dengan kandungan Pitera™ untuk kulit lebih cerah.", flash: true, createdAt: base },
    { id: base+6, name: "Sepatu Futsal Specs Accelerator", category: "olahraga", price: 380000, origPrice: 450000, image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=400&fit=crop", stock: 40, rating: 4.6, sold: 320, desc: "Sepatu futsal Specs dengan sol anti-slip khusus indoor, upper TPU yang tahan lama.", flash: false, createdAt: base },
    { id: base+7, name: "Kursi Gaming RGB Ergonomis", category: "rumah", price: 1800000, origPrice: 2500000, image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=400&fit=crop", stock: 12, rating: 4.5, sold: 67, desc: "Kursi gaming dengan sandaran lumbar adjustable, sandaran tangan 4D, dan lampu RGB.", flash: false, createdAt: base },
    { id: base+8, name: "Laptop ASUS ROG Strix G16", category: "elektronik", price: 24500000, origPrice: 28000000, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop", stock: 5, rating: 4.9, sold: 45, desc: "Laptop gaming ASUS ROG dengan Intel Core i9 Gen 13, RTX 4080, RAM 32GB, 165Hz QHD.", flash: true, createdAt: base },

    { id: base+9, name: "Sony Kamera Mirrorless Alpha", category: "elektronik", price: 18500000, origPrice: 21000000, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop", stock: 10, rating: 4.8, sold: 89, desc: "Kamera mirrorless full-frame dengan sensor 33MP, video 4K 60fps, dan autofocus real-time tracking.", flash: false, createdAt: base },
    { id: base+10, name: "Smartwatch Series Fitness Pro", category: "elektronik", price: 3200000, origPrice: 3800000, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", stock: 35, rating: 4.6, sold: 267, desc: "Jam tangan pintar dengan pelacak detak jantung, GPS, tahan air 50m, dan baterai tahan 7 hari.", flash: false, createdAt: base },
    { id: base+11, name: "Smart TV LED 55 Inch 4K", category: "elektronik", price: 6800000, origPrice: 8500000, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop", stock: 8, rating: 4.7, sold: 54, desc: "Smart TV layar 4K UHD 55 inci dengan Android TV, HDR10+, dan speaker Dolby Audio.", flash: true, createdAt: base },

    { id: base+12, name: "Tas Ransel Kulit Premium", category: "fashion", price: 650000, origPrice: 900000, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop", stock: 22, rating: 4.7, sold: 198, desc: "Tas ransel kulit sintetis premium, muat laptop 15 inci, cocok untuk kerja & traveling.", flash: false, createdAt: base },
    { id: base+13, name: "Kacamata Hitam Fashion UV400", category: "fashion", price: 285000, origPrice: 400000, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop", stock: 50, rating: 4.5, sold: 312, desc: "Kacamata hitam dengan lensa polarized anti-UV, frame ringan dan stylish.", flash: false, createdAt: base },

    { id: base+14, name: "Nasi Goreng Spesial Seafood", category: "makanan", price: 38000, origPrice: null, image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&h=400&fit=crop", stock: 80, rating: 4.8, sold: 645, desc: "Nasi goreng spesial dengan campuran udang, cumi, dan bakso ikan, disajikan dengan telur mata sapi.", flash: false, createdAt: base },
    { id: base+15, name: "Kopi Susu Gula Aren Kekinian", category: "makanan", price: 18000, origPrice: 22000, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop", stock: 150, rating: 4.9, sold: 2103, desc: "Kopi susu dengan gula aren asli, dibuat dari biji kopi robusta pilihan tanpa bahan pengawet.", flash: true, createdAt: base },
    { id: base+16, name: "Kue Ulang Tahun Custom", category: "makanan", price: 220000, origPrice: 275000, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop", stock: 15, rating: 4.9, sold: 156, desc: "Kue ulang tahun custom dengan topping buah segar, bisa request tulisan & warna sesuai keinginan.", flash: false, createdAt: base },

    { id: base+17, name: "Parfum Mewah Eau de Parfum 100ml", category: "kecantikan", price: 485000, origPrice: 650000, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop", stock: 28, rating: 4.7, sold: 342, desc: "Parfum tahan lama dengan aroma floral-woody, cocok dipakai harian maupun acara spesial.", flash: true, createdAt: base },

    { id: base+18, name: "Sepeda Gunung MTB 26 Inch", category: "olahraga", price: 2450000, origPrice: 3000000, image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=400&fit=crop", stock: 9, rating: 4.6, sold: 78, desc: "Sepeda gunung dengan rangka aluminium ringan, 21 speed shimano, rem cakram depan-belakang.", flash: false, createdAt: base },

    { id: base+19, name: "Air Fryer Digital 5L", category: "rumah", price: 550000, origPrice: 750000, image: "https://images.unsplash.com/photo-1648146029733-7a6a0846bd68?w=400&h=400&fit=crop", stock: 20, rating: 4.8, sold: 289, desc: "Air fryer kapasitas 5 liter, tanpa minyak, dengan 8 mode masak otomatis dan layar digital.", flash: true, createdAt: base },

    { id: base+20, name: "Anak Kucing Anggora Lucu", category: "hewan", price: 1500000, origPrice: null, image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop", stock: 3, rating: 5.0, sold: 12, desc: "Anak kucing anggora sehat, sudah vaksin & obat cacing, usia 2 bulan, litter box trained.", flash: false, createdAt: base },
    { id: base+21, name: "Anak Anjing Golden Retriever", category: "hewan", price: 3500000, origPrice: 4000000, image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop", stock: 2, rating: 5.0, sold: 8, desc: "Puppy golden retriever ras murni, sudah vaksin lengkap, sehat & aktif, siap kirim luar kota.", flash: true, createdAt: base },
    { id: base+22, name: "Makanan Kucing Premium 1.5kg", category: "hewan", price: 145000, origPrice: 175000, image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop", stock: 60, rating: 4.7, sold: 421, desc: "Dry food kucing dengan kandungan protein tinggi, membantu bulu lebih sehat & mengkilap.", flash: false, createdAt: base },

    { id: base+23, name: "Motor Yamaha NMAX 155 Connected", category: "otomotif", price: 34500000, origPrice: 37000000, image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=400&fit=crop", stock: 4, rating: 4.8, sold: 23, desc: "Motor matic premium Yamaha NMAX 155 Connected/ABS, unit baru, garansi resmi 3 tahun.", flash: true, createdAt: base },
    { id: base+24, name: "Toyota Avanza 1.5G Bekas 2021", category: "otomotif", price: 189000000, origPrice: 210000000, image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=400&fit=crop", stock: 1, rating: 4.7, sold: 3, desc: "Mobil bekas Toyota Avanza 1.5G tahun 2021, tangan pertama, servis record lengkap, pajak hidup.", flash: false, createdAt: base },
    { id: base+25, name: "Motor Honda Beat Street 2024", category: "otomotif", price: 19800000, origPrice: 21500000, image: "https://images.unsplash.com/photo-1622185135505-2d795003994a?w=400&h=400&fit=crop", stock: 6, rating: 4.6, sold: 41, desc: "Motor matic irit Honda Beat Street, unit baru on the road, cocok untuk harian & kerja.", flash: false, createdAt: base },
  ];
}

// ===== SAVE FUNCTIONS =====
function saveProducts() { localStorage.setItem("rky_products", JSON.stringify(products)); }

// Tambahkan produk dummy baru ke katalog yang sudah tersimpan di browser,
// tanpa menghapus produk yang sudah pernah ditambah/diedit oleh admin.
function migrateNewDefaultProducts() {
  const CURRENT_VERSION = 2;
  const savedVersion = parseInt(localStorage.getItem("rky_products_version") || "1");
  if (savedVersion >= CURRENT_VERSION) return;
  const existingNames = new Set(products.map(p => p.name));
  const freshDefaults = getDefaultProducts();
  freshDefaults.forEach(p => {
    if (!existingNames.has(p.name)) products.push(p);
  });
  localStorage.setItem("rky_products", JSON.stringify(products));
  localStorage.setItem("rky_products_version", String(CURRENT_VERSION));
}function saveCart() { localStorage.setItem("rky_cart", JSON.stringify(cart)); }
function saveWishlist() { localStorage.setItem("rky_wishlist", JSON.stringify(wishlist)); }
function saveOrders() { localStorage.setItem("rky_orders", JSON.stringify(orders)); }
function saveNotifications() { localStorage.setItem("rky_notifs", JSON.stringify(adminNotifications)); }
function saveBuyerProfile() { localStorage.setItem("rky_buyer", JSON.stringify(buyerProfile)); }
function saveUsers() { localStorage.setItem("rky_users", JSON.stringify(users)); }
function setCurrentUser(id) {
  currentUserId = id;
  if (id) localStorage.setItem("rky_current_user", id);
  else localStorage.removeItem("rky_current_user");
}
function getCurrentUser() { return users.find(u => u.id === currentUserId) || null; }

// ===== FORMAT RUPIAH =====
function formatRp(num) {
  return "Rp " + parseInt(num).toLocaleString("id-ID");
}

function discountPct(price, orig) {
  if (!orig || orig <= price) return 0;
  return Math.round((1 - price / orig) * 100);
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let s = "";
  for (let i = 0; i < full; i++) s += "⭐";
  if (half) s += "✨";
  return s;
}

// ===== TOAST NOTIFICATION =====
function showToast(msg, emoji = "✅") {
  const t = document.getElementById("toast");
  t.textContent = emoji + " " + msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2800);
}

// ===== DARK MODE =====
function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark");
  document.getElementById("darkModeBtn").textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("rky_dark", isDark ? "1" : "0");
  syncDrawerDarkMode(isDark);
}

function syncDrawerDarkMode(isDark) {
  const icon = document.getElementById("drawerDarkIcon");
  const label = document.getElementById("drawerDarkLabel");
  if (icon) icon.textContent = isDark ? "☀️" : "🌙";
  if (label) label.textContent = isDark ? "Mode Terang" : "Mode Gelap";
}

function closeDemoNotice() {
  const el = document.getElementById("demoNotice");
  if (el) {
    el.classList.add("notice-hide");
    setTimeout(() => { el.style.display = "none"; }, 400);
  }
}
function initDemoNotice() {
  // Selalu tampil setiap kali halaman dibuka/di-reload — tombol ✕ hanya
  // menyembunyikan untuk tampilan saat ini, tidak disimpan permanen.
  const el = document.getElementById("demoNotice");
  if (el) { el.classList.remove("notice-hide"); el.style.display = ""; }
}

function initDarkMode() {
  const saved = localStorage.getItem("rky_dark");
  if (saved === "1") {
    document.body.classList.add("dark");
    document.getElementById("darkModeBtn").textContent = "☀️";
  }
  syncDrawerDarkMode(saved === "1");
}

// ===== HERO SLIDER =====
function goToSlide(idx) {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  if (!slides.length) return;
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));
  heroSlideIndex = (idx + slides.length) % slides.length;
  slides[heroSlideIndex].classList.add("active");
  if (dots[heroSlideIndex]) dots[heroSlideIndex].classList.add("active");
}

function startHeroSlider() {
  clearInterval(heroInterval);
  heroInterval = setInterval(() => goToSlide(heroSlideIndex + 1), 4500);
}

function initBackToTop() {
  window.addEventListener("scroll", () => {
    const btn = document.getElementById("backToTop");
    if (btn) {
      if (window.scrollY > 400) btn.classList.add("visible");
      else btn.classList.remove("visible");
    }
    const header = document.getElementById("mainHeader");
    if (header) {
      if (window.scrollY > 40) header.classList.add("header-shrink");
      else header.classList.remove("header-shrink");
    }
  }, { passive: true });
}

// ===== 3D TILT ON PRODUCT CARDS (desktop / hover-capable only) =====
function initCardTilt() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.addEventListener("mousemove", (e) => {
    const card = e.target.closest && e.target.closest(".product-card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -8;
    const ry = (px - 0.5) * 8;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  }, { passive: true });
  document.addEventListener("mouseout", (e) => {
    const card = e.target.closest && e.target.closest(".product-card");
    if (card && !card.contains(e.relatedTarget)) card.style.transform = "";
  }, { passive: true });
}

// ===== RENDER PRODUCT CARD =====
function renderCard(p, idx, opts = {}) {
  const disc = discountPct(p.price, p.origPrice);
  const isWished = wishlist.includes(p.id);
  const stockPct = Math.min(100, (p.stock / 50) * 100);
  const isLowStock = p.stock <= 5 && p.stock > 0;
  const isBentoWide = opts.bento && opts.pos % 6 === 0;
  const isAiPick = p.rating >= 4.8 && (p.sold || 0) > 150;
  // Second demo "angle" image (dummy multi-photo effect via crop params — real data will have true multi-photos)
  const img2 = p.image.includes("?") ? p.image + "&crop=entropy&fit=crop&sat=-15" : p.image + "?crop=entropy&fit=crop&sat=-15";
  return `
    <div class="product-card reveal-up ${isBentoWide ? "card-wide" : ""}" onclick="openModal(${idx})">
      <div class="card-img-wrap card-carousel" data-active="0">
        <img class="ci-img ci-img-0 img-active" src="${p.image}" alt="${p.name}" onerror="this.src='https://placehold.co/400x300/f1f5f9/94a3b8?text=No+Image'; this.classList.add('img-loaded'); this.closest('.card-img-wrap').classList.add('img-done');" onload="this.classList.add('img-loaded'); this.closest('.card-img-wrap').classList.add('img-done');" loading="lazy" />
        <img class="ci-img ci-img-1" src="${img2}" alt="${p.name}" loading="lazy" />
        <div class="card-carousel-dots"><span class="ccd active"></span><span class="ccd"></span></div>
        <div class="card-quick-view"><span>👁 Lihat Detail</span></div>
        <div class="card-badges">
          ${isAiPick ? `<span class="badge-ai">✨ AI Pick</span>` : ""}
          ${disc > 0 ? `<span class="badge-discount">-${disc}%</span>` : ""}
          ${p.flash ? `<span class="badge-flash">⚡ Flash</span>` : ""}
          ${p.stock <= 0 ? `<span class="badge-discount">Habis</span>` : ""}
        </div>
        <button class="card-wish-btn ${isWished ? "wished" : ""}" onclick="toggleWishlist(event, ${p.id})" title="${isWished ? "Hapus dari wishlist" : "Tambah ke wishlist"}">${isWished ? "❤️" : "🤍"}</button>
      </div>
      <div class="card-body">
        <div class="card-category">${p.category}</div>
        <h4>${p.name}</h4>
        <div class="card-price">
          <span class="price-current">${formatRp(p.price)}</span>
          ${p.origPrice ? `<span class="price-original">${formatRp(p.origPrice)}</span>` : ""}
        </div>
        <div class="card-meta">
          <span class="card-rating">${renderStars(p.rating)} ${p.rating}</span>
          <span class="card-sold"><span class="mini-avatars"><i></i><i></i><i></i></span>${(p.sold || 0).toLocaleString("id-ID")} terjual</span>
        </div>
        <div class="card-stock ${isLowStock ? "low" : ""}">
          ${p.stock <= 0 ? "❌ Stok habis" : isLowStock ? `⚠️ Sisa ${p.stock} lagi!` : `📦 Stok: ${p.stock}`}
        </div>
        ${p.flash && p.stock > 0 ? `<div class="stock-bar"><div class="stock-fill" style="width: ${100 - stockPct}%"></div></div>` : ""}
        <button class="btn-add-cart" onclick="addToCart(event, ${p.id})" ${p.stock <= 0 ? "disabled" : ""}>${p.stock <= 0 ? "Stok Habis" : "🛒 Beli"}</button>
      </div>
    </div>
  `;
}

// ===== RENDER SHOP =====
function renderShop(filtered = null) {
  const list = filtered !== null ? filtered : getFilteredProducts();
  const productList = document.getElementById("productList");
  const emptyState = document.getElementById("emptyState");
  const flashList = document.getElementById("flashSaleList");
  const flashProducts = products.filter(p => p.flash && p.stock > 0).slice(0, 6);
  flashList.innerHTML = flashProducts.map(p => renderCard(p, products.indexOf(p))).join("");
  if (list.length === 0) {
    productList.innerHTML = "";
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
    productList.innerHTML = list.map((p, i) => renderCard(p, products.indexOf(p), { bento: true, pos: i })).join("");
  }
  document.getElementById("statProducts").textContent = products.length;
  initScrollReveal();
  initCardCarouselHover();
}

function initCardCarouselHover() {
  document.querySelectorAll(".card-carousel").forEach(wrap => {
    if (wrap.dataset.bound) return;
    wrap.dataset.bound = "1";
    const img0 = wrap.querySelector(".ci-img-0");
    const img1 = wrap.querySelector(".ci-img-1");
    const dots = wrap.querySelectorAll(".ccd");
    wrap.addEventListener("mouseenter", () => {
      if (!img1) return;
      img1.classList.add("img-active");
      img0.classList.remove("img-active");
      dots.forEach((d, i) => d.classList.toggle("active", i === 1));
    });
    wrap.addEventListener("mouseleave", () => {
      if (!img1) return;
      img1.classList.remove("img-active");
      img0.classList.add("img-active");
      dots.forEach((d, i) => d.classList.toggle("active", i === 0));
    });
  });
}

let statProductsAnimated = false;
function animateStatProductsOnce() {
  if (statProductsAnimated) return;
  statProductsAnimated = true;
  const el = document.getElementById("statProducts");
  if (el) animateCount(el, products.length, 0);
}

// ===== FILTER & SORT =====
function getFilteredProducts() {
  let list = [...products];
  const q = document.getElementById("searchInput")?.value.toLowerCase() || "";
  if (currentCategory !== "all") list = list.filter(p => p.category === currentCategory);
  if (q) list = list.filter(p =>
    p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || (p.desc || "").toLowerCase().includes(q)
  );
  switch (currentSort) {
    case "price-asc": list.sort((a, b) => a.price - b.price); break;
    case "price-desc": list.sort((a, b) => b.price - a.price); break;
    case "rating": list.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
    case "newest": list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)); break;
  }
  return list;
}

function filterCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  showPage("shop");
  renderShop();
}

function sortProducts(val, el) {
  currentSort = val;
  renderShop();
  document.querySelectorAll(".sort-option").forEach(o => o.classList.remove("active"));
  if (el) {
    el.classList.add("active");
    document.getElementById("sortTriggerLabel").textContent = val === "default" ? "Urutkan" : el.textContent.trim();
  }
  closeSortMenu();
}

function toggleSortMenu(e) {
  if (e) e.stopPropagation();
  const ctrl = document.getElementById("sortControl");
  ctrl.classList.toggle("open");
}
function closeSortMenu() {
  const ctrl = document.getElementById("sortControl");
  if (ctrl) ctrl.classList.remove("open");
}
document.addEventListener("click", (e) => {
  const ctrl = document.getElementById("sortControl");
  if (ctrl && !ctrl.contains(e.target)) closeSortMenu();
});
function handleSearch() { renderShop(); renderSearchSuggest(); }

// ===== WISHLIST =====
function toggleWishlist(e, id) {
  e.stopPropagation();
  const idx = wishlist.indexOf(id);
  if (idx > -1) { wishlist.splice(idx, 1); showToast("Dihapus dari wishlist", "💔"); }
  else { wishlist.push(id); showToast("Ditambahkan ke wishlist!", "❤️"); }
  saveWishlist();
  updateWishBadge();
  renderShop();
  if (document.getElementById("wishlistPage").classList.contains("active")) renderWishlist();
}

function updateWishBadge() {
  document.getElementById("wishBadge").textContent = wishlist.length;
  const b = document.getElementById("wishBadgeBottom");
  if (b) b.textContent = wishlist.length;
}

function renderWishlist() {
  const grid = document.getElementById("wishlistGrid");
  const empty = document.getElementById("wishlistEmpty");
  const wishedProducts = products.filter(p => wishlist.includes(p.id));
  if (wishedProducts.length === 0) { grid.innerHTML = ""; empty.style.display = "block"; }
  else { empty.style.display = "none"; grid.innerHTML = wishedProducts.map(p => renderCard(p, products.indexOf(p))).join(""); }
}

// ===== CART =====
function addToCart(e, id) {
  e.stopPropagation();
  const p = products.find(x => x.id === id);
  if (!p || p.stock <= 0) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    if (existing.qty >= p.stock) { showToast("Stok tidak mencukupi!", "⚠️"); return; }
    existing.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }
  saveCart();
  updateCartBadge();
  showToast(`${p.name} ditambahkan ke keranjang!`, "🛒");
}

function updateCartBadge() {
  const total = cart.reduce((sum, c) => sum + c.qty, 0);
  const badge = document.getElementById("cartBadge");
  badge.textContent = total;
  badge.classList.remove("badge-bump");
  void badge.offsetWidth;
  badge.classList.add("badge-bump");
  const b = document.getElementById("cartBadgeBottom");
  if (b) {
    b.textContent = total;
    b.classList.remove("badge-bump");
    void b.offsetWidth;
    b.classList.add("badge-bump");
  }
}

function openCart() {
  document.getElementById("cartSidebar").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
  renderCart();
}

function closeCart() {
  document.getElementById("cartSidebar").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
}

function renderCart() {
  const container = document.getElementById("cartItems");
  if (cart.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">🛒</div><h3>Keranjang kosong</h3><p>Yuk belanja dulu!</p></div>`;
    document.getElementById("cartTotal").textContent = "Rp 0";
    return;
  }
  let total = 0;
  container.innerHTML = cart.map(c => {
    const p = products.find(x => x.id === c.id);
    if (!p) return "";
    const sub = p.price * c.qty;
    total += sub;
    return `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}" onerror="this.src='https://placehold.co/60x60/f1f5f9/94a3b8?text=?'" />
        <div class="cart-item-info">
          <h4>${p.name}</h4>
          <div class="cart-price">${formatRp(p.price)}</div>
          <div class="cart-qty">
            <button class="qty-btn" onclick="changeQty(${c.id}, -1)">−</button>
            <span class="qty-num">${c.qty}</span>
            <button class="qty-btn" onclick="changeQty(${c.id}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item-del" onclick="removeCart(${c.id})">🗑️</button>
      </div>
    `;
  }).join("");
  document.getElementById("cartTotal").textContent = formatRp(total);
}

function changeQty(id, delta) {
  const c = cart.find(x => x.id === id);
  const p = products.find(x => x.id === id);
  if (!c || !p) return;
  c.qty += delta;
  if (c.qty <= 0) removeCart(id);
  else if (c.qty > p.stock) { showToast("Stok tidak mencukupi!", "⚠️"); c.qty = p.stock; }
  saveCart(); updateCartBadge(); renderCart();
}

function removeCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart(); updateCartBadge(); renderCart();
}

// ===== CHECKOUT FLOW =====
// Step 1: Click "Bayar Sekarang" → open checkout modal
function checkout() {
  if (cart.length === 0) return;
  closeCart();
  openCheckoutModal();
}

function openCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  modal.classList.add("open");
  // Pre-fill: prioritize logged-in account address, fallback to guest buyerProfile
  const user = getCurrentUser();
  const prefill = user && user.address && user.address.address
    ? { name: user.address.name, email: user.method === "email" ? user.loginId : (buyerProfile?.email || ""), phone: user.address.phone, address: user.address.address, city: user.address.city, province: user.address.province, postal: user.address.postal }
    : buyerProfile;
  if (prefill) {
    document.getElementById("co_name").value = prefill.name || "";
    document.getElementById("co_email").value = prefill.email || "";
    document.getElementById("co_phone").value = prefill.phone || "";
    document.getElementById("co_address").value = prefill.address || "";
    document.getElementById("co_city").value = prefill.city || "";
    document.getElementById("co_province").value = prefill.province || "";
    document.getElementById("co_postal").value = prefill.postal || "";
  }
  renderCheckoutSummary();
  showCheckoutStep(1);
}

function closeCheckoutModal() {
  document.getElementById("checkoutModal").classList.remove("open");
}

function showCheckoutStep(step) {
  document.querySelectorAll(".checkout-step-panel").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".step-indicator").forEach((s, i) => {
    s.classList.toggle("active", i + 1 === step);
    s.classList.toggle("done", i + 1 < step);
  });
  document.getElementById(`co-step-${step}`).classList.add("active");
}

function renderCheckoutSummary() {
  let total = 0;
  const html = cart.map(c => {
    const p = products.find(x => x.id === c.id);
    if (!p) return "";
    const sub = p.price * c.qty;
    total += sub;
    return `<div class="co-summary-item">
      <img src="${p.image}" onerror="this.src='https://placehold.co/48x48/f1f5f9/ccc?text=?'" />
      <div><span>${p.name}</span><small>${c.qty} x ${formatRp(p.price)}</small></div>
      <strong>${formatRp(sub)}</strong>
    </div>`;
  }).join("");
  document.getElementById("coSummaryItems").innerHTML = html;
  window._coSubtotal = total;
  updateCoTotal();
}

const COURIERS = [
  { id: "jne_reg", name: "JNE REG", logo: "🚚", eta: "2-3 hari", price: 18000, desc: "Reguler, aman & terpercaya" },
  { id: "jne_yes", name: "JNE YES", logo: "⚡", eta: "1 hari", price: 35000, desc: "Yakin Esok Sampai" },
  { id: "jnt_reg", name: "J&T Express", logo: "🟠", eta: "2-4 hari", price: 15000, desc: "Express door-to-door" },
  { id: "sicepat", name: "SiCepat", logo: "🔴", eta: "1-2 hari", price: 22000, desc: "Cepat & terpercaya" },
  { id: "pos_reg", name: "POS Indonesia", logo: "🏣", eta: "3-5 hari", price: 10000, desc: "Hemat, jangkau pelosok" },
  { id: "tiki_oni", name: "TIKI ONI", logo: "🟡", eta: "1 hari", price: 40000, desc: "Overnight, sampai besok" },
];

let selectedCourier = null;

function goToStep2() {
  const name = document.getElementById("co_name").value.trim();
  const email = document.getElementById("co_email").value.trim();
  const phone = document.getElementById("co_phone").value.trim();
  const address = document.getElementById("co_address").value.trim();
  const city = document.getElementById("co_city").value.trim();
  const province = document.getElementById("co_province").value.trim();
  const postal = document.getElementById("co_postal").value.trim();

  if (!name || !email || !phone || !address || !city || !province || !postal) {
    showToast("Harap lengkapi semua data alamat!", "⚠️"); return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast("Format email tidak valid!", "⚠️"); return;
  }
  // Save buyer profile
  buyerProfile = { name, email, phone, address, city, province, postal };
  saveBuyerProfile();
  renderCourierOptions();
  showCheckoutStep(2);
}

function renderCourierOptions() {
  const container = document.getElementById("courierList");
  container.innerHTML = COURIERS.map(c => `
    <div class="courier-option ${selectedCourier === c.id ? 'selected' : ''}" onclick="selectCourier('${c.id}')">
      <div class="courier-logo">${c.logo}</div>
      <div class="courier-info">
        <strong>${c.name}</strong>
        <small>${c.desc} · Estimasi ${c.eta}</small>
      </div>
      <div class="courier-price">${formatRp(c.price)}</div>
      <div class="courier-check">${selectedCourier === c.id ? '✅' : ''}</div>
    </div>
  `).join("");
}

function selectCourier(id) {
  selectedCourier = id;
  renderCourierOptions();
  updateCoTotal();
}

function updateCoTotal() {
  const courier = COURIERS.find(c => c.id === selectedCourier);
  const ongkir = courier ? courier.price : 0;
  const total = (window._coSubtotal || 0) + ongkir;
  const el = document.getElementById("coTotalDisplay");
  if (el) {
    el.innerHTML = `
      <div class="co-total-row"><span>Subtotal</span><span>${formatRp(window._coSubtotal || 0)}</span></div>
      <div class="co-total-row"><span>Ongkir (${courier ? courier.name : "-"})</span><span>${courier ? formatRp(courier.price) : "-"}</span></div>
      <div class="co-total-row grand"><span>Total</span><span>${formatRp(total)}</span></div>
    `;
  }
  window._coTotal = total;
  window._coOngkir = ongkir;
}

function goToStep3() {
  if (!selectedCourier) {
    showToast("Pilih jasa kurir terlebih dahulu!", "⚠️"); return;
  }
  updateCoTotal();
  // Render final review
  const courier = COURIERS.find(c => c.id === selectedCourier);
  document.getElementById("reviewAddress").innerHTML = `
    <strong>${buyerProfile.name}</strong><br>
    📱 ${buyerProfile.phone} · 📧 ${buyerProfile.email}<br>
    🏠 ${buyerProfile.address}, ${buyerProfile.city}, ${buyerProfile.province} ${buyerProfile.postal}
  `;
  document.getElementById("reviewCourier").innerHTML = `${courier.logo} <strong>${courier.name}</strong> — Estimasi ${courier.eta} · ${formatRp(courier.price)}`;
  renderCheckoutSummary();
  showCheckoutStep(3);
}

function renderPaymentMethods() {
  const methods = [
    { id: "transfer_bca", name: "Transfer BCA", icon: "🏦" },
    { id: "transfer_bni", name: "Transfer BNI", icon: "🏦" },
    { id: "gopay", name: "GoPay", icon: "💚" },
    { id: "ovo", name: "OVO", icon: "🟣" },
    { id: "dana", name: "DANA", icon: "🔵" },
    { id: "visa", name: "VISA/Mastercard", icon: "💳" },
  ];
  return methods.map(m => `
    <label class="payment-radio">
      <input type="radio" name="payMethod" value="${m.id}" />
      <span>${m.icon} ${m.name}</span>
    </label>
  `).join("");
}

function confirmOrder() {
  const payMethod = document.querySelector('input[name="payMethod"]:checked');
  if (!payMethod) { showToast("Pilih metode pembayaran!", "⚠️"); return; }

  const courier = COURIERS.find(c => c.id === selectedCourier);
  const orderId = "ORD-" + Date.now();
  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", { day:"2-digit", month:"long", year:"numeric", hour:"2-digit", minute:"2-digit" });

  const order = {
    id: orderId,
    items: cart.map(c => {
      const p = products.find(x => x.id === c.id);
      return { id: p?.id, name: p?.name || "?", qty: c.qty, price: p?.price || 0, image: p?.image };
    }),
    subtotal: window._coSubtotal || 0,
    ongkir: window._coOngkir || 0,
    total: window._coTotal || 0,
    date: dateStr,
    timestamp: now.getTime(),
    status: "Pesanan Dikonfirmasi",
    payMethod: payMethod.value,
    courier: { id: courier.id, name: courier.name, eta: courier.eta, price: courier.price },
    buyer: { ...buyerProfile },
    resi: null,
    tracking: [
      { status: "Pesanan Dikonfirmasi", time: dateStr, icon: "✅", desc: "Pembayaran berhasil, pesanan kamu sudah dikonfirmasi." }
    ]
  };

  // Reduce stock
  cart.forEach(c => {
    const p = products.find(x => x.id === c.id);
    if (p) { p.stock = Math.max(0, p.stock - c.qty); p.sold = (p.sold || 0) + c.qty; }
  });
  saveProducts();
  orders.unshift(order);
  saveOrders();

  // Admin notification
  const notif = {
    id: "NOTIF-" + Date.now(),
    orderId: order.id,
    buyer: buyerProfile.name,
    phone: buyerProfile.phone,
    email: buyerProfile.email,
    total: order.total,
    items: order.items.length,
    courier: courier.name,
    timestamp: now.getTime(),
    date: dateStr,
    read: false
  };
  adminNotifications.unshift(notif);
  saveNotifications();
  updateAdminNotifBadge();

  cart = [];
  saveCart();
  updateCartBadge();
  closeCheckoutModal();
  renderShop();
  if (isAdmin) { updateDashboard(); renderAdminOrders(); }

  showToast("Pesanan berhasil dibuat! 🎉", "🎉");
  setTimeout(() => showReceipt(order), 400);
}

// ===== RECEIPT =====
function showReceipt(order) {
  const courier = order.courier || {};
  document.getElementById("receiptOrderId").textContent = order.id;
  document.getElementById("receiptDate").textContent = order.date;

  let subtotal = order.subtotal || order.total;
  const rows = order.items.map(item => {
    const lineTotal = item.price * item.qty;
    return `
      <div class="receipt-item-row">
        <div class="receipt-item-name">${item.name}</div>
        <div class="receipt-item-detail">
          <span class="receipt-item-qty">${item.qty} x ${formatRp(item.price)}</span>
          <span class="receipt-item-total">${formatRp(lineTotal)}</span>
        </div>
      </div>`;
  }).join("");

  document.getElementById("receiptItemsList").innerHTML = rows;
  document.getElementById("receiptSubtotal").textContent = formatRp(order.subtotal || order.total);
  document.getElementById("receiptOngkir").textContent = order.ongkir ? formatRp(order.ongkir) : "Gratis 🎉";
  document.getElementById("receiptGrandTotal").textContent = formatRp(order.total);

  // Buyer info
  const buyerEl = document.getElementById("receiptBuyer");
  if (buyerEl && order.buyer) {
    buyerEl.innerHTML = `
      <div class="receipt-buyer-row"><span>Penerima</span><span>${order.buyer.name}</span></div>
      <div class="receipt-buyer-row"><span>Telp</span><span>${order.buyer.phone}</span></div>
      <div class="receipt-buyer-row"><span>Alamat</span><span>${order.buyer.address}, ${order.buyer.city}</span></div>
      <div class="receipt-buyer-row"><span>Kurir</span><span>${courier.name || "-"} (${courier.eta || "-"})</span></div>
    `;
  }

  window._lastOrder = order;
  document.getElementById("receiptOverlay").classList.add("open");
}

function closeReceipt() {
  document.getElementById("receiptOverlay").classList.remove("open");
}

function downloadReceiptJPG() {
  const el = document.getElementById("receiptContent");
  const btn = document.querySelector(".receipt-btn-download");
  if (btn) { btn.textContent = "⏳ Memproses..."; btn.disabled = true; }
  const loadH2C = (cb) => {
    if (typeof html2canvas !== "undefined") { cb(); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    s.onload = cb;
    document.head.appendChild(s);
  };
  loadH2C(() => {
    html2canvas(el, { scale: 2, backgroundColor: "#fff", useCORS: true }).then(canvas => {
      const link = document.createElement("a");
      link.download = `struk-${window._lastOrder?.id || "belanja"}.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.click();
      if (btn) { btn.textContent = "⬇️ Download JPG"; btn.disabled = false; }
    });
  });
}

function sendReceiptWA() {
  const order = window._lastOrder;
  if (!order) return;
  const courier = order.courier || {};
  const items = order.items.map(i => `• ${i.name} x${i.qty} = ${formatRp(i.price * i.qty)}`).join("\n");
  const msg = `🧾 *PESANAN BARU — @benyoriki Store*\n\n` +
    `No. Pesanan: *${order.id}*\n` +
    `Tanggal: ${order.date}\n\n` +
    `*PEMBELI:*\n` +
    `Nama: ${order.buyer?.name || "-"}\n` +
    `Email: ${order.buyer?.email || "-"}\n` +
    `Telepon: ${order.buyer?.phone || "-"}\n` +
    `Alamat: ${order.buyer?.address}, ${order.buyer?.city}, ${order.buyer?.province} ${order.buyer?.postal}\n\n` +
    `*PRODUK:*\n${items}\n\n` +
    `Kurir: ${courier.name || "-"} (${courier.eta || "-"})\n` +
    `Ongkir: ${formatRp(order.ongkir || 0)}\n` +
    `─────────────────\n` +
    `*TOTAL BAYAR: ${formatRp(order.total)}*\n\n` +
    `Mohon segera proses pesanan ini. Terima kasih! 🙏`;
  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/628988995637?text=${encoded}`, "_blank");
}

// ===== PACKAGE TRACKING =====
function openTrackingModal() {
  document.getElementById("trackingModal").classList.add("open");
  document.getElementById("trackingResult").innerHTML = "";
  document.getElementById("trackingInput").value = "";
}

function closeTrackingModal() {
  document.getElementById("trackingModal").classList.remove("open");
}

function trackPackage() {
  const input = document.getElementById("trackingInput").value.trim();
  if (!input) { showToast("Masukkan nomor resi atau ID pesanan!", "⚠️"); return; }

  // Search by resi or order id
  let order = orders.find(o => o.resi === input || o.id === input || o.id.includes(input));
  const result = document.getElementById("trackingResult");

  if (!order) {
    result.innerHTML = `<div class="track-not-found">
      <div class="track-nf-icon">🔍</div>
      <h3>Pesanan tidak ditemukan</h3>
      <p>Pastikan nomor resi atau ID pesanan sudah benar.</p>
    </div>`;
    return;
  }

  const statusColors = {
    "Pesanan Dikonfirmasi": "#0F9E8C",
    "Sedang Dikemas": "#F5B400",
    "Siap Dikirim": "#2563EB",
    "Dalam Pengiriman": "#5B21B6",
    "Tiba di Kota Tujuan": "#0EA5A0",
    "Dalam Proses Pengiriman Terakhir": "#ec4899",
    "Paket Tiba": "#0F9E8C",
  };

  const trackingHTML = order.tracking.map((t, i) => `
    <div class="track-step ${i === 0 ? 'current' : ''}">
      <div class="track-icon-wrap">
        <div class="track-dot" style="background: ${statusColors[t.status] || '#9997A8'}"></div>
        ${i < order.tracking.length - 1 ? '<div class="track-line"></div>' : ''}
      </div>
      <div class="track-info">
        <div class="track-status" style="color: ${statusColors[t.status] || '#6B6B7A'}">${t.icon} ${t.status}</div>
        <div class="track-desc">${t.desc}</div>
        <div class="track-time">🕐 ${t.time}</div>
      </div>
    </div>
  `).join("");

  result.innerHTML = `
    <div class="track-header">
      <div class="track-order-id">📋 ${order.id}</div>
      <div class="track-buyer">👤 ${order.buyer?.name || "-"} · ${order.buyer?.city || "-"}</div>
      ${order.resi ? `<div class="track-resi">📦 Resi: <strong>${order.resi}</strong></div>` : '<div class="track-resi awaiting">⏳ Menunggu nomor resi dari admin</div>'}
      <div class="track-courier">🚚 ${order.courier?.name || "-"} — Estimasi ${order.courier?.eta || "-"}</div>
    </div>
    <div class="track-timeline">${trackingHTML}</div>
  `;
}

// ===== MY ORDERS (buyer history) =====
function openMyOrders() {
  document.getElementById("myOrdersModal").classList.add("open");
  renderMyOrders();
}

function closeMyOrders() {
  document.getElementById("myOrdersModal").classList.remove("open");
}

function renderMyOrders() {
  const container = document.getElementById("myOrdersList");
  if (orders.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">📦</div><h3>Belum ada pesanan</h3><p>Yuk mulai belanja!</p></div>`;
    return;
  }

  const statusIcon = {
    "Pesanan Dikonfirmasi": "✅",
    "Sedang Dikemas": "📦",
    "Siap Dikirim": "🏷️",
    "Dalam Pengiriman": "🚚",
    "Tiba di Kota Tujuan": "🏙️",
    "Dalam Proses Pengiriman Terakhir": "🛵",
    "Paket Tiba": "🎉",
  };
  const statusColor = {
    "Pesanan Dikonfirmasi": "#0F9E8C",
    "Sedang Dikemas": "#F5B400",
    "Siap Dikirim": "#2563EB",
    "Dalam Pengiriman": "#5B21B6",
    "Tiba di Kota Tujuan": "#0EA5A0",
    "Dalam Proses Pengiriman Terakhir": "#ec4899",
    "Paket Tiba": "#0F9E8C",
  };

  container.innerHTML = orders.map(o => `
    <div class="my-order-card">
      <div class="my-order-header">
        <span class="my-order-id">📋 ${o.id}</span>
        <span class="my-order-status" style="color:${statusColor[o.status] || '#6B6B7A'}">${statusIcon[o.status] || '⏳'} ${o.status}</span>
      </div>
      <div class="my-order-items">${o.items.slice(0, 2).map(i => `<span>${i.name} ×${i.qty}</span>`).join(" · ")}${o.items.length > 2 ? ` +${o.items.length - 2} lainnya` : ""}</div>
      <div class="my-order-footer">
        <span class="my-order-total">${formatRp(o.total)}</span>
        <span class="my-order-date">📅 ${o.date}</span>
      </div>
      ${o.resi ? `<div class="my-order-resi">📦 Resi: <strong>${o.resi}</strong></div>` : '<div class="my-order-resi awaiting">⏳ Menunggu nomor resi</div>'}
      <div class="my-order-actions">
        <button onclick="trackOrderDirect('${o.id}')" class="btn-track-order">🔍 Lacak Paket</button>
        <button onclick="showReceipt(orders.find(x=>x.id==='${o.id}'))" class="btn-view-receipt">🧾 Lihat Struk</button>
      </div>
    </div>
  `).join("");
}

function trackOrderDirect(orderId) {
  closeMyOrders();
  openTrackingModal();
  document.getElementById("trackingInput").value = orderId;
  trackPackage();
}

// ===== PRODUCT MODAL =====
function openModal(idx) {
  const p = products[idx];
  if (!p) return;
  const disc = discountPct(p.price, p.origPrice);
  document.getElementById("modalContent").innerHTML = `
    <img class="modal-product-img" src="${p.image}" alt="${p.name}" onerror="this.src='https://placehold.co/520x280/f1f5f9/94a3b8?text=No+Image'" />
    <div class="modal-product-body">
      <div class="modal-product-cat">📂 ${p.category} ${p.flash ? "• ⚡ Flash Sale" : ""}</div>
      <h2>${p.name}</h2>
      <div class="modal-product-rating">${renderStars(p.rating)} ${p.rating} · ${(p.sold||0).toLocaleString("id-ID")} terjual</div>
      <div class="modal-product-price">${formatRp(p.price)} ${disc > 0 ? `<span style="background:#fee2e2;color:#E11D48;padding:3px 8px;border-radius:6px;font-size:.75rem;font-weight:700;margin-left:6px;">-${disc}%</span>` : ""}</div>
      ${p.origPrice ? `<div class="modal-orig-price">${formatRp(p.origPrice)}</div>` : ""}
      <div class="modal-stock">📦 Stok: <strong>${p.stock} tersedia</strong></div>
      <div class="modal-product-desc">${p.desc || "Produk berkualitas tinggi."}</div>
      <div class="modal-qty-row">
        <label>Jumlah:</label>
        <div class="modal-qty-ctrl">
          <button class="qty-btn" onclick="modalQty(-1)">−</button>
          <span class="qty-num" id="modalQtyNum">1</span>
          <button class="qty-btn" onclick="modalQty(1)">+</button>
        </div>
      </div>
      <div class="modal-actions">
        <button class="modal-btn-cart" onclick="modalAddCart(${p.id})" ${p.stock<=0?"disabled":""}>🛒 Keranjang</button>
        <button class="modal-btn-buy" onclick="modalBuyNow(${p.id})" ${p.stock<=0?"disabled":""}>⚡ Beli Sekarang</button>
      </div>
    </div>
  `;
  window._modalProductId = p.id;
  window._modalQty = 1;
  window._modalMaxQty = p.stock;
  document.getElementById("productModal").classList.add("open");
}

function modalQty(delta) {
  const newQty = (window._modalQty || 1) + delta;
  if (newQty < 1 || newQty > (window._modalMaxQty || 99)) return;
  window._modalQty = newQty;
  document.getElementById("modalQtyNum").textContent = newQty;
}

function modalAddCart(id) {
  const qty = window._modalQty || 1;
  const p = products.find(x => x.id === id);
  if (!p || p.stock <= 0) return;
  const existing = cart.find(c => c.id === id);
  if (existing) { existing.qty = Math.min(existing.qty + qty, p.stock); }
  else { cart.push({ id, qty }); }
  saveCart(); updateCartBadge(); closeModal();
  showToast(`${p.name} ditambahkan ke keranjang!`, "🛒");
}

function modalBuyNow(id) {
  modalAddCart(id);
  setTimeout(openCart, 300);
}

function closeModal(e) {
  if (!e || e.target === document.getElementById("productModal") || !e.target) {
    document.getElementById("productModal").classList.remove("open");
  }
}

// ===== ADMIN =====
function handleAdminClick() {
  if (isAdmin) showPage("admin");
  else document.getElementById("loginModal").classList.add("open");
}

function doLogin() {
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value;
  if (user === "admin" && pass === "6969") {
    isAdmin = true;
    closeLoginModal();
    const btn = document.getElementById("adminToggle");
    btn.textContent = "⚙️ Panel Admin";
    btn.classList.add("admin-visible");
    showPage("admin");
    updateDashboard();
    renderAdminProducts();
    renderAdminOrders();
    renderAdminNotifications();
    showToast("Selamat datang, Admin! 👋", "🔑");
  } else {
    showToast("Username atau password salah!", "❌");
    document.getElementById("loginPass").value = "";
    document.getElementById("loginPass").focus();
  }
}

function closeLoginModal(e) {
  if (!e || e.target === document.getElementById("loginModal") || !e.target) {
    document.getElementById("loginModal").classList.remove("open");
  }
}

function logout() {
  isAdmin = false;
  document.getElementById("adminToggle").textContent = "⚙️ Admin";
  document.getElementById("adminToggle").classList.remove("admin-visible");
  showPage("shop");
  showToast("Berhasil keluar dari panel admin", "👋");
}

// ===== ADMIN TABS =====
function showAdminTab(tab, btn) {
  document.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".admin-nav-btn").forEach(b => b.classList.remove("active"));
  document.getElementById("tab-" + tab).classList.add("active");
  if (btn) btn.classList.add("active");
  if (tab === "products") renderAdminProducts();
  if (tab === "orders") renderAdminOrders();
  if (tab === "dashboard") updateDashboard();
  if (tab === "notifications") renderAdminNotifications();
  if (tab === "addProduct") { resetForm(); document.getElementById("addProductTitle").textContent = "➕ Tambah Produk Baru"; }
}

// ===== ADMIN NOTIFICATIONS =====
function updateAdminNotifBadge() {
  const unread = adminNotifications.filter(n => !n.read).length;
  const badge = document.getElementById("adminNotifBadge");
  if (badge) {
    badge.textContent = unread;
    badge.style.display = unread > 0 ? "flex" : "none";
  }
}

function renderAdminNotifications() {
  const container = document.getElementById("notifList");
  if (!container) return;
  if (adminNotifications.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">🔔</div><h3>Tidak ada notifikasi</h3></div>`;
    return;
  }
  container.innerHTML = adminNotifications.map(n => `
    <div class="notif-card ${n.read ? 'read' : 'unread'}" onclick="markNotifRead('${n.id}')">
      <div class="notif-icon">${n.read ? '📩' : '🔔'}</div>
      <div class="notif-body">
        <div class="notif-title">Pesanan Baru dari <strong>${n.buyer}</strong></div>
        <div class="notif-detail">📋 ${n.orderId} · ${n.items} item · ${formatRp(n.total)}</div>
        <div class="notif-detail">🚚 ${n.courier} · 📱 ${n.phone}</div>
        <div class="notif-time">🕐 ${n.date}</div>
      </div>
      <div class="notif-actions">
        <button onclick="notifSendWA(event, '${n.orderId}')" class="btn-notif-wa">💬 WA</button>
      </div>
    </div>
  `).join("");
  // Mark all as read
  adminNotifications.forEach(n => n.read = true);
  saveNotifications();
  updateAdminNotifBadge();
}

function markNotifRead(id) {
  const n = adminNotifications.find(x => x.id === id);
  if (n) { n.read = true; saveNotifications(); updateAdminNotifBadge(); }
}

function notifSendWA(e, orderId) {
  e.stopPropagation();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;
  const items = order.items.map(i => `• ${i.name} x${i.qty} = ${formatRp(i.price * i.qty)}`).join("\n");
  const msg = `🔔 *NOTIFIKASI PESANAN BARU*\n\n` +
    `No Pesanan: *${order.id}*\n` +
    `Tanggal: ${order.date}\n\n` +
    `Pembeli: ${order.buyer?.name}\n` +
    `Email: ${order.buyer?.email}\n` +
    `Telepon: ${order.buyer?.phone}\n` +
    `Alamat: ${order.buyer?.address}, ${order.buyer?.city}, ${order.buyer?.province}\n\n` +
    `Produk:\n${items}\n\n` +
    `Kurir: ${order.courier?.name} (${order.courier?.eta})\n` +
    `Ongkir: ${formatRp(order.ongkir || 0)}\n` +
    `*TOTAL: ${formatRp(order.total)}*\n\n` +
    `Metode Bayar: ${order.payMethod || "-"}`;
  window.open(`https://wa.me/628988995637?text=${encodeURIComponent(msg)}`, "_blank");
}

// ===== ADMIN ORDERS WITH TRACKING MANAGEMENT =====
function renderAdminOrders() {
  const container = document.getElementById("ordersList");
  if (orders.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">📭</div><h3>Belum ada pesanan</h3></div>`;
    return;
  }

  const statusOptions = ["Pesanan Dikonfirmasi", "Sedang Dikemas", "Siap Dikirim", "Dalam Pengiriman", "Tiba di Kota Tujuan", "Dalam Proses Pengiriman Terakhir", "Paket Tiba"];
  const statusColors = { "Pesanan Dikonfirmasi": "#0F9E8C", "Sedang Dikemas": "#F5B400", "Siap Dikirim": "#2563EB", "Dalam Pengiriman": "#5B21B6", "Tiba di Kota Tujuan": "#0EA5A0", "Dalam Proses Pengiriman Terakhir": "#ec4899", "Paket Tiba": "#0F9E8C" };

  container.innerHTML = orders.map((o, oi) => `
    <div class="admin-order-card">
      <div class="admin-order-header">
        <div>
          <span class="order-id">📋 ${o.id}</span>
          <span class="order-date">📅 ${o.date}</span>
        </div>
        <span class="order-status-badge" style="background:${statusColors[o.status] || '#9997A8'}20;color:${statusColors[o.status] || '#6B6B7A'};border:1px solid ${statusColors[o.status] || '#9997A8'}40">${o.status}</span>
      </div>
      <div class="admin-order-buyer">
        <strong>👤 ${o.buyer?.name || "-"}</strong> · 📱 ${o.buyer?.phone || "-"} · 📧 ${o.buyer?.email || "-"}<br>
        🏠 ${o.buyer?.address || "-"}, ${o.buyer?.city || "-"}, ${o.buyer?.province || "-"}
      </div>
      <div class="admin-order-items">${o.items.map(i => `${i.name} ×${i.qty}`).join(" · ")}</div>
      <div class="admin-order-money">
        💰 Subtotal: ${formatRp(o.subtotal || o.total)} · 🚚 Ongkir: ${formatRp(o.ongkir || 0)} · <strong>Total: ${formatRp(o.total)}</strong>
        <br>🚚 ${o.courier?.name || "-"} (${o.courier?.eta || "-"}) · 💳 ${o.payMethod || "-"}
      </div>
      <div class="admin-order-controls">
        <div class="resi-input-group">
          <input type="text" id="resi_${o.id}" value="${o.resi || ""}" placeholder="Masukkan nomor resi..." class="resi-input" />
          <button onclick="saveResi('${o.id}')" class="btn-save-resi">💾 Simpan Resi</button>
          ${o.resi ? `<button onclick="sendResiWA('${o.id}')" class="btn-wa-resi">💬 Kirim Resi WA</button>` : ""}
        </div>
        <div class="status-update-group">
          <select id="status_${o.id}" class="status-select">
            ${statusOptions.map(s => `<option value="${s}" ${o.status === s ? "selected" : ""}>${s}</option>`).join("")}
          </select>
          <button onclick="updateOrderStatus('${o.id}')" class="btn-update-status">✅ Update Status</button>
        </div>
      </div>
    </div>
  `).join("");
}

function saveResi(orderId) {
  const input = document.getElementById(`resi_${orderId}`);
  const resi = input?.value.trim();
  if (!resi) { showToast("Masukkan nomor resi terlebih dahulu!", "⚠️"); return; }
  const order = orders.find(o => o.id === orderId);
  if (!order) return;
  order.resi = resi;
  saveOrders();
  showToast(`Resi ${resi} berhasil disimpan!`, "✅");
  renderAdminOrders();
}

function sendResiWA(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order || !order.resi) return;
  const msg = `📦 *INFO NOMOR RESI PAKET KAMU*\n\n` +
    `Halo ${order.buyer?.name},\n\n` +
    `Pesananmu sudah dikirim! Berikut detail pengiriman:\n\n` +
    `📋 No. Pesanan: *${order.id}*\n` +
    `🚚 Kurir: *${order.courier?.name}*\n` +
    `📦 No. Resi: *${order.resi}*\n` +
    `⏱️ Estimasi: ${order.courier?.eta}\n\n` +
    `Lacak paketmu di website kami menggunakan nomor resi atau ID pesanan.\n\n` +
    `Terima kasih sudah belanja di @benyoriki Store! 🙏`;
  const phone = order.buyer?.phone?.replace(/\D/g, "").replace(/^0/, "62");
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
}

function updateOrderStatus(orderId) {
  const select = document.getElementById(`status_${orderId}`);
  if (!select) return;
  const newStatus = select.value;
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const statusIcons = {
    "Pesanan Dikonfirmasi": "✅", "Sedang Dikemas": "📦", "Siap Dikirim": "🏷️",
    "Dalam Pengiriman": "🚚", "Tiba di Kota Tujuan": "🏙️",
    "Dalam Proses Pengiriman Terakhir": "🛵", "Paket Tiba": "🎉"
  };
  const statusDesc = {
    "Pesanan Dikonfirmasi": "Pembayaran berhasil dikonfirmasi, pesananmu sedang diproses.",
    "Sedang Dikemas": "Produk sedang dikemas dengan aman oleh tim kami.",
    "Siap Dikirim": "Paket sudah siap dan menunggu penjemputan kurir.",
    "Dalam Pengiriman": "Paket sudah di-pickup dan dalam perjalanan.",
    "Tiba di Kota Tujuan": "Paket sudah tiba di kota tujuan.",
    "Dalam Proses Pengiriman Terakhir": "Paket sedang dalam proses pengiriman ke alamatmu.",
    "Paket Tiba": "Paket berhasil diterima di alamat tujuan. Terima kasih! 🎉"
  };

  order.status = newStatus;
  const now = new Date();
  const timeStr = now.toLocaleDateString("id-ID", { day:"2-digit", month:"long", year:"numeric", hour:"2-digit", minute:"2-digit" });
  // Add to tracking if not duplicate last step
  const lastTrack = order.tracking[0];
  if (!lastTrack || lastTrack.status !== newStatus) {
    order.tracking.unshift({
      status: newStatus,
      time: timeStr,
      icon: statusIcons[newStatus] || "📍",
      desc: statusDesc[newStatus] || "Status diperbarui oleh admin."
    });
  }
  saveOrders();
  showToast(`Status diperbarui: ${newStatus}`, "✅");
  renderAdminOrders();
  updateDashboard();
}

// ===== ADMIN PRODUCT LIST =====
function renderAdminProducts(filter = "") {
  const list = document.getElementById("adminProductList");
  const filtered = products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
  if (filtered.length === 0) { list.innerHTML = `<p class="empty-msg">Tidak ada produk.</p>`; return; }
  list.innerHTML = filtered.map((p) => {
    const realIdx = products.indexOf(p);
    const disc = discountPct(p.price, p.origPrice);
    return `
      <div class="admin-product-row">
        <img src="${p.image}" alt="${p.name}" onerror="this.src='https://placehold.co/60x60/f1f5f9/94a3b8?text=?'" />
        <div class="admin-product-info">
          <h4>${p.name}</h4>
          <p>${p.category} · ${formatRp(p.price)} ${disc > 0 ? `(-${disc}%)` : ""} · Stok: ${p.stock} · Terjual: ${p.sold || 0}</p>
        </div>
        <div class="admin-product-actions">
          <button class="btn-edit" onclick="editProduct(${realIdx})">✏️ Edit</button>
          <button class="btn-delete" onclick="deleteProduct(${realIdx})">🗑️ Hapus</button>
        </div>
      </div>
    `;
  }).join("");
}

function adminSearch(q) { renderAdminProducts(q); }

// ===== ADD / EDIT PRODUCT =====
function saveProduct() {
  const name = document.getElementById("pName").value.trim();
  const category = document.getElementById("pCategory").value;
  const price = parseInt(document.getElementById("pPrice").value);
  const origPrice = parseInt(document.getElementById("pOrigPrice").value) || null;
  const stock = parseInt(document.getElementById("pStock").value);
  const rating = parseFloat(document.getElementById("pRating").value) || 4.5;
  const desc = document.getElementById("pDesc").value.trim();
  const image = document.getElementById("pImage").value.trim();
  const flash = document.getElementById("pFlash").checked;
  const editIdx = parseInt(document.getElementById("editIndex").value);
  if (!name || !category || isNaN(price) || isNaN(stock) || !image) { showToast("Harap isi semua kolom wajib!", "⚠️"); return; }
  if (editIdx >= 0) {
    products[editIdx] = { ...products[editIdx], name, category, price, origPrice, stock, rating, desc, image, flash };
    showToast("Produk berhasil diperbarui!", "✅");
  } else {
    products.push({ id: Date.now(), name, category, price, origPrice, stock, rating, desc, image, flash, sold: 0, createdAt: Date.now() });
    showToast("Produk berhasil ditambahkan!", "✅");
  }
  saveProducts(); resetForm(); renderShop(); updateDashboard();
  showAdminTab("products", document.querySelectorAll(".admin-nav-btn")[1]);
}

function editProduct(idx) {
  const p = products[idx];
  if (!p) return;
  document.getElementById("editIndex").value = idx;
  document.getElementById("pName").value = p.name;
  document.getElementById("pCategory").value = p.category;
  document.getElementById("pPrice").value = p.price;
  document.getElementById("pOrigPrice").value = p.origPrice || "";
  document.getElementById("pStock").value = p.stock;
  document.getElementById("pRating").value = p.rating;
  document.getElementById("pDesc").value = p.desc || "";
  document.getElementById("pImage").value = p.image;
  document.getElementById("pFlash").checked = p.flash;
  document.getElementById("addProductTitle").textContent = "✏️ Edit Produk";
  previewImage();
  showAdminTab("addProduct", document.querySelectorAll(".admin-nav-btn")[2]);
}

function deleteProduct(idx) {
  const p = products[idx];
  if (!p || !confirm(`Hapus produk "${p.name}"?`)) return;
  products.splice(idx, 1);
  saveProducts(); renderAdminProducts(); renderShop(); updateDashboard();
  showToast("Produk dihapus!", "🗑️");
}

function resetForm() {
  document.getElementById("editIndex").value = -1;
  ["pName","pPrice","pOrigPrice","pStock","pRating","pDesc","pImage"].forEach(id => document.getElementById(id).value = "");
  document.getElementById("pCategory").value = "";
  document.getElementById("pFlash").checked = false;
  document.getElementById("imgPreview").style.display = "none";
  document.getElementById("imgPlaceholder").style.display = "block";
  document.getElementById("addProductTitle").textContent = "➕ Tambah Produk Baru";
}

function previewImage() {
  const url = document.getElementById("pImage").value;
  const preview = document.getElementById("imgPreview");
  const placeholder = document.getElementById("imgPlaceholder");
  if (url) { preview.src = url; preview.style.display = "block"; placeholder.style.display = "none"; }
  else { preview.style.display = "none"; placeholder.style.display = "block"; }
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { showToast("File terlalu besar! Maks 5MB", "⚠️"); return; }
  const reader = new FileReader();
  reader.onload = (ev) => { document.getElementById("pImage").value = ev.target.result; previewImage(); showToast("Gambar berhasil diupload!", "📸"); };
  reader.readAsDataURL(file);
}

// ===== DASHBOARD =====
function updateDashboard() {
  document.getElementById("dashProducts").textContent = products.length;
  document.getElementById("dashOrders").textContent = orders.length;
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);
  document.getElementById("dashRevenue").textContent = formatRp(revenue);
  document.getElementById("dashVisitors").textContent = Math.floor(Math.random() * 900 + 100).toLocaleString("id-ID");

  const pendingOrders = orders.filter(o => o.status !== "Paket Tiba").length;
  const pendingEl = document.getElementById("dashPending");
  if (pendingEl) pendingEl.textContent = pendingOrders;

  const recentEl = document.getElementById("recentOrdersList");
  if (orders.length === 0) {
    recentEl.innerHTML = `<p class="empty-msg">Belum ada pesanan masuk.</p>`;
  } else {
    recentEl.innerHTML = orders.slice(0, 5).map(o => `
      <div class="recent-order-row">
        <div>
          <strong style="color:var(--text)">${o.id}</strong><br>
          <small style="color:var(--text-muted)">${o.items.length} item · ${o.buyer?.name || "-"} · ${o.date}</small>
        </div>
        <div style="text-align:right">
          <strong style="color:var(--primary)">${formatRp(o.total)}</strong><br>
          <small style="color:var(--success)">${o.status}</small>
        </div>
      </div>
    `).join("");
  }
  renderAdminNotifications();
}

// ===== PAGE NAVIGATION =====
function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const target = document.getElementById(page + "Page");
  if (!target) return;
  target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (page === "wishlist") renderWishlist();
  if (page === "admin" && !isAdmin) { handleAdminClick(); return; }
  document.querySelectorAll(".bn-item[data-bn]").forEach(el => {
    el.classList.toggle("active", el.dataset.bn === page);
  });
}

// ===== MOBILE DRAWER =====
function openMobileDrawer() {
  document.getElementById("mobileDrawer").classList.add("open");
  document.getElementById("mobileDrawerOverlay").classList.add("open");
}
function closeMobileDrawer() {
  document.getElementById("mobileDrawer").classList.remove("open");
  document.getElementById("mobileDrawerOverlay").classList.remove("open");
}

// ===== BOTTOM NAV HELPERS =====
function bnGoHome() {
  showPage("shop");
}
function bnGoCategories() {
  showPage("shop");
  setTimeout(() => {
    const el = document.getElementById("categoryNav");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 350);
}

// ===== COUNTDOWN TIMER =====
function updateCountdown() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 0);
  const diff = end - now;
  const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
  const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
  const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
  const el = document.getElementById("countdown");
  if (el) {
    el.innerHTML = `<span class="countdown-segs"><span class="countdown-seg">${h}</span><span class="countdown-sep">:</span><span class="countdown-seg">${m}</span><span class="countdown-sep">:</span><span class="countdown-seg">${s}</span></span>`;
  }
}

// ===== AI CHATBOT =====
function toggleChatbot() {
  const container = document.getElementById("chatbotContainer");
  const overlay = document.getElementById("chatbotOverlay");
  const isOpen = container.classList.contains("open");
  container.classList.toggle("open");
  overlay.classList.toggle("open");
  if (!isOpen) {
    document.getElementById("chatFabBadge").style.display = "none";
    setTimeout(() => { const msgs = document.getElementById("chatMessages"); msgs.scrollTop = msgs.scrollHeight; }, 300);
  }
}

function closeChatbot(e) {
  if (!e || e.target === document.getElementById("chatbotOverlay")) {
    document.getElementById("chatbotContainer").classList.remove("open");
    document.getElementById("chatbotOverlay").classList.remove("open");
  }
}

function clearChat() {
  chatHistory = [];
  document.getElementById("chatMessages").innerHTML = `
    <div class="chat-msg bot">
      <div class="chat-bubble"><p>Chat direset. Halo lagi! Saya <strong>Benyo AI</strong> 👋</p><p>Ada yang bisa saya bantu?</p></div>
      <div class="chat-time">Asisten AI</div>
    </div>
    <div class="chat-quick-btns">
      <button onclick="quickChat('Produk apa yang lagi promo?')">🔥 Promo terbaru</button>
      <button onclick="quickChat('Cara lacak paket saya?')">📦 Lacak Paket</button>
      <button onclick="quickChat('Cara melakukan pembayaran?')">💳 Cara bayar</button>
      <button onclick="quickChat('Produk fashion terpopuler')">👗 Fashion</button>
    </div>
  `;
}

function quickChat(text) {
  document.getElementById("chatInput").value = text;
  sendChat();
}

function addChatMessage(role, text) {
  const msgs = document.getElementById("chatMessages");
  const isUser = role === "user";
  const time = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  const div = document.createElement("div");
  div.className = `chat-msg ${isUser ? "user" : "bot"}`;
  const formatted = isUser ? text : text.replace(/\n/g, "<br>");
  div.innerHTML = `<div class="chat-bubble">${isUser ? text : `<p>${formatted}</p>`}</div><div class="chat-time">${time}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function buildProductContext() {
  const flashItems = products.filter(p => p.flash && p.stock > 0).slice(0, 5);
  const topRated = [...products].sort((a,b) => (b.rating||0) - (a.rating||0)).slice(0, 5);
  const categories = [...new Set(products.map(p => p.category))];
  return `Kamu adalah asisten belanja AI bernama "Benyo AI" untuk @benyoriki Store di Indonesia.

Info Toko:
- Total produk: ${products.length} | Kategori: ${categories.join(", ")}
- Pengiriman: JNE, J&T, SiCepat, TIKI, POS Indonesia
- Return 30 hari | Rating toko: 4.9/5
- Pembayaran: VISA, Mastercard, Transfer Bank, GoPay, OVO, DANA

Cara Belanja: Tambah keranjang → Bayar → Isi Alamat & Email → Pilih Kurir → Konfirmasi → Selesai
Lacak Paket: Klik tombol 🔍 Lacak Paket di header, masukkan nomor resi atau ID pesanan.

Flash Sale (${flashItems.length} produk):
${flashItems.map(p => `- ${p.name}: ${formatRp(p.price)}, stok: ${p.stock}`).join("\n")}

Top rated:
${topRated.map(p => `- ${p.name}: ${formatRp(p.price)}, rating: ${p.rating}`).join("\n")}

Jawab dalam bahasa Indonesia, ramah, singkat 3-4 kalimat, gunakan emoji sesekali.`;
}

async function sendChat() {
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  addChatMessage("user", text);
  chatHistory.push({ role: "user", content: text });
  const typing = document.getElementById("chatTyping");
  typing.style.display = "flex";
  document.getElementById("chatMessages").scrollTop = document.getElementById("chatMessages").scrollHeight;
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: buildProductContext(), messages: chatHistory.slice(-10) })
    });
    const data = await response.json();
    typing.style.display = "none";
    if (data.content && data.content[0]) {
      const reply = data.content[0].text;
      addChatMessage("bot", reply);
      chatHistory.push({ role: "assistant", content: reply });
    } else { throw new Error(data.error?.message || "API error"); }
  } catch (err) {
    typing.style.display = "none";
    addChatMessage("bot", getOfflineReply(text));
    chatHistory.push({ role: "assistant", content: getOfflineReply(text) });
  }
}

function getOfflineReply(text) {
  const lower = text.toLowerCase();
  if (lower.includes("lacak") || lower.includes("resi") || lower.includes("tracking")) return `📦 Untuk melacak paket, klik tombol 🔍 *Lacak Paket* di header, lalu masukkan nomor resi atau ID pesanan kamu. Nomor resi akan dikirim admin via WhatsApp setelah paket dikirim!`;
  if (lower.includes("promo") || lower.includes("flash")) return `🔥 Flash Sale sekarang:\n${products.filter(p=>p.flash&&p.stock>0).slice(0,3).map(p=>`• ${p.name} — ${formatRp(p.price)}`).join("\n")}\n\nBuruan sebelum kehabisan! ⚡`;
  if (lower.includes("bayar") || lower.includes("pembayaran")) return `💳 Metode pembayaran: Transfer BCA/BNI, GoPay, OVO, DANA, VISA/Mastercard. Semua transaksi aman! 🔒`;
  if (lower.includes("ongkir") || lower.includes("kurir") || lower.includes("kirim")) return `🚚 Tersedia kurir JNE, J&T, SiCepat, TIKI, dan POS Indonesia. Pilih sesuai kebutuhanmu saat checkout! Estimasi 1-5 hari kerja.`;
  return `Terima kasih sudah bertanya! 😊 Kami punya ${products.length} produk pilihan. Tanya tentang produk, promo, kurir, atau cara lacak paket ya!`;
}

// ===== KEYBOARD SHORTCUTS =====
let _secretBuf = "";
let _secretTimer = null;
document.addEventListener("keydown", e => {
  if (e.key === "Enter" && document.getElementById("loginModal").classList.contains("open")) doLogin();
  if (e.key === "Escape") { closeModal(); closeLoginModal(); closeChatbot(); closeCart(); closeReceipt(); closeCheckoutModal(); closeTrackingModal(); closeMyOrders(); }
  if (e.key.length === 1) {
    _secretBuf += e.key.toLowerCase();
    if (_secretBuf.length > 12) _secretBuf = _secretBuf.slice(-12);
    clearTimeout(_secretTimer);
    _secretTimer = setTimeout(() => { _secretBuf = ""; }, 3000);
    if (_secretBuf.includes("benyoadmin")) {
      _secretBuf = "";
      if (!isAdmin) { document.getElementById("loginModal").classList.add("open"); setTimeout(() => { const u = document.getElementById("loginUser"); if (u) u.focus(); }, 100); }
    }
  }
});

let _logoClickCount = 0;
let _logoClickTimer = null;
window.adminSecretLogoClick = function() {
  _logoClickCount++;
  clearTimeout(_logoClickTimer);
  _logoClickTimer = setTimeout(() => { _logoClickCount = 0; }, 2000);
  if (_logoClickCount >= 5) {
    _logoClickCount = 0;
    if (!isAdmin) { document.getElementById("loginModal").classList.add("open"); setTimeout(() => { const u = document.getElementById("loginUser"); if (u) u.focus(); }, 100); }
    else showPage("admin");
  }
};

// ===== USER ACCOUNT SYSTEM =====
const AVATAR_SETS = {
  L: ["👦", "🧑‍🎓", "🧑‍💻", "🕵️‍♂️", "🧑‍🚀", "🥷"],
  P: ["👧", "🧑‍🎓", "🧑‍💻", "🕵️‍♀️", "🧑‍🚀", "🧜‍♀️"],
  X: ["🧑", "🧑‍🎓", "🧑‍💻", "🕵️", "🧑‍🚀", "🧑‍🎨"],
};
const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#FF4D2E,#F5B400)",
  "linear-gradient(135deg,#4C1D95,#2563EB)",
  "linear-gradient(135deg,#0F9E8C,#0EA5A0)",
  "linear-gradient(135deg,#E11D48,#F5B400)",
  "linear-gradient(135deg,#2563EB,#0EA5A0)",
  "linear-gradient(135deg,#5B21B6,#E11D48)",
];

let regMethod = "email";
let regGender = null;
let regAvatarIndex = null;

function avatarHtml(user, size) {
  size = size || 24;
  const idx = (user && typeof user.avatarIndex === "number") ? user.avatarIndex : 0;
  const emoji = (AVATAR_SETS[user?.gender || "X"] || AVATAR_SETS.X)[idx] || "🧑";
  const bg = AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length];
  return `<span class="avatar-emoji-inner" style="display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border-radius:50%;background:${bg};font-size:${Math.round(size*0.55)}px;line-height:1;flex-shrink:0;">${emoji}</span>`;
}

function setRegMethod(method) {
  regMethod = method;
  document.getElementById("methodEmailBtn").classList.toggle("active", method === "email");
  document.getElementById("methodPhoneBtn").classList.toggle("active", method === "phone");
  const label = document.getElementById("regIdLabel");
  const input = document.getElementById("regId");
  if (method === "email") {
    label.textContent = "Email"; input.type = "email"; input.placeholder = "email@kamu.com";
  } else {
    label.textContent = "Nomor HP"; input.type = "tel"; input.placeholder = "08xxxxxxxxxx";
  }
}

function setRegGender(gender) {
  regGender = gender;
  regAvatarIndex = null;
  ["genderMaleBtn", "genderFemaleBtn", "genderOtherBtn"].forEach(id => document.getElementById(id).classList.remove("active"));
  const map = { L: "genderMaleBtn", P: "genderFemaleBtn", X: "genderOtherBtn" };
  document.getElementById(map[gender]).classList.add("active");
  renderAvatarPicker(gender);
}

function renderAvatarPicker(gender) {
  const wrap = document.getElementById("avatarPickerWrap");
  const picker = document.getElementById("avatarPicker");
  wrap.style.display = "block";
  const set = AVATAR_SETS[gender] || AVATAR_SETS.X;
  picker.innerHTML = set.map((emoji, i) => `
    <div class="avatar-option" data-i="${i}" style="background:${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]}" onclick="selectRegAvatar(${i})">${emoji}</div>
  `).join("");
}

function selectRegAvatar(i) {
  regAvatarIndex = i;
  document.querySelectorAll("#avatarPicker .avatar-option").forEach(el => {
    el.classList.toggle("selected", parseInt(el.dataset.i) === i);
  });
}

function openAuthModal() {
  document.getElementById("authModal").classList.add("open");
  switchAuthTab("login");
}
function closeAuthModal(event) {
  if (event && event.target !== event.currentTarget) return;
  document.getElementById("authModal").classList.remove("open");
}
function switchAuthTab(tab) {
  document.getElementById("authTabLoginBtn").classList.toggle("active", tab === "login");
  document.getElementById("authTabRegisterBtn").classList.toggle("active", tab === "register");
  document.getElementById("authPanelLogin").classList.toggle("active", tab === "login");
  document.getElementById("authPanelRegister").classList.toggle("active", tab === "register");
}

function doUserRegister() {
  const name = document.getElementById("regName").value.trim();
  const id = document.getElementById("regId").value.trim();
  const pass = document.getElementById("regPass").value;
  const pass2 = document.getElementById("regPass2").value;

  if (!name) { showToast("Nama lengkap wajib diisi!", "⚠️"); return; }
  if (!id) { showToast(regMethod === "email" ? "Email wajib diisi!" : "Nomor HP wajib diisi!", "⚠️"); return; }
  if (regMethod === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(id)) { showToast("Format email tidak valid!", "⚠️"); return; }
  if (regMethod === "phone" && !/^[0-9+]{9,15}$/.test(id)) { showToast("Format nomor HP tidak valid!", "⚠️"); return; }
  if (pass.length < 6) { showToast("Password minimal 6 karakter!", "⚠️"); return; }
  if (pass !== pass2) { showToast("Konfirmasi password tidak sama!", "⚠️"); return; }
  if (!regGender) { showToast("Pilih jenis kelamin dulu ya!", "⚠️"); return; }
  if (regAvatarIndex === null) { showToast("Pilih avatar kamu dulu!", "⚠️"); return; }
  if (users.some(u => u.loginId.toLowerCase() === id.toLowerCase())) {
    showToast(regMethod === "email" ? "Email sudah terdaftar!" : "Nomor HP sudah terdaftar!", "⚠️"); return;
  }

  const newUser = {
    id: "USR-" + Date.now(),
    name,
    method: regMethod,
    loginId: id,
    password: pass,
    gender: regGender,
    avatarIndex: regAvatarIndex,
    address: { name, phone: regMethod === "phone" ? id : "", address: "", city: "", province: "", postal: "" },
    createdAt: Date.now(),
  };
  users.push(newUser);
  saveUsers();
  setCurrentUser(newUser.id);
  updateAccountUI();
  closeAuthModal();
  showToast(`Selamat datang, ${name.split(" ")[0]}! 🎉`, "✅");

  document.getElementById("regName").value = "";
  document.getElementById("regId").value = "";
  document.getElementById("regPass").value = "";
  document.getElementById("regPass2").value = "";
  regGender = null; regAvatarIndex = null;
  document.getElementById("avatarPickerWrap").style.display = "none";
}

function doUserLogin() {
  const id = document.getElementById("authLoginId").value.trim();
  const pass = document.getElementById("authLoginPass").value;
  if (!id || !pass) { showToast("Lengkapi email/HP dan password!", "⚠️"); return; }
  const user = users.find(u => u.loginId.toLowerCase() === id.toLowerCase() && u.password === pass);
  if (!user) { showToast("Email/HP atau password salah!", "❌"); return; }
  setCurrentUser(user.id);
  updateAccountUI();
  closeAuthModal();
  document.getElementById("authLoginId").value = "";
  document.getElementById("authLoginPass").value = "";
  showToast(`Halo lagi, ${user.name.split(" ")[0]}! 👋`, "✅");
}

function doUserLogout() {
  setCurrentUser(null);
  updateAccountUI();
  closeProfileModal();
  showToast("Berhasil keluar dari akun", "👋");
}

function handleAccountClick() {
  const user = getCurrentUser();
  if (user) openProfileModal();
  else openAuthModal();
}

function updateAccountUI() {
  const user = getCurrentUser();
  const icon = document.getElementById("accountBtnIcon");
  const label = document.getElementById("accountBtnLabel");
  const btn = document.getElementById("accountBtn");
  const bnIcon = document.getElementById("bnAccountIcon");
  const bnLabel = document.getElementById("bnAccountLabel");
  if (!icon || !label) return;
  if (user) {
    icon.innerHTML = `<span class="account-avatar-chip">${avatarHtml(user, 24)}<span class="account-status-dot"></span></span>`;
    label.textContent = user.name.split(" ")[0];
    if (btn) btn.classList.add("logged-in");
    if (bnIcon) bnIcon.innerHTML = `<span class="account-avatar-chip">${avatarHtml(user, 22)}<span class="account-status-dot"></span></span>`;
    if (bnLabel) bnLabel.textContent = user.name.split(" ")[0];
  } else {
    icon.textContent = "👤";
    label.textContent = "Akun";
    if (btn) btn.classList.remove("logged-in");
    if (bnIcon) bnIcon.textContent = "👤";
    if (bnLabel) bnLabel.textContent = "Akun";
  }
}

function openProfileModal() {
  const user = getCurrentUser();
  if (!user) { openAuthModal(); return; }
  document.getElementById("profileAvatar").innerHTML = avatarHtml(user, 76);
  document.getElementById("profileName").textContent = user.name;
  document.getElementById("profileContact").textContent = (user.method === "email" ? "📧 " : "📱 ") + user.loginId;
  const a = user.address || {};
  document.getElementById("pf_name").value = a.name || user.name || "";
  document.getElementById("pf_phone").value = a.phone || (user.method === "phone" ? user.loginId : "");
  document.getElementById("pf_address").value = a.address || "";
  document.getElementById("pf_city").value = a.city || "";
  document.getElementById("pf_province").value = a.province || "";
  document.getElementById("pf_postal").value = a.postal || "";
  document.getElementById("profileModal").classList.add("open");
}

function closeProfileModal(event) {
  if (event && event.target !== event.currentTarget) return;
  document.getElementById("profileModal").classList.remove("open");
}

function saveProfileAddress() {
  const user = getCurrentUser();
  if (!user) return;
  const name = document.getElementById("pf_name").value.trim();
  const phone = document.getElementById("pf_phone").value.trim();
  const address = document.getElementById("pf_address").value.trim();
  const city = document.getElementById("pf_city").value.trim();
  const province = document.getElementById("pf_province").value.trim();
  const postal = document.getElementById("pf_postal").value.trim();

  if (!name || !phone || !address || !city || !province || !postal) {
    showToast("Lengkapi semua data alamat dulu ya!", "⚠️"); return;
  }
  user.address = { name, phone, address, city, province, postal };
  saveUsers();

  buyerProfile = {
    name, phone, address, city, province, postal,
    email: user.method === "email" ? user.loginId : (buyerProfile?.email || ""),
  };
  saveBuyerProfile();

  showToast("Alamat pengiriman tersimpan! 📍", "✅");
}

// ===== INIT =====
window.addEventListener("DOMContentLoaded", () => {
  initDarkMode();
  initDemoNotice();
  renderShop();
  updateCartBadge();
  updateWishBadge();
  updateAdminNotifBadge();
  updateCountdown();
  setInterval(updateCountdown, 1000);
  startHeroSlider();
  initBackToTop();
  updateAccountUI();
  initScrollReveal();
  initStatCounters();
  initSearchSuggest();
  initCardTilt();

  // Inject payment methods
  const pmContainer = document.getElementById("paymentMethodsList");
  if (pmContainer) pmContainer.innerHTML = renderPaymentMethods();

  if (window.location.search.includes("admin") || window.location.hash === "#admin") {
    if (!isAdmin) { setTimeout(() => { document.getElementById("loginModal").classList.add("open"); const u = document.getElementById("loginUser"); if (u) u.focus(); }, 600); }
  }
  setTimeout(() => { const badge = document.getElementById("chatFabBadge"); if (badge) badge.style.display = "flex"; }, 3000);
});

// ===== SCROLL REVEAL (fade-in-up on view) =====
let revealObserver = null;
function initScrollReveal() {
  if (!("IntersectionObserver" in window)) return;
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal-up:not(.revealed)").forEach(el => revealObserver.observe(el));
}

// ===== ANIMATED STAT COUNT-UP =====
function initStatCounters() {
  animateStatProductsOnce();
  document.querySelectorAll("[data-count-to]").forEach(el => {
    const end = parseFloat(el.getAttribute("data-count-to"));
    const decimals = el.getAttribute("data-count-decimals") ? parseInt(el.getAttribute("data-count-decimals")) : 0;
    animateCount(el, end, decimals);
  });
}

function animateCount(el, end, decimals = 0) {
  const duration = 1200;
  const start = performance.now();
  function tick(now) {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = end * eased;
    el.textContent = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString("id-ID");
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = decimals > 0 ? end.toFixed(decimals) : end.toLocaleString("id-ID");
  }
  requestAnimationFrame(tick);
}

// ===== SEARCH AUTOCOMPLETE =====
function initSearchSuggest() {
  const input = document.getElementById("searchInput");
  const box = document.getElementById("searchSuggest");
  if (!input || !box) return;
  input.addEventListener("focus", () => renderSearchSuggest());
  document.addEventListener("click", (e) => {
    if (!box.contains(e.target) && e.target !== input) box.classList.remove("show");
  });
}

function renderSearchSuggest() {
  const input = document.getElementById("searchInput");
  const box = document.getElementById("searchSuggest");
  if (!input || !box) return;
  const q = input.value.trim().toLowerCase();
  if (!q) { box.classList.remove("show"); return; }
  const matches = products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)).slice(0, 6);
  if (matches.length === 0) {
    box.innerHTML = `<div class="search-suggest-empty">Tidak ada produk cocok dengan "${q}"</div>`;
  } else {
    box.innerHTML = matches.map(p => `
      <div class="search-suggest-item" onclick="selectSearchSuggest(${p.id})">
        <img class="ssi-thumb" src="${p.image}" onerror="this.style.visibility='hidden'" />
        <span class="ssi-name">${p.name}</span>
        <span class="ssi-price">${formatRp(p.price)}</span>
      </div>
    `).join("");
  }
  box.classList.add("show");
}

function selectSearchSuggest(id) {
  const box = document.getElementById("searchSuggest");
  if (box) box.classList.remove("show");
  const idx = products.findIndex(p => p.id === id);
  if (idx > -1) openModal(idx);
}

// ===== NEWSLETTER (demo) =====
function handleNewsletterSubmit(form) {
  showToast("Terima kasih! (ini demo, belum terhubung email sungguhan)", "📬");
  form.reset();
}

// ===== PAGE LOADER =====
(function () {
  // Tampilkan intro 10 detik penuh hanya di kunjungan PERTAMA tiap sesi browser.
  // Reload/navigasi berikutnya dalam sesi yang sama akan lebih cepat (UX lebih baik).
  const seenThisSession = sessionStorage.getItem("rky_loader_seen") === "1";
  const MIN_DISPLAY_MS = seenThisSession ? 600 : 2800;
  const FALLBACK_MS = seenThisSession ? 2200 : 5000;
  const shownAt = Date.now();
  let hidden = false;

  const percentEl = document.getElementById("loaderPercent");
  const textEl = document.getElementById("loaderText");
  const tips = [
    "Menyiapkan pengalaman belanja terbaikmu...",
    "Mengecek stok produk favorit...",
    "Menghitung diskon flash sale...",
    "Menyusun rekomendasi untukmu...",
    "Menyiapkan estimasi ongkir kurir...",
    "Hampir siap, sebentar lagi! ✨",
  ];
  let tipIndex = 0;
  let tipTimer = null;
  let percentTimer = null;

  if (percentEl && textEl) {
    tipTimer = setInterval(() => {
      tipIndex = (tipIndex + 1) % tips.length;
      textEl.style.opacity = 0;
      setTimeout(() => { textEl.textContent = tips[tipIndex]; textEl.style.opacity = 1; }, 250);
    }, Math.max(1200, MIN_DISPLAY_MS / tips.length));

    percentTimer = setInterval(() => {
      const elapsed = Date.now() - shownAt;
      const pct = Math.min(99, Math.round((elapsed / MIN_DISPLAY_MS) * 100));
      percentEl.textContent = pct + "%";
    }, 80);
  }

  function hideLoader() {
    if (hidden) return;
    hidden = true;
    if (tipTimer) clearInterval(tipTimer);
    if (percentTimer) clearInterval(percentTimer);
    if (percentEl) percentEl.textContent = "100%";
    const loader = document.getElementById("pageLoader");
    if (!loader) return;
    const elapsed = Date.now() - shownAt;
    const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);
    setTimeout(() => {
      loader.classList.add("loader-hide");
      setTimeout(() => loader.remove(), 550);
      sessionStorage.setItem("rky_loader_seen", "1");
    }, wait);
  }

  window.addEventListener("load", hideLoader);
  setTimeout(hideLoader, FALLBACK_MS);
})();