import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send, MapPin, Phone, ArrowUpRight, Sparkles } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'ritik2131@gmail.com',
      href: 'mailto:ritik2131@gmail.com',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'Phone',
      value: '+91-9113779159',
      href: 'tel:+919113779159',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Location',
      value: 'Noida, India',
      href: '#',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github className="w-6 h-6" />,
      url: 'https://github.com/codeCraft-Ritik',
      color: 'hover:bg-gray-700',
      description: 'Check out my code'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6" />,
      url: 'https://www.linkedin.com/in/ritikkumar-21dec',
      color: 'hover:bg-blue-600',
      description: 'Connect professionally'
    },
    {
      name: 'Email',
      icon: <Mail className="w-6 h-6" />,
      url: 'mailto:ritik2131@gmail.com',
      color: 'hover:bg-red-500',
      description: 'Send me a message'
    }
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }

    const subject = formData.subject || `Portfolio inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailToHref = `mailto:ritik2131@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setStatus('sending');
    setTimeout(() => {
      window.location.href = mailToHref;
      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 450);
  };

  return (
    <section id="contact" className="py-16 md:py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px]" />

        {/* Geometric accent shapes */}
        <motion.div
          className="absolute top-12 right-20 w-24 h-24 border border-cyan-500/30"
          animate={{ rotate: 360, opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
        />
        
        <motion.div
          className="absolute bottom-20 left-16 w-20 h-20 border-2 border-purple-500/25"
          animate={{ rotate: -360, y: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}
        />

        <motion.div
          className="absolute top-1/2 right-8 w-16 h-16 border border-emerald-500/40 rounded-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-full mb-6"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-bold uppercase tracking-wider text-cyan-400">Let's Connect</span>
        </motion.div>

        <h2 className="text-5xl md:text-7xl font-black mb-6">
          Get In{' '}
          <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Touch
          </span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? I'd love to hear from you.
          Let's create something amazing together!
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-12 relative">
        {/* Left - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/2 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
              <Send className="w-6 h-6 text-cyan-400" />
              Send a Message
            </h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Project inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea
                  rows={5}
                  name="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 bg-linear-to-r from-cyan-500 to-blue-600 rounded-xl font-bold uppercase tracking-wider text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {status === 'sending' ? 'Opening Mail App...' : 'Send Message'}
              </motion.button>

              {status === 'error' ? (
                <p className="text-sm text-rose-400">Please fill Name, Email, and Message before sending.</p>
              ) : null}
              {status === 'sent' ? (
                <p className="text-sm text-emerald-400">Draft opened in your mail app. I will reply quickly.</p>
              ) : null}
            </form>
          </div>
        </motion.div>

        {/* Right - Contact Info & Social */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* Contact Info Cards */}
          <div className="grid gap-4">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="group flex items-center gap-4 p-5 bg-white/2 border border-white/10 rounded-2xl hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${info.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                  {info.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 uppercase tracking-wider">{info.label}</p>
                  <p className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{info.value}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </motion.a>
            ))}
          </div>

          {/* Social Links */}
          <div className="bg-white/2 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
            <h4 className="text-lg font-black mb-4">Find Me Online</h4>
            <div className="grid gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl ${social.color} hover:border-white/20 transition-all duration-300 group`}
                >
                  <div className="text-gray-400 group-hover:text-white transition-colors">
                    {social.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white">{social.name}</p>
                    <p className="text-sm text-gray-500">{social.description}</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="font-bold text-white">Currently Available</span>
            </div>
            <p className="text-gray-400 text-sm">
              Open for freelance projects, internships, and full-time opportunities.
              Response time: within 24 hours.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
