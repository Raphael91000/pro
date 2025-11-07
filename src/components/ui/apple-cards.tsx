import React from "react";
import { Carousel, Card } from "./apple-cards-carousel";
import "./apple-cards-carousel.css"; // ✅ Import du CSS responsive ici

interface AppleCardsProps {
  onEndReachedChange?: (atEnd: boolean) => void;
}

interface CardData {
  id: number;
  title: string;
  zoomTitle: string;
  zoomBody: string;
  src?: string;
  backgroundClass?: string;
  section?: "education" | "entrepreneurship" | "experience";
}

export default function AppleCards({
  onEndReachedChange,
}: AppleCardsProps = {}) {
  const cards: CardData[] = [
    // --- Entrepreneurship ---
    {
      id: 1,
      src: "/FELIZBELLA.png",
      title: "Felizbella Cosmetic",
      zoomTitle: "Co-Founder – Felizbella Cosmetic",
      zoomBody:
        "I co-founded Felizbella Cosmetic to facilitate online access to cosmetics.\n\n• E-commerce optimized for user experience\n• Meta Ads campaigns & retargeting\n• CRM automation & chatbot\n• Conversion funnel & A/B testing\n• Market research & competitive intelligence\n• Logistics management & cost optimization\n• KPI tracking & reporting.",
      section: "entrepreneurship",
    },
    {
      id: 2,
      src: "/KRGLOBAL.png",
      title: "KR Global Solution",
      zoomTitle: "Co-Founder – KR GLOBAL SOLUTION",
      zoomBody:
        "Company specialized in digital: e-commerce and digital solutions.\n\n• AI virtual assistants & NLP\n• API integration & custom solutions\n• Automated workflows & RPA\n• Responsive front-end / back-end development\n• Data security & compliance\n• Scalability & continuous maintenance\n• Website & mobile app development\n• AI-driven automation.",
      section: "entrepreneurship",
    },
    {
      id: 4,
      src: "/WASH.png",
      title: "Wash Center",
      zoomTitle: "Co-Founder – Wash Center",
      zoomBody:
        "Co-founder of a car wash center, I gained entrepreneurial experience.\n\n• Service launch & branding\n• Team management & organization\n• Multi-channel marketing campaigns\n• Strategic planning & budget\n• Customer experience & user feedback\n• KPI tracking & growth.",
      section: "entrepreneurship",
    },
    {
      id: 5,
      src: "/TRANSPORT.png",
      title: "Package Transport Company",
      zoomTitle: "Co-Founder – Package Transport Company",
      zoomBody:
        "Co-founder of a transport company.\n\n• Fleet creation & management\n• Route & itinerary optimization\n• Automated scanning system\n• Dispute management & customer relations\n• Logistics partnership negotiation\n• KPI tracking & performance indicators.",
      section: "entrepreneurship",
    },
    {
      id: 8,
      src: "/KIN.png",
      title: "Le Kin Di Thaï",
      zoomTitle: "Co-Founder – Le Kin Di Thaï",
      zoomBody:
        "Co-founder of a Japanese/Thai restaurant.\n\n• Culinary design & concept\n• Team recruitment & training\n• Digital marketing strategy & social media\n• Process optimization & service quality\n• Supplier management & purchasing\n• Cost analysis & margins.",
      section: "entrepreneurship",
    },

    // --- Expériences professionnelles ---
    {
      id: 3,
      src: "/CTBG.png",
      title: "CTBG",
      zoomTitle: "Technical Sales Representative – CTBG",
      zoomBody:
        "At CTBG, I built a solid client network through multi-channel prospecting.\n\n• Client portfolio development\n• Physical & digital prospecting\n• Planning & schedule coordination\n• Negotiation & customer retention\n• Reporting & sales analysis.",
      section: "experience",
    },
    {
      id: 10,
      src: "/MURPROTEC.png",
      title: "Murprotec",
      zoomTitle: "Technical Sales Representative – Murprotec (2023–2024)",
      zoomBody:
        "At Murprotec, I strengthened my B2C sales skills.\n\n• Field prospecting\n• End-to-end customer relationship management\n• Training new sales representatives\n• Contract negotiation\n• Performance tracking & objectives.",
      section: "experience",
    },
    {
      id: 6,
      src: "/GEODIS.png",
      title: "Geodis / Darty",
      zoomTitle: "Order Picker – GEODIS / DARTY",
      zoomBody:
        "Order picker.\n\n• Package scanning\n• Customer order preparation\n• Truck loading/unloading\n• Pallet verification before shipment\n• Flow optimization\n• Deadline compliance and service quality.",
      section: "experience",
    },
    {
      id: 7,
      src: "/CAZY.png",
      title: "Cazy Guillaume",
      zoomTitle: "Mason – Cazy Guillaume",
      zoomBody:
        "Passionate about construction, I completed projects from A to Z ensuring quality and safety.\n\n• Assembly of concrete blocks, bricks & formwork\n• Plan reading & dimensional calculations\n• Rigorous construction site monitoring\n• Safety & building standards\n• Quotes & cost estimation\n• Coordination with subcontractors.",
      section: "experience",
    },

    // --- Éducation ---
    {
      id: 9,
      src: "/SCHOOL.png",
      title: "Education",
      zoomTitle: "Education",
      zoomBody:
        "May–Sep 2025 — English Training, Duke Languages School Bangkok.\n\n2019–2021 — Building Construction Degree, CFA BTP Blois.\n\n2017–2019 — Building Heritage Baccalaureate, CFA BTP Blois.\n\n2015–2017 — Mason Certificate, CFA BTP Blois.",
      section: "education",
    },
  ];

  const carouselItems = cards.map((card, index) => (
    <Card
      key={card.id}
      card={{
        src: card.src,
        title: card.title,
        content: (
          <div className="whitespace-pre-line text-white">{card.zoomBody}</div>
        ),
      }}
      index={index}
      layout={true}
    />
  ));

  return (
    <Carousel
      items={carouselItems}
      onEndReachChange={onEndReachedChange}
    />
  );
}
