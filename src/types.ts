export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  specs: string[];
  image: string;
  additionalImages?: string[];
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  quantity: number;
  notifyPhoneNumbers?: string[]; // Phone numbers of customers to notify when restocked
}

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  status: 'Pending' | 'Paid' | 'Cancelled';
  date: string;
  notes?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  category: 'New Arrivals' | 'Tech Tips' | 'Deals' | 'Brand News' | 'How-To Guides';
  date: string;
  image: string;
  author: string;
  shares: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Home Setups' | 'Office Setups' | 'Event Setups' | 'Installations' | 'Customer Spaces';
  image: string;
  beforeImage?: string; // Optional for before-after slider comparison
  caption?: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  purpose: 'Browse Products' | 'Get a Quote' | 'Book a Service' | 'Learn About Us' | 'Visit the Shadow School';
  message: string;
  date: string;
  status: 'New' | 'Contacted' | 'Closed';
  notes?: string;
}

export interface ServiceBooking {
  id: string;
  serviceName: string;
  date: string;
  customerName: string;
  customerPhone: string;
  location: string;
  details: string;
  status: 'Pending' | 'Followed Up' | 'Completed';
}

export interface SupportTicket {
  id: string;
  referenceNumber: string;
  customerName: string;
  customerPhone: string;
  issueType: 'Track Order' | 'Report a Fault' | 'Warranty Claim' | 'General Enquiry';
  description: string;
  image?: string;
  status: 'Received' | 'In Progress' | 'Resolved';
  lastUpdated: string;
  date: string;
}

export interface ActiveStaffSession {
  email: string;
  role: 'Staff' | 'Manager';
}

export interface ShadowCourse {
  id: string;
  title: string;
  icon: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  modules: string[];
  forWho: string;
  outcome: string;
  intakeDates: string[];
  availableSlots: number;
}
