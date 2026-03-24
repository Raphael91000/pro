'use client';

import React, { useState, useEffect, useRef } from 'react';

const cards = [
  { title: 'Felizbella Cosmetic',      description: 'I co-founded Felizbella Cosmetic to facilitate online access to cosmetics.\n\n• E-commerce optimized for user experience\n• Meta Ads campaigns & retargeting\n• CRM automation & chatbot\n• Conversion funnel & A/B testing\n• Logistics management & cost optimization\n• KPI tracking & reporting.', src: '/FELIZBELLA.webp' },
  { title: 'KR Global Solution',        description: 'Company specialized in digital: e-commerce and digital solutions.\n\n• AI virtual assistants & NLP\n• API integration & custom solutions\n• Automated workflows & RPA\n• Responsive front-end / back-end development\n• Website & mobile app development\n• AI-driven automation.', src: '/KRGLOBAL.webp' },
  { title: 'Wash Center',               description: 'Co-founder of a car wash center.\n\n• Service launch & branding\n• Team management & organization\n• Multi-channel marketing campaigns\n• Strategic planning & budget\n• Customer experience & user feedback\n• KPI tracking & growth.', src: '/WASH.webp' },
  { title: 'Package Transport Company', description: 'Co-founder of a transport company.\n\n• Fleet creation & management\n• Route & itinerary optimization\n• Automated scanning system\n• Dispute management & customer relations\n• Logistics partnership negotiation\n• KPI tracking & performance indicators.', src: '/TRANSPORT.webp' },
  { title: 'Le Kin Di Thaï',            description: 'Co-founder of a Japanese/Thai restaurant.\n\n• Culinary design & concept\n• Team recruitment & training\n• Digital marketing strategy & social media\n• Process optimization & service quality\n• Supplier management & purchasing\n• Cost analysis & margins.', src: '/KIN.webp' },
  { title: 'CTBG',                      description: 'At CTBG, I built a solid client network through multi-channel prospecting.\n\n• Client portfolio development\n• Physical & digital prospecting\n• Planning & schedule coordination\n• Negotiation & customer retention\n• Reporting & sales analysis.', src: '/CTBG.webp' },
  { title: 'Murprotec',                 description: 'At Murprotec, I strengthened my B2C sales skills.\n\n• Field prospecting\n• End-to-end customer relationship management\n• Training new sales representatives\n• Contract negotiation\n• Performance tracking & objectives.', src: '/MURPROTEC.webp' },
  { title: 'Geodis / Darty',            description: 'Order picker.\n\n• Package scanning\n• Customer order preparation\n• Truck loading/unloading\n• Pallet verification before shipment\n• Flow optimization\n• Deadline compliance and service quality.', src: '/GEODIS.webp' },
  { title: 'Cazy Guillaume',            description: 'Passionate about construction, I completed projects from A to Z.\n\n• Assembly of concrete blocks, bricks & formwork\n• Plan reading & dimensional calculations\n• Safety & building standards\n• Quotes & cost estimation\n• Coordination with subcontractors.', src: '/CAZY.webp' },
  { title: 'Education',                 description: 'May–Sep 2025 — English Training, Duke Languages School Bangkok.\n\n2019–2021 — Building Construction Degree, CFA BTP Blois.\n\n2017–2019 — Building Heritage Baccalaureate, CFA BTP Blois.\n\n2015–2017 — Mason Certificate, CFA BTP Blois.', src: '/SCHOOL.webp' },
];

const bgColors = [
  '#1a0a2e', '#2a0a3e', '#3a0a40', '#4a0a42',
  '#5a0a44', '#6b0f4e', '#7a0a50', '#900a52',
  '#a80042', '#c0003a',
];

const useInView = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
};

const AnimatedHeader = () => {
  const [h2Ref, h2InView] = useInView();
  const [pRef, pInView]   = useInView();

  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2
        ref={h2Ref as React.RefObject<HTMLHeadingElement>}
        className={`text-4xl md:text-5xl font-bold transition-all duration-700 ease-out text-slate-900 ${h2InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        My journey.
      </h2>
      <p
        ref={pRef as React.RefObject<HTMLParagraphElement>}
        className={`text-lg text-slate-500 mt-4 transition-all duration-700 ease-out delay-200 ${pInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        Entrepreneurship, experiences & education — everything that shaped who I am.
      </p>
    </div>
  );
};

export default function Journey() {
  return (
    <div id="journey" className="bg-white font-sans">
      <div className="px-[5%]">
        <div className="max-w-7xl mx-auto">
          <section className="pt-24 md:pt-48 pb-0 flex flex-col items-center">

            <div className="w-full">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-8 p-8 md:p-12 rounded-3xl mb-16 sticky"
                  style={{ top: `${80 + index * 12}px`, backgroundColor: bgColors[index] }}
                >
                  {/* Texte */}
                  <div className="flex flex-col justify-center">
                    <span className="text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-none text-white/20">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                      {card.title}
                    </h3>
                    <p className="text-white/70 whitespace-pre-line leading-relaxed text-sm md:text-base">
                      {card.description}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="mt-8 md:mt-0">
                    <img
                      src={card.src}
                      alt={card.title}
                      loading="lazy"
                      className="w-full h-64 md:h-80 rounded-2xl shadow-2xl object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>

          </section>
        </div>
      </div>
    </div>
  );
}
