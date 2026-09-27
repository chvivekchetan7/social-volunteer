import React, { createContext, useContext, useState, useEffect } from 'react';

const CMSContext = createContext();

// LocalStorage Helper
const getStored = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
};

const setStored = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
};

// Initial Fallback Data
const initialHero = {
  eyebrow: 'EMPOWERING COMMUNITIES TOGETHER',
  heading: 'Make a Real Difference',
  highlightText: 'in Your Community',
  description: 'Join thousands of volunteers creating positive social impact. Discover meaningful opportunities that match your passion and build your verified impact record.',
  bgImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80',
  overlayDarkness: 0.75,
  primaryCtaText: 'Become a Social Volunteer',
  secondaryCtaText: 'Find Opportunities',
};

const initialOpportunities = [
  {
    id: 'opp-1',
    title: 'Weekend Mathematics & Digital Literacy Tutor',
    organisation: 'Shiksha Learning Hubs',
    cause: 'Education',
    location: 'Bengaluru, KA',
    type: 'In-person',
    date: 'Sat, Oct 4, 2026 • 10:00 AM',
    commitment: 'Weekend (4 hrs/wk)',
    hours: 4,
    placesLeft: 6,
    deadline: 'Oct 2, 2026',
    coordinator: 'Priya Sharma (Head Educator)',
    meetingPoint: 'Community Center, Indiranagar',
    description: 'Teach foundational mathematics and basic computer operations to 5th-8th grade students from underprivileged background.',
    status: 'Published',
    featured: true,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'opp-2',
    title: 'Diagnostic Camp Operations & Registration Lead',
    organisation: 'Swasthya Seva Foundation',
    cause: 'Healthcare',
    location: 'Patna, BR',
    type: 'In-person',
    date: 'Sun, Oct 5, 2026 • 08:30 AM',
    commitment: 'Single Shift (6 hrs)',
    hours: 6,
    placesLeft: 4,
    deadline: 'Oct 3, 2026',
    coordinator: 'Rajesh Kumar (Medical Ops)',
    meetingPoint: 'Gandhi Maidan Field Camp 3',
    description: 'Assist certified doctors in patient queue registration, vision screening logistics, and free medicine distribution.',
    status: 'Published',
    featured: true,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'opp-3',
    title: 'Miyawaki Native Tree Plantation & Sapling Nurturing',
    organisation: 'Prakriti Conservation Corps',
    cause: 'Environment',
    location: 'Mumbai, MH',
    type: 'In-person',
    date: 'Sat, Oct 11, 2026 • 07:00 AM',
    commitment: 'Morning Shift (4 hrs)',
    hours: 4,
    placesLeft: 12,
    deadline: 'Oct 9, 2026',
    coordinator: 'Vikram Joshi (Ecology Lead)',
    meetingPoint: 'Aarey Forest Green Reserve Gate 2',
    description: 'Plant native saplings using the Miyawaki dense forest technique and install protective mulch and drip watering lines.',
    status: 'Published',
    featured: false,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'opp-4',
    title: 'Virtual Curriculum & Digital Content Designer',
    organisation: 'SocialVolunteers EdTech',
    cause: 'Education',
    location: 'Pan-India',
    type: 'Remote',
    date: 'Flexible Schedule',
    commitment: 'Flexible (5 hrs/wk)',
    hours: 5,
    placesLeft: 8,
    deadline: 'Oct 15, 2026',
    coordinator: 'Ananya V. (Digital Content Lead)',
    meetingPoint: 'Online Zoom Kiosk',
    description: 'Design interactive offline learning slides and video tutorials for rural solar-powered digital education kiosks.',
    status: 'Published',
    featured: false,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'opp-5',
    title: 'Women Self-Help Group Marketing Mentor',
    organisation: 'Samajik Utthan Trust',
    cause: 'Livelihoods',
    location: 'Odisha (Ganjam)',
    type: 'In-person',
    date: 'Sun, Oct 12, 2026 • 02:00 PM',
    commitment: 'Weekend (3 hrs/wk)',
    hours: 3,
    placesLeft: 5,
    deadline: 'Oct 8, 2026',
    coordinator: 'Meena Devi (SHG Lead)',
    meetingPoint: 'District Handicraft Center',
    description: 'Guide rural women artisans in product pricing, digital cataloging, and setting up local handicraft stalls.',
    status: 'Published',
    featured: false,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
  },
];

