import { Link } from "react-router-dom";
import { getUrgencyStyles } from "../../utils/urgency";
import ProgressBar from "./ProgressBar";
import CountdownTimer from "./CountdownTimer";

export default function EventCard({ event }) {
  const {
    id,
    title,
    description,
    category,
    targetAmount,
    raisedAmount,
    daysLeft,
    hoursLeft,
    minutesLeft,
    imageUrl,
    donorCount,
    volunteerCount,
  } = event;

  const percentage = Math.min(Math.round((raisedAmount / targetAmount) * 100), 100);
  const isCompleted = raisedAmount >= targetAmount;
  const isGenelBagis = (imageUrl && imageUrl.includes('genel-bagis')) || title === 'Genel Bağış';
  const isExpired = !isGenelBagis && daysLeft <= 0 && hoursLeft <= 0 && minutesLeft <= 0;
  const urgency = getUrgencyStyles(isGenelBagis ? 999 : daysLeft);

  const getCategoryBadgeClass = (cat) => {
    switch (cat) {
      case "Çevre": return "bg-emerald-50 text-emerald-700 border-emerald-200/50";
      case "Eğitim": return "bg-blue-50 text-blue-700 border-blue-200/50";
      case "Sağlık": return "bg-purple-50 text-purple-700 border-purple-200/50";
      case "Hayvanlar": return "bg-amber-50 text-amber-700 border-amber-200/50";
      case "Afet": return "bg-red-50 text-red-700 border-red-200/50";
      case "Çocuk": return "bg-pink-50 text-pink-700 border-pink-200/50";
      case "Yaşlı": return "bg-indigo-50 text-indigo-700 border-indigo-200/50";
      case "Su": return "bg-cyan-50 text-cyan-700 border-cyan-200/50";
      default: return "bg-slate-50 text-slate-700 border-slate-200/50";
    }
  };

  return (
    <div className={`campaign-card text-left ${isCompleted ? "opacity-85 saturate-[85%]" : isExpired ? "opacity-75 grayscale-[20%]" : ""}`}>
      <div className="relative aspect-video overflow-hidden shrink-0">
        <img src={imageUrl} alt={title} className="campaign-card-image" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
        <span className={`absolute top-4 left-4 text-[10px] font-bold px-2.5 py-1 rounded-lg border shadow-sm backdrop-blur-md ${getCategoryBadgeClass(category)}`}>
          {category}
        </span>
        {isCompleted ? (
          <span className="absolute top-4 right-4 text-[9px] font-extrabold px-2.5 py-1 rounded-lg border shadow-sm backdrop-blur-md flex items-center gap-1 bg-emerald-50 text-emerald-700 border-emerald-200">
            <svg className="w-3 h-3 text-emerald-600 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            Tamamlandı
          </span>
        ) : isExpired ? (
          <span className="absolute top-4 right-4 text-[9px] font-extrabold px-2.5 py-1 rounded-lg border shadow-sm backdrop-blur-md flex items-center gap-1 bg-slate-50 text-slate-600 border-slate-200">
            Süresi Bitti
          </span>
        ) : urgency.badgeText ? (
          <span className={`absolute top-4 right-4 text-[9px] font-extrabold px-2.5 py-1 rounded-lg border shadow-sm backdrop-blur-md flex items-center gap-1 bg-white/90 ${urgency.isCritical ? "text-[#D9533B] border-red-200 animate-pulse" : "text-[#D97706] border-amber-200"}`}>
            {urgency.isCritical && <span className="w-1.5 h-1.5 rounded-full bg-[#D9533B] inline-block animate-ping"></span>}
            {urgency.badgeText}
          </span>
        ) : null}
      </div>

      <div className="campaign-card-body justify-between">
        <div>
          <Link to={`/events/${id}`} className="campaign-card-title hover:text-pine-teal cursor-pointer transition-colors block">
            {title}
          </Link>
          <p className="campaign-card-desc">{description}</p>
        </div>

        <div>
          {!isGenelBagis && (
            <div className="mb-4">
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Toplanan İlerleme</span>
                <span className="text-xs font-black font-mono" style={{ color: urgency.color }}>{percentage}%</span>
              </div>
              <ProgressBar percentage={percentage} progressBarBg={urgency.progressBarBg} />
              <div className="flex justify-between items-center mt-2 text-[10px] font-semibold">
                <span className="font-mono text-slate-700">{raisedAmount.toLocaleString("tr-TR")} ₺</span>
                <span className="text-slate-400">Hedef: <strong className="font-semibold font-mono text-slate-600">{targetAmount.toLocaleString("tr-TR")} ₺</strong></span>
              </div>
            </div>
          )}

          <div className="border-t border-slate-100 my-4"></div>

          {isGenelBagis ? (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Toplam Bağış</span>
                <div className="font-mono text-sm font-black text-pine-teal">
                  {raisedAmount.toLocaleString("tr-TR")} ₺
                </div>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Gönüllü Sayısı</span>
                <div className="font-mono text-sm font-black text-slate-700 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-pine-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>{(volunteerCount || donorCount || 0).toLocaleString("tr-TR")}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Durum / Süre</span>
                <CountdownTimer daysLeft={daysLeft} hoursLeft={hoursLeft} minutesLeft={minutesLeft} isCompleted={isCompleted} isExpired={isExpired} urgencyColor={urgency.color} />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Destekçi Sayısı</span>
                <div className="font-mono text-xs font-bold text-slate-700 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-pine-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>{donorCount != null ? `${donorCount} kişi` : '—'}</span>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-50">
            <Link to={`/events/${id}`} className="btn btn-secondary text-center">Detaylar</Link>
            {isCompleted ? (
              <button disabled className="btn btn-disabled bg-emerald-50 text-emerald-700 border-transparent text-center">Hedefe Ulaştı</button>
            ) : isExpired ? (
              <button disabled className="btn btn-disabled text-center">Süresi Bitti</button>
            ) : (
              <Link to="/payment" state={{ eventId: id, eventTitle: title }} className="btn btn-accent text-center">Bağış Yap</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}