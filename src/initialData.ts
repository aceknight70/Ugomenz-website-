import { Product, BlogPost, GalleryItem, Lead, Order, ServiceBooking, SupportTicket, ShadowCourse } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Samsung 75-inch Crystal UHD 4K Smart TV',
    brand: 'Samsung',
    category: 'TVs',
    price: 1450000,
    originalPrice: 1600000,
    description: 'Experience stunning 4K resolution with the Samsung Crystal series. Featuring HDR content support, PurColor technology, and smart TV connectivity for Netflix, YouTube, and more. Perfect for luxury home theater setups.',
    specs: [
      'Screen Size: 75 inches',
      'Resolution: 4K UHD (3840 x 2160)',
      'Smart TV: Tizen OS, Wi-Fi Built-in',
      'Connectivity: 3 HDMI, 2 USB, Optical Out',
      'Audio: Adaptive Sound, Dolby Digital Plus'
    ],
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'In Stock',
    quantity: 12
  },
  {
    id: 'prod-2',
    name: 'LG OLED C3 55-inch Evo 4K Smart TV',
    brand: 'LG',
    category: 'TVs',
    price: 1850000,
    originalPrice: 1950000,
    description: 'The ultimate gaming and cinema TV. LG OLED Evo features self-lit pixels for pitch-black contrast and breathtaking brightness. Driven by the a9 AI Processor Gen6 for optimized picture and sound.',
    specs: [
      'Screen Size: 55 inches',
      'Display: OLED Evo (Self-lit Pixels)',
      'Processor: a9 Gen6 AI Processor 4K',
      'Refresh Rate: 120Hz, G-Sync & FreeSync compatible',
      'Smart TV: webOS 23 with ThinQ AI'
    ],
    image: 'https://images.unsplash.com/photo-1601944179066-297acd3ad81e?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'In Stock',
    quantity: 8
  },
  {
    id: 'prod-3',
    name: 'Sony 5.1ch Home Cinema Soundbar with Subwoofer',
    brand: 'Sony',
    category: 'Home Theaters',
    price: 340000,
    originalPrice: 380000,
    description: 'Bring the cinema home with Sony’s 5.1 channel surround soundbar. Set up easily with wireless rear speakers and a powerful wired subwoofer for room-shaking bass.',
    specs: [
      'Total Power: 400W',
      'Audio Channels: 5.1ch Surround',
      'Connectivity: Bluetooth, HDMI ARC, Optical, USB',
      'Special Features: S-Master Digital Amplifier, Night Mode'
    ],
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'Low Stock',
    quantity: 3
  },
  {
    id: 'prod-4',
    name: 'Hisense 100-inch Laser TV Projector System',
    brand: 'Hisense',
    category: 'Home Theaters',
    price: 4950000,
    description: 'The 100L5G Laser Cinema features a short throw smart laser projector and an ambient light-rejecting screen. Experience immersive cinematic spectacle in any room without turning down the lights.',
    specs: [
      'Diagonal Screen: 100 inches',
      'Laser Tech: Trichroma Laser Engine',
      'Brightness: 2700 Lumens',
      'Audio: Built-in 30W Dolby Atmos Speakers',
      'Include: Ceiling/wall rejection ALR screen'
    ],
    image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'In Stock',
    quantity: 5
  },
  {
    id: 'prod-5',
    name: 'Skyworth 43-inch Smart Android Google TV',
    brand: 'Skyworth',
    category: 'TVs',
    price: 245000,
    originalPrice: 280000,
    description: 'Compact, power-efficient, and fully smart. Skyworth Android TV offers Google Play Store, Voice Search Assistant, Chromecast built-in, and boundless full-screen bezel-less engineering.',
    specs: [
      'Screen Size: 43 inches',
      'Platform: Google TV (Android)',
      'Resolution: Full HD 1080p',
      'HDR support: Trochilus Extreme 2.0 Engine',
      'Bezel: Borderless Infinite Screen Design'
    ],
    image: 'https://images.unsplash.com/photo-1552975084-6e027cd345c2?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'In Stock',
    quantity: 25
  },
  {
    id: 'prod-6',
    name: 'JVC 2.1 Channel Bluetooth Soundbar System',
    brand: 'JVC',
    category: 'Sound Systems',
    price: 125000,
    originalPrice: 140000,
    description: 'A compact and elegant boost for your TV audio. Built-in bluetooth permits easy music streaming from your mobile device, while optical and Aux inputs link seamlessly to any flat-screen television.',
    specs: [
      'Type: 2.1ch Soundbar with Built-in Subwoofers',
      'Total Output: 120W',
      'Modes: Movie, Music, News EQ settings',
      'Specialty: Rich dialogue enhancement tech'
    ],
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'Out of Stock',
    quantity: 0
  },
  {
    id: 'prod-7',
    name: 'Sony Alpha 7 IV Full-Frame Camera',
    brand: 'Sony',
    category: 'Cameras',
    price: 2650000,
    originalPrice: 2800000,
    description: 'Groundbreaking hybrid photo and video specs. Sony Alpha 7 IV raises the bar for resolution, autofocus, and 4K video recording, designed for professional creators and luxury studios in Warri.',
    specs: [
      'Sensor: 33MP Full-Frame Exmor R CMOS',
      'AF System: 759-point Real-time Tracking AF',
      'Video: 4K 60p 10-bit 4:2:2 video mapping',
      'Stabilization: 5-axis Active SteadyShot'
    ],
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'In Stock',
    quantity: 4
  },
  {
    id: 'prod-8',
    name: 'Ugomenz Premium Surge Protector & Power Stabilizer',
    brand: 'Skyworth',
    category: 'Accessories',
    price: 45000,
    description: 'Heavy duty automatic voltage regulator (AVR) crafted specifically for sensitive TVs, audio installations, and video engines against fluctuating power grids.',
    specs: [
      'Input Range: 140V - 260V stable correction',
      'Outflow rating: 2000VA max output',
      'Safety: Extreme high/low voltage surge cut-off',
      'Outlets: 4 Protected Nigerian-standard sockets'
    ],
    image: 'https://images.unsplash.com/photo-1624996379697-f01d168b1a52?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'In Stock',
    quantity: 50
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How to Position Your Home Theater Speakers for true Dolby Atmos Ambient Audio',
    excerpt: 'Setting up soundbars or 5.1 systems needs intentional placement. Our installation specialists unpack guidelines for premium acoustics in Nigerian living rooms.',
    body: `Are you getting the absolute best performance from your home cinema? Many people spend hundreds of thousands of Naira on modern soundbars or discrete home theater installations, yet misplace the speakers and miss out on true, room-filling spatial sweep.

Here’s the definitive speaker setup blueprint from Fortune and the Ugomenz technical installation crew in Warri:

1. **The Center Speaker is King**: This carries 80% of vocals and action. Position it directly underneath or above your TV, centered with your sitting arrangement. Never hide it inside a closed drawer.
2. **Left/Right Symmetry**: Place these at 30-degree angles to your face. They should be at ear-level when seated.
3. **Subwoofer Physics**: Bass waves are omnidirectional, but shoving a subwoofer directly in a tight corner creates boomy, muddy bass. Position it at least 30cm off the walls and ideally to the side of your TV console.
4. **Dolby Atmos Angle**: Soundbar systems with upward-firing speakers bounce sound off the ceiling. Keep the space between the soundbar and the ceiling transparent and clear.

Need help? Click "Book a Service" on our layout menu and our team will install and soundstage your system perfectly!`,
    category: 'Tech Tips',
    date: '2026-05-20',
    image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=600&q=80',
    author: 'Fortune Akioya',
    shares: 42
  },
  {
    id: 'blog-2',
    title: 'The Real Difference Between OLED, QLED, and Crystal UHD TVs Explained',
    excerpt: 'Before paying for a new TV screen, understand what screen panel technology best matches your home lighting and electrical specs.',
    body: `Walking into our Showroom in Warri, you'll see stunning screens displaying colorful scenes. But behind the brand names (Samsung, LG, Hisense, Skyworth) are very different technologies.

Let's break down the three primary panel technologies:

### 1. Crystal UHD (LED)
- **What it is**: Traditional LED screens illuminated by backlights.
- **Why buy**: Extremely budget-friendly and gets bright.
- **Best for**: Standard living rooms, bedrooms, and commercial sports viewing kiosks.
- **Top Brand**: Samsung.

### 2. QLED
- **What it is**: Adds a Quantum Dot layer to LED, enabling vibrant, punchy colors.
- **Why buy**: Amazing brightness that easily counters glare, great for daytime rooms.
- **Best for**: Sunny rooms where windows stay open.
- **Top Brand**: Hisense, Samsung.

### 3. OLED
- **What it is**: Each pixel creates its own independent light. No backlight.
- **Why buy**: Breathtaking infinite contrast, pure pitch-blacks, supreme gaming specs.
- **Best for**: Dedicated cinema spaces and nighttime viewers who love premium quality.
- **Top Brand**: LG, Sony.

Stop by Ugomenz Electronics Sales & Service Center to see these side-by-side!`,
    category: 'How-To Guides',
    date: '2026-05-24',
    image: 'https://images.unsplash.com/photo-1601944179066-297acd3ad81e?auto=format&fit=crop&w=600&q=80',
    author: 'Fortune Akioya',
    shares: 28
  },
  {
    id: 'blog-3',
    title: 'Hisense vs Samsung: Which Brand Reigns Supreme for Smart TVs in 2026?',
    excerpt: 'We analyze warranty coverages, smart hubs, screen lifetimes, and remote features to help you finalize your decision.',
    body: `It's the most common debate in our store: "Should I buy Hisense or Samsung?"

Samsung is the established premium pioneer, holding patents on Crystal UHD. LG relies on high-end OLED. Meanwhile, Hisense has aggressively captured the market by providing 100-inch smart systems and beautiful LED units at highly competitive price tags.

Here's our local service report:
- **Operating System**: Samsung's Tizen is packed with global links, but Hisense's VIDAA OS is incredibly fast in low-bandwidth scenarios of Nigeria.
- **Warranty**: JVC and Skyworth are reliable, but Hisense leads with superb multi-year local warranty packages which we honor directly in our Warri repair shop.
- **Surge Resilience**: LG and Samsung build supreme board regulators, but we always mandate pairing either with an automatic voltage stabilizer like our Ugomenz heavy-duty AVR units.`,
    category: 'Brand News',
    date: '2026-05-27',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80',
    author: 'Dr. Efemena Akioya',
    shares: 19
  }
];

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Luxury Home Cinema setup in Effurun, Warri',
    category: 'Home Setups',
    image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=1200&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', // Empty concrete/messy room before
    caption: 'Before: Plain plaster walls. After: Premium acoustic timber panelling, floating TV console, Hisense 100-inch Laser TV, and Sony Atmos Soundbar.'
  },
  {
    id: 'gal-2',
    title: 'Modern Corporate Boardroom Audio-Visual Alignment',
    category: 'Office Setups',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    caption: 'Clean, elegant install with dual 75-inch screens, cable tracking management beneath the long glass mahogany conference table, and voice-tracking soundbar.'
  },
  {
    id: 'gal-3',
    title: 'Church Event Sanctuary Audio Alignment',
    category: 'Event Setups',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
    caption: 'Full-stage line installations. Tuned JVC systems, customized wireless distribution links, and overhead display screens for maximum audience visibility.'
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Godstime Efeturi',
    phone: '08034567812',
    email: 'godstime009@gmail.com',
    purpose: 'Get a Quote',
    message: 'Searching for wholesale price quote for 5 units of 43-inch TVs for my new guest home in Effurun.',
    date: '2026-05-28',
    status: 'New'
  },
  {
    id: 'lead-2',
    name: 'Amara Nwabueze',
    phone: '09051234900',
    email: 'amara.n@yahoo.com',
    purpose: 'Book a Service',
    message: 'I have an older JVC home theater that isn’t outputting sound from the left surround speaker. Need repair booking.',
    date: '2026-05-27',
    status: 'Contacted',
    notes: 'Called Amara. Confirmed appointment scheduled for tomorrow 10am.'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    customerName: 'Tari Opubo',
    customerPhone: '08122345567',
    items: [
      {
        productId: 'prod-1',
        name: 'Samsung 75-inch Crystal UHD 4K Smart TV',
        brand: 'Samsung',
        price: 1450000,
        quantity: 1
      },
      {
        productId: 'prod-8',
        name: 'Ugomenz Premium Surge Protector & Power Stabilizer',
        brand: 'Skyworth',
        price: 45000,
        quantity: 1
      }
    ],
    subtotal: 1495000,
    status: 'Paid',
    date: '2026-05-28',
    notes: 'Deliver to Delta Mall layout, Warri. Included installation.'
  },
  {
    id: 'ord-1002',
    customerName: 'Ekemini Bassey',
    customerPhone: '07039485761',
    items: [
      {
        productId: 'prod-3',
        name: 'Sony 5.1ch Home Cinema Soundbar with Subwoofer',
        brand: 'Sony',
        price: 340000,
        quantity: 2
      }
    ],
    subtotal: 680000,
    status: 'Pending',
    date: '2026-05-28',
    notes: 'Customer inquiring about shipment timelines. Self-pickup at Warri showroom option.'
  }
];

