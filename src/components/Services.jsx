import React from 'react';
import { motion } from 'framer-motion';
import { Desktop, HardHat, Code, Drop, Trophy, Briefcase } from '@phosphor-icons/react/dist/ssr';

// On mobile: single column stacked cards with fixed min-height
// On md+: bento-style grid with col/row-span magic
const Services = () => {
  return (
    <section id="services" className="px-5 sm:px-12 lg:px-24 py-16 sm:py-24 lg:py-32 bg-slate-50 border-b border-slate-200/50">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="mb-10 sm:mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold mb-3">What We Do</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold text-slate-900 mb-4 font-outfit">Our Services</h2>
          <p className="text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Delivering excellence across diverse sectors. Explore our core business verticals designed to foster innovation and practical utility.
          </p>
        </div>

        {/* ── Mobile: simple stacked cards ── */}
        <div className="flex flex-col gap-4 md:hidden">
          {[
            {
              icon: <Desktop size={22} weight="regular" />,
              title: 'Kiosk Manufacturing',
              desc: 'Custom hardware fabrication and digital kiosk assembly for retail, transport, and public utility.',
              img: 'https://images.unsplash.com/photo-1764795849694-34b3316b3de4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxpbnRlcmFjdGl2ZSUyMGRpZ2l0YWwlMjBkaXNwbGF5JTIwa2lvc2t8ZW58MHx8fHwxNzc2MTkyMTk0fDA&ixlib=rb-4.1.0&q=85',
            },
            {
              icon: <HardHat size={22} weight="regular" />,
              title: 'Helmet Kiosk Solutions',
              desc: 'Automated helmet dispensing and smart storage units for road safety compliance.',
              plain: true,
            },
            {
              icon: <Code size={22} weight="regular" />,
              title: 'IT Services & Solutions',
              desc: 'Enterprise software development, digital transformation, cloud infrastructure, and managed IT.',
              img: 'https://images.pexels.com/photos/6804068/pexels-photo-6804068.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            },
            {
              icon: <Drop size={22} weight="regular" />,
              title: 'Agarbatti Manufacturing',
              desc: 'Premium incense stick production using traditional methods with modern quality standards.',
              img: 'https://static.prod-images.emergentagent.com/jobs/d681ca81-3231-4823-8242-2aa95c411a0f/images/9c60c77e6f2f49b4bdd4ecb82694a0964c0cff966410f84e211829fb6d312f01.png',
            },
            {
              icon: <Trophy size={22} weight="regular" />,
              title: 'Hackathon Organisation',
              desc: 'End-to-end management of tech events, coding competitions, and innovation challenges.',
              img: 'https://images.unsplash.com/photo-1759884248009-92c5e957708e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwyfHxoYWNrYXRob24lMjBjb2RpbmclMjBldmVudHxlbnwwfHx8fDE3NzYxOTIxOTR8MA&ixlib=rb-4.1.0&q=85',
            },
            {
              icon: <Briefcase size={22} weight="regular" />,
              title: 'Consulting Services',
              desc: 'Strategic business advisory, market analysis, and growth consulting for startups and enterprises.',
              plain: true,
            },
          ].map(({ icon, title, desc, img, plain }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`relative rounded-sm overflow-hidden min-h-[160px] ${plain ? 'bg-white border border-slate-200' : ''}`}
            >
              {img && (
                <div className="absolute inset-0 z-0">
                  <img src={img} alt={title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-white/75" />
                </div>
              )}
              <div className={`relative z-10 flex items-start gap-4 p-6 h-full ${plain ? '' : ''}`}>
                <div className="shrink-0 w-10 h-10 bg-blue-900 text-white flex items-center justify-center rounded-sm">
                  {icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1 font-outfit">{title}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Desktop: bento grid ── */}
        <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8 auto-rows-[300px] lg:auto-rows-[320px]">
          {/* Card 1: Kiosk Manufacturing — large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-2 row-span-2 relative rounded-sm overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1764795849694-34b3316b3de4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxpbnRlcmFjdGl2ZSUyMGRpZ2l0YWwlMjBkaXNwbGF5JTIwa2lvc2t8ZW58MHx8fHwxNzc2MTkyMTk0fDA&ixlib=rb-4.1.0&q=85"
                alt="Interactive Kiosk Solutions"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-white/70 z-10" />
            </div>
            <div className="relative z-20 flex flex-col justify-end h-full p-8 lg:p-12">
              <div className="w-12 h-12 bg-blue-900 text-white flex items-center justify-center rounded-sm mb-6 shadow-sm">
                <Desktop size={24} weight="regular" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 font-outfit">Kiosk Manufacturing</h3>
              <p className="text-slate-800 leading-relaxed font-medium max-w-lg">
                Custom hardware fabrication and digital kiosk assembly for retail, transport, and public utility applications.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Helmet Kiosk — plain */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 row-span-1 bg-white border border-slate-200 p-8 flex flex-col justify-between rounded-sm hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
          >
            <div className="w-10 h-10 bg-blue-900 text-white flex items-center justify-center rounded-sm shadow-sm">
              <HardHat size={20} weight="regular" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-outfit">Helmet Kiosk Solutions</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Specialised automated helmet dispensing and smart storage units for road safety compliance.</p>
            </div>
          </motion.div>

          {/* Card 3: IT Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 row-span-1 relative rounded-sm overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.pexels.com/photos/6804068/pexels-photo-6804068.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="IT Services"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-white/80 z-10" />
            </div>
            <div className="relative z-20 flex flex-col justify-end h-full p-8">
              <div className="w-10 h-10 bg-blue-900 text-white flex items-center justify-center rounded-sm mb-4 shadow-sm">
                <Code size={20} weight="regular" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-outfit">IT Services & Solutions</h3>
              <p className="text-sm text-slate-800 leading-relaxed font-medium">Enterprise software, digital transformation, cloud infrastructure, and managed IT services.</p>
            </div>
          </motion.div>

          {/* Card 4: Agarbatti */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1 row-span-1 relative rounded-sm overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="https://static.prod-images.emergentagent.com/jobs/d681ca81-3231-4823-8242-2aa95c411a0f/images/9c60c77e6f2f49b4bdd4ecb82694a0964c0cff966410f84e211829fb6d312f01.png"
                alt="Agarbatti Manufacturing"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-white/70 z-10" />
            </div>
            <div className="relative z-20 flex flex-col justify-end h-full p-8">
              <div className="w-10 h-10 bg-blue-900 text-white flex items-center justify-center rounded-sm mb-4 shadow-sm">
                <Drop size={20} weight="regular" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-outfit">Agarbatti Manufacturing</h3>
              <p className="text-sm text-slate-800 leading-relaxed font-medium">Premium incense stick production using traditional methods with modern quality standards.</p>
            </div>
          </motion.div>

          {/* Card 5: Hackathon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-1 row-span-1 relative rounded-sm overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1759884248009-92c5e957708e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwyfHxoYWNrYXRob24lMjBjb2RpbmclMjBldmVudHxlbnwwfHx8fDE3NzYxOTIxOTR8MA&ixlib=rb-4.1.0&q=85"
                alt="Hackathon Events"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-white/70 z-10" />
            </div>
            <div className="relative z-20 flex flex-col justify-end h-full p-8">
              <div className="w-10 h-10 bg-blue-900 text-white flex items-center justify-center rounded-sm mb-4 shadow-sm">
                <Trophy size={20} weight="regular" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-outfit">Hackathon Organisation</h3>
              <p className="text-sm text-slate-800 leading-relaxed font-medium">End-to-end management of tech events, coding competitions, and innovation challenges.</p>
            </div>
          </motion.div>

          {/* Card 6: Consulting — plain */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="col-span-1 row-span-1 bg-white border border-slate-200 p-8 flex flex-col justify-between rounded-sm hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
          >
            <div className="w-10 h-10 bg-blue-900 text-white flex items-center justify-center rounded-sm shadow-sm">
              <Briefcase size={20} weight="regular" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-outfit">Consulting Services</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Strategic business advisory, market analysis, and growth consulting for startups and enterprises.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
