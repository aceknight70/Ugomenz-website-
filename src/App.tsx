import React, { useState, useEffect } from 'react';

// Subcomponents
import SplashView from './components/SplashView';
import OnboardingView from './components/OnboardingView';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomeView from './components/HomeView';
import ShowroomView from './components/ShowroomView';
import BrandsView from './components/BrandsView';
import InventoryView from './components/InventoryView';
import CartView from './components/CartView';
import GalleryView from './components/GalleryView';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import ShadowSchoolView from './components/ShadowSchoolView';
import BlogView from './components/BlogView';
import MarketingView from './components/MarketingView';
import SupportView from './components/SupportView';
import RecordsView from './components/RecordsView';
import StaffPortalView from './components/StaffPortalView';
import ContactView from './components/ContactView';

// Initial Mock Datasets
import {
  INITIAL_PRODUCTS,
  INITIAL_BLOG_POSTS,
  INITIAL_GALLERY_ITEMS,
  INITIAL_LEADS,
  INITIAL_ORDERS,
  INITIAL_SERVICE_BOOKINGS,
  INITIAL_SUPPORT_TICKETS,
  SHADOW_COURSES
} from './initialData';

import { Product, Order, Lead, SupportTicket, ServiceBooking, GalleryItem, ActiveStaffSession } from './types';

