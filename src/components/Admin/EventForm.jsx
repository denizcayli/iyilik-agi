import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addEventAsync, fetchCategories } from '../../store/slices/eventSlice';

export default function EventForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.events.categories).filter((cat) => cat !== 'Tümü');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Çevre');
  const [targetAmount, setTargetAmount] = useState('');
  const [daysLeft, setDaysLeft] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTitleChange = (val) => {
    setTitle(val);
    setErrorMessage('');
  };

  const handleTargetAmountChange = (val) => {
    setTargetAmount(val);
    setErrorMessage('');
  };

  const handleDaysLeftChange = (val) => {
    setDaysLeft(val);
    setErrorMessage('');
  };

  const handleDescriptionChange = (val) => {
    setDescription(val);
    setErrorMessage('');
  };

  const getStockPhotoForCategory = (cat) => {
    switch (cat) {
      case "Çevre":
        return "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80";
      case "Eğitim":
        return "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80";
      case "Sağlık":
        return "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80";
      case "Hayvanlar":
        return "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80";
      case "Afet":
        return "https://images.unsplash.com/photo-1469571486090-7d99c91b7829?auto=format&fit=crop&w=800&q=80";
      case "Çocuk":
        return "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80";
      case "Yaşlı":
        return "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80";
      case "Su":
        return "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=800&q=80";
      default:
        return "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80";
    }
  };

  const handleStartEvent = () => {
    if (!title.trim() || !targetAmount || !daysLeft || !description.trim()) {
      setErrorMessage('Lütfen tüm zorunlu alanları (*) eksiksiz doldurun.');
      return;
    }

    const newEvent = {
      title: title.trim(),
      category,
      targetAmount: Number(targetAmount) || 0,
      daysLeft: Number(daysLeft) || 0,
      imageUrl: imageUrl.trim() || getStockPhotoForCategory(category),
      description: description.trim()
    };

    dispatch(addEventAsync(newEvent)).then(() => {
      window.dispatchEvent(new Event('dashboard-data-updated'));
      localStorage.setItem('pending_toast', 'Etkinlik başlatıldı');
      navigate('/admin/events');
    });
  };

  const handleCancel = () => {
    navigate('/admin/events');
  };

  return (
    <div className="card-base md:p-8 text-left">
      <div className="border-b border-slate-100 pb-4 mb-6">
        <h3 className="text-xs font-black text-inst-navy uppercase tracking-wider">ETKİNLİK BİLGİLERİ</h3>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-4 font-bold flex items-start gap-2 mb-6 animate-pulse">
          <svg className="w-4.5 h-4.5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">ETKİNLİK BAŞLIĞI *</label>
            <input
              type="text"
              placeholder="Örn: Geleceğe Nefes"
              className="form-input w-full"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">KATEGORİ *</label>
            <select
              className="form-input w-full cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">HEDEF BÜTÇE (₺) *</label>
            <input
              type="number"
              placeholder="Örn: 1000000"
              className="form-input w-full"
              value={targetAmount}
              onChange={(e) => handleTargetAmountChange(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">ETKİNLİK SÜRESİ (GÜN) *</label>
            <input
              type="number"
              placeholder="Örn: 100"
              className="form-input w-full"
              value={daysLeft}
              onChange={(e) => handleDaysLeftChange(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">GÖRSEL URL (İSTEĞE BAĞLI)</label>
          <input
            type="url"
            placeholder="Örn: https://images.unsplash.com/..."
            className="form-input w-full"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">PROJE DETAYLI AÇIKLAMASI *</label>
          <textarea
            placeholder="Projenin amacı, kapsamı ve hedef kitlesi hakkında detaylı bilgi yazın..."
            rows={5}
            className="form-input w-full resize-none"
            value={description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
          <button
            type="button"
            className="btn btn-secondary px-6 py-2.5"
            onClick={handleCancel}
          >
            İptal
          </button>
          <button
            type="button"
            className="btn btn-primary flex items-center gap-1.5 px-6 py-2.5"
            onClick={handleStartEvent}
          >
            <svg className="w-4 h-4 rotate-45 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>Etkinliği Başlat</span>
          </button>
        </div>
      </div>
    </div>
  );
}
