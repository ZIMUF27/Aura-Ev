'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Scale,
  Zap,
  BatteryCharging,
  Gauge,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Trophy,
  Sparkles,
  Info,
  Calendar,
  DollarSign,
  Car,
  ChevronDown
} from 'lucide-react';

interface CarSpec {
  id: string;
  name: string;
  brand: string;
  year: number;
  price: string;
  installment: string;
  soh: number;
  sohGrade: string;
  range: string;
  accel: string;
  power: string;
  torque: string;
  drive: string;
  batteryCap: string;
  batteryType: string;
  fastCharge: string;
  v2l: boolean;
  warranty: string;
  image: string;
  highlight: string;
}

const availableCars: CarSpec[] = [
  {
    id: 'tesla-y',
    name: 'Tesla Model Y Long Range',
    brand: 'Tesla',
    year: 2023,
    price: '฿1,390,000',
    installment: '฿21,500/ด.',
    soh: 98,
    sohGrade: 'เกรด AAA',
    range: '533 กม.',
    accel: '4.8 วิ',
    power: '450 PS',
    torque: '493 Nm',
    drive: 'Dual Motor AWD',
    batteryCap: '75.0 kWh',
    batteryType: 'NMC Lithium-Ion',
    fastCharge: '27 นาที (250 kW)',
    v2l: false,
    warranty: 'เหลือ 6 ปี / 160,000 กม.',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    highlight: 'วิ่งไกลที่สุด & พละกำลังแรงสุด',
  },
  {
    id: 'byd-atto3',
    name: 'BYD ATTO 3 Extended',
    brand: 'BYD',
    year: 2023,
    price: '฿859,000',
    installment: '฿13,200/ด.',
    soh: 96,
    sohGrade: 'Blade Battery',
    range: '480 กม.',
    accel: '7.3 วิ',
    power: '204 PS',
    torque: '310 Nm',
    drive: 'ขับเคลื่อนล้อหน้า (FWD)',
    batteryCap: '60.48 kWh',
    batteryType: 'BYD Blade LFP',
    fastCharge: '35 นาที (80 kW)',
    v2l: true,
    warranty: 'เหลือ 6 ปี / 150,000 กม.',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
    highlight: 'Blade Battery ปลอดภัยสูง & ปล่อยไฟ V2L ได้',
  },
  {
    id: 'ora-goodcat',
    name: 'ORA Good Cat 500 Ultra',
    brand: 'GWM',
    year: 2023,
    price: '฿629,000',
    installment: '฿9,800/ด.',
    soh: 93,
    sohGrade: 'สภาพดีเยี่ยม',
    range: '500 กม.',
    accel: '8.4 วิ',
    power: '143 PS',
    torque: '210 Nm',
    drive: 'ขับเคลื่อนล้อหน้า (FWD)',
    batteryCap: '63.13 kWh',
    batteryType: 'Ternary Lithium (NMC)',
    fastCharge: '38 นาที (60 kW)',
    v2l: true,
    warranty: 'เหลือ 6 ปี / 180,000 กม.',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    highlight: 'ราคาคุ้มค่าที่สุด & ฟังก์ชันอำนวยความสะดวกครบ',
  },
];

