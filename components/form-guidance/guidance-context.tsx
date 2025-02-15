'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface GuidanceContextType {
  activeField: string | null;
  position: { top: number; left: number } | null;
  setActiveField: (
    field: string | null,
    position?: { top: number; left: number }
  ) => void;
}

const GuidanceContext = createContext<GuidanceContextType | undefined>(
  undefined
);

export const GuidanceProvider = ({ children }: { children: ReactNode }) => {
  const [activeField, setActiveField] = useState<string | null>(null);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const handleSetActiveField = (
    field: string | null,
    newPosition?: { top: number; left: number }
  ) => {
    setActiveField(field);
    setPosition(field ? newPosition || null : null);
  };

  return (
    <GuidanceContext.Provider
      value={{ activeField, position, setActiveField: handleSetActiveField }}
    >
      {children}
    </GuidanceContext.Provider>
  );
};

export const useGuidance = () => {
  const context = useContext(GuidanceContext);
  if (context === undefined) {
    throw new Error('useGuidance must be used within a GuidanceProvider');
  }
  return context;
};
