// Types
export interface Reservation {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  partySize: number;
  reservationDate: string;
  reservationTime: string;
  status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled';
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

// Mock data
let reservations: Reservation[] = [
  {
    id: '1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+1234567890',
    partySize: 4,
    reservationDate: '2025-08-25',
    reservationTime: '19:00',
    status: 'confirmed',
    specialRequests: 'Window seat preferred',
    createdAt: '2025-08-20T10:30:00Z',
    updatedAt: '2025-08-20T10:30:00Z',
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+1987654321',
    partySize: 2,
    reservationDate: '2025-08-26',
    reservationTime: '20:00',
    status: 'pending',
    createdAt: '2025-08-21T14:15:00Z',
    updatedAt: '2025-08-21T14:15:00Z',
  },
];

// API functions
export const getReservations = async (): Promise<Reservation[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...reservations]);
    }, 300);
  });
};

export const updateReservationStatus = async (
  id: string, 
  status: Reservation['status']
): Promise<Reservation> => {
  return new Promise((resolve, reject) => {
    const index = reservations.findIndex(r => r.id === id);
    if (index === -1) {
      reject(new Error('Reservation not found'));
      return;
    }
    
    const updatedReservation = {
      ...reservations[index],
      status,
      updatedAt: new Date().toISOString()
    };
    
    reservations = [
      ...reservations.slice(0, index),
      updatedReservation,
      ...reservations.slice(index + 1)
    ];
    
    setTimeout(() => resolve(updatedReservation), 300);
  });
};

export const getReservationById = async (id: string): Promise<Reservation | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(reservations.find(r => r.id === id));
    }, 200);
  });
};

// Helper function to format date and time
export const formatReservationDateTime = (dateStr: string, timeStr: string): string => {
  const date = new Date(dateStr);
  return `${date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  })} at ${timeStr}`;
};
