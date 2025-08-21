interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface OrderDetails {
  orderId: string;
  paymentId: string;
  deliveryOption: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
  instructions?: string;
  items: OrderItem[];
  total: number;
  timestamp: string;
}

// In a real app, this would be an API call to your backend
const API_URL = '/api/orders';

export const submitOrder = async (orderDetails: Omit<OrderDetails, 'orderId' | 'timestamp'>): Promise<{ success: boolean; orderId?: string; error?: string }> => {
  try {
    // In a real app, this would be an API call to your backend
    console.log('Submitting order:', orderDetails);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a timestamp
    const timestamp = new Date().toISOString();
    
    // In a real app, you would save the order to a database here
    const savedOrder = {
      ...orderDetails,
      timestamp,
    };
    
    // Send notifications
    await Promise.all([
      sendAdminNotification(savedOrder),
      sendCustomerConfirmation(savedOrder)
    ]);
    
    return { success: true, orderId: savedOrder.orderId };
  } catch (error) {
    console.error('Error submitting order:', error);
    return { success: false, error: 'Failed to submit order' };
  }
};

const sendAdminNotification = async (order: OrderDetails) => {
  try {
    // In a real app, this would be an API call to your notification service
    console.log('Sending admin notification for order:', order.orderId);
    
    // Format order details for email
    const orderSummary = order.items
      .map(item => `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');
    
    const deliveryInfo = order.deliveryOption === 'delivery' 
      ? `\n\nDelivery Address:\n${order.address}`
      : '\n\nPickup Order';
    
    const message = `
      NEW ORDER #${order.orderId}
      
      Customer: ${order.name}
      Phone: ${order.phone}
      Email: ${order.email}
      
      Order Type: ${order.deliveryOption === 'delivery' ? 'Delivery' : 'Pickup'}
      ${deliveryInfo}
      
      Order Summary:
      ${orderSummary}
      
      Total: $${order.total.toFixed(2)}
      
      Special Instructions: ${order.instructions || 'None'}
      
      Order Time: ${new Date(order.timestamp).toLocaleString()}
    `;
    
    // In a real app, you would send an email or notification here
    console.log('Admin Notification:', message);
    
    // For demo purposes, we'll also log to the console
    // In a real app, you would use a service like SendGrid, Mailgun, or a notification service
    
  } catch (error) {
    console.error('Error sending admin notification:', error);
  }
};

const sendCustomerConfirmation = async (order: OrderDetails) => {
  try {
    // Similar to admin notification but formatted for the customer
    const orderSummary = order.items
      .map(item => `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');
    
    const deliveryInfo = order.deliveryOption === 'delivery'
      ? `\n\nYour order will be delivered to:\n${order.address}\n\nWe'll contact you when it's on the way!`
      : '\n\nYour order will be ready for pickup in about 20-30 minutes.\n\nWe\'ll send you a notification when it\'s ready!';
    
    const message = `
      THANK YOU FOR YOUR ORDER #${order.orderId}
      
      Hello ${order.name},
      
      We've received your order and are getting it ready for you.
      
      Order Summary:
      ${orderSummary}
      
      Total: $${order.total.toFixed(2)}
      
      ${deliveryInfo}
      
      Order Time: ${new Date(order.timestamp).toLocaleString()}
      
      If you have any questions, please call us at [Your Restaurant Phone].
      
      We appreciate your business!
      - The Crush Café Team
    `;
    
    // In a real app, you would send an email to the customer
    console.log('Customer Confirmation:', message);
    
  } catch (error) {
    console.error('Error sending customer confirmation:', error);
  }
};

// For admin dashboard
export const getRecentOrders = async (): Promise<OrderDetails[]> => {
  // In a real app, this would fetch from your database
  return [];
};
