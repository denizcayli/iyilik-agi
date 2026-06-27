import React from 'react';

// Statik ScrollReveal — Intersection Observer yok, içerik her zaman görünür
function ScrollReveal({ children, className = '' }) {
  return (
    <div className={`opacity-100 translate-y-0 transition-all duration-1000 ease-out ${className}`}>
      {children}
    </div>
  );
}

export default function About() {
  return (
    <div className="page-container py-16 space-y-24 text-left">

      {/* Introduction Section (Biz Kimiz?) */}
      <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Text Content */}
        <div className="lg:col-span-7 space-y-6">
          <span className="header-badge">
            Biz Kimiz?
          </span>
          <h1 className="header-title text-3xl md:text-5xl leading-tight">
            Geleceği Şeffaf ve Güvenilir <br />
            <span className="text-pine-teal">İyilik Ağıyla İlmek İlmek Örüyoruz</span>
          </h1>
          <p className="header-desc text-sm md:text-base leading-relaxed">
            İyilik Ağı, yardımlaşma ve sosyal sorumluluk etkinliklerini ileri düzey teknolojiyle buluşturarak toplumsal dayanışmayı dijitalleştiren bağımsız, yenilikçi bir sosyal girişim ekosistemidir. Amacımız; çevre koruma, eğitimde fırsat eşitliği, halk sağlığı, sokak hayvanları hakları ve acil afet yardımları gibi hayati alanlarda faaliyet gösteren sivil toplum çalışmalarını modern yazılım çözümleriyle güçlendirip, her bir bireyin ve kurumun bu iyilik zincirine tam bir güvenle katkı sağlamasına öncülük etmektir.
          </p>
          <p className="header-desc text-sm md:text-base leading-relaxed">
            Geleneksel bağış ve yardımlaşma yöntemlerinde sıklıkla karşılaşılan güvenilirlik ve izlenebilirlik sorunlarını aşmak adına kurulan İyilik Ağı; rol bazlı cüzdan yapısı, gerçek zamanlı bütçe takibi, interaktif etki göstergeleri ve anlık veri entegrasyonları ile bağışçılarına benzersiz bir şeffaflık deneyimi yaşatır. Burada toplanan her bir kuruşun sahadaki somut yansıması, anlık durum güncellemeleri ve belgeli raporlarla anında takip edilebilir.
          </p>

          {/* Value Highlights */}
          <div className="grid-cols-responsive-3 pt-4 border-t border-slate-100">
            <div className="border-l-2 border-pine-teal pl-4 space-y-1">
              <h4 className="text-xs font-bold text-inst-navy uppercase tracking-wider">Radikal Şeffaflık</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Bağışların toplanmasından sahada harcanmasına kadar tüm süreçler açık defter prensibiyle denetlenebilir.
              </p>
            </div>
            <div className="border-l-2 border-ember-coral pl-4 space-y-1">
              <h4 className="text-xs font-bold text-inst-navy uppercase tracking-wider">Dijital İnovasyon</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Modern cüzdan altyapısı ve güvenli simülasyonları ile yardımlaşmayı pratik hale getiriyoruz.
              </p>
            </div>
            <div className="border-l-2 border-amber-500 pl-4 space-y-1">
              <h4 className="text-xs font-bold text-inst-navy uppercase tracking-wider">Sürdürülebilir Etki</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Kısa vadeli yardımlar yerine, kalıcı ve sürdürülebilir toplumsal kalkınmayı hedefleriz.
              </p>
            </div>
          </div>
        </div>

        {/* Side Image */}
        <div className="lg:col-span-5 aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-200/60 bg-white">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"
            alt="Sosyal yardımlaşma el uzatma görseli"
            className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
          />
        </div>

      </ScrollReveal>

      {/* History & Founding Story Section (Tarihçemiz ve Kuruluş Hikayemiz) */}
      <ScrollReveal className="card-base bg-slate-50 border-slate-200/40 md:p-12 space-y-8">
        <div className="max-w-3xl space-y-4">
          <span className="header-badge bg-ember-coral/5 text-ember-coral">
            Hikayemiz
          </span>
          <h2 className="header-title">
            Fikirden Harekete: Bir Güven Arayışının Doğuşu
          </h2>
          <p className="header-desc text-xs md:text-sm leading-relaxed">
            İyilik Ağı, 2024 yılında, sivil toplum faaliyetlerinde şeffaflık ve güven ihtiyacını derinden hisseden bir grup yazılımcı, sosyal girişimci ve deneyimli STK yöneticisinin ortak vizyonuyla kuruldu. Dünyanın dört bir yanındaki bağışçıların "yaptığım yardım gerçekten yerine ulaşıyor mu?" sorusuna teknoloji odaklı, kesin ve tatmin edici bir cevap sunabilmek amacıyla ilk adımlar atıldı.
          </p>
          <p className="header-desc text-xs md:text-sm leading-relaxed">
            Geleneksel yardım toplama süreçlerindeki yavaşlığı, bürokrasiyi ve raporlama eksikliklerini analiz eden kurucu ekibimiz, sivil toplum çalışmalarını anlık olarak izlenebilen ve bağışçıların bizzat katılım gösterebildiği dinamik bir yardımlaşma portalı tasarladı. İlk etapta yerel ormanlaştırma ve köy okullarına kitap tedariki projeleriyle başlayan bu serüven, bugün binlerce gönüllünün, akredite STK'ların ve kurumsal destekçilerin buluştuğu kapsamlı bir platform haline geldi. Bizler, iyiliğin sadece bir finansal işlem değil, kolektif bir sorumluluk ve izlenebilir bir gelecek inşası olduğuna inanıyoruz.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-200 text-center">
          <div>
            <span className="text-2xl md:text-4xl font-black text-pine-teal block">2024</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Kuruluş Yılı</span>
          </div>
          <div>
            <span className="text-2xl md:text-4xl font-black text-inst-navy block">50+</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tamamlanan Büyük Proje</span>
          </div>
          <div>
            <span className="text-2xl md:text-4xl font-black text-ember-coral block">15.000+</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Aktif Gönüllü</span>
          </div>
          <div>
            <span className="text-2xl md:text-4xl font-black text-amber-500 block">%100</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Şeffaflık ve Denetim</span>
          </div>
        </div>
      </ScrollReveal>

      {/* TEMEL DEĞERLERİMİZ SECTION (YENİ - PINE TEAL / EMBER CORAL GRİD) */}
      <ScrollReveal className="space-y-12">
        <div className="header-wrapper max-w-xl mx-auto text-center">
          <span className="header-badge mb-3">
            Karakterimiz
          </span>
          <h2 className="header-title">
            Bizi Biz Yapan Değerlerimiz
          </h2>
          <p className="header-desc mt-2">
            Platformumuzun işleyişini, STK ortaklıklarımızı ve gönüllü ilişkilerimizi yönlendiren değişmez etik kurallarımız.
          </p>
        </div>

        <div className="grid-cols-responsive-3">
          {/* Değer 1 */}
          <div className="card-base hover:shadow-md hover:border-slate-200/60 transition-all p-8 space-y-4">
            <div className="w-11 h-11 rounded-xl bg-pine-teal/10 flex items-center justify-center text-pine-teal">
              <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-inst-navy">Dürüstlük ve Hesap Verebilirlik</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Toplanan fonların ve sahadaki harcamaların her bir kuruşunun hesabı kamuya açık olarak verilir. Güvenin dürüstlükten geçtiğini biliyoruz.
            </p>
          </div>

          {/* Değer 2 */}
          <div className="card-base hover:shadow-md hover:border-slate-200/60 transition-all p-8 space-y-4">
            <div className="w-11 h-11 rounded-xl bg-ember-coral/10 flex items-center justify-center text-ember-coral">
              <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.519 1.116-3.113 1.307-4.793" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-inst-navy">Kolektif Katılım ve Eşitlik</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Bağış miktarından bağımsız olarak her gönüllü ve destekçimizin fikrini önemser, eğitim ve kalkınmada tam fırsat eşitliğini savunuruz.
            </p>
          </div>

          {/* Değer 3 */}
          <div className="card-base hover:shadow-md hover:border-slate-200/60 transition-all p-8 space-y-4">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
              <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-inst-navy">İnovasyon ve Sürekli Gelişim</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Toplumsal fayda için en güncel yazılım mimarilerini, grafik analiz motorlarını ve cüzdan standartlarını kullanarak verimliliği artırırız.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Standards & Auditing (Bağımsız Denetim ve Şeffaflık Standartlarımız) */}
      <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Side Info */}
        <div className="lg:col-span-6 space-y-6">
          <span className="header-badge">
            Denetim ve Güven
          </span>
          <h2 className="header-title">
            Sıfır Hata, Tam Şeffaflık: Denetim Politikamız
          </h2>
          <p className="header-desc text-xs md:text-sm leading-relaxed">
            İyilik Ağı'nda şeffaflık sadece bir vaat değil, tüm sistemin üzerine kurulduğu teknik bir zorunluluktur. Platformumuzda yayınlanan her bir kampanya, kuruşu kuruşuna finansal denetime tabidir. Kampanya bütçeleri oluşturulurken saha ekiplerinden alınan detaylı proforma faturalar ve fizibilite çalışmaları bağımsız STK kurullarımız tarafından onaylanır.
          </p>
          <p className="header-desc text-xs md:text-sm leading-relaxed">
            Ödemelerin tamamlanmasının ardından, toplanan fonların ilgili sivil toplum kuruluşuna aktarım süreçleri ve sahada gerçekleştirilen harcamalar faturalarıyla birlikte sisteme yüklenir. Admin ve Gönüllü panellerimizden saniyeler içinde erişilebilen PDF/Excel raporlama araçları ve Recharts tabanlı dinamik veri grafikleri sayesinde, tüm bütçe kalemleri dış denetime açık tutulur.
          </p>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
            <svg className="w-5 h-5 text-pine-teal mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              <strong>Uluslararası STK Akreditasyonu:</strong> Platformumuzda yer alan tüm ortak kuruluşlar, şeffaf yönetim ve kamu yararı ilkeleri doğrultusunda uluslararası denetim standartlarına uygunluk belgesine sahiptir.
            </p>
          </div>
        </div>

        {/* Right Side Cards */}
        <div className="lg:col-span-6 grid-cols-responsive-2 gap-6">
          <div className="card-base hover:shadow-md hover:border-slate-200/60 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 font-bold font-mono">
              %100
            </div>
            <h4 className="text-xs font-bold text-inst-navy uppercase tracking-wider">İzlenebilir Fonlama</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              Her bağış işleminin hangi kampanya kalemi için toplandığı veritabanımızda benzersiz bir kimlikle saklanır ve değiştirilemez şekilde izlenir.
            </p>
          </div>

          <div className="card-base hover:shadow-md hover:border-slate-200/60 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 className="text-xs font-bold text-inst-navy uppercase tracking-wider">Anlık Rapor İndirme</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              Tüm bağış geçmişi, dönemsel gelirler and harcama dökümleri tek tıkla resmi PDF ve Excel formatlarında dışa aktarılabilir durumdadır.
            </p>
          </div>

          <div className="card-base hover:shadow-md hover:border-slate-200/60 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-pine-teal/10 flex items-center justify-center text-pine-teal">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h4 className="text-xs font-bold text-inst-navy uppercase tracking-wider">Veli/Gönüllü Onayı</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              Özellikle çocuk hakları ve eğitim projelerinde, toplanan bütçelerin aktarımı öncesi bağımsız veli ve öğretmen kurullarının onayı alınır.
            </p>
          </div>

          <div className="card-base hover:shadow-md hover:border-slate-200/60 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-ember-coral/10 flex items-center justify-center text-ember-coral">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 className="text-xs font-bold text-inst-navy uppercase tracking-wider">3D Secure Güvencesi</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              Kartlı bağış simülasyonlarımızda dahi en güncel güvenlik protokolleri uygulanarak, kişisel ve finansal verileriniz maksimum düzeyde korunur.
            </p>
          </div>
        </div>

      </ScrollReveal>

      {/* WORKING PRINCIPLES & STK PROCESS SECTION (YENİ - AÇIK GRİ ARKA PLAN) */}
      <ScrollReveal className="card-base bg-slate-50/70 border-slate-200/40 md:p-12 space-y-10">
        <div className="header-wrapper max-w-xl mx-auto text-center">
          <span className="header-badge mb-3">
            Operasyon Standartlarımız
          </span>
          <h2 className="header-title">
            Çalışma Prensiplerimiz
          </h2>
          <p className="header-desc mt-2">
            Sahadaki sivil toplum faaliyetlerinin verimliliğini ve doğruluğunu garanti altına alan 3 temel operasyonel kuralımız.
          </p>
        </div>

        <div className="grid-cols-responsive-3">

          {/* Prensip 1 */}
          <div className="space-y-3 text-left">
            <span className="text-sm font-black text-pine-teal font-mono">01. STK Akreditasyonu</span>
            <h4 className="text-xs font-bold text-inst-navy uppercase tracking-wider">Kapsamlı Ön İnceleme</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Platforma başvuruda bulunan tüm dernek ve vakıflar; kamu yararı statüsü, yönetim kurulu geçmişi ve finansal şeffaflık ilkelerine göre bağımsız hukuk ve denetim kurullarımız tarafından değerlendirilerek akredite edilir.
            </p>
          </div>

          {/* Prensip 2 */}
          <div className="space-y-3 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-8 text-left">
            <span className="text-sm font-black text-ember-coral font-mono">02. Bütçe Fizibilitesi</span>
            <h4 className="text-xs font-bold text-inst-navy uppercase tracking-wider">Hedef ve Plan Analizi</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Yayına alınması talep edilen her bir etkinlik için sahadan proforma faturalar, malzeme dökümleri ve lojistik yol haritaları istenir. Hedef bütçe, piyasa rayiç bedellerine göre doğrulanmadan kampanya başlatılmaz.
            </p>
          </div>

          {/* Prensip 3 */}
          <div className="space-y-3 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-8 text-left">
            <span className="text-sm font-black text-amber-500 font-mono">03. Etki ve Fatura Denetimi</span>
            <h4 className="text-xs font-bold text-inst-navy uppercase tracking-wider">Sonuç Raporlama</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Kampanya başarıyla bittiğinde, toplanan bütçenin transferi ve sahada yapılan satın alımların faturaları dijital olarak veritabanımızda arşivlenir. Gönüllülerimizin katılım saatleri ile eş zamanlı olarak etki analizi raporu çıkarılır.
            </p>
          </div>

        </div>
      </ScrollReveal>

    </div>
  );
}
