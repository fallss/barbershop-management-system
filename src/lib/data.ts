export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export interface Service {
  id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  duration_min: number;
  popular?: boolean;
}

export interface Barber {
  id: number;
  name: string;
  role: string;
  experience: string;
  bio: string;
  avatar: string;
  specialties: string[];
  rating: number;
  reviews_count: number;
}

export interface Appointment {
  id: string;
  client_name: string;
  client_phone: string;
  client_email: string;
  service_ids: number[];
  services_details: { name: string; price: number }[];
  barber_id: number | null;
  barber_name: string;
  appointment_date: string; // YYYY-MM-DD
  appointment_time: string; // HH:mm
  total_price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  cancellation_reason?: string;
  created_at: string;
}

// Initial Indonesian Barbershop Catalog
export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Potong Rambut & Styling",
    description: "Gunting rambut presisi dengan sentuhan gaya kontemporer maupun klasik pria.",
    icon: "✂️",
  },
  {
    id: 2,
    name: "Shaving & Perawatan Brewok",
    description: "Cukur tradisional pisau lipat dengan handuk panas dan relaksasi aftershave.",
    icon: "🪒",
  },
  {
    id: 3,
    name: "Perawatan Wajah & Kulit Kepala",
    description: "Perawatan spa wajah detox, masker charcoal, dan terapi kulit kepala anti ketombe.",
    icon: "🧖‍♂️",
  },
  {
    id: 4,
    name: "Paket Komplit Grooming",
    description: "Layanan all-in-one terbaik untuk penampilan pria terhormat dan elegan.",
    icon: "👑",
  },
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: 1,
    category_id: 1,
    name: "Classic Gentleman Haircut",
    description: "Potongan rambut presisi, keramas bersih, pijatan relaksasi kepala & leher, serta styling pomade premium.",
    price: 65000,
    duration_min: 45,
    popular: true,
  },
  {
    id: 2,
    category_id: 1,
    name: "Modern Skin Fade & Taper",
    description: "Gradasi ultra halus (Low/Mid/High Fade) dengan detail razor finishing dan aplikasi hair tonic penyegar.",
    price: 75000,
    duration_min: 50,
    popular: true,
  },
  {
    id: 3,
    category_id: 1,
    name: "Junior Haircut (Anak & Remaja)",
    description: "Potongan rambut rapi ramah anak dengan pendekatan sabar, nyaman, dan hasil stylish kekinian.",
    price: 50000,
    duration_min: 35,
  },
  {
    id: 4,
    category_id: 2,
    name: "Royal Hot Towel Shave",
    description: "Pembersihan pori dengan handuk hangat aromaterapi, busa cukur kaya emolien, pisau cukur tajam, dan aftershave mint.",
    price: 55000,
    duration_min: 35,
    popular: true,
  },
  {
    id: 5,
    category_id: 2,
    name: "Beard Trim & Precision Line-Up",
    description: "Pembentukan dan perapian jenggot simetris dengan razor line tajam serta minyak brewok organik.",
    price: 45000,
    duration_min: 30,
  },
  {
    id: 6,
    category_id: 3,
    name: "Black Charcoal Facial Detox",
    description: "Masker charcoal pembersih komedo, angkat sel kulit mati, mengontrol minyak wajah berlebih dan menyegarkan.",
    price: 60000,
    duration_min: 30,
  },
  {
    id: 7,
    category_id: 3,
    name: "Scalp Massage & Anti-Dandruff Tonic",
    description: "Pijatan akupresur titik relaksasi kepala 20 menit disertai hair tonic herbal penumbuh dan penguat akar rambut.",
    price: 50000,
    duration_min: 25,
  },
  {
    id: 8,
    category_id: 4,
    name: "The Executive Luxury Package",
    description: "Paket kasta tertinggi: Gentleman Haircut + Hot Towel Shave + Facial Mask + Pijat Bahu Punggung + Hair Styling Lengkap.",
    price: 135000,
    duration_min: 85,
    popular: true,
  },
];

