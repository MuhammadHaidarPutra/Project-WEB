const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clean existing data
  await prisma.consultation.deleteMany()
  await prisma.projectImage.deleteMany()
  await prisma.project.deleteMany()
  await prisma.post.deleteMany()
  await prisma.category.deleteMany()
  await prisma.service.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.create({
    data: {
      name: 'Administrator',
      email: 'admin@arcalinggakhatulistiwa.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin user created')

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Tips Konstruksi', slug: 'tips-konstruksi' } }),
    prisma.category.create({ data: { name: 'Desain Rumah', slug: 'desain-rumah' } }),
    prisma.category.create({ data: { name: 'Renovasi', slug: 'renovasi' } }),
    prisma.category.create({ data: { name: 'Interior', slug: 'interior' } }),
  ])
  console.log('✅ Categories created')

  // Create services
  const services = await Promise.all([
    prisma.service.create({
      data: {
        name: 'Desain Rumah',
        slug: 'desain-rumah',
        description: 'Layanan desain rumah modern dan fungsional yang disesuaikan dengan kebutuhan dan gaya hidup Anda bersama arsitek PT Arca Lingga Khatulistiwa. Tim profesional kami siap mewujudkan hunian impian dengan tata ruang estetis dan efisien.',
        advantages: JSON.stringify(['Desain custom sesuai kebutuhan', 'Tim arsitek berpengalaman', 'Revisi tanpa batas', 'Render 3D realistis', 'Konsultasi gratis']),
        process: JSON.stringify(['Konsultasi awal', 'Survey lokasi', 'Pembuatan konsep desain', 'Pengembangan desain detail', 'Presentasi dan revisi', 'Finalisasi gambar kerja']),
        faq: JSON.stringify([
          { q: 'Berapa lama proses desain?', a: 'Proses desain biasanya memakan waktu 2-4 minggu tergantung kompleksitas proyek.' },
          { q: 'Apakah bisa request revisi?', a: 'Ya, kami menyediakan revisi tanpa batas hingga Anda puas dengan hasilnya.' },
        ]),
        image: '/images/project-1.jpg',
        icon: 'Home',
        order: 1,
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        name: 'Pembangunan Rumah',
        slug: 'pembangunan-rumah',
        description: 'Layanan pembangunan rumah dari nol hingga serah terima kunci dengan kualitas terbaik oleh PT Arca Lingga Khatulistiwa. Kami menggunakan material premium standar SNI dan tenaga kerja profesional.',
        advantages: JSON.stringify(['Material berkualitas tinggi', 'Tenaga kerja profesional', 'Pengawasan ketat', 'Garansi konstruksi', 'Tepat waktu dan budget']),
        process: JSON.stringify(['Perencanaan anggaran', 'Persiapan lahan', 'Pembangunan fondasi', 'Konstruksi struktur', 'Finishing', 'Serah terima']),
        faq: JSON.stringify([
          { q: 'Berapa lama waktu pembangunan?', a: 'Rata-rata 4-8 bulan tergantung ukuran dan kompleksitas bangunan.' },
          { q: 'Apakah ada garansi?', a: 'Ya, kami memberikan garansi konstruksi selama 2 tahun.' },
        ]),
        image: '/images/hero.jpg',
        icon: 'Building2',
        order: 2,
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        name: 'Renovasi',
        slug: 'renovasi',
        description: 'Layanan renovasi rumah dan bangunan komersial untuk memperbaharui tampilan dan meningkatkan fungsionalitas ruang Anda. Dari renovasi minor hingga renovasi total.',
        advantages: JSON.stringify(['Konsultasi desain renovasi', 'Estimasi biaya transparan', 'Pengerjaan rapi dan bersih', 'Minim gangguan aktivitas', 'Hasil maksimal']),
        process: JSON.stringify(['Survey kondisi bangunan', 'Konsultasi dan perencanaan', 'Estimasi biaya', 'Pelaksanaan renovasi', 'Quality check', 'Serah terima']),
        faq: JSON.stringify([
          { q: 'Apakah bisa renovasi sambil tetap tinggal?', a: 'Ya, kami akan mengatur jadwal dan area kerja agar aktivitas Anda tetap nyaman.' },
        ]),
        image: '/images/project-3.jpg',
        icon: 'Hammer',
        order: 3,
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        name: 'Desain Interior',
        slug: 'desain-interior',
        description: 'Layanan desain interior yang mengubah ruangan Anda menjadi tempat yang nyaman, fungsional, dan estetis. Kami menangani berbagai gaya dari minimalis hingga mewah.',
        advantages: JSON.stringify(['Desain sesuai personality', 'Pemilihan furniture tepat', 'Optimasi ruang', 'Pencahayaan profesional', 'Konsep warna harmonis']),
        process: JSON.stringify(['Diskusi konsep dan gaya', 'Pengukuran ruangan', 'Pembuatan mood board', 'Desain 3D', 'Pemilihan material', 'Implementasi']),
        faq: JSON.stringify([
          { q: 'Apakah termasuk pengadaan furniture?', a: 'Kami dapat membantu pengadaan furniture custom (fit-out) sesuai desain yang disetujui.' },
        ]),
        image: '/images/project-2.jpg',
        icon: 'Palette',
        order: 4,
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        name: 'Desain Eksterior',
        slug: 'desain-eksterior',
        description: 'Layanan desain eksterior untuk menciptakan tampilan luar bangunan yang menawan, termasuk fasad bangunan, lansekap taman, dan area outdoor.',
        advantages: JSON.stringify(['Desain fasad modern', 'Landscape design', 'Pencahayaan eksterior', 'Material tahan cuaca', 'Meningkatkan nilai properti']),
        process: JSON.stringify(['Survey lokasi', 'Konsep desain eksterior', 'Pemilihan material', 'Render 3D eksterior', 'Implementasi', 'Finishing']),
        faq: JSON.stringify([
          { q: 'Apakah termasuk desain taman?', a: 'Ya, layanan desain eksterior kami mencakup desain landscape dan taman.' },
        ]),
        image: '/images/project-4.jpg',
        icon: 'Trees',
        order: 5,
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        name: 'Konsultasi Konstruksi',
        slug: 'konsultasi-konstruksi',
        description: 'Layanan konsultasi konstruksi profesional untuk membantu Anda merencanakan, mengestimasi Rencana Anggaran Biaya (RAB), dan mengawasi proyek konstruksi Anda dengan efektif.',
        advantages: JSON.stringify(['Konsultan berpengalaman', 'Estimasi biaya akurat', 'Analisis kelayakan', 'Perencanaan jadwal', 'Pengawasan proyek']),
        process: JSON.stringify(['Diskusi kebutuhan', 'Analisis lokasi', 'Estimasi dan perencanaan', 'Penyusunan RAB', 'Pendampingan proyek']),
        faq: JSON.stringify([
          { q: 'Apakah konsultasi awal gratis?', a: 'Ya, konsultasi awal tidak dikenakan biaya.' },
        ]),
        image: '/images/hero.jpg',
        icon: 'ClipboardList',
        order: 6,
        isActive: true,
      },
    }),
  ])
  console.log('✅ Services created')

  // Create projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        name: 'Residensi Modern Menteng',
        slug: 'residensi-modern-menteng',
        category: 'Rumah',
        location: 'Jakarta Pusat',
        year: '2024',
        area: '350 m²',
        description: 'Pembangunan rumah tinggal modern minimalis di kawasan Menteng, Jakarta Pusat oleh PT Arca Lingga Khatulistiwa. Proyek ini mengusung konsep open space dengan pencahayaan alami yang maksimal dan material premium.',
        thumbnail: '/images/project-1.jpg',
        status: 'PUBLISHED',
        images: {
          create: [
            { imageUrl: '/images/project-1.jpg' },
            { imageUrl: '/images/project-2.jpg' },
            { imageUrl: '/images/project-3.jpg' },
          ],
        },
      },
    }),
    prisma.project.create({
      data: {
        name: 'Renovasi Villa Puncak',
        slug: 'renovasi-villa-puncak',
        category: 'Renovasi',
        location: 'Bogor',
        year: '2024',
        area: '280 m²',
        description: 'Renovasi total villa di kawasan Puncak, Bogor. Mengubah villa lama menjadi hunian modern dengan sentuhan alam. Penambahan area outdoor, kolam renang, dan redesain interior seluruh ruangan.',
        thumbnail: '/images/project-3.jpg',
        status: 'PUBLISHED',
        images: {
          create: [
            { imageUrl: '/images/project-3.jpg' },
            { imageUrl: '/images/project-2.jpg' },
          ],
        },
      },
    }),
    prisma.project.create({
      data: {
        name: 'Interior Apartemen Sudirman',
        slug: 'interior-apartemen-sudirman',
        category: 'Interior',
        location: 'Jakarta Selatan',
        year: '2023',
        area: '120 m²',
        description: 'Desain dan implementasi interior apartemen mewah di kawasan Sudirman. Konsep modern minimalis dengan sentuhan warm tone. Setiap ruangan dirancang untuk memaksimalkan fungsi dan estetika.',
        thumbnail: '/images/project-2.jpg',
        status: 'PUBLISHED',
        images: {
          create: [
            { imageUrl: '/images/project-2.jpg' },
            { imageUrl: '/images/project-1.jpg' },
          ],
        },
      },
    }),
    prisma.project.create({
      data: {
        name: 'Gedung Kantor Startup Hub',
        slug: 'gedung-kantor-startup-hub',
        category: 'Komersial',
        location: 'Tangerang',
        year: '2023',
        area: '1200 m²',
        description: 'Pembangunan gedung kantor modern 4 lantai untuk co-working space dan startup hub. Desain industrial modern dengan fasilitas lengkap termasuk rooftop garden dan area meeting.',
        thumbnail: '/images/project-4.jpg',
        status: 'PUBLISHED',
        images: {
          create: [
            { imageUrl: '/images/project-4.jpg' },
            { imageUrl: '/images/project-1.jpg' },
          ],
        },
      },
    }),
    prisma.project.create({
      data: {
        name: 'Rumah Tropis BSD City',
        slug: 'rumah-tropis-bsd-city',
        category: 'Rumah',
        location: 'Tangerang Selatan',
        year: '2024',
        area: '250 m²',
        description: 'Desain dan pembangunan rumah bergaya tropis modern di BSD City. Mengusung konsep indoor-outdoor living dengan taman dalam dan cross ventilation untuk kenyamanan maksimal.',
        thumbnail: '/images/project-1.jpg',
        status: 'PUBLISHED',
        images: {
          create: [
            { imageUrl: '/images/project-1.jpg' },
            { imageUrl: '/images/project-3.jpg' },
          ],
        },
      },
    }),
    prisma.project.create({
      data: {
        name: 'Eksterior Resort Bali',
        slug: 'eksterior-resort-bali',
        category: 'Eksterior',
        location: 'Bali',
        year: '2023',
        area: '500 m²',
        description: 'Desain eksterior resort boutique di Bali. Menggabungkan arsitektur modern dengan elemen tradisional Bali. Termasuk desain landscape, pool area, dan outdoor dining.',
        thumbnail: '/images/project-4.jpg',
        status: 'PUBLISHED',
        images: {
          create: [
            { imageUrl: '/images/project-4.jpg' },
            { imageUrl: '/images/project-2.jpg' },
          ],
        },
      },
    }),
  ])
  console.log('✅ Projects created')

  // Create posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        title: '10 Tips Memilih Kontraktor Rumah yang Tepat',
        slug: '10-tips-memilih-kontraktor-rumah',
        excerpt: 'Memilih kontraktor yang tepat adalah langkah krusial dalam pembangunan rumah. Berikut 10 tips yang perlu Anda perhatikan agar tidak salah pilih bersama PT Arca Lingga Khatulistiwa.',
        content: '<h2>1. Periksa Legalitas dan Izin Usaha</h2><p>Pastikan kontraktor memiliki izin usaha resmi dan terdaftar secara legal. Ini menunjukkan profesionalisme dan komitmen terhadap standar kualitas.</p><h2>2. Cek Portofolio dan Pengalaman</h2><p>Lihat proyek-proyek yang telah dikerjakan sebelumnya. Portofolio yang beragam menunjukkan pengalaman yang luas.</p><h2>3. Minta Referensi dari Klien Sebelumnya</h2><p>Hubungi klien-klien sebelumnya untuk mengetahui tingkat kepuasan mereka terhadap hasil kerja kontraktor.</p><h2>4. Bandingkan Beberapa Penawaran</h2><p>Jangan langsung menerima satu penawaran. Bandingkan minimal 3 kontraktor untuk mendapatkan harga dan kualitas terbaik.</p><h2>5. Perhatikan Kontrak Kerja</h2><p>Baca dan pahami setiap poin dalam kontrak kerja. Pastikan semua kesepakatan tertulis dengan jelas.</p><h2>6. Cek Garansi yang Ditawarkan</h2><p>Kontraktor profesional biasanya memberikan garansi pekerjaan. Pastikan garansi mencakup aspek-aspek penting.</p><h2>7. Pastikan Timeline yang Jelas</h2><p>Minta jadwal pengerjaan yang detail dan realistis. Ini akan membantu Anda memantau progres pembangunan.</p><h2>8. Periksa Kualitas Material</h2><p>Pastikan kontraktor menggunakan material berkualitas sesuai spesifikasi yang disepakati.</p><h2>9. Komunikasi yang Baik</h2><p>Pilih kontraktor yang responsif dan mudah diajak berkomunikasi. Ini penting untuk kelancaran proyek.</p><h2>10. Perhatikan After-Sales Service</h2><p>Kontraktor yang baik akan tetap memberikan layanan purna jual setelah proyek selesai.</p>',
        thumbnail: '/images/hero.jpg',
        status: 'PUBLISHED',
        authorId: admin.id,
        categoryId: categories[0].id,
        publishedAt: new Date('2024-01-15'),
      },
    }),
    prisma.post.create({
      data: {
        title: 'Tren Desain Rumah Minimalis Modern 2024',
        slug: 'tren-desain-rumah-minimalis-modern-2024',
        excerpt: 'Desain rumah minimalis modern terus berkembang. Simak tren terbaru yang populer di tahun 2024 untuk inspirasi rumah impian Anda.',
        content: '<h2>Open Floor Plan</h2><p>Konsep ruang terbuka semakin diminati. Menggabungkan ruang tamu, ruang makan, dan dapur dalam satu area luas menciptakan kesan lapang dan memudahkan interaksi keluarga.</p><h2>Material Alami</h2><p>Penggunaan material alami seperti kayu, batu alam, dan bata ekspos memberikan sentuhan hangat dan karakter pada rumah minimalis.</p><h2>Pencahayaan Natural</h2><p>Jendela besar dan skylight menjadi fitur utama untuk memaksimalkan cahaya alami. Selain estetis, ini juga menghemat energi.</p><h2>Smart Home Technology</h2><p>Integrasi teknologi pintar menjadi standar baru. Dari pencahayaan otomatis hingga sistem keamanan yang terhubung.</p><h2>Sustainable Design</h2><p>Desain berkelanjutan dengan panel surya, penampungan air hujan, dan material ramah lingkungan semakin populer.</p>',
        thumbnail: '/images/project-1.jpg',
        status: 'PUBLISHED',
        authorId: admin.id,
        categoryId: categories[1].id,
        publishedAt: new Date('2024-02-10'),
      },
    }),
    prisma.post.create({
      data: {
        title: 'Panduan Lengkap Renovasi Rumah: Dari Perencanaan Hingga Eksekusi',
        slug: 'panduan-lengkap-renovasi-rumah',
        excerpt: 'Renovasi rumah bisa menjadi proyek yang menantang. Artikel ini membahas langkah-langkah lengkap untuk merencanakan dan melaksanakan renovasi rumah Anda.',
        content: '<h2>Tahap 1: Evaluasi Kebutuhan</h2><p>Langkah pertama adalah mengevaluasi apa yang perlu direnovasi. Buat daftar prioritas berdasarkan urgensi dan budget yang tersedia.</p><h2>Tahap 2: Tentukan Budget</h2><p>Tentukan anggaran yang realistis. Sisihkan 10-20% tambahan untuk biaya tak terduga yang mungkin muncul selama proses renovasi.</p><h2>Tahap 3: Cari Kontraktor</h2><p>Pilih kontraktor yang berpengalaman dalam jenis renovasi yang Anda butuhkan. Pastikan untuk memeriksa referensi dan portofolio mereka.</p><h2>Tahap 4: Perencanaan Detail</h2><p>Buat rencana detail mencakup desain, material, jadwal, dan anggaran. Semakin detail perencanaan, semakin lancar proses pengerjaan.</p><h2>Tahap 5: Pelaksanaan</h2><p>Monitor progres secara berkala dan komunikasikan setiap perubahan dengan kontraktor. Jangan ragu untuk bertanya jika ada hal yang kurang jelas.</p>',
        thumbnail: '/images/project-3.jpg',
        status: 'PUBLISHED',
        authorId: admin.id,
        categoryId: categories[2].id,
        publishedAt: new Date('2024-03-05'),
      },
    }),
    prisma.post.create({
      data: {
        title: 'Cara Memilih Material Bangunan Berkualitas',
        slug: 'cara-memilih-material-bangunan-berkualitas',
        excerpt: 'Material bangunan yang berkualitas menentukan kekuatan dan daya tahan bangunan Anda. Pelajari cara memilih material yang tepat.',
        content: '<h2>Kenali Jenis Material</h2><p>Pahami berbagai jenis material yang tersedia di pasaran. Setiap material memiliki kelebihan dan kekurangan masing-masing.</p><h2>Periksa Standar Kualitas</h2><p>Pastikan material yang Anda pilih memenuhi standar SNI (Standar Nasional Indonesia). Ini menjamin kualitas dan keamanan material.</p><h2>Bandingkan Harga</h2><p>Harga yang mahal tidak selalu berarti kualitas terbaik. Bandingkan harga dari beberapa supplier untuk mendapatkan value terbaik.</p><h2>Pertimbangkan Ketersediaan</h2><p>Pilih material yang mudah didapat di sekitar lokasi proyek untuk menghemat biaya transportasi.</p>',
        thumbnail: '/images/project-4.jpg',
        status: 'PUBLISHED',
        authorId: admin.id,
        categoryId: categories[0].id,
        publishedAt: new Date('2024-04-20'),
      },
    }),
    prisma.post.create({
      data: {
        title: '7 Ide Desain Interior Ruang Tamu yang Elegan',
        slug: '7-ide-desain-interior-ruang-tamu-elegan',
        excerpt: 'Ruang tamu adalah wajah rumah Anda. Temukan 7 ide desain interior yang akan membuat ruang tamu Anda tampil lebih elegan dan menarik.',
        content: '<h2>1. Minimalis Skandinavia</h2><p>Gaya Skandinavia menekankan kesederhanaan dengan warna-warna netral, furniture fungsional, dan aksen kayu alami.</p><h2>2. Modern Kontemporer</h2><p>Padukan garis-garis bersih dengan material modern seperti kaca, logam, dan beton untuk tampilan yang sophisticated.</p><h2>3. Tropical Chic</h2><p>Gabungkan elemen tropis dengan sentuhan modern. Tanaman hijau, material rotan, dan warna earth tone menciptakan suasana segar.</p><h2>4. Industrial Modern</h2><p>Ekspose elemen struktural seperti bata, beton, dan pipa logam dipadukan dengan furniture modern untuk kesan urban.</p><h2>5. Japandi</h2><p>Perpaduan estetika Jepang dan Skandinavia: minimalis, fungsional, dan penuh ketenangan.</p><h2>6. Klasik Elegan</h2><p>Gunakan furniture bergaya klasik dengan material mewah seperti marmer, beludru, dan emas untuk kesan mewah.</p><h2>7. Bohemian Modern</h2><p>Campurkan berbagai tekstur, pola, dan warna untuk menciptakan ruang yang unik dan penuh karakter.</p>',
        thumbnail: '/images/project-2.jpg',
        status: 'PUBLISHED',
        authorId: admin.id,
        categoryId: categories[3].id,
        publishedAt: new Date('2024-05-12'),
      },
    }),
    prisma.post.create({
      data: {
        title: 'Estimasi Biaya Bangun Rumah: Panduan untuk Pemula',
        slug: 'estimasi-biaya-bangun-rumah-panduan-pemula',
        excerpt: 'Berencana membangun rumah? Pelajari cara menghitung estimasi biaya pembangunan rumah agar budget Anda tepat sasaran.',
        content: '<h2>Faktor-faktor yang Mempengaruhi Biaya</h2><p>Biaya pembangunan rumah dipengaruhi oleh beberapa faktor utama: luas bangunan, jumlah lantai, kualitas material, lokasi, dan kompleksitas desain.</p><h2>Cara Menghitung RAB</h2><p>Rencana Anggaran Biaya (RAB) adalah dokumen penting yang merinci seluruh biaya pembangunan. Berikut cara menyusunnya dengan benar.</p><h2>Tips Menghemat Biaya</h2><p>Ada beberapa cara untuk mengoptimalkan budget tanpa mengorbankan kualitas: pilih material lokal, rencanakan dengan matang, dan hindari perubahan di tengah jalan.</p>',
        thumbnail: '/images/hero.jpg',
        status: 'PUBLISHED',
        authorId: admin.id,
        categoryId: categories[0].id,
        publishedAt: new Date('2024-06-08'),
      },
    }),
    prisma.post.create({
      data: {
        title: 'Desain Fasad Rumah yang Meningkatkan Nilai Properti',
        slug: 'desain-fasad-rumah-meningkatkan-nilai-properti',
        excerpt: 'Fasad rumah adalah kesan pertama yang dilihat orang. Desain fasad yang tepat bisa meningkatkan nilai properti Anda secara signifikan.',
        content: '<h2>Pentingnya Desain Fasad</h2><p>Fasad adalah elemen pertama yang dilihat oleh siapa pun yang melewati rumah Anda. Desain fasad yang menarik dapat meningkatkan curb appeal dan nilai jual properti.</p><h2>Tren Fasad 2024</h2><p>Material natural, warna earth tone, dan pencahayaan fasad yang dramatis menjadi tren di tahun ini.</p><h2>Material Fasad Populer</h2><p>Batu alam, wood cladding, kaca, dan ACP (Aluminium Composite Panel) adalah pilihan material fasad yang populer saat ini.</p>',
        thumbnail: '/images/project-1.jpg',
        status: 'PUBLISHED',
        authorId: admin.id,
        categoryId: categories[1].id,
        publishedAt: new Date('2024-07-15'),
      },
    }),
    prisma.post.create({
      data: {
        title: 'Kesalahan Umum Saat Renovasi Rumah dan Cara Menghindarinya',
        slug: 'kesalahan-umum-renovasi-rumah',
        excerpt: 'Banyak orang melakukan kesalahan saat renovasi rumah. Ketahui kesalahan-kesalahan umum ini agar Anda bisa menghindarinya.',
        content: '<h2>Tidak Membuat Rencana Detail</h2><p>Kesalahan terbesar adalah memulai renovasi tanpa perencanaan yang matang. Buat rencana detail sebelum memulai pekerjaan.</p><h2>Budget Tidak Realistis</h2><p>Seringkali budget yang disiapkan terlalu ketat tanpa memperhitungkan biaya tak terduga. Selalu siapkan dana darurat 15-20%.</p><h2>Mengabaikan Izin Renovasi</h2><p>Beberapa jenis renovasi memerlukan izin dari pihak berwenang. Pastikan semua perizinan lengkap sebelum memulai.</p>',
        thumbnail: '/images/project-3.jpg',
        status: 'DRAFT',
        authorId: admin.id,
        categoryId: categories[2].id,
        publishedAt: null,
      },
    }),
  ])
  console.log('✅ Posts created')

  // Create consultations
  await Promise.all([
    prisma.consultation.create({
      data: {
        name: 'Budi Santoso',
        email: 'budi@email.com',
        phone: '081234567890',
        service: 'Pembangunan Rumah',
        message: 'Saya ingin membangun rumah 2 lantai di daerah Depok dengan luas tanah 200m². Mohon informasi estimasi biaya dan jadwal konsultasi bersama PT Arca Lingga Khatulistiwa.',
        status: 'NEW',
      },
    }),
    prisma.consultation.create({
      data: {
        name: 'Siti Rahayu',
        email: 'siti@email.com',
        phone: '082345678901',
        service: 'Renovasi',
        message: 'Saya berencana merenovasi dapur dan kamar mandi rumah saya di BSD City. Bisakah tim Anda melakukan survey terlebih dahulu?',
        status: 'READ',
      },
    }),
    prisma.consultation.create({
      data: {
        name: 'Ahmad Fauzi',
        email: 'ahmad@email.com',
        phone: '083456789012',
        service: 'Desain Interior',
        message: 'Kami baru saja membeli apartemen di Sudirman dan membutuhkan jasa desain interior berukuran 85m² dengan 2 kamar tidur.',
        status: 'PROCESSED',
      },
    }),
    prisma.consultation.create({
      data: {
        name: 'Dewi Lestari',
        email: 'dewi@email.com',
        phone: '084567890123',
        service: 'Desain Rumah',
        message: 'Mohon bantuan untuk mendesain rumah minimalis modern di lahan 150m². Saya ingin konsep open space dengan taman kecil di tengah.',
        status: 'DONE',
      },
    }),
    prisma.consultation.create({
      data: {
        name: 'Rudi Hermawan',
        email: 'rudi@email.com',
        phone: '085678901234',
        service: 'Konsultasi Konstruksi',
        message: 'Saya memiliki tanah di Bogor dan ingin berkonsultasi mengenai kelayakan pembangunan ruko 3 lantai. Mohon jadwal konsultasi.',
        status: 'NEW',
      },
    }),
  ])
  console.log('✅ Consultations created')

  console.log('🎉 Seeding completed!')
  console.log('')
  console.log('📧 Admin Login:')
  console.log('   Email: admin@arcalinggakhatulistiwa.com')
  console.log('   Password: admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
