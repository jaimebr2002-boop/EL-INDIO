import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Facebook, 
  Instagram, 
  Music, 
  MapPin, 
  Phone, 
  Clock, 
  Calendar, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X,
  Waves,
  Utensils,
  GlassWater,
  Star,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---

interface Review {
  author: string;
  date: string;
  text: string;
}

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image?: string;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

// --- Data ---

const REVIEWS: Review[] = [
  {
    author: "Fran Godp",
    date: "Hace 2 meses",
    text: "Una experiencia que merece la pena, un lugar tranquilo, al lado del mar. Puedes comer en la terraza o incluso dentro sin perderlo de vista. Además buena cocina y muy buen trato."
  },
  {
    author: "Luisomo F. A.",
    date: "Hace 2 meses",
    text: "Lugar ideal por su ubicación y sus vistas encima del mar, sin duda, lugar con encanto. Buena comida en general y excelente servicio y atención."
  },
  {
    author: "Sara Usoz",
    date: "Hace 1 mes",
    text: "Sitio super recomendado por las vistas. Las lágrimas de secreto muy ricas. Todo en general está bueno. Muy buen servicio. Recomiendo reservar."
  },
  {
    author: "José Magán",
    date: "Hace 7 meses",
    text: "Tres veces hemos ido en una semana y las tres veces hemos comido espectacular. Servicio muy amable y profesional. Comida de categoría."
  },
  {
    author: "Veronica Barbeitos",
    date: "Hace 8 meses",
    text: "Encantador restaurante con unas vistas espectaculares!! Cocina de lujo, riquísima! Trato fantástico y ambiente maravilloso. Recomendable al 1000x1000!! Volveré sí o sí!!"
  },
  {
    author: "Daniel Alvarez",
    date: "Hace 10 meses",
    text: "Sitio maravilloso. Una ubicación privilegiada sobre la playa de Estaño. Una cocina de corte internacional con toque local. Servicio de 10. Música en directo."
  }
];

const MENU: MenuCategory[] = [
  {
    title: "PICOTEO",
    items: [
      { name: "Verduritas en tempura", description: "Con aceite de curry y teriyaki.", price: "14,00 €" },
      { name: "Provolone a la plancha", description: "Con cherrys y aceite de orégano.", price: "12,00 €" },
      { name: "Cecina aliñada", description: "Con lascas de Parmesano.", price: "14,00 €" },
      { name: "Croquetas \"a nuestra manera\"", description: "Receta artesana y cremosa.", price: "12,00 €" },
      { name: "Setas rellenas", description: "Con salsa La Peral.", price: "14,00 €" },
      { name: "Puerros gratinados", description: "Con jamón york, queso y bechamel.", price: "14,00 €" }
    ]
  },
  {
    title: "ENSALADAS",
    items: [
      { name: "Burrata", description: "Con tomates azules, aceite de oliva y albahaca.", price: "16,00 €" },
      { name: "Del Mar", description: "Escarola, langostinos, pulpo, ajo picado, sal maldon y cítricos.", price: "17,00 €" },
      { name: "De la Tierra", description: "Variado de lechugas, cebolla caramelizada, nueces, queso de cabra, setas y crujiente de cecina.", price: "16,00 €" },
      { name: "Ensalada Mixta", description: "Clásica y fresca con productos de la huerta.", price: "14,00 €" }
    ]
  },
  {
    title: "SABOR DE MAR",
    items: [
      { name: "Pulpo rustido", description: "Queso de cabra con mermelada de arándanos y hojas verdes.", price: "18,00 €" },
      { name: "Pulpo braseado", description: "Con mojos canarios.", price: "18,00 €" },
      { name: "Brocheta de pixín y langostinos", description: "Rape fresco y langostinos a la brasa.", price: "16,00 €" },
      { name: "Calamares en su tinta", description: "Con arroz blanco.", price: "18,50 €" },
      { name: "Bacalao con alioli al gratén", description: "Con pisto asturiano.", price: "20,00 €" },
      { name: "Zamburiñas", description: "Con nuestro aliño verde.", price: "16,00 €" },
      { name: "Bastones de calamar", description: "Con aroma de cítricos.", price: "18,00 €" }
    ]
  },
  {
    title: "SELECCIÓN DE CARNES",
    items: [
      { name: "Cachopo de ternera", description: "Con cecina y nuestra combinación de quesos italianos.", price: "22,00 €" },
      { name: "Lágrima ibérica 100%", description: "Con patata confitada.", price: "14,50 €" },
      { name: "Chuletón de Trasacar a la piedra", description: "Mínimo 2 personas.", price: "24,00 €/pax" }
    ]
  },
  {
    title: "POR ENCARGO (mín. 2 personas)",
    items: [
      { name: "Arroz con marisco", description: "Sabor intenso a mar.", price: "24,00 €/pax" },
      { name: "Arroz negro", description: "Con su alioli suave.", price: "22,00 €/pax" },
      { name: "Arroz bogavante azul", description: "La joya de nuestra cocina.", price: "33,00 €/pax" }
    ]
  }
];

const GALLERY_DATA = [
  "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773150688/581938250_18421497691116331_460930077189600942_n_i07faw.jpg",
  "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773150689/587717312_18421837006116331_4715584487280996444_n_xggnc7.jpg",
  "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773150688/582079685_18421493629116331_4593025081940289083_n_ppsdmk.jpg",
  "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773150688/583016508_18421493656116331_800044337233825649_n_ldy5cb.jpg",
  "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773151139/582090450_18421497673116331_3260449785318563490_n_sgnpb6.jpg",
  "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773151145/583040310_18421493638116331_6413396067472036921_n_ndynzl.jpg"
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Carta', href: '#carta' },
    { name: 'Reseñas', href: '#resenas' },
    { name: 'Visítanos', href: '#visitanos' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4",
      scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#" className="flex items-center gap-3">
          <img 
            src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773150688/174399481_766288424042474_301179483124528290_n._xui8kv.jpg" 
            alt="El Indio Logo" 
            className={cn("h-12 w-12 rounded-full object-cover border-2 transition-all", scrolled ? "border-deep-blue" : "border-white")}
          />
          <span className={cn(
            "font-display text-2xl font-bold tracking-tighter transition-colors",
            scrolled ? "text-deep-blue" : "text-white"
          )}>
            EL INDIO
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={cn(
                "text-sm font-medium uppercase tracking-widest hover:opacity-70 transition-opacity",
                scrolled ? "text-deep-blue" : "text-white"
              )}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="tel:984098301" 
            className={cn(
              "px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all",
              scrolled 
                ? "bg-sea-600 text-white hover:bg-sea-700" 
                : "bg-white text-deep-blue hover:bg-sand-100"
            )}
          >
            Reservar
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={cn("md:hidden", scrolled ? "text-deep-blue" : "text-white")}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden flex flex-col p-6 space-y-4"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-deep-blue text-lg font-medium border-b border-sand-100 pb-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="tel:984098301" 
              className="bg-sea-600 text-white text-center py-3 rounded-xl font-bold uppercase tracking-widest"
              onClick={() => setIsOpen(false)}
            >
              Reservar Ahora
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773150688/unnamed_cxtgtx.webp" 
          alt="Playa de Estaño Gijón" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1 mb-6 border border-white/30 rounded-full text-white text-xs uppercase tracking-[0.3em] backdrop-blur-sm">
            Playa de Estaño · Gijón
          </span>
          <h1 className="font-display text-5xl md:text-8xl text-white font-bold mb-6 leading-tight">
            Restaurante <br />
            El Indio <br />
            <span className="italic font-normal">Terraza Club</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 font-light tracking-wide">
            Sabores del Cantábrico frente al mar
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="tel:984098301" 
              className="w-full sm:w-auto px-10 py-4 bg-white text-deep-blue rounded-full font-bold uppercase tracking-widest hover:bg-sand-100 transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <Phone size={20} /> Reservar ahora
            </a>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <a href="https://www.facebook.com/p/El-INDIO-Terraza-Club-100058155648683/?locale=es_LA" target="_blank" className="text-white hover:text-sea-700 transition-colors"><Facebook size={24} /></a>
              <a href="https://www.instagram.com/elindioterrazaclub/?hl=es" target="_blank" className="text-white hover:text-sea-700 transition-colors"><Instagram size={24} /></a>
              <a href="https://www.tiktok.com/@indio_terraza_club" target="_blank" className="text-white hover:text-sea-700 transition-colors">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Badge for Live Music */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10 right-10 hidden lg:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white"
      >
        <div className="w-10 h-10 bg-sea-600 rounded-full flex items-center justify-center animate-pulse">
          <Music size={20} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest font-bold">Conciertos</p>
          <p className="text-sm opacity-80">En directo cada semana</p>
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="nosotros" className="py-24 px-6 bg-sand-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773150688/476169387_9308461319211999_4800255770001612745_n_c72nuj.jpg" 
              alt="Chef El Indio" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-sea-600 rounded-3xl -z-10 hidden lg:block" />
          <div className="absolute top-10 -left-10 p-6 bg-white rounded-2xl shadow-xl hidden lg:block">
            <p className="font-display text-4xl text-deep-blue font-bold">10+</p>
            <p className="text-xs uppercase tracking-widest text-gray-500">Años de tradición</p>
          </div>
        </div>

        <div>
          <span className="text-sea-600 font-bold uppercase tracking-widest text-sm">Nuestra Historia</span>
          <h2 className="font-display text-4xl md:text-5xl text-deep-blue font-bold mt-4 mb-8">Un refugio frente al Cantábrico</h2>
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              En el corazón de la Playa de Estaño, <strong>El Indio Terraza Club</strong> nació con un propósito claro: fusionar la bravura del mar Cantábrico con la calidez de un hogar asturiano.
            </p>
            <p>
              Nuestra filosofía se basa en el respeto absoluto al producto local. Desde los mariscos más frescos de la rula de Gijón hasta nuestras famosas tapas de autor, cada plato cuenta una historia de sabor y tradición.
            </p>
            <p>
              Pero no somos solo comida. Somos el lugar donde los atardeceres se acompañan de <strong>buenos cócteles</strong>, el calor de nuestra <strong>chimenea</strong> en invierno y la magia de los <strong>conciertos en directo</strong> que llenan nuestra terraza de vida cada semana.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-12">
            {[
              { icon: <Waves />, label: "Terraza" },
              { icon: <Music />, label: "Conciertos" },
              { icon: <GlassWater />, label: "Cócteles" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border border-sand-100">
                <div className="text-sea-600 mb-2">{item.icon}</div>
                <span className="text-xs font-bold uppercase tracking-tighter text-deep-blue">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const MenuSection = () => {
  return (
    <section id="carta" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sea-600 font-bold uppercase tracking-widest text-sm">Gastronomía</span>
          <h2 className="font-display text-4xl md:text-5xl text-deep-blue font-bold mt-4">Nuestra Carta</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto italic">Sabores auténticos del Cantábrico preparados con pasión.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12 mb-20">
          {MENU.map((category, idx) => (
            <div key={idx} className="space-y-8">
              <h3 className="font-display text-2xl text-sea-600 font-bold border-b border-sand-200 pb-2 italic">
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.items.map((item, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-lg font-bold text-deep-blue group-hover:text-sea-600 transition-colors">{item.name}</h4>
                      <div className="flex-grow border-b border-dotted border-sand-200 mx-4 h-1"></div>
                      <span className="text-deep-blue font-bold whitespace-nowrap">{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-500 font-light italic leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mb-20 p-8 bg-sand-50 rounded-3xl border border-sand-200 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 text-sm uppercase tracking-widest font-bold text-gray-500">
          <div className="flex items-center gap-3">
            <Utensils size={18} className="text-sea-600" />
            <span>Pan: 1,30 €/ud.</span>
          </div>
          <div className="flex items-center gap-3">
            <Star size={18} className="text-sea-600" />
            <span>Precios IVA incluido</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_DATA.map((src, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg cursor-pointer"
            >
              <img 
                src={src} 
                alt={`Galería ${i}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                referrerPolicy="no-referrer" 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const [current, setCurrent] = useState(0);
  const totalSlides = Math.ceil(REVIEWS.length / 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 10000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const next = () => setCurrent((prev) => (prev + 1) % totalSlides);
  const prev = () => setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <section id="resenas" className="py-24 px-6 bg-deep-blue text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-sea-700 font-bold uppercase tracking-widest text-sm">Experiencias</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">Lo que dicen de nosotros</h2>
          </div>
          <div className="flex gap-4">
            <button onClick={prev} className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
              <ChevronLeft />
            </button>
            <button onClick={next} className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {REVIEWS.slice(current * 3, current * 3 + 3).map((review, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 flex flex-col h-full">
                  <div className="flex gap-1 text-yellow-400 mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-lg italic font-light mb-8 flex-grow">"{review.text}"</p>
                  <div>
                    <p className="font-bold">{review.author}</p>
                    <p className="text-xs text-white/50 uppercase tracking-widest">{review.date}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-16">
          <a 
            href="https://www.google.es/maps/place/Restaurante+El+Indio+Terraza+Club/@43.5475681,-5.6034087,17z/data=!3m1!4b1!4m6!3m5!1s0xd367a518c60dc13:0x3c510788a29bfb8a!8m2!3d43.5475643!4d-5.5985378!16s%2Fg%2F11ckr545vf?hl=es&entry=ttu&g_ep=EgoyMDI2MDMwNS4wIKXMDSoASAFQAw%3D%3D" 
            target="_blank"
            className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-deep-blue rounded-full font-bold text-sm uppercase tracking-widest hover:bg-sand-100 transition-colors"
          >
            <ExternalLink size={18} /> Dejar reseña en Google
          </a>
          <a 
            href="https://www.tripadvisor.co/UserReviewEdit-g187451-d10512534-El_Indio_Terraza_Club-Gijon_Asturias.html" 
            target="_blank"
            className="flex items-center justify-center gap-2 px-8 py-3 border border-white/30 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            <MessageSquare size={18} /> Dejar reseña en TripAdvisor
          </a>
        </div>
      </div>
    </section>
  );
};

const Visit = () => {
  const schedule = [
    { day: "Lunes", hours: "Cerrado" },
    { day: "Martes", hours: "Cerrado" },
    { day: "Miércoles", hours: "13:00 – 19:00" },
    { day: "Jueves", hours: "13:00 – 19:00" },
    { day: "Viernes", hours: "13:00 – 20:00" },
    { day: "Sábado", hours: "13:00 – 20:00" },
    { day: "Domingo", hours: "13:00 – 19:00" },
  ];

  return (
    <section id="visitanos" className="py-24 px-6 bg-sand-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-sea-600 font-bold uppercase tracking-widest text-sm">Ubicación</span>
            <h2 className="font-display text-4xl md:text-5xl text-deep-blue font-bold mt-4 mb-12">Ven a vernos</h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-sea-600 shadow-sm shrink-0">
                  <MapPin />
                </div>
                <div>
                  <h4 className="font-bold text-deep-blue uppercase tracking-widest text-xs mb-1">Dirección</h4>
                  <p className="text-gray-600">Cam. de la Playa de Estaño, Periurbano - Rural, 33203 Gijón, Asturias</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-sea-600 shadow-sm shrink-0">
                  <Phone />
                </div>
                <div>
                  <h4 className="font-bold text-deep-blue uppercase tracking-widest text-xs mb-1">Teléfono</h4>
                  <p className="text-gray-600">984 09 83 01</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-sea-600 shadow-sm shrink-0">
                  <Clock />
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-deep-blue uppercase tracking-widest text-xs mb-4">Horario</h4>
                  <div className="grid grid-cols-2 gap-y-2">
                    {schedule.map((item, i) => (
                      <React.Fragment key={i}>
                        <span className={cn("text-sm", item.hours === "Cerrado" ? "text-gray-400" : "text-gray-600 font-medium")}>{item.day}</span>
                        <span className={cn("text-sm text-right", item.hours === "Cerrado" ? "text-gray-400" : "text-gray-600")}>{item.hours}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <a 
              href="https://www.google.es/maps/place/Restaurante+El+Indio+Terraza+Club/@43.5475681,-5.6034087,17z/data=!3m1!4b1!4m6!3m5!1s0xd367a518c60dc13:0x3c510788a29bfb8a!8m2!3d43.5475643!4d-5.5985378!16s%2Fg%2F11ckr545vf?hl=es&entry=ttu&g_ep=EgoyMDI2MDMwNS4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank"
              className="mt-12 inline-flex items-center gap-2 text-sea-600 font-bold uppercase tracking-widest text-sm hover:translate-x-2 transition-transform"
            >
              Ver en Google Maps <ChevronRight size={18} />
            </a>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px] lg:h-auto min-h-[400px] border-8 border-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d2890.7671850130!2d-5.6011127!3d43.5475682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd367a518c60dc13%3A0x3c510788a29bfb8a!2sRestaurante%20El%20Indio%20Terraza%20Club!5e0!3m2!1ses!2ses!4v1710000000000!5m2!1ses!2ses" 
              className="w-full h-full border-0"
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Reservation = () => {
  return (
    <section id="reserva" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-sand-50 rounded-[3rem] p-8 md:p-16 shadow-xl border border-sand-200 text-center">
          <div className="mb-12">
            <div className="w-20 h-20 bg-sea-100 text-sea-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone size={40} />
            </div>
            <h2 className="font-display text-4xl text-deep-blue font-bold mb-4">Reserva tu mesa</h2>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              Para garantizar tu lugar frente al mar, las reservas se realizan exclusivamente por teléfono.
            </p>
          </div>

          <div className="space-y-6">
            <a 
              href="tel:984098301" 
              className="inline-flex items-center gap-4 px-12 py-6 bg-deep-blue text-white rounded-2xl font-bold text-2xl tracking-widest hover:bg-sea-600 transition-all shadow-xl group"
            >
              <Phone className="group-hover:animate-bounce" /> 984 09 83 01
            </a>
            <p className="text-sm text-gray-400 uppercase tracking-widest">
              Confirmación inmediata por llamada
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-sand-50 pt-24 pb-12 px-6 border-t border-sand-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="font-display text-3xl text-deep-blue font-bold mb-6">EL INDIO</h2>
            <p className="text-gray-500 max-w-sm mb-8">
              Sabores del Cantábrico frente al mar. El lugar donde la gastronomía asturiana se encuentra con el mejor ambiente de playa.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/p/El-INDIO-Terraza-Club-100058155648683/?locale=es_LA" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-deep-blue shadow-sm hover:bg-sea-600 hover:text-white transition-all"><Facebook size={20} /></a>
              <a href="https://www.instagram.com/elindioterrazaclub/?hl=es" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-deep-blue shadow-sm hover:bg-sea-600 hover:text-white transition-all"><Instagram size={20} /></a>
              <a href="https://www.tiktok.com/@indio_terraza_club" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-deep-blue shadow-sm hover:bg-sea-600 hover:text-white transition-all">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-deep-blue uppercase tracking-widest text-xs mb-6">Contacto</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="flex items-center gap-2"><Phone size={14} /> 984 09 83 01</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> Playa de Estaño, Gijón</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-deep-blue uppercase tracking-widest text-xs mb-6">Legal</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-sea-600 transition-colors">Aviso de Privacidad</a></li>
              <li><a href="#" className="hover:text-sea-600 transition-colors">Política de Cookies</a></li>
              <li><a href="#" className="hover:text-sea-600 transition-colors">Términos de Uso</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-sand-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            © {new Date().getFullYear()} El Indio Terraza Club. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            Diseñado con pasión en Asturias
          </p>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/34644363438"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#128C7E] transition-colors"
      aria-label="Contactar por WhatsApp"
    >
      <svg 
        viewBox="0 0 24 24" 
        width="32" 
        height="32" 
        fill="currentColor"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </motion.a>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen font-sans text-deep-blue selection:bg-sea-600 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <MenuSection />
        <Reviews />
        <Visit />
        <Reservation />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
