import { ChevronLeft, MessageCircle, Send, Phone, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';

export function SupportSettings() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqItems = [
    { id: 1, question: t('faqQuestion1'), answer: t('faqAnswer1') },
    { id: 2, question: t('faqQuestion2'), answer: t('faqAnswer2') },
    { id: 3, question: t('faqQuestion3'), answer: t('faqAnswer3') },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-foreground">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl">{t('support')}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <h2 className="mb-4">{t('contactUs')}</h2>

        <div className="space-y-3 mb-8">
          <a
            href="https://wa.me/77771234567"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-2xl p-4 text-white hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1">WhatsApp {t('support')}</h3>
                <p className="text-xs opacity-90">{t('whatsappDesc')}</p>
              </div>
            </div>
          </a>

          <a
            href="https://t.me/SagiSupportBot"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gradient-to-br from-[#0088cc] to-[#006699] rounded-2xl p-4 text-white hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Send className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1">Telegram {t('bot')}</h3>
                <p className="text-xs opacity-90">{t('telegramDesc')}</p>
              </div>
            </div>
          </a>

          <a
            href="tel:+77001234567"
            className="block bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl p-4 text-white hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1">{t('callCenter')}</h3>
                <p className="text-xs opacity-90">{t('callCenterDesc')}</p>
              </div>
            </div>
          </a>
        </div>

        <h2 className="mb-4">{t('faq')}</h2>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {faqItems.map((item, index) => (
            <div key={item.id}>
              {index > 0 && <div className="border-t border-border" />}
              <button
                onClick={() => setExpandedFaq(expandedFaq === item.id ? null : item.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-input-background transition-colors"
              >
                <span className="text-left flex-1">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    expandedFaq === item.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedFaq === item.id && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
