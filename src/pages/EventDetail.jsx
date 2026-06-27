import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUrgencyStyles } from "../utils/urgency";

const MOCK_IS_AUTHENTICATED = true;

const getInitialLetter = (donorName) => {
  return donorName ? donorName.charAt(0).toUpperCase() : "?";
};

export default function EventDetail() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [currentEvent, setCurrentEvent] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });


  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => {
        const eventsList = data.events || data;
        const found = eventsList.find((e) => e.id === id) || eventsList[0];
        setCurrentEvent(found);
        if (found) {
          setTimeLeft({
            days: found.daysLeft,
            hours: found.hoursLeft,
            minutes: found.minutesLeft,
            seconds: found.secondsLeft,
          });
        }
      });
  }, [id]);

  useEffect(() => {
    if (!currentEvent) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        }
        if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        }
        if (prevTime.hours > 0) {
          return {
            ...prevTime,
            hours: prevTime.hours - 1,
            minutes: 59,
            seconds: 59,
          };
        }
        if (prevTime.days > 0) {
          return {
            ...prevTime,
            days: prevTime.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        clearInterval(timer);
        return prevTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentEvent]);

  if (!currentEvent) {
    return <div className="py-xl text-center">Yükleniyor...</div>;
  }


  const eventDonations = currentEvent.donations || [];
  const urgency = getUrgencyStyles(timeLeft.days);
  const percentage = Math.min(
    Math.round((currentEvent.raisedAmount / currentEvent.targetAmount) * 100),
    100,
  );


  const handleVolunteerClick = () => {
    if (!MOCK_IS_AUTHENTICATED) {
      navigate("/login");
      return;
    }

    setHasApplied(true);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  return (
    <div className="page-container py-8">
      {showToast && (
        <div className="fixed top-24 right-6 z-50 bg-white border border-emerald-100 shadow-xl rounded-2xl p-4 max-w-sm flex items-start gap-3 toast-animate-in transition-all">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-800">
              Başvurunuz Alındı!
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              Gönüllü olarak katıldınız. Katılım detaylarınızı profilinizden
              inceleyebilirsiniz.
            </p>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="text-slate-400 hover:text-slate-650 shrink-0 transition-colors cursor-pointer"
            type="button"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <Link
        to="/events"
        className="btn btn-secondary mb-6 inline-flex items-center gap-1.5"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Etkinliklere Geri Dön
      </Link>

      <div className="bento-grid items-start">
        <div className="md:col-span-8 space-y-6">
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-md border border-slate-100 bg-white">
            <img
              src={currentEvent.imageUrl}
              alt={currentEvent.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>

            <span className="absolute top-6 left-6 text-xs font-bold px-3.5 py-2 rounded-xl border shadow-sm backdrop-blur-md bg-emerald-50 text-emerald-700 border-emerald-200/50">
              {currentEvent.category}
            </span>

            <span className="absolute top-6 right-6 text-xs font-extrabold px-3 py-2 rounded-xl border shadow-sm backdrop-blur-md flex items-center gap-1.5 bg-white text-amber-600 border-amber-200">
              Son {currentEvent.daysLeft} Gün
            </span>
          </div>

          <div className="card-base md:p-8 space-y-6 text-slate-800">
            <h1 className="text-xl md:text-3xl font-extrabold text-inst-navy tracking-tight leading-tight">
              {currentEvent.title}
            </h1>
            <div className="border-t border-slate-100 my-4"></div>
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Etkinlik Hakkında
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                {currentEvent.description}
              </p>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                Bu sosyal sorumluluk etkinliği, İyilik Ağı platformu çatısı
                altında tamamen şeffaf ve denetlenebilir bütçeler ile
                yönetilmektedir. Etkinlik hedefine ulaştığında, toplanan tüm
                bağışlar doğrudan sahadaki lojistik ve operasyonel ekiplere
                aktarılarak ilgili çalışmalar başlatılacaktır.
              </p>
            </div>
          </div>

          <div className="card-base space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Bu Etkinliği Paylaş
            </h3>
            <p className="text-xs text-slate-500">
              Daha fazla insana ulaşarak iyilik zincirini büyütmemize yardımcı
              olabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-center">
                <button className="share-btn bg-pink-50 border border-pink-200/50 hover:bg-pink-100/60 text-pink-700">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  Instagram
                </button>
                <a
                  href="https://api.whatsapp.com/send?text=İyilik%20Ağı"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn bg-emerald-50 border border-emerald-200/50 hover:bg-emerald-100/60 text-emerald-700"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.389 9.805-9.801.002-2.623-1.023-5.086-2.88-6.946C16.32 1.999 13.861.979 11.23.979 5.827.979 1.425 5.378 1.422 10.791c-.001 1.516.4 3.003 1.161 4.33l-.955 3.486 3.58-.934z" />
                  </svg>
                  WhatsApp
                </a>
                <a
                  href="https://twitter.com/intent/tweet?text=İyilik%20Ağı"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn bg-slate-900 border border-slate-950 text-white hover:bg-black"
                >
                  X Twitter
                </a>
                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=iyilikagi.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn bg-blue-50 border border-blue-200/50 hover:bg-blue-100/60 text-blue-700"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
              </div>
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  readOnly
                  defaultValue={`https://iyilikagi.org/events/${currentEvent.id}`}
                  className="w-full pl-3 pr-24 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-mono font-semibold text-slate-500 outline-none"
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-pine-teal hover:bg-emerald-700 text-white font-bold rounded-lg text-[9px] transition-all cursor-pointer">
                  Kopyala
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 space-y-6">
          <div className="card-base shadow-md space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Etkinlik Durumu
            </h3>

            <div>
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-xs font-semibold text-slate-500">
                  Toplanan Tutar
                </span>
                <span
                  className={`text-lg font-black font-mono ${urgency.urgencyColor}`}
                >
                  {percentage}%
                </span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${urgency.progressBarBg}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center mt-2.5">
                <span className="text-base font-bold font-mono text-slate-800">
                  {currentEvent.raisedAmount.toLocaleString("tr-TR")} ₺
                </span>
                <span className="text-xs text-slate-400">
                  Hedef:
                  <strong className="font-semibold font-mono text-slate-600">
                    {" "}
                    {currentEvent.targetAmount.toLocaleString("tr-TR")} ₺
                  </strong>
                </span>
              </div>
            </div>

            <div className="border-t border-slate-100 my-4"></div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">
                  Kalan Süre
                </span>
                <span
                  className={`font-mono text-xs font-bold block ${urgency.urgencyColor}`}
                >
                  {timeLeft.days}g {String(timeLeft.hours).padStart(2, "0")}s{" "}
                  {String(timeLeft.minutes).padStart(2, "0")}d
                </span>
                <span className="font-mono text-[10px] text-slate-400 block mt-0.5">
                  {timeLeft.seconds} saniye
                </span>
              </div>
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">
                  Destekçi Sayısı
                </span>
                <span className="font-mono text-xs font-bold text-slate-700 block">
                  {currentEvent.donorCount.toLocaleString("tr-TR")} Kişi
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Aktif bağışçı
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                to="/payment"
                className="btn btn-accent w-full py-3.5 text-center block"
              >
                Bu Etkinliğe Bağış Yap
              </Link>
              <button
                type="button"
                onClick={handleVolunteerClick}
                disabled={hasApplied}
                className={`btn w-full py-3.5 text-center transition-all ${hasApplied
                    ? "bg-emerald-50 text-emerald-600 border-emerald-100 cursor-not-allowed font-bold"
                    : "btn-primary"
                  }`}
              >
                {hasApplied ? "Başvuruldu" : "Gönüllü Olarak Katıl"}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Son Bağışlar
              </h3>
              <span className="text-[10px] font-bold text-pine-teal bg-pine-teal/5 px-2 py-0.5 rounded-md">
                Canlı Akış
              </span>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {eventDonations.length > 0 ? (
                eventDonations.map((donation) => (
                  <div
                    key={donation.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs hover:border-pine-teal/10 transition-all"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-pine-teal/10 flex items-center justify-center text-pine-teal font-bold text-xs shrink-0">
                        {getInitialLetter(donation.donorName)}
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-slate-700 block truncate">
                          {donation.donorName}
                        </span>
                        <span className="text-[9px] text-slate-400 block">
                          {donation.timeAgo}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-emerald-600 shrink-0">
                      +₺{donation.amount.toLocaleString("tr-TR")}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs border border-dashed border-slate-100 rounded-2xl">
                  Henüz bağış yapılmamış. İlk bağışı siz yapın!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
