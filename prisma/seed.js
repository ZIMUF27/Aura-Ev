const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 กำลังเริ่มต้นใส่ข้อมูลตัวอย่าง (Seeding Aura EV database)...');

  // ลบข้อมูลเดิมออกก่อน
  await prisma.batteryHealthReport.deleteMany({});
  await prisma.car.deleteMany({});
  await prisma.emergencyTicket.deleteMany({});

  // 1. Tesla Model Y
  const tesla = await prisma.car.create({
    data: {
      title: 'Tesla Model Y Long Range AWD',
      brand: 'Tesla',
      model: 'Model Y',
      year: 2023,
      price: 1390000,
      installment: 'ผ่อนเริ่มต้น ฿21,500/ด.',
      mileageKm: 18500,
      rangePerCharge: 533,
      batteryCapacity: 75.0,
      batteryType: 'NMC Lithium-Ion (Tesla 2170 Cells)',
      location: 'กรุงเทพฯ',
      imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
      batteryReport: {
        create: {
          sohPercentage: 98,
          sohGrade: 'สมบูรณ์สูง (เกรด AAA)',
          cellBalanceMv: 11.0,
          warrantyRemaining: 'ประกันศูนย์ถึง 2031 หรือ 160,000 กม.',
          passed150Points: true,
        },
      },
    },
  });

  // 2. BYD ATTO 3
  const byd = await prisma.car.create({
    data: {
      title: 'BYD ATTO 3 Extended Range',
      brand: 'BYD',
      model: 'ATTO 3',
      year: 2023,
      price: 859000,
      installment: 'ผ่อนเริ่มต้น ฿13,200/ด.',
      mileageKm: 24000,
      rangePerCharge: 480,
      batteryCapacity: 60.48,
      batteryType: 'BYD Blade Battery (LFP ปลอดภัยสูง)',
      location: 'นนทบุรี',
      imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
      batteryReport: {
        create: {
          sohPercentage: 96,
          sohGrade: 'สมบูรณ์สูง (Blade Battery)',
          cellBalanceMv: 14.0,
          warrantyRemaining: 'ประกันศูนย์ถึง 2031 หรือ 150,000 กม.',
          passed150Points: true,
        },
      },
    },
  });

  // 3. ORA Good Cat
  const ora = await prisma.car.create({
    data: {
      title: 'ORA Good Cat 500 Ultra',
      brand: 'GWM',
      model: 'Good Cat',
      year: 2023,
      price: 629000,
      installment: 'ผ่อนเริ่มต้น ฿9,800/ด.',
      mileageKm: 18000,
      rangePerCharge: 500,
      batteryCapacity: 63.13,
      batteryType: 'Ternary Lithium (NMC)',
      location: 'ชลบุรี',
      imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
      batteryReport: {
        create: {
          sohPercentage: 93,
          sohGrade: 'สภาพดีเยี่ยม (ผ่านการบำรุงรักษาศูนย์)',
          cellBalanceMv: 16.0,
          warrantyRemaining: 'ประกันศูนย์ถึง 2031 หรือ 180,000 กม.',
          passed150Points: true,
        },
      },
    },
  });

  console.log('✅ สร้างข้อมูลรถตัวอย่างสำเร็จ:', tesla.title, byd.title, ora.title);
}

main()
  .catch((e) => {
    console.error('❌ เกิดข้อผิดพลาดในการ Seed ข้อมูล:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
