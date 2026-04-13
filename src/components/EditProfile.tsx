import { ChevronLeft, Camera } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';

export function EditProfile() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: language === 'en' ? 'Alima' : 'Алима',
    lastName: language === 'en' ? 'Alieva' : 'Алиева',
    email: 'alima.alieva@example.com',
    phone: '+7 777 123 4567',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/user/profile" className="text-foreground">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl">{t('editProfile')}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200"
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-[#10b981]"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#10b981] flex items-center justify-center text-white shadow-lg hover:bg-[#059669] transition-colors"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <button type="button" className="mt-3 text-[#10b981] text-sm">
              {t('changePhoto')}
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">{t('firstName')}</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">{t('lastName')}</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">{t('birthday')}</label>
              <input
                type="text"
                value="15 / 03 / 1995"
                disabled
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl opacity-60 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">{t('email')}</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">{t('phoneNumber')}</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-2xl hover:shadow-lg transition-shadow"
          >
            {t('save')}
          </button>
        </form>
      </div>
    </div>
  );
}
