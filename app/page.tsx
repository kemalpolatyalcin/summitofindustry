"use client";
import { useState, useEffect, useRef } from "react";

const GOOGLE_FORM_URL = "https://forms.gle/jH2SshGwfTzvdT3DA";
const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=Rauf+Raif+Denktas+Culture+and+Congress+Center+Famagusta";
const EVENT_DATE = new Date(2026, 3, 4, 10, 0, 0);
const TEAMS_LINK = "https://teams.microsoft.com/l/channel/19%3AtNQV9hCOWfB5Ws1fuPoQictuElOwoSnbqrupt7gwbec1%40thread.tacv2/General?groupId=46d64fbe-c9fd-4d1b-98e9-c23bd651453c&tenantId=9696b0a8-9e29-43ab-9fe5-b03aa9431d88";

const SOCIAL_LINKS = { instagram: "https://www.instagram.com/emuieclub", linkedin: "https://www.linkedin.com/company/emu-ie-club" };
const YOUTUBE_LINKS = { dauTv: "https://youtube.com/@dautvradyodau?si=KbHPYi_znRE8Mcc3", dauMain: "https://youtube.com/@eastmeduniv?si=ln2bTj-4gDn9tZ4J" };
const AUDIO_PATHS = { ambient: "/audio/ambient.mp3" };

const QA_DATABASE = {
  tr: [
    { keywords: ["nerede", "konum", "yer", "lokasyon", "harita", "ulaşım", "ring", "otobüs"], answer: "Zirve, DAÜ Rauf Raif Denktaş Kültür ve Kongre Sarayı'nda yapılacak. Etkinlik boyunca kampüs içi ulaşım/ring sağlanacaktır." },
    { keywords: ["ne zaman", "saat", "takvim", "gün", "tarih", "kaçta"], answer: "4 Nisan 2026. Saat 10:00'da başlıyoruz ve 18:00'de kapanış yapacağız." },
    { keywords: ["ücret", "bilet", "fiyat", "para", "kaç tl", "paralı mı"], answer: "Zirvemize katılım tamamen ÜCRETSİZDİR." },
    { keywords: ["sertifika", "belge", "staj", "çekiliş", "ödül"], answer: "Zirvemizde katılım sertifikası, staj fırsatları, çekilişler ve sürpriz ödüller seni bekliyor!" },
    { keywords: ["çeviri", "ingilizce", "türkçe", "dil", "kulaklık", "teams"], answer: "İngilizceye çeviri Microsoft Teams üzerinden yapılacaktır. Telefonunuzu ve kulaklığınızı getirmeyi unutmayın!" },
    { keywords: ["networking", "iletişim", "tanışma", "ağ", "fırsat"], answer: "Evet! Fuaye alanında ve aralarda sektör profesyonelleriyle birebir networking yapma fırsatınız olacak." },
    { keywords: ["kayıt", "nasıl", "başvuru", "link"], answer: "Sağ üstteki 'Kayıt Ol' butonuna tıklayarak Google Form üzerinden kaydını hızlıca yapabilirsin." }
  ],
  en: [
    { keywords: ["where", "location", "place", "venue", "map", "transport"], answer: "The Summit is at EMU Rauf Raif Denktas Congress Center. Campus shuttles will be provided all day." },
    { keywords: ["when", "time", "date", "schedule", "clock"], answer: "April 4, 2026. We start at 10:00 AM and close at 18:00." },
    { keywords: ["price", "ticket", "cost", "free", "fee"], answer: "Participation in our summit is 100% FREE." },
    { keywords: ["certificate", "internship", "giveaway", "prize"], answer: "Certificates of participation, internship opportunities, giveaways, and surprise awards await you!" },
    { keywords: ["translation", "english", "turkish", "language", "headphones", "teams"], answer: "English translation will be provided via MS Teams. Please bring your smartphone and headphones!" },
    { keywords: ["networking", "meet", "connect", "opportunity"], answer: "Yes! There will be plenty of networking opportunities with industry professionals during the breaks in the foyer area." },
    { keywords: ["register", "sign up", "join", "link"], answer: "Click the 'Register' button or use the Google Form link to sign up." }
  ]
};

const TRANSLATIONS = {
  tr: {
    nav: { home: "Ana Sayfa", about: "Hakkımızda", speakers: "Konuşmacılar", schedule: "Program", location: "Konum", faq: "SSS", join: "Zirveye Katıl" },
    hero: { btn_reg: "KAYIT OL", timer_labels: { d: "GÜN", h: "SAAT", m: "DK", s: "SN" }, timer_live: "ZİRVE BAŞLADI", timer_pre: "BAŞLANGICA KALAN" },
    about: { p1: "Endüstri Zirvesi’26, Doğu Akdeniz Üniversitesi Öğrenci Gelişim, Etkinlikler ve Spor İşleri Müdürlüğü ile Endüstri Mühendisliği Kulübü organizasyonunda; sektörün önde gelen profesyonellerini, akademisyenleri ve öğrencileri bir araya getirmeyi amaçlayan kapsamlı bir buluşmadır. Kuzey Kıbrıs Türk Cumhuriyeti’nde ilk kez düzenlenen bu zirve, endüstriyel süreçler, yönetim ve teknoloji alanlarında güncel gelişmelerin paylaşılacağı önemli bir platform sunmaktadır.", p2: "04 Nisan 2026 tarihinde, Rauf Raif Denktaş Kültür ve Kongre Sarayı’nda gerçekleştirilecek olan etkinlik; ilham verici konuşmalar, deneyim paylaşımları ve etkileşimli oturumlarla katılımcılara değerli bir perspektif kazandırmayı hedeflemektedir. Alanında uzman üst düzey yöneticilerin yer alacağı zirvede, katılımcılar sektörün dinamiklerini yakından tanıma ve profesyonellerle doğrudan iletişim kurma fırsatı bulacaktır.", p3: "Gün boyu sürecek program kapsamında, fuaye alanında kurulacak insan kaynakları ve tanıtım stantları sayesinde katılımcılar firmalarla birebir etkileşim kurabilecek; kariyer fırsatları hakkında bilgi edinme imkânı elde edecektir. Ayrıca etkinliğe katılan tüm katılımcılara katılım sertifikası verilecektir.", p4: "Endüstri Zirvesi’26, öğrencilerin kariyer yolculuklarına yön vermeyi, akademik ve sektörel iş birliklerini güçlendirmeyi ve katılımcılara ilham veren bir deneyim sunmayı hedeflemektedir." },
    translation: { title: "🎧 ANLIK ÇEVİRİ", desc: "İngilizceye çeviri Microsoft Teams üzerinden yapılacaktır. Lütfen cep telefonlarınızı ve kulaklıklarınızı yanınızda getirmeyi unutmayın.", btn: "TEAMS ÜZERİNDEN DİNLE" },
    liveStream: { title: "CANLI YAYIN", desc: "Fiziksel olarak katılamıyorsanız, tüm oturumları DAÜ TV üzerinden anlık olarak yüksek kalitede takip edebilirsiniz.", btn1: "DAÜ TV CANLI", btn2: "YOUTUBE YAYINI" },
    sections: { about: "Zirve Hakkında", speakers: "Ana Konuşmacılar", panel: "KKTC Paneli", schedule: "Program Akışı", location: "Konum", faq: "Sıkça Sorulan Sorular", view_profile: "PROFİLİ İNCELE", linkedin_btn: "LINKEDIN PROFİLİ ↗" },
    location_pin: { name: "RAUF RAİF DENKTAŞ", sub: "KÜLTÜR VE KONGRE SARAYI" },
    intro: { btn: "SİSTEMİ BAŞLAT", loading: "SES & VERİ MODÜLLERİ YÜKLENİYOR..." },
    chat: { title: "EMU AI ASİSTAN", placeholder: "Bir soru sorun...", send: "GÖNDER", thinking: "Yazıyor...", welcome: "Merhaba! Ben EMU-AI. Zirve detayları, çeviri durumu veya staj fırsatları hakkında ne bilmek istersiniz?", fallback: "Bunu tam anlayamadım. Lütfen 'Çeviri nasıl olacak?', 'Staj var mı?' gibi sorabilir misin?" },
    faq_items: [
      { q: "Zirveye kimler katılabilir?", a: "Zirvemiz üniversite öğrencileri, yeni mezunlar ve kariyerine yön vermek isteyen sektör profesyonelleri başta olmak üzere herkese açıktır." },
      { q: "Zirvede networking imkanı olacak mı?", a: "Kesinlikle! Öğle aralarında ve kahve molalarında sektör profesyonelleri ve diğer katılımcılarla birebir tanışma fırsatı bulacaksınız." },
      { q: "İngilizce çeviri nasıl yapılacak?", a: "Çeviri MS Teams üzerinden canlı yapılacaktır. Etkinlik alanındaki QR kodu okutarak bağlanabilirsiniz. Kendi telefonunuzu ve kulaklığınızı getirmeyi unutmayın." },
      { q: "Etkinlik sertifikalı mı?", a: "Evet, etkinlik sonuna kadar kalan tüm katılımcılara katılım sertifikası verilecektir." },
      { q: "Staj ve ödül imkanları neler?", a: "Zirve boyunca katılımcı şirketlerin staj programları hakkında bilgi alabilecek, çekilişlerle sürpriz ödüller kazanma şansı yakalayacaksınız." }
    ],
    sponsor_types: { comm: "İLETİŞİM SPONSORU", accom: "KONAKLAMA SPONSORU", official: "RESMİ SPONSOR", stage: "SES, IŞIK & SAHNE SPONSORU" }
  },
  en: {
    nav: { home: "Home", about: "About", speakers: "Speakers", schedule: "Agenda", location: "Location", faq: "FAQ", join: "Join Summit" },
    hero: { btn_reg: "REGISTER NOW", timer_labels: { d: "DAY", h: "HR", m: "MIN", s: "SEC" }, timer_live: "SUMMIT LIVE", timer_pre: "MISSION START" },
    about: { p1: "Industry Summit '26, organized by the Eastern Mediterranean University Student Development, Activities and Sports Affairs Directorate and the Industrial Engineering Club, is a comprehensive gathering aiming to bring together leading industry professionals, academics, and students. Organized for the first time in the Turkish Republic of Northern Cyprus, this summit offers an important platform to share current developments in industrial processes, management, and technology.", p2: "Taking place on April 04, 2026, at the Rauf Raif Denktas Culture and Congress Center, the event aims to provide participants with a valuable perspective through inspiring speeches, experience sharing, and interactive sessions. Featuring high-level executives who are experts in their fields, participants will have the opportunity to get to know industry dynamics closely and communicate directly with professionals.", p3: "Within the all-day program, thanks to the human resources and promotional booths set up in the foyer area, participants will be able to interact one-on-one with companies and gain information about career opportunities. In addition, all attendees will receive a certificate of participation.", p4: "Industry Summit '26 aims to guide students' career journeys, strengthen academic and sectoral collaborations, and offer an inspiring experience to participants." },
    translation: { title: "🎧 LIVE TRANSLATION", desc: "English translation will be provided via Microsoft Teams. Please remember to bring your smartphones and personal headphones.", btn: "LISTEN VIA TEAMS" },
    liveStream: { title: "LIVE STREAM", desc: "If you cannot attend physically, you can follow all sessions live in high quality on EMU TV.", btn1: "EMU TV LIVE", btn2: "YOUTUBE STREAM" },
    sections: { about: "About The Summit", speakers: "Keynote Speakers", panel: "TRNC Panel", schedule: "Program Agenda", location: "Location", faq: "FAQ", view_profile: "VIEW PROFILE", linkedin_btn: "LINKEDIN PROFILE ↗" },
    location_pin: { name: "RAUF RAIF DENKTAS", sub: "CULTURE & CONGRESS CENTER" },
    intro: { btn: "INITIALIZE SYSTEM", loading: "LOADING AUDIO & DATA MODULES..." },
    chat: { title: "EMU AI ASSISTANT", placeholder: "Ask a question...", send: "SEND", thinking: "Typing...", welcome: "Hello! I'm EMU-AI. Ask me about the venue, networking, or internships.", fallback: "I didn't catch that. Try asking 'Who can attend?', 'Are there internships?'" },
    faq_items: [
      { q: "Who can attend the summit?", a: "Our summit is open to everyone, especially university students, recent graduates, and industry professionals looking to shape their careers." },
      { q: "Will there be networking opportunities?", a: "Absolutely! You will have the chance to meet and connect with industry professionals and peers during breaks." },
      { q: "How will the English translation work?", a: "Translation will be live via MS Teams. Please remember to bring your own smartphone and headphones." },
      { q: "Is the event certified?", a: "Yes, all attendees who complete the event will receive a certificate of participation." },
      { q: "What about internships and prizes?", a: "You will have the chance to learn about internship programs and win surprise awards through giveaways." }
    ],
    sponsor_types: { comm: "COMMUNICATION SPONSOR", accom: "ACCOMMODATION SPONSOR", official: "OFFICIAL SPONSOR", stage: "SOUND, LIGHT & STAGE SPONSOR" }
  }
};

const SCHEDULE_DATA = [
  { time: "10:00 - 10:30", type: "event", tr: { title: "Açılış Konuşmaları", desc: "Zehra Elçin Erden, Prof. Dr. Sonuç Zorlu, Prof. Dr. Hasan Kılıç, Protokol" }, en: { title: "Opening Speeches", desc: "Zehra Elçin Erden, Prof. Dr. Sonuç Zorlu, Prof. Dr. Hasan Kılıç, Protocol" } },
  { time: "10:30 - 11:15", type: "speaker", tr: { title: "Mert Karaibrahimoğlu", desc: "CEO @ Penti Giyim A.Ş." }, en: { title: "Mert Karaibrahimoğlu", desc: "CEO @ Penti Clothing Inc." } },
  { time: "11:15 - 11:30", type: "break", tr: { title: "Kahve Arası", desc: "Fuaye Alanı" }, en: { title: "Coffee Break", desc: "Foyer Area" } },
  { time: "11:30 - 12:15", type: "speaker", tr: { title: "Ahmet Öztürk", desc: "CAE @ Coca Cola İçecek" }, en: { title: "Ahmet Öztürk", desc: "CAE @ Coca Cola İçecek (CCI) - \"Audit Perspective at Coca Cola İçecek\"" } },
  { time: "12:15 - 13:00", type: "speaker", tr: { title: "Hana Jalel Milesi", desc: "İcra Kurulu Başkan Yardımcısı @ Vodafone Türkiye" }, en: { title: "Hana Jalel Milesi", desc: "Vice Chair of Executive Board/CFO @ Vodafone Türkiye" } },
  { time: "13:00 - 14:00", type: "break", tr: { title: "Öğle Arası", desc: "Yemek ve Networking" }, en: { title: "Lunch Break", desc: "Lunch & Networking" } },
  { time: "14:00 - 14:45", type: "speaker", tr: { title: "Değer Demircan Acılıoğlu", desc: "Tasarım Merkezi Direktörü @ Şişecam - \"Tasarımda Yol Boyunca\"" }, en: { title: "Değer Demircan Acılıoğlu", desc: "R&D Center Director @ Şişecam - \"A Journey Through Design\"" } },
  { time: "14:45 - 15:00", type: "event", tr: { title: "Çekiliş", desc: "Sürpriz Ödüller" }, en: { title: "Raffle", desc: "Surprise Awards" } },
  { time: "15:00 - 15:45", type: "speaker", tr: { title: "Yelda Domaç Atilla", desc: "CFO @ Multinet Up" }, en: { title: "Yelda Domaç Atilla", desc: "CFO @ Multinet Up" } },
  { time: "15:45 - 16:00", type: "break", tr: { title: "Kahve Arası", desc: "Fuaye Alanı" }, en: { title: "Coffee Break", desc: "Foyer Area" } },
  { time: "16:00 - 16:45", type: "speaker", tr: { title: "Fidan Ahmet", desc: "Kariyer Koçu @ Foreverbest LLC - \"Yapay zeka çağında kariyer planı\"" }, en: { title: "Fidan Ahmet", desc: "Career Coach @ Foreverbest LLC - \"Career Planning in the Age of Artificial Intelligence\"" } },
  { time: "16:45 - 17:00", type: "event", tr: { title: "Çekiliş", desc: "Sürpriz Ödüller" }, en: { title: "Raffle", desc: "Surprise Awards" } },
  { time: "17:00 - 18:00", type: "panel", tr: { title: "KKTC'de Üretim ve Yönetim Paneli", desc: "Moderatör: Çiğdem Duvarcı\nPanelistler: Yaprak Özyalçın, Elif Leman Onan, Defne Dağlı, Ergün Oza" }, en: { title: "Production and Management in the TRNC: A Panel Discussion", desc: "Moderator: Çiğdem Duvarcı\nPanelists: Yaprak Özyalçın, Elif Leman Onan, Defne Dağlı, Ergün Oza" } },
  { time: "18:00", type: "event", tr: { title: "Kapanış", desc: "Zirve Sonu" }, en: { title: "Closing Session", desc: "End of Summit" } }
];

const GlobalStyles = () => (
  <style jsx global>{`
    html, body { scroll-behavior: auto !important; overflow-x: hidden; background-color: #050505; }
    .nextjs-toast-errors-parent, [data-nextjs-toast], div[class*="build-error-overlay"], nextjs-portal, #next-route-announcer, [data-nextjs-dialog-overlay], [class*="ReactDevOverlay"], [id="__next-build-watcher"] { display: none !important; opacity: 0 !important; pointer-events: none !important; width: 0 !important; height: 0 !important; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #050505; }
    ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #00A3FF; }
    ::selection { background: #00A3FF; color: white; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulseSoft { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
    @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
    .fade-in { animation: fadeIn 0.8s ease-out forwards; }
    .slide-up { animation: slideUp 0.6s ease-out forwards; }
    .pulse-soft { animation: pulseSoft 2s infinite ease-in-out; }
    .animate-marquee { display: flex; width: max-content; animation: marquee 30s linear infinite; }
    .animate-marquee:hover { animation-play-state: paused; }
  `}</style>
);

const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!barRef.current) return;
          const totalScroll = document.documentElement.scrollTop;
          const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scroll = totalScroll / windowHeight;
          barRef.current.style.transform = `scaleX(${scroll})`;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <div ref={barRef} className="fixed top-0 left-0 right-0 h-1 bg-[#00A3FF] origin-left z-[100] shadow-[0_0_15px_#00A3FF] transition-none scale-x-0 will-change-transform" />;
};

const MagneticButton = ({ children, onClick, className }: any) => {
  return <button onClick={onClick} className={`active:scale-95 transition-all duration-300 ${className}`}>{children}</button>;
};

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-5 md:py-6 flex justify-between items-center text-left hover:text-[#00A3FF] transition-colors group">
        <span className="font-semibold text-base md:text-lg text-white/90 group-hover:text-white pr-4">{question}</span>
        <span className={`text-2xl transition-transform duration-300 ${isOpen ? 'rotate-45 text-[#00A3FF]' : 'text-gray-500'}`}>+</span>
      </button>
      {isOpen && (
        <div className="overflow-hidden fade-in">
          <p className="pb-5 md:pb-6 text-gray-400 text-sm md:text-base font-normal leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

const AIChatbot = ({ isOpen, onClose, lang }: { isOpen: boolean; onClose: () => void, lang: 'tr' | 'en' }) => {
  const [messages, setMessages] = useState<{ text: string, isUser: boolean }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => { setMessages([{ text: TRANSLATIONS[lang].chat.welcome, isUser: false }]); }, [lang]);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { text: userMsg, isUser: true }]);
    setInput(""); setIsTyping(true);
    setTimeout(() => {
      let response = TRANSLATIONS[lang].chat.fallback;
      const lowerInput = userMsg.toLowerCase();
      const db = QA_DATABASE[lang];
      for (const item of db) {
        if (item.keywords.some(k => lowerInput.includes(k))) { response = item.answer; break; }
      }
      setMessages(prev => [...prev, { text: response, isUser: false }]);
      setIsTyping(false);
    }, 1200);
  };
  if (!isOpen) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 md:bottom-24 md:right-8 md:left-auto z-[90] w-full md:w-96 flex flex-col justify-end slide-up p-4 md:p-0">
      <div className="bg-black/95 border border-[#00A3FF]/50 md:backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(0,163,255,0.2)] overflow-hidden flex flex-col h-[70vh] md:max-h-[500px]">
        <div className="bg-[#00A3FF]/20 p-4 border-b border-[#00A3FF]/30 flex justify-between items-center">
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full pulse-soft"></div><span className="text-[#00A3FF] font-bold font-mono text-sm">{TRANSLATIONS[lang].chat.title}</span></div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl md:text-lg transition-colors p-2 md:p-0">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.isUser ? "justify-end" : "justify-start"} fade-in`}>
              <div className={`max-w-[85%] p-3 rounded-xl text-sm ${msg.isUser ? "bg-[#00A3FF] text-white rounded-br-none" : "bg-white/10 text-gray-200 rounded-bl-none border border-white/5"}`}>{msg.text}</div>
            </div>
          ))}
          {isTyping && <div className="text-xs text-gray-500 fade-in ml-2">{TRANSLATIONS[lang].chat.thinking}</div>}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-3 border-t border-white/10 flex gap-2 bg-black/80">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder={TRANSLATIONS[lang].chat.placeholder} className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-500 px-2" />
          <button onClick={handleSend} className="text-[#00A3FF] text-sm font-bold hover:text-white transition-colors px-2">{TRANSLATIONS[lang].chat.send}</button>
        </div>
      </div>
    </div>
  );
};

const Countdown = ({ lang }: { lang: 'tr' | 'en' }) => {
  const t = TRANSLATIONS[lang];
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLive, setIsLive] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date(); const diff = EVENT_DATE.getTime() - now.getTime();
      if (diff > 0) { setTimeLeft({ days: Math.floor(diff / (1000 * 60 * 60 * 24)), hours: Math.floor((diff / (1000 * 60 * 60)) % 24), minutes: Math.floor((diff / 1000 / 60) % 60), seconds: Math.floor((diff / 1000) % 60) }); setIsLive(false); }
      else { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); setIsLive(true); clearInterval(interval); }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative group cursor-default w-full md:w-auto">
      <div className="relative flex flex-col items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 md:px-12 md:py-8 shadow-xl overflow-hidden w-full max-w-sm md:max-w-none mx-auto">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
        <div className="absolute top-3 md:top-4 left-1/2 -translate-x-1/2 bg-black/60 md:backdrop-blur-md px-3 py-1 text-[#00A3FF] text-[9px] md:text-[10px] font-mono tracking-[0.2em] md:tracking-[0.3em] border border-white/5 rounded-full shadow-inner whitespace-nowrap">{isLive ? t.hero.timer_live : t.hero.timer_pre}</div>
        <div className="flex gap-3 md:gap-8 font-mono text-white mt-8 md:mt-6 w-full justify-between md:justify-center px-2 md:px-0">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="flex flex-col items-center">
              <span className={`text-2xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 ${isLive ? "text-green-400" : ""}`}>{value < 10 ? `0${value}` : value}</span>
              <span className="text-[8px] md:text-[10px] text-[#00A3FF] uppercase tracking-widest mt-1 md:mt-2 font-bold opacity-80">{label === 'days' ? t.hero.timer_labels.d : label === 'hours' ? t.hero.timer_labels.h : label === 'minutes' ? t.hero.timer_labels.m : t.hero.timer_labels.s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => { if (prev >= 100) { clearInterval(timer); setTimeout(onComplete, 200); return 100; } return prev + Math.random() * 20; });
    }, 40); return () => clearInterval(timer);
  }, [onComplete]);
  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center font-mono text-[#00A3FF] transition-opacity duration-300">
      <div className="w-64 mb-4 text-xs flex justify-between tracking-widest"><span>SUMMIT_BOOT</span><span>EMU_IE_V.48</span></div>
      <div className="w-64 h-[2px] bg-gray-900 overflow-hidden relative"><div className="h-full bg-[#00A3FF] shadow-[0_0_15px_#00A3FF]" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }} /></div>
      <div className="mt-4 text-[10px] text-gray-500 flex flex-col items-center gap-1"><span>LOADING MODULES...</span><span className="text-white">{Math.round(progress)}%</span></div>
    </div>
  );
};

