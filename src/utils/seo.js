// SEO Configuration and Utilities
export const SEO_CONFIG = {
  siteName: 'HypeMode Store',
  siteUrl: 'https://hypemode-store.com',
  defaultTitle: 'HypeMode Store - Moda e Estilo Premium',
  defaultDescription:
    'Sua loja online de moda e estilo. Encontre as melhores marcas e tendências em roupas, calçados e acessórios.',
  defaultKeywords: 'moda, roupas, calçados, acessórios, estilo, tendências, loja online, ecommerce',
  defaultImage: '/favicon.png',
  twitterHandle: '@hypemodestore',
  facebookAppId: '123456789',
  language: 'pt-BR',
  locale: 'pt_BR',
  themeColor: '#ef4444', // red-500
};

// Generate structured data for different page types
export const generateStructuredData = (type, data) => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  switch (type) {
    case 'WebSite':
      return {
        ...baseData,
        name: SEO_CONFIG.siteName,
        description: data.description || SEO_CONFIG.defaultDescription,
        url: SEO_CONFIG.siteUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SEO_CONFIG.siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      };

    case 'Product':
      return {
        ...baseData,
        name: data.name,
        description: data.description,
        image: data.image,
        brand: {
          '@type': 'Brand',
          name: SEO_CONFIG.siteName,
        },
        offers: {
          '@type': 'Offer',
          price: data.price,
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: SEO_CONFIG.siteName,
          },
        },
        aggregateRating: data.rating
          ? {
              '@type': 'AggregateRating',
              ratingValue: data.rating,
              ratingCount: data.reviewCount || 1,
            }
          : undefined,
      };

    case 'Organization':
      return {
        ...baseData,
        name: SEO_CONFIG.siteName,
        url: SEO_CONFIG.siteUrl,
        logo: `${SEO_CONFIG.siteUrl}/favicon.png`,
        description: SEO_CONFIG.defaultDescription,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+351-XXX-XXX-XXX',
          contactType: 'customer service',
          availableLanguage: ['Portuguese', 'English'],
        },
        sameAs: [
          'https://www.facebook.com/hypemodestore',
          'https://www.instagram.com/hypemodestore',
          'https://twitter.com/hypemodestore',
        ],
      };

    case 'BreadcrumbList':
      return {
        ...baseData,
        itemListElement: data.breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: `${SEO_CONFIG.siteUrl}${crumb.url}`,
        })),
      };

    default:
      return baseData;
  }
};

// Generate meta tags for different page types
export const generateMetaTags = (pageType, data = {}) => {
  const title = data.title ? `${data.title} | ${SEO_CONFIG.siteName}` : SEO_CONFIG.defaultTitle;
  const description = data.description || SEO_CONFIG.defaultDescription;
  const keywords = data.keywords || SEO_CONFIG.defaultKeywords;
  const image = data.image || SEO_CONFIG.defaultImage;
  const url = data.url ? `${SEO_CONFIG.siteUrl}${data.url}` : SEO_CONFIG.siteUrl;

  return {
    title,
    description,
    keywords,
    image,
    url,
    type: pageType,
    structuredData: generateStructuredData(pageType === 'product' ? 'Product' : 'WebSite', {
      ...data,
      description,
    }),
  };
};

// SEO best practices checklist
export const SEO_CHECKLIST = {
  title: {
    minLength: 30,
    maxLength: 60,
    shouldIncludeBrand: true,
  },
  description: {
    minLength: 120,
    maxLength: 160,
    shouldIncludeKeywords: true,
  },
  keywords: {
    maxCount: 10,
    shouldBeRelevant: true,
  },
  image: {
    minWidth: 1200,
    minHeight: 630,
    aspectRatio: '1.91:1', // Facebook/Twitter recommended
  },
};

export default {
  SEO_CONFIG,
  generateStructuredData,
  generateMetaTags,
  SEO_CHECKLIST,
};