export default function App() {
  // Current visible page (17 available pages mapped via activeView)
  const [activeView, setActiveView] = useState<string>('splash');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Local state databases persisted inside localStorage
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [bookings, setBookings] = useState<ServiceBooking[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  // Shopping Cart state
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);

  // Logged-in Staff Member Session (PIN matched)
  const [staffSession, setStaffSession] = useState<ActiveStaffSession | null>(null);

  // Initialize and load databases on mount
  useEffect(() => {
    // Products
    const localProds = localStorage.getItem('ug_products');
    if (localProds) setProducts(JSON.parse(localProds));
    else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('ug_products', JSON.stringify(INITIAL_PRODUCTS));
    }

    // Orders
    const localOrders = localStorage.getItem('ug_orders');
    if (localOrders) setOrders(JSON.parse(localOrders));
    else {
      setOrders(INITIAL_ORDERS);
      localStorage.setItem('ug_orders', JSON.stringify(INITIAL_ORDERS));
    }

    // Onboarding Leads
    const localLeads = localStorage.getItem('ug_leads');
    if (localLeads) setLeads(JSON.parse(localLeads));
    else {
      setLeads(INITIAL_LEADS);
      localStorage.setItem('ug_leads', JSON.stringify(INITIAL_LEADS));
    }

    // Technical Tickets
    const localTickets = localStorage.getItem('ug_tickets');
    if (localTickets) setTickets(JSON.parse(localTickets));
    else {
      setTickets(INITIAL_SUPPORT_TICKETS);
      localStorage.setItem('ug_tickets', JSON.stringify(INITIAL_SUPPORT_TICKETS));
    }

    // Service Bookings
    const localBookings = localStorage.getItem('ug_bookings');
    if (localBookings) setBookings(JSON.parse(localBookings));
    else {
      setBookings(INITIAL_SERVICE_BOOKINGS);
      localStorage.setItem('ug_bookings', JSON.stringify(INITIAL_SERVICE_BOOKINGS));
    }

    // Blogs
    const localBlogs = localStorage.getItem('ug_blogs');
    if (localBlogs) setBlogs(JSON.parse(localBlogs));
    else {
      setBlogs(INITIAL_BLOG_POSTS);
      localStorage.setItem('ug_blogs', JSON.stringify(INITIAL_BLOG_POSTS));
    }

    // Gallery Items
    const localGallery = localStorage.getItem('ug_gallery');
    if (localGallery) setGalleryItems(JSON.parse(localGallery));
    else {
      setGalleryItems(INITIAL_GALLERY_ITEMS);
      localStorage.setItem('ug_gallery', JSON.stringify(INITIAL_GALLERY_ITEMS));
    }

    // Active Cart
    const localCart = localStorage.getItem('ug_cart');
    if (localCart) setCartItems(JSON.parse(localCart));

    // Active logged session
    const savedSession = localStorage.getItem('ug_session');
    if (savedSession) setStaffSession(JSON.parse(savedSession));

  }, []);

  // Common status update helper triggers
  const handleUpdateProducts = (updatedList: Product[]) => {
    setProducts(updatedList);
    try {
      localStorage.setItem('ug_products', JSON.stringify(updatedList));
    } catch (e) {
      console.warn('LocalStorage limit exceeded. Saved in active React state instead.', e);
    }
  };

  const handleUpdateOrders = (updatedList: Order[]) => {
    setOrders(updatedList);
    try {
      localStorage.setItem('ug_orders', JSON.stringify(updatedList));
    } catch (e) {
      console.warn('LocalStorage write failed', e);
    }
  };

  const handleUpdateLeads = (updatedList: Lead[]) => {
    setLeads(updatedList);
    try {
      localStorage.setItem('ug_leads', JSON.stringify(updatedList));
    } catch (e) {
      console.warn('LocalStorage write failed', e);
    }
  };

  const handleUpdateTickets = (updatedList: SupportTicket[]) => {
    setTickets(updatedList);
    try {
      localStorage.setItem('ug_tickets', JSON.stringify(updatedList));
    } catch (e) {
      console.warn('LocalStorage write failed', e);
    }
  };

  const handleUpdateBookings = (updatedList: ServiceBooking[]) => {
    setBookings(updatedList);
    try {
      localStorage.setItem('ug_bookings', JSON.stringify(updatedList));
    } catch (e) {
      console.warn('LocalStorage write failed', e);
    }
  };

  const handleUpdateBlogs = (updatedList: any[]) => {
    setBlogs(updatedList);
    try {
      localStorage.setItem('ug_blogs', JSON.stringify(updatedList));
    } catch (e) {
      console.warn('LocalStorage write failed', e);
    }
  };

  const handleUpdateGalleryItems = (updatedList: GalleryItem[]) => {
    setGalleryItems(updatedList);
    try {
      localStorage.setItem('ug_gallery', JSON.stringify(updatedList));
    } catch (e) {
      console.warn('LocalStorage write failed', e);
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    // If item already exists in cart, increment quantity.
    const existIdx = cartItems.findIndex(it => it.product.id === product.id);
    let newCart = [...cartItems];

    if (existIdx > -1) {
      newCart[existIdx].quantity += 1;
    } else {
      newCart.push({ product, quantity: 1 });
    }

    setCartItems(newCart);
    localStorage.setItem('ug_cart', JSON.stringify(newCart));
    alert(`Success: "${product.name}" added to shopping cart! Click cart icon above to checkout.`);
  };

  const handleUpdateCartQty = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    const updated = cartItems.map(item =>
      item.product.id === productId ? { ...item, quantity: newQty } : item
    );
    setCartItems(updated);
    localStorage.setItem('ug_cart', JSON.stringify(updated));
  };

  const handleRemoveFromCart = (productId: string) => {
    const filtered = cartItems.filter(item => item.product.id !== productId);
    setCartItems(filtered);
    localStorage.setItem('ug_cart', JSON.stringify(filtered));
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('ug_cart');
  };

  // Staff security sessions logins
  const handleLoginSuccess = (session: ActiveStaffSession) => {
    setStaffSession(session);
    localStorage.setItem('ug_session', JSON.stringify(session));
  };

  const handleLogout = () => {
    setStaffSession(null);
    localStorage.removeItem('ug_session');
    setActiveView('home'); // Redirect back to home
    alert('Security PIN Session Terminated. Operations controls offline.');
  };

  // Appending new lists elements
  const handleAddLead = (newLead: Lead) => {
    const updated = [newLead, ...leads];
    handleUpdateLeads(updated);
  };

  const handleAddOrder = (newOrder: Order) => {
    const updated = [newOrder, ...orders];
    handleUpdateOrders(updated);
  };

  const handleAddBooking = (newBooking: ServiceBooking) => {
    const updated = [newBooking, ...bookings];
    handleUpdateBookings(updated);
  };

  const handleAddTicket = (newTicket: SupportTicket) => {
    const updated = [newTicket, ...tickets];
    handleUpdateTickets(updated);
  };

  const handleAddBlog = (newBlog: any) => {
    const updated = [newBlog, ...blogs];
    handleUpdateBlogs(updated);
  };

  // Onboarding workflow completed redirect routing
  const handleOnboardingComplete = (newLead: Lead | null, targetView: string) => {
    if (newLead) {
      handleAddLead(newLead);
    }
    setActiveView(targetView);
  };

  // Cart count calculator
  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Router layout renderer based on activeView state
  const renderMainView = () => {
    switch (activeView) {
      case 'home':
        return (
          <HomeView
            products={products}
            galleryItems={galleryItems}
            blogPosts={blogs}
            onAddToCart={handleAddToCart}
            onNavigate={setActiveView}
          />
        );
      case 'showroom':
        return (
          <ShowroomView
            products={products}
            onAddToCart={handleAddToCart}
            searchFilterGlobal={searchQuery}
          />
        );
      case 'brands':
        return (
          <BrandsView
            products={products}
            onAddToCart={handleAddToCart}
          />
        );
      case 'inventory':
        return (
          <InventoryView
            products={products}
            onUpdateProducts={handleUpdateProducts}
            staffSession={staffSession}
          />
        );
      case 'cart':
        return (
          <CartView
            cartItems={cartItems}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onNavigate={setActiveView}
            onAddOrderToStaff={handleAddOrder}
          />
        );
      case 'gallery':
        return <GalleryView galleryItems={galleryItems} />;
      case 'about':
        return <AboutView onNavigate={setActiveView} />;
      case 'services':
        return <ServicesView onAddBooking={handleAddBooking} />;
      case 'shadow_school':
        return <ShadowSchoolView courses={SHADOW_COURSES} />;
      case 'blog':
        return (
          <BlogView
            posts={blogs}
            products={products}
            onAddToCart={handleAddToCart}
            onAddPost={handleAddBlog}
            staffLogged={!!staffSession}
          />
        );
      case 'marketing':
        return <MarketingView />;
      case 'support':
        return (
          <SupportView
            tickets={tickets}
            onAddTicket={handleAddTicket}
          />
        );
      case 'records':
        return (
          <RecordsView
            orders={orders}
            products={products}
            staffSession={staffSession}
            onUpdateOrders={handleUpdateOrders}
          />
        );
      case 'staff_portal':
        return (
          <StaffPortalView
            products={products}
            orders={orders}
            leads={leads}
            tickets={tickets}
            bookings={bookings}
            galleryItems={galleryItems}
            staffSession={staffSession}
            onUpdateProducts={handleUpdateProducts}
            onUpdateOrders={handleUpdateOrders}
            onUpdateLeads={handleUpdateLeads}
            onUpdateTickets={handleUpdateTickets}
            onUpdateBookings={handleUpdateBookings}
            onUpdateGalleryItems={handleUpdateGalleryItems}
          />
        );
      case 'contact':
        return <ContactView />;
      default:
        return (
          <HomeView
            products={products}
            galleryItems={galleryItems}
            blogPosts={blogs}
            onAddToCart={handleAddToCart}
            onNavigate={setActiveView}
          />
        );
    }
  };

  // Pure Fullscreen mode for Splash & Onboarding
  if (activeView === 'splash') {
    return <SplashView onEnter={() => setActiveView('onboarding')} />;
  }

  if (activeView === 'onboarding') {
    return (
      <OnboardingView
        onComplete={handleOnboardingComplete}
        onSkip={() => setActiveView('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      
      {/* Header section sharing state searchQuery and cart items */}
      <Header
        onToggleSidebar={() => setSidebarOpen(true)}
        cartCount={totalCartCount}
        onNavigate={setActiveView}
        staffSession={staffSession}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hamburger Drawer mapping all 17 page indexes */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeView={activeView}
        onNavigate={setActiveView}
        cartCount={totalCartCount}
        staffSession={staffSession}
        onLogout={handleLogout}
      />

      {/* Primary Routing view rendering context */}
      <main className="flex-1 pb-16">
        {renderMainView()}
      </main>

      {/* Elegant Standard Global Footer */}
      <footer className="bg-brand-black text-gray-450 text-xs text-center py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono select-none">
          <p className="text-[10px] text-gray-500 text-center sm:text-left">
            © 2026 Ugomenz Electronics Sales & Servicing HQ. Airport Road, Warri, Delta State, Nigeria.
          </p>
          <div className="flex gap-4 text-[9px] uppercase tracking-wider font-bold">
            <span className="text-gray-600">Authorized Dealership: Samsung • Sony • LG • Hisense • JVC • Skyworth</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