const IntroOverlay = ({ onStart, lang }: { onStart: () => void, lang: 'tr' | 'en' }) => {
  const t = TRANSLATIONS[lang];
  const [fading, setFading] = useState(false);
  const handleClick = () => { setFading(true); setTimeout(onStart, 600); };
  return (
    <div className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-500 ${fading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative group cursor-pointer" onClick={handleClick}>
        <div className="absolute -inset-4 bg-[#00A3FF] rounded-full opacity-20 blur-xl pulse-soft"></div>
        <button className="relative px-6 py-4 md:px-8 bg-transparent border-2 border-[#00A3FF] text-[#00A3FF] font-bold tracking-[0.2em] rounded-lg hover:scale-105 active:scale-95 hover:bg-[#00A3FF] hover:text-white transition-all duration-300 text-sm md:text-base hover:shadow-[0_0_25px_#00A3FF]">{t.intro.btn}</button>
      </div>
      <p className="mt-6 text-gray-600 text-xs font-mono fade-in">{t.intro.loading}</p>
    </div>
  );
};

export default function Home() {
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<any>(null);
  const [lang, setLang] = useState<'tr' | 'en'>('tr');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const t = TRANSLATIONS[lang];

  const LOGOS = {
    TR_DAU: "/resim/dogu-akdeniz-universitesi-seeklogo.png",
    EN_EMU: "/resim/emu-logo.png",
    CLUB: "/resim/logo.png",
    HERO_POSTER: lang === 'tr' ? '/resim/zirve-tr.png' : '/resim/zirve-eng.png',
    FOOTER_SPONSOR: lang === 'tr' ? '/resim/turkce-sponsor.png' : '/resim/ingilizce-sponsor.png'
  };

  useEffect(() => {
    document.title = lang === 'tr' ? "ENDÜSTRİ ZİRVESİ'26 | EMU IE CLUB" : "INDUSTRY SUMMIT'26 | EMU IE CLUB";
  }, [lang]);

  const startSystem = () => {
    setInitialized(true); setLoading(true);
    if (audioRef.current) { audioRef.current.volume = 0.3; audioRef.current.play().catch(e => console.log("Ambient error", e)); }
  };

  const smoothScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id); if (!element) return;
    const headerOffset = 90; const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  };
  const smoothScrollToTop = () => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  const speakers = [
    { name: "Mert Karaibrahimoğlu", title: lang === 'tr' ? "CEO, PENTİ" : "CEO, PENTI", image: "/resim/mert.jpg", imgClass: "object-center md:object-center", socials: { linkedin: "https://www.linkedin.com/search/results/all/?keywords=Mert+Karaibrahimoğlu+Penti" }, bio: lang === 'tr' ? "Penti'nin vizyoner CEO'su Mert Karaibrahimoğlu, perakende sektöründeki derin tecrübesiyle markanın küresel büyüme ve dijitalleşme stratejilerine liderlik etmektedir. Zirvede, değişen tüketici davranışları, inovatif perakende dinamikleri ve global pazarda rekabet gücü yaratma üzerine vizyon açıcı bir konuşma gerçekleştirecektir." : "Visionary CEO of Penti, Mert Karaibrahimoğlu leads the brand's global growth and digitalization strategies." },
    { name: "Hana Jalel Milesi", title: lang === 'tr' ? "CFO, VODAFONE TÜRKİYE" : "CFO, VODAFONE TURKEY", image: "/resim/hana.jpg", imgClass: "object-top md:object-[50%_15%]", socials: { linkedin: "https://www.linkedin.com/search/results/all/?keywords=Hana+Jalel+Milesi+Vodafone" }, bio: lang === 'tr' ? "Vodafone Türkiye İcra Kurulu Başkan Yardımcısı ve CFO'su olan Hana Jalel Milesi, telekomünikasyon sektöründe finansal strateji ve dijital dönüşüm konularında öncü bir isimdir." : "Vice President of the Executive Board and CFO at Vodafone Turkey, Hana Jalel Milesi is a leading figure in financial strategy." },
    { name: "Ahmet Öztürk", title: "CAE, COCA-COLA CCI", image: "/resim/ahmet.jpg", imgClass: "object-[50%_15%] md:object-[50%_10%]", socials: { linkedin: "https://www.linkedin.com/search/results/all/?keywords=Ahmet+Öztürk+Coca-Cola" }, bio: lang === 'tr' ? "Coca-Cola İçecek (CCI) Baş Denetim Yöneticisi Ahmet Öztürk, çok uluslu operasyonlarda risk yönetimi, kurumsal uyum ve iç denetim süreçlerindeki uzmanlığıyla tanınmaktadır." : "Chief Audit Executive (CAE) at Coca-Cola CCI, Ahmet Ozturk is renowned for his expertise." },
    { name: "Yelda Domaç Atilla", title: "CFO, MULTINET UP", image: "/resim/Yelda.jpg", imgClass: "object-[50%_15%] md:object-[50%_10%]", socials: { linkedin: "https://www.linkedin.com/search/results/all/?keywords=Yelda+Domaç+Atilla+Multinet" }, bio: lang === 'tr' ? "Multinet Up CFO'su olarak finansal ekosistemler, kurumsal büyüme stratejileri ve dijital ödeme sistemleri üzerine engin tecrübeye sahiptir." : "As the CFO of Multinet Up, she has extensive experience in financial ecosystems." },
    { name: "Değer Demircan Acılıoğlu", title: lang === 'tr' ? "TASARIM MERKEZİ DİREKTÖRÜ, ŞİŞECAM" : "DIRECTOR OF DESIGN CENTER, ŞIŞECAM", image: "/resim/deger.jpg", imgClass: "object-[50%_20%] md:object-[50%_15%]", socials: { linkedin: "https://www.linkedin.com/search/results/all/?keywords=Değer+Demircan+Acılıoğlu+Şişecam" }, bio: lang === 'tr' ? "Şişecam Tasarım Merkezi Direktörü olarak inovatif endüstriyel tasarım süreçlerine liderlik etmektedir." : "As the Director of the Design Center at Şişecam, she leads innovative industrial design processes." },
    { name: "Fidan Ahmet", title: lang === 'tr' ? "KARİYER KOÇU, FOREVERBEST LLC" : "CAREER COACH, FOREVERBEST LLC", image: "/resim/fidan.jpeg", imgClass: "object-[50%_20%] md:object-[50%_15%]", socials: { linkedin: "https://www.linkedin.com/search/results/all/?keywords=Fidan+Ahmet+Coach" }, bio: lang === 'tr' ? "Uluslararası deneyime sahip Kariyer Koçu ve İş Stratejisti Fidan Ahmet, genç yeteneklerin kendi potansiyellerini keşfetmelerine yardımcı olmaktadır." : "Internationally experienced Career Coach & Business Strategist Fidan Ahmet helps young talents discover their potential." },
  ];

  const panelSpeakers = [
    { name: "Yaprak Özyalçın", title: lang === 'tr' ? "DİREKTÖR, MOS GLASS" : "DIRECTOR, MOS GLASS", image: "/resim/yaprak.jpeg", imgClass: "object-[50%_15%] md:object-[50%_15%]", socials: { linkedin: "https://www.linkedin.com/search/results/all/?keywords=Yaprak+Özyalçın" }, bio: lang === 'tr' ? "Kuzey Kıbrıs'ın öncü iş kadınlarından Yaprak Özyalçın, sanayi ve üretim alanındaki başarılarıyla tanınmaktadır." : "Yaprak Ozyalcin is a leading businesswoman in Northern Cyprus." },
    { name: "Elif Leman Onan", title: lang === 'tr' ? "DİREKTÖR, ONAN LTD." : "DIRECTOR, ONAN LTD.", image: "/resim/Elif.jpeg", imgClass: "object-[50%_15%] md:object-[50%_15%]", socials: { linkedin: "https://www.linkedin.com/search/results/all/?keywords=Elif+Onan" }, bio: lang === 'tr' ? "Kıbrıs Türk Ticaret Odası (KTTO) Kadın Girişimciler Konseyi Yönetim Kurulu Üyesi olarak, adadaki ticari ekosistemin güçlenmesinde rol oynamaktadır." : "As a Board Member of the KTTO Women Entrepreneurs Council, she plays an active role in the commercial ecosystem." },
    { name: "Defne Dağlı", title: lang === 'tr' ? "DİREKTÖR, DAĞLI COSMETICS" : "DIRECTOR, DAĞLI COSMETICS", image: "/resim/defne.jpeg", imgClass: "object-[50%_15%] md:object-[50%_10%]", socials: { linkedin: "https://www.linkedin.com/in/defne-dellaloglu-dagli-6790862/" }, bio: lang === 'tr' ? "Dağlı Trading'in Pazarlama Direktörü olan Defne Dellaloğlu Dağlı, yerel pazar dinamikleri ve sürdürülebilir büyüme üzerine tecrübelerini paylaşacaktır." : "Marketing Director of Dağlı Trading, Defne Dellaloğlu Dağlı will share her experiences on local market dynamics." },
    { name: "Ergün Oza", title: lang === 'tr' ? "DİREKTÖR, OZA KAHVE" : "DIRECTOR, OZA COFFEE", image: "/resim/ergun.jpeg", imgClass: "object-[50%_15%] md:object-[50%_10%]", socials: { linkedin: "https://www.linkedin.com/in/ergun-oza-b5559592/" }, bio: lang === 'tr' ? "1984 yılında kurulan ve KKTC'nin global markası haline gelen Oza Kahve'nin Kurucusu ve Yönetim Kurulu Başkanı'dır." : "He is the Founder and Chairman of the Board of Oza Kahve, established in 1984." },
  ];

  const networkStream = [
    { label: "DAÜ / EMU", typeKey: "", logo: lang === 'tr' ? LOGOS.TR_DAU : LOGOS.EN_EMU, link: "https://www.emu.edu.tr/" },
    { label: "TELSİM", typeKey: "comm", logo: "/resim/telsim.png", link: "https://www.kktctelsim.com/" },
    { label: "GRAND SAPPHIRE", typeKey: "accom", logo: "/resim/grandsapphire.png", link: "https://www.grandsapphireresort.com/" },
    { label: "PROVA", typeKey: "stage", logo: "/resim/prova.png", link: "https://www.instagram.com/provaorganizasyon/" },
    { label: "DAÜ / EMU", typeKey: "", logo: lang === 'tr' ? LOGOS.TR_DAU : LOGOS.EN_EMU, link: "https://www.emu.edu.tr/" },
    { label: "GRAND SAPPHIRE", typeKey: "accom", logo: "/resim/grandsapphire.png", link: "https://www.grandsapphireresort.com/" },
  ];

  return (
    <>
      <GlobalStyles />
      <ScrollProgress />

      <audio ref={audioRef} src={AUDIO_PATHS.ambient} loop />

      {!initialized && <IntroOverlay onStart={startSystem} lang={lang} />}
      {initialized && loading && <Preloader onComplete={() => setLoading(false)} />}

      {chatOpen && <AIChatbot isOpen={chatOpen} onClose={() => setChatOpen(false)} lang={lang} />}

      {initialized && !loading && (
        <main className="relative flex flex-col min-h-screen w-full overflow-x-hidden bg-[#050505] text-white selection:bg-[#00A3FF] selection:text-white font-sans fade-in">

          <button onClick={() => setChatOpen(true)} className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[80] bg-[#00A3FF] w-14 h-14 rounded-full shadow-[0_0_20px_#00A3FF] hover:scale-110 active:scale-95 hover:shadow-[0_0_30px_#00A3FF] transition-all duration-300 flex items-center justify-center group">
            <span className="text-2xl group-hover:rotate-12 transition-transform">🤖</span>
          </button>

          {selectedSpeaker && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-hidden fade-in">
              <div className="absolute inset-0 bg-black/80 md:backdrop-blur-xl" onClick={() => setSelectedSpeaker(null)} />
              <div className="relative bg-[#111] border border-white/10 w-full max-w-3xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col max-h-[85vh] md:max-h-[90vh] overflow-hidden slide-up">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#00A3FF]/10 to-transparent pointer-events-none"></div>
                <button onClick={() => setSelectedSpeaker(null)} className="absolute top-3 right-3 md:top-4 md:right-4 z-50 text-gray-400 hover:text-white hover:scale-110 text-2xl w-10 h-10 flex items-center justify-center bg-black/50 md:bg-white/5 rounded-full cursor-pointer md:backdrop-blur-md transition-transform">✕</button>

                <div className="p-6 md:p-8 pb-0 flex flex-col md:flex-row gap-6 md:gap-8 relative z-10 items-center md:items-start text-center md:text-left mt-4 md:mt-0">
                  <img src={selectedSpeaker.image} alt={selectedSpeaker.name} className={`w-28 h-28 md:w-40 md:h-40 rounded-full md:rounded-3xl object-cover border-2 border-white/10 shadow-xl ${selectedSpeaker.imgClass}`} onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedSpeaker.name)}&background=0D8ABC&color=fff&size=256`; }} />
                  <div className="flex flex-col justify-center flex-1">
                    <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight">{selectedSpeaker.name}</h3>
                    <p className="text-[#00A3FF] font-medium text-xs md:text-sm tracking-wide uppercase mt-1 md:mt-2">{selectedSpeaker.title}</p>
                  </div>
                </div>

                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar relative z-10 text-center md:text-left">
                  <p className="text-gray-300 leading-relaxed text-sm md:text-lg whitespace-pre-line font-light">{selectedSpeaker.bio}</p>
                  <div className="flex justify-center md:justify-start gap-4 mt-6 pt-6 border-t border-white/10">
                    <a href={selectedSpeaker.socials.linkedin} target="_blank" rel="noopener noreferrer" className="px-6 py-3 md:py-4 bg-[#0077b5] hover:bg-[#006097] text-white text-xs md:text-sm font-bold rounded-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(0,119,181,0.6)] transition-all duration-300 w-full md:w-auto text-center cursor-pointer shadow-lg">{t.sections.linkedin_btn}</a>
                  </div>
                </div>
              </div>
            </div>
          )}

          <nav className="fixed top-0 w-full z-40 px-2 sm:px-4 md:px-8 py-3 md:py-4 flex justify-between items-center bg-black/80 md:bg-black/20 md:backdrop-blur-md border-b border-white/5 transition-all duration-300">
            <div className="flex items-center gap-1.5 sm:gap-3 md:gap-5 cursor-pointer relative z-20" onClick={smoothScrollToTop}>
              <img src={lang === 'tr' ? LOGOS.TR_DAU : LOGOS.EN_EMU} alt="DAÜ Logo" className="h-6 sm:h-8 md:h-12 w-auto drop-shadow-md" />
              <img src={LOGOS.CLUB} alt="EMU IE Logo" className="h-8 sm:h-10 md:h-16 w-auto drop-shadow-md" />
            </div>
            <div className="hidden lg:flex gap-8 text-sm font-medium text-gray-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <button onClick={smoothScrollToTop} className="hover:text-white hover:scale-105 hover:drop-shadow-[0_0_10px_#00A3FF] transition-all duration-300">{t.nav.home}</button>
              <button onClick={() => smoothScrollTo('about')} className="hover:text-white hover:scale-105 hover:drop-shadow-[0_0_10px_#00A3FF] transition-all duration-300">{t.nav.about}</button>
              <button onClick={() => smoothScrollTo('speakers')} className="hover:text-white hover:scale-105 hover:drop-shadow-[0_0_10px_#00A3FF] transition-all duration-300">{t.nav.speakers}</button>
              <button onClick={() => smoothScrollTo('schedule')} className="hover:text-white hover:scale-105 hover:drop-shadow-[0_0_10px_#00A3FF] transition-all duration-300">{t.nav.schedule}</button>
              <button onClick={() => smoothScrollTo('location')} className="hover:text-white hover:scale-105 hover:drop-shadow-[0_0_10px_#00A3FF] transition-all duration-300">{t.nav.location}</button>
              <button onClick={() => smoothScrollTo('faq')} className="hover:text-white hover:scale-105 hover:drop-shadow-[0_0_10px_#00A3FF] transition-all duration-300">{t.nav.faq}</button>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 md:gap-4 relative z-20">
              <div className="flex items-center gap-1 text-[9px] sm:text-[10px] md:text-xs font-bold font-mono border border-white/20 rounded-full px-1.5 py-1 sm:px-2 md:px-3 md:py-1 bg-black/40">
                <button onClick={() => setLang('tr')} className={`transition-colors duration-300 hover:text-white ${lang === 'tr' ? 'text-[#00A3FF]' : 'text-gray-500'}`}>TR</button>
                <span className="text-gray-600">|</span>
                <button onClick={() => setLang('en')} className={`transition-colors duration-300 hover:text-white ${lang === 'en' ? 'text-[#00A3FF]' : 'text-gray-500'}`}>EN</button>
              </div>
              <MagneticButton onClick={() => window.open(GOOGLE_FORM_URL, '_blank')} className="px-2 py-1.5 sm:px-3 sm:py-2 md:px-6 md:py-2 border border-white/20 bg-[#00A3FF] md:bg-white/5 md:backdrop-blur-md text-white text-[9px] sm:text-[10px] md:text-sm font-bold tracking-wide rounded-lg shadow-lg hover:bg-white hover:text-[#00A3FF] hover:border-[#00A3FF] hover:shadow-[0_0_20px_#00A3FF]">{t.nav.join}</MagneticButton>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-white p-1 sm:p-2 hover:scale-110 transition-transform">{mobileMenuOpen ? '✕' : '☰'}</button>
            </div>
          </nav>

          {mobileMenuOpen && (
            <div className="fixed inset-0 z-30 bg-black/95 pt-20 pb-8 px-6 flex flex-col gap-6 lg:hidden fade-in overflow-y-auto">
              <button onClick={smoothScrollToTop} className="text-gray-300 hover:text-white text-lg font-medium text-left py-2 border-b border-white/10">{t.nav.home}</button>
              <button onClick={() => smoothScrollTo('about')} className="text-gray-300 hover:text-white text-lg font-medium text-left py-2 border-b border-white/10">{t.nav.about}</button>
              <button onClick={() => smoothScrollTo('speakers')} className="text-gray-300 hover:text-white text-lg font-medium text-left py-2 border-b border-white/10">{t.nav.speakers}</button>
              <button onClick={() => smoothScrollTo('schedule')} className="text-gray-300 hover:text-white text-lg font-medium text-left py-2 border-b border-white/10">{t.nav.schedule}</button>
              <button onClick={() => smoothScrollTo('location')} className="text-gray-300 hover:text-white text-lg font-medium text-left py-2 border-b border-white/10">{t.nav.location}</button>
              <button onClick={() => smoothScrollTo('faq')} className="text-gray-300 hover:text-white text-lg font-medium text-left py-2 border-b border-white/10">{t.nav.faq}</button>
              <div className="flex justify-center gap-6 mt-6">
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-[#00A3FF] font-bold hover:scale-110 transition-transform">INSTAGRAM</a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#00A3FF] font-bold hover:scale-110 transition-transform">LINKEDIN</a>
              </div>
            </div>
          )}

          <section className="relative z-10 flex flex-col items-center justify-start w-full pt-28 md:pt-36 pb-8 min-h-[85vh] md:min-h-[90vh]">
            <div className="w-full max-w-6xl px-4 md:px-4 flex justify-center fade-in">
              <img src={LOGOS.HERO_POSTER} alt="Industry Summit Poster" className="w-full h-auto object-contain drop-shadow-[0_0_20px_rgba(0,163,255,0.15)] rounded-lg md:rounded-none" onError={(e) => { e.currentTarget.style.opacity = '0.5'; }} />
            </div>
            <div className="relative z-10 flex flex-col items-center w-full px-4 mt-8 md:mt-10 slide-up">
              <button onClick={() => window.open(GOOGLE_FORM_URL, '_blank')} className="px-8 py-4 md:px-12 md:py-5 mb-8 md:mb-10 bg-[#00A3FF] text-white font-bold text-lg md:text-xl tracking-widest rounded-xl shadow-[0_0_30px_rgba(0,163,255,0.4)] hover:scale-110 hover:bg-[#33B5FF] hover:shadow-[0_0_50px_#00A3FF] active:scale-95 transition-all duration-300 border border-white/20 w-full max-w-xs md:max-w-none">{t.hero.btn_reg}</button>
              <div className="flex w-full justify-center"><Countdown lang={lang} /></div>
            </div>
          </section>

          <div className="relative w-full bg-black/50 md:bg-white/5 md:backdrop-blur-sm py-8 md:py-12 overflow-hidden border-y border-white/5 z-20 mt-6 md:mt-10 mb-6 md:mb-10">
            <div className="animate-marquee">
              {[...networkStream, ...networkStream, ...networkStream].map((item, i) => (
                <a key={i} href={item.link} target={item.link !== "#" ? "_blank" : undefined} rel="noopener noreferrer" className="flex flex-col items-center justify-between pt-6 pb-3 md:pt-8 md:pb-4 px-4 md:px-8 bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl mx-3 md:mx-5 min-w-[250px] md:min-w-[320px] h-[140px] md:h-[180px] group hover:-translate-y-3 hover:bg-white/10 hover:border-[#00A3FF] hover:shadow-[0_10px_30px_rgba(0,163,255,0.2)] transition-all duration-500 relative overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-[#00A3FF]/0 group-hover:bg-[#00A3FF]/10 transition-colors duration-500"></div>
                  <div className="flex-1 flex items-center justify-center w-full relative z-10">
                    <img src={item.logo} alt={item.label} className={`h-12 w-28 md:h-16 md:w-40 object-contain drop-shadow-md transition-transform duration-500 ${item.label === "GRAND SAPPHIRE" || item.label === "PROVA" ? "scale-[1.8] group-hover:scale-[2.1]" : "group-hover:scale-110"} ${item.label === "TELSİM" ? "scale-[1.7] group-hover:scale-[2.0]" : ""} ${item.label === "DAÜ / EMU" ? "scale-[1.9] group-hover:scale-[2.2]" : ""}`} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  </div>
                  {item.label !== "DAÜ / EMU" && item.typeKey && (
                    <div className="w-full mt-3 pt-3 border-t border-white/10 group-hover:border-[#00A3FF]/50 relative z-10 text-center transition-colors duration-500">
                      <span className="text-[9px] md:text-[10px] font-mono text-gray-500 tracking-[0.25em] md:tracking-[0.3em] uppercase group-hover:text-[#00A3FF] group-hover:drop-shadow-[0_0_8px_rgba(0,163,255,0.8)] transition-all duration-500">{t.sponsor_types[item.typeKey as keyof typeof t.sponsor_types]}</span>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="relative z-10 bg-[#050505] pb-16 md:pb-20 border-t border-white/5">
            <section id="about" className="w-full max-w-5xl mx-auto py-16 md:py-24 px-4 md:px-6 scroll-mt-20 md:scroll-mt-24 slide-up">
              <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12"><div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1"></div><h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight pb-1 md:pb-2 text-center">{t.sections.about}</h2><div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1"></div></div>
              <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-12 md:backdrop-blur-md shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00A3FF] to-transparent opacity-70 md:opacity-50 transition-opacity duration-500"></div>
                <div className="space-y-4 md:space-y-6 text-gray-300 text-sm md:text-base leading-relaxed text-left">
                  <p>{t.about.p1}</p><p>{t.about.p2}</p><p>{t.about.p3}</p><p className="font-semibold text-white border-l-4 border-[#00A3FF] pl-3 py-1 bg-white/5 md:bg-transparent rounded-r-lg">{t.about.p4}</p>
                </div>
              </div>
            </section>

            <section id="speakers" className="w-full max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-6 scroll-mt-20 md:scroll-mt-24 slide-up">
              <div className="flex items-center gap-3 md:gap-4 mb-10 md:mb-16"><div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1"></div><h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight pb-1 md:pb-2 text-center">{t.sections.speakers}</h2><div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1"></div></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {speakers.map((speaker, index) => (
                  <div key={index} onClick={() => setSelectedSpeaker(speaker)} className="relative h-[380px] md:h-[450px] lg:h-[500px] w-full rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group border border-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.5)] md:hover:shadow-[0_0_40px_rgba(0,163,255,0.3)] transition-all duration-500 md:hover:-translate-y-2 perspective-1000">
                    <img src={speaker.image} alt={speaker.name} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-110 ${speaker.imgClass}`} onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.name)}&background=0D8ABC&color=fff&size=512`; }} />
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent opacity-0 md:opacity-90 md:group-hover:opacity-80 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,1)] md:drop-shadow-md">{speaker.name}</h3>
                      <div><span className="inline-block bg-black/70 md:bg-transparent backdrop-blur-md md:backdrop-blur-none text-[#00A3FF] px-2 py-1 md:px-0 md:py-0 rounded-lg md:rounded-none text-[10px] md:text-sm font-bold tracking-widest uppercase mb-3 md:mb-4 border border-white/10 md:border-transparent drop-shadow-lg md:drop-shadow-md">{speaker.title}</span></div>
                      <div className="h-[2px] w-12 bg-[#00A3FF] mb-3 md:mb-4 md:group-hover:w-24 transition-all duration-500"></div>
                      <div className="flex items-center gap-2 text-[11px] md:text-sm text-gray-300 md:group-hover:text-white transition-colors duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100"><span className="font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,1)] md:drop-shadow-none">{t.sections.view_profile}</span><span className="md:group-hover:translate-x-2 transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] md:drop-shadow-none">→</span></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-20 md:mt-32">
                <div className="flex items-center gap-3 md:gap-4 mb-10 md:mb-16"><div className="h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF]/50 to-transparent flex-1"></div><h2 className="text-2xl md:text-4xl font-bold text-[#00A3FF] tracking-tight pb-1 md:pb-2 text-center">{t.sections.panel}</h2><div className="h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF]/50 to-transparent flex-1"></div></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                  {panelSpeakers.map((speaker, index) => (
                    <div key={index} onClick={() => setSelectedSpeaker(speaker)} className="relative h-[350px] md:h-[450px] w-full rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group border border-[#00A3FF]/20 shadow-[0_5px_15px_rgba(0,163,255,0.1)] md:hover:shadow-[0_0_40px_rgba(0,163,255,0.4)] transition-all duration-500 md:hover:-translate-y-2 perspective-1000">
                      <img src={speaker.image} alt={speaker.name} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-110 ${speaker.imgClass}`} onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.name)}&background=0D8ABC&color=fff&size=512`; }} />
                      <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent opacity-0 md:opacity-95 md:group-hover:opacity-85 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 p-5 lg:p-8 flex flex-col justify-end translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2 leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,1)] md:drop-shadow-md">{speaker.name}</h3>
                        <div><span className="inline-block bg-black/70 md:bg-transparent backdrop-blur-md md:backdrop-blur-none text-[#00A3FF] px-2 py-1 md:px-0 md:py-0 rounded-lg md:rounded-none text-[9px] md:text-xs font-bold tracking-widest uppercase mb-3 md:mb-4 border border-white/10 md:border-transparent drop-shadow-lg md:drop-shadow-md">{speaker.title}</span></div>
                        <div className="h-[2px] w-8 md:w-12 bg-[#00A3FF] mb-3 md:mb-4 md:group-hover:w-24 transition-all duration-500"></div>
                        <div className="flex items-center gap-2 text-[10px] md:text-sm text-gray-300 md:group-hover:text-white transition-colors duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100"><span className="font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,1)] md:drop-shadow-none">{t.sections.view_profile}</span><span className="md:group-hover:translate-x-2 transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] md:drop-shadow-none">→</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="schedule" className="w-full max-w-5xl mx-auto py-16 md:py-24 px-4 md:px-6 scroll-mt-20 md:scroll-mt-24 slide-up">
              <div className="flex items-center gap-3 md:gap-4 mb-12 md:mb-20"><div className="h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF]/50 to-transparent flex-1"></div><h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight pb-1 md:pb-2 text-center drop-shadow-[0_0_15px_rgba(0,163,255,0.5)]">{t.sections.schedule}</h2><div className="h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF]/50 to-transparent flex-1"></div></div>
              <div className="relative ml-4 md:ml-8 space-y-8 md:space-y-12">
                <div className="absolute left-[-1px] md:left-[1px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-[#00A3FF]/50 to-transparent"></div>
                {SCHEDULE_DATA.map((item, i) => {
                  const data = lang === 'tr' ? item.tr : item.en;
                  const isBreak = item.type === "break"; const isEvent = item.type === "event"; const isPanel = item.type === "panel";
                  const dotColor = isBreak ? "bg-orange-500 shadow-[0_0_15px_#f97316]" : isEvent ? "bg-green-500 shadow-[0_0_15px_#22c55e]" : isPanel ? "bg-purple-500 shadow-[0_0_15px_#a855f7]" : "bg-[#00A3FF] shadow-[0_0_15px_#00A3FF]";
                  const cardBorder = isBreak ? "border-orange-500/30 group-hover:border-orange-500/80 group-hover:shadow-[0_0_25px_rgba(249,115,22,0.2)]" : isEvent ? "border-green-500/30 group-hover:border-green-500/80 group-hover:shadow-[0_0_25px_rgba(34,197,94,0.2)]" : isPanel ? "border-purple-500/30 group-hover:border-purple-500/80 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]" : "border-[#00A3FF]/30 group-hover:border-[#00A3FF]/80 group-hover:shadow-[0_0_25px_rgba(0,163,255,0.2)]";
                  return (
                    <div key={i} className="relative pl-8 md:pl-12 group cursor-default">
                      <div className={`absolute left-[-6px] md:left-[-4px] top-6 w-3 h-3 rounded-full ${dotColor} group-hover:scale-150 transition-all duration-300 z-10`}></div>
                      <div className={`bg-white/5 backdrop-blur-md border ${cardBorder} p-5 md:p-8 rounded-2xl md:rounded-3xl hover:-translate-y-2 transition-all duration-500`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 mb-4 border-b border-white/10 pb-4">
                          <h3 className={`text-xl md:text-2xl font-bold text-white group-hover:text-white transition-colors duration-300`}>{data.title}</h3>
                          <span className={`inline-block px-4 py-1.5 rounded-full text-xs md:text-sm font-mono font-bold tracking-widest bg-black/60 border ${cardBorder.split(' ')[0]} text-gray-200 group-hover:text-white transition-colors duration-300 shadow-inner`}>{item.time}</span>
                        </div>
                        <p className="text-gray-400 group-hover:text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-line font-medium transition-colors duration-300">{data.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="w-full max-w-6xl mx-auto py-10 md:py-16 px-4 md:px-6 slide-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                <div className="relative bg-gradient-to-br from-red-950/40 via-black to-black border border-red-500/30 rounded-3xl p-8 md:p-10 flex flex-col justify-center items-center md:items-start text-center md:text-left shadow-[0_0_30px_rgba(255,0,0,0.1)] hover:shadow-[0_0_50px_rgba(255,0,0,0.3)] hover:-translate-y-2 hover:border-red-500/60 transition-all duration-500 group overflow-hidden">
                  <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all duration-500"></div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 flex items-center gap-3 md:gap-4 relative z-10"><span className="relative flex h-4 w-4"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 shadow-[0_0_15px_#ef4444]"></span></span>{t.liveStream.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base mb-8 md:mb-10 leading-relaxed relative z-10">{t.liveStream.desc}</p>
                  <div className="flex flex-col sm:flex-row gap-4 w-full justify-center md:justify-start relative z-10">
                    <a href={YOUTUBE_LINKS.dauTv} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-6 py-4 bg-red-600/10 hover:bg-red-600 border border-red-500 text-red-500 hover:text-white font-bold text-xs md:text-sm tracking-widest rounded-xl hover:scale-105 hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] transition-all duration-300 flex items-center justify-center">{t.liveStream.btn1} ↗</a>
                    <a href={YOUTUBE_LINKS.dauMain} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-6 py-4 bg-red-600/10 hover:bg-red-600 border border-red-500 text-red-500 hover:text-white font-bold text-xs md:text-sm tracking-widest rounded-xl hover:scale-105 hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] transition-all duration-300 flex items-center justify-center">{t.liveStream.btn2} ↗</a>
                  </div>
                </div>

                <div className="relative bg-gradient-to-br from-orange-950/40 via-black to-black border border-orange-500/30 rounded-3xl p-8 md:p-10 flex flex-col justify-center items-center md:items-start text-center md:text-left shadow-[0_0_30px_rgba(249,115,22,0.1)] hover:shadow-[0_0_50px_rgba(249,115,22,0.3)] hover:-translate-y-2 hover:border-orange-500/60 transition-all duration-500 group overflow-hidden">
                  <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all duration-500"></div>
                  <div className="text-5xl md:text-6xl mb-4 md:mb-6 relative z-10 group-hover:scale-110 transition-transform duration-500"><span className="drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]">📱🎧</span></div>
                  <h4 className="text-orange-400 font-bold text-xl md:text-2xl tracking-widest uppercase mb-3 md:mb-4 relative z-10 drop-shadow-md">{t.translation.title}</h4>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed relative z-10 mb-6">{t.translation.desc}</p>
                  <a href={TEAMS_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-6 py-3 bg-orange-600/10 hover:bg-orange-600 border border-orange-500 text-orange-500 hover:text-white font-bold text-xs md:text-sm tracking-widest rounded-xl hover:scale-105 hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-all duration-300 flex items-center justify-center relative z-10">
                    {t.translation.btn} ↗
                  </a>
                </div>
              </div>
            </section>

            <section id="location" className="w-full max-w-5xl mx-auto py-16 md:py-24 px-4 md:px-6 scroll-mt-20 md:scroll-mt-24 slide-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-16 text-center text-white tracking-tight pb-1 md:pb-2">{t.sections.location}</h2>
              <div className="relative border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden h-[300px] md:h-[400px] group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-40 md:opacity-30 md:group-hover:opacity-50 transition-opacity duration-700 grayscale md:group-hover:grayscale-0"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full">
                  <div className="flex flex-col items-center relative z-30 w-[90%] md:w-auto">
                    <div className="relative pulse-soft"><div className="absolute -inset-3 md:-inset-4 rounded-full border border-[#00A3FF]"></div><div className="w-3 h-3 md:w-4 md:h-4 bg-[#00A3FF] rounded-full shadow-[0_0_15px_#00A3FF] z-10 relative"></div></div>
                    <div className="bg-black/90 md:backdrop-blur-md border border-[#00A3FF] px-4 py-3 md:px-8 md:py-4 rounded-xl mt-5 md:mt-6 text-center shadow-2xl md:group-hover:-translate-y-2 transition-transform duration-500 w-full md:w-auto"><h3 className="text-white font-bold text-xs md:text-sm tracking-widest">{t.location_pin.name}</h3><p className="text-[#00A3FF] text-[10px] md:text-xs font-bold mt-1">{t.location_pin.sub}</p></div>
                  </div>
                </div>
                <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-4 md:bottom-8 md:right-8 px-4 py-2 md:px-6 md:py-3 bg-[#00A3FF] text-white text-[10px] md:text-xs font-bold rounded-lg active:bg-[#33B5FF] hover:bg-[#33B5FF] hover:scale-105 hover:shadow-[0_0_20px_#00A3FF] hover:-translate-y-1 transition-all duration-300 shadow-lg z-20">OPEN GPS ↗</a>
              </div>
            </section>

            <section id="faq" className="w-full max-w-3xl mx-auto py-16 md:py-24 px-4 md:px-6 scroll-mt-20 md:scroll-mt-24 slide-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 md:mb-16 tracking-tight pb-1 md:pb-2">{t.sections.faq}</h2>
              <div className="space-y-2 md:space-y-4">{t.faq_items.map((item, i) => (<FaqItem key={i} question={item.q} answer={item.a} />))}</div>
            </section>
          </div>

          <footer id="contact" className="relative z-10 w-full border-t border-white/5 bg-black/95 md:backdrop-blur-xl py-10 md:py-12 text-center flex flex-col items-center">
            <div className="flex flex-col md:flex-row justify-center items-center mb-8 w-full px-4">
              <img src={LOGOS.FOOTER_SPONSOR} alt="Sponsors" className="w-full max-w-5xl h-auto drop-shadow-md md:hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex justify-center gap-6 md:gap-8 mb-6 mt-4">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-[#00A3FF] hover:text-white hover:scale-110 hover:drop-shadow-[0_0_10px_#00A3FF] transition-all duration-300 text-xs md:text-sm font-bold tracking-wide">INSTAGRAM</a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#00A3FF] hover:text-white hover:scale-110 hover:drop-shadow-[0_0_10px_#00A3FF] transition-all duration-300 text-xs md:text-sm font-bold tracking-wide">LINKEDIN</a>
            </div>
            <p className="text-gray-500 text-[10px] md:text-sm tracking-widest font-medium px-6 text-center">© 2026 EMU INDUSTRIAL ENGINEERING CLUB & EASTERN MEDITERRANEAN UNIVERSITY</p>
          </footer>
        </main>
      )}
    </>
  );
}