import { useState, useEffect } from "react";
import { 
  LayoutGrid, 
  ArrowUpRight, 
  X, 
  Instagram, 
  Linkedin, 
  Dribbble,
  Menu,
  Phone,
  Mail
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Project data structure
interface Project {
  id: number;
  category: string;
  year: string;
  title: string;
  image: string;
  description: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    category: "ARCHITECTURE",
    year: "2026",
    title: "Han River Marathon Poster",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXnjgv1_dXBZd1kcmKv_uAjMvVYtIJ4r2RXbslv8yVrnaTq4ddK82Yc_D1aHco-GEZZx3aypXesBo9T7VIy8cri8gNb1i8mfYe0ET7MuQTHwJ69Qx2Dz0cNvBNONCWNF3JGa4mVpKMzhbJctcUMH051ZP_81m0lwZLx7BUcoSwWlsoRDU58WLKOFq-y_o-GrE82yJhKQIuLAm0vcE88kNloGUygoVxAE3A77cBfAO6QKiUU930ZuCVeqZSzQJEQJSRnFFjPXQ85hec",
    description: "A striking minimalist architectural photograph of a stark white concrete building."
  },
  {
    id: 2,
    category: "INDUSTRIAL DESIGN",
    year: "2023",
    title: "Wedding Card",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpqI4xAOXwOlga1P51UCjmWtNP7_Q3A-X9SOL45bY6vR6s8aVZsKQmFQZI3GdHHSdzwL4MGnalRvTig1PvxL8f3yCu_1iij_EgtFeSyS7jDYq8_wXIM3PEJc12H-72KDDa5a2VSWK2NpdMbNcILg48fI-jiP3Eqf17-4wYeQ65D7sPmprc1tjNKEuGHsDxliM--3ZEyH5LMEbEYKvkGFJQCrlPX5qLEB64AMwniKju3KaAva9ZESYVsl5joyjFwHfqZNa7Ua5YpQOa",
    description: "A close-up of a high-end designer lighting fixture in a minimalist gallery setting."
  },
  {
    id: 3,
    category: "BRANDING",
    year: "2023",
    title: "Isometric work",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeZv5VgX0dsHqzieNyBporGltB4iXy6SE5hK86l3k6N--qG1T5uOChl6H-6K2FMxt6YEplKWG62kqepF1SFjapXCBgageT3oH2ha-NhqIAXYJHMrpiUxGUwZT3F0vgcmw6Nh5VATa91oGv4KN5F_0Cmg4B2II5Q0T9i6UjEAFKuYWlqrEjDpLcqJt_HUl724U3zvU7bV4xLvcQAm50fwFDeVb2-ffjq89jRBPYB6q-mFcR18kr_Ycqjd8-9JdMMRzPWhlZXnQKPM5E",
    description: "A collection of premium minimalist stationery items arranged in an asymmetric bento-style layout."
  },
  {
    id: 4,
    category: "DIGITAL",
    year: "2024",
    title: "Hanyul Website Creation",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAupr0YICKLr945f_T577eYZaF_sjsdLUwdymXCuhSNqmM0a86y1vh0MQv5_u00tG7mvcWPqkwwYSHf5H7v-h98Q3ZuUyuNYHbz3-Mt8SYPBR3QRfJPrych4emU6zQOqcPe1GPAoaItmh7EGiNZ-cSka7XNj18ipVLdzZk_7pYBYlv0vnrWAe5CJZwpXuglvIGnwsl2s_N_NEDEVy_Y99R2yyaMYE3y86QAwgpQRgp2-XRHxhRJpVPT077w0QWY_669WtnpseM1ab_9",
    description: "A clean, minimalist digital interface displayed on a high-resolution laptop screen."
  },
  {
    id: 5,
    category: "INTERIOR",
    year: "2024",
    title: "Croissant Cafe Logo",
    image: "https://lh3.googleusercontent.com/aida/ADBb0uhrMHY70L0F-Lr5aWgI00tUf83hOYY86FkF8wH86X55PL8T5MstdmB9hJm7WAW7HPaQk_q5xsSUaEHzULIBx6RWtIHERb5iCMlFuXSVmZIEYDX3uVZrmYtXIZ_-g08yD8Hlo9CXxnIOyXAUOveDZjaiptO0al3trTZrAcOy0pK22Hgy_mSVCI1wChmsTmyTrVDZAmQDEbV3DuT6r2jgvcD_vitqDtyPQbsrgLIh8owMfjfmASfFFd7EQdRRtSWZ8LCU5BBnte0F",
    description: "A serene, high-key interior space featuring raw concrete walls and a single designer chair."
  },
  {
    id: 6,
    category: "ARCHITECTURE",
    year: "2023",
    title: "Leaflet work",
    image: "https://lh3.googleusercontent.com/aida/ADBb0uh-ibwdAN6qTQkHAuQNKbAhZ8S-HysEGFQq1fZLxrCL-jfdKBqt5tlJNXnb8BQI0a6TKa0IN0X2LPPfFNmzCYgkVlGP-Oei2HmxbYqorw1-AlUGN8E0NnFSxmXNkCxd1gWqR9tAutkMT8ah3HoyJrMljbiuEKfLOUONt4ECfk-nQjUQ1x1lW6S42nu4qfmnc_ynEmyikL8-ygZt-1X5-GAvM6lu1kB1ku2L-VOidcM7P18AG5XU2jc8wKhhwJxplNq0E0Vm6-nO",
    description: "A detailed layout of a Changdeokgung Palace Moonlight Tour brochure."
  },
  {
    id: 7,
    category: "BRANDING",
    year: "2024",
    title: "Business Card",
    image: "https://lh3.googleusercontent.com/aida/ADBb0ugKyFRFB1c2NR2D-6Z8dv0fbi7L76fkBv8epKdXmhh5W7OgIWSjieDW4ifPtlthry4an-31p38mO7YfDu8B7hXRBSMmaRxXyjb_Wz6qWYo_MfeBk7eYp6zlIOgkPR9P7d25271wFWpZXkO4yhGlgFIQqGGFtkvS-f0lBQn2HNcv31pbO3nr9eGpa4FkZpWnkgO9ONeJwq89SFt1yWgWgUbTPmWTnXhd2ZB9NY4oOl_6NGH8jr3IEakx09JAPjnKoO9rXz1SGjI",
    description: "A set of luxury brand guidelines presented on high-quality paper."
  },
  {
    id: 8,
    category: "DIGITAL",
    year: "2023",
    title: "Pixel Art",
    image: "https://lh3.googleusercontent.com/aida/ADBb0ugv2MttYHFIcTB8LJpdovBy083z5YMs5vmjwYmnVSQIA1gJ96aLtpP7TjucWz7URteMGwYKZzhmFj_toF8lM2aGRg4Iy7xR7aIwaLsnnisV0S_vq9ShbDnnW_I-gRGrM1908WF9UWPZTrdj9iIxxYvRgqN097i6d7ky3Z7oqKWqH0d1cvUiMdCvjtOZ_JOaZfjBejbmCYzP1kekdp9dB91XKdi4vIpY6vLOQvAd4i48CxshUfRkozMQCVvbYI_Lq-21MZr6-Eo",
    description: "A detail shot of a clean mobile application interface on a high-end smartphone."
  },
  {
    id: 9,
    category: "ART",
    year: "2024",
    title: "Illustration work",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhr_N_LggmwCUnMuDc9HzWEf0FODAcJ0BSl9jsikJbGcEBexF0MBJzkSNArjVB9QHMrDJ2Dj5xE494IX5IgUG54PN__U-foylB11utGSqVHdCeFmewBwyZ5Utn5GhmTkKHXAlvOF89a5arRmS6W69Nmn3FPI6zW-NGhg62go4E0yHorxhTyLMh_Wc82PrCcCUosEDxiTN7Ye4s36cVaMZ8d5ag5kSw3qp-55GVHVuC18gtuQ5-juHUXBT4B2oprJyCFEZW8ZVrFgYP",
    description: "A modern abstract sculpture in a minimalist gallery."
  },
  {
    id: 10,
    category: "ARCHITECTURE",
    year: "2023",
    title: "Illustration work",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlqM_AV9DihKWwbQetZm2CoVMEhJREiUaeohCE5P7cFi_O0dzu4fSv3A6Xt1nlta2XgW2184RoFDiHl0lvSHOhwCGzr_OY1LuwYjUcnK47jymKxeotMud8MqR4teHh_2mC0K5o6sEhWXC0sqQkGgjrkyINK4W2PMbr86e1lzHAwPGNUih-CNZVuix3x5mi2yo2y-lhm86PlAjUqO9Nc-XEjiN038fKLXNukFL234UTP2s-3GwQThTf4CKXkVp6xEJeJAJPh38iJXuI",
    description: "A macro photograph of an architectural joint where metal meets stone."
  }
];

