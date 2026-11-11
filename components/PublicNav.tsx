export default function PublicNav() {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Guides' },
    { href: '/faq', label: 'FAQ' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="public-nav" aria-label="Site navigation">
      <a href="/" className="brand">
        <img src="/ai-logo.png" alt="" width={20} height={20} />
        <span>ReviewReply AI</span>
      </a>
      <div className="nav-links">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </div>
      <style>{`
        .public-nav { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; padding: 0.7rem 0 1.4rem; border-bottom: 1px solid #e7e0d2; margin-bottom: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .public-nav .brand { display: inline-flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.95rem; color: #14213d; text-decoration: none; }
        .public-nav .brand img { display: block; }
        .public-nav .nav-links { display: flex; flex-wrap: wrap; gap: 0.35rem 1rem; }
        .public-nav .nav-links a { font-size: 0.88rem; color: #454e63; text-decoration: none; }
        .public-nav .nav-links a:hover { color: #14213d; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: #b8860b; }
        @media (max-width: 640px) { .public-nav { justify-content: center; } .public-nav .nav-links { justify-content: center; } }
      `}</style>
    </nav>
  );
}
