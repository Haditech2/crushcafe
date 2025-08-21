import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentId: string) => void;
  onBack: () => void;
  orderDetails: {
    items: Array<{
      id: string;
      name: string;
      quantity: number;
      price: number;
    }>;
    deliveryOption: string;
    deliveryAddress?: string;
    specialInstructions?: string;
  };
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ 
  amount, 
  onSuccess, 
  onBack,
  orderDetails 
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState('');

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim()
      .slice(0, 19);
  };

  const formatExpiry = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{0,2})/, (_, a, b) => (b ? `${a}/${b}` : a))
      .slice(0, 5);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!cardNumber || !expiry || !cvc || !name) {
      setError('Please fill in all payment details');
      return;
    }
    
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      setError('Please enter a valid card number');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // In a real app, you would call your backend API to process the payment
      // This is a mock implementation
      console.log('Processing payment with details:', {
        cardNumber: cardNumber.replace(/\s/g, ''),
        expiry,
        cvc,
        name,
        amount,
        orderDetails
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a mock payment ID
      const paymentId = `pay_${Math.random().toString(36).substr(2, 9)}`;
      setPaymentSuccess(true);
      
      // Call onSuccess after a short delay to show success state
      setTimeout(() => {
        onSuccess(paymentId);
      }, 1500);
      
    } catch (err) {
      setError('Payment failed. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="text-center p-8">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
        <p className="text-gray-600 mb-6">Your order is being processed.</p>
        <div className="animate-pulse">
          <p className="text-sm text-gray-500">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {orderDetails.items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-gray-600">
                  {item.quantity} × {item.name}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            {orderDetails.deliveryOption === 'delivery' && (
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-600">Delivery</span>
                <span>$5.00</span>
              </div>
            )}
            <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>${(orderDetails.deliveryOption === 'delivery' ? amount + 5 : amount).toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-medium">Payment Details</h3>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="cardName">Name on Card</Label>
          <Input
            id="cardName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            disabled={isProcessing}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            disabled={isProcessing}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input
              id="expiry"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              maxLength={5}
              disabled={isProcessing}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input
              id="cvc"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="123"
              maxLength={4}
              disabled={isProcessing}
            />
          </div>
        </div>
        
        <div className="pt-4">
          <p className="text-xs text-gray-500 mb-4">
            Your payment is secured with 256-bit SSL encryption. We do not store your card details.
          </p>
          
          <div className="flex justify-between space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isProcessing}
              className="w-1/2"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={isProcessing}
              className="w-1/2 bg-amber-600 hover:bg-amber-700"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay $${(orderDetails.deliveryOption === 'delivery' ? amount + 5 : amount).toFixed(2)}`
              )}
            </Button>
          </div>
        </div>
      </form>
      
      <div className="mt-6 flex justify-center space-x-6">
        <div className="text-gray-400 text-xs">Secure Payments</div>
        <div className="flex space-x-2">
          <span className="text-xs text-gray-400">Accepted Cards:</span>
          <div className="flex space-x-1">
            <span className="text-gray-500">Visa</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">Mastercard</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">Amex</span>
          </div>
        </div>
      </div>
    </div>
  );
};