export const INITIAL_SERVICE_BOOKINGS: ServiceBooking[] = [
  {
    id: 'srv-1',
    serviceName: 'Product Installation',
    date: '2026-05-30',
    customerName: 'Engr. Victor Temisan',
    customerPhone: '08023455431',
    location: 'Airport Road Layout, Warri',
    details: 'Wall-mount installation of a newly purchased 100" Projection TV. Masonry wood backing already prepared.',
    status: 'Pending'
  },
  {
    id: 'srv-2',
    serviceName: 'Repairs & Maintenance',
    date: '2026-05-29',
    customerName: 'Chief Helen Ogbe',
    customerPhone: '08167733440',
    location: 'G.R.A, Warri',
    details: 'Samsung TV sound turns on but display remains black. Diagnosed backlighting issues.',
    status: 'Followed Up'
  }
];

export const INITIAL_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-1',
    referenceNumber: 'UGM-88902',
    customerName: 'Tunde Alabi',
    customerPhone: '08055663321',
    issueType: 'Report a Fault',
    description: 'The soundbar subwoofer keeps disconnecting from the main audio soundbar panel every 5 mins.',
    status: 'In Progress',
    lastUpdated: '2026-05-28 14:30',
    date: '2026-05-27'
  },
  {
    id: 'tkt-2',
    referenceNumber: 'UGM-44510',
    customerName: 'Blessing Okpako',
    customerPhone: '07080902211',
    issueType: 'Track Order',
    description: 'Awaiting delivery team contact. Order #ord-1001 details check.',
    status: 'Resolved',
    lastUpdated: '2026-05-28 16:15',
    date: '2026-05-28'
  }
];

