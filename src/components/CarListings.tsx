import { useEffect, useState } from 'react';
import { Car, Fuel, Gauge, Palette, ChevronRight, Tag } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CarListing {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: string;
  transmission: string;
  fuel_type: string;
  description: string | null;
  image_url: string | null;
  status: 'available' | 'sold';
}

export default function CarListings() {
  const [cars, setCars] = useState<CarListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<CarListing | null>(null);

  useEffect(() => {
    async function fetchCars() {
      const { data, error } = await supabase
        .from('car_listings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError('Failed to load listings.');
      } else {
        setCars(data ?? []);
      }
      setLoading(false);
    }
    fetchCars();
  }, []);

  return (
    <section id="cars" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Cars for Sale
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600">
            Browse our selection of quality pre-owned vehicles
          </p>
        </div>

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-200 animate-pulse">
                <div className="h-48 bg-slate-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                  <div className="h-4 bg-slate-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!loading && !error && cars.length === 0 && (
          <div className="text-center py-16">
            <Car className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No vehicles listed at this time. Check back soon!</p>
          </div>
        )}

        {!loading && !error && cars.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map((car) => (
              <div
                key={car.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                onClick={() => setSelected(car)}
              >
                <div className="relative overflow-hidden h-48">
                  {car.image_url ? (
                    <img
                      src={car.image_url}
                      alt={`${car.year} ${car.make} ${car.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                      <Car className="w-16 h-16 text-slate-300" />
                    </div>
                  )}
                  {car.status === 'sold' && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg text-lg tracking-wide">SOLD</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-200">
                      {car.transmission}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <p className="text-2xl font-bold text-orange-500 mt-1">
                      ${car.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Gauge className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span>{car.mileage.toLocaleString()} km</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Fuel className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span>{car.fuel_type}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2">
                      <Palette className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span>{car.color}</span>
                    </div>
                  </div>

                  <button className="mt-auto w-full flex items-center justify-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors group-hover:gap-2.5">
                    View Details <ChevronRight className="w-4 h-4 transition-all" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {selected.image_url ? (
                <img
                  src={selected.image_url}
                  alt={`${selected.year} ${selected.make} ${selected.model}`}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-slate-100 flex items-center justify-center">
                  <Car className="w-24 h-24 text-slate-300" />
                </div>
              )}
              {selected.status === 'sold' && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-red-500 text-white font-bold px-6 py-3 rounded-lg text-2xl tracking-wide">SOLD</span>
                </div>
              )}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-700 hover:bg-white transition-colors shadow-md text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {selected.year} {selected.make} {selected.model}
                  </h3>
                  <p className="text-3xl font-bold text-orange-500 mt-1">
                    ${selected.price.toLocaleString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold flex-shrink-0 ${selected.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                  {selected.status === 'available' ? 'Available' : 'Sold'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: Gauge, label: 'Mileage', value: `${selected.mileage.toLocaleString()} km` },
                  { icon: Fuel, label: 'Fuel', value: selected.fuel_type },
                  { icon: Tag, label: 'Transmission', value: selected.transmission },
                  { icon: Palette, label: 'Color', value: selected.color },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-orange-500" />
                      <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">{label}</span>
                    </div>
                    <p className="text-slate-800 font-semibold">{value}</p>
                  </div>
                ))}
              </div>

              {selected.description && (
                <p className="text-slate-600 leading-relaxed mb-6">{selected.description}</p>
              )}

              {selected.status === 'available' && (
                <a
                  href="tel:613-404-7722"
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl text-center transition-colors shadow-lg"
                >
                  Call to Inquire — 613-404-7722
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
