-- NSB.uz Seed Data — PostgreSQL 15+

-- Admin user is created by DataInitializer.java with password: admin123

-- Categories
INSERT INTO categories (id, name, slug, icon_url, description, sort_order, created_at, updated_at) VALUES
(1,  'Komplektlovchi',    'computer-components', '🔧', 'Kompyuter komplektlovchi qismlari', 1, NOW(), NOW()),
(2,  'Noutbuklar',        'laptops',             '💻', 'Barcha turdagi noutbuklar',          2, NOW(), NOW()),
(3,  'Printerlar va MFU', 'printers',            '🖨', 'Printer va sarf materiallari',       3, NOW(), NOW()),
(4,  'CCTV',              'cctv',                '📹', 'IP kameralar, videoregistratorlar',   4, NOW(), NOW()),
(5,  'Ofis PK',           'office-pcs',          '🖥', 'Tayyor ofis kompyuterlari',          5, NOW(), NOW()),
(6,  'O''yin PK',         'gaming-pcs',          '🎮', 'Gaming kompyuterlar',                6, NOW(), NOW()),
(7,  'Monitorlar',        'monitors',            '🖥', 'Barcha turdagi monitorlar',          7, NOW(), NOW()),
(8,  'Tarmoq jihozlari',  'networking',          '🌐', 'Router, switch, kabel',              8, NOW(), NOW()),
(9,  'Aksessuarlar',      'accessories',         '🎧', 'Klaviatura, sichqoncha',             9, NOW(), NOW()),
(10, 'Quyosh panellari',  'solar-panels',        '☀️', 'Mono, poli, egiluvchan panellar',  10, NOW(), NOW()),
(11, 'Invertorlar',       'solar-inverters',     '⚡', 'Tarmoq, gibrid, off-grid',          11, NOW(), NOW()),
(12, 'Akkumulyatorlar',   'solar-batteries',     '🔋', 'LiFePO4, gel, AGM',                12, NOW(), NOW()),
(13, 'Kreplenie',         'solar-mounting',      '🔩', 'Tom va yer uchun kreplenie',        13, NOW(), NOW()),
(14, 'Kabel va aksessuar','solar-accessories',   '🔌', 'Kontroller, kabel, razem',          14, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Products
INSERT INTO products (name, slug, category_id, price, old_price, installment_price, rating, review_count, stock, badge, description, is_solar, is_active, sales_count, seo_title, seo_description, created_at, updated_at) VALUES
('NVIDIA GeForce RTX 4060 8GB GDDR6',       'nvidia-rtx-4060-8gb',       1, 5690000, NULL,     948000,  4.5, 47, 15, 'HIT',   'NVIDIA GeForce RTX 4060 — o''yin va kontent yaratish uchun ideal videokarta.',          false, true, 234, 'RTX 4060 8GB sotib olish', 'NVIDIA RTX 4060 videokarta Toshkentda eng arzon narxda', NOW(), NOW()),
('ASUS VivoBook 15 Core i7 16GB 512GB',     'asus-vivobook-15-i7',       2, 9450000, 11200000, 1575000, 5.0, 23,  8, 'YANGI', 'Intel Core i7, 16GB RAM, 512GB NVMe SSD noutbuk.',                                      false, true, 187, 'ASUS VivoBook 15 i7 narxi', 'ASUS VivoBook 15 noutbuk arzon narxda Toshkentda', NOW(), NOW()),
('HP LaserJet Pro MFP M428fdn',             'hp-laserjet-m428fdn',       3, 4320000, NULL,     NULL,    4.0, 31, 12, NULL,    'Professional lazer printer. Ikki tomonlama chop etish.',                                 false, true, 156, 'HP LaserJet Pro M428 narxi', 'HP LaserJet printer Toshkentda sotib olish', NOW(), NOW()),
('LONGi 550W Mono PERC Quyosh Paneli',      'longi-550w-mono-perc',     10, 2750000, 3650000,  NULL,    5.0, 18, 50, '-25%',  'LONGi Hi-MO5 550W — 21.3% KPD, 25 yil kafolat, IEC/TÜV sertifikat.',                   true,  true, 312, 'LONGi 550W quyosh paneli', 'LONGi 550W panel Toshkentda eng arzon narxda', NOW(), NOW()),
('Hikvision DS-2CD2143G2 4MP IP Kamera',    'hikvision-4mp-ip-kamera',   4, 1280000, NULL,     NULL,    4.5, 56, 30, NULL,    'Hikvision 4MP turret kamera — IR 30m, IP67, WDR.',                                      false, true, 445, 'Hikvision 4MP kamera narxi', 'Hikvision IP kamera Toshkentda', NOW(), NOW()),
('AMD Ryzen 7 5800X Protsessor',            'amd-ryzen-7-5800x',         1, 3850000, 4200000,  641000,  4.8, 38, 20, NULL,    'AMD Ryzen 7 5800X — 8 yadro, 16 ip, 4.7GHz boost.',                                    false, true, 198, 'Ryzen 7 5800X sotib olish', 'AMD Ryzen 7 5800X protsessor narxi', NOW(), NOW()),
('Samsung 27" Curved Monitor C27F390',      'samsung-27-curved-c27f390',  7, 3100000, NULL,     516000,  4.6, 29,  7, 'YANGI', 'Samsung 27" VA Curved — FHD, 4ms, FreeSync.',                                            false, true, 167, 'Samsung 27 monitor narxi', 'Samsung curved monitor Toshkentda', NOW(), NOW()),
('Growatt 5kW Gibrid Invertor',             'growatt-5kw-gibrid',        11, 8500000, NULL,    1416000,  4.9, 12,  5, NULL,    'Growatt SPH 5000ES — gibrid invertor, Wi-Fi monitoring.',                                true,  true,  89, 'Growatt 5kW invertor', 'Growatt gibrid invertor narxi', NOW(), NOW()),
('JA Solar 455W Mono Panel',                'ja-solar-455w-mono',        10, 2100000, 2400000,  NULL,    4.7, 22,100, NULL,    'JA Solar Deep Blue 3.0 — 455W, 20.7% KPD.',                                             true,  true, 276, 'JA Solar 455W narxi', 'JA Solar quyosh paneli arzon', NOW(), NOW()),
('Gaming PC RTX 4070 Ryzen 7 32GB',         'gaming-pc-rtx4070-ryzen7',   6,18500000,21000000, 3083000, 4.9,  9,  4, 'HIT',   'NSB Gaming Beast — RTX 4070, Ryzen 7 7800X3D, 32GB DDR5.',                              false, true,  67, 'Gaming kompyuter RTX 4070', 'O''yin kompyuter Toshkentda sotib olish', NOW(), NOW()),
('TP-Link Archer AX73 Wi-Fi 6 Router',      'tp-link-archer-ax73',        8, 1450000, NULL,     NULL,    4.4, 42, 18, NULL,    'AX5400 Wi-Fi 6 router — 6 antenna, MU-MIMO.',                                           false, true, 210, 'TP-Link AX73 narxi', 'TP-Link Wi-Fi 6 router Toshkentda', NOW(), NOW()),
('BYD LiFePO4 5.12kWh Akkumulyator',        'byd-lifepo4-5kwh',         12,12500000, NULL,    2083000,  5.0,  8,  3, NULL,    'BYD Battery-Box Premium HVS — 6000+ tsikl, 10 yil kafolat.',                            true,  true,  45, 'BYD akkumulyator narxi', 'BYD LiFePO4 akkumulyator sotib olish', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Services
INSERT INTO services (title, slug, description, icon_url, sort_order, created_at, updated_at) VALUES
('PK yig''ish',                  'custom-pc-building',    'Professional kompyuter yig''ish xizmati',              '🔧', 1, NOW(), NOW()),
('Printer ta''mirlash',          'printer-repair',        'Barcha turdagi printer va MFU ta''mirlash',            '🖨', 2, NOW(), NOW()),
('CCTV o''rnatish',              'cctv-installation',     'Videokuzatuv tizimlarini loyihalash va o''rnatish',    '📹', 3, NOW(), NOW()),
('Quyosh stantsiyasi o''rnatish','solar-installation',    'Kalit topshiriq asosida quyosh stantsiyasi o''rnatish','☀️', 4, NOW(), NOW()),
('IT konsalting',                'tech-consultation',     'Texnik maslahat va IT infratuzilmani sozlash',         '💼', 5, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Portfolio
INSERT INTO portfolio (title, category, description, location, capacity, year, created_at, updated_at) VALUES
('15 kVt quyosh stantsiyasi',     'solar', 'Xususiy uy — yillik 18,000 kVt·soat',           'Chilonzor, Toshkent', '15 kVt',     2025, NOW(), NOW()),
('Server xonasi — Artel zavodi',  'it',    '50 ta ish o''rni, tarmoq va server jihozlari',   'Toshkent',            '50 ish o''rni',2024, NOW(), NOW()),
('64 kamerali videokuzatuv',      'cctv',  'Hikvision IP tizimi, 30 kunlik arxiv',           'Yunusobod, Toshkent', '64 kamera',  2025, NOW(), NOW()),
('50 kVt sanoat stantsiyasi',     'solar', 'Tekstil fabrikasi uchun on-grid tizim',           'Samarqand',           '50 kVt',     2024, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Blogs
INSERT INTO blogs (title, slug, short_description, content, author, published, seo_title, seo_description, created_at, updated_at) VALUES
('Quyosh panellari: 2026 qo''llanma', 'solar-guide-2026',    'Quyosh energiyasiga o''tish bosqichlari',    'To''liq maqola...', 'NSB Team', true, 'Quyosh panellari 2026', 'Quyosh panellari haqida qo''llanma', NOW(), NOW()),
('Gaming noutbuklar TOP 5',           'top-gaming-laptops',  'Eng kuchli o''yin noutbuklari taqqoslash',   'To''liq maqola...', 'NSB Team', true, 'Gaming noutbuklar 2026', 'Eng yaxshi gaming noutbuklar', NOW(), NOW()),
('Yashil tarif — yangiliklar',        'green-tariff-news',   'Yashil tarif bo''yicha o''zgarishlar',       'To''liq maqola...', 'NSB Team', true, 'Yashil tarif 2026', 'Yashil tarif haqida', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Banners
INSERT INTO banners (title, subtitle, image_url, link_url, button_text, sort_order, is_active, created_at, updated_at) VALUES
('Gaming Kompyuterlar',   'RTX 4070 + Ryzen 7 bilan jihozlangan', NULL, '/catalog/gaming-pcs',  'Batafsil',    1, true, NOW(), NOW()),
('Quyosh Panellari -25%', '25 yil kafolat, bepul konsultatsiya',  NULL, '/catalog/solar-panels', 'Kalkulyator', 2, true, NOW(), NOW()),
('Noutbuklar aksiyasi',   'Muddatli to''lov mavjud',              NULL, '/catalog/laptops',      'Xarid',       3, true, NOW(), NOW())
ON CONFLICT DO NOTHING;
