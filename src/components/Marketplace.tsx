import { ExternalLink, Car, ChevronRight } from 'lucide-react';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const FACEBOOK_PAGES = [
  { label: 'FB Marketplace – Page 1', href: 'https://www.facebook.com/marketplace/profile/100007091010687/' },
  { label: 'FB Marketplace – Page 2', href: 'https://www.facebook.com/marketplace/profile/61589715587256/' },
  { label: 'FB Marketplace – Page 3', href: 'https://www.facebook.com/marketplace/profile/100072085497257/' },
];

export default function Marketplace() {
  return (
    <section id="marketplace" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Looking for Your Next Car?
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Browse our latest vehicles for sale on Facebook Marketplace. Find your next ride and contact us for more information.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="relative rounded-2xl overflow-hidden shadow-xl group min-h-[300px] lg:min-h-full">
            <img
              src="https://images.pexels.com/photos/12700837/pexels-photo-12700837.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Car dealership lot showcasing premium pre-owned vehicles at night"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent"></div>
            <div className="relative h-full flex flex-col justify-end p-8">
              <div className="flex items-center gap-3 mb-2">
                <Car className="w-6 h-6 text-orange-400" />
                <span className="text-white font-semibold text-lg">Quality Pre-Owned Vehicles</span>
              </div>
              <p className="text-slate-200 text-sm">
                Updated regularly with new arrivals
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <a
              href={FACEBOOK_PAGES[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-6 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-[#1877F2]/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#1877F2] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                <FacebookIcon />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Marketplace — Page 1</h3>
                <p className="text-sm text-slate-500">Browse listings on Facebook</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#1877F2] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
            </a>

            <a
              href={FACEBOOK_PAGES[1].href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-6 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-[#1877F2]/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#1877F2] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                <FacebookIcon />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Marketplace — Page 2</h3>
                <p className="text-sm text-slate-500">Browse listings on Facebook</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#1877F2] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
            </a>

            <a
              href={FACEBOOK_PAGES[2].href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-6 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-[#1877F2]/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#1877F2] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                <FacebookIcon />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Marketplace — Page 3</h3>
                <p className="text-sm text-slate-500">Browse listings on Facebook</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#1877F2] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
            </a>

            <a
              href={FACEBOOK_PAGES[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-4 bg-[#1877F2] hover:bg-[#1565d8] rounded-xl font-semibold text-white shadow-lg transition-all duration-200 group"
            >
              <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Explore Our Cars on Facebook Marketplace</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
