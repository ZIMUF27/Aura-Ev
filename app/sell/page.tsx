'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Car,
  BatteryCharging,
  Zap,
  Camera,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  ShieldCheck,
  Sparkles,
  Info,
  MapPin,
  Gauge,
  Phone,
  User,
  Upload,
  AlertCircle
} from 'lucide-react';

export default function SellCarPage() {
  const [submitted, setSubmitted] = useState(false);

  // Form States
  const [brand, setBrand] = useState('Tesla');
  const [model, setModel] = useState('Model 3 Long Range');
  const [year, setYear] = useState('2023');
  const [mileage, setMileage] = useState('22,000');
  const [price, setPrice] = useState('1,190,000');
  const [installment, setInstallment] = useState('18,500');
  const [location, setLocation] = useState('กรุงเทพฯ');
  const [soh, setSoh] = useState('97');
  const [batteryCap, setBatteryCap] = useState('78.1');
  const [range, setRange] = useState('576');
  const [needInspection, setNeedInspection] = useState(true);
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [photoCount, setPhotoCount] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellerName || !sellerPhone) {
      alert('กรุณากรอกชื่อและเบอร์โทรศัพท์ผู้ลงประกาศ');
      return;
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-800 pb-20">
      
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-pastel-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pastel-500 to-sky-400 flex items-center justify-center text-white shadow-sm">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">
              AURA <span className="text-pastel-500">EV</span>
            </span>
          </Link>
          <div className="flex items-center gap-3 text-xs font-semibold">
            <Link href="/" className="text-slate-500 hover:text-pastel-600 transition">
              หน้าแรก
            </Link>
            <span className="text-slate-300">/</span>
            <span className="bg-pastel-100 text-pastel-700 px-3 py-1 rounded-full border border-pastel-200">
              ลงประกาศขายรถ EV
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">

        {/* Success Screen */}
        {submitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-pastel-100/60 border border-pastel-200 text-center animate-car-entrance max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 border-4 border-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="inline-block bg-pastel-50 text-pastel-700 text-xs font-bold px-3 py-1 rounded-lg border border-pastel-200 mb-2">
              หมายเลขประกาศ: AURA-CAR-9184
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              ส่งข้อมูลลงประกาศขายสำเร็จ!
            </h2>

            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              ทีมงาน Aura EV ได้รับข้อมูล {brand} {model} เรียบร้อยแล้ว เจ้าหน้าที่จะติดต่อกลับที่เบอร์ {sellerPhone} ภายใน 2 ชั่วโมงเพื่อยืนยันข้อมูลและนัดหมายส่งทีมช่างเข้าตรวจสุขภาพแบตเตอรี่ (SoH Certificate)
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-pastel-500 to-sky-400 hover:from-pastel-600 hover:to-sky-500 text-white font-bold text-sm shadow-md shadow-pastel-400/30 transition-all flex items-center justify-center gap-2"
              >
                <span>กลับสู่หน้าแรก</span>
              </Link>
              <button
                onClick={() => setSubmitted(false)}
                className="py-3 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 transition-all"
              >
                ลงประกาศคันอื่นเพิ่ม
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-100 text-pastel-700 border border-pastel-200 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-pastel-500" />
                <span>Sell Your EV • แพลตฟอร์มขายรถไฟฟ้าอันดับ 1</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                ลงประกาศขายรถยนต์ไฟฟ้าของคุณ
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-1.5 max-w-lg mx-auto">
                ขายง่าย ได้ราคา พร้อมบริการออกใบรับรองตรวจสุขภาพแบตเตอรี่ (SoH) ฟรีถึงหน้าบ้านเพื่อเพิ่มความน่าเชื่อถือ
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT: FORM FIELDS */}
              <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-pastel-100/50 border border-pastel-200 space-y-6">
                
                {/* 1. Vehicle Details */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
                    <Car className="w-5 h-5 text-pastel-500" /> 1. ข้อมูลรถยนต์ไฟฟ้า
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">ยี่ห้อ (Brand):</label>
                      <select
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-pastel-500"
                      >
                        <option value="Tesla">Tesla</option>
                        <option value="BYD">BYD</option>
                        <option value="GWM">GWM (ORA)</option>
                        <option value="MG">MG</option>
                        <option value="AION">GAC AION</option>
                        <option value="Volvo">Volvo</option>
                        <option value="Other">ยี่ห้ออื่นๆ</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">รุ่นรถยนต์ (Model):</label>
                      <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="เช่น Model 3, ATTO 3"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-pastel-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">ปีที่จดทะเบียน (Year):</label>
                      <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-pastel-500"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">เลขไมล์สะสม (กม.):</label>
                      <input
                        type="text"
                        value={mileage}
                        onChange={(e) => setMileage(e.target.value)}
                        placeholder="เช่น 22,000"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-pastel-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Battery & SoH */}
                <div className="pt-2 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
                    <BatteryCharging className="w-5 h-5 text-pastel-500" /> 2. ข้อมูลแบตเตอรี่ & สุขภาพ (SoH)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">ความจุแบตเตอรี่ (kWh):</label>
                      <input
                        type="text"
                        value={batteryCap}
                        onChange={(e) => setBatteryCap(e.target.value)}
                        placeholder="เช่น 60.48"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-pastel-500"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">ระยะทางต่อชาร์จ (กม.):</label>
                      <input
                        type="text"
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                        placeholder="เช่น 480"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-pastel-500"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">สุขภาพแบตเตอรี่ SoH (%):</label>
                      <input
                        type="number"
                        min="50"
                        max="100"
                        value={soh}
                        onChange={(e) => setSoh(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-pastel-600 focus:outline-none focus:border-pastel-500"
                      />
                    </div>
                  </div>

                  <div className="bg-pastel-50 border border-pastel-200 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer" onClick={() => setNeedInspection(!needInspection)}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={needInspection}
                        onChange={() => {}}
                        className="w-4 h-4 text-pastel-600 rounded accent-pastel-500"
                      />
                      <span className="text-xs font-bold text-slate-800">
                        ต้องการให้ทีมช่าง Aura EV เข้าตรวจสุขภาพแบตเตอรี่ (ออกใบรับรอง SoH Certificate ถึงบ้าน)
                      </span>
                    </div>
                    <span className="text-[11px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">ฟรี!</span>
                  </div>
                </div>

                {/* 3. Pricing */}
                <div className="pt-2 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
                    <DollarSign className="w-5 h-5 text-pastel-500" /> 3. ราคาและทำเลที่ตั้ง
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">ราคาตั้งขาย (บาท):</label>
                      <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="เช่น 850,000"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-black text-slate-900 focus:outline-none focus:border-pastel-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">จังหวัดที่ดูรถได้:</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="เช่น กรุงเทพฯ, นนทบุรี"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-pastel-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Photos */}
                <div className="pt-2 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-2">
                    <Camera className="w-5 h-5 text-pastel-500" /> 4. รูปภาพรถยนต์
                  </h3>
                  <div className="border-2 border-dashed border-pastel-200 hover:border-pastel-400 bg-pastel-50/30 rounded-2xl p-5 text-center cursor-pointer transition">
                    <Upload className="w-6 h-6 text-pastel-500 mx-auto mb-1.5" />
                    <span className="text-xs font-bold text-slate-700 block">อัปโหลดรูปภาพรอบคัน (อย่างน้อย 3 รูป)</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">หน้ารถ, ท้ายรถ, ห้องโดยสาร, หน้าปัดแสดง % แบต</span>
                    <span className="mt-2 inline-block bg-white border border-pastel-200 text-pastel-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                      แนบแล้ว {photoCount} รูป
                    </span>
                  </div>
                </div>

                {/* 5. Contact Info */}
                <div className="pt-2 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
                    <User className="w-5 h-5 text-pastel-500" /> 5. ข้อมูลผู้ลงประกาศ
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">ชื่อผู้ขาย / เบอร์ติดต่อ:</label>
                      <input
                        type="text"
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                        placeholder="ระบุชื่อของคุณ"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-pastel-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">เบอร์โทรศัพท์มือถือ:</label>
                      <input
                        type="tel"
                        value={sellerPhone}
                        onChange={(e) => setSellerPhone(e.target.value)}
                        placeholder="เช่น 089-123-4567"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-pastel-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pastel-500 to-sky-400 hover:from-pastel-600 hover:to-sky-500 text-white font-bold text-sm shadow-lg shadow-pastel-400/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>ส่งข้อมูลเพื่อลงประกาศขายทันที</span>
                </button>

              </form>

              {/* RIGHT: REAL-TIME CARD PREVIEW */}
              <div className="lg:col-span-5 sticky top-24 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">ตัวอย่างประกาศแบบเรียลไทม์ (Live Preview)</span>
                  <span className="text-[10px] bg-pastel-100 text-pastel-700 font-bold px-2 py-0.5 rounded-full">อัปเดตอัตโนมัติ</span>
                </div>

                {/* Car Card Preview */}
                <div className="bg-white rounded-3xl overflow-hidden border border-pastel-200 shadow-xl shadow-pastel-100/60 flex flex-col">
                  <div className="relative overflow-hidden aspect-[16/10] bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80"
                      alt="Car Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-lg">
                        ปี {year}
                      </span>
                      <span className="bg-pastel-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> รอการรับรอง 150 จุด
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-md border border-pastel-200 flex items-center gap-1.5">
                      <BatteryCharging className="w-4 h-4 text-pastel-600 animate-pulse" />
                      <div>
                        <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold leading-none">Battery SoH</div>
                        <div className="text-xs font-black text-pastel-700 leading-tight">{soh}%</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-pastel-700 bg-pastel-100 px-2 py-0.5 rounded-md">
                          {brand}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {location}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mt-1.5 line-clamp-1">
                        {brand} {model}
                      </h4>

                      <div className="mt-2.5 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-pastel-400 to-pastel-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, Math.max(0, parseInt(soh) || 0))}%` }}
                        ></div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-3 text-[11px] text-slate-600">
                        <div className="flex items-center gap-1 bg-pastel-50/70 p-1.5 rounded-lg border border-pastel-100">
                          <Gauge className="w-3.5 h-3.5 text-pastel-500" />
                          <span>ไมล์ {mileage} กม.</span>
                        </div>
                        <div className="flex items-center gap-1 bg-pastel-50/70 p-1.5 rounded-lg border border-pastel-100">
                          <Zap className="w-3.5 h-3.5 text-pastel-500" />
                          <span>วิ่งไกล {range} กม.</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block">ราคาตั้งขาย</span>
                        <span className="text-xl font-black text-slate-900">฿{price}</span>
                      </div>
                      <span className="text-xs font-bold text-pastel-600 bg-pastel-50 px-2.5 py-1 rounded-lg">
                        พร้อมส่งมอบ
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 text-xs text-sky-900 space-y-1.5">
                  <span className="font-bold flex items-center gap-1.5 text-sky-800">
                    <Info className="w-4 h-4 text-sky-600" /> ทำไมต้องขายกับ Aura EV?
                  </span>
                  <p className="text-[11px] text-sky-700 leading-relaxed">
                    มีผู้ค้นหารถ EV มือสองกว่า 50,000 คนต่อเดือน พร้อมระบบการันตีสุขภาพแบตเตอรี่ช่วยให้คุณปิดการขายได้เร็วกว่าตลาดทั่วไป 2 เท่า
                  </p>
                </div>

              </div>

            </div>
          </>
        )}

      </main>
    </div>
  );
}
