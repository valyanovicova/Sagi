import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function CreateOffer() {
  const { t } = useLanguage();
  const categories = [
    { key: 'food', label: t('food') },
    { key: 'education', label: t('education') },
    { key: 'beauty', label: t('beauty') },
    { key: 'retail', label: t('retail') },
    { key: 'other', label: t('other') },
  ];
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    discount: '',
    validUntil: '',
    terms: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/business/offers" className="text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold">{t('newOffer')}</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-2">{t('offerTitle')}</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder={t('offerTitlePlaceholder')}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">{t('description')}</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder={t('descriptionPlaceholder')}
              rows={3}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">{t('category')}</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setForm({ ...form, category: cat.key })}
                  className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                    form.category === cat.key
                      ? 'bg-[#10b981] text-white'
                      : 'bg-input-background text-foreground border border-border'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">{t('discount')}</label>
            <input
              type="text"
              value={form.discount}
              onChange={(e) => setForm({ ...form, discount: e.target.value })}
              placeholder={t('discountPlaceholder')}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">{t('validUntil')}</label>
            <input
              type="date"
              value={form.validUntil}
              onChange={(e) => setForm({ ...form, validUntil: e.target.value })}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">{t('termsConditions')}</label>
            <textarea
              value={form.terms}
              onChange={(e) => setForm({ ...form, terms: e.target.value })}
              placeholder={t('termsPlaceholder')}
              rows={3}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-2xl font-medium hover:shadow-lg transition-shadow"
          >
            {t('createOffer')}
          </button>
        </form>
      </div>
    </div>
  );
}
