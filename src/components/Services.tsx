import { Gauge, Wrench, Shield, Settings, Droplet, Filter } from 'lucide-react';

export default function Services() {
  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Professional automotive services for your vehicle
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Gauge className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900">
                  Engine Diagnostics & Repair
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Gauge className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900">
                    Computer Diagnostics
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Accurate computer diagnostics for cars and light trucks using advanced diagnostic equipment
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Wrench className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900">
                    Expert Repair
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Expert engine repair services performed by skilled mechanics with years of experience
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-slate-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900">
                    Preventive Maintenance
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Preventive maintenance tips to keep your vehicle running smoothly and avoid costly repairs
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-900">
                    Transmission Services
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 font-medium">(Service Only - No Repair Work Included)</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Droplet className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900">
                    Fluid Service
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Transmission fluid check and replacement to ensure optimal performance
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Filter className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900">
                    Filter Replacement
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Transmission filter replacement to keep your system clean and functioning properly
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-slate-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900">
                    Routine Maintenance
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Routine maintenance to keep your transmission healthy and prevent future issues
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-amber-900 text-center font-medium">
                  Note: This service includes maintenance only. Transmission repairs are not available at this time.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl text-white text-center shadow-xl">
            <p className="text-lg leading-relaxed">
              <strong className="text-orange-400">We service all makes and models</strong> of cars and light trucks.
              From routine diagnostics to complex engine repairs and transmission maintenance, our team has you covered.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