export const INITIAL_BARBERS: Barber[] = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Master Barber & Founder",
    experience: "10+ Tahun",
    bio: "Spesialis potongan rambut klasik Eropa, pompadour rapi, dan teknik gunting presisi tinggi untuk eksekutif.",
    avatar: "/images/team-1.jpg",
    specialties: ["Classic Scissor Cut", "Executive Pompadour", "Beard Sculpting"],
    rating: 4.9,
    reviews_count: 248,
  },
  {
    id: 2,
    name: "Rian Pratama",
    role: "Senior Fade Specialist",
    experience: "7 Tahun",
    bio: "Ahli dalam gradasi modern skin fade, French crop, textured quiff, dan razor lining simetris detail.",
    avatar: "/images/team-2.jpg",
    specialties: ["Skin Fade & Taper", "Textured Crop", "Razor Sharp Line"],
    rating: 4.8,
    reviews_count: 195,
  },
  {
    id: 3,
    name: "Dimas Kusuma",
    role: "Grooming & Shave Stylist",
    experience: "5 Tahun",
    bio: "Ahli perawatan kulit kepala, relaksasi hot towel tradisional, serta penataan gaya kasual modern.",
    avatar: "/images/team-3.jpg",
    specialties: ["Hot Towel Shave", "Scalp Therapy", "Casual Wave Styling"],
    rating: 4.9,
    reviews_count: 164,
  },
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "BK-70291",
    client_name: "Andi Wijaya",
    client_phone: "081298765432",
    client_email: "andi.wijaya@gmail.com",
    service_ids: [1, 4],
    services_details: [
      { name: "Classic Gentleman Haircut", price: 65000 },
      { name: "Royal Hot Towel Shave", price: 55000 },
    ],
    barber_id: 1,
    barber_name: "Budi Santoso",
    appointment_date: "2026-10-15",
    appointment_time: "10:00",
    total_price: 120000,
    status: "confirmed",
    notes: "Minta potongan samping tidak terlalu tipis.",
    created_at: "2026-10-14 09:30",
  },
  {
    id: "BK-81342",
    client_name: "Bambang Setiawan",
    client_phone: "081387654321",
    client_email: "bambang.s@outlook.com",
    service_ids: [8],
    services_details: [
      { name: "The Executive Luxury Package", price: 135000 },
    ],
    barber_id: 2,
    barber_name: "Rian Pratama",
    appointment_date: "2026-10-15",
    appointment_time: "14:00",
    total_price: 135000,
    status: "pending",
    notes: "Persiapan sebelum acara pernikahan besok lusa.",
    created_at: "2026-10-14 11:15",
  },
  {
    id: "BK-92415",
    client_name: "Reza Kurniawan",
    client_phone: "085712345678",
    client_email: "reza.k@gmail.com",
    service_ids: [2],
    services_details: [
      { name: "Modern Skin Fade & Taper", price: 75000 },
    ],
    barber_id: 2,
    barber_name: "Rian Pratama",
    appointment_date: "2026-10-14",
    appointment_time: "16:00",
    total_price: 75000,
    status: "completed",
    notes: "High fade dengan garis tipis di samping kiri.",
    created_at: "2026-10-14 08:20",
  },
  {
    id: "BK-43219",
    client_name: "Fajar Nugraha",
    client_phone: "081809876543",
    client_email: "fajar.nug@gmail.com",
    service_ids: [1, 6],
    services_details: [
      { name: "Classic Gentleman Haircut", price: 65000 },
      { name: "Black Charcoal Facial Detox", price: 60000 },
    ],
    barber_id: 3,
    barber_name: "Dimas Kusuma",
    appointment_date: "2026-10-16",
    appointment_time: "18:30",
    total_price: 125000,
    status: "confirmed",
    notes: "Kulit sensitif, gunakan pisau baru.",
    created_at: "2026-10-14 14:40",
  },
];

// Global in-memory storage singleton for resilient serverless & client execution
declare global {
  // eslint-disable-next-line no-var
  var __BARBER_CATEGORIES: Category[] | undefined;
  // eslint-disable-next-line no-var
  var __BARBER_SERVICES: Service[] | undefined;
  // eslint-disable-next-line no-var
  var __BARBER_BARBERS: Barber[] | undefined;
  // eslint-disable-next-line no-var
  var __BARBER_APPOINTMENTS: Appointment[] | undefined;
}

