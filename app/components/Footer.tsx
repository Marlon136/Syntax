"use client";

import { useLanguage } from "@/app/providers/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#2a4d60] px-16 py-12 text-sm text-neutral-50 border-t border-[#264653]/20">

      <div className="grid grid-cols-4 gap-6">

        <div>
          <p className="font-bold text-[#E76F51]">{t('footer.brand') || 'This is SyntaX'}</p>
          <p>{t('footer.platform') || 'Learning platform'}</p>
          <p>{t('footer.progress') || 'Progress traking'}</p>
        </div>

        <div>
          <p className="font-bold text-[#ffbe19]">{t('footer.connect') || 'Connect with us'}</p>
          <p>{t('footer.social.instagram')}</p>
          <p>{t('footer.social.twitter')}</p>
          <p>{t('footer.social.github')}</p>
        </div>

        <div></div>

        <div>
          <p className="font-bold text-[#47a599]">{t('footer.help') || 'Help & Suggestions'}</p>
          <p>{t('footer.faq') || 'Questions and Answers'}</p>
        </div>

      </div>

    </footer>
  );
}