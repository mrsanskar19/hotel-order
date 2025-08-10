'use client';

import { MenuContext } from '@/context/MenuProvider';
import { useContext } from 'react';

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
