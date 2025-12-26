import { MapPin, Clock, Phone, Mail, MessageSquare, Send, Calendar } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

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

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
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

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-6">Contact Options</h3>

              <div className="space-y-6">
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

                <div className="border-t border-white/10 pt-6">
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

                <div className="border-t border-white/10 pt-6">
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

          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h3>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-green-900 mb-2">Message Sent!</h4>
                <p className="text-green-700">We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-900 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your vehicle's issue..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
