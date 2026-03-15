import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'fr', label: 'Français' },
  { code: 'ko', label: '한국어' },
  { code: 'ja', label: '日本語' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'ru', label: 'Русский' },
  { code: 'pt-BR', label: 'Português (Brasil)' },
];

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  const currentLanguageLabel = languages.find(lang => lang.code === i18n.language)?.label || 'Language';

  return (
    <div className="w-48 h-12">
      <DropdownMenu onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            className={`
              w-full h-full font-bold border-2 transition-all cursor-pointer justify-start px-4
              ${isOpen 
                ? 'bg-card border-primary/60 text-primary ring-0 stable-control' 
                : 'bg-card/80 backdrop-blur-sm border-primary/20 shadow-glow hover:bg-card/90'
              }
            `}
          >
            <Languages className="mr-2 h-5 w-5 shrink-0" />
            <span className="truncate">{currentLanguageLabel}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="start" 
          className="w-48 bg-card border-2 border-primary/20 shadow-deep"
        >
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`cursor-pointer hover:bg-primary/20 focus:bg-primary/20 font-medium ${
                i18n.language === lang.code ? 'text-primary bg-primary/10' : ''
              }`}
            >
              {lang.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSwitcher;
