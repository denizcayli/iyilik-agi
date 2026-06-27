# 🌐 İyilik Ağı - Şeffaf ve Güvenilir Bağış & Gönüllülük

Bu proje; sivil toplum kuruluşları (STK) ile gönüllü bağışçıları güvenli, şeffaf ve anlık güncellenen bir dijital ekosistemde buluşturan modern bir Bağış ve Gönüllülük Platformudur. Kullanıcıların cüzdanları üzerinden veya doğrudan kredi kartıyla üyeliksiz bağış yapabildiği, yöneticilerin (admin) gerçek zamanlı kampanya ve gönüllü takibi gerçekleştirebildiği, temiz ve sürdürülebilir bir mimariye sahiptir.

---

## 📋 İÇİNDEKİLER
1. [Proje Vizyonu ve İşleyiş Senaryosu](#1-proje-vizyonu-ve-işleyiş-senaryosu)
2. [Öne Çıkan Özellikler](#2-öne-çıkan-özellikler)
   - [Üyeliksiz / Anonim Bağış Deneyimi](#üyeliksiz--anonim-bağış-deneyimi)
   - [Dinamik Oturum ve Rol Simülasyonu](#dinamik-oturum-ve-rol-simülasyonu)
3. [Teknoloji Yığını ve Kütüphaneler](#3-teknoloji-yığını-ve-kütüphaneler)
4. [Mimari Tasarım ve Dosya Yapısı](#4-mimari-tasarım-ve-dosya-yapısı)
5. [Detaylı Sayfa ve Bileşen (Page & Component) Rolleri](#5-detaylı-sayfa-ve-bileşen-page--component-rolleri)
6. [Weekend Geliştirme Yol Haritası](#6-weekend-geliştirme-yol-haritası)
7. [Kurulum ve Çalıştırma Kılavuzu](#7-kurulum-ve-çalıştırma-kılavuzu)

---

## 1. 🌟 Proje Vizyonu ve İşleyiş Senaryosu

İyilik Ağı, yardımlaşma ve dayanışma faaliyetlerinin izlenebilirliğini artırmak adına uçtan uca dijitalleştirilmiş bir senaryo sunar. Projenin ana işleyiş döngüsü şu şekildedir:

1. **Kampanya Girişi (Admin)**: Sistem yöneticisi admin paneline bağlanarak yeni bir sosyal sorumluluk projesi başlatır. Örnek senaryomuzda: "Geleceğe Nefes: Orman Yangını Rehabilitasyonu" sisteme girilir, hedef bütçe 10.000.000 TL ve kampanya süresi 45 gün olarak set edilir.
2. **Bakiye Yükleme (Gönüllü)**: Gönüllü kullanıcı sisteme giriş yapar. Tamamen gerçeğe uygun simüle edilmiş Kredi Kartı Ödeme Sayfası aracılığıyla cüzdanına 15.000 TL sanal bakiye yükler. Bu işlem sonucunda kullanıcının cüzdan bakiyesi anlık olarak güncellenir.
3. **Anlık Bağış ve Canlı Güncellenme**: Kullanıcı ilgili projenin detay sayfasına gider. Projede o ana kadar 7.450.000 TL toplanmış ve Dinamik İlerleme Barı %75 olarak görünmektedir. Kalan süre sayacı ise 45 gün göstermektedir. Kullanıcı projenin "Bağış Yap" butonunu kullanarak bağış gerçekleştirir.
4. **Reaktif Durum Değişimi**:
   - Gönüllünün bakiyesi anında güncellenir.
   - Projenin toplam biriken fon miktarı artar.
   - Projenin dinamik ilerleme barı otomatik olarak yeniden hesaplanır.
5. **Raporlama ve İzleme**: Kullanıcı kendi profilindeki "Geçmiş Bağışlarım" sekmesinden bu harcamayı filtreleyebilir. Admin ise kendi finansal paneline girdiğinde, toplanan bütçeyi görebilir ve bu tablo verisini tek tıkla Excel/Tablo formatında dışa aktarabilir.

---

## 2. 🚀 Öne Çıkan Özellikler

### Gönüllü (Kullanıcı) Paneli
- **Güvenli Giriş/Kayıt Simülasyonu**: Tarayıcı tabanlı `sessionStorage` ile entegre çalışan kimlik doğrulama sistemi (Gönüllü/Admin rol ayrımı dahil).
- **Cüzdan ve Bakiye Sistemi**: Kullanıcının mevcut bakiyesini Navbar ve Profil alanlarında dinamik olarak gösteren sanal bakiye yükleme ekranı.
- **Kampanya ve Etkinlik Takibi**: Aktif projelerin kategorize edilmiş modern Bento Grid düzeninde listelenmesi, hedef bütçe ve kalan gün detaylarının gösterimi.
- **Dinamik Bağış İlerleme Barı**: Yapılan bağış miktarının projenin bütçesine olan oranını matematiksel olarak hesaplayıp anlık animasyonla güncelleyen bileşen.
- **Gönüllü Katılım Sistemi**: Maddi bağışın yanı sıra projelere fiziksel olarak katılım göstererek sahada görev alma başvurusu.
- **Geçmiş Takibi**: Kullanıcının geçmişte gerçekleştirdiği bağışları tarih ve miktar bazında süzen kişisel kayıt paneli.

### Yönetici (Admin) Paneli
- **Etkinlik ve Kampanya Yönetimi**: Yeni proje ekleme (Başlık, Açıklama, Kategori, Hedef Bütçe, Bitiş Tarihi, Görsel URL) ve mevcut kampanyaları düzenleme/silme modülü.
- **Konsolide Bakiye Takibi**: Tüm aktif kampanyaların finansal durumlarını, toplam toplanan bakiye ve hedefe ulaşma yüzdelerini tek bir merkezi gösterge panelinden (Dashboard) izleme yetkisi.
- **Gelişmiş Raporlama ve Manuel Kayıt**: Kampanya dışı gelen bağışları kaydetmek için manuel bağış kaydı formu.
- **Veri Dışa Aktarma**: Finansal verilerin tablo formatında analiz edilip Excel/CSV çıktısı olarak indirilebilmesi.

### Üyeliksiz / Anonim Bağış Deneyimi
> [!IMPORTANT]  
> Projenin ödeme simülasyonu altyapısı (`/payment`) üyelik veya giriş yapma zorunluluğu barındırmaz. Kullanıcı sisteme üye olmadan veya giriş yapmadan herhangi bir etkinliğin detay sayfasından **"Bu Etkinliğe Bağış Yap"** butonuna basarak doğrudan kredi kartı bilgileriyle bağış yapabilir. Giriş yapılmadığında sistem bunu otomatik olarak **"Anonim / Misafir Bağışçı"** olarak kabul eder ve simülasyonu bu şekilde tamamlar.

### Dinamik Oturum ve Rol Simülasyonu
- **Giriş Yapılmadığında (Varsayılan)**: Navbarda sadece **"Giriş Yap"** butonu gözükür. Cüzdan ve Profil sayfaları gizlidir. Üyeliksiz (misafir) olarak bağış simüle edilebilir.
- **Gönüllü Girişi**: `Giriş Yap` sayfasındaki hızlı butonlardan "Gönüllü Giriş" yapıldığında; navbarda kullanıcının cüzdan bakiyesi (₺15.000) ve ismi (Onur Baha Koç) görünür.
- **Admin Girişi**: "Admin Giriş" yapıldığında; menüye ek olarak "Yönetici Paneli" seçeneği gelir ve yönetici özellikleri aktifleşir.

---

## 3. 🛠 Teknoloji Yığını ve Kütüphaneler

- **Core Framework**: React 18 (Functional Components, Hooks)
- **Routing & Navigation**: React Router DOM v6
- **Styling & UI Design**: Tailwind CSS v4 (Sıfır inline stil karmaşası için `index.css` üzerinde `@apply` kuralları ile CSS bileşen mimarisi kurulmuştur).
- **Grafikler**: Recharts (Finansal verileri kontrol panelinde görselleştirmek için).
- **Tarih Yönetimi**: Yerel JavaScript Date metodları ve biçimlendiricileri.

---

## 4. 🗃 Mimari Tasarım ve Dosya Yapısı

Sürdürülebilir, modüler ve ölçeklenebilir bir mimari için uygulanan klasör yapısı:

```text
src/
├── assets/                       # Statik görseller ve logolar
├── components/
│   ├── Admin/                    # Yönetici paneline özel bileşenler
│   │   ├── DashboardCards.jsx    # Genel metrik kartları
│   │   ├── EventForm.jsx         # Kampanya oluşturma/düzenleme formu
│   │   └── ReportTable.jsx       # Raporlama tablosu ve manuel kayıt formu
│   ├── Common/                   # Tüm sayfalarda ortak kullanılan bileşenler
│   │   ├── Footer.jsx            # Alt bilgi çubuğu
│   │   └── Navbar.jsx            # Dinamik oturum yönetimli üst bar (ve Layout sarmalayıcı)
│   ├── Event/                    # Kampanya/Etkinlik bazlı bileşenler
│   │   ├── DonationModal.jsx     # Bağış modalı ön şablonu
│   │   └── EventCard.jsx         # Grid içindeki tekli kampanya kartı
│   ├── Wallet/                   # Cüzdan ve Ödeme bileşenleri
│   │   ├── CreditCardVisual.jsx  # 3D Kredi kartı görsel simülasyonu
│   │   ├── TransactionTable.jsx  # Hesap hareketleri listesi
│   │   └── WalletCard.jsx        # Bakiye ve cüzdan kartı
│   ├── AdminLayout.jsx           # Yönetici paneli şablon sarmalayıcısı
│   └── GlassCard.jsx             # Cam efektli (Glassmorphism) kart bileşeni
│
├── pages/
│   ├── Admin/                    # Yönetici paneli sayfaları
│   │   ├── AdminDashboard.jsx    # Konsolide metrikler ve Recharts grafiği
│   │   ├── EditEvent.jsx         # Kampanya düzenleme sayfası
│   │   ├── EventsManagement.jsx  # Tüm kampanyaların listelendiği CRUD kontrol paneli
│   │   ├── FinancialReports.jsx  # Finansal özetlerin listelendiği rapor sayfası
│   │   ├── NewEvent.jsx          # Yeni kampanya oluşturma sayfası
│   │   └── Volunteers.jsx        # Gönüllülerin listelendiği takip sayfası
│   ├── About.jsx                 # Hakkımızda sayfası (Değerlerimiz, çalışma prensipleri)
│   ├── Contact.jsx               # İletişim sayfası (Bize yazın formu)
│   ├── EventDetail.jsx           # Detaylı kampanya sayfası ve bağış/gönüllülük aksiyonları
│   ├── Events.jsx                # Filtrelenebilir tüm kampanyalar kataloğu
│   ├── Home.jsx                  # Ana sayfa (Hero, Metrikler, Nasıl Çalışır, SSS)
│   ├── Login.jsx                 # Oturum simülasyon sayfası (Gönüllü/Admin hızlı giriş)
│   ├── PaymentSimulation.jsx     # Ödeme, sanal bakiye yükleme ve 3D secure simülasyonu
│   └── UserProfile.jsx           # Gönüllü profil bilgileri ve bağış geçmişi
│
├── store/                        # Global State Yönetim Klasörü (İlerleyen fazlarda bağlanacaktır)
│   ├── index.js                  # Store konfigürasyon dosyası
│   └── slices/                   # Redux dilimleri (Slices)
│       ├── authSlice.js          # Kullanıcı giriş dilimi
│       ├── campaignSlice.js      # Kampanya yönetimi dilimi
│       ├── eventSlice.js         # Etkinlik veri akış dilimi
│       └── walletSlice.js        # Cüzdan finans yönetim dilimi
│
├── App.jsx                       # React Router rota tanımlamaları
├── main.jsx                      # React dom tetikleyicisi
└── index.css                     # Merkezi CSS dosyası (@import "tailwindcss" ve `@apply` mimarisi)
```

---

## 5. Detaylı Sayfa ve Bileşen (Page & Component) Rolleri

### 🏠 Ana Sayfa (`Home.jsx`)
Giriş yapan veya ziyaret eden tüm kullanıcılara hitap eden karşılama ekranıdır:
- **Hero Alanı**: Dikkat çekici slogan, eylem çağrısı (CTA) butonları ve arka plan tasarımı.
- **İstatistik Şeridi**: Tamamlanan projeler, aktif gönüllüler ve toplanan toplam fonlar gibi kritik metrikler.
- **Nasıl Çalışır?**: Bağışların sahadaki etkisini gösteren görsel adımlar.
- **SSS (Sıkça Sorulan Sorular)**: Kullanıcıların güven, şeffaflık ve üyelik ile ilgili akıllarına takılan soruların yanıtlandığı akordeon yapı.

### 📢 Kampanyalar Kataloğu (`Events.jsx`)
Sistemde aktif olan tüm kampanyaların listelendiği alandır:
- **Kategori Filtreleyici**: Çevre, Eğitim, Hayvanlar, Sağlık, Afet vb. kategoriler arasında hızlı filtreleme.
- **Arama Çubuğu**: Proje adına göre anlık filtreleme.
- **Katalog Izgarası**: Her biri dinamik progress bar barındıran `EventCard` bileşenlerinin bento grid düzeninde listelenmesi.

### 📄 Kampanya Detayı (`EventDetail.jsx`)
Kullanıcıların kampanya hakkında tüm bilgileri aldığı ve aksiyon gerçekleştirdiği sayfadır:
- **Bütçe Takip Kartı**: Hedef bütçe, toplanan miktar ve yüzdesel durum.
- **Sayaç**: Projenin sonlanmasına kalan gün, saat ve saniye bilgisi.
- **Aksiyon Paneli**: Kredi kartıyla ödemeye yönlendiren "Bu Etkinliğe Bağış Yap" butonu ve sahada fiziksel görev almayı sağlayan "Gönüllü Olarak Katıl" butonu.
- **Canlı Akış**: Bu projeye özel son yapılan bağışların tarih ve miktarlarıyla listesi.

### 💳 Ödeme & Bakiye Sayfası (`PaymentSimulation.jsx`)
Güvenli ödeme adımlarının simüle edildiği alandır:
- **3D Kart Görseli**: Girilen kart numarası, isim ve son kullanma tarihini dinamik olarak yansıtan kart mock-up'ı.
- **3D Secure Simülasyonu**: Ödeme yap butonuna basıldığında açılan tek kullanımlık şifre (OTP) onay penceresi.
- **Hata Simülasyonu**: Bakiye yetersizliği, geçersiz kart veya hatalı OTP girilmesi gibi durumlarda tetiklenebilen kırmızı bildirim paneli.

### ⚙️ Yönetici Konsolu (`AdminDashboard.jsx`)
Platform yöneticilerinin tüm sistemi kuş bakışı izledikleri alandır:
- **Grafik Paneli**: Recharts tabanlı aylık bağış trendi çubuk grafiği.
- **Son Bağış Akışı**: Sistem genelinde yapılan son finansal işlemler.
- **Kampanya CRUD Paneli (`EventsManagement.jsx`)**: Kampanyaları listeleme, silme ve düzenleme sayfalarına geçiş sağlayan kontrol tablosu.

---

## 6. Weekend Geliştirme Yol Haritası

Projeyi statikten dinamik bir yapıya geçirmek için planlanan yol haritası (Redux RTK entegrasyonu en son fazda gerçekleştirilecektir):

1. **Faz 1: Yerel State ve Form Etkinleştirme**: Formların kontrollü bileşenlere (`useState`) dönüştürülmesi ve buton tıklamalarıyla modal tetiklemelerinin yapılması.
2. **Faz 2: Mock API & JSON Server Kurulumu**: Kampanya verilerinin ve bağış akışının yerel dosya yerine JSON API üzerinden fetch/post edilmesi.
3. **Faz 3: Dynamic Logic Integration**: Gönüllülük onayları, bakiye hesaplamaları ve CSV/Excel export kütüphanelerinin bağlanması.
4. **Faz 4: Global State (Redux Toolkit) Entegrasyonu**: Tüm verilerin ve oturum bilgisinin Redux store'a taşınarak anlık durum güncellemelerinin reaktif hale getirilmesi.

---

## 7. 🚀 Kurulum ve Çalıştırma Kılavuzu

### Gereksinimler
- **Node.js**: v18.0.0 veya üzeri.
- **npm** veya **yarn** paket yöneticisi.

### Kurulum Adımları
1. Proje dizinine gidin:
   ```bash
   cd iyilik-agi-deneme
   ```
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. Geliştirme sunucusunu çalıştırın:
   ```bash
   npm run dev
   ```
4. Tarayıcınızda açın:
   [http://localhost:5173](http://localhost:5173)

### Derleme (Build)
Üretim canlı paketi oluşturmak için:
```bash
npm run build
```

---

**Geliştirici Ekibi**: Deniz Çaylı & Onur Baha Koç  
*Toplumsal fayda için şeffaf adımlarla, sevgiyle geliştirildi.* 💚
