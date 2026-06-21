export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <p className="footer-copy">
            © {year} — Erga Wanda Afriza. All rights reserved.
          </p>
          <ul className="footer-links">
            <li>
              <a
                href="https://github.com/ErgaWanda"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="mailto:ewandaafriza@gmail.com"
                className="footer-link"
              >
                Email
              </a>
            </li>
            <li>
              <a href="tel:+6288291067259" className="footer-link">
                Telepon
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
