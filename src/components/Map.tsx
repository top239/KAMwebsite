import { MapPin, Navigation } from 'lucide-react';

export default function Map() {
  const address = '4603 Bank St, Unit 6, Gloucester, ON K1T 3W6';
  const encodedAddress = encodeURIComponent(address);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Find Us Here
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600">
            Visit us at our convenient location in Gloucester
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="aspect-[16/9] w-full bg-slate-200 relative">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=&q=${encodedAddress}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="KAM Auto Shop Location"
              className="absolute inset-0"
            />
            <div className="absolute inset-0 bg-slate-900/20 flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur-sm px-6 py-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-6 h-6 text-orange-500" />
                  <p className="text-slate-900 font-medium">
                    4603 Bank St, Unit 6<br />
                    Gloucester, ON K1T 3W6
                  </p>
                </div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
                >
                  <Navigation className="w-5 h-5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
