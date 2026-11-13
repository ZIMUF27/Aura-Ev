'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Wrench,
  Truck,
  BatteryCharging,
  Zap,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Car,
  AlertCircle,
  Upload,
  ShieldCheck,
  FileText,
  Phone,
  User,
  Navigation,
  Sparkles,
  ChevronRight,
  Receipt,
  Info,
  Cpu
} from 'lucide-react';

export default function BookingWizardPage() {
  const [step, setStep] = useState(1);

  // Form State
  const [serviceType, setServiceType] = useState<'mobile' | 'center'>('mobile');
  const [serviceCategory, setServiceCategory] = useState('emergency');
  
  // Step 2 State
  const [carBrand, setCarBrand] = useState('Tesla');
  const [carModel, setCarModel] = useState('Model Y');
  const [plateNumber, setPlateNumber] = useState('3ขก 4521 กทม.');
  const [issueType, setIssueType] = useState('battery_dead');
  const [issueNote, setIssueNote] = useState('');
  const [photoUploaded, setPhotoUploaded] = useState(false);

  // Step 3 State
  const [branch, setBranch] = useState('rama9');
  const [bookingDate, setBookingDate] = useState('2026-11-15');
  const [bookingTime, setBookingTime] = useState('10:30');
  const [gpsLocation, setGpsLocation] = useState('13.7563, 100.5018 (แยกอโศก-สุขุมวิท, กรุงเทพฯ)');
  const [gpsActive, setGpsActive] = useState(true);

  // Step 4 State
  const [contactName, setContactName] = useState('คุณสมชาย ธนากุล');
  const [contactPhone, setContactPhone] = useState('089-123-4567');
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  // Cost Estimation Calculator
  const calculateEstimate = () => {
    let base = serviceType === 'mobile' ? 500 : 300;
    if (issueType === 'battery_dead') base += 800; // Mobile Fast Charging
    if (issueType === 'charging_fault') base += 600;
    if (issueType === 'soh_test') base += 1200;
    if (issueType === 'tire') base += 450;
    return base;
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Complete booking
      const generatedCode = 'AURA-BK-' + Math.floor(1000 + Math.random() * 9000);
      setBookingId(generatedCode);
      setBookingCompleted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const detectGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsLocation(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)} (ตรวจจับพิกัดปัจจุบันแล้ว)`);
          setGpsActive(true);
        },
        () => {
          setGpsLocation('13.7469, 100.5349 (สยามพารากอน, กรุงเทพฯ)');
          setGpsActive(true);
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-800 pb-20">
      
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-pastel-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pastel-500 to-sky-400 flex items-center justify-center text-white shadow-sm">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">
              AURA <span className="text-pastel-500">EV</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="hidden sm:inline">ระบบจองคิวและเรียกรถช่าง</span>
            <span className="bg-pastel-100 text-pastel-700 px-2.5 py-1 rounded-full border border-pastel-200">
              Booking Wizard
            </span>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">

        {/* Success Screen */}
        {bookingCompleted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-pastel-100/60 border border-pastel-200 text-center animate-car-entrance max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 border-4 border-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="inline-block bg-pastel-50 text-pastel-700 text-xs font-bold px-3 py-1 rounded-lg border border-pastel-200 mb-2">
              รหัสการจอง: {bookingId}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {serviceType === 'mobile' ? 'แจ้งเรียกรถช่างฉุกเฉินสำเร็จ!' : 'บันทึกการจองคิวสำเร็จ!'}
            </h2>

            <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto leading-relaxed">
              {serviceType === 'mobile'
                ? 'หน่วยบริการ Aura Mobile Service กำลังจัดเตรียมรถช่างและเครื่องชาร์จด่วน ช่างจะโทรติดต่อกลับภายใน 3-5 นาที'
                : `ระบบได้ส่งการยืนยันการจองคิวศูนย์บริการไปยังเบอร์ ${contactPhone} เรียบร้อยแล้ว`}
            </p>

            {/* Summary Ticket */}
            <div className="mt-8 bg-pastel-50/70 border border-pastel-200 rounded-2xl p-5 text-left text-xs sm:text-sm space-y-2.5 text-slate-700">
              <div className="flex justify-between pb-2 border-b border-pastel-100">
                <span className="text-slate-400">ประเภทบริการ:</span>
                <span className="font-bold text-slate-900">{serviceType === 'mobile' ? '🚨 ช่างฉุกเฉินนอกสถานที่ (Mobile Service)' : '🏢 เข้าศูนย์บริการ Aura EV Hub'}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-pastel-100">
                <span className="text-slate-400">รถยนต์ที่เข้ารับบริการ:</span>
                <span className="font-bold text-slate-900">{carBrand} {carModel} ({plateNumber})</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-pastel-100">
                <span className="text-slate-400">สถานที่ / สาขา:</span>
                <span className="font-bold text-slate-900">{serviceType === 'mobile' ? gpsLocation : 'สาขาพระราม 9'}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-pastel-100">
                <span className="text-slate-400">วันและเวลานัดหมาย:</span>
                <span className="font-bold text-pastel-700">{serviceType === 'mobile' ? 'ทันที (ด่วนที่สุดใน 30 นาที)' : `${bookingDate} เวลา ${bookingTime} น.`}</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-black text-slate-900">
                <span>ประมาณการค่าใช้จ่ายเบื้องต้น:</span>
                <span className="text-pastel-600 text-base">฿{calculateEstimate().toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-pastel-500 to-sky-400 hover:from-pastel-600 hover:to-sky-500 text-white font-bold text-sm shadow-md shadow-pastel-400/30 transition-all flex items-center justify-center gap-2"
              >
                <span>กลับหน้าหลัก</span>
              </Link>
              <button
                onClick={() => alert(`📡 กำลังเปิดระบบแผนที่ติดตามสดรถช่างฉุกเฉิน (หมายเลขตั๋ว: ${bookingId})...`)}
                className="py-3 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 transition-all flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4 text-pastel-500" />
                <span>ติดตามสถานะรถช่าง (Live Track)</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header Titles */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-100 text-pastel-700 border border-pastel-200 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-pastel-500" />
                <span>ขั้นตอนการจองบริการและเรียกช่าง</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                จองคิวซ่อมบำรุง & เรียกหน่วยช่วยเหลือฉุกเฉิน
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-1.5">
                สะดวก รวดเร็ว พร้อมระบบประเมินค่าใช้จ่ายเบื้องต้นแบบโปร่งใส 100%
              </p>
            </div>

            {/* Stepper Progress Bar */}
            <div className="mb-10 max-w-2xl mx-auto">
              <div className="grid grid-cols-4 relative">
                
                {/* Connecting Track Line */}
                <div className="absolute top-5 left-1/8 right-1/8 h-1 bg-slate-200 -z-0">
                  <div
                    className="h-full bg-gradient-to-r from-pastel-400 to-sky-500 transition-all duration-500"
                    style={{ width: `${((step - 1) / 3) * 100}%` }}
                  ></div>
                </div>

                {/* Step 1 */}
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-all ${
                      step >= 1
                        ? 'bg-pastel-500 text-white shadow-md shadow-pastel-400/30'
                        : 'bg-white text-slate-400 border border-slate-200'
                    }`}
                  >
                    1
                  </div>
                  <span className={`text-[11px] font-semibold mt-1.5 text-center ${step >= 1 ? 'text-pastel-700' : 'text-slate-400'}`}>
                    ประเภทบริการ
                  </span>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-all ${
                      step >= 2
                        ? 'bg-pastel-500 text-white shadow-md shadow-pastel-400/30'
                        : 'bg-white text-slate-400 border border-slate-200'
                    }`}
                  >
                    2
                  </div>
                  <span className={`text-[11px] font-semibold mt-1.5 text-center ${step >= 2 ? 'text-pastel-700' : 'text-slate-400'}`}>
                    ข้อมูลรถ & อาการ
                  </span>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-all ${
                      step >= 3
                        ? 'bg-pastel-500 text-white shadow-md shadow-pastel-400/30'
                        : 'bg-white text-slate-400 border border-slate-200'
                    }`}
                  >
                    3
                  </div>
                  <span className={`text-[11px] font-semibold mt-1.5 text-center ${step >= 3 ? 'text-pastel-700' : 'text-slate-400'}`}>
                    พิกัด / วันเวลา
                  </span>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-all ${
                      step >= 4
                        ? 'bg-pastel-500 text-white shadow-md shadow-pastel-400/30'
                        : 'bg-white text-slate-400 border border-slate-200'
                    }`}
                  >
                    4
                  </div>
                  <span className={`text-[11px] font-semibold mt-1.5 text-center ${step >= 4 ? 'text-pastel-700' : 'text-slate-400'}`}>
                    ยืนยันการจอง
                  </span>
                </div>

              </div>
            </div>

            {/* Wizard Form Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-pastel-100/50 border border-pastel-100">

              {/* STEP 1: SELECT SERVICE TYPE */}
              {step === 1 && (
                <div className="space-y-6 animate-car-entrance">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">ขั้นตอนที่ 1: เลือกรูปแบบการรับบริการ</h3>
                    <p className="text-xs text-slate-500 mt-1">เลือกได้ทั้งแบบเรียกหน่วยเคลื่อนที่ไปหาคุณ หรือจองคิวเข้าตรวจที่ศูนย์</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Option A: Mobile Service */}
                    <div
                      onClick={() => setServiceType('mobile')}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                        serviceType === 'mobile'
                          ? 'border-pastel-500 bg-pastel-50/60 shadow-md shadow-pastel-400/20'
                          : 'border-slate-200 hover:border-pastel-300 bg-white'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-pastel-500 text-white flex items-center justify-center mb-4 shadow-sm">
                        <Truck className="w-6 h-6" />
                      </div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-base text-slate-900">เรียกช่างนอกสถานที่ (Mobile Service)</h4>
                        <span className="text-[10px] bg-rose-100 text-rose-600 font-bold px-2 py-0.5 rounded-full">ด่วน 24 ชม.</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        รถ Mobile Fast Charging พร้อมชาร์จไฟด่วนฉุกเฉิน, รถสไลด์เฉพาะทาง EV, หรือตรวจเช็กระบบไฟนอกสถานที่ถึงที่ใน 30 นาที
                      </p>
                      <div className="mt-4 pt-3 border-t border-pastel-200/60 flex items-center gap-1.5 text-xs text-pastel-700 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-pastel-500" />
                        <span>เหมาะสำหรับ: รถแบตหมด, ยางรั่ว, ขัดข้องกลางทาง</span>
                      </div>
                    </div>

                    {/* Option B: In-Shop Service */}
                    <div
                      onClick={() => setServiceType('center')}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                        serviceType === 'center'
                          ? 'border-pastel-500 bg-pastel-50/60 shadow-md shadow-pastel-400/20'
                          : 'border-slate-200 hover:border-pastel-300 bg-white'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4">
                        <Wrench className="w-6 h-6" />
                      </div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-base text-slate-900">เข้าศูนย์บริการ (Aura EV Hub)</h4>
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">จองคิวล่วงหน้า</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        นำรถเข้าตรวจเช็กละเอียด 150 จุด, ตรวจสุขภาพแบตเตอรี่ (SoH Report), เปลี่ยนถ่ายของเหลวระบบหล่อเย็น หรือซ่อมบำรุงตามระยะ
                      </p>
                      <div className="mt-4 pt-3 border-t border-pastel-200/60 flex items-center gap-1.5 text-xs text-sky-700 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-sky-500" />
                        <span>เหมาะสำหรับ: ตรวจสุขภาพแบต, เช็กระยะ, เปลี่ยนอะไหล่</span>
                      </div>
                    </div>
                  </div>

                  {/* Select Category Grid */}
                  <div className="pt-2">
                    <label className="text-xs font-bold text-slate-700 block mb-2">กลุ่มบริการที่ต้องการ:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      {[
                        { id: 'emergency', label: 'ชาร์จด่วนฉุกเฉิน', icon: Zap },
                        { id: 'battery', label: 'ตรวจสุขภาพแบต SoH', icon: BatteryCharging },
                        { id: 'electrical', label: 'ระบบไฟฟ้า & แอร์', icon: Cpu },
                        { id: 'maintenance', label: 'เช็กระยะ 150 จุด', icon: ShieldCheck },
                      ].map((cat) => {
                        const Icon = cat.icon;
                        const isSelected = serviceCategory === cat.id;
                        return (
                          <div
                            key={cat.id}
                            onClick={() => setServiceCategory(cat.id)}
                            className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition ${
                              isSelected
                                ? 'bg-pastel-500 text-white border-pastel-500 font-semibold shadow-sm'
                                : 'bg-slate-50 hover:bg-pastel-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{cat.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: VEHICLE & ISSUE DIAGNOSIS */}
              {step === 2 && (
                <div className="space-y-6 animate-car-entrance">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">ขั้นตอนที่ 2: ระบุข้อมูลรถยนต์ และอาการเสีย</h3>
                    <p className="text-xs text-slate-500 mt-1">ช่วยให้ช่างจัดเตรียมเครื่องมือและอุปกรณ์ตรงรุ่นล่วงหน้า</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">ยี่ห้อรถยนต์ (Brand):</label>
                      <select
                        value={carBrand}
                        onChange={(e) => setCarBrand(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium focus:outline-none focus:border-pastel-500"
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
                      <label className="text-xs font-bold text-slate-700 block mb-1">รุ่นรถยนต์ (Model):</label>
                      <input
                        type="text"
                        value={carModel}
                        onChange={(e) => setCarModel(e.target.value)}
                        placeholder="เช่น Model Y, ATTO 3"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium focus:outline-none focus:border-pastel-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">ทะเบียนรถ (Plate No.):</label>
                      <input
                        type="text"
                        value={plateNumber}
                        onChange={(e) => setPlateNumber(e.target.value)}
                        placeholder="เช่น 3ขก 4521 กทม."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium focus:outline-none focus:border-pastel-500"
                      />
                    </div>
                  </div>

                  {/* Issue Type Selector */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-2">อาการขัดข้องหลัก:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {[
                        { id: 'battery_dead', title: '🔋 แบตเตอรี่หมดกลางทาง (0%)', desc: 'ต้องการชาร์จไฟด่วนเคลื่อนที่ฉุกเฉิน' },
                        { id: 'charging_fault', title: '🔌 ชาร์จไฟไม่เข้า / ตู้ตัดไฟ', desc: 'พอร์ตชาร์จขัดข้อง หรือมีสัญญาณเตือนไฟแดง' },
                        { id: 'soh_test', title: '📊 นัดตรวจสุขภาพแบตเตอรี่ (SoH)', desc: 'ต้องการใบรับรองผลตรวจสมบูรณ์ 100%' },
                        { id: 'tire', title: '🛞 ยางรั่ว / ลมยางเตือนผิดปกติ', desc: 'ต้องการปะยางหรือเปลี่ยนล้ออะไหล่ EV' },
                      ].map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setIssueType(item.id)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                            issueType === item.id
                              ? 'border-pastel-500 bg-pastel-50/70 shadow-sm'
                              : 'border-slate-200 hover:border-pastel-200 bg-white'
                          }`}
                        >
                          <span className="font-bold text-slate-900 block">{item.title}</span>
                          <span className="text-[11px] text-slate-500 mt-0.5 block">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Note & Photo Upload Mock */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">รายละเอียดเพิ่มเติม / อาการบนหน้าปัดรถ:</label>
                    <textarea
                      rows={2}
                      value={issueNote}
                      onChange={(e) => setIssueNote(e.target.value)}
                      placeholder="เช่น มีข้อความแจ้งเตือน 'High Voltage System Fault' หรือขับอยู่แล้วความเร็วตก..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:border-pastel-500"
                    />
                  </div>

                  {/* Photo Upload Zone */}
                  <div
                    onClick={() => setPhotoUploaded(!photoUploaded)}
                    className="border-2 border-dashed border-pastel-200 hover:border-pastel-400 bg-pastel-50/40 rounded-2xl p-4 text-center cursor-pointer transition"
                  >
                    <Upload className="w-5 h-5 text-pastel-600 mx-auto mb-1" />
                    <span className="text-xs font-semibold text-slate-700 block">
                      {photoUploaded ? '✅ แนบรูปภาพ 1 รูปแล้ว (คลิกเพื่อเปลี่ยน)' : 'แนบรูปภาพหน้าปัด หรือจุดที่ขัดข้อง (ถ้ามี)'}
                    </span>
                    <span className="text-[10px] text-slate-400">รองรับไฟล์ JPG, PNG สูงสุด 10MB</span>
                  </div>
                </div>
              )}

              {/* STEP 3: LOCATION & SCHEDULE */}
              {step === 3 && (
                <div className="space-y-6 animate-car-entrance">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {serviceType === 'mobile' ? 'ขั้นตอนที่ 3: ระบุพิกัดสถานที่เกิดเหตุ' : 'ขั้นตอนที่ 3: เลือกสาขาและวันเวลานัดหมาย'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {serviceType === 'mobile' ? 'ระบบจะคำนวณระยะทางจากรถช่างที่อยู่ใกล้คุณที่สุด' : 'เลือกสาขาที่สะดวกนำรถเข้าตรวจ'}
                    </p>
                  </div>

                  {serviceType === 'mobile' ? (
                    /* Mobile Service Location Picker */
                    <div className="space-y-4">
                      <div className="bg-slate-100 rounded-2xl h-48 sm:h-56 relative overflow-hidden border border-slate-200 flex items-center justify-center">
                        {/* Map Mock Background */}
                        <div className="absolute inset-0 bg-[radial-gradient(#38b4f8_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
                        <div className="relative text-center z-10 px-4">
                          <div className="w-12 h-12 rounded-full bg-pastel-500 text-white flex items-center justify-center mx-auto mb-2 shadow-lg animate-bounce">
                            <MapPin className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold text-slate-800 bg-white/95 px-3 py-1 rounded-full shadow-sm border border-slate-200 block max-w-xs mx-auto truncate">
                            {gpsLocation}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 items-center">
                        <button
                          onClick={detectGPS}
                          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-pastel-500 hover:bg-pastel-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition"
                        >
                          <Navigation className="w-4 h-4" />
                          <span>ดึงพิกัด GPS ปัจจุบันของฉัน</span>
                        </button>
                        <span className="text-xs text-slate-400">หน่วยรถช่าง Mobile Van ที่ใกล้ที่สุดอยู่ห่างเพียง 4.2 กม. (พร้อมออกตัวทันที)</span>
                      </div>
                    </div>
                  ) : (
                    /* In-Shop Branch & Calendar Selector */
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">เลือกสาขา Aura EV Hub:</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          {[
                            { id: 'rama9', name: 'สาขาพระราม 9 (Flagship)', note: 'เปิดทุกวัน 08:30 - 18:30 น.' },
                            { id: 'ratchapruek', name: 'สาขาราชพฤกษ์', note: 'เปิดทุกวัน 08:30 - 18:30 น.' },
                            { id: 'bangna', name: 'สาขาบางนา กม.7', note: 'เปิดทุกวัน 08:30 - 18:30 น.' },
                            { id: 'pattaya', name: 'สาขาพัทยา (ชลบุรี)', note: 'เปิดทุกวัน 09:00 - 18:00 น.' },
                          ].map((b) => (
                            <div
                              key={b.id}
                              onClick={() => setBranch(b.id)}
                              className={`p-3 rounded-2xl border cursor-pointer transition ${
                                branch === b.id
                                  ? 'border-pastel-500 bg-pastel-50/70 shadow-sm font-semibold'
                                  : 'border-slate-200 bg-white hover:border-pastel-200'
                              }`}
                            >
                              <span className="text-slate-900 block">{b.name}</span>
                              <span className="text-[10px] text-slate-400 block">{b.note}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">เลือกวันที่ต้องการเข้าตรวจ:</label>
                          <input
                            type="date"
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-pastel-500"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">เลือกช่วงเวลา (Time Slot):</label>
                          <select
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-pastel-500"
                          >
                            <option value="09:00">09:00 - 10:30 น. (เช้า)</option>
                            <option value="10:30">10:30 - 12:00 น.</option>
                            <option value="13:00">13:00 - 14:30 น. (บ่าย)</option>
                            <option value="14:30">14:30 - 16:00 น.</option>
                            <option value="16:00">16:00 - 17:30 น.</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: SUMMARY & CONFIRMATION */}
              {step === 4 && (
                <div className="space-y-6 animate-car-entrance">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">ขั้นตอนที่ 4: สรุปข้อมูลและยืนยันการจอง</h3>
                    <p className="text-xs text-slate-500 mt-1">โปรดตรวจสอบรายละเอียดบริการและข้อมูลติดต่อก่อนกดยืนยัน</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Summary Box */}
                    <div className="lg:col-span-7 bg-pastel-50/70 border border-pastel-200 rounded-2xl p-5 text-xs sm:text-sm space-y-3">
                      <div className="flex justify-between items-center pb-2.5 border-b border-pastel-200">
                        <span className="text-slate-500">รูปแบบบริการ:</span>
                        <span className="font-bold text-slate-900">
                          {serviceType === 'mobile' ? '🚨 Mobile Service นอกสถานที่' : '🏢 เข้าศูนย์ Aura EV Hub'}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pb-2.5 border-b border-pastel-200">
                        <span className="text-slate-500">รถยนต์:</span>
                        <span className="font-bold text-slate-900">{carBrand} {carModel} ({plateNumber})</span>
                      </div>

                      <div className="flex justify-between items-center pb-2.5 border-b border-pastel-200">
                        <span className="text-slate-500">อาการเสีย / รายการ:</span>
                        <span className="font-bold text-pastel-700">
                          {issueType === 'battery_dead' && 'ชาร์จไฟด่วนฉุกเฉิน (0%)'}
                          {issueType === 'charging_fault' && 'ระบบชาร์จไฟขัดข้อง'}
                          {issueType === 'soh_test' && 'ตรวจสุขภาพแบตเตอรี่ SoH'}
                          {issueType === 'tire' && 'ยางรั่ว / ล้อขัดข้อง'}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pb-2.5 border-b border-pastel-200">
                        <span className="text-slate-500">พิกัด / นัดหมาย:</span>
                        <span className="font-bold text-slate-900 text-right truncate max-w-[200px]">
                          {serviceType === 'mobile' ? gpsLocation.split('(')[0] : `${bookingDate} (${bookingTime} น.)`}
                        </span>
                      </div>

                      {/* Estimator Price Breakdown */}
                      <div className="pt-2">
                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                          <span>ค่าบริการตรวจเช็กและเดินทางเบื้องต้น:</span>
                          <span>฿{calculateEstimate().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-pastel-200">
                          <span>ยอดประมาณการรวม:</span>
                          <span className="text-pastel-600 text-lg">฿{calculateEstimate().toLocaleString()}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-1">
                          * ชำระเงินหลังช่างเข้าดำเนินการเสร็จสิ้น (รองรับเงินสด, โอนผ่าน QR หรือบัตรเครดิต)
                        </span>
                      </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="lg:col-span-5 space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">ชื่อ-นามสกุล ผู้ติดต่อ:</label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="text"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="ระบุชื่อผู้ติดต่อ"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-pastel-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">เบอร์โทรศัพท์ (สำหรับช่างโทรหา):</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="tel"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            placeholder="เช่น 089-123-4567"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:border-pastel-500"
                          />
                        </div>
                      </div>

                      <div className="bg-sky-50 border border-sky-100 rounded-2xl p-3 flex items-start gap-2 text-xs text-sky-800">
                        <Info className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                        <span>เจ้าหน้าที่จะส่ง SMS รหัสติดตามงาน และมีช่างผู้เชี่ยวชาญโทรประสานงานก่อนเข้าถึงจุดหมาย</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Bottom Buttons Navigation */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    onClick={handlePrevStep}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs sm:text-sm transition flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>ย้อนกลับ</span>
                  </button>
                ) : (
                  <div></div>
                )}

                <button
                  onClick={handleNextStep}
                  className="px-7 py-3 rounded-2xl bg-gradient-to-r from-pastel-500 to-sky-400 hover:from-pastel-600 hover:to-sky-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-pastel-400/30 hover:scale-[1.02] active:scale-[0.98] transition flex items-center gap-2"
                >
                  <span>{step === 4 ? 'ยืนยันและส่งเรื่องทันที' : 'ถัดไป'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </>
        )}

      </main>
    </div>
  );
}
