import { Phone, Mail, MessageSquare } from 'lucide-react';

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

        <div className="mt-8 flex flex-col items-center gap-4">
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
