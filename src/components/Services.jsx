import React from 'react';
import { motion } from 'framer-motion';
import { Desktop, Trophy } from '@phosphor-icons/react/dist/ssr';

const Services = () => {
  return (
    <section id="services" className="px-5 sm:px-12 lg:px-24 py-16 sm:py-24 lg:py-32 bg-slate-50 border-b border-slate-200/50">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="mb-10 sm:mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold mb-3">What We Do</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold text-slate-900 mb-4 font-outfit">Phygital Innovation Experiences</h2>
          <p className="text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Bridging the gap between the physical and digital worlds through custom hardware manufacturing and community-driven technology events.
          </p>
        </div>

        {/* ── Mobile: simple stacked cards ── */}
        <div className="flex flex-col gap-4 md:hidden">
          {[
            {
              icon: <Desktop size={22} weight="regular" />,
              title: 'Kiosk Manufacturing',
              desc: 'Custom hardware fabrication and interactive digital kiosk assembly.',
              img: 'https://images.unsplash.com/photo-1764795849694-34b3316b3de4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxpbnRlcmFjdGl2ZSUyMGRpZ2l0YWwlMjBkaXNwbGF5JTIwa2lvc2t8ZW58MHx8fHwxNzc2MTkyMTk0fDA&ixlib=rb-4.1.0&q=85',
            },
            {
              icon: <Trophy size={22} weight="regular" />,
              title: 'Hackathon Organisation',
              desc: 'End-to-end management of large-scale tech events and coding competitions.',
              img: 'https://images.unsplash.com/photo-1759884248009-92c5e957708e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwyfHxoYWNrYXRob24lMjBjb2RpbmclMjBldmVudHxlbnwwfHx8fDE3NzYxOTIxOTR8MA&ixlib=rb-4.1.0&q=85',
            }
          ].map(({ icon, title, desc, img }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="relative rounded-sm overflow-hidden min-h-[220px]"
            >
              {img && (
                <div className="absolute inset-0 z-0">
                  <img src={img} alt={title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-white/75" />
                </div>
              )}
              <div className="relative z-10 flex flex-col items-start gap-4 p-6 h-full border border-slate-200/50">
                <div className="shrink-0 w-12 h-12 bg-blue-900 text-white flex items-center justify-center rounded-sm">
                  {icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 font-outfit">{title}</h3>
                  <p className="text-base text-slate-800 leading-relaxed font-medium">{desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Desktop: Layout ── */}
        <div className="hidden md:grid grid-cols-2 gap-6 lg:gap-8 auto-rows-[400px]">
          {/* Card 1: Kiosk Manufacturing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-sm overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1764795849694-34b3316b3de4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxpbnRlcmFjdGl2ZSUyMGRpZ2l0YWwlMjBkaXNwbGF5JTIwa2lvc2t8ZW58MHx8fHwxNzc2MTkyMTk0fDA&ixlib=rb-4.1.0&q=85"
                alt="Interactive Kiosk Solutions"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/70 to-white/30 z-10 transition-colors duration-500 group-hover:bg-white/60" />
            </div>
            <div className="relative z-20 flex flex-col justify-end h-full p-8 lg:p-12">
              <div className="w-14 h-14 bg-blue-900 text-white flex items-center justify-center rounded-sm mb-6 shadow-sm">
                <Desktop size={28} weight="regular" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-outfit leading-tight">Kiosk Manufacturing</h3>
              <p className="text-slate-800 text-lg lg:text-xl leading-relaxed font-medium max-w-lg">
                Custom hardware fabrication and digital kiosk assembly with interactive displays for retail, public utility, and robust transport solutions.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Hackathon Organisation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-sm overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1759884248009-92c5e957708e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwyfHxoYWNrYXRob24lMjBjb2RpbmclMjBldmVudHxlbnwwfHx8fDE3NzYxOTIxOTR8MA&ixlib=rb-4.1.0&q=85"
                alt="Hackathon Events"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/70 to-white/30 z-10 transition-colors duration-500 group-hover:bg-white/60" />
            </div>
            <div className="relative z-20 flex flex-col justify-end h-full p-8 lg:p-12">
              <div className="w-14 h-14 bg-blue-900 text-white flex items-center justify-center rounded-sm mb-6 shadow-sm">
                <Trophy size={28} weight="regular" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-outfit leading-tight">Hackathon Organisation</h3>
              <p className="text-slate-800 text-lg lg:text-xl leading-relaxed font-medium max-w-lg">
                End-to-end management of large-scale tech events, coding challenges, and innovation-driven developer community programs.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
