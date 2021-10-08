import { useRouter } from 'next/router';
import { siteUrl } from '../../next-sitemap';

const defaultLocale = 'en';

export default function getMetaLangLinks(locale: string, locales: string[]) {
  const {
    asPath,
  // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useRouter();

  const langMarker = locale === defaultLocale ? '' : `/${locale}`;
  const canonicalURL = siteUrl + langMarker + asPath;

  const isDefaultPath = locale === defaultLocale && !asPath.includes(`/${defaultLocale}`);

  return (
    <>
      <link rel="canonical" href={canonicalURL} />
      <link rel="alternate" href={canonicalURL} hrefLang="x-default" />

      {locale !== defaultLocale && <link rel="alternate" hrefLang={defaultLocale} href={siteUrl + asPath} />}
      {isDefaultPath && <link rel="alternate" hrefLang={defaultLocale} href={`${siteUrl}/${defaultLocale}${asPath}`} />}

      {locales
        .filter((localeName) => localeName !== locale)
        .map((localeName) => (
          <link
            key={localeName}
            rel="alternate"
            hrefLang={localeName}
            href={`${siteUrl}/${localeName}${asPath}`}
          />
        ))}
    </>
  );
}
