export const SCHOOL_NAME = "CMR School Kompally";
export const SCHOOL_ADDRESS = "GF95+VF8, 02-092//3/A, Pipeline Rd, IDA Jeedimetla, Hyderabad, Telangana 500055";
export const SCHOOL_PHONE = "+91 91009 76622";
export const SCHOOL_EMAIL = "school@cmrschoolkompally.com";
export const SCHOOL_TIMINGS = "8:30 AM - 3:30 PM (Monday to Saturday)";

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  youtube: "https://youtube.com",
  twitter: "https://twitter.com",
  whatsapp: "https://wa.me/919100976622"
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "About School", href: "/about" },
      { label: "Principal's Desk", href: "/about/principal" },
      { label: "Management Team", href: "/about/management" },
      { label: "School Values", href: "/about/values" },
      { label: "Gallery", href: "/gallery" }
    ]
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Overview", href: "/academics" },
      { label: "Curriculum", href: "/academics/curriculum" },
      { label: "IIT Foundation", href: "/academics/iit-foundation" },
      { label: "Space Lab", href: "/academics/labs/space" },
      { label: "Science Lab", href: "/academics/labs/science" },
      { label: "Maths Lab", href: "/academics/labs/maths" },
      { label: "Computer Lab", href: "/academics/labs/computer" }
    ]
  },
  {
    label: "Co-Curricular",
    href: "/co-curricular",
    children: [
      { label: "Activities Grid", href: "/co-curricular" },
      { label: "Dance", href: "/co-curricular/dance" },
      { label: "Music", href: "/co-curricular/music" },
      { label: "Art & Craft", href: "/co-curricular/art-craft" },
      { label: "Chess", href: "/co-curricular/chess" },
      { label: "Cricket", href: "/co-curricular/cricket" },
      { label: "Tennis", href: "/co-curricular/tennis" },
      { label: "Basketball", href: "/co-curricular/basketball" },
      { label: "Athletics", href: "/co-curricular/athletics" },
      { label: "Kho-Kho", href: "/co-curricular/kho-kho" },
      { label: "Kabaddi", href: "/co-curricular/kabaddi" },
      { label: "Skating", href: "/co-curricular/skating" },
      { label: "Table Tennis", href: "/co-curricular/table-tennis" },
      { label: "Carrom", href: "/co-curricular/carrom" }
    ]
  },
  { label: "Blog", href: "/news" },
  { label: "Admissions", href: "/admissions" },
  { label: "Contact Us", href: "/contact" }
];

export const PROGRAMS = [
  {
    name: "Pre-Primary",
    accent: "green",
    description: "Lay the foundation for a lifetime of learning with our engaging Pre-Primary curriculum, designed to nurture the holistic development of young minds.",
    link: "/academics/curriculum#pre-primary"
  },
  {
    name: "Primary",
    accent: "orange",
    description: "Empower young learners to explore, discover, and excel with our comprehensive Primary curriculum, fostering academic growth and essential life skills.",
    link: "/academics/curriculum#primary"
  },
  {
    name: "Secondary",
    accent: "navy",
    description: "Forge a path to success with our rigorous Secondary curriculum, preparing students for future academic pursuits and real-world challenges.",
    link: "/academics/curriculum#secondary"
  },
  {
    name: "High School",
    accent: "gold",
    description: "Achieve your highest potential with our advanced High School program, designed to prepare students for competitive examinations and higher education.",
    link: "/academics/curriculum#high-school"
  }
];

export const STATS = [
  { value: 5, suffix: "+", label: "World-Class Facilities" },
  { value: 1500, suffix: "+", label: "Enrolled Students" },
  { value: 15, suffix: "+", label: "Years of Educational Legacy" },
  { value: 10, suffix: "+", label: "Active Clubs" }
];

export const FACILITIES = [
  {
    icon: "Building",
    title: "5 Acres Campus",
    description: "Vibrant, green and spacious school campus designed to inspire learning and growth."
  },
  {
    icon: "Tv",
    title: "Digital Classrooms",
    description: "Equipped with modern smartboards and interactive tools for technology-integrated learning."
  },
  {
    icon: "Users",
    title: "10+ Clubs",
    description: "Diverse clubs covering debate, drama, environment, astronomy, and community service."
  },
  {
    icon: "FlaskConical",
    title: "10+ Labs",
    description: "Advanced spatial, scientific, mathematical and computing labs for practical investigations."
  }
];

