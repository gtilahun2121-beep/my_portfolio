import { Helmet } from 'react-helmet-async'

function SEO({ 
  title = 'Getanew Tilahun - Full Stack Developer Portfolio',
  description = 'Full Stack Developer specializing in React, Node.js, and MongoDB. View my portfolio of web development projects and get in touch for your next project.',
  keywords = 'full stack developer, web developer, React developer, Node.js developer, MongoDB, JavaScript, portfolio, Getanew Tilahun',
  author = 'Getanew Tilahun',
  image = '/profile.jpg',
  url = 'https://yourportfolio.com'
}) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    </Helmet>
  )
}

export default SEO
