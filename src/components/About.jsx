import React from 'react';
import { motion } from 'framer-motion';
import { Buildings, UsersThree, Briefcase } from '@phosphor-icons/react/dist/ssr';

const FEATURES = [
  {
    icon: <Buildings size={26} weight="regular" />,
    title: 'Registered Entity',
    desc: 'CIN U28290KA2026PTC215872 — Incorporated under the Companies Act, based in Bangalore, Karnataka.',
    delay: 0.1,
  },
  {
    icon: <Briefcase size={26} weight="regular" />,
    title: 'Multi-Sector Focus',
    desc: 'Operating across manufacturing, technology, events, and FMCG — a truly diversified enterprise.',
    delay: 0.2,
  },
  {
    icon: <UsersThree size={26} weight="regular" />,
    title: 'Client-Centric Approach',
    desc: "Dedicated to delivering quality solutions tailored to each industry's unique demands.",
    delay: 0.3,
  },
];

const About = () => {
  return (
    <section id="about" className="px-5 sm:px-12 lg:px-24 py-16 sm:py-24 lg:py-32 bg-background border-b border-slate-200/50">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="mb-10 sm:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold mb-3">Who We Are</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold text-slate-900 mb-4 font-outfit">
            Building Across Boundaries
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl">
            KAPIT INDIA PRIVATE LIMITED is a Bangalore-based company delivering solutions across manufacturing, technology, and consumer goods. We combine innovation with reliability to serve clients across India.
          </p>
        </div>

        {/* Two-column layout — stacks on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Image — uses aspect ratio, never clips */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden rounded-sm w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3]"
          >
            <img
              src="https://static.prod-images.emergentagent.com/jobs/d681ca81-3231-4823-8242-2aa95c411a0f/images/33d3a97dcbd955bdd97fefe926a10c37a623e85867f512215748cba17909aa86.png"
              alt="KAPIT INDIA — global network and manufacturing"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Feature list */}
          <div className="flex flex-col gap-7 sm:gap-10">
            {FEATURES.map(({ icon, title, desc, delay }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay }}
                className="flex gap-5"
              >
                <div className="shrink-0 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-blue-900 text-white rounded-sm">
                  {icon}
                </div>
                <div className="pt-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1.5 font-outfit">{title}</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-600">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
