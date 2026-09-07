import React, { useState } from 'react';
import {
  ArrowRight,
  Globe,
  Menu,
  X,
  Shield,
  BarChart3,
  Package
} from 'lucide-react';

// Notice we accept an onNavigate prop here
const Home = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  /* ================= TRANSLATIONS ================= */
  const translations = {
    EN: {
      home: "Home",
      features: "Features",
      howItWorks: "How It Works",
      about: "About Us",
      signIn: "Sign In",
      getStarted: "Get Started",
      heroBadge: "Smart Management for Modern Businesses.",
      heroTitle: (
        <>
          Hello, Build, <br />
          Manage and <br />
          Grow with E-GISUBIZO
        </>
      ),
      heroDesc:
        "E-Gisubizo is a web-based management system that helps businesses efficiently manage inventory, track sales and purchases, organize customer data, and generate real-time reports to support better decision-making.",
      btnSubmit: "Get Started",
      whyTitle: "Why Choose E-GISUBIZO?",
      whyDesc:
        "E-GISUBIZO system allows owners to monitor sales trends, stock movement, customer activity over time and provide reports that can be used to see the performance of the business and make informed decisions.",
      inventoryTitle: "INVENTORY",
      inventoryDesc:
        "It helps track available products, prevents running out of stock, avoids overstocking, and improves sales planning.",
      reportTitle: "REPORTS & ANALYTICS",
      reportDesc:
        "Generate detailed reports and analyze data to make informed business decisions.",
      secureTitle: "Secure & Reliable",
      secureDesc:
        "Advanced security systems protect user information and ensure trusted digital communication.",
      hiwTitle: "How It Works",
      hiwDesc:
        "Simple steps that allow users to manage business operations efficiently.",
      step1: "Create Account",
      step1Desc:
        "Register securely with your business information.",
      step2: "Manage Data",
      step2Desc:
        "Users add and update products, customer details, and purchase records in the system.",
      step3: "Sales Processing",
      step3Desc:
        "When a sale is made, the system records the transaction and automatically updates the inventory stock.",
      step4: "Reports & Monitoring",
      step4Desc:
        "The system generates real-time reports on sales, inventory, and performance to help decision-making.",
      aboutBadge: "About E-GISUBIZO",
      aboutTitle:
        "Transforming Business Management Through Innovation",
      aboutDesc:
        "Our platform simplifies business operations by providing a secure, transparent, and efficient management experience.",
      transparency: "Transparency",
      transparencyDesc:
        "Track every business operation with clear updates and accountability.",
      efficiency: "Efficiency",
      efficiencyDesc:
        "Improve business management with streamlined workflows and automation.",
      userExperience: "User Experience",
      userExperienceDesc:
        "Deliver seamless accessibility optimized for mobile, tablet, and desktop devices.",
      ctaTitle:
        "Ready To Transform Your Business Management Experience?",
      ctaDesc:
        "Join thousands of users already using E-GISUBIZO to improve productivity, accountability, and business efficiency.",
      ctaBtn: "Get Started Today",
      footerDesc:
        "Empowering businesses through modern management solutions.",
      platform: "Platform",
      legal: "Legal",
      support: "Support",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      cookie: "Cookie Policy",
      help: "Help Center",
      faq: "FAQs",
      customerSupport: "Customer Support",
      rights: "© 2026 E-GISUBIZO. All rights reserved."
    },
    KINY: {
      home: "Ahabanza",
      features: "Ibiranga Sisitemu",
      howItWorks: "Uko Bikora",
      about: "Abo Turi Bo",
      signIn: "Injira",
      getStarted: "Tangira",
      heroBadge: "Sisitemu y’ubuyobozi igezweho ku bucuruzi bwa none.",
      heroTitle: (
        <>
          Muraho, Tegura, <br />
          Genzura kandi <br />
          Uteze Imbere na E-GISUBIZO
        </>
      ),
      heroDesc:
        "E-Gisubizo ni sisitemu yo kuri internet ifasha ubucuruzi gucunga neza ububiko, gukurikirana ibyaguzwe n’ibyacurujwe, kubika amakuru y’abakiliya, no gukora raporo zifasha gufata ibyemezo byiza.",
      btnSubmit: "Tangira",
      whyTitle: "Kuki Wahitamo E-GISUBIZO?",
      whyDesc:
        "Sisitemu ya E-GISUBIZO ifasha ba nyiri ubucuruzi gukurikirana ibyagurishijwe, uko ububiko bugenda, ibikorwa by’abakiliya ndetse no gukora raporo zifasha gufata ibyemezo byiza.",
      inventoryTitle: "UBUBIKO",
      inventoryDesc:
        "Ifasha gukurikirana ibicuruzwa bihari, kwirinda kubura ibicuruzwa no kugabanya ubwinshi burenze.",
      reportTitle: "RAPORO N’ISESENGURA",
      reportDesc:
        "Kora raporo zirambuye kandi usesengure amakuru kugira ngo ufate ibyemezo byiza.",
      secureTitle: "UMUTEKANO N’UBWIZERWE",
      secureDesc:
        "Sisitemu z’umutekano zirinda amakuru y’abakoresha kandi zigatanga ubwizerwe.",
      hiwTitle: "Uko Bikora",
      hiwDesc:
        "Intambwe zoroshye zifasha abakoresha gucunga ibikorwa by’ubucuruzi neza.",
      step1: "Kora Konti",
      step1Desc:
        "Iyandikishe ukoresheje amakuru y’ubucuruzi bwawe.",
      step2: "Gucunga Amakuru",
      step2Desc:
        "Abakoresha bashyiramo kandi bagahindura amakuru y’ibicuruzwa, abakiliya n’ibyaguzwe.",
      step3: "Igurisha",
      step3Desc:
        "Iyo igicuruzwa kigurishijwe, sisitemu ihita ibika amakuru kandi ikavugurura ububiko.",
      step4: "Raporo no Gukurikirana",
      step4Desc:
        "Sisitemu ikora raporo z’igihe nyacyo ku bicuruzwa n’imikorere y’ubucuruzi.",
      aboutBadge: "Ibyerekeye E-GISUBIZO",
      aboutTitle:
        "Guhindura uburyo bwo gucunga ubucuruzi hifashishijwe ikoranabuhanga",
      aboutDesc:
        "Urubuga rwacu rworoshya ibikorwa by’ubucuruzi rutanga uburyo bwizewe, buboneye kandi bworohereza abakoresha.",
      transparency: "Ubunyangamugayo",
      transparencyDesc:
        "Kurikirana ibikorwa byose by’ubucuruzi mu buryo busobanutse.",
      efficiency: "Ubushobozi",
      efficiencyDesc:
        "Kunoza imikorere y’ubucuruzi hifashishijwe automation.",
      userExperience: "Uko Umukoresha Abyumva",
      userExperienceDesc:
        "Gutuma urubuga rukora neza kuri telefoni, tablette na mudasobwa.",
      ctaTitle:
        "Witeguye Guhindura Imicungire y’Ubucuruzi Bwawe?",
      ctaDesc:
        "Ifatanye n’abakoresha benshi bamaze gukoresha E-GISUBIZO mu kunoza ubucuruzi bwabo.",
      ctaBtn: "Tangira Nonaha",
      footerDesc:
        "Guteza imbere ubucuruzi hifashishijwe ibisubizo by’ikoranabuhanga.",
      platform: "Urubuga",
      legal: "Amategeko",
      support: "Ubufasha",
      privacy: "Politiki y’Amabanga",
      terms: "Amabwiriza",
      cookie: "Politiki ya Cookies",
      help: "Ikigo cy’Ubufasha",
      faq: "Ibibazo Bikunze Kubazwa",
      customerSupport: "Ubufasha ku Bakiliya",
      rights: "© 2026 E-GISUBIZO. Uburenganzira bwose burabitswe."
    }
  };

  const t = translations[currentLang];

  return (
    <div className="font-sans bg-green-100 text-gray-900 overflow-x-hidden">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/LOG.png"
              alt="E-GISUBIZO Logo"
              className="w-14 md:w-16 object-contain"
            />
            <span className="text-lg md:text-xl font-bold tracking-wide">
              E-GISUBIZO
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#home">{t.home}</a>
            <a href="#features">{t.features}</a>
            <a href="#how-it-works">{t.howItWorks}</a>
            <a href="#about">{t.about}</a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm">
              <Globe size={15} />
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="outline-none bg-transparent cursor-pointer"
              >
                <option value="EN">ENG</option>
                <option value="KINY">KINY</option>
              </select>
            </div>

            {/* FIXED: Added onNavigate callback trigger */}
            <button onClick={() => onNavigate('signup')}>{t.signIn}</button>

            {/* FIXED: Added onNavigate callback trigger */}
            <button 
              onClick={() => onNavigate('signup')} 
              className="bg-black text-white px-5 py-3 rounded-xl transition hover:bg-gray-800"
            >
              {t.getStarted}
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="flex flex-col gap-6 p-6 text-sm font-medium">
              <a href="#home" onClick={() => setMenuOpen(false)}>{t.home}</a>
              <a href="#features" onClick={() => setMenuOpen(false)}>{t.features}</a>
              <a href="#how-it-works" onClick={() => setMenuOpen(false)}>{t.howItWorks}</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>{t.about}</a>

              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-3 text-sm w-full bg-gray-50">
                <Globe size={18} className="text-gray-500" />
                <select
                  value={currentLang}
                  onChange={(e) => setCurrentLang(e.target.value)}
                  className="outline-none bg-transparent cursor-pointer w-full font-semibold"
                >
                  <option value="EN">English (ENG)</option>
                  <option value="KINY">Kinyarwanda (KINY)</option>
                </select>
              </div>

              {/* FIXED: Added mobile interaction actions */}
              <button 
                onClick={() => { setMenuOpen(false); onNavigate('signup'); }} 
                className="text-left py-2 font-semibold text-gray-700"
              >
                {t.signIn}
              </button>

              <button 
                onClick={() => { setMenuOpen(false); onNavigate('signup'); }} 
                className="bg-black text-white py-3 rounded-xl font-semibold text-center"
              >
                {t.getStarted}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ================= HERO SECTION ================= */}
      <header id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-20 container mx-auto px-4 md:px-8 py-20 grid md:grid-cols-2 gap-16 items-center">
          <div className="text-white text-center md:text-left">
            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm inline-block mb-6">
              {t.heroBadge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              {t.heroTitle}
            </h1>
            <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto md:mx-0">
              {t.heroDesc}
            </p>

            {/* FIXED: Added onNavigate click trigger on Hero Button */}
            <button 
              onClick={() => onNavigate('signup')} 
              className="bg-white text-black px-6 py-4 rounded-xl flex items-center gap-2 font-semibold mx-auto md:mx-0 transition hover:bg-gray-100"
            >
              <ArrowRight size={18} />
              {t.btnSubmit}
            </button>
          </div>

          <div className="flex items-center justify-center">
            <img
              src="/LOGO.png"
              alt="logo"
              className="w-48 sm:w-60 md:w-[320px] lg:w-[450px] animate-pulse"
            />
          </div>
        </div>
      </header>

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.whyTitle}</h2>
          <p className="text-gray-500 max-w-3xl mx-auto mb-16">{t.whyDesc}</p>

          <div className="grid md:grid-cols-3 gap-8 bg-green-50 p-8 rounded-3xl">
            <FeatureCard icon={<Package className="w-7 h-7" />} title={t.inventoryTitle} desc={t.inventoryDesc} />
            <FeatureCard icon={<BarChart3 className="w-7 h-7" />} title={t.reportTitle} desc={t.reportDesc} />
            <FeatureCard icon={<Shield className="w-7 h-7" />} title={t.secureTitle} desc={t.secureDesc} />
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="py-24 bg-blue-50">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">{t.hiwTitle}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-16">{t.hiwDesc}</p>

          <div className="grid md:grid-cols-4 gap-8">
            <HowCard step="1" title={t.step1} desc={t.step1Desc} />
            <HowCard step="2" title={t.step2} desc={t.step2Desc} />
            <HowCard step="3" title={t.step3} desc={t.step3Desc} />
            <HowCard step="4" title={t.step4} desc={t.step4Desc} />
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="bg-black text-white px-4 py-2 rounded-full text-sm">{t.aboutBadge}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-8 mb-6">{t.aboutTitle}</h2>
            <p className="text-gray-600 text-lg leading-relaxed">{t.aboutDesc}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <AboutCard title={t.transparency} desc={t.transparencyDesc} />
            <AboutCard title={t.efficiency} desc={t.efficiencyDesc} />
            <AboutCard title={t.userExperience} desc={t.userExperienceDesc} />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-black py-24 text-center text-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.ctaTitle}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10">{t.ctaDesc}</p>
          
          {/* FIXED: Added onNavigate click trigger on Footer CTA Button */}
          <button 
            onClick={() => onNavigate('signup')} 
            className="bg-white text-black px-8 py-4 rounded-xl font-semibold transition hover:bg-gray-100"
          >
            {t.ctaBtn}
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/LOG.png" alt="Logo" className="w-12" />
              <span className="text-xl font-bold">E-GISUBIZO</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">{t.footerDesc}</p>
          </div>

          <FooterLinks title={t.platform} links={[t.home, t.features, t.about, "Contact"]} />
          <FooterLinks title={t.legal} links={[t.privacy, t.terms, t.cookie]} />
          <FooterLinks title={t.support} links={[t.help, t.faq, t.customerSupport]} />
        </div>
        <div className="text-center text-gray-400 text-sm mt-16 border-t border-gray-100 pt-8">{t.rights}</div>
      </footer>
    </div>
  );
};

/* ================= SUB-COMPONENTS ================= */
const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 border border-gray-100 rounded-3xl hover:shadow-xl transition duration-300 text-left">
    <div className="bg-gray-100 w-14 h-14 flex items-center justify-center rounded-2xl mb-6">{icon}</div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

const HowCard = ({ step, title, desc }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition">
    <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">{step}</div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const AboutCard = ({ title, desc }) => (
  <div className="bg-gray-50 p-8 rounded-3xl hover:shadow-lg transition">
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

const FooterLinks = ({ title, links }) => (
  <div>
    <h4 className="font-bold mb-6 text-lg">{title}</h4>
    <ul className="space-y-4">
      {links.map((link) => (
        <li key={link}>
          <a href="#" className="text-gray-500 hover:text-black transition">{link}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default Home;