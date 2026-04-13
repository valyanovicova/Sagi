import { useState } from 'react';
import { ScanLine, Keyboard, CheckCircle2, XCircle, RotateCcw, BadgeCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

type InputMode = 'scan' | 'code';
type AccessResult = 'granted' | 'denied' | 'submitted' | null;

const mockValidCodes = ['0042', '1042', '2318', '0987', '1654', '3201'];

export function ScanMember() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<InputMode>('scan');
  const [code, setCode] = useState('');
  const [result, setAccessResult] = useState<AccessResult>(null);
  const [checkedCode, setCheckedCode] = useState('');

  const verify = (val: string) => {
    const trimmed = val.trim();
    setCheckedCode(trimmed);
    setAccessResult(mockValidCodes.includes(trimmed) ? 'granted' : 'denied');
  };

  const reset = () => {
    setCode('');
    setAccessResult(null);
    setCheckedCode('');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold">{t('checkMemberAccess')}</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">

        {/* Mode toggle */}
        <div className="flex gap-2 bg-input-background rounded-xl p-1">
          <button
            onClick={() => { setMode('scan'); reset(); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${mode === 'scan' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}
          >
            <ScanLine className="w-4 h-4" />
            {t('scanQR')}
          </button>
          <button
            onClick={() => { setMode('code'); reset(); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${mode === 'code' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}
          >
            <Keyboard className="w-4 h-4" />
            {t('typeCode')}
          </button>
        </div>

        {/* Scan mode */}
        {mode === 'scan' && !result && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* Camera viewfinder mock */}
            <div className="relative bg-black aspect-square flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 relative">
                  {/* Corner brackets */}
                  <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#10b981] rounded-tl-lg" />
                  <span className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#10b981] rounded-tr-lg" />
                  <span className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#10b981] rounded-bl-lg" />
                  <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#10b981] rounded-br-lg" />
                  {/* Scan line animation */}
                  <div className="absolute left-2 right-2 h-0.5 bg-[#10b981] opacity-80 animate-[scan_2s_linear_infinite]" style={{ top: '50%' }} />
                </div>
              </div>
              <p className="absolute bottom-4 text-white/60 text-xs">{t('scanQRHint')}</p>
            </div>
            {/* Simulate scan button */}
            <div className="p-4 border-t border-border flex gap-2">
              <button
                onClick={() => verify('0042')}
                className="flex-1 py-2.5 bg-[#10b981] text-white rounded-xl text-sm font-medium"
              >
                {t('simulateScanValid')}
              </button>
              <button
                onClick={() => verify('9999')}
                className="flex-1 py-2.5 bg-red-500/10 text-red-500 rounded-xl text-sm font-medium"
              >
                {t('simulateScanInvalid')}
              </button>
            </div>
          </div>
        )}

        {/* Code input mode */}
        {mode === 'code' && !result && (
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <p className="text-sm text-muted-foreground">{t('checkAccessDesc')}</p>
            <form
              onSubmit={(e) => { e.preventDefault(); verify(code); }}
              className="space-y-3"
            >
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={t('memberCodePlaceholder')}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:border-[#10b981] focus:outline-none text-sm text-center tracking-widest text-lg font-mono"
                maxLength={6}
                autoFocus
              />
              <button
                type="submit"
                disabled={!code.trim()}
                className="w-full py-3 bg-[#10b981] text-white rounded-xl font-medium disabled:opacity-40 transition-opacity"
              >
                {t('verify')}
              </button>
            </form>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-4">
            {result === 'submitted' ? (
              <div className="rounded-2xl p-8 flex flex-col items-center text-center bg-[#10b981]/10 border border-[#10b981]/30">
                <BadgeCheck className="w-16 h-16 text-[#10b981] mb-3" />
                <p className="text-xl font-bold text-[#10b981] mb-1">{t('usageSubmitted')}</p>
                <p className="text-sm text-muted-foreground">{t('usageSubmittedDesc')}</p>
              </div>
            ) : (
              <div className={`rounded-2xl p-6 flex flex-col items-center text-center ${result === 'granted' ? 'bg-[#10b981]/10 border border-[#10b981]/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                {result === 'granted'
                  ? <CheckCircle2 className="w-14 h-14 text-[#10b981] mb-3" />
                  : <XCircle className="w-14 h-14 text-red-500 mb-3" />
                }
                <p className={`text-xl font-bold mb-1 ${result === 'granted' ? 'text-[#10b981]' : 'text-red-500'}`}>
                  {result === 'granted' ? t('accessGranted') : t('accessDenied')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {result === 'granted' ? t('accessGrantedDesc') : t('accessDeniedDesc')}
                </p>
                {result === 'granted' && (
                  <div className="mt-4 px-4 py-2 bg-card rounded-xl border border-border">
                    <p className="text-xs text-muted-foreground mb-0.5">{t('memberCode')}</p>
                    <p className="font-mono font-bold text-lg">#{checkedCode.padStart(4, '0')}</p>
                  </div>
                )}
              </div>
            )}

            {result === 'granted' && (
              <button
                onClick={() => setAccessResult('submitted')}
                className="w-full py-3.5 bg-[#10b981] text-white rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-[#059669] transition-colors"
              >
                <BadgeCheck className="w-5 h-5" />
                {t('submitUsage')}
              </button>
            )}

            <button
              onClick={reset}
              className="w-full py-3 bg-card border border-border rounded-2xl text-sm font-medium flex items-center justify-center gap-2 hover:border-[#10b981]/50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              {t('scanAnother')}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
