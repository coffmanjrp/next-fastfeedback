const title =
  'Fast Feedback – The easiest way to add comments or reviews to your static site.';
const description =
  'Fast Feedback is the easiest way to add comments or reviews to your static site.';

const SEO = {
  title,
  description,
  canonical: 'http://localhost:3000',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'http://localhost:3000',
    title,
    description,
    images: [
      {
        url: 'https://localhost:3000/og.png',
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
};

export default SEO;
