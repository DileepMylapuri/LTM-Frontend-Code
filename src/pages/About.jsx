import React from "react";
import { HeartHandshake, Users, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const cards = [
    {
      key: "first",
      icon: Sparkles,
      title: "First Meeting",
      desc: "A meaningful introduction that brought two hearts closer."
    },
    {
      key: "engagement",
      icon: HeartHandshake,
      title: "Engagement",
      desc: "A joyful celebration marking the promise of forever."
    },
    {
      key: "wedding",
      icon: Users,
      title: "The Wedding",
      desc: "A sacred ceremony uniting families and traditions."
    }
  ];

  return (
    <div className="bg-rose-50 text-gray-800">

      {/* HERO */}
      <section className="relative py-28 px-6 md:px-16 bg-gradient-to-br from-rose-100 via-white to-rose-200 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-light text-rose-800 tracking-wide">About Our Celebration</h1>
          <div className="w-24 h-[2px] bg-rose-400 mx-auto my-8"></div>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            A celebration of love, unity, family values, and a beautiful journey
            that marks the beginning of a lifelong partnership.
          </p>
        </div>
      </section>

       <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1974&auto=format&fit=crop"
              alt="Couple"
              className="rounded-2xl shadow-xl object-cover w-full"/>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-rose-700">
              The Couple
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Venkatesu and Nandini share a bond built on respect,
              understanding, and deep affection. Their journey together is
              guided by shared dreams, values, and the support of their loving
              families.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This wedding marks not just the union of two individuals,
              but the coming together of two beautiful families.
            </p>
          </div>

        </div>
      </section>


      {/* JOURNEY */}
      <section className="py-20 px-6 md:px-16 bg-rose-100">
        <h2 className="text-3xl text-center text-rose-800 mb-12">
          Our Journey
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {cards.map((card) => (
            <div
              key={card.key}
              onClick={() => navigate(`/journey/${card.key}`)}
              className="cursor-pointer bg-white p-8 rounded-2xl shadow hover:-translate-y-2 transition"
            >
              <card.icon className="text-rose-600 mb-4" />

              <h3 className="text-xl text-rose-700">
                {card.title}
              </h3>

              <p className="text-gray-600 mt-2">
                {card.desc}
              </p>

              <p className="text-sm text-gray-400 mt-3">
                Click to view & add memories →
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAMILY VALUES ================= */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-light text-rose-800 mb-10">
            Family & Traditions
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Rooted in strong cultural traditions and values, this wedding
            represents unity, respect, and devotion. Our families come together
            in harmony to bless this beautiful union and celebrate the
            beginning of a new chapter.
          </p>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-rose-900 text-white py-12 text-center">
        <h3 className="text-2xl font-light tracking-wide">
          With Love & Gratitude
        </h3>
        <p className="mt-3 text-rose-200">
          The Family of you
        </p>
      </footer>

    </div>
  );
};

export default About;
