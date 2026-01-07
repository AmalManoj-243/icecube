import { create } from 'zustand';

const useProductStore = create((set, get) => ({
  currentCustomerId: null,
  cartItems: {}, // Object: {customerId: [...items]}
  
  // Set current customer
  setCurrentCustomer: (customerId) => set({ currentCustomerId: customerId }),
  
  // Get current customer's cart
  getCurrentCart: () => {
    const { currentCustomerId, cartItems } = get();
    return cartItems[currentCustomerId] || [];
  },
  
  // Backward compatibility - returns current customer's products
  get products() {
    return get().getCurrentCart();
  },
  
  addProduct: (product) => set((state) => {
    // Ensure we have a customer context; fall back to a guest cart
    const customerId = state.currentCustomerId || 'pos_guest';

    const currentCart = Array.isArray(state.cartItems[customerId]) ? state.cartItems[customerId].slice() : [];

    // Normalize incoming product fields
    const incomingId = product.id ?? product.remoteId ?? null;
    const priceUnit = typeof product.price_unit !== 'undefined' ? Number(product.price_unit) : (typeof product.price !== 'undefined' ? Number(product.price) : Number(product.price_unit ?? product.price ?? 0));
    const qty = Number(product.quantity ?? product.qty ?? 1);

    // Find existing item by id
    const idx = currentCart.findIndex(p => String(p.id) === String(incomingId));
    if (idx >= 0) {
      // Update existing item
      const existing = { ...currentCart[idx] };
      existing.quantity = qty;
      existing.qty = qty;
      if (typeof product.price !== 'undefined') existing.price = Number(product.price);
      if (typeof product.price_unit !== 'undefined') existing.price_unit = Number(product.price_unit);
      // Recalculate subtotals
      const unitPrice = Number(existing.price_unit ?? existing.price ?? 0);
      const subtotal = unitPrice * (existing.quantity || existing.qty || 1);
      existing.price_subtotal = subtotal;
      existing.price_subtotal_incl = subtotal;
      currentCart[idx] = existing;
    } else {
      // Add new item
      const newPrice = typeof product.price !== 'undefined' ? Number(product.price) : priceUnit;
      const prod = {
        ...product,
        id: incomingId,
        quantity: qty,
        qty: qty,
        price: newPrice,
        price_unit: priceUnit,
        price_subtotal: priceUnit * qty,
        price_subtotal_incl: priceUnit * qty,
      };
      currentCart.push(prod);
    }

    return {
      ...state,
      currentCustomerId: state.currentCustomerId || 'pos_guest',
      cartItems: {
        ...state.cartItems,
        [customerId]: currentCart
      }
    };
  }),
  
  removeProduct: (productId) => set((state) => {
    const { currentCustomerId } = state;
    if (!currentCustomerId) return state;
    
    const currentCart = state.cartItems[currentCustomerId] || [];
    return {
      ...state,
      cartItems: {
        ...state.cartItems,
        [currentCustomerId]: currentCart.filter((product) => product.id !== productId)
      }
    };
  }),
  
  clearProducts: () => set((state) => {
    const { currentCustomerId } = state;
    if (!currentCustomerId) return state;
    
    return {
      ...state,
      cartItems: {
        ...state.cartItems,
        [currentCustomerId]: []
      }
    };
  }),
  
  // Load customer cart (from API or localStorage)
  loadCustomerCart: (customerId, cartData) => set((state) => ({
    ...state,
    currentCustomerId: customerId,
    cartItems: {
      ...state.cartItems,
      [customerId]: cartData || []
    }
  })),
  
  // Clear all carts
  clearAllCarts: () => set({ cartItems: {}, currentCustomerId: null }),
}));

export default useProductStore;
