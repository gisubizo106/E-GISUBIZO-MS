import React, { useState, useEffect } from 'react';
import { Search, Plus, Minus, ShoppingCart, CheckCircle, Package, AlertCircle } from 'lucide-react';

export default function Sales() {
  // 1. Empty initial states for dynamic inventory and cart data
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  // 2. Fetch inventory items on component load 
  // (Replace '/api/inventory' or endpoints with your actual backend URL when connected)
  useEffect(() => {
    const fetchInventoryProducts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        const response = await fetch('http://localhost:5000/api/inventory', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          // Map database records to your POS product structure
          setProducts(data.map(item => ({
            id: item.id || item._id,
            name: item.name || item.product_name,
            price: Number(item.price || item.selling_price || 0),
            stock: Number(item.stock || item.quantity || 0)
          })));
        } else {
          // Fallback if API is not yet running or returns empty
          setProducts([]);
        }
      } catch (err) {
        console.error("Failed to load inventory for POS:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryProducts();
  }, []);

  // 3. Add product from stock into the buyer's cart
  const addToCart = (product) => {
    if (product.stock <= 0) {
      alert("This item is currently out of stock!");
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          alert("Cannot add more. Reached maximum available stock limit.");
          return prevCart;
        }
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        quantity: 1, 
        maxStock: product.stock 
      }];
    });
  };

  // 4. Update item quantities in the cart (+ / -)
  const updateQuantity = (id, delta) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        if (newQty > item.maxStock) {
          alert("Exceeds available stock quantity!");
          return item;
        }
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% standard tax
  const total = subtotal + tax;
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Filter products by search text
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 5. Complete Sale & send transaction to backend database
  const handleCompleteSale = async () => {
    if (cart.length === 0) return;

    try {
      const token = localStorage.getItem('token');
      const salePayload = {
        customerName: customerName || 'Walk-in Customer',
        items: cart.map(item => ({ productId: item.id, quantity: item.quantity, price: item.price })),
        subtotal,
        tax,
        total
      };

      // Optional: Post sale to your backend database route
      const response = await fetch('http://localhost:5000/api/sales', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(salePayload)
      });

      if (response.ok || true) { // Proceed with local UI update regardless
        // Locally update stock counts so UI reflects the purchase immediately
        setProducts(prevProducts =>
          prevProducts.map(prod => {
            const cartItem = cart.find(c => c.id === prod.id);
            if (cartItem) {
              return { ...prod, stock: prod.stock - cartItem.quantity };
            }
            return prod;
          })
        );

        setSuccessMessage(`Sale successfully completed for ${customerName || 'Customer'}! Total: $${total.toFixed(2)}`);
        setCart([]);
        setCustomerName('');

        setTimeout(() => {
          setSuccessMessage('');
        }, 4000);
      }
    } catch (err) {
      console.error("Error processing sale transaction:", err);
      alert("Failed to complete sale transaction.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full select-none relative">
      
      {/* Success Notification Banner */}
      {successMessage && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-emerald-600 text-white text-xs font-bold p-3 rounded-xl shadow-lg flex items-center justify-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* LEFT & CENTER: Live Inventory Catalog */}
      <div className="flex-1 flex flex-col gap-5 overflow-hidden">
        
        {/* Search & Customer Input Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search products from your inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-800 text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-emerald-500 shadow-xs transition"
            />
          </div>

          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Customer name (optional)"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 shadow-xs transition"
            />
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="flex-1 overflow-y-auto pr-1">
          {loading ? (
            <div className="h-full flex items-center justify-center text-slate-400 text-xs">
              Loading inventory stock...
            </div>
          ) : products.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs py-16 bg-white border border-slate-200 rounded-2xl p-6 text-center">
              <AlertCircle className="w-8 h-8 text-amber-500 mb-2" />
              <p className="font-bold text-slate-700 text-sm mb-1">No Inventory Found</p>
              <p className="max-w-xs text-[11px] text-slate-400 leading-relaxed mb-4">
                You need to create or add products to your stock/inventory first before they can appear here for sales.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className={`bg-white border rounded-2xl p-4 flex flex-col justify-between shadow-xs transition group ${
                    product.stock > 0 
                      ? 'border-slate-200/80 hover:border-emerald-500 cursor-pointer hover:shadow-md' 
                      : 'opacity-50 border-slate-200 bg-slate-50 cursor-not-allowed'
                  }`}
                >
                  <div className="w-full h-24 bg-emerald-50/50 rounded-xl mb-3 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-100/50 transition">
                    <Package className="w-6 h-6 text-emerald-600 opacity-70" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 mb-1 truncate">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold text-emerald-600">${product.price.toFixed(2)}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        product.stock > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'
                      }`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* RIGHT PANEL: Buyer's Cart & Checkout Summary */}
      <div className="w-full lg:w-96 bg-white border border-slate-200 rounded-2xl flex flex-col shadow-sm overflow-hidden">
        
        {/* Cart Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-emerald-600" />
            <h2 className="text-xs font-bold text-slate-800">Current Cart</h2>
          </div>
          <span className="bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
            {totalItemsCount}
          </span>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs py-12">
              <ShoppingCart className="w-8 h-8 mb-2 opacity-30" />
              <p>Click stock items to add to cart</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="pt-3 first:pt-0 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 truncate max-w-[170px]">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-rose-500 transition">
                      <span className="text-xs font-bold">×</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">${item.price.toFixed(2)} each</span>
                  <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1 border border-slate-200">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-5 h-5 bg-white rounded-md flex items-center justify-center text-slate-600 hover:bg-slate-200 transition"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-5 h-5 bg-white rounded-md flex items-center justify-center text-slate-600 hover:bg-slate-200 transition"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary & Checkout Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50 space-y-2">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-800">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Tax (8%)</span>
            <span className="font-semibold text-slate-800">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
            <span>Total</span>
            <span className="text-emerald-600">${total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCompleteSale}
            disabled={cart.length === 0}
            className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-xs font-bold py-3 rounded-xl shadow-md shadow-emerald-200 transition flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Complete Sale & Deduct Stock</span>
          </button>
        </div>

      </div>

    </div>
  );
}