import { useNavigate } from 'react-router';
import { User, Building2, Shield, Check, X } from 'lucide-react';
import { useRole } from '../context/RoleContext';
import { useLanguage } from '../context/LanguageContext';

interface RoleSwitcherModalProps {
  onClose: () => void;
}

export function RoleSwitcherModal({ onClose }: RoleSwitcherModalProps) {
  const { role, setRole } = useRole();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const roles = [
    {
      key: 'user' as const,
      label: t('roleUser'),
      description: t('roleUserDesc'),
      icon: User,
      iconColor: 'text-[#10b981]',
      bgColor: 'bg-[#10b981]/10',
      path: '/user',
    },
    {
      key: 'business' as const,
      label: t('roleBusiness'),
      description: t('roleBusinessDesc'),
      icon: Building2,
      iconColor: 'text-[#3b82f6]',
      bgColor: 'bg-[#3b82f6]/10',
      path: '/business',
    },
    {
      key: 'admin' as const,
      label: t('roleAdmin'),
      description: t('roleAdminDesc'),
      icon: Shield,
      iconColor: 'text-[#8b5cf6]',
      bgColor: 'bg-[#8b5cf6]/10',
      path: '/admin',
    },
  ];

  const handleSelect = (selectedRole: 'user' | 'business' | 'admin', path: string) => {
    setRole(selectedRole);
    navigate(path);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-card rounded-t-3xl p-6 pb-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">{t('switchRoleTitle')}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-input-background flex items-center justify-center"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-3">
          {roles.map((roleItem) => {
            const Icon = roleItem.icon;
            const isActive = role === roleItem.key;
            return (
              <button
                key={roleItem.key}
                onClick={() => handleSelect(roleItem.key, roleItem.path)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                  isActive
                    ? 'border-[#10b981] bg-[#10b981]/5'
                    : 'border-border bg-background hover:border-border/80'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl ${roleItem.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${roleItem.iconColor}`} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">{roleItem.label}</p>
                  <p className="text-xs text-muted-foreground">{roleItem.description}</p>
                </div>
                {isActive && (
                  <div className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