export const FAQ_ITEMS = [
  {
    question: "What board does CMR School Kompally follow?",
    answer: "CMR School Kompally follows the Central Board of Secondary Education (CBSE) curriculum, one of India's most recognized educational boards."
  },
  {
    question: "What classes are offered at CMR School Kompally?",
    answer: "We offer classes from Nursery through Grade VIII, covering Pre-Primary, Primary, Secondary, and High School levels."
  },
  {
    question: "What are the school timings?",
    answer: "School timings are from 8:30 AM to 3:30 PM, Monday to Saturday."
  },
  {
    question: "Is transportation available?",
    answer: "Yes, we provide safe and reliable transportation covering major areas of Hyderabad and Kompally."
  },
  {
    question: "What facilities are available on campus?",
    answer: "Our 5-acre campus includes digital classrooms, science labs, a space lab, maths lab, computer lab, sports grounds, and more."
  },
  {
    question: "How can I apply for admissions?",
    answer: "Visit our Admissions page or contact us directly at the school office. We accept applications for the new academic year from January onwards."
  },
  {
    question: "Does CMR offer any special academic programs?",
    answer: "Yes, we offer the IIT Foundation program from Grade VI onwards, along with SOF Olympiad coaching and various competitive exam preparation."
  },
  {
    question: "Are there co-curricular activities?",
    answer: "Absolutely! We offer 10+ clubs including dance, music, art, chess, cricket, basketball, skating, and many more."
  }
];

export const TESTIMONIALS = [
  {
    name: "Mrs. Priya Sharma",
    role: "Parent of Grade V student",
    rating: 5,
    quote: "CMR School has transformed my child's learning. The teachers are dedicated and the facilities are excellent. My daughter loves going to school every day!"
  },
  {
    name: "Mr. Rajesh Kumar",
    role: "Parent of Grade VII student",
    rating: 5,
    quote: "The IIT Foundation program at CMR is outstanding. My son's problem-solving skills have improved dramatically since joining."
  },
  {
    name: "Mrs. Anitha Reddy",
    role: "Parent of Grade III student",
    rating: 5,
    quote: "The best decision we made was enrolling our child at CMR Kompally. Holistic development is truly their focus."
  }
];

export const CO_CURRICULAR_ACTIVITIES = [
  {
    slug: "dance",
    name: "Dance",
    category: "Arts & Culture",
    icon: "Sparkles",
    description: "Classical and contemporary dance styles that improve body coordination, expression, and rhythm.",
    benefits: [
      "Develops coordination and physical flexibility",
      "Encourages creative expression and confidence",
      "Teaches cultural heritage and art forms",
      "Promotes team work and stage presence"
    ],
    achievements: "Winner of Inter-School Cultural Dance Championship 2025."
  },
  {
    slug: "music",
    name: "Music",
    category: "Arts & Culture",
    icon: "Music",
    description: "Vocal and instrumental training to appreciate music theory and discover melodic skills.",
    benefits: [
      "Enhances cognitive memory and concentration",
      "Teaches auditory coordination and pitch",
      "Fosters discipline and patience",
      "Builds performance confidence on stage"
    ],
    achievements: "First place in the Regional Choir Competition, Hyderabad."
  },
  {
    slug: "art-craft",
    name: "Art & Craft",
    category: "Arts & Culture",
    icon: "Palette",
    description: "Nurturing fine motor skills and creativity through drawing, painting, and sculpting.",
    benefits: [
      "Refines fine motor skills",
      "Improves spatial intelligence and logic",
      "Provides healthy emotional expression outlet",
      "Encourages resourcefulness and DIY learning"
    ],
    achievements: "Annual exhibition showcase featuring 500+ student masterpieces."
  },
  {
    slug: "chess",
    name: "Chess",
    category: "Indoor Sports",
    icon: "Crown",
    description: "Developing strategic foresight, tactical planning, and analytical thinking.",
    benefits: [
      "Improves problem-solving and critical thinking",
      "Enhances memory recall and focus",
      "Teaches strategic thinking and sportsmanship",
      "Boosts spatial visualization skills"
    ],
    achievements: "CMR Chess Team won first place in the Inter-School Tournament in December 2025."
  },
  {
    slug: "table-tennis",
    name: "Table Tennis",
    category: "Indoor Sports",
    icon: "Flame",
    description: "Fast-paced indoor sport improving reaction times, hand-eye coordination, and agility.",
    benefits: [
      "Improves hand-eye coordination",
      "Increases mental alertness and reflex speeds",
      "Low joint-stress cardiorespiratory exercise",
      "Builds speed and tactical agility"
    ],
    achievements: "Represented school in CBSE National Table Tennis cluster matches."
  },
  {
    slug: "carrom",
    name: "Carrom",
    category: "Indoor Sports",
    icon: "CircleDot",
    description: "A traditional board sport teaching angle physics, focus, and micro-precision.",
    benefits: [
      "Improves visual-spatial reasoning",
      "Builds concentration and target aiming",
      "Teaches primary geometry principles in action",
      "Promotes positive peer-level social bonding"
    ],
    achievements: "Intra-school Carrom Championship organized annually with 200+ participants."
  },
  {
    slug: "cricket",
    name: "Cricket",
    category: "Outdoor Sports",
    icon: "ShieldAlert",
    description: "Building team synergy, physical endurance, and batting/bowling techniques.",
    benefits: [
      "Promotes physical endurance and cardiovascular health",
      "Enhances social integration and leadership skills",
      "Develops situational tactical decision-making",
      "Nurtures patience and game planning"
    ],
    achievements: "Under-14 Cricket Team reached the Hyderabad Zonal Finals."
  },
  {
    slug: "tennis",
    name: "Tennis",
    category: "Outdoor Sports",
    icon: "Target",
    description: "Fostering stamina, court speed, and precise racquet control.",
    benefits: [
      "Enhances dynamic speed and acceleration",
      "Develops mental strength under pressure",
      "Fosters high hand-eye coordination",
      "Builds full-body muscular tone and agility"
    ],
    achievements: "Two students qualified for the state-level Lawn Tennis singles."
  },
  {
    slug: "basketball",
    name: "Basketball",
    category: "Outdoor Sports",
    icon: "Target",
    description: "A dynamic sport teaching court coordination, vertical jump, and teamwork.",
    benefits: [
      "Builds bone strength and motor control",
      "Teaches high-speed spatial coordination",
      "Promotes effective team communication",
      "Improves metabolic speed and physical stamina"
    ],
    achievements: "Winner of the Annual Inter-School Basketball League (Boy's Division)."
  },
  {
    slug: "athletics",
    name: "Athletics",
    category: "Outdoor Sports",
    icon: "Zap",
    description: "Fostering speed, raw stamina, and techniques in track and field events.",
    benefits: [
      "Builds foundational physical health",
      "Increases self-discipline and goal setting",
      "Teaches endurance, sprint and jump mechanics",
      "Promotes personal record tracking"
    ],
    achievements: "Bagged 5 gold, 3 silver medals at District Athletics meet 2026."
  },
  {
    slug: "kho-kho",
    name: "Kho-Kho",
    category: "Outdoor Sports",
    icon: "Share2",
    description: "Traditional Indian tag sport demanding instant reflexes and rapid speed bursts.",
    benefits: [
      "Promotes rapid agility and reaction speeds",
      "Builds high stamina and physical fitness",
      "Nurtures strategic tracking and dodging",
      "Fosters strong regional sporting spirit"
    ],
    achievements: "CBSE Cluster Kho-Kho championship participants."
  },
  {
    slug: "kabaddi",
    name: "Kabaddi",
    category: "Outdoor Sports",
    icon: "Activity",
    description: "An intense contact sport focusing on breath control, strength, and defensive strategies.",
    benefits: [
      "Builds immense physical power and lungs stamina",
      "Develops quick escape strategies",
      "Teaches cooperative defense maneuvers",
      "Promotes extreme mental focus"
    ],
    achievements: "Intra-city Kabaddi Carnival runners-up."
  },
  {
    slug: "skating",
    name: "Skating",
    category: "Outdoor Sports",
    icon: "Wind",
    description: "Improving body balance, lower-body power, and speed control on wheels.",
    benefits: [
      "Builds outstanding balance and stability",
      "Low impact aerobic training for muscles",
      "Fosters coordination and posture control",
      "Improves spatial awareness and speed management"
    ],
    achievements: "District level skating championship gold medalist from Grade VI."
  }
];

