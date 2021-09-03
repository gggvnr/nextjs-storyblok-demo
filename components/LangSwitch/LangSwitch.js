import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';

import { useAutoClose } from '../../common/hooks/useAutoClose';

export default function LangSwitch({
  locale,
  locales,
  className = '',
}) {
  const router = useRouter();
  const containerRef = useRef();

  const [isTooltipOpened, setIsTooltipOpened] = useState(false);

  useAutoClose(containerRef, setIsTooltipOpened);

  const availableLocales = locales.filter((localeItem) => localeItem !== locale);

  return (
    <div ref={containerRef} className={`lang-switch ${className}`}>
      <button
        type="button"
        className="lang-switch__active"
        onClick={() => setIsTooltipOpened(!isTooltipOpened)}
      >
        {locale}
      </button>

      {isTooltipOpened && (
        <ul className="lang-switch__list">
          {availableLocales.map((localeItem) => (
            <li key={localeItem} className="lang-switch__option">
              <Link href={router.route} locale={localeItem}>
                <a className="lang-switch__link">{localeItem}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
