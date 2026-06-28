import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../store/slices/eventSlice';
import GlassCard from '../components/GlassCard';
import EventCard from '../components/Event/EventCard';

export default function Home() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.list);
  const [faqs, setFaqs] = useState([]);
  const [stories, setStories] = useState([]);
  const [openFaqIds, setOpenFaqIds] = useState([0]);

  useEffect(() => {
    dispatch(fetchEvents());
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => {
        setFaqs(data.faqs || []);
        setStories(data.stories || []);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [dispatch]);

  const toggleFaq = (id) => {
    if (openFaqIds.includes(id)) {
      setOpenFaqIds(openFaqIds.filter((faqId) => faqId !== id));
    } else {
      setOpenFaqIds([...openFaqIds, id]);
    }
  };

  const featured = events[0] || null;
  const featuredPercentage = featured
    ? Math.min(Math.round((featured.raisedAmount / featured.targetAmount) * 100), 100)
    : 0;

  return (
    <div className="flex flex-col overflow-x-hidden">
      <section
        className="relative min-h-[550px] md:min-h-[650px] bg-cover bg-center flex items-center py-12 md:py-20 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(22, 49, 77, 0.85), rgba(22, 49, 77, 0.4)), url('https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1920&q=80')`
        }}
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

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
                className="btn btn-accent px-6 py-3 border border-white/10"
              >
                Etkinlikleri Keşfet
              </Link>
              <a
                href="#how-it-works"
                className="btn btn-secondary px-6 py-3 border border-white/20 text-white bg-white/10 backdrop-blur-md"
              >
                Nasıl Çalışır?
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center w-full">
            {featured ? (
              <GlassCard className="liquid-glass hero-glass-card">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-yellow-500 text-white font-extrabold text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-bl-xl shadow-sm border-l border-b border-white/15 z-20">
                  Öne Çıkan Etkinlik
                </div>

                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 bg-white/10 border border-white/15 px-2.5 py-1 rounded-full inline-block">
                    {featured.category}
                  </span>
                  <span className="text-[9px] font-extrabold px-2.5 py-1 rounded-lg border shadow-sm backdrop-blur-md flex items-center gap-1 bg-white/15 border-white/20 text-amber-300">
                    Son {featured.daysLeft} Gün
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug text-shadow-sm text-left">
                  {featured.title}
                </h3>
                <p className="text-xs text-slate-200/95 mb-4 line-clamp-3 leading-relaxed text-shadow-sm font-medium text-left">
                  {featured.description}
                </p>

                <div className="mb-4 bg-white/5 border border-white/10 rounded-xl p-3 shadow-inner text-left">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-[9px] text-slate-300 font-bold uppercase tracking-wider text-shadow-sm">Toplanan İlerleme</span>
                    <span className="text-xs font-black font-mono text-amber-300">{featuredPercentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-amber-400 transition-all duration-500" style={{ width: `${featuredPercentage}%` }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-xs font-mono font-bold">
                    <span className="text-white text-shadow-sm">₺{featured.raisedAmount.toLocaleString('tr-TR')}</span>
                    <span className="text-slate-300 text-shadow-sm font-medium">Hedef: ₺{featured.targetAmount.toLocaleString('tr-TR')}</span>
                  </div>
                </div>

                <div className="flex justify-between text-xs mb-5 font-semibold text-left">
                  <div>
                    <span className="text-[9px] text-slate-300 uppercase block font-bold text-shadow-sm">Kalan Süre</span>
                    <span className="font-mono text-amber-300 text-shadow-sm">{featured.daysLeft} Gün</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-300 uppercase block font-bold text-shadow-sm">Destekçi</span>
                    <span className="font-mono text-white text-shadow-sm">{featured.donorCount.toLocaleString('tr-TR')} Kişi</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to={`/events/${featured.id}`}
                    className="btn btn-secondary bg-white/10 border-white/25 text-white"
                  >
                    Detayları Gör
                  </Link>
                  <Link
                    to="/payment"
                    state={{ eventId: featured.id, eventTitle: featured.title }}
                    className="btn btn-accent border-white/10"
                  >
                    Hemen Bağışla
                  </Link>
                </div>
              </GlassCard>
            ) : (
              <div className="flex justify-center items-center w-full max-w-[460px] h-[350px] rounded-3xl bg-white/5 border border-white/10 text-white font-medium text-sm animate-pulse">
                Yükleniyor...
              </div>
            )}
          </div>
        </div>
      </section>

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

      <section className="bg-slate-50/70 border-b border-slate-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="header-badge">
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
              <div className="vision-card">
                <div className="w-10 h-10 rounded-xl bg-pine-teal/10 flex items-center justify-center text-pine-teal">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h4 className="text-sm font-bold text-inst-navy uppercase tracking-wider">Misyonumuz</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Bağışçı ile sahada ter döken sivil toplum kuruluşlarını dürüstlük prensibi çerçevesinde buluşturarak her yardımın tam yerini bulmasını sağlamak.</p>
              </div>
              <div className="vision-card">
                <div className="w-10 h-10 rounded-xl bg-ember-coral/10 flex items-center justify-center text-ember-coral">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
                <h4 className="text-sm font-bold text-inst-navy uppercase tracking-wider">Vizyonumuz</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Küresel standartlarda şeffaflık derecesine sahip, sivil toplum faaliyetlerinde güven denince akla gelen ilk dijital sosyal sorumluluk ağı olmak.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="how-it-works" className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="header-wrapper max-w-xl mx-auto mb-16 text-center">
            <span className="header-badge">Süreç Nasıl İşler?</span>
            <h2 className="header-title">4 Basit Adımda İyilik Akışı</h2>
            <p className="header-desc">Sistemimiz şeffaflık, hız ve güven esasına dayalı bir dijital simülasyon olarak kurgulanmıştır.</p>
          </div>
          <div className="grid-cols-responsive-4 text-center">
            <div className="process-card">
              <div className="w-12 h-12 rounded-xl bg-pine-teal/10 text-pine-teal flex items-center justify-center mx-auto font-bold text-lg">1</div>
              <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">Etkinliği Keşfet</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Çevre korumadan köy okullarına, temiz su kuyularından sokak hayvanları rehabilitasyonuna kadar uzanan 8 farklı kategorideki aktif etkinliklerimizi listeleyin.</p>
            </div>

            <div className="process-card">
              <div className="w-12 h-12 rounded-xl bg-ember-coral/10 text-ember-coral flex items-center justify-center mx-auto font-bold text-lg">2</div>
              <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">Bağış Yap veya Gönüllü Ol</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Katkıda bulunmak istediğiniz bütçeyi seçerek cüzdanınızdan doğrudan hedeflere aktarın veya sahada görev almak için gönüllülük talebi oluşturun.</p>
            </div>

            <div className="process-card">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto font-bold text-lg">3</div>
              <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">Şeffaf Raporları İncele</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Sistem üzerindeki anlık finansal veri dökümleriyle fon birikimini izleyin. Yönetici panelinden hazırlanan Excel ve PDF fatura kayıtlarını şeffafça denetleyin.</p>
            </div>

            <div className="process-card">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center mx-auto font-bold text-lg">4</div>
              <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">Sosyal Etkini Profilde Gör</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Yaptığınız bağışlar ve katıldığınız görevler profil sayfanıza anlık olarak işlenir. Toplumsal fayda puanınızı ve kazandığınız teşekkür rozetlerini sergileyin.</p>
            </div>
          </div>
        </div>
      </section>


      <section className="bg-inst-navy text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pine-teal/15 rounded-full filter blur-[80px] pointer-events-none z-0"></div>
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-white/10 px-3.5 py-1.5 rounded-full inline-block border border-white/10">PLATFORM GÜVEN SÖZLEŞMESİ</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Şeffaflık Bizim İçin <span className="text-emerald-400">Bir Tercih Değil, Temel İlkedir</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium">
            İyilik Ağı Platformu'nda, toplanan her bir kuruşun hangi projenin hangi kaleminde harcandığı kuruşu kuruşuna kayıt altına alınır. Vakfımız, sivil toplum faaliyetlerinde denetlenebilirlik çıtasını en üst düzeye çıkarmayı taahhüt eder.
          </p>
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
            <div className="trust-card">
              <span className="text-emerald-400 font-bold text-xs block mb-1">Bağımsız Denetim</span>
              <p className="text-[10px] text-slate-400 font-medium">Dönemsel olarak akredite mali denetçiler tarafından denetleme raporları sunulur.</p>
            </div>
            <div className="trust-card">
              <span className="text-emerald-400 font-bold text-xs block mb-1">Açık Fatura Kaydı</span>
              <p className="text-[10px] text-slate-400 font-medium">Satın alınan her fidan, kitap veya ekipmanın faturası sistemde kamuya açık yayınlanır.</p>
            </div>
            <div className="trust-card">
              <span className="text-emerald-400 font-bold text-xs block mb-1">%100 Doğrudan Transfer</span>
              <p className="text-[10px] text-slate-400 font-medium">Fonlar, hedefe ulaşıldığı an hiçbir platform kesintisi olmaksızın projeye aktarılır.</p>
            </div>
          </div>
        </div>
      </section>


      <section id="active-campaigns" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div>
          <div className="header-wrapper max-w-xl mx-auto mb-12 text-center">
            <span className="header-badge">Öne Çıkan Çalışmalarımız</span>
            <h2 className="header-title">Aktif Sosyal Sorumluluk Etkinliklerimiz</h2>
            <p className="header-desc">Sivil toplum kuruluşlarımız tarafından sahada bizzat koordine edilen ve desteklerinizi bekleyen en güncel projeler.</p>
          </div>

          <div className="grid-cols-responsive-4">
            {events.length > 0 ? (
              events.slice(0, 4).map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-slate-100 rounded-3xl h-[400px] animate-pulse border border-slate-200" />
              ))
            )}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/events"
              className="btn btn-secondary px-6 py-3"
            >
              Tüm Etkinlikleri Gör
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50/70 py-20 px-4 sm:px-6 lg:px-8 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="header-wrapper max-w-xl mx-auto mb-12 text-center">
            <span className="header-badge">Hayat Veren Dokunuşlar</span>
            <h2 className="header-title">İyilik Ağı ile Gerçekleşen Değişimler</h2>
            <p className="header-desc">Platformumuz üzerinden toplanan bağışlar ve gönüllülerimizin özverili çalışmalarıyla hayata geçen ilham verici hikayelerimiz.</p>
          </div>
          <div className="grid-cols-responsive-2">
            {stories.map((story) => (
              <div key={story.id} className="story-card">
                <div className="story-image-wrap">
                  <img src={story.imageUrl} alt={story.title} className="story-image" />
                </div>
                <div className="story-content">
                  <span className={story.category.includes("Çevre") ? "story-badge-green" : "story-badge-teal"}>
                    {story.category}
                  </span>
                  <h3 className="text-base font-bold text-inst-navy">{story.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{story.description}</p>
                  <div className="story-partner">{story.partner}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="header-wrapper max-w-xl mx-auto mb-12 text-center">
            <span className="header-badge">Merak Edilenler</span>
            <h2 className="header-title">Sıkça Sorulan Sorular</h2>
            <p className="header-desc">Platformumuza, bağış süreçlerine ve denetim mekanizmalarımıza ilişkin aklınıza takılabilecek temel konular.</p>
          </div>
          <div className="space-y-4 text-left">
            {faqs.map((item) => {
              const isOpen = openFaqIds.includes(item.id);
              return (
                <div key={item.id} className="faq-card">
                  <button
                    onClick={() => toggleFaq(item.id)}
                    className="faq-btn"
                  >
                    <span>{item.question}</span>
                    <svg className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-pine-teal" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-container">
                      <p className="faq-answer-text">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
