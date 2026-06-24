import { MapPin, Clock, Phone, Mail, MessageSquare, Calendar } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Contact Us
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600">
            Get in touch with our team today
          </p>
        </div>

        <div className="mb-12 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 pt-2">Booking an Appointment</h3>
              </div>
              <p className="text-slate-700 mb-4 leading-relaxed">
                To book an appointment via text or call, please include the following information:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span><strong>Date:</strong> Your preferred appointment date</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span><strong>Time:</strong> Your preferred time slot</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span><strong>Service:</strong> The service you need</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span><strong>Car Model:</strong> Your vehicle's make and model</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-blue-200">
                <p className="text-slate-700 font-medium mb-3">Contact numbers to book:</p>
                <div className="space-y-2">
                  <a
                    href="tel:613-404-7722"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span><strong>Karim:</strong> 613-404-7722</span>
                  </a>
                  <a
                    href="tel:819-744-7599"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span><strong>Mohamad:</strong> 819-744-7599</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="h-full flex items-center justify-center p-8 md:p-0">
              <img
                src="/image.png"
                alt="Friendly mechanic with tools"
                className="w-full max-w-md h-auto object-contain"
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Address</h3>
                <p className="text-slate-700 leading-relaxed">
                  4603 Bank St, Unit 6<br />
                  Gloucester, ON K1T 3W6
                </p>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                  Professional Car & Truck Services in Ottawa<br />
                  Reliable engine diagnostics and repair for cars and light trucks
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Hours</h3>
                <div className="space-y-1 text-slate-700">
                  <p><strong>Monday – Saturday:</strong> 9:30 AM – 5:00 PM</p>
                  <p><strong>Sunday:</strong> Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-semibold mb-6">Contact Options</h3>

            <div className="grid sm:grid-cols-3 gap-8">
              <div>
                <h4 className="text-orange-400 font-medium mb-3 text-sm uppercase tracking-wide">Karim</h4>
                <div className="space-y-2">
                  <a
                    href="tel:613-404-7722"
                    className="flex items-center gap-3 text-white hover:text-orange-400 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>613-404-7722</span>
                  </a>
                  <a
                    href="sms:613-404-7722"
                    className="flex items-center gap-3 text-white hover:text-orange-400 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Text 613-404-7722</span>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-orange-400 font-medium mb-3 text-sm uppercase tracking-wide">Mohamad</h4>
                <div className="space-y-2">
                  <a
                    href="tel:819-744-7599"
                    className="flex items-center gap-3 text-white hover:text-orange-400 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>819-744-7599</span>
                  </a>
                  <a
                    href="sms:819-744-7599"
                    className="flex items-center gap-3 text-white hover:text-orange-400 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Text 819-744-7599</span>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-orange-400 font-medium mb-3 text-sm uppercase tracking-wide">Email</h4>
                <div className="space-y-2">
                  <a
                    href="mailto:KAMAUTOSALES99@GMAIL.COM"
                    className="flex items-center gap-3 text-white hover:text-orange-400 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="break-all">KAMAUTOSALES99@GMAIL.COM</span>
                  </a>
                  <a
                    href="mailto:malrawi266@gmail.com"
                    className="flex items-center gap-3 text-white hover:text-orange-400 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="break-all">malrawi266@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
