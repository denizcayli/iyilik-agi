import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/Event/EventCard';

// 8 sabit örnek etkinlik
const STATIC_EVENTS = [
  {
    id: 'evt-1',
    title: 'Geleceğe Nefes: Orman Yangını Sonrası Rehabilitasyon',
    description: 'Akdeniz bölgesinde yaşanan büyük orman yangınları sonrasında 50.000 fidan dikimi hedefiyle başlatılan kapsamlı doğa rehabilitasyon projesi.',
    category: 'Çevre',
    targetAmount: 10000000,
    raisedAmount: 7450000,
    daysLeft: 45,
    donorCount: 1284,
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'evt-2',
    title: 'Köy Okullarına Bilgisayar Laboratuvarı',
    description: 'Doğu Anadolu\'daki 12 köy okuluna dijital eğitim altyapısı kurulması ve öğretmenlere teknoloji eğitimi verilmesi projesi.',
    category: 'Eğitim',
    targetAmount: 500000,
    raisedAmount: 420000,
    daysLeft: 22,
    donorCount: 893,
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'evt-3',
    title: 'Sokak Hayvanları Mobil Klinik',
    description: 'İstanbul\'un 5 ilçesinde sokak hayvanlarına ücretsiz veteriner hizmetleri sunmak için donanımlı mobil klinik aracı projesi.',
    category: 'Hayvanlar',
    targetAmount: 250000,
    raisedAmount: 148000,
    daysLeft: 60,
    donorCount: 542,
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'evt-4',
    title: 'Kırsal Bölgelere Temiz Su Kuyusu',
    description: 'Güneydoğu Anadolu\'nun su sıkıntısı yaşayan köylerine içme suyu kuyusu ve su arıtma sistemi kurulması için acil yardım kampanyası.',
    category: 'Su',
    targetAmount: 350000,
    raisedAmount: 210000,
    daysLeft: 18,
    donorCount: 731,
    imageUrl: 'https://images.unsplash.com/photo-1509140973433-35e9f77f57b8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'evt-5',
    title: 'Deprem Bölgesi Çocukları için Geçici Okul',
    description: 'Depremden etkilenen bölgelerdeki çocukların eğitimine devam edebilmesi için prefabrik geçici okul binaları ve kırtasiye malzemeleri projesi.',
    category: 'Afet',
    targetAmount: 750000,
    raisedAmount: 580000,
    daysLeft: 12,
    donorCount: 1156,
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'evt-6',
    title: 'Yaşlı Bakım Merkezi Rehabilitasyon',
    description: 'Belediye bünyesindeki 3 yaşlı bakım merkezine modern tıbbi ekipman, konforlu mobilya ve sosyal etkinlik alanları oluşturma projesi.',
    category: 'Yaşlı',
    targetAmount: 180000,
    raisedAmount: 92000,
    daysLeft: 75,
    donorCount: 318,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'evt-7',
    title: 'Engelsiz Yaşam Teknoloji Atölyesi',
    description: 'Fiziksel engelli gençlerin yazılım, 3D tasarım ve robotik kodlama alanlarında mesleki beceriler kazanması için tam donanımlı eğitim atölyesi.',
    category: 'Sağlık',
    targetAmount: 300000,
    raisedAmount: 180000,
    daysLeft: 30,
    donorCount: 412,
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'evt-8',
    title: 'Kimsesiz Çocuklar Sanat Akademisi',
    description: 'Sevgi evlerinde kalan çocukların resim, müzik ve tiyatro alanlarında yeteneklerini keşfetmeleri ve profesyonel eğitim almaları için sanat merkez.',
    category: 'Çocuk',
    targetAmount: 200000,
    raisedAmount: 154000,
    daysLeft: 15,
    donorCount: 620,
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80',
  },
];

export default function Events() {
  return (
    <div className="page-container">

      {/* Header */}
      <div className="header-wrapper flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="header-badge">
            Aktif Projeler
          </span>
          <h1 className="header-title">
            Sosyal Sorumluluk Etkinlikleri
          </h1>
          <p className="header-desc max-w-xl">
            Seçtiğiniz kategorilere göre filtreleyebilir, dilediğiniz etkinliğe bağış yapabilir veya gönüllü olarak katılabilirsiniz.
          </p>
        </div>
        <Link
          to="/payment"
          className="btn btn-accent shrink-0"
        >
          <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Cüzdana Para Yükle
        </Link>
      </div>

      {/* Filter and Search Bar Row */}
      <div className="filter-bar">

        {/* Category Filters — Statik Butonlar */}
        <div className="filter-btn-group">
          <button className="filter-btn-active">Tümü</button>
          <button className="filter-btn">Çevre</button>
          <button className="filter-btn">Eğitim</button>
          <button className="filter-btn">Sağlık</button>
          <button className="filter-btn">Hayvanlar</button>
          <button className="filter-btn">Afet</button>
          <button className="filter-btn">Çocuk</button>
          <button className="filter-btn">Yaşlı</button>
          <button className="filter-btn">Su</button>
        </div>

        {/* Search Input — uncontrolled */}
        <div className="search-input-wrapper">
          <svg className="search-input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Etkinlik ara..."
            className="search-input"
          />
        </div>
      </div>

      {/* Events Grid — 8 sabit kart */}
      <div className="grid-cols-responsive-4">
        <EventCard event={STATIC_EVENTS[0]} />
        <EventCard event={STATIC_EVENTS[1]} />
        <EventCard event={STATIC_EVENTS[2]} />
        <EventCard event={STATIC_EVENTS[3]} />
        <EventCard event={STATIC_EVENTS[4]} />
        <EventCard event={STATIC_EVENTS[5]} />
        <EventCard event={STATIC_EVENTS[6]} />
        <EventCard event={STATIC_EVENTS[7]} />
      </div>

      {/* Boş sonuç placeholder — statik görünür */}
      <div className="hidden mt-16 text-center py-16 border border-dashed border-slate-200 rounded-3xl text-slate-400 text-sm">
        <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="font-semibold text-slate-500">Bu kriterlere uygun etkinlik bulunamadı.</p>
      </div>

    </div>
  );
}