export const LAB_PAGES = {
  space: {
    title: "Space Lab",
    description: "Our innovative Space Lab is an astronomy-centered exploration chamber. Designed to inspire future astronomers, physicists, and space engineers, it connects academic curricula with physical models of the universe.",
    equipment: [
      "Professional-grade Refractor and Reflector Telescopes",
      "Interactive 3D Planetarium projections",
      "High-fidelity models of the Solar System and space probes",
      "High-resolution celestial and star chart maps",
      "Astrophotography gear and star-gazing planning software"
    ]
  },
  science: {
    title: "Science Lab",
    description: "The Science Lab provides separate, fully equipped sections for Physics, Chemistry, and Biology experiments. It is built to safely host research activities matching the CBSE curriculum guidelines.",
    equipment: [
      "Advanced Monocular and Binocular Microscopes",
      "CBSE-aligned Chemistry reagent stations and fume hoods",
      "Electrical boards, resistance kits, prisms, and lenses",
      "Anatomical biological skeletal and organ systems models",
      "Digital measurement systems for data logging"
    ]
  },
  maths: {
    title: "Maths Lab",
    description: "The Mathematics Lab converts abstract calculations into tangible, hands-on understanding. It utilizes geometrical shapes, wooden models, and activities to clarify algebraic and arithmetic problems.",
    equipment: [
      "Geometrical boards (Geoboards) and 3D wire shapes",
      "Vedic Math educational charts and boards",
      "Mathematical manipulative blocks, fractions tiles",
      "Graphical layout tools and large-scale geometry boards",
      "Computational math puzzle solvers and logic games"
    ]
  },
  computer: {
    title: "Computer Lab",
    description: "Our state-of-the-art Computer Lab focuses on digital literacy, robotics, and fundamental programming skills. Students gain practical experience with modern operating systems and coding environments.",
    equipment: [
      "Modern Core-i5 systems connected in a secure LAN",
      "High-speed fiber internet connection with educational filters",
      "Arduino and Raspberry Pi robotics boards and sensors",
      "Block-based coding (Scratch) and Python scripting environments",
      "Interactive Smart Board for digital instruction"
    ]
  }
};
