const SEO = ({ title, description, keywords, image, url, type = 'website', author = 'HypeMode Store' }) => {
  const siteTitle = 'HypeMode Store';
  const defaultDescription =
    'Your online fashion and style store. Find the best brands and trends in clothing, shoes, and accessories.';
  const defaultKeywords = 'fashion, clothing, shoes, accessories, style, trends, online store, ecommerce';
  const defaultImage = '/favicon.png';
  const siteUrl = 'https://hypemode-store.com';

  const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const metaImage = image || defaultImage;
  const metaUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <>
      <title>{metaTitle}</title>
      <meta name='description' content={metaDescription} />
      <meta name='keywords' content={metaKeywords} />
      <meta name='author' content={author} />
      <meta name='robots' content='index, follow' />
      <meta property='og:type' content={type} />
      <meta property='og:title' content={metaTitle} />
      <meta property='og:description' content={metaDescription} />
      <meta property='og:image' content={metaImage} />
      <meta property='og:url' content={metaUrl} />
      <meta property='og:site_name' content={siteTitle} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={metaTitle} />
      <meta name='twitter:description' content={metaDescription} />
      <meta name='twitter:image' content={metaImage} />
      <link rel='canonical' href={metaUrl} />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <script type='application/ld+json'>
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteTitle,
          description: metaDescription,
          url: siteUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${siteUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        })}
      </script>
    </>
  );
};

export default SEO;