const initialCauses = [
  { id: 'Education', name: 'Education & Literacy', desc: 'Weekend teaching hubs, digital kiosks, and book drives for children.', count: '42 Open Roles', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80', active: true, order: 1 },
  { id: 'Healthcare', name: 'Healthcare & Diagnostics', desc: 'Diagnostic checkup camps, emergency blood registries, and hygiene distribution.', count: '35 Open Roles', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80', active: true, order: 2 },
  { id: 'Environment', name: 'Environmental Action', desc: 'Miyawaki native tree plantation, riverbank plastic recovery, and solar lighting.', count: '28 Open Roles', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80', active: true, order: 3 },
  { id: 'Livelihoods', name: 'Livelihoods & Skills', desc: 'Women self-help groups, tailoring trade workshops, and handicraft cataloging.', count: '24 Open Roles', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80', active: true, order: 4 },
  { id: 'Inclusion', name: 'Social Inclusion', desc: 'Senior citizen home companionship, disability assistance, and community care.', count: '19 Open Roles', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80', active: true, order: 5 },
  { id: 'Disaster Response', name: 'Disaster Response', desc: 'Emergency flood relief corps, dry ration distribution, and crisis aid.', count: '15 Open Roles', image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80', active: true, order: 6 },
];

const initialProjects = [
  {
    id: 'proj-1',
    title: 'Pan-India Solar Digital Learning Kiosks',
    organisation: 'Shiksha & SocialVolunteers Tech Initiative',
    category: 'Education & Technology',
    location: 'Rural Kiosks, Karnataka & Bihar',
    cause: 'Education',
    startDate: '2025-01-15',
    endDate: '2026-12-31',
    volunteerCount: 420,
    status: 'Active',
    goal: 'Establish 100 solar-powered digital education kiosks in off-grid rural schools, benefiting 15,000+ students.',
    impact: '18,420 Verified Hours logged, 12,500 children educated.',
    timeline: 'Phase 2 Active',
    aggregateHours: '18,420 Verified Hours',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'Miyawaki Urban Forests & Riverbank Restoration',
    organisation: 'Prakriti Conservation Foundation',
    category: 'Climate & Ecology',
    location: 'Mumbai & Thane Riverbanks',
    cause: 'Environment',
    startDate: '2025-03-01',
    endDate: '2027-03-01',
    volunteerCount: 310,
    status: 'Active',
    goal: 'Plant 50,000 native trees using high-density Miyawaki techniques and clean 100km of riverbanks.',
    impact: '14,280 Verified Hours logged, 28,000 saplings planted.',
    timeline: 'Ongoing Drive',
    aggregateHours: '14,280 Verified Hours',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    id: 'proj-3',
    title: 'Mobile Rural Diagnostic Camps & Maternal Care',
    organisation: 'Swasthya Seva Network',
    category: 'Healthcare & Diagnostics',
    location: 'Ganjam & Patna Rural Sector',
    cause: 'Healthcare',
    startDate: '2025-06-10',
    endDate: '2026-11-20',
    volunteerCount: 280,
    status: 'Active',
    goal: 'Deliver monthly mobile diagnostic checkups, tele-consultations, and hygiene kits to 200 remote villages.',
    impact: '14,593 Verified Hours logged, 8,200 rural checkups performed.',
    timeline: 'Pan-India Phase',
    aggregateHours: '14,593 Verified Hours',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
];

const initialVolunteers = [
  { id: 'v-101', name: 'Aarav Sharma', email: 'aarav.sharma@example.com', phone: '+91 98765 43210', location: 'Bengaluru, KA', hours: 42, cause: 'Education', skills: 'Mathematics, Teaching', interests: 'EdTech, Youth Mentorship', status: 'Verified', date: '2025-04-12', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
  { id: 'v-102', name: 'Priya Sundaram', email: 'priya.s@example.com', phone: '+91 98765 11223', location: 'Mumbai, MH', hours: 68, cause: 'Healthcare', skills: 'First Aid, Patient Care', interests: 'Diagnostic Camps, Hygiene', status: 'Verified', date: '2025-05-18', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
  { id: 'v-103', name: 'Rohan Verma', email: 'rohan.v@example.com', phone: '+91 98765 99887', location: 'Patna, BR', hours: 24, cause: 'Environment', skills: 'Forestry, Planting', interests: 'Miyawaki Forests', status: 'Active', date: '2025-08-02', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
  { id: 'v-104', name: 'Sneha Kulkarni', email: 'sneha.k@example.com', phone: '+91 98765 55443', location: 'Pune, MH', hours: 16, cause: 'Livelihoods', skills: 'Marketing, Handicrafts', interests: 'Women SHGs', status: 'Active', date: '2025-09-10', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
];

const initialApplications = [
  { id: 'app-501', volunteerName: 'Aarav Sharma', opportunityTitle: 'Weekend Mathematics & Digital Literacy Tutor', organisation: 'Shiksha Learning Hubs', date: '2026-09-24', status: 'Pending' },
  { id: 'app-502', volunteerName: 'Priya Sundaram', opportunityTitle: 'Diagnostic Camp Operations & Registration Lead', organisation: 'Swasthya Seva Foundation', date: '2026-09-23', status: 'Approved' },
  { id: 'app-503', volunteerName: 'Rohan Verma', opportunityTitle: 'Miyawaki Native Tree Plantation', organisation: 'Prakriti Conservation Corps', date: '2026-09-21', status: 'Completed' },
];

const initialVerifiedHoursLedger = [
  { id: 'vh-1', volunteer: 'Aarav Sharma', opportunity: 'Weekend Math Kiosk Tutor', hours: 4, date: '2026-09-20', status: 'Verified', verifiedBy: 'Sridhar G (Coordinator)' },
  { id: 'vh-2', volunteer: 'Priya Sundaram', opportunity: 'Mobile Health Camp Registration', hours: 6, date: '2026-09-18', status: 'Verified', verifiedBy: 'Rajesh Kumar (Medical Ops)' },
  { id: 'vh-3', volunteer: 'Rohan Verma', opportunity: 'Miyawaki Tree Plantation Shift 1', hours: 4, date: '2026-09-15', status: 'Pending Audit', verifiedBy: 'Pending Coordinator Review' },
];

const initialImpactStats = [
  { id: 'stat-1', number: '2,847+', label: 'Volunteers', value: '2847', desc: 'Active volunteers registered across India.', icon: 'Users', order: 1, active: true },
  { id: 'stat-2', number: '47,293+', label: 'Verified Hours', value: '47293', desc: 'Certified hours logged and audited.', icon: 'Clock', order: 2, active: true },
  { id: 'stat-3', number: '12,456+', label: 'Lives Impacted', value: '12456', desc: 'Community beneficiaries reached directly.', icon: 'Heart', order: 3, active: true },
  { id: 'stat-4', number: '183+', label: 'Opportunities', value: '183', desc: 'Published field and remote shifts.', icon: 'Briefcase', order: 4, active: true },
];

const initialPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 'Free',
    period: '',
    desc: 'Perfect for individual volunteers getting started',
    highlight: false,
    active: true,
    order: 1,
    cta: 'Get Started',
    features: ['Browse volunteer opportunities', 'Apply to unlimited opportunities', 'Basic profile', 'Track volunteer hours', 'Digital volunteer ID', 'Email support'],
  },
  {
    id: 'professional',
    name: 'Professional',
    badge: 'Recommended',
    price: '₹499',
    period: '/month',
    desc: 'For dedicated volunteers seeking advanced features',
    highlight: true,
    active: true,
    order: 2,
    cta: 'Upgrade Now',
    features: ['Everything in Basic', 'Priority application review', 'Advanced profile with portfolio', 'Skill verification badges', 'Certificate downloads', 'Monthly impact reports', 'Priority support'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₹999',
    period: '/month',
    desc: 'For organizations and volunteer coordinators',
    highlight: false,
    active: true,
    order: 3,
    cta: 'Contact Sales',
    features: ['Everything in Professional', 'Post unlimited opportunities', 'Manage volunteer applications', 'Team collaboration tools', 'Analytics dashboard', 'Custom branding', 'Dedicated account manager', 'API access'],
  },
];

const initialGallery = [
  { id: 'g-1', title: 'Community Digital Learning Hub', category: 'Education', altText: 'Students learning on solar computers', date: '2026-09-12', status: 'Published', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80' },
  { id: 'g-2', title: 'Free Medical Diagnostic Camp', category: 'Healthcare', altText: 'Medical registration team assisting patients', date: '2026-09-14', status: 'Published', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80' },
  { id: 'g-3', title: 'Miyawaki Tree Plantation Drive', category: 'Environment', altText: 'Volunteers planting native saplings', date: '2026-09-18', status: 'Published', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80' },
  { id: 'g-4', title: 'Women Artisan Self-Help Workshop', category: 'Livelihoods', altText: 'Women artisans cataloging handicrafts', date: '2026-09-20', status: 'Published', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80' },
];

const initialMessages = [
  { id: 'msg-1', name: 'Anish Kapur', email: 'anish.k@example.com', subject: 'Corporate CSR Partnership', message: 'Interested in registering our engineering team of 150 volunteers for weekend digital kiosks.', date: '2026-09-24', status: 'Unread' },
  { id: 'msg-2', name: 'Dr. Sunita Rao', email: 'sunita.r@healthorg.in', subject: 'Diagnostic Camp Registration', message: 'We would like to partner for setting up eye screening camps in Odisha.', date: '2026-09-22', status: 'Replied' },
];

const initialImpactJourney = [
  {
    id: 'stage-you',
    stage: 'YOU',
    title: 'Every Journey Begins With You',
    subtitle: 'Passionate Individual',
    text: 'You bring unique time, skills, and energy. Choosing to give back is the spark that starts real community transformation.',
    stat: '2,847+ Active Volunteers',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    order: 1,
  },
  {
    id: 'stage-volunteer',
    stage: 'VOLUNTEER',
    title: 'Digital Volunteer Passport ID',
    subtitle: 'Verified Profile',
    text: 'Receive an official verified identity card. Your preferences match with genuine grassroots non-profits operating nearby.',
    stat: '100% Identity Verified',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    order: 2,
  },
  {
    id: 'stage-opportunity',
    stage: 'OPPORTUNITY',
    title: 'Structured Field & Remote Shifts',
    subtitle: '4-6 Hour Commitment',
    text: 'Reserve specific, structured shifts with clear objectives, location details, coordinator contacts, and required roles.',
    stat: '183+ Published Shifts',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    order: 3,
  },
  {
    id: 'stage-project',
    stage: 'PROJECT',
    title: 'Long-Term Community Initiatives',
    subtitle: 'Sustainable Action',
    text: 'Individual shifts build into massive initiatives like Pan-India Solar Digital Hubs, Miyawaki Urban Forests, and Rural Diagnostic Camps.',
    stat: '186+ Active Projects',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    order: 4,
  },
  {
    id: 'stage-community',
    stage: 'COMMUNITY',
    title: 'Direct Grassroots Transformation',
    subtitle: 'Real People Touched',
    text: 'Underprivileged students learn mathematics, rural mothers receive healthcare checkups, and riverbanks are cleared of plastic.',
    stat: '12,456+ Beneficiaries',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    order: 5,
  },
  {
    id: 'stage-impact',
    stage: 'IMPACT',
    title: 'Audited Certified Hours Record',
    subtitle: 'Verifiable Proof',
    text: 'Coordinators audit shift attendance, logging permanent verified hours into your shareable digital certificate profile.',
    stat: '47,293+ Verified Hours',
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1200&q=80',
    order: 6,
  },
];

const initialOneHourSection = {
  eyebrow: 'SCROLL STORYTELLING JOURNEY',
  heading: 'One Hour Can Create Impact',
  description: 'Click or scroll through the 4 steps to see how small moments transform communities.',
  bgImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
};



const initialActivityLog = [
  { id: 'log-1', admin: 'Administrator', action: 'Platform initialized with default CMS configuration', time: '1 hour ago' },
  { id: 'log-2', admin: 'Administrator', action: 'Published Opportunity: "Weekend Mathematics & Digital Literacy Tutor"', time: '45 mins ago' },
  { id: 'log-3', admin: 'Administrator', action: 'Audited Verified Hours for Aarav Sharma', time: '30 mins ago' },
];

export function CMSProvider({ children }) {
  // Admin Auth State persistent
  const [isAdminLoggedIn, setIsAdminLoggedInState] = useState(() => getStored('sv_admin_auth', false));
  const [adminRole, setAdminRoleState] = useState(() => getStored('sv_admin_role', 'Administrator'));

  const setIsAdminLoggedIn = (status) => {
    setIsAdminLoggedInState(status);
    setStored('sv_admin_auth', status);
  };

  const setAdminRole = (role) => {
    setAdminRoleState(role);
    setStored('sv_admin_role', role);
  };

  // Content State persistent
  const [heroContent, setHeroContentState] = useState(() => getStored('sv_cms_hero', initialHero));
  const [opportunities, setOpportunitiesState] = useState(() => getStored('sv_cms_opportunities', initialOpportunities));
  const [causes, setCausesState] = useState(() => getStored('sv_cms_causes', initialCauses));
  const [projects, setProjectsState] = useState(() => getStored('sv_cms_projects', initialProjects));
  const [volunteers, setVolunteersState] = useState(() => getStored('sv_cms_volunteers', initialVolunteers));
  const [applications, setApplicationsState] = useState(() => getStored('sv_cms_applications', initialApplications));
  const [verifiedHoursLedger, setVerifiedHoursLedgerState] = useState(() => getStored('sv_cms_hours', initialVerifiedHoursLedger));
  const [impactStats, setImpactStatsState] = useState(() => getStored('sv_cms_stats', initialImpactStats));
  const [plans, setPlansState] = useState(() => getStored('sv_cms_plans', initialPlans));
  const [gallery, setGalleryState] = useState(() => getStored('sv_cms_gallery', initialGallery));
  const [messages, setMessagesState] = useState(() => getStored('sv_cms_messages', initialMessages));
  const [activityLog, setActivityLogState] = useState(() => getStored('sv_cms_activity', initialActivityLog));
  const [impactJourney, setImpactJourneyState] = useState(() => getStored('sv_cms_impact_journey', initialImpactJourney));
  const [oneHourSection, setOneHourSectionState] = useState(() => getStored('sv_cms_one_hour', initialOneHourSection));


  // Sync helpers
  const logAction = (actionText) => {
    const newLog = {
      id: `log-${Date.now()}`,
      admin: 'Administrator',
      action: actionText,
      time: 'Just now',
    };
    setActivityLogState((prev) => {
      const updated = [newLog, ...prev];
      setStored('sv_cms_activity', updated);
      return updated;
    });
  };

  // 1. HERO CRUD
  const updateHero = (newHero) => {
    setHeroContentState(newHero);
    setStored('sv_cms_hero', newHero);
    logAction('Updated Hero Content and Background Image');
  };

  const deleteHeroImage = () => {
    const updated = { ...heroContent, bgImage: '' };
    setHeroContentState(updated);
    setStored('sv_cms_hero', updated);
    logAction('Removed Hero Background Image');
  };

  // 2. OPPORTUNITIES CRUD
  const addOpportunity = (newOpp) => {
    const created = {
      id: `opp-${Date.now()}`,
      status: 'Published',
      featured: false,
      ...newOpp,
    };
    setOpportunitiesState((prev) => {
      const updated = [created, ...prev];
      setStored('sv_cms_opportunities', updated);
      return updated;
    });
    logAction(`Published new Opportunity: "${created.title}"`);
  };

  const updateOpportunity = (id, updatedFields) => {
    setOpportunitiesState((prev) => {
      const updated = prev.map((opp) => (opp.id === id ? { ...opp, ...updatedFields } : opp));
      setStored('sv_cms_opportunities', updated);
      return updated;
    });
    logAction(`Updated Opportunity ID: ${id}`);
  };

  const deleteOpportunity = (id) => {
    setOpportunitiesState((prev) => {
      const target = prev.find(o => o.id === id);
      const updated = prev.filter((opp) => opp.id !== id);
      setStored('sv_cms_opportunities', updated);
      logAction(`Deleted Opportunity: "${target?.title || id}"`);
      return updated;
    });
  };

  // 3. PROJECTS CRUD
  const addProject = (newProj) => {
    const created = {
      id: `proj-${Date.now()}`,
      status: 'Active',
      featured: false,
      aggregateHours: `${newProj.volunteerCount * 12 || 100} Verified Hours`,
      timeline: 'Active Drive',
      ...newProj,
    };
    setProjectsState((prev) => {
      const updated = [created, ...prev];
      setStored('sv_cms_projects', updated);
      return updated;
    });
    logAction(`Created new Project: "${created.title}"`);
  };

  const updateProject = (id, updatedFields) => {
    setProjectsState((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
      setStored('sv_cms_projects', updated);
      return updated;
    });
    logAction(`Updated Project ID: ${id}`);
  };

  const deleteProject = (id) => {
    setProjectsState((prev) => {
      const target = prev.find(p => p.id === id);
      const updated = prev.filter((p) => p.id !== id);
      setStored('sv_cms_projects', updated);
      logAction(`Deleted Project: "${target?.title || id}"`);
      return updated;
    });
  };

  // 4. VOLUNTEERS CRUD
  const addVolunteer = (newVol) => {
    const created = {
      id: `v-${Date.now()}`,
      hours: 0,
      status: 'Active',
      date: new Date().toISOString().split('T')[0],
      photo: newVol.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      ...newVol,
    };
    setVolunteersState((prev) => {
      const updated = [created, ...prev];
      setStored('sv_cms_volunteers', updated);
      return updated;
    });
    logAction(`Registered Volunteer: "${created.name}"`);
  };

  const updateVolunteer = (id, updatedFields) => {
    setVolunteersState((prev) => {
      const updated = prev.map((v) => (v.id === id ? { ...v, ...updatedFields } : v));
      setStored('sv_cms_volunteers', updated);
      return updated;
    });
    logAction(`Updated Volunteer ID: ${id}`);
  };

  const deleteVolunteer = (id) => {
    setVolunteersState((prev) => {
      const target = prev.find(v => v.id === id);
      const updated = prev.filter((v) => v.id !== id);
      setStored('sv_cms_volunteers', updated);
      logAction(`Deleted Volunteer: "${target?.name || id}"`);
      return updated;
    });
  };

  // 5. APPLICATIONS CRUD
  const updateApplicationStatus = (appId, newStatus) => {
    setApplicationsState((prev) => {
      const updated = prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app));
      setStored('sv_cms_applications', updated);
      return updated;
    });
    logAction(`Updated Application status to "${newStatus}" for Application ${appId}`);
  };

  const deleteApplication = (id) => {
    setApplicationsState((prev) => {
      const updated = prev.filter((app) => app.id !== id);
      setStored('sv_cms_applications', updated);
      logAction(`Deleted Application ID: ${id}`);
      return updated;
    });
  };

  // 6. VERIFIED HOURS CRUD
  const verifyHoursEntry = (hoursId) => {
    setVerifiedHoursLedgerState((prev) => {
      const updated = prev.map((entry) =>
        entry.id === hoursId ? { ...entry, status: 'Verified', verifiedBy: 'Verified by Admin' } : entry
      );
      setStored('sv_cms_hours', updated);
      return updated;
    });
    logAction(`Verified Hours Entry ID: ${hoursId}`);
  };

  const updateHoursEntry = (id, updatedFields) => {
    setVerifiedHoursLedgerState((prev) => {
      const updated = prev.map((entry) => (entry.id === id ? { ...entry, ...updatedFields } : entry));
      setStored('sv_cms_hours', updated);
      return updated;
    });
    logAction(`Updated Verified Hours Record ID: ${id}`);
  };

  const deleteHoursEntry = (id) => {
    setVerifiedHoursLedgerState((prev) => {
      const updated = prev.filter((entry) => entry.id !== id);
      setStored('sv_cms_hours', updated);
      logAction(`Deleted Hours Record ID: ${id}`);
      return updated;
    });
  };

  // 7. CAUSES CRUD
  const addCause = (newCause) => {
    const created = {
      id: newCause.name || `cause-${Date.now()}`,
      active: true,
      count: '0 Open Roles',
      order: causes.length + 1,
      image: newCause.image || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
      ...newCause,
    };
    setCausesState((prev) => {
      const updated = [...prev, created];
      setStored('sv_cms_causes', updated);
      return updated;
    });
    logAction(`Added Cause Sector: "${created.name}"`);
  };

  const updateCause = (id, updatedFields) => {
    setCausesState((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c));
      setStored('sv_cms_causes', updated);
      return updated;
    });
    logAction(`Updated Cause ID: ${id}`);
  };

  const deleteCause = (id) => {
    setCausesState((prev) => {
      const target = prev.find(c => c.id === id);
      const updated = prev.filter((c) => c.id !== id);
      setStored('sv_cms_causes', updated);
      logAction(`Deleted Cause: "${target?.name || id}"`);
      return updated;
    });
  };

  // 8. GALLERY CRUD
  const addGalleryImage = (newImg) => {
    const created = {
      id: `g-${Date.now()}`,
      status: 'Published',
      date: new Date().toISOString().split('T')[0],
      altText: newImg.title,
      ...newImg,
    };
    setGalleryState((prev) => {
      const updated = [created, ...prev];
      setStored('sv_cms_gallery', updated);
      return updated;
    });
    logAction(`Added Gallery Image: "${created.title}"`);
  };

  const updateGalleryImage = (id, updatedFields) => {
    setGalleryState((prev) => {
      const updated = prev.map((g) => (g.id === id ? { ...g, ...updatedFields } : g));
      setStored('sv_cms_gallery', updated);
      return updated;
    });
    logAction(`Updated Gallery Item ID: ${id}`);
  };

  const deleteGalleryImage = (id) => {
    setGalleryState((prev) => {
      const target = prev.find(g => g.id === id);
      const updated = prev.filter((g) => g.id !== id);
      setStored('sv_cms_gallery', updated);
      logAction(`Deleted Gallery Image: "${target?.title || id}"`);
      return updated;
    });
  };

  // 9. IMPACT STATS CRUD
  const addImpactStat = (newStat) => {
    const created = {
      id: `stat-${Date.now()}`,
      active: true,
      order: impactStats.length + 1,
      number: `${newStat.value}+`,
      ...newStat,
    };
    setImpactStatsState((prev) => {
      const updated = [...prev, created];
      setStored('sv_cms_stats', updated);
      return updated;
    });
    logAction(`Added Impact Stat Metric: "${created.label}"`);
  };

  const updateImpactStats = (id, updatedFields) => {
    setImpactStatsState((prev) => {
      const updated = prev.map((stat) => (stat.id === id ? { ...stat, ...updatedFields } : stat));
      setStored('sv_cms_stats', updated);
      return updated;
    });
    logAction(`Updated Impact Metric ID: ${id}`);
  };

  const deleteImpactStat = (id) => {
    setImpactStatsState((prev) => {
      const target = prev.find(s => s.id === id);
      const updated = prev.filter((stat) => stat.id !== id);
      setStored('sv_cms_stats', updated);
      logAction(`Deleted Impact Metric: "${target?.label || id}"`);
      return updated;
    });
  };

  // 10. PLANS CRUD
  const addPlan = (newPlan) => {
    const created = {
      id: `plan-${Date.now()}`,
      active: true,
      highlight: false,
      cta: 'Choose Plan',
      features: newPlan.features || [],
      order: plans.length + 1,
      ...newPlan,
    };
    setPlansState((prev) => {
      const updated = [...prev, created];
      setStored('sv_cms_plans', updated);
      return updated;
    });
    logAction(`Created Plan: "${created.name}"`);
  };

  const updatePlan = (id, updatedFields) => {
    setPlansState((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
      setStored('sv_cms_plans', updated);
      return updated;
    });
    logAction(`Updated Plan ID: ${id}`);
  };

  const deletePlan = (id) => {
    setPlansState((prev) => {
      const target = prev.find(p => p.id === id);
      const updated = prev.filter((p) => p.id !== id);
      setStored('sv_cms_plans', updated);
      logAction(`Deleted Plan: "${target?.name || id}"`);
      return updated;
    });
  };

  // 11. MESSAGES CRUD
  const addMessage = (newMsg) => {
    const created = {
      id: `msg-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Unread',
      ...newMsg,
    };
    setMessagesState((prev) => {
      const updated = [created, ...prev];
      setStored('sv_cms_messages', updated);
      return updated;
    });
  };

  const updateMessageStatus = (id, newStatus) => {
    setMessagesState((prev) => {
      const updated = prev.map((msg) => (msg.id === id ? { ...msg, status: newStatus } : msg));
      setStored('sv_cms_messages', updated);
      return updated;
    });
    logAction(`Marked Message ${id} as "${newStatus}"`);
  };

  const deleteMessage = (id) => {
    setMessagesState((prev) => {
      const updated = prev.filter((msg) => msg.id !== id);
      setStored('sv_cms_messages', updated);
      logAction(`Deleted Message ID: ${id}`);
      return updated;
    });
  };

  const updateImpactStage = (id, updatedFields) => {
    setImpactJourneyState((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, ...updatedFields } : s));
      setStored('sv_cms_impact_journey', updated);
      return updated;
    });
    logAction(`Updated Verified Community Impact Stage: ${id}`);
  };

  const updateOneHourSection = (updatedFields) => {
    setOneHourSectionState((prev) => {
      const updated = { ...prev, ...updatedFields };
      setStored('sv_cms_one_hour', updated);
      return updated;
    });
    logAction('Updated One Hour Can Create Impact Section');
  };

  return (
    <CMSContext.Provider
      value={{
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        adminRole,
        setAdminRole,
        heroContent,
        opportunities,
        causes,
        projects,
        volunteers,
        applications,
        verifiedHoursLedger,
        impactStats,
        plans,
        gallery,
        messages,
        activityLog,
        impactJourney,
        oneHourSection,
        updateHero,
        deleteHeroImage,
        updateImpactStage,
        updateOneHourSection,
        addOpportunity,
        updateOpportunity,
        deleteOpportunity,
        addProject,
        updateProject,
        deleteProject,
        addVolunteer,
        updateVolunteer,
        deleteVolunteer,
        updateApplicationStatus,
        deleteApplication,
        verifyHoursEntry,
        updateHoursEntry,
        deleteHoursEntry,
        addCause,
        updateCause,
        deleteCause,
        addGalleryImage,
        updateGalleryImage,
        deleteGalleryImage,
        addImpactStat,
        updateImpactStats,
        deleteImpactStat,
        addPlan,
        updatePlan,
        deletePlan,
        addMessage,
        updateMessageStatus,
        deleteMessage,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
