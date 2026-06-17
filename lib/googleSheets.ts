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
  { url: "/images/gallery-images/AHR09106.webp", title: "Science Lab Experiments", category: "Academics" },
  { url: "/images/gallery-images/AHR09127.webp", title: "Space Lab Exploration", category: "Academics" },
  { url: "/images/gallery-images/AHR09134.webp", title: "Investiture Ceremony 2026", category: "Events" },
  { url: "/images/gallery-images/AHR09164.webp", title: "Classical Dance Performance", category: "Cultural" },
  { url: "/images/gallery-images/AHR09237.webp", title: "Annual Sports Day Athletics", category: "Sports" },
  { url: "/images/gallery-images/AHR09383.webp", title: "Computer Science Coding Hub", category: "Academics" },
  { url: "/images/gallery-images/AHR09399.webp", title: "Independence Day Celebrations", category: "Events" },
  { url: "/images/gallery-images/AHR09400.webp", title: "New Campus Infrastructure", category: "Infrastructure" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 01_45_47 PM.png", title: "Inter-House Football Match", category: "Sports" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 01_52_28 PM.png", title: "Republic Day Cultural Program", category: "Cultural" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 01_55_22 PM.png", title: "Telescope Star Gazing Session", category: "Events" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 01_59_16 PM.png", title: "Robotics Design Championship", category: "Academics" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 02_02_25 PM.png", title: "Art & Craft Workshop", category: "Cultural" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 02_38_01 PM.png", title: "Maths Olympiad Hall of Fame", category: "Academics" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 02_40_45 PM.png", title: "Outdoor Yoga & Wellness Session", category: "Sports" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 02_43_10 PM.png", title: "Teachers Day Felicitation Ceremony", category: "Events" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 02_45_25 PM.png", title: "Skating Rink Championship Meet", category: "Sports" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 03_38_22 PM.png", title: "Music Club Vocal Recital", category: "Cultural" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 03_39_47 PM.png", title: "Physics Lab Experimentations", category: "Academics" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 03_42_09 PM.png", title: "Inter-School Chess Masters", category: "Sports" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 03_43_31 PM.png", title: "Annual Day Dramatics", category: "Cultural" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 03_45_53 PM.png", title: "Modern Biology Lab Research", category: "Academics" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 03_47_38 PM.png", title: "Outdoor Basketball Arena", category: "Infrastructure" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 03_49_25 PM.png", title: "Science Model Exhibition Fair", category: "Events" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 03_50_55 PM.png", title: "Digital Interactive Classroom", category: "Infrastructure" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 03_52_10 PM.png", title: "Primary Grades Clay Modelling", category: "Cultural" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 03_53_14 PM.png", title: "Astronomy Club Night Camping", category: "Events" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 03_54_23 PM.png", title: "Chemistry Lab Practical Exam", category: "Academics" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 03_55_35 PM.png", title: "School Choir Performance", category: "Cultural" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 03_56_48 PM.png", title: "Track and Field Sprint Finals", category: "Sports" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 03_58_18 PM.png", title: "Vedic Maths Puzzle Competition", category: "Academics" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 04_02_43 PM.png", title: "Inter-House Debate Contest", category: "Events" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 04_04_27 PM.png", title: "Cricket Nets Practice Session", category: "Sports" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 04_06_16 PM.png", title: "Spacious Library Study Room", category: "Infrastructure" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 04_07_33 PM.png", title: "Fine Arts Painting Gallery", category: "Cultural" },
  { url: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 04_08_28 PM.png", title: "Space Space Lab Models", category: "Infrastructure" },
  { url: "/images/gallery-images/IMG20230623103739-scaled.webp", title: "Kindergarten Play Area Activity", category: "Cultural" },
  { url: "/images/gallery-images/Untitled-design-5.webp", title: "Green Environment Campus Walkway", category: "Infrastructure" }
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
