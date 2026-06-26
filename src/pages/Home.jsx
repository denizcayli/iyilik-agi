import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import EventCard from '../components/Event/EventCard';

// Statik ScrollReveal — sadece görsel geçiş class'ı, hook yok
function ScrollReveal({ children, className = '' }) {
  return (
    <div className={`opacity-100 translate-y-0 transition-all duration-1000 ease-out ${className}`}>
      {children}
    </div>
  );
}

// Sabit örnek etkinlikler — 8 adet hardcoded
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
    description: 'Sevgi evlerinde kalan çocukların resim, müzik ve tiyatro alanlarında yeteneklerini keşfetmeleri ve profesyonel eğitim almaları için sanat merkezi.',
    category: 'Çocuk',
    targetAmount: 200000,
    raisedAmount: 154000,
    daysLeft: 15,
    donorCount: 620,
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80',
  },
];

const FEATURED = STATIC_EVENTS[0];

export default function Home() {
  const featuredPercentage = Math.min(Math.round((FEATURED.raisedAmount / FEATURED.targetAmount) * 100), 100);

  return (
    <div className="flex flex-col overflow-x-hidden">

      {/* HERO SECTION */}
      <section
        className="relative min-h-[550px] md:min-h-[650px] bg-cover bg-center flex items-center py-12 md:py-20 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(22, 49, 77, 0.85), rgba(22, 49, 77, 0.4)), url('https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1920&q=80')`
        }}
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Hero text */}
          <div className="lg:col-span-6 space-y-6 text-white text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Birlikte Daha Güçlüyüz
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Geleceği İyilikle <br />
              <span className="text-emerald-400">Birlikte İnşa Edelim</span>
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              İyilik Ağı, yardımlaşma ve sosyal sorumluluk etkinliklerini ileri düzey dijital altyapıyla birleştiren, her adımı şeffaf ve denetlenebilir modern bir sivil toplum ekosistemidir. Doğaya nefes olmak, köy okullarındaki çocukların eğitimine katkı sağlamak, dezavantajlı topluluklara temiz su ve sağlık hizmetleri ulaştırmak için iyilik zincirimize katılın.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/events"
                className="px-6 py-3 bg-ember-coral hover:bg-[#c2422b] text-white font-bold rounded-xl shadow-lg shadow-ember-coral/20 hover:shadow-xl transition-all text-sm cursor-pointer border border-white/10"
              >
                Etkinlikleri Keşfet
              </Link>
              <a
                href="#how-it-works"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl backdrop-blur-md transition-all text-sm flex items-center gap-2"
              >
                Nasıl Çalışır?
              </a>
            </div>
          </div>

          {/* Featured Event Glass Card */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <GlassCard className="liquid-glass border-white/30 text-white shadow-2xl relative overflow-hidden w-full max-w-[460px] p-6 md:p-8 backdrop-blur-3xl saturate-150 bg-white/5">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-yellow-500 text-white font-extrabold text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-bl-xl shadow-sm border-l border-b border-white/15 z-20">
                Öne Çıkan Etkinlik
              </div>

              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 bg-white/10 border border-white/15 px-2.5 py-1 rounded-full inline-block">
                  {FEATURED.category}
                </span>
                <span className="text-[9px] font-extrabold px-2.5 py-1 rounded-lg border shadow-sm backdrop-blur-md flex items-center gap-1 bg-white/15 border-white/20 text-amber-300">
                  Son 45 Gün
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 leading-snug text-shadow-sm text-left">
                {FEATURED.title}
              </h3>
              <p className="text-xs text-slate-200/95 mb-4 line-clamp-3 leading-relaxed text-shadow-sm font-medium text-left">
                {FEATURED.description}
              </p>

              {/* Progress bar */}
              <div className="mb-4 bg-white/5 border border-white/10 rounded-xl p-3 shadow-inner text-left">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[9px] text-slate-300 font-bold uppercase tracking-wider text-shadow-sm">Toplanan İlerleme</span>
                  <span className="text-xs font-black font-mono text-amber-300">{featuredPercentage}%</span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-amber-400 transition-all duration-500" style={{ width: `${featuredPercentage}%` }}></div>
                </div>
                <div className="flex justify-between items-center mt-2 text-xs font-mono font-bold">
                  <span className="text-white text-shadow-sm">₺{FEATURED.raisedAmount.toLocaleString('tr-TR')}</span>
                  <span className="text-slate-300 text-shadow-sm font-medium">Hedef: ₺{FEATURED.targetAmount.toLocaleString('tr-TR')}</span>
                </div>
              </div>

              <div className="flex justify-between text-xs mb-5 font-semibold text-left">
                <div>
                  <span className="text-[9px] text-slate-300 uppercase block font-bold text-shadow-sm">Kalan Süre</span>
                  <span className="font-mono text-amber-300 text-shadow-sm">{FEATURED.daysLeft} Gün</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-300 uppercase block font-bold text-shadow-sm">Destekçi</span>
                  <span className="font-mono text-white text-shadow-sm">{FEATURED.donorCount.toLocaleString('tr-TR')} Kişi</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/events/evt-1"
                  className="py-2.5 text-xs font-bold rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white transition-all text-center cursor-pointer font-sans"
                >
                  Detayları Gör
                </Link>
                <Link
                  to="/payment"
                  className="py-2.5 text-xs font-bold rounded-xl bg-ember-coral hover:bg-[#c2422b] text-white shadow-md shadow-ember-coral/15 transition-all text-center cursor-pointer border border-white/10 font-sans"
                >
                  Hemen Bağışla
                </Link>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* STATISTICS ROW — sabit değerler */}
      <section className="bg-white border-b border-slate-100 py-8 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Aktif Etkinlikler</span>
            <span className="text-2xl md:text-3xl font-black text-inst-navy font-mono">12</span>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Toplam Bağış</span>
            <span className="text-2xl md:text-3xl font-black text-pine-teal font-mono">₺25,6M</span>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Gönüllü Destekçi</span>
            <span className="text-2xl md:text-3xl font-black text-inst-navy font-mono">4.821</span>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Toplumsal Katkı</span>
            <span className="text-2xl md:text-3xl font-black text-ember-coral font-mono">15.620+</span>
          </div>
        </div>
      </section>

      {/* MİSYON & VİZYON */}
      <section className="bg-slate-50/70 border-b border-slate-100 py-20 px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-pine-teal bg-pine-teal/5 px-3 py-1.5 rounded-full inline-block">
                Vizyon & Değerlerimiz
              </span>
              <h2 className="text-3xl font-extrabold text-inst-navy tracking-tight leading-tight">
                Toplumsal Dayanışmayı <br />
                <span className="text-pine-teal">Teknolojiyle Geleceğe Taşıyoruz</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                Vakfımız, yardım faaliyetlerinin en hassas noktası olan güven olgusunu dijital inovasyonla pekiştiriyor. Sivil toplum çalışmalarının bürokrasiye takılmadan, şeffaf, hızlı ve anlık izlenebilir bir yapıda yürümesi için modern akıllı sistemler sunuyoruz. Amacımız, sadece kısa süreli yaraları sarmak değil; çevre, eğitim ve sağlık gibi alanlarda kalıcı ve ölçülebilir bir etki yaratmaktır.
              </p>
              <div className="pt-2 flex gap-4">
                {/* Vizyonlar Statik JSX */}
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">✓</div>
                  <span className="text-xs font-bold text-slate-700">Şeffaf Harcama</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">✓</div>
                  <span className="text-xs font-bold text-slate-700">Hızlı Entegrasyon</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">✓</div>
                  <span className="text-xs font-bold text-slate-700">Sürekli Denetim</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-3">
                <div className="w-10 h-10 rounded-xl bg-pine-teal/10 flex items-center justify-center text-pine-teal">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h4 className="text-sm font-bold text-inst-navy uppercase tracking-wider">Misyonumuz</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Bağışçı ile sahada ter döken sivil toplum kuruluşlarını dürüstlük prensibi çerçevesinde buluşturarak her yardımın tam yerini bulmasını sağlamak.</p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-3">
                <div className="w-10 h-10 rounded-xl bg-ember-coral/10 flex items-center justify-center text-ember-coral">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
                <h4 className="text-sm font-bold text-inst-navy uppercase tracking-wider">Vizyonumuz</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Küresel standartlarda şeffaflık derecesine sahip, sivil toplum faaliyetlerinde güven denince akla gelen ilk dijital sosyal sorumluluk ağı olmak.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* NASIL ÇALIŞIR */}
      <section id="how-it-works" className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-pine-teal bg-pine-teal/5 px-3 py-1.5 rounded-full inline-block mb-3">Süreç Nasıl İşler?</span>
            <h2 className="text-2xl md:text-3xl font-bold text-inst-navy">4 Basit Adımda İyilik Akışı</h2>
            <p className="text-xs md:text-sm text-slate-400 mt-2 font-medium">Sistemimiz şeffaflık, hız ve güven esasına dayalı bir dijital simülasyon olarak kurgulanmıştır.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {/* Adım 1 */}
            <ScrollReveal className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100/60 shadow-sm space-y-4 hover:bg-white hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-pine-teal/10 text-pine-teal flex items-center justify-center mx-auto font-bold text-lg">1</div>
              <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">Etkinliği Keşfet</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Çevre korumadan köy okullarına, temiz su kuyularından sokak hayvanları rehabilitasyonuna kadar uzanan 8 farklı kategorideki aktif etkinliklerimizi listeleyin.</p>
            </ScrollReveal>

            {/* Adım 2 */}
            <ScrollReveal className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100/60 shadow-sm space-y-4 hover:bg-white hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-ember-coral/10 text-ember-coral flex items-center justify-center mx-auto font-bold text-lg">2</div>
              <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">Bağış Yap veya Gönüllü Ol</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Katkıda bulunmak istediğiniz bütçeyi seçerek cüzdanınızdan doğrudan hedeflere aktarın veya sahada görev almak için gönüllülük talebi oluşturun.</p>
            </ScrollReveal>

            {/* Adım 3 */}
            <ScrollReveal className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100/60 shadow-sm space-y-4 hover:bg-white hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto font-bold text-lg">3</div>
              <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">Şeffaf Raporları İncele</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Sistem üzerindeki anlık finansal veri dökümleriyle fon birikimini izleyin. Yönetici panelinden hazırlanan Excel ve PDF fatura kayıtlarını şeffafça denetleyin.</p>
            </ScrollReveal>

            {/* Adım 4 */}
            <ScrollReveal className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100/60 shadow-sm space-y-4 hover:bg-white hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center mx-auto font-bold text-lg">4</div>
              <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">Sosyal Etkini Profilde Gör</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Yaptığınız bağışlar ve katıldığınız görevler profil sayfanıza anlık olarak işlenir. Toplumsal fayda puanınızı ve kazandığınız teşekkür rozetlerini sergileyin.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ŞEFFAFLIK BANNER */}
      <section className="bg-inst-navy text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pine-teal/15 rounded-full filter blur-[80px] pointer-events-none z-0"></div>
        <ScrollReveal className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-white/10 px-3.5 py-1.5 rounded-full inline-block border border-white/10">PLATFORM GÜVEN SÖZLEŞMESİ</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Şeffaflık Bizim İçin <span className="text-emerald-400">Bir Tercih Değil, Temel İlkedir</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium">
            İyilik Ağı Platformu'nda, toplanan her bir kuruşun hangi projenin hangi kaleminde harcandığı kuruşu kuruşuna kayıt altına alınır. Vakfımız, sivil toplum faaliyetlerinde denetlenebilirlik çıtasını en üst düzeye çıkarmayı taahhüt eder.
          </p>
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
            {/* Şeffaflık Maddeleri Statik JSX */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <span className="text-emerald-400 font-bold text-xs block mb-1">Bağımsız Denetim</span>
              <p className="text-[10px] text-slate-400 font-medium">Dönemsel olarak akredite mali denetçiler tarafından denetleme raporları sunulur.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <span className="text-emerald-400 font-bold text-xs block mb-1">Açık Fatura Kaydı</span>
              <p className="text-[10px] text-slate-400 font-medium">Satın alınan her fidan, kitap veya ekipmanın faturası sistemde kamuya açık yayınlanır.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <span className="text-emerald-400 font-bold text-xs block mb-1">%100 Doğrudan Transfer</span>
              <p className="text-[10px] text-slate-400 font-medium">Fonlar, hedefe ulaşıldığı an hiçbir platform kesintisi olmaksızın projeye aktarılır.</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* AKTİF ETKİNLİKLER — 8 sabit kart */}
      <section id="active-campaigns" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <ScrollReveal>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-pine-teal bg-pine-teal/5 px-3 py-1.5 rounded-full inline-block mb-3">Öne Çıkan Çalışmalarımız</span>
            <h2 className="text-2xl md:text-3xl font-bold text-inst-navy">Aktif Sosyal Sorumluluk Etkinliklerimiz</h2>
            <p className="text-xs md:text-sm text-slate-400 mt-2 font-medium">Sivil toplum kuruluşlarımız tarafından sahada bizzat koordine edilen ve desteklerinizi bekleyen en güncel projeler.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <EventCard event={STATIC_EVENTS[0]} />
            <EventCard event={STATIC_EVENTS[1]} />
            <EventCard event={STATIC_EVENTS[2]} />
            <EventCard event={STATIC_EVENTS[3]} />
            <EventCard event={STATIC_EVENTS[4]} />
            <EventCard event={STATIC_EVENTS[5]} />
            <EventCard event={STATIC_EVENTS[6]} />
            <EventCard event={STATIC_EVENTS[7]} />
          </div>

          <div className="text-center mt-10">
            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-xl text-xs shadow-sm transition-all cursor-pointer"
            >
              Tüm Etkinlikleri Gör
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* BAŞARI HİKAYELERİ */}
      <section className="bg-slate-50/70 py-20 px-4 sm:px-6 lg:px-8 border-t border-b border-slate-100">
        <ScrollReveal className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-pine-teal bg-pine-teal/5 px-3 py-1.5 rounded-full inline-block mb-3">Hayat Veren Dokunuşlar</span>
            <h2 className="text-2xl md:text-3xl font-bold text-inst-navy">İyilik Ağı ile Gerçekleşen Değişimler</h2>
            <p className="text-xs md:text-sm text-slate-400 mt-2 font-medium">Platformumuz üzerinden toplanan bağışlar ve gönüllülerimizin özverili çalışmalarıyla hayata geçen ilham verici hikayelerimiz.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Story 1 */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center shadow-sm">
              <div className="w-full md:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white">
                <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80" alt="Fidan Dikimi" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="w-full md:w-2/3 space-y-3 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full inline-block">Doğa ve Çevre</span>
                <h3 className="text-base font-bold text-inst-navy">Anadolu'ya Nefes: 10.000 Fidan Toprakla Buluştu</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">Akdeniz bölgesinde yaşanan orman yangınlarının ardından başlattığımız fidan bağışı kampanyasında, 1.200 bireysel bağışçımızın destekleriyle hedefe kısa sürede ulaşıldı.</p>
                <div className="text-[10px] text-slate-400 font-bold">Proje Ortağı: Tema Vakfı & Yerel Gençlik İnisiyatifleri</div>
              </div>
            </div>
            {/* Story 2 */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center shadow-sm">
              <div className="w-full md:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white">
                <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80" alt="Köy Okulu" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="w-full md:w-2/3 space-y-3 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-pine-teal bg-pine-teal/5 px-2.5 py-1 rounded-full inline-block">Eğitim ve Çocuk</span>
                <h3 className="text-base font-bold text-inst-navy">Kars'ın Parlayan Yıldızları Kütüphanesine Kavuştu</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">Kars'ın Digor ilçesindeki bir köy okulunda eğitim gören çocukların hayali, İyilik Ağı destekçilerinin hedefe ulaştırdığı bütçe ile gerçeğe dönüştü. 2.500 adet kitapla modern kütüphane kuruldu.</p>
                <div className="text-[10px] text-slate-400 font-bold">Proje Ortağı: Çocuklar Gülsün Diye Derneği & Gönüllü Öğretmenler</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* SIKÇA SORULAN SORULAR — sabit accordion (ilki açık görünür) */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <ScrollReveal className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-pine-teal bg-pine-teal/5 px-3 py-1.5 rounded-full inline-block mb-3">Merak Edilenler</span>
            <h2 className="text-2xl md:text-3xl font-bold text-inst-navy">Sıkça Sorulan Sorular</h2>
            <p className="text-xs md:text-sm text-slate-400 mt-2 font-medium">Platformumuza, bağış süreçlerine ve denetim mekanizmalarımıza ilişkin aklınıza takılabilecek temel konular.</p>
          </div>
          <div className="space-y-4 text-left">
            {/* SSS 1 (Açık) */}
            <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
              <button className="w-full px-6 py-4 flex justify-between items-center text-xs font-bold text-inst-navy cursor-pointer">
                <span>Bağışlarım doğrudan ilgili etkinliğe mi ulaşıyor?</span>
                <svg className="w-4 h-4 text-slate-400 transition-transform duration-300 rotate-180 text-pine-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="border-t border-slate-100">
                <p className="p-6 text-xs text-slate-500 leading-relaxed font-medium bg-white">
                  Evet, İyilik Ağı Platformu üzerinde yaptığınız her bağış, doğrudan seçtiğiniz etkinliğin bütçe havuzuna aktarılır. Bu havuzdaki tüm birikimler, etkinlik hedefine ulaştığında ilgili STK'ya sahadaki proforma fatura denetimlerine göre teslim edilir. Sürecin her adımını bütçe raporlarımızdan anlık takip edebilirsiniz.
                </p>
              </div>
            </div>

            {/* SSS 2 */}
            <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
              <button className="w-full px-6 py-4 flex justify-between items-center text-xs font-bold text-inst-navy cursor-pointer">
                <span>Gönüllü katılım süreci nasıl işler?</span>
                <svg className="w-4 h-4 text-slate-400 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* SSS 3 */}
            <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
              <button className="w-full px-6 py-4 flex justify-between items-center text-xs font-bold text-inst-navy cursor-pointer">
                <span>Platformun finansal denetimi nasıl yapılıyor?</span>
                <svg className="w-4 h-4 text-slate-400 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* SSS 4 */}
            <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden">
              <button className="w-full px-6 py-4 flex justify-between items-center text-xs font-bold text-inst-navy cursor-pointer">
                <span>Sanal cüzdan bakiyemi nasıl artırabilirim?</span>
                <svg className="w-4 h-4 text-slate-400 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
