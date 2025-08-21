// Types
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'food' | 'drinks' | 'desserts';
  isAvailable: boolean;
  imageUrl?: string;
}

// Mock data
let menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    price: 12.99,
    category: 'food',
    isAvailable: true
  },
  {
    id: '2',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with Caesar dressing and croutons',
    price: 8.99,
    category: 'food',
    isAvailable: true
  },
  {
    id: '3',
    name: 'Iced Coffee',
    description: 'Chilled coffee with milk and ice',
    price: 4.50,
    category: 'drinks',
    isAvailable: true
  },
  {
    id: '4',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center',
    price: 6.99,
    category: 'desserts',
    isAvailable: true
  }
];

// API functions
export const getMenuItems = async (): Promise<MenuItem[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...menuItems]);
    }, 300);
  });
};

export const addMenuItem = async (item: Omit<MenuItem, 'id'>): Promise<MenuItem> => {
  return new Promise((resolve) => {
    const newItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9)
    };
    menuItems = [...menuItems, newItem];
    setTimeout(() => resolve(newItem), 300);
  });
};

export const updateMenuItem = async (id: string, updates: Partial<MenuItem>): Promise<MenuItem> => {
  return new Promise((resolve, reject) => {
    const index = menuItems.findIndex(item => item.id === id);
    if (index === -1) {
      reject(new Error('Menu item not found'));
      return;
    }
    const updatedItem = { ...menuItems[index], ...updates };
    menuItems = [
      ...menuItems.slice(0, index),
      updatedItem,
      ...menuItems.slice(index + 1)
    ];
    setTimeout(() => resolve(updatedItem), 300);
  });
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    menuItems = menuItems.filter(item => item.id !== id);
    setTimeout(() => resolve(), 300);
  });
};
