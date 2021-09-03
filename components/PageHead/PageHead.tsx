import Head from 'next/head';
import getMetaLangLinks from './getMetaLangLinks';

type MetaTag = {
  name?: string,
  property?: string,
  itemProp?: string,
  content?: string,
}

type SeoDataProps = {
  [key: string]: any,
  title?: string,
  metaDescription?: string,
  structuredData?: JSON,
  keywords?: string,
  metaTags?: MetaTag[],
}

type PageHeadProps = {
  seoData: SeoDataProps,
  locale: string,
  locales: string[],
}

export default function PageHead({
  seoData,
  locale,
  locales,
}: PageHeadProps) {
  const {
    title,
    metaDescription,
    structuredData = {},
    keywords = '',
    metaTags = [],
  } = seoData;

  return (
    <Head>
      <meta charSet="utf-8" />

      {createMetaTags(metaTags)}

      {getMetaLangLinks(locale, locales)}

      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords} />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </Head>
  );

  function createMetaTags(tags: MetaTag[]) {
    return tags.map((element) => {
      const props: MetaTag = {};

      if (element.name) {
        props.name = element.name;
      }

      if (element.property) {
        props.property = element.property;
      }

      if (element.itemProp) {
        props.itemProp = element.itemProp;
      }

      if (element.content) {
        props.content = element.content;
      }

      return <meta key={element.name || element.property} {...props} />;
    });
  }
}
