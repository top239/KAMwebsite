import { Phone, Mail, MapPin, Wrench } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
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
            <p className="text-slate-400 leading-relaxed">
              Professional car and truck services in Ottawa. Trusted by the community for reliable engine diagnostics and repair.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Location</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-orange-500" />
                <span>
                  4603 Bank St, Unit 6<br />
                  Gloucester, ON K1T 3W6
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
            <p className="text-slate-400 text-center md:text-right">
              Copyright © {currentYear} KAM Auto Shop. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
