import Papa from 'papaparse';

// We import cacheLife from next directly.
// In Next.js 16.2, "use cache" and cacheLife('hours') are supported as server-side directives.
// Note: 'use cache' is a file-level or function-level directive.
// We declare it at the top of the functions or file.

export interface GalleryImage {
  url: string;
  title: string;
  category: string;
}

export interface NewsArticle {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  author: string;
  content: string;
}

const FALLBACK_GALLERY: GalleryImage[] = [
  { url: "/images/children.jpg", title: "Annual Sports Meet 2026", category: "Sports" },
  { url: "/images/images_3.jpg", title: "Science Exhibition Project Displays", category: "Academics" },
  { url: "/images/images_4.jpg", title: "Space Lab Telescope Session", category: "Events" },
  { url: "/images/cmr_school.webp", title: "Independence Day Cultural Performance", category: "Cultural" },
  { url: "/images/building_image.webp", title: "New Classroom Infrastructure", category: "Infrastructure" },
  { url: "/images/computer_class.jpg", title: "Maths Olympiad Winners", category: "Academics" },
  { url: "/images/children.jpg", title: "Inter-School Chess Tournament", category: "Sports" },
  { url: "/images/cmr_school.webp", title: "School Art & Craft Exhibition", category: "Cultural" },
  { url: "/images/transport.webp", title: "Smart Classroom Digital Session", category: "Infrastructure" },
  { url: "/images/children.jpg", title: "District Level Skating Champions", category: "Sports" },
  { url: "/images/building_image.webp", title: "Astronomy Model Making", category: "Events" },
  { url: "/images/children.jpg", title: "Yoga & Physical Health Session", category: "Sports" }
];

// Fallback Mock News Data
const FALLBACK_NEWS: NewsArticle[] = [
  {
    slug: "sports-day-2026",
    title: "Annual Sports Day 2026 Celebrates Athletic Excellence",
    date: "April 2026",
    category: "Events",
    excerpt: "A grand celebration of sportsmanship, speed, and endurance featuring inter-house athletic track meets and field challenges.",
    author: "Physical Education Department",
    content: "Our Annual Sports Day 2026 was celebrated with immense enthusiasm and energy. The event was inaugurated by the Founder Chairman Sri Ch. Malla Reddy. Students from all grades participated in track and field events including sprints, relays, long jump, and shot put. The Green House bagged the overall Championship Trophy, while the Blue House won the Best March Past award. Parents turned out in large numbers to support the children, making it a highly successful day of athletic excellence."
  },
  {
    slug: "sof-olympiad-rankings",
    title: "CMR Students Top SOF Olympiad Rankings in Hyderabad",
    date: "March 2026",
    category: "Academics",
    excerpt: "Students of Grades III to VIII secure top ranks in the Science and Mathematics Olympiad foundation tests city-wide.",
    author: "Academic Coordinator",
    content: "We are proud to announce that students of CMR School Kompally have achieved exceptional rankings in the Science Olympiad Foundation (SOF) Olympiad exams. Multiple students secured international and zonal ranks in Science, Mathematics, and English Olympiads. The winners were felicitated by Director Mrs. P. Snithija Reddy and Principal Mrs. B. Uma Devi Sharma during the morning assembly. We congratulate our students, teachers, and parents for this remarkable academic milestone."
  },
  {
    slug: "space-lab-inaugurated",
    title: "New Space Lab Inaugurated by District Education Officer",
    date: "February 2026",
    category: "Academics",
    excerpt: "District Education Officer officially opens the Space Lab astronomy room, encouraging students to explore astrophysics.",
    author: "Science Department",
    content: "CMR School Kompally inaugurated its brand new Space Lab, a dedicated facility to study astronomy, space exploration, and astrophysics. The lab was inaugurated by the District Education Officer, who appreciated the school's foresight in setting up such a high-end facility for young learners. The Space Lab features high-power refractor telescopes, star chart maps, solar system simulators, and astrophotography equipment, which will be integrated with the regular CBSE science curriculum from Grade VI onwards."
  },
  {
    slug: "parent-teacher-meeting-progress",
    title: "Parent-Teacher Meeting Highlights Student Progress",
    date: "January 2026",
    category: "Events",
    excerpt: "Interactive meetings held to map student growth patterns, academic scores, and co-curricular milestones.",
    author: "Administration",
    content: "The third Parent-Teacher Meeting (PTM) for the academic year 2025-26 was held on campus to discuss student performance, progress reports, and strategies for final term exams. Parents interacted directly with class teachers and subject heads. The focus was on identifying individual student strengths and learning gaps, ensuring holistic support both at home and school. Feedback on facilities and cocurricular programs was also gathered to continuously improve our school's offerings."
  },
  {
    slug: "chess-team-wins",
    title: "CMR Chess Team Wins Inter-School Tournament",
    date: "December 2025",
    category: "Sports",
    excerpt: "CMR Kompally's chess team wins top honors in the Inter-School Chess Championship, showing strategic dominance.",
    author: "Sports Club Coordinator",
    content: "Our school's Chess Team emerged victorious at the Inter-School Chess Championship held at Hyderabad. Competing against 24 schools, our team showed excellent concentration and strategic foresight, winning five out of six rounds in the finals. Master Karthik from Grade VII was named the Tournament MVP for winning all his individual games. The school management congratulates the team on this well-deserved victory."
  },
  {
    slug: "admissions-open-2026-27",
    title: "Admissions Open for 2026-27 Academic Year",
    date: "November 2025",
    category: "Admissions",
    excerpt: "Admissions are officially open for Grades Nursery through VIII. Enquire online or visit our Kompally campus today.",
    author: "Admissions Desk",
    content: "CMR School Kompally announces the commencement of admissions for the academic session 2026-27 for classes Nursery to Grade VIII. Parents are invited to fill out the online enquiry form or visit the school campus for a detailed tour of our 5-acre smart campus, advanced labs, and sports facilities. Registrations are processed on a first-come, first-served basis. Secure your child's future with quality CBSE education and holistic learning today."
  }
];

