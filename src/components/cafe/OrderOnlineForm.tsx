import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2 } from 'lucide-react';
import { submitOrder } from '@/lib/orderService';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface OrderOnlineFormProps {
  onClose: () => void;
}

const menuItems: MenuItem[] = [
  {
    id: 'coffee-1',
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and foam',
    price: 4.50,
    category: 'Drinks'
  },
  {
    id: 'coffee-2',
    name: 'Latte',
    description: 'Espresso with a lot of steamed milk',
    price: 4.00,
    category: 'Drinks'
  },
  {
    id: 'food-1',
    name: 'Avocado Toast',
    description: 'Sourdough bread with mashed avocado and toppings',
    price: 8.50,
    category: 'Food'
  },
  {
    id: 'food-2',
    name: 'Breakfast Burrito',
    description: 'Eggs, cheese, beans, and salsa in a tortilla',
    price: 9.50,
    category: 'Food'
  },
  {
    id: 'dessert-1',
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with ganache',
    price: 6.00,
    category: 'Desserts'
  },
];

export const OrderOnlineForm: React.FC<OrderOnlineFormProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState<OrderStep>('details');
  const [orderId, setOrderId] = useState<string>('');
  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: quantity
    }));
  };

  const calculateTotal = () => {
    return Object.entries(selectedItems).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(i => i.id === itemId);
      return total + (item ? item.price * quantity : 0);
    }, 0).toFixed(2);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentSuccess = async (paymentId: string) => {
    setIsSubmitting(true);
    
    try {
      const orderItems = Object.entries(selectedItems)
        .filter(([_, qty]) => qty > 0)
        .map(([id, quantity]) => ({
          id,
          quantity,
          ...menuItems.find(item => item.id === id)!
        }));
      
      const subtotal = orderItems.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
      );
      
      const total = deliveryOption === 'delivery' ? subtotal + 5 : subtotal;
      
      // Submit order to our order service
      const orderDetails = {
        paymentId,
        deliveryOption,
        name,
        phone,
        email,
        address: deliveryOption === 'delivery' ? address : undefined,
        instructions,
        items: orderItems,
        total,
      };
      
      const { orderId: newOrderId } = await submitOrder(orderDetails);
      
      setOrderId(newOrderId || `order_${Math.random().toString(36).substr(2, 8).toUpperCase()}`);
      setCurrentStep('confirmation');
      
      // Close the form after 5 seconds
      setTimeout(() => {
        onClose();
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting order:', error);
      // Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  if (currentStep === 'confirmation') {
    return (
      <div className="text-center p-8">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Order Confirmed!</h3>
        <p className="text-gray-600 mb-4">Your order #{orderId} is being prepared.</p>
        <p className="text-sm text-gray-500">
          We've sent a confirmation to {email || 'your email'}. We'll contact you when it's ready for {deliveryOption === 'delivery' ? 'delivery' : 'pickup'}.
        </p>
      </div>
    );
  }

  if (currentStep === 'payment') {
    const orderItems = Object.entries(selectedItems)
      .filter(([_, quantity]) => quantity > 0)
      .map(([id, quantity]) => {
        const item = menuItems.find(i => i.id === id);
        return item ? { ...item, quantity } : null;
      })
      .filter(Boolean);

    const subtotal = orderItems.reduce(
      (sum, item) => sum + (item ? item.price * item.quantity : 0),
      0
    );

    return (
      <PaymentForm
        amount={subtotal}
        onSuccess={handlePaymentSuccess}
        onBack={() => setCurrentStep('details')}
        orderDetails={{
          items: orderItems,
          deliveryOption,
          deliveryAddress: address,
          specialInstructions: instructions
        }}
      />
    );
  }

  const categories = [...new Set(menuItems.map(item => item.category))];

  return (
    <form onSubmit={handleOrderSubmit} className="space-y-6 p-4">
      <h3 className="text-xl font-semibold">Order Online</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Order Type</h4>
          <RadioGroup 
            value={deliveryOption} 
            onValueChange={setDeliveryOption}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <RadioGroupItem value="delivery" id="delivery" className="peer sr-only" />
              <Label
                htmlFor="delivery"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <div className="text-lg font-semibold">Delivery</div>
                <div className="text-sm text-muted-foreground">We'll bring it to you</div>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="pickup" id="pickup" className="peer sr-only" />
              <Label
                htmlFor="pickup"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <div className="text-lg font-semibold">Pickup</div>
                <div className="text-sm text-muted-foreground">Pick up at our café</div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Menu</h4>
          <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
            {categories.map(category => (
              <div key={category} className="space-y-3">
                <h5 className="text-sm font-medium text-muted-foreground">{category}</h5>
                <div className="space-y-2">
                  {menuItems
                    .filter(item => item.category === category)
                    .map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                          <div className="text-sm font-medium mt-1">${item.price.toFixed(2)}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, (selectedItems[item.id] || 0) - 1)}
                            disabled={!selectedItems[item.id]}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{selectedItems[item.id] || 0}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, (selectedItems[item.id] || 0) + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Contact Information</h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="Your phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email (optional)"
                />
              </div>
            </div>

            {deliveryOption === 'delivery' && (
              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address *</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required={deliveryOption === 'delivery'}
                  placeholder="Your full address"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="instructions">Special Instructions</Label>
              <Textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Any special instructions for your order?"
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center border-t pt-4">
          <span className="font-medium">Total:</span>
          <span className="text-lg font-semibold">${calculateTotal()}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" required />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the terms and conditions
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting || Object.keys(selectedItems).length === 0}
            className="w-full"
          >
            {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </div>
      </div>
    </form>
  );
};