export default function App() {
  const [selectedImage, setSelectedImage] = useState<Project | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary-container selection:text-white">
      {/* Header */}
      <header className="sticky top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant">
        <div className="max-w-container-max mx-auto px-6 md:px-16 flex justify-between items-center h-24">
          <div className="flex items-center gap-4">
            <LayoutGrid className="w-6 h-6 text-primary" />
            <span className="font-display text-2xl font-bold tracking-tighter">PORTFOLIO</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-10">
            <a href="#" className="text-xs font-semibold tracking-widest text-primary border-b-2 border-primary pb-1">WORK</a>
            <a href="#" className="text-xs font-semibold tracking-widest text-on-surface-variant hover:text-primary transition-colors">STUDIO</a>
            <a href="#" className="text-xs font-semibold tracking-widest text-on-surface-variant hover:text-primary transition-colors">CONTACT</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="bg-primary text-on-primary px-6 py-3 text-xs font-semibold tracking-widest rounded-sm hover:opacity-90 active:scale-95 transition-all">
              HIRE ME
            </button>
            <button className="md:hidden p-2 text-on-surface">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-container-max mx-auto px-6 md:px-16 w-full">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-display text-6xl md:text-8xl font-bold mb-8 leading-[0.9] tracking-tighter"
            >
              SELECTED<br />WORK
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-on-surface-variant max-w-2xl leading-relaxed italic"
            >
              It is an archive of visual storytelling created with precision and calm confidence.
            </motion.p>
          </div>
        </section>

        {/* Project Grid */}
        <section className="pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: (index % 2) * 0.2 }}
                className={`flex flex-col group cursor-crosshair ${index % 2 !== 0 ? "md:mt-32" : ""}`}
                onClick={() => setSelectedImage(project)}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-low mb-8 border border-transparent group-hover:border-outline-variant transition-all duration-500 rounded-sm">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src={project.image} 
                    alt={project.title}
                    className="project-image w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="flex justify-between items-start pr-2">
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-primary mb-3 block">
                      {project.category} / {project.year}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold leading-tight group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5 transition-all duration-300 transform group-hover:rotate-12 translate-y-1">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 border-t border-outline-variant">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
            <h2 className="font-display text-5xl md:text-7xl font-bold max-w-2xl leading-[0.9] tracking-tighter">
              READY TO START A NEW CHAPTER?
            </h2>
            <button className="bg-primary text-on-primary px-12 py-6 text-xs font-bold tracking-[0.3em] rounded-sm hover:scale-[1.05] active:scale-95 transition-all shadow-2xl shadow-primary/20">
              LET'S CONNECT
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full pt-32 pb-12 bg-surface-container-low border-t border-outline-variant mt-32">
        <div className="max-w-container-max mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-32">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-8">
                <LayoutGrid className="w-6 h-6 text-primary" />
                <span className="font-display text-2xl font-bold tracking-tighter">PORTFOLIO</span>
              </div>
              <p className="text-lg text-on-surface-variant leading-relaxed mb-12 max-w-sm opacity-80">
                Curating professional achievements through an architectural lens of minimalism and precision.
              </p>
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 font-bold">
                  © 2024 QUIET CONFIDENCE.
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/40">
                  ALL RIGHTS RESERVED.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 md:col-span-4 self-center">
              <div className="space-y-6">
                <h4 className="text-[10px] font-bold tracking-[0.3em] text-primary">NAVIGATE</h4>
                <nav className="flex flex-col space-y-4">
                  <a href="#" className="text-sm font-semibold hover:text-primary transition-colors underline decoration-transparent hover:decoration-primary underline-offset-4">WORK</a>
                  <a href="#" className="text-sm font-semibold hover:text-primary transition-colors underline decoration-transparent hover:decoration-primary underline-offset-4">STUDIO</a>
                  <a href="#" className="text-sm font-semibold hover:text-primary transition-colors underline decoration-transparent hover:decoration-primary underline-offset-4">CONTACT</a>
                </nav>
              </div>
              <div className="space-y-6">
                <h4 className="text-[10px] font-bold tracking-[0.3em] text-primary">CONTACT</h4>
                <div className="space-y-6">
                  <p className="text-sm font-medium flex items-center gap-3 group whitespace-nowrap cursor-pointer">
                    <span className="p-2 bg-on-surface/5 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors"><Phone className="w-4 h-4" /></span>
                    010-4852-0045
                  </p>
                  <p className="text-sm font-medium flex items-center gap-3 group whitespace-nowrap cursor-pointer">
                    <span className="p-2 bg-on-surface/5 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors"><Mail className="w-4 h-4" /></span>
                    kkwak524@naver.com
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 space-y-8 self-center">
              <h4 className="text-[10px] font-bold tracking-[0.3em] text-primary">FOLLOW SOCIAL</h4>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 flex items-center justify-center border border-outline-variant rounded-full hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 flex items-center justify-center border border-outline-variant rounded-full hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 flex items-center justify-center border border-outline-variant rounded-full hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
                  <Dribbble className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-8 right-8 text-white p-3 hover:text-primary transition-all z-[110] bg-white/5 rounded-full backdrop-blur-md"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="w-8 h-8" />
            </motion.button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-7xl w-full flex flex-col md:flex-row gap-12 items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative group/lightbox flex-grow flex justify-center">
                <img 
                  src={selectedImage.image} 
                  alt={selectedImage.title}
                  className="max-w-full max-h-[60vh] md:max-h-[80vh] object-contain shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 rounded-sm"
                />
              </div>
              
              <div className="flex flex-col text-white max-w-sm shrink-0">
                <span className="text-[10px] font-bold tracking-[0.3em] text-primary mb-4 block underline underline-offset-8">
                  {selectedImage.category} / {selectedImage.year}
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight tracking-tighter">
                  {selectedImage.title}
                </h2>
                <div className="space-y-6 opacity-80">
                  <p className="text-lg leading-relaxed font-medium">
                    {selectedImage.description}
                  </p>
                  <div className="h-px w-12 bg-primary" />
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    A curated archive documenting visual narratives through an architectural perspective. Each frame captures the intersection of geometry and emotion.
                  </p>
                </div>
                
                <div className="mt-12 flex flex-col gap-4">
                  <button className="bg-white text-black px-10 py-5 text-xs font-bold tracking-widest rounded-sm hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
                    VIEW CASE STUDY
                  </button>
                  <button className="border border-white/20 text-white px-10 py-5 text-xs font-bold tracking-widest rounded-sm hover:border-white transition-all">
                    BACK TO EXPLORE
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
