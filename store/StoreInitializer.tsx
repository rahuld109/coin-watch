'use client';

import { useRef } from 'react';
import { StoreState, useAppStore } from '.';

const StoreInitializer = ({ state }: { state: StoreState }) => {
  const initilized = useRef(false);
  if (!initilized.current) {
    useAppStore.setState(state);
    initilized.current = true;
  }
  return null;
};

export default StoreInitializer;
