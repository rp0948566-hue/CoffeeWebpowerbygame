import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

// todo: remove mock functionality - replace with real contact data
const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['Love Over Coffee, PLOT NO 11', 'Scheme No 51 & 113, Indore, MP 452010'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['hello@loveovercoffee.com', 'orders@loveovercoffee.com'],
  },
  {
    icon: Clock,
    title: 'Open Hours',
    details: ['Mon-Fri: 7AM - 10PM', 'Sat-Sun: 8AM - 11PM'],
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-12 md:mb-16"
          data-testid="text-contact-title"
        >
          GET IN{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            TOUCH
          </span>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={info.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="bg-white/5 border-white/10 p-6 text-center hover:border-primary/50 transition-colors h-full"
                  data-testid={`card-contact-${info.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
