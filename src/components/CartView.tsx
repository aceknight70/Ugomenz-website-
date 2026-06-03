import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Trash2, ArrowLeft, MessageSquareDot, ShieldCheck, CheckCircle } from 'lucide-react';
import { Product, OrderItem, Order, isVideoSrc } from '../types';

interface CartViewProps {
  cartItems: { product: Product; quantity: number }[];
  onUpdateCartQty: (productId: string, newQty: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onClearCart: () => void;
  onNavigate: (view: string) => void;
  onAddOrderToStaff: (order: Order) => void;
}

export default function CartView({
  cartItems,
  onUpdateCartQty,
  onRemoveFromCart,
  onClearCart,
  onNavigate,
  onAddOrderToStaff
}: CartViewProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderProcessed, setOrderProcessed] = useState(false);
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const subtotal = cartItems.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
  const totalItemsCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0 || !customerName || !customerPhone) return;

    // First structure order items for saving.
    const orderItems: OrderItem[] = cartItems.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      brand: item.product.brand,
      price: item.product.price,
      quantity: item.quantity
    }));

    // Create the persistent CRM order structure
    const newOrder: Order = {
      id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      customerPhone,
      items: orderItems,
      subtotal,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      notes: deliveryNotes
    };

    // Save automatically to the Staff Portal database list!
    onAddOrderToStaff(newOrder);

    // Draft fully-formated WhatsApp Message
    let messageString = `✨ *UGOMENZ ELECTRONICS - NEW ORDER* ✨\n`;
    messageString += `------------------------------------\n`;
    messageString += `*Customer Details*:\n`;
    messageString += `• Name: ${customerName}\n`;
    messageString += `• Phone: ${customerPhone}\n`;
    if (deliveryNotes) messageString += `• Notes: ${deliveryNotes}\n`;
    messageString += `------------------------------------\n`;
    messageString += `*Items Ordered*:\n`;

    cartItems.forEach((item, idx) => {
      const itemTotal = item.product.price * item.quantity;
      messageString += `${idx + 1}. [${item.product.brand}] ${item.product.name}\n`;
      messageString += `   *Qty:* ${item.quantity} x ₦${item.product.price.toLocaleString()} = ₦${itemTotal.toLocaleString()}\n`;
    });

    messageString += `------------------------------------\n`;
    messageString += `*Total Order Value:* ₦${subtotal.toLocaleString()}\n`;
    messageString += `------------------------------------\n`;
    messageString += `⚠️ Please process this order. Awaiting payment authorization layout link. Thank you !`;

    // Trigger WhatsApp
    window.open(`https://wa.me/2348052000034?text=${encodeURIComponent(messageString)}`, '_blank');

    // Display confirmation and clean cart
    setOrderProcessed(true);
    setTimeout(() => {
      onClearCart();
      setOrderProcessed(false);
      setCustomerName('');
      setCustomerPhone('');
      setDeliveryNotes('');
      onNavigate('home');
    }, 4500);
  };

  if (orderProcessed) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white p-8 rounded-3xl border border-gray-150 shadow-lg flex flex-col items-center">
          <div className="w-16 h-16 bg-green-105 rounded-full flex items-center justify-center text-green-600 mb-4 animate-bounce">
            <CheckCircle className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-display font-bold text-gray-900 tracking-tight">Order Sourced Successfully!</h2>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            Your cart list has been compiled, sent via WhatsApp to the Ugomenz sales desks, and automatically stored securely inside the CRM operations ledger.
          </p>
          <p className="text-xs font-mono text-brand-orange mt-4 uppercase tracking-wider font-bold">
            Redirecting to home board...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
      {/* Back button */}
      <button
        onClick={() => onNavigate('showroom')}
        className="flex items-center gap-1 text-xs text-gray-500 hover:text-brand-orange mb-6 font-semibold"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Continue Shopping</span>
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold tracking-tight text-brand-black">Your Shopping Cart</h2>
        <p className="text-xs text-gray-500 mt-0.5">Review items selected. Deliveries and technical integrations managed via 4G WhatsApp checkout.</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 py-16 text-center shadow-sm">
          <div className="w-16 h-16 bg-brand-orange-tint text-brand-orange flex items-center justify-center rounded-full mx-auto mb-4 border border-brand-orange/10">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <p className="text-sm text-gray-700 font-semibold font-display">Your Cart is currently empty.</p>
          <p className="text-xs text-gray-400 mt-1">Head back into the product showroom to add smart models!</p>
          <button
            onClick={() => onNavigate('showroom')}
            className="mt-6 px-6 py-2.5 bg-brand-orange text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition-colors cursor-pointer"
          >
            Browse Products Catalogue
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left panel items list */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const lineTotal = item.product.price * item.quantity;

              return (
                <div
                  key={item.product.id}
                  className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center justify-between gap-4 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    {isVideoSrc(item.product.image) ? (
                      <video src={item.product.image} className="w-16 h-12 object-cover rounded-lg border border-gray-150 bg-black" autoPlay loop muted playsInline />
                    ) : (
                      <img src={item.product.image} className="w-16 h-12 object-cover rounded-lg border border-gray-150" referrerPolicy="no-referrer" />
                    )}
                    <div>
                      <span className="text-[9px] font-mono tracking-wider text-brand-orange font-bold uppercase">{item.product.brand}</span>
                      <h4 className="font-semibold text-xs text-brand-black leading-tight mt-0.5">{item.product.name}</h4>
                      <p className="text-[11px] text-gray-500 mt-1 font-mono">₦{item.product.price.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Quantity controls and calculations */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                      <button
                        onClick={() => onUpdateCartQty(item.product.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-xs hover:bg-gray-100 font-bold text-gray-650 cursor-pointer"
                      >
                        –
                      </button>
                      <span className="px-3 py-1 font-mono text-xs font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateCartQty(item.product.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-xs hover:bg-gray-100 font-bold text-gray-650 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right hidden sm:block min-w-24">
                      <p className="text-xs font-mono font-bold text-brand-black">₦{lineTotal.toLocaleString()}</p>
                    </div>

                    {/* Delete Trigger */}
                    <button
                      onClick={() => onRemoveFromCart(item.product.id)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Clear Cart Button */}
            <button
              onClick={onClearCart}
              className="text-xs text-red-500 hover:underline uppercase font-bold tracking-wider font-mono float-right pr-2"
            >
              Clear Entire Cart
            </button>
          </div>

          {/* Right panel customer details & order submission */}
          <div className="bg-white rounded-3xl border border-gray-250 p-6 shadow-sm">
            <h3 className="font-display font-bold text-base text-brand-black mb-4 pb-2 border-b border-gray-100">
              Checkout & Summary
            </h3>

            {/* Financial summaries */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Selected Items ({totalItemsCount})</span>
                <span className="font-mono">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Shipping & Tracking</span>
                <span className="text-green-600 font-bold uppercase font-mono text-[10px]">Free (Within Warri Layout)</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Technical Mounting Support</span>
                <span className="text-brand-blue font-bold uppercase font-mono text-[10px]">Optional Add-on</span>
              </div>

              <div className="border-t border-gray-150 pt-3 flex items-baseline justify-between">
                <span className="text-sm font-bold text-brand-black">Total Bill</span>
                <span className="text-lg font-mono font-bold text-brand-black">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Customer Information form */}
            <form onSubmit={handleSendWhatsAppOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-655 mb-1">
                  Recipient Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Godstime Efeturi"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs p-3 border border-gray-200 rounded-lg outline-none focus:border-brand-orange bg-gray-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-655 mb-1">
                  WhatsApp Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g., 080XXXXXXXX"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full text-xs p-3 border border-gray-200 rounded-lg outline-none focus:border-brand-orange bg-gray-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-655 mb-1">
                  Delivery Address & Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Effurun Layout, near Delta Mall..."
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full text-xs p-3 border border-gray-200 rounded-lg outline-none focus:border-brand-orange bg-gray-50/50 resize-none"
                />
              </div>

              {/* Authorized warranty certification badge */}
              <div className="bg-brand-blue-tint/50 border border-brand-blue/10 p-3 rounded-xl text-[10px] text-brand-blue font-medium flex items-start gap-1.5 leading-relaxed mb-4">
                <ShieldCheck className="w-4 h-4 shrink-0 text-brand-blue mt-0.5" />
                <span>Authorized South-South Dealership. Official 12-month domestic warranty covers all display modules.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-orange hover:bg-orange-655 text-white bg-orange-600 rounded-xl text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-brand-orange/20 transition-all"
              >
                <MessageSquareDot className="w-4.5 h-4.5" />
                <span>Send WhatsApp Order Checkout</span>
              </button>
            </form>

          </div>

        </div>
      )}

    </div>
  );
}
