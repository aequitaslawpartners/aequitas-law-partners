export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Disallow admin routes
Disallow: /admin/
Disallow: /api/admin/

# Sitemap
Sitemap: https://www.alplaw.in/sitemap.xml`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
