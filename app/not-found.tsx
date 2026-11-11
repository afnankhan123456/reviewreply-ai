import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found | ReviewReply AI',
  robots: { index: false, follow: true },
};

const links = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Guides' },
  { href: '/faq', label: 'FAQ' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

export default function NotFound() {
  return (
    <main className="nf">
      <div className="box">
        <p className="code">404</p>
        <h1>That page has moved or never existed</h1>
        <p className="text">
          The link you followed is broken. Here is where everything actually lives:
        </p>
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <p className="text small">
          Looking for something specific? Write to{' '}
          <a href="mailto:support@reviewreply-ai.in">support@reviewreply-ai.in</a> and we will
          point you to it.
        </p>
      </div>
      <style>{`
        .nf { min-height: 70vh; display: flex; align-items: center; justify-content: center; padding: 4rem 1.5rem; background: #fbf9f4; font-family: 'Iowan Old Style', 'Palatino Linotype', Georgia, serif; color: #1c2333; }
        .box { max-width: 520px; text-align: center; }
        .code { font-family: -apple-system, sans-serif; font-size: 0.8rem; letter-spacing: 0.2em; color: #b8860b; font-weight: 700; margin: 0 0 0.5rem; }
        h1 { font-size: 1.7rem; color: #14213d; margin: 0 0 1rem; line-height: 1.3; }
        .text { font-family: -apple-system, sans-serif; font-size: 1rem; color: #454e63; margin: 0 0 1rem; }
        .small { font-size: 0.9rem; margin-top: 1.5rem; }
        ul { list-style: none; padding: 0; margin: 1.5rem 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; }
        li a { display: inline-block; background: #14213d; color: #fbf9f4; font-family: -apple-system, sans-serif; font-size: 0.9rem; font-weight: 600; text-decoration: none; padding: 0.55rem 1rem; border-radius: 8px; }
        .box a { color: #14213d; }
      `}</style>
    </main>
  );
}
