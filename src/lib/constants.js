import {
  LayoutGrid,
  Calculator,
  Scale,
  Store,
  Pill,
  Hospital,
  Building2,
  Landmark,
  Wrench,
  Flame,
  Briefcase,
  Building,
  Hammer,
  ShoppingBag,
  Coins,
  KeyRound,
  Sparkles,
  Presentation,
  Compass,
  PhoneCall,
  Calendar,
  Megaphone,
  Home,
  LayoutDashboard,
  Users,
  UserCheck,
  Award,
  FileText,
  Stethoscope,
  Utensils,
  Sprout,
} from "lucide-react";

export const TALUKAS = [
  { id: "veraval", name: "Veraval (HQ)" },
  { id: "sutrapada", name: "Sutrapada" },
  { id: "talala", name: "Talala" },
  { id: "kodinar", name: "Kodinar" },
  { id: "una", name: "Una" },
  { id: "gir-gadhada", name: "Gir-Gadhada" },
];

export const TALUKAS_LIST = [
  { id: "all", name: "All Talukas" },
  ...TALUKAS,
];

export const DEFAULT_OPERATING_HOURS = "09:00 AM - 08:00 PM";

export const DIRECTORY_CATEGORY_OPTIONS = [
  { id: "citizen", name: "Citizen" },
  { id: "sarpanch", name: "Sarpanch" },
  { id: "up-sarpanch", name: "Up-Sarpanch" },
  { id: "talati", name: "Talati Mantri" },
  { id: "gram-sevak", name: "Gram Sevak" },
  { id: "panchayat-member", name: "Panchayat Member" },
  { id: "nagarpalika-member", name: "Nagarpalika Member" },
  { id: "govt-officer", name: "Govt Officer" },
  { id: "govt-offices", name: "Govt Offices" },
  { id: "police-station", name: "Police Station" },
  { id: "advocates", name: "Advocates" },
  { id: "ca", name: "Chartered Accountant (CA)" },
  { id: "doctors", name: "Doctors" },
  { id: "engineers", name: "Engineers" },
  { id: "architects", name: "Architects" },
  { id: "tax-consultants", name: "Tax Consultants" },
  { id: "notary", name: "Notary" },
  { id: "teachers-professors", name: "Teachers / Professors" },
  { id: "journalists-media", name: "Journalists / Media" },
  { id: "insurance-agents", name: "Insurance Agents" },
  { id: "real-estate-agents", name: "Real Estate Agents" },
  { id: "photographers", name: "Photographers" },
  { id: "electricians", name: "Electricians" },
  { id: "plumbers", name: "Plumbers" },
  { id: "carpenters", name: "Carpenters" },
  { id: "painters", name: "Painters" },
  { id: "garages", name: "Garages & Mechanics" },
  { id: "transport-logistics", name: "Transport & Logistics" },
  { id: "courier-services", name: "Courier Services" },
  { id: "hospitals", name: "Hospitals & Clinics" },
  { id: "medical-stores", name: "Medical Stores" },
  { id: "laboratories", name: "Laboratories & Diagnostics" },
  { id: "shops", name: "Shops & Retail" },
  { id: "shopping-malls", name: "Shopping Malls" },
  { id: "hotels-restaurants", name: "Hotels & Restaurants" },
  { id: "agro-centers", name: "Agro Centers & Seeds" },
  { id: "fisheries-marine", name: "Fisheries & Marine" },
  { id: "banks-atms", name: "Banks & ATMs" },
  { id: "schools-colleges", name: "Schools & Colleges" },
  { id: "temples", name: "Temples & Religious Places" },
  { id: "ngos-social", name: "NGOs & Social Services" },
  { id: "others", name: "Others" },
];

