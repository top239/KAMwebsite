import { MapPin, Clock, Phone, Mail, MessageSquare, Calendar } from 'lucide-react';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// TODO: Replace these placeholder links with your actual Facebook Marketplace page URLs
const FACEBOOK_PAGES = [
  { label: 'FB Marketplace – Page 1', href: '#fb-page-1' },
  { label: 'FB Marketplace – Page 2', href: '#fb-page-2' },
  { label: 'FB Marketplace – Page 3', href: '#fb-page-3' },
];

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

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  <a
                    href="https://wa.me/16134047722"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#25D366] hover:text-[#20b858] transition-colors"
                  >
                    <WhatsAppIcon />
                    <span>WhatsApp Karim</span>
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

              <div>
                <h4 className="text-[#1877F2] font-medium mb-3 text-sm uppercase tracking-wide flex items-center gap-1.5">
                  <FacebookIcon />
                  Facebook
                </h4>
                <div className="space-y-2">
                  {FACEBOOK_PAGES.map((page) => (
                    <a
                      key={page.href}
                      href={page.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-white hover:text-[#1877F2] transition-colors"
                    >
                      <FacebookIcon />
                      <span>{page.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