export const SHADOW_COURSES: ShadowCourse[] = [
  {
    id: 'crs-1',
    title: 'Mobile Device & TV Repairs (Repairs & Maintenance)',
    icon: 'Hammer',
    duration: '12 Weeks',
    level: 'Beginner',
    modules: [
      'Basic Physics of Semiconductors & PCBs',
      'Diagnosing Power Supply Boards & Inverters',
      'Soldering techniques for microelectronic chips',
      'LED/OLED Screen Replacement & backlights board swapping',
      'Practical workshop and live consumer repair internship'
    ],
    forWho: 'Young minds, technicians, school-leavers looking to become self-reliant repair professionals.',
    outcome: 'Certificate in Professional Electronics Maintenance, internship placement in the Ugomenz technical lab, and starter repairs toolkit.',
    intakeDates: ['10th June 2026', '12th August 2026'],
    availableSlots: 6
  },
  {
    id: 'crs-2',
    title: 'Customer Relations Management (CRM & Customer Management)',
    icon: 'Users',
    duration: '6 Weeks',
    level: 'Intermediate',
    modules: [
      'Digital communication templates via WhatsApp Business',
      'Customer database indexing and lead tracking methodologies',
      'Handling consumer objections and warranty negotiation',
      'Managing tickets and after-sales customer satisfaction indicators'
    ],
    forWho: 'Store managers, customer reps, assistants looking to excel in retail operations management.',
    outcome: 'Ugomenz Sales & CRM Excellence Accreditation, and CRM software license.',
    intakeDates: ['15th June 2026'],
    availableSlots: 4
  },
  {
    id: 'crs-3',
    title: 'Digital Marketing & Community Building Strategy',
    icon: 'Megaphone',
    duration: '8 Weeks',
    level: 'Beginner',
    modules: [
      'Masonry branding styles for visual marketplaces (Instagram, Pinterest)',
      'Designing engaging product videos and setup sliders',
      'Writing highly optimized SEO local articles',
      'Constructing broadcasts to grow subscribers on WhatsApp'
    ],
    forWho: 'Aspiring brand managers, social media marketers, and design content creators.',
    outcome: 'Digital Advertising Portfolio development guidance, case study on Ugomenz viral growth.',
    intakeDates: ['1st July 2026'],
    availableSlots: 8
  },
  {
    id: 'crs-4',
    title: 'Electronics Product Retail & Entrepreneurship (Business Growth)',
    icon: 'Briefcase',
    duration: '10 Weeks',
    level: 'Advanced',
    modules: [
      'Establishing international brand dealerships (Sony, LG, Samsung)',
      'Pricing algorithms in fluctuating supply markets',
      'Inventory control, bulk ledger audits, and stock reconciliation',
      'Setting up physical showrooms vs digital storefronts'
    ],
    forWho: 'Entrepreneurs looking to enter the high-margin retail consumer electronics industry.',
    outcome: 'Drafted 3-year business plan audit, and supplier connections introduction.',
    intakeDates: ['5th July 2026'],
    availableSlots: 5
  },
  {
    id: 'crs-5',
    title: 'Service Operations & Logistics Management (Operations & Growth)',
    icon: 'Truck',
    duration: '6 Weeks',
    level: 'Intermediate',
    modules: [
      'Managing physical deliveries and remote technicians routing',
      'Site safety protocols for wall installations',
      'Pricing labor, parts, and transport margins',
      'Automated scheduling calendars setup'
    ],
    forWho: 'Logistics supervisors, workshop managers, and service agency operators.',
    outcome: 'Service Logistics playbook and digital deployment toolkit access.',
    intakeDates: ['20th June 2026'],
    availableSlots: 3
  }
];