export const DIRECTORY_CATEGORIES = [
  {
    id: "all",
    label: "All",
    icon: LayoutGrid,
    iconBg:
      "bg-zinc-200/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100",
  },
  {
    id: "citizen",
    label: "Citizen",
    icon: UserCheck,
    iconBg: "bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400",
  },
  {
    id: "sarpanch",
    label: "Sarpanch",
    icon: Award,
    iconBg: "bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400",
  },
  {
    id: "talati",
    label: "Talati",
    icon: FileText,
    iconBg: "bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400",
  },
  {
    id: "ca",
    label: "CA",
    icon: Calculator,
    iconBg: "bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400",
  },
  {
    id: "advocates",
    label: "Advocates",
    icon: Scale,
    iconBg:
      "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400",
  },
  {
    id: "doctors",
    label: "Doctors",
    icon: Stethoscope,
    iconBg: "bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400",
  },
  {
    id: "shops",
    label: "Shops",
    icon: Store,
    iconBg:
      "bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400",
  },
  {
    id: "medical-stores",
    label: "Medical Stores",
    icon: Pill,
    iconBg:
      "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "hospitals",
    label: "Hospitals",
    icon: Hospital,
    iconBg: "bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400",
  },
  {
    id: "shopping-malls",
    label: "Shopping Malls",
    icon: Building2,
    iconBg:
      "bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400",
  },
  {
    id: "govt-offices",
    label: "Govt Offices",
    icon: Landmark,
    iconBg:
      "bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
  },
  {
    id: "hotels-restaurants",
    label: "Food & Hotels",
    icon: Utensils,
    iconBg: "bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400",
  },
  {
    id: "agro-centers",
    label: "Agro",
    icon: Sprout,
    iconBg: "bg-lime-100 dark:bg-lime-950/60 text-lime-600 dark:text-lime-400",
  },
  {
    id: "garages",
    label: "Garages",
    icon: Wrench,
    iconBg:
      "bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400",
  },
  {
    id: "temples",
    label: "Temples",
    icon: Flame,
    iconBg:
      "bg-yellow-100 dark:bg-yellow-950/60 text-yellow-700 dark:text-yellow-400",
  },
];

export const STATUS_FILTERS = [
  { id: "all", label: "All Statuses" },
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
];

export const STATUS_OPTIONS = [
  { id: "pending", name: "Pending" },
  { id: "approved", name: "Approved" },
  { id: "rejected", name: "Rejected" },
];

export const SIGHTS_CATEGORIES = [
  { id: "all", name: "All" },
  { id: "pilgrimage", name: "Pilgrimage" },
  { id: "wildlife", name: "Wildlife" },
  { id: "beach", name: "Beach" },
  { id: "culture", name: "Culture" },
];

export const CLASSIFIED_CATEGORIES = [
  { id: "jobs", name: "Jobs" },
  { id: "real-estate", name: "Real Estate" },
  { id: "services", name: "Services" },
  { id: "notices", name: "Notices" },
];

export const CLASSIFIED_TAGS = [
  { id: "full-time", name: "Full-Time" },
  { id: "part-time", name: "Part-Time" },
  { id: "wanted", name: "Wanted" },
  { id: "available", name: "Available" },
  { id: "freelance", name: "Freelance" },
  { id: "urgent", name: "Urgent" },
];

export const CLASSIFIEDS_MENU = [
  {
    id: "all",
    label: "All Ads",
    icon: LayoutGrid,
    iconBg:
      "bg-zinc-200/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100",
  },
  {
    id: "jobs",
    label: "Jobs",
    icon: Briefcase,
    iconBg: "bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400",
  },
  {
    id: "real-estate",
    label: "Real Estate",
    icon: Building,
    iconBg:
      "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "services",
    label: "Services",
    icon: Hammer,
    iconBg:
      "bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400",
  },
];

export const MARKET_TYPES = [
  { id: "buy", name: "Buy" },
  { id: "sell", name: "Sell" },
  { id: "rent", name: "Rent" },
];

export const MARKET_CATEGORIES = [
  { id: "agro-machinery", name: "Agro Machinery" },
  { id: "farmland", name: "Farmland" },
  { id: "commercial-property", name: "Commercial Property" },
  { id: "marine-fisheries", name: "Marine & Fisheries" },
  { id: "vehicles", name: "Vehicles" },
  { id: "agro-equipment", name: "Agro Equipment" },
  { id: "industrial-tools", name: "Industrial Tools" },
  { id: "tractors-farm-equipment", name: "Tractors & Farm Equipment" },
  { id: "fishing-gear-boats", name: "Fishing Gear & Boats" },
  { id: "mango-farm-produce", name: "Mango & Farm Produce" },
  { id: "tools-hardware", name: "Tools & Hardware" },
  { id: "vehicles-spares", name: "Vehicles & Spares" },
  { id: "household-other", name: "Household & Other" },
];

export const MARKET_MENU = [
  {
    id: "all",
    label: "All Items",
    icon: LayoutGrid,
    iconBg:
      "bg-zinc-200/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100",
  },
  {
    id: "buy",
    label: "Buy",
    icon: ShoppingBag,
    iconBg:
      "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "sell",
    label: "Sell",
    icon: Coins,
    iconBg:
      "bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400",
  },
  {
    id: "rent",
    label: "Rent",
    icon: KeyRound,
    iconBg: "bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400",
  },
];

export const EVENT_TAGS = [
  { id: "festival", name: "Festival" },
  { id: "exhibition", name: "Exhibition" },
  { id: "tour", name: "Tour" },
  { id: "workshop", name: "Workshop" },
];

