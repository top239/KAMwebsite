import { Phone, Mail, MapPin, Wrench } from 'lucide-react';

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-current ${className}`} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const FACEBOOK_PAGES = [
  { label: 'Page 1', href: 'https://www.facebook.com/marketplace/profile/100007091010687/' },
  { label: 'Page 2', href: 'https://www.facebook.com/marketplace/profile/61589715587256/' },
  { label: 'Page 3', href: 'https://www.facebook.com/marketplace/profile/100072085497257/' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/16134047722"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-semibold px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 group"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6" />
        <span className="hidden sm:inline text-sm">WhatsApp Us</span>
      </a>

      <footer className="bg-slate-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">KAM Auto Shop</h3>
              </div>
              <p className="text-slate-400 leading-relaxed mb-4">
                Professional car and truck services in Ottawa. Trusted by the community for reliable engine diagnostics and repair.
              </p>
              {/* Social links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/16134047722"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-[#25D366] hover:bg-[#20b858] rounded-lg flex items-center justify-center text-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                </a>
                {FACEBOOK_PAGES.map((page, i) => (
                  <a
                    key={page.href}
                    href={page.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-[#1877F2] hover:bg-[#1565d8] rounded-lg flex items-center justify-center text-white transition-colors"
                    aria-label={`Facebook Marketplace Page ${i + 1}`}
                  >
                    <FacebookIcon />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Location</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-slate-400">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-orange-500" />
                  <span>
                    4603 Bank St, Unit 6<br />
                    Gloucester, ON K1T 3W6<br />
                    <span className="text-slate-500 text-sm">Professional Car & Truck Services in Ottawa</span><br />
                    <span className="text-slate-500 text-sm">Reliable engine diagnostics and repair for cars and light trucks</span>
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Karim</h4>
              <div className="space-y-3">
                <a
                  href="tel:613-404-7722"
                  className="flex items-center gap-3 text-slate-400 hover:text-orange-500 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>613-404-7722</span>
                </a>
                <a
                  href="https://wa.me/16134047722"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-400 hover:text-[#25D366] transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Mohamad</h4>
              <div className="space-y-3">
                <a
                  href="tel:819-744-7599"
                  className="flex items-center gap-3 text-slate-400 hover:text-orange-500 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>819-744-7599</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-3 text-slate-400">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <a
                    href="mailto:KAMAUTOSALES99@GMAIL.COM"
                    className="hover:text-orange-500 transition-colors"
                  >
                    KAMAUTOSALES99@GMAIL.COM
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <a
                    href="mailto:malrawi266@gmail.com"
                    className="hover:text-orange-500 transition-colors"
                  >
                    malrawi266@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-slate-400 text-center md:text-right">
                  Copyright © {currentYear} KAM Auto Shop. All rights reserved.
                </p>
                <a
                  href="?admin"
                  className="text-slate-700 hover:text-slate-500 text-xs transition-colors"
                >
                  Admin
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
