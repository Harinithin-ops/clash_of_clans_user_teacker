const Footer = () => {
  return (
    <footer className="w-full py-8 mt-auto bg-surface-container-lowest border-t border-outline-variant flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop gap-gutter">
      <div className="flex flex-col gap-2">
        <span className="font-headline-lg text-primary text-xl">Clash Insight</span>
        <p className="font-body-main text-sm text-on-surface-variant">© 2024 Clash Insight Analytics. Data-driven tactical advantage.</p>
      </div>
      <div className="flex flex-wrap gap-8">
        <a className="font-body-main text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Privacy Policy</a>
        <a className="font-body-main text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Terms of Service</a>
        <a className="font-body-main text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">API Status</a>
        <a className="font-body-main text-sm text-on-surface-variant hover:text-secondary transition-colors text-primary" href="#">Global Rankings</a>
      </div>
    </footer>
  );
};

export default Footer;
