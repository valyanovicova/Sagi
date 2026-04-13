import { Navigate, useNavigate } from 'react-router';
import { User, Building2, Shield } from 'lucide-react';
import { useRole } from '../context/RoleContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import sagiLogo from '../assets/sagi-logo.png';

export function RoleLanding() {
  const { role, setRole } = useRole();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (role) {
    return <Navigate to={`/${role}`} replace />;
  }

  const handleRoleSelect = (selectedRole: 'user' | 'business' | 'admin') => {
    setRole(selectedRole);
    navigate(`/${selectedRole}`);
  };

  const roles = [
    {
      key: 'user' as const,
      label: t('roleUser'),
      description: t('roleUserDesc'),
      icon: User,
      color: '#10b981',
      bgColor: 'bg-[#10b981]/10',
      borderColor: 'border-[#10b981]/30',
      iconColor: 'text-[#10b981]',
      buttonBg: 'bg-[#10b981]',
    },
    {
      key: 'business' as const,
      label: t('roleBusiness'),
      description: t('roleBusinessDesc'),
      icon: Building2,
      color: '#3b82f6',
      bgColor: 'bg-[#3b82f6]/10',
      borderColor: 'border-[#3b82f6]/30',
      iconColor: 'text-[#3b82f6]',
      buttonBg: 'bg-[#3b82f6]',
    },
    {
      key: 'admin' as const,
      label: t('roleAdmin'),
      description: t('roleAdminDesc'),
      icon: Shield,
      color: '#8b5cf6',
      bgColor: 'bg-[#8b5cf6]/10',
      borderColor: 'border-[#8b5cf6]/30',
      iconColor: 'text-[#8b5cf6]',
      buttonBg: 'bg-[#8b5cf6]',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 max-w-md mx-auto w-full px-4 py-12 flex flex-col">
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-10">
          <img src={sagiLogo} alt="Sagi Logo" className="w-20 h-20 rounded-2xl mb-4 shadow-lg" />
          <h1 className="text-3xl font-bold mb-2">Sagi</h1>
          <p className="text-muted-foreground text-center text-sm">
            Your community benefits platform
          </p>
        </div>

        {/* Role selection */}
        <div className="mb-6">
          <p className="text-center text-sm text-muted-foreground mb-4">
            {t('selectRoleDesc')}
          </p>
          <div className="space-y-3">
            {roles.map((roleItem) => {
              const Icon = roleItem.icon;
              return (
                <button
                  key={roleItem.key}
                  onClick={() => handleRoleSelect(roleItem.key)}
                  className={`w-full bg-card border ${roleItem.borderColor} rounded-2xl p-5 hover:shadow-md transition-all text-left group`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl ${roleItem.bgColor} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className={`w-7 h-7 ${roleItem.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-0.5">{roleItem.label}</h3>
                      <p className="text-sm text-muted-foreground">{roleItem.description}</p>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full ${roleItem.buttonBg} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-auto">
          Sagi v1.0.0 · Community Benefits Platform
        </p>
      </div>
    </div>
  );
}