export default function CarComparisonPage() {
  const [carAId, setCarAId] = useState('tesla-y');
  const [carBId, setCarBId] = useState('byd-atto3');

  const carA = availableCars.find((c) => c.id === carAId) || availableCars[0];
  const carB = availableCars.find((c) => c.id === carBId) || availableCars[1];

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
              เปรียบเทียบรถ (Side-by-Side)
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-100 text-pastel-700 border border-pastel-200 text-xs font-semibold mb-2">
            <Scale className="w-3.5 h-3.5 text-pastel-500" />
            <span>ระบบเปรียบเทียบสเปกและสุขภาพแบตเตอรี่</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            เปรียบเทียบรถยนต์ไฟฟ้าแบบข้างต่อข้าง
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1.5 max-w-lg mx-auto">
            เลือกจับคู่รถ EV รุ่นที่สนใจเพื่อเปรียบเทียบราคา สุขภาพแบตเตอรี่ (SoH) ระยะทางวิ่ง และความคุ้มค่าได้อย่างชัดเจน
          </p>
        </div>

        {/* Comparison Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* CAR 1 SELECTOR */}
          <div className="bg-white rounded-3xl p-5 shadow-lg shadow-pastel-100/50 border border-pastel-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-pastel-600">รถคันที่ 1</span>
              <select
                value={carAId}
                onChange={(e) => setCarAId(e.target.value)}
                className="bg-pastel-50 border border-pastel-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-pastel-500 cursor-pointer"
              >
                {availableCars.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.price})
                  </option>
                ))}
              </select>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 mb-3">
              <img src={carA.image} alt={carA.name} className="w-full h-full object-cover" />
              <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-lg">
                ปี {carA.year}
              </div>
              <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-black text-pastel-600 shadow-md border border-pastel-100">
                SoH {carA.soh}%
              </div>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">{carA.name}</h3>
                <span className="text-xs text-pastel-600 font-semibold">{carA.highlight}</span>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-slate-900 block">{carA.price}</span>
                <span className="text-[11px] text-slate-400 font-medium">{carA.installment}</span>
              </div>
            </div>
          </div>

          {/* CAR 2 SELECTOR */}
          <div className="bg-white rounded-3xl p-5 shadow-lg shadow-pastel-100/50 border border-pastel-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">รถคันที่ 2</span>
              <select
                value={carBId}
                onChange={(e) => setCarBId(e.target.value)}
                className="bg-sky-50 border border-sky-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-sky-500 cursor-pointer"
              >
                {availableCars.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.price})
                  </option>
                ))}
              </select>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 mb-3">
              <img src={carB.image} alt={carB.name} className="w-full h-full object-cover" />
              <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-lg">
                ปี {carB.year}
              </div>
              <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-black text-sky-600 shadow-md border border-sky-100">
                SoH {carB.soh}%
              </div>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">{carB.name}</h3>
                <span className="text-xs text-sky-600 font-semibold">{carB.highlight}</span>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-slate-900 block">{carB.price}</span>
                <span className="text-[11px] text-slate-400 font-medium">{carB.installment}</span>
              </div>
            </div>
          </div>

        </div>

        {/* SIDE-BY-SIDE SPECIFICATIONS COMPARISON TABLE */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-pastel-100/50 border border-pastel-200 mb-10">
          
          <div className="p-5 bg-gradient-to-r from-pastel-50 to-sky-50 border-b border-pastel-100 flex items-center justify-between">
            <span className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pastel-500" /> ตารางเปรียบเทียบสเปกข้างต่อข้าง (Side-by-Side Specs)
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">* แถบสีไฮไลต์บ่งบอกคันที่ได้เปรียบในหัวข้อนั้นๆ</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            
            {/* Group 1: Battery & SoH */}
            <div className="bg-slate-50/70 px-5 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              1. ข้อมูลแบตเตอรี่ & สุขภาพ (Battery & SoH Diagnostics)
            </div>

            <div className="grid grid-cols-12 p-4 items-center">
              <div className="col-span-4 font-semibold text-slate-600 flex items-center gap-1.5">
                <BatteryCharging className="w-4 h-4 text-pastel-500" /> สุขภาพแบตเตอรี่ (SoH)
              </div>
              <div className={`col-span-4 font-black ${carA.soh >= carB.soh ? 'text-pastel-600 bg-pastel-50/60 p-2 rounded-xl' : 'text-slate-800'}`}>
                {carA.soh}% <span className="text-xs font-normal text-slate-400">({carA.sohGrade})</span>
              </div>
              <div className={`col-span-4 font-black ${carB.soh >= carA.soh ? 'text-sky-600 bg-sky-50/60 p-2 rounded-xl' : 'text-slate-800'}`}>
                {carB.soh}% <span className="text-xs font-normal text-slate-400">({carB.sohGrade})</span>
              </div>
            </div>

            <div className="grid grid-cols-12 p-4 items-center">
              <div className="col-span-4 font-semibold text-slate-600">ความจุแบตเตอรี่</div>
              <div className="col-span-4 font-bold text-slate-800">{carA.batteryCap}</div>
              <div className="col-span-4 font-bold text-slate-800">{carB.batteryCap}</div>
            </div>

            <div className="grid grid-cols-12 p-4 items-center">
              <div className="col-span-4 font-semibold text-slate-600">ชนิดเซลล์แบตเตอรี่</div>
              <div className="col-span-4 font-medium text-slate-700">{carA.batteryType}</div>
              <div className="col-span-4 font-medium text-slate-700">{carB.batteryType}</div>
            </div>

            <div className="grid grid-cols-12 p-4 items-center">
              <div className="col-span-4 font-semibold text-slate-600">การรับประกันศูนย์คงเหลือ</div>
              <div className="col-span-4 font-medium text-slate-700">{carA.warranty}</div>
              <div className="col-span-4 font-medium text-slate-700">{carB.warranty}</div>
            </div>

            {/* Group 2: Performance */}
            <div className="bg-slate-50/70 px-5 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              2. สมรรถนะการขับขี่ (Performance & Range)
            </div>

            <div className="grid grid-cols-12 p-4 items-center">
              <div className="col-span-4 font-semibold text-slate-600 flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-pastel-500" /> ระยะทางวิ่งต่อชาร์จ
              </div>
              <div className={`col-span-4 font-black ${parseInt(carA.range) >= parseInt(carB.range) ? 'text-pastel-600 bg-pastel-50/60 p-2 rounded-xl' : 'text-slate-800'}`}>
                {carA.range}
              </div>
              <div className={`col-span-4 font-black ${parseInt(carB.range) >= parseInt(carA.range) ? 'text-sky-600 bg-sky-50/60 p-2 rounded-xl' : 'text-slate-800'}`}>
                {carB.range}
              </div>
            </div>

            <div className="grid grid-cols-12 p-4 items-center">
              <div className="col-span-4 font-semibold text-slate-600 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-pastel-500" /> อัตราเร่ง 0-100 กม./ชม.
              </div>
              <div className={`col-span-4 font-black ${parseFloat(carA.accel) <= parseFloat(carB.accel) ? 'text-pastel-600 bg-pastel-50/60 p-2 rounded-xl' : 'text-slate-800'}`}>
                {carA.accel}
              </div>
              <div className={`col-span-4 font-black ${parseFloat(carB.accel) <= parseFloat(carA.accel) ? 'text-sky-600 bg-sky-50/60 p-2 rounded-xl' : 'text-slate-800'}`}>
                {carB.accel}
              </div>
            </div>

            <div className="grid grid-cols-12 p-4 items-center">
              <div className="col-span-4 font-semibold text-slate-600">พละกำลังสูงสุด (PS / แรงบิด)</div>
              <div className="col-span-4 font-bold text-slate-800">{carA.power} / {carA.torque}</div>
              <div className="col-span-4 font-bold text-slate-800">{carB.power} / {carB.torque}</div>
            </div>

            <div className="grid grid-cols-12 p-4 items-center">
              <div className="col-span-4 font-semibold text-slate-600">ระบบขับเคลื่อน</div>
              <div className="col-span-4 font-medium text-slate-700">{carA.drive}</div>
              <div className="col-span-4 font-medium text-slate-700">{carB.drive}</div>
            </div>

            {/* Group 3: Charging & Features */}
            <div className="bg-slate-50/70 px-5 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              3. ระบบชาร์จ & ความคุ้มค่า (Charging & Practicality)
            </div>

            <div className="grid grid-cols-12 p-4 items-center">
              <div className="col-span-4 font-semibold text-slate-600">ชาร์จด่วน DC Fast Charge</div>
              <div className="col-span-4 font-medium text-slate-700">{carA.fastCharge}</div>
              <div className="col-span-4 font-medium text-slate-700">{carB.fastCharge}</div>
            </div>

            <div className="grid grid-cols-12 p-4 items-center">
              <div className="col-span-4 font-semibold text-slate-600">ปล่อยไฟให้อุปกรณ์ภายนอก (V2L)</div>
              <div className="col-span-4">
                {carA.v2l ? (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> รองรับ 220V
                  </span>
                ) : (
                  <span className="text-slate-400">ไม่รองรับ</span>
                )}
              </div>
              <div className="col-span-4">
                {carB.v2l ? (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> รองรับ 220V (3.3 kW)
                  </span>
                ) : (
                  <span className="text-slate-400">ไม่รองรับ</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-12 p-4 items-center">
              <div className="col-span-4 font-semibold text-slate-600">ตรวจเช็กมาตรฐาน 150 จุด</div>
              <div className="col-span-4 text-emerald-600 font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-pastel-500" /> ผ่านการรับรอง 100%
              </div>
              <div className="col-span-4 text-emerald-600 font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-sky-500" /> ผ่านการรับรอง 100%
              </div>
            </div>

          </div>

          {/* Action Row */}
          <div className="p-6 bg-slate-50 border-t border-slate-100 grid grid-cols-12 gap-4">
            <div className="col-span-4 text-xs text-slate-400 flex items-center">
              พร้อมนัดหมายทดลองขับเพื่อสัมผัสคันจริง
            </div>
            <div className="col-span-4">
              <Link
                href="/booking"
                className="w-full py-2.5 px-4 rounded-xl bg-pastel-500 hover:bg-pastel-600 text-white font-bold text-xs text-center block shadow-sm transition"
              >
                จองทดลองขับ {carA.name.split(' ')[0]}
              </Link>
            </div>
            <div className="col-span-4">
              <Link
                href="/booking"
                className="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs text-center block shadow-sm transition"
              >
                จองทดลองขับ {carB.name.split(' ')[0]}
              </Link>
            </div>
          </div>

        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-pastel-600 hover:text-pastel-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับสู่หน้าแรก Aura EV</span>
          </Link>
        </div>

      </main>
    </div>
  );
}