if (!global.__BARBER_CATEGORIES) {
  global.__BARBER_CATEGORIES = [...INITIAL_CATEGORIES];
}
if (!global.__BARBER_SERVICES) {
  global.__BARBER_SERVICES = [...INITIAL_SERVICES];
}
if (!global.__BARBER_BARBERS) {
  global.__BARBER_BARBERS = [...INITIAL_BARBERS];
}
if (!global.__BARBER_APPOINTMENTS) {
  global.__BARBER_APPOINTMENTS = [...INITIAL_APPOINTMENTS];
}

// Data Access API
export function getCategories(): Category[] {
  return global.__BARBER_CATEGORIES || INITIAL_CATEGORIES;
}

export function getServices(): Service[] {
  return global.__BARBER_SERVICES || INITIAL_SERVICES;
}

export function getBarbers(): Barber[] {
  return global.__BARBER_BARBERS || INITIAL_BARBERS;
}

export function getAppointments(): Appointment[] {
  return global.__BARBER_APPOINTMENTS || INITIAL_APPOINTMENTS;
}

export function createAppointment(data: {
  client_name: string;
  client_phone: string;
  client_email: string;
  service_ids: number[];
  barber_id: number | null;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
}): Appointment {
  const allServices = getServices();
  const selectedServices = allServices.filter((s) => data.service_ids.includes(s.id));
  const services_details = selectedServices.map((s) => ({ name: s.name, price: s.price }));
  const total_price = selectedServices.reduce((sum, s) => sum + s.price, 0);

  const barbers = getBarbers();
  const barber = data.barber_id ? barbers.find((b) => b.id === data.barber_id) : null;
  const barber_name = barber ? barber.name : "Siapa Saja yang Tersedia (Any Barber)";

  // Generate unique booking code
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const id = `BK-${randomSuffix}`;

  const newAppointment: Appointment = {
    id,
    client_name: data.client_name,
    client_phone: data.client_phone,
    client_email: data.client_email,
    service_ids: data.service_ids,
    services_details,
    barber_id: data.barber_id,
    barber_name,
    appointment_date: data.appointment_date,
    appointment_time: data.appointment_time,
    total_price,
    status: "pending",
    notes: data.notes || "",
    created_at: new Date().toISOString().replace("T", " ").substring(0, 16),
  };

  if (!global.__BARBER_APPOINTMENTS) {
    global.__BARBER_APPOINTMENTS = [...INITIAL_APPOINTMENTS];
  }
  global.__BARBER_APPOINTMENTS.unshift(newAppointment);

  return newAppointment;
}

export function updateAppointmentStatus(
  id: string,
  status: Appointment["status"],
  cancellation_reason?: string
): Appointment | null {
  if (!global.__BARBER_APPOINTMENTS) {
    global.__BARBER_APPOINTMENTS = [...INITIAL_APPOINTMENTS];
  }
  const index = global.__BARBER_APPOINTMENTS.findIndex((a) => a.id === id);
  if (index === -1) return null;

  global.__BARBER_APPOINTMENTS[index].status = status;
  if (cancellation_reason) {
    global.__BARBER_APPOINTMENTS[index].cancellation_reason = cancellation_reason;
  }
  return global.__BARBER_APPOINTMENTS[index];
}

export function deleteAppointment(id: string): boolean {
  if (!global.__BARBER_APPOINTMENTS) return false;
  const initialLen = global.__BARBER_APPOINTMENTS.length;
  global.__BARBER_APPOINTMENTS = global.__BARBER_APPOINTMENTS.filter((a) => a.id !== id);
  return global.__BARBER_APPOINTMENTS.length < initialLen;
}

export function addService(service: Omit<Service, "id">): Service {
  if (!global.__BARBER_SERVICES) global.__BARBER_SERVICES = [...INITIAL_SERVICES];
  const maxId = global.__BARBER_SERVICES.reduce((max, s) => Math.max(max, s.id), 0);
  const newService: Service = {
    id: maxId + 1,
    ...service,
  };
  global.__BARBER_SERVICES.push(newService);
  return newService;
}

export function deleteService(id: number): boolean {
  if (!global.__BARBER_SERVICES) return false;
  const initialLen = global.__BARBER_SERVICES.length;
  global.__BARBER_SERVICES = global.__BARBER_SERVICES.filter((s) => s.id !== id);
  return global.__BARBER_SERVICES.length < initialLen;
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