export const EVENT_CATEGORIES = [
  { id: "community-culture", name: "Community & Culture" },
  { id: "agriculture", name: "Agriculture" },
  { id: "tourism", name: "Tourism" },
  { id: "workshop", name: "Workshop" },
  { id: "sports-youth", name: "Sports & Youth" },
  { id: "religious", name: "Religious" },
  { id: "cultural-religious", name: "Cultural & Religious" },
  { id: "agricultural-trade-expos", name: "Agricultural & Trade Expos" },
  { id: "sports-tournaments", name: "Sports & Tournaments" },
  { id: "community-meetups", name: "Community Meetups" },
  { id: "govt-awareness-drives", name: "Govt & Awareness Drives" },
];

export const EVENTS_MENU = [
  {
    id: "all",
    label: "All Events",
    icon: LayoutGrid,
    iconBg:
      "bg-zinc-200/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100",
  },
  {
    id: "festival",
    label: "Festivals",
    icon: Sparkles,
    iconBg:
      "bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400",
  },
  {
    id: "exhibition",
    label: "Exhibition",
    icon: Presentation,
    iconBg: "bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400",
  },
  {
    id: "tour",
    label: "Tours",
    icon: Compass,
    iconBg: "bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400",
  },
];

export const CULTURAL_STATS = [
  {
    id: "jyotirlinga",
    label: "Jyotirlinga",
    value: "1st of 12",
    sub: "Somnath Mahadev",
  },
  {
    id: "gir-kesar",
    label: "Gir Kesar",
    value: "GI-Tagged",
    sub: "Talala Mango Hub",
  },
  {
    id: "wildlife-home",
    label: "Wildlife Home",
    value: "Asiatic Lion",
    sub: "Gir Forest Sanctuary",
  },
  {
    id: "coastline",
    label: "Coastline",
    value: "Arabian Sea",
    sub: "Port & Fisheries",
  },
];

export const MAIN_MODULES = [
  {
    href: "/directory",
    title: "Business Directory",
    desc: "Vyapar, verified local services, clinics & shops",
    badge: "Verified",
    icon: PhoneCall,
    iconColor: "text-amber-700 dark:text-amber-400",
    gradient: "from-amber-500/15 via-orange-500/5 to-transparent",
    borderHover: "hover:border-amber-500/50",
  },
  {
    href: "/events",
    title: "Utsav & Events",
    desc: "Maha Shivratri, beach mela, aarti & mandal sabha",
    badge: "Upcoming",
    icon: Calendar,
    iconColor: "text-orange-700 dark:text-orange-400",
    gradient: "from-orange-500/15 via-red-500/5 to-transparent",
    borderHover: "hover:border-orange-500/50",
  },
  {
    href: "/market",
    title: "Krishi & Market",
    desc: "Kesar mango orchards, tractors, mandis & tools",
    badge: "Rentals",
    icon: ShoppingBag,
    iconColor: "text-emerald-700 dark:text-emerald-400",
    gradient: "from-emerald-500/15 via-amber-500/5 to-transparent",
    borderHover: "hover:border-emerald-500/50",
  },
  {
    href: "/classifieds",
    title: "Classifieds & Rojgar",
    desc: "District jobs, rental houses, factory & driver ads",
    badge: "Active",
    icon: Megaphone,
    iconColor: "text-amber-800 dark:text-amber-300",
    gradient: "from-amber-600/15 via-yellow-500/5 to-transparent",
    borderHover: "hover:border-amber-600/50",
  },
];

export const EMERGENCY_NUMBERS = [
  { label: "Police Control", number: "100", sub: "District HQ" },
  { label: "Ambulance", number: "108", sub: "Emergency Medical" },
  { label: "Fire Station", number: "101", sub: "Disaster / Fire" },
  { label: "Gir Forest Rescue", number: "1926", sub: "Lion & Wildlife" },
];

export const MOBILE_NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/directory", label: "Directory", icon: PhoneCall },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/market", label: "Market", icon: ShoppingBag },
  { href: "/classifieds", label: "Classifieds", icon: Megaphone },
];

export const ADMIN_NAV_ITEMS = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Directory",
    url: "/admin/directory",
    icon: PhoneCall,
  },
  {
    title: "Events",
    url: "/admin/events",
    icon: Calendar,
  },
  {
    title: "Marketplace",
    url: "/admin/marketplace",
    icon: ShoppingBag,
  },
  {
    title: "Classified Ads",
    url: "/admin/classifieds",
    icon: Megaphone,
  },
];
