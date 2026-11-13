'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Zap,
  Wrench,
  PhoneCall,
  Menu,
  X,
  ShieldCheck,
  BatteryCharging,
  Gauge,
  MapPin,
  ArrowUpRight,
  ArrowRight,
  SlidersHorizontal,
  Calendar,
  Download,
  PhoneOutgoing,
  Navigation,
  CheckCircle,
  Truck,
  Cpu,
  ChevronDown,
  Plug,
  Facebook,
  Instagram,
  MessageCircle,
  Mail,
  Clock,
  Battery,
  Shield,
  Star,
} from 'lucide-react';

interface CarItem {
  key: string;
  title: string;
  brand: string;
  year: number;
  price: string;
  installment: string;
  mileage: string;
  range: string;
  soh: number;
  sohLabel: string;
  batteryCap: string;
  batteryType: string;
  warranty: string;
  cellBalance: string;
  image: string;
  location: string;
}

const initialCars: CarItem[] = [
  {
    key: 'tesla',
    title: 'Tesla Model Y Long Range AWD',
    brand: 'Tesla',
    year: 2023,
    price: '฿1,390,000',
    installment: 'ผ่อนเริ่มต้น ฿21,500/ด.',
    mileage: '18,500 กม.',
    range: '533 กม./ชาร์จ',
    soh: 98,
    sohLabel: 'สมบูรณ์สูง (เกรด AAA)',
    batteryCap: '75.0 kWh',
    batteryType: 'NMC Lithium-Ion (Tesla 2170 Cells)',
    warranty: 'ประกันศูนย์ถึง 2031 หรือ 160,000 กม.',
    cellBalance: '11 mV (ความสมดุลเซลล์ยอดเยี่ยม)',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    location: 'กรุงเทพฯ',
  },
  {
    key: 'byd',
    title: 'BYD ATTO 3 Extended Range',
    brand: 'BYD',
    year: 2023,
    price: '฿859,000',
    installment: 'ผ่อนเริ่มต้น ฿13,200/ด.',
    mileage: '24,000 กม.',
    range: '480 กม./ชาร์จ',
    soh: 96,
    sohLabel: 'สมบูรณ์สูง (Blade Battery)',
    batteryCap: '60.48 kWh',
    batteryType: 'BYD Blade Battery (LFP ปลอดภัยสูง)',
    warranty: 'ประกันศูนย์ถึง 2031 หรือ 150,000 กม.',
    cellBalance: '14 mV (ผ่านเกณฑ์มาตรฐานศูนย์)',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
    location: 'นนทบุรี',
  },
  {
    key: 'ora',
    title: 'ORA Good Cat 500 Ultra',
    brand: 'GWM',
    year: 2023,
    price: '฿629,000',
    installment: 'ผ่อนเริ่มต้น ฿9,800/ด.',
    mileage: '18,000 กม.',
    range: '500 กม./ชาร์จ',
    soh: 93,
    sohLabel: 'สภาพดีเยี่ยม (ผ่านการบำรุงรักษาศูนย์)',
    batteryCap: '63.13 kWh',
    batteryType: 'Ternary Lithium (NMC)',
    warranty: 'ประกันศูนย์ถึง 2031 หรือ 180,000 กม.',
    cellBalance: '16 mV (พร้อมใช้งานระยะยาว)',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    location: 'ชลบุรี',
  },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeModalCar, setActiveModalCar] = useState<CarItem | null>(null);

  // Parallax Ref
  const heroZoneRef = useRef<HTMLDivElement>(null);
  const carWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroZone = heroZoneRef.current;
    const carWrapper = carWrapperRef.current;
    if (!heroZone || !carWrapper) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroZone.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      carWrapper.style.transform = `translate3d(${x * 0.03}px, ${y * 0.03}px, 0)`;

      const badges = heroZone.querySelectorAll<HTMLElement>('.lifestyle-badge');
      badges.forEach((badge, index) => {
        const depth = ((index % 3) + 1) * 0.04;
        const rotate = (index % 2 === 0 ? 1 : -1) * (x * 0.02);
        badge.style.transform = `translate3d(${-x * depth}px, ${-y * depth}px, 0) rotate(${rotate}deg)`;
      });
    };

    const handleMouseLeave = () => {
      carWrapper.style.transform = 'translate3d(0, 0, 0)';
      const badges = heroZone.querySelectorAll<HTMLElement>('.lifestyle-badge');
      badges.forEach((badge) => {
        badge.style.transform = '';
      });
    };

    heroZone.addEventListener('mousemove', handleMouseMove);
    heroZone.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      heroZone.removeEventListener('mousemove', handleMouseMove);
      heroZone.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Filter Cars
  const filteredCars = initialCars.filter((car) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'soh95') return car.soh >= 95;
    if (selectedFilter === 'soh90') return car.soh >= 90 && car.soh < 95;
    if (selectedFilter === 'tesla') return car.brand.toLowerCase() === 'tesla';
    if (selectedFilter === 'byd') return car.brand.toLowerCase() === 'byd';
    if (selectedFilter === 'ora') return car.brand.toLowerCase() === 'gwm';
    return true;
  });

  const handleEmergencyDispatch = () => {
    if (navigator.geolocation) {
      alert('📡 Aura EV กำลังดึงพิกัด GPS เพื่อค้นหารถช่าง Mobile Service ที่ใกล้ที่สุด...');
      setTimeout(() => {
        alert('✅ พบหน่วยบริการ Aura Mobile Service ใกล้คุณ (ห่าง 4.2 กม.)\nเจ้าหน้าที่จะติดต่อกลับผ่านเบอร์โทรศัพท์ของคุณภายใน 3 นาทีครับ');
      }, 700);
    } else {
      alert('กรุณาโทรตรงที่เบอร์ฉุกเฉิน 02-999-AURA ได้ทันทีตลอด 24 ชั่วโมง');
    }
  };

  return (
    <>
      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-50 pastel-glass border-b border-pastel-100/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pastel-500 to-sky-400 flex items-center justify-center text-white shadow-md shadow-pastel-300/40 group-hover:scale-105 transition-transform duration-300">
                <Zap className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-pastel-600 transition-colors">
                  AURA <span className="text-pastel-500">EV</span>
                </span>
                <span className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase -mt-1">
                  Future Mobility
                </span>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-7">
              <a href="#home" className="text-pastel-600 font-bold transition-colors">
                หน้าแรก
              </a>
              <a href="#marketplace" className="text-slate-600 hover:text-pastel-600 font-medium transition-colors flex items-center gap-1.5">
                <span>ตลาดรถ EV</span>
                <span className="text-[11px] bg-pastel-100 text-pastel-700 font-semibold px-2 py-0.5 rounded-full border border-pastel-200">
                  เช็ก SoH
                </span>
              </a>
              <Link href="/compare" className="text-slate-600 hover:text-pastel-600 font-medium transition-colors">
                เปรียบเทียบรถ
              </Link>
              <Link href="/booking" className="text-slate-600 hover:text-pastel-600 font-medium transition-colors flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-pastel-500" />
                <span>จองคิว / เรียกช่าง</span>
              </Link>
              <Link href="/sell" className="text-slate-600 hover:text-pastel-600 font-medium transition-colors">
                ลงประกาศขาย
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/sell"
                className="hidden lg:inline-flex items-center gap-1.5 bg-pastel-50 hover:bg-pastel-100 text-pastel-700 border border-pastel-200 font-semibold text-xs px-3.5 py-2 rounded-xl transition"
              >
                <span>+ ลงขายรถฟรี</span>
              </Link>
              <Link
                href="/booking"
                className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-pastel-500 to-sky-400 hover:from-pastel-600 hover:to-sky-500 text-white font-medium px-4 py-2 rounded-2xl shadow-sm shadow-pastel-400/30 hover:shadow-pastel-400/40 hover:-translate-y-0.5 transition-all text-xs sm:text-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>ฉุกเฉิน 24 ชม.</span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-pastel-600 rounded-xl hover:bg-pastel-50 transition"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-pastel-100 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-3 transition-all">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-xl text-slate-700 font-medium hover:bg-pastel-50 hover:text-pastel-600">
              หน้าแรก
            </a>
            <a href="#marketplace" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-xl text-slate-700 font-medium hover:bg-pastel-50 hover:text-pastel-600">
              ตลาดรถ EV มือสอง (คัดเกรด SoH)
            </a>
            <Link href="/compare" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-xl text-slate-700 font-medium hover:bg-pastel-50 hover:text-pastel-600">
              เปรียบเทียบรถ (Side-by-Side)
            </Link>
            <Link href="/booking" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-xl text-slate-700 font-medium hover:bg-pastel-50 hover:text-pastel-600">
              จองคิวซ่อม / เรียกช่างฉุกเฉิน
            </Link>
            <Link href="/sell" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-xl text-slate-700 font-medium hover:bg-pastel-50 hover:text-pastel-600">
              ลงประกาศขายรถ EV ฟรี
            </Link>
            <div className="pt-2">
              <a href="#service" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pastel-500 to-sky-400 text-white font-medium py-3 rounded-xl shadow-sm">
                <PhoneCall className="w-4 h-4" />
                <span>โทรเรียกช่างด่วน</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. NISSAN-STYLE HERO SECTION WITH ANIMATED CAR & 6 FEATURE BADGES */}
      <section id="home" className="relative nissan-hero-bg pt-10 pb-16 lg:pt-16 lg:pb-28 overflow-hidden min-h-[720px] flex flex-col justify-between">
        <div className="absolute top-1/4 right-1/4 -z-10 w-[550px] h-[550px] bg-gradient-to-tr from-sky-200/50 via-pastel-300/40 to-transparent blur-3xl rounded-full pointer-events-none animate-light-beam"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Tilted Headline */}
            <div className="lg:col-span-5 text-left z-20 space-y-6">
              <div className="space-y-1">
                <div className="inline-block transform -rotate-2 -skew-x-3 bg-gradient-to-r from-pastel-400 via-pastel-500 to-sky-500 text-white font-black px-6 py-3 rounded-2xl shadow-xl shadow-pastel-400/35 text-3xl sm:text-5xl lg:text-[46px] tracking-tight leading-none hover:scale-105 transition-transform cursor-default">
                  ไม่ต้องรอชาร์จ
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-[62px] font-black text-slate-900 tracking-tight leading-tight pt-1">
                  ก็ใช้ <span className="font-brush text-5xl sm:text-7xl lg:text-[76px] text-pastel-500 underline decoration-sky-300 decoration-wavy decoration-2 inline-block transform -rotate-3 hover:rotate-2 transition-transform">ชีวิต</span> ได้เยอะ
                </h1>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center bg-white border border-pastel-200 rounded-xl p-1 shadow-sm">
                  <span className="bg-pastel-500 text-white font-extrabold text-xs px-2.5 py-1 rounded-lg tracking-wider">
                    e-AURA
                  </span>
                  <span className="px-2.5 text-xs font-bold text-slate-800">
                    POWER
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-600">
                  ชีวิตไปต่อไม่ต้องรอชาร์จ • ระบบขับเคลื่อนไฟฟ้า 100%
                </span>
              </div>

              <div className="border-l-4 border-pastel-400 pl-4 py-1">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block">AURA ON. GAME ON.</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                  The All-New AURA KICKS e-POWER
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#marketplace"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-pastel-500 to-sky-500 hover:from-pastel-600 hover:to-sky-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-pastel-400/35 hover:-translate-y-0.5 transition-all"
                >
                  <Gauge className="w-4 h-4" />
                  <span>ทดลองขับ & สัมผัสคันจริง</span>
                </a>
                <a
                  href="#marketplace"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-pastel-50 text-slate-700 hover:text-pastel-600 font-semibold text-sm sm:text-base border border-pastel-200 shadow-sm hover:-translate-y-0.5 transition-all"
                >
                  <span>ดูสเปก & ราคา</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Car with 6 Floating Vehicle Feature Badges */}
            <div ref={heroZoneRef} id="hero-interactive-zone" className="lg:col-span-7 relative flex items-center justify-center min-h-[440px] sm:min-h-[500px]">
              
              {/* Floating Badges */}
              <div className="absolute inset-0 pointer-events-none z-10">
                {/* 1. RANGE */}
                <div className="absolute top-[6%] left-[4%] sm:left-[8%] pointer-events-auto lifestyle-badge animate-float-medium">
                  <div className="flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-pastel-100 text-slate-800">
                    <div className="w-8 h-8 rounded-xl bg-pastel-100 flex items-center justify-center text-pastel-600 shadow-inner">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-0.5">RANGE</div>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900">วิ่งไกล 500+ กม.</div>
                    </div>
                  </div>
                </div>

                {/* 2. PERFORMANCE */}
                <div className="absolute top-[2%] left-[42%] sm:left-[40%] pointer-events-auto lifestyle-badge animate-float-slow" style={{ animationDelay: '-1.5s' }}>
                  <div className="flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-pastel-100 text-slate-800">
                    <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 shadow-inner">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-0.5">PERFORMANCE</div>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900">0-100 กม./ชม. ใน 4.4 วิ</div>
                    </div>
                  </div>
                </div>

                {/* 3. FAST CHARGE */}
                <div className="absolute top-[6%] right-[4%] sm:right-[8%] pointer-events-auto lifestyle-badge animate-float-fast" style={{ animationDelay: '-0.8s' }}>
                  <div className="flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-pastel-100 text-slate-800">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-inner">
                      <BatteryCharging className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-0.5">FAST CHARGE</div>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900">ชาร์จไว 10-80% ใน 25 นาที</div>
                    </div>
                  </div>
                </div>

                {/* 4. SAFETY & ADAS */}
                <div className="absolute top-[34%] left-[1%] sm:left-[4%] pointer-events-auto lifestyle-badge animate-float-fast" style={{ animationDelay: '-2.1s' }}>
                  <div className="flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-pastel-100 text-slate-800">
                    <div className="w-8 h-8 rounded-xl bg-pastel-100 flex items-center justify-center text-pastel-600 shadow-inner">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-0.5">SAFETY & ADAS</div>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900">กล้องรอบคัน 360°</div>
                    </div>
                  </div>
                </div>

                {/* 5. V2L POWER */}
                <div className="absolute bottom-[18%] left-[2%] sm:left-[6%] pointer-events-auto lifestyle-badge animate-float-slow" style={{ animationDelay: '-2.7s' }}>
                  <div className="flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-pastel-200 text-slate-800">
                    <div className="w-8 h-8 rounded-xl bg-pastel-100 flex items-center justify-center text-pastel-600 shadow-inner">
                      <Plug className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-0.5">V2L POWER</div>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900">แคมป์ปล่อยไฟ 220V</div>
                    </div>
                  </div>
                </div>

                {/* 6. BATTERY SOH */}
                <div className="absolute bottom-[14%] right-[4%] sm:right-[10%] pointer-events-auto lifestyle-badge animate-float-medium" style={{ animationDelay: '-1.2s' }}>
                  <div className="flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-pastel-200 text-slate-800">
                    <div className="w-8 h-8 rounded-xl bg-pastel-100 flex items-center justify-center text-pastel-600 shadow-inner">
                      <BatteryCharging className="w-4 h-4 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-0.5">BATTERY SOH</div>
                      <div className="text-xs sm:text-sm font-extrabold text-pastel-600">98% สมบูรณ์สูง</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* EV Car Wrapper */}
              <div ref={carWrapperRef} className="relative z-20 w-full max-w-[620px] transition-transform duration-200 ease-out animate-car-entrance">
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-16 bg-slate-900/25 blur-xl rounded-full"></div>
                <img
                  src="https://pngimg.com/uploads/tesla_car/tesla_car_PNG43.png"
                  alt="Aura EV Crossover"
                  className="w-full h-auto object-contain filter drop-shadow-[0_20px_30px_rgba(14,165,233,0.22)] select-none cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute top-[52%] left-[18%] w-4 h-4 bg-sky-300 rounded-full blur-[2px] animate-ping opacity-75 pointer-events-none"></div>
              </div>

            </div>

          </div>

          {/* 4 SPECS TICKER (325 PS, 420 Nm, Dual Motor AWD, AuraPILOT) */}
          <div className="mt-14 pt-6 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-2 group">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-pastel-600 transition-colors">325 PS</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">พละกำลังสูงสุด Dual Motor</div>
            </div>
            <div className="p-2 group">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-pastel-600 transition-colors">420 Nm</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">แรงบิดมหาศาล 0-100 ใน 4.4 วิ</div>
            </div>
            <div className="p-2 group">
              <div className="text-2xl sm:text-3xl font-black text-pastel-600">Dual Motor AWD</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">ระบบขับเคลื่อน 4 ล้อไฟฟ้าอิสระ</div>
            </div>
            <div className="p-2 group">
              <div className="text-2xl sm:text-3xl font-black text-sky-500">AuraPILOT & SOS</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">ระบบช่วยขับอัจฉริยะ & กู้ภัย 24 ชม.</div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <a href="#marketplace" className="text-slate-400 hover:text-pastel-600 transition-colors p-2 animate-bounce flex flex-col items-center gap-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">เลื่อนดูตลาดรถ</span>
              <ChevronDown className="w-5 h-5" />
            </a>
          </div>

        </div>
      </section>

      {/* 3. QUICK SERVICES CARDS */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-xl shadow-pastel-100/60 border border-pastel-100 flex items-center justify-between hover:-translate-y-1 transition duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-pastel-100/80 text-pastel-600 flex items-center justify-center mb-3">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">ตลาดรถยนต์ไฟฟ้า (EV Market)</h3>
              <p className="text-slate-500 text-sm mb-4">เลือกซื้อรถ EV มือ 1 หรือมือสอง สภาพเยี่ยม การันตีสุขภาพแบตเตอรี่</p>
              <a href="#marketplace" className="text-pastel-600 font-semibold text-sm hover:underline flex items-center gap-1.5">
                <span>ดูรถทั้งหมดในระบบ</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="hidden sm:flex bg-pastel-50 border border-pastel-100 w-16 h-16 rounded-2xl items-center justify-center text-pastel-600 font-extrabold text-xl">
              EV
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-xl shadow-pastel-100/60 border border-pastel-100 flex items-center justify-between hover:-translate-y-1 transition duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-100/80 text-sky-600 flex items-center justify-center mb-3">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">บริการซ่อม & จองคิวตรวจเช็ก</h3>
              <p className="text-slate-500 text-sm mb-4">นัดหมายเข้าศูนย์หรือเรียกช่างไปดูแลรถไฟฟ้าของคุณถึงหน้าบ้าน</p>
              <Link href="/booking" className="text-pastel-600 font-semibold text-sm hover:underline flex items-center gap-1.5">
                <span>จองบริการฉุกเฉิน (Wizard 4 สเต็ป)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="hidden sm:flex bg-sky-50 border border-sky-100 w-16 h-16 rounded-2xl items-center justify-center text-sky-600 font-extrabold text-xl">
              24H
            </div>
          </div>
        </div>
      </section>

      {/* 4. MARKETPLACE WITH SOH FILTERS */}
      <section id="marketplace" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-pastel-600 font-semibold text-sm tracking-wide uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>Aura EV Marketplace</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1">
                รถยนต์ไฟฟ้ามือสองคัดเกรดพิเศษ
              </h2>
              <p className="text-slate-500 mt-2 text-sm sm:text-base">
                โปร่งใส ชัดเจน แสดงค่าเปอร์เซ็นต์สุขภาพแบตเตอรี่ (State of Health - SoH) ทุกคัน
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="text-slate-400 text-sm">พบรถทั้งหมด {filteredCars.length} คัน</span>
            </div>
          </div>

          {/* SOH & Brand Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-8 bg-pastel-50/70 p-3 rounded-2xl border border-pastel-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2 flex items-center gap-1.5 pl-1">
              <SlidersHorizontal className="w-4 h-4 text-pastel-600" /> กรองตาม SOH:
            </span>
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedFilter === 'all'
                  ? 'bg-pastel-500 text-white shadow-md shadow-pastel-400/30'
                  : 'bg-white text-slate-600 hover:text-pastel-600 hover:bg-pastel-50 border border-pastel-200'
              }`}
            >
              ทั้งหมด (3 คัน)
            </button>
            <button
              onClick={() => setSelectedFilter('soh95')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedFilter === 'soh95'
                  ? 'bg-pastel-500 text-white shadow-md shadow-pastel-400/30'
                  : 'bg-white text-slate-600 hover:text-pastel-600 hover:bg-pastel-50 border border-pastel-200'
              }`}
            >
              ✨ แบต 95%+ (สภาพนางฟ้า)
            </button>
            <button
              onClick={() => setSelectedFilter('soh90')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedFilter === 'soh90'
                  ? 'bg-pastel-500 text-white shadow-md shadow-pastel-400/30'
                  : 'bg-white text-slate-600 hover:text-pastel-600 hover:bg-pastel-50 border border-pastel-200'
              }`}
            >
              🔋 แบต 90-94% (เกรดใช้งาน)
            </button>
            <div className="hidden sm:block h-5 w-[1px] bg-slate-200 mx-1"></div>
            <button
              onClick={() => setSelectedFilter('tesla')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedFilter === 'tesla'
                  ? 'bg-pastel-500 text-white shadow-md shadow-pastel-400/30'
                  : 'bg-white text-slate-600 hover:text-pastel-600 hover:bg-pastel-50 border border-pastel-200'
              }`}
            >
              Tesla
            </button>
            <button
              onClick={() => setSelectedFilter('byd')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedFilter === 'byd'
                  ? 'bg-pastel-500 text-white shadow-md shadow-pastel-400/30'
                  : 'bg-white text-slate-600 hover:text-pastel-600 hover:bg-pastel-50 border border-pastel-200'
              }`}
            >
              BYD
            </button>
            <button
              onClick={() => setSelectedFilter('ora')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedFilter === 'ora'
                  ? 'bg-pastel-500 text-white shadow-md shadow-pastel-400/30'
                  : 'bg-white text-slate-600 hover:text-pastel-600 hover:bg-pastel-50 border border-pastel-200'
              }`}
            >
              ORA Good Cat
            </button>
          </div>

          {/* Cars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <div
                key={car.key}
                onClick={() => setActiveModalCar(car)}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-pastel-300 card-glow transition-all duration-300 flex flex-col group cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-[16/10] bg-pastel-50">
                  <img
                    src={car.image}
                    alt={car.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                    <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-xl">
                      ปี {car.year}
                    </span>
                    <span className="bg-pastel-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-xl flex items-center gap-1 shadow-sm">
                      <CheckCircle className="w-3 h-3" /> ตรวจผ่าน 150 จุด
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-md border border-pastel-200 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-pastel-100 flex items-center justify-center text-pastel-600">
                      <BatteryCharging className="w-4 h-4 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold leading-none">Battery SoH</div>
                      <div className="text-sm font-extrabold text-pastel-700 leading-tight">
                        {car.soh}% <span className="text-[10px] font-medium text-slate-500">({car.sohLabel.split(' ')[0]})</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-pastel-700 bg-pastel-100 px-2.5 py-0.5 rounded-lg border border-pastel-200">
                        {car.brand}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {car.location}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mt-2 group-hover:text-pastel-600 transition-colors">
                      {car.title}
                    </h3>

                    <div className="mt-3 bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-pastel-400 to-pastel-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${car.soh}%` }}
                      ></div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 bg-pastel-50/70 border border-pastel-100/80 p-2 rounded-xl">
                        <Gauge className="w-4 h-4 text-pastel-500" />
                        <span>ไมล์ {car.mileage}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-pastel-50/70 border border-pastel-100/80 p-2 rounded-xl">
                        <Zap className="w-4 h-4 text-pastel-500" />
                        <span>วิ่งไกล {car.range}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">ราคาพิเศษ</span>
                      <span className="text-2xl font-black text-slate-900 tracking-tight">{car.price}</span>
                    </div>
                    <button className="px-4 py-2 bg-pastel-50 group-hover:bg-pastel-500 text-pastel-700 group-hover:text-white rounded-xl font-medium text-xs transition-all flex items-center gap-1.5">
                      <span>ดูรายงาน SoH</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AURA MOBILE SERVICE SECTION */}
      <section id="service" className="py-16 bg-[#f0f7ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-sky-900/40">
            <div className="absolute -right-24 -top-24 w-96 h-96 bg-pastel-400/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-sky-300/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs sm:text-sm font-semibold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
                  <span>Aura EV Rescue • บริการช่วยเหลือฉุกเฉิน 24 ชั่วโมง</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  รถแบตหมด? ขัดข้องกลางทาง? <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pastel-200 via-sky-300 to-pastel-400">
                    หน่วยบริการเคลื่อนที่ Aura Mobile Service พร้อมช่วย
                  </span>
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-light">
                  หมดกังวลเรื่องแบตเตอรี่ รถ Mobile Fast Charging ชาร์จไฟฉุกเฉินถึงจุดเกิดเหตุภายใน 30 นาที พร้อมทีมวิศวกรผู้เชี่ยวชาญระบบรถยนต์ไฟฟ้าแรงสูง
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-sm">
                    <div className="w-8 h-8 rounded-xl bg-pastel-400/20 flex items-center justify-center text-pastel-300">
                      <Zap className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-medium text-slate-200">ชาร์จไฟด่วนฉุกเฉิน</span>
                  </div>

                  <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-sm">
                    <div className="w-8 h-8 rounded-xl bg-pastel-400/20 flex items-center justify-center text-pastel-300">
                      <Truck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-medium text-slate-200">รถสไลด์เฉพาะทาง EV</span>
                  </div>

                  <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-sm">
                    <div className="w-8 h-8 rounded-xl bg-pastel-400/20 flex items-center justify-center text-pastel-300">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-medium text-slate-200">ตรวจระบบไฟ & SoH</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-3xl border border-white/15 p-6 sm:p-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-pastel-400/20 border border-pastel-300/30 text-pastel-300 flex items-center justify-center mx-auto shadow-inner">
                  <PhoneOutgoing className="w-8 h-8 animate-bounce" />
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-pastel-300 font-bold">สายด่วนฉุกเฉิน Aura EV ทั่วประเทศ</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
                    02-999-AURA
                  </div>
                  <span className="text-xs text-slate-400 mt-1 block">หรือ 089-123-4567 (โทรฟรีตลอด 24 ชม.)</span>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleEmergencyDispatch}
                    className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-pastel-400 to-sky-300 hover:from-pastel-500 hover:to-sky-400 text-slate-950 font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-pastel-400/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <Navigation className="w-5 h-5" />
                    <span>แชร์ตำแหน่ง GPS เรียกช่างทันที</span>
                  </button>
                  <p className="text-[11px] text-slate-400">ระบบจะค้นหาหน่วยรถช่าง Mobile Service ที่ใกล้คุณที่สุดโดยอัตโนมัติ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer id="about" className="bg-white border-t border-pastel-100 text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pastel-500 to-sky-400 flex items-center justify-center text-white shadow-sm">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-slate-900">
                  Aura <span className="text-pastel-500">EV</span>
                </span>
              </div>
              <p className="text-slate-500 text-sm max-w-sm leading-relaxed font-light">
                แพลตฟอร์มตลาดรถยนต์ไฟฟ้ามือสองคัดเกรด ตรวจเช็กสุขภาพแบตเตอรี่ (SoH) รายแรกในไทย พร้อมเครือข่ายศูนย์บริการเคลื่อนที่ฉุกเฉินครบวงจร
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">เมนูหลัก</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#home" className="hover:text-pastel-600 transition-colors">หน้าแรก</a></li>
                <li><a href="#marketplace" className="hover:text-pastel-600 transition-colors">ตลาดรถ EV มือสอง</a></li>
                <li><a href="#service" className="hover:text-pastel-600 transition-colors">เรียกช่างซ่อมฉุกเฉิน</a></li>
                <li><a href="#" className="hover:text-pastel-600 transition-colors">ตรวจสุขภาพแบตเตอรี่ SoH</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">ติดต่อเรา</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-pastel-500" />
                  <span>contact@aura-ev.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-pastel-500" />
                  <span>บริการช่วยเหลือ 24 ชม. ทุกวัน</span>
                </li>
              </ul>
              <div className="flex gap-2.5 mt-4">
                <a href="#" className="w-9 h-9 rounded-xl bg-pastel-50 flex items-center justify-center text-slate-500 hover:bg-pastel-100 hover:text-pastel-700 transition">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-xl bg-pastel-50 flex items-center justify-center text-slate-500 hover:bg-pastel-100 hover:text-pastel-700 transition">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-xl bg-pastel-50 flex items-center justify-center text-slate-500 hover:bg-pastel-100 hover:text-pastel-700 transition">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
            <p>© 2026 Aura EV Platform. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">เงื่อนไขการใช้งาน</a>
              <a href="#" className="hover:underline">นโยบายความเป็นส่วนตัว</a>
              <a href="#" className="hover:underline">มาตรฐานการตรวจเช็ก SoH</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 7. CAR DETAILS & SOH REPORT MODAL */}
      {activeModalCar && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveModalCar(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-pastel-200 relative my-8 animate-car-entrance overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalCar(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-2xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 flex items-center justify-center transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-100 mb-6 border border-slate-100">
              <img src={activeModalCar.image} alt={activeModalCar.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-xl">
                  {activeModalCar.brand}
                </span>
                <span className="bg-pastel-500 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-sm">
                  ปี {activeModalCar.year}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-xs text-slate-600 flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-pastel-600" />
                <span>{activeModalCar.location}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{activeModalCar.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">ผ่านการรับรองมาตรฐานการตรวจเช็ก 150 จุดโดยวิศวกร Aura EV</p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-2xl font-black text-slate-900">{activeModalCar.price}</div>
                <div className="text-xs text-pastel-600 font-semibold">{activeModalCar.installment}</div>
              </div>
            </div>

            {/* In-depth Battery Health Diagnostic Report */}
            <div className="my-5 bg-gradient-to-br from-pastel-50/80 to-sky-50/40 border border-pastel-200/80 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-pastel-500 text-white flex items-center justify-center shadow-sm">
                    <BatteryCharging className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-none">
                      Diagnostic Result
                    </span>
                    <h4 className="text-sm font-black text-slate-900 mt-0.5">รายงานสุขภาพแบตเตอรี่เชิงลึก (Battery SoH)</h4>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-pastel-600">{activeModalCar.soh}%</span>
                  <span className="block text-[10px] font-bold text-slate-500">{activeModalCar.sohLabel}</span>
                </div>
              </div>

              <div className="w-full bg-white rounded-full h-3 p-0.5 border border-pastel-200 mb-4 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-pastel-400 via-sky-400 to-pastel-500 transition-all duration-700"
                  style={{ width: `${activeModalCar.soh}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-slate-700">
                <div className="bg-white p-2.5 rounded-xl border border-pastel-100">
                  <span className="text-[10px] text-slate-400 block">ความจุแบตเตอรี่</span>
                  <span className="font-bold text-slate-900">{activeModalCar.batteryCap}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-pastel-100">
                  <span className="text-[10px] text-slate-400 block">ระยะทางต่อชาร์จ</span>
                  <span className="font-bold text-slate-900">{activeModalCar.range}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-pastel-100">
                  <span className="text-[10px] text-slate-400 block">เลขไมล์สะสม</span>
                  <span className="font-bold text-slate-900">{activeModalCar.mileage}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-pastel-100">
                  <span className="text-[10px] text-slate-400 block">ความสมดุลเซลล์ (ΔV)</span>
                  <span className="font-bold text-emerald-600">{activeModalCar.cellBalance}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-pastel-100/80 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">ชนิดแบตเตอรี่:</span>
                  <span className="font-medium text-slate-800">{activeModalCar.batteryType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">การรับประกันศูนย์:</span>
                  <span className="font-medium text-slate-800">{activeModalCar.warranty}</span>
                </div>
              </div>
            </div>

            {/* Checkmarks */}
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-6">
              <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl">
                <CheckCircle className="w-4 h-4 text-pastel-500" />
                <span>ระบบมอเตอร์และเกียร์ไฟฟ้า: ผ่าน</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl">
                <CheckCircle className="w-4 h-4 text-pastel-500" />
                <span>ระบบสายไฟแรงดันสูง: สมบูรณ์ 100%</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl">
                <CheckCircle className="w-4 h-4 text-pastel-500" />
                <span>ระบบหล่อเย็นแบตเตอรี่: ไร้รอยรั่วซึม</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl">
                <CheckCircle className="w-4 h-4 text-pastel-500" />
                <span>การันตีตัวถังไร้ชนหนักหรือน้ำท่วม</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  alert('✅ บันทึกนัดหมายทดลองขับเรียบร้อย เจ้าหน้าที่จะติดต่อกลับยืนยันคิวภายใน 15 นาที');
                  setActiveModalCar(null);
                }}
                className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-pastel-500 to-sky-400 hover:from-pastel-600 hover:to-sky-500 text-white font-bold text-sm shadow-md shadow-pastel-400/30 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>นัดหมายทดลองขับคันนี้</span>
              </button>
              <button
                onClick={() => alert('📄 กำลังสร้างใบรับรองผลตรวจสุขภาพแบตเตอรี่ SoH และรายงาน 150 จุดฉบับเต็ม (PDF)...')}
                className="py-3 px-5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-pastel-500" />
                <span>ดาวน์โหลดใบรายงาน SoH (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
