import { Phone, Mail, MessageSquare, MapPin } from 'lucide-react';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// TODO: Replace these placeholder links with your actual Facebook Marketplace page URLs
const FACEBOOK_PAGES = [
  { label: 'FB Marketplace – Page 1', href: '#fb-page-1' },
  { label: 'FB Marketplace – Page 2', href: '#fb-page-2' },
  { label: 'FB Marketplace – Page 3', href: '#fb-page-3' },
];

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-orange-400 text-sm font-medium">Professional Automotive Service</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            KAM Auto Shop
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-3 font-medium">
            Professional Car & Truck Services in Ottawa
          </p>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Reliable engine diagnostics and repair for cars and light trucks
          </p>

          <div className="flex items-center justify-center gap-2 mt-4 text-slate-400">
            <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0" />
            <span className="text-sm md:text-base">4603 Bank St, Unit 6, Gloucester, ON K1T 3W6</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Contact Karim</h3>
            <div className="space-y-3">
              <a
                href="tel:613-404-7722"
                className="flex items-center gap-3 px-4 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg transition-all duration-200 group"
              >
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Call: 613-404-7722</span>
              </a>
              <a
                href="sms:613-404-7722"
                className="flex items-center gap-3 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all duration-200 group"
              >
                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Text: 613-404-7722</span>
              </a>
              <a
                href="https://wa.me/16134047722"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 bg-[#25D366] hover:bg-[#20b858] rounded-lg transition-all duration-200 group"
              >
                <WhatsAppIcon />
                <span className="font-medium">WhatsApp Karim</span>
              </a>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Contact Mohamad</h3>
            <div className="space-y-3">
              <a
                href="tel:819-744-7599"
                className="flex items-center gap-3 px-4 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg transition-all duration-200 group"
              >
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Call: 819-744-7599</span>
              </a>
              <a
                href="sms:819-744-7599"
                className="flex items-center gap-3 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all duration-200 group"
              >
                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Text: 819-744-7599</span>
              </a>
            </div>
          </div>
        </div>

        {/* Facebook Marketplace pages */}
        <div className="mt-6 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-[#1877F2] flex items-center gap-2">
              <FacebookIcon />
              Find Us on Facebook Marketplace
            </h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {FACEBOOK_PAGES.map((page) => (
                <a
                  key={page.href}
                  href={page.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1877F2] hover:bg-[#1565d8] rounded-lg transition-all duration-200 font-medium text-sm"
                >
                  <FacebookIcon />
                  <span>{page.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:KAMAUTOSALES99@GMAIL.COM"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-200"
            >
              <Mail className="w-5 h-5" />
              <span>KAMAUTOSALES99@GMAIL.COM</span>
            </a>
            <a
              href="mailto:malrawi266@gmail.com"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-200"
            >
              <Mail className="w-5 h-5" />
              <span>malrawi266@gmail.com</span>
            </a>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all duration-200"
          >
            Online Inquiry
          </a>
        </div>
      </div>
    </section>
  );
}