export async function getGalleryImages(): Promise<GalleryImage[]> {
  'use cache';
  // Note: we can use import { cacheLife } from 'next/dist/server/use-cache/cache-life' here or directly
  // inside the function block if needed, but in next 16, using "use cache" tells Next.js to cache the return.
  try {
    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (!sheetId || sheetId === 'your_sheet_id_here') {
      return FALLBACK_GALLERY;
    }
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=gallery`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch Google Sheets CSV data");
    const csv = await res.text();
    const parsed = Papa.parse(csv, { header: true });
    
    if (parsed.errors && parsed.errors.length > 0) {
      console.warn("CSV parsing errors occurred: ", parsed.errors);
    }
    
    const data = parsed.data as any[];
    return data.map(item => ({
      url: item.url || '',
      title: item.title || '',
      category: item.category || 'General'
    })).filter(item => item.title !== '');
  } catch (error) {
    console.error("Error fetching gallery from Google Sheets:", error);
    return FALLBACK_GALLERY;
  }
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  'use cache';
  try {
    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (!sheetId || sheetId === 'your_sheet_id_here') {
      return FALLBACK_NEWS;
    }
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=news`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch Google Sheets CSV data");
    const csv = await res.text();
    const parsed = Papa.parse(csv, { header: true });
    
    if (parsed.errors && parsed.errors.length > 0) {
      console.warn("CSV parsing errors occurred: ", parsed.errors);
    }
    
    const data = parsed.data as any[];
    return data.map(item => ({
      slug: item.slug || '',
      title: item.title || '',
      date: item.date || '',
      category: item.category || 'General',
      excerpt: item.excerpt || '',
      author: item.author || 'CMR Admin',
      content: item.content || ''
    })).filter(item => item.slug !== '');
  } catch (error) {
    console.error("Error fetching news from Google Sheets:", error);
    return FALLBACK_NEWS;
  }
}
