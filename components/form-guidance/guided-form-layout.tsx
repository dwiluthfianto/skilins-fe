import { ReactNode, useRef } from 'react';
import { GuidancePanel } from './guidance-panel';
import { GuidanceProvider, useGuidance } from './guidance-context';

import { TooltipContent } from '@/lib/tooltips';

interface GuidedFormLayoutProps {
  tooltips: {
    [key: string]: TooltipContent;
  };
  children: ReactNode;
}

// Create an inner component that uses the hook
const GuidanceContent = ({ children, tooltips }: GuidedFormLayoutProps) => {
  const { activeField, position } = useGuidance();

  return (
    <div className='relative max-w-screen-md mx-auto'>
      {children}
      <GuidancePanel
        activeField={activeField}
        tooltips={tooltips}
        position={position}
      />
    </div>
  );
};

// Wrapper component that provides the context
export const GuidedFormLayout = ({
  children,
  tooltips,
}: GuidedFormLayoutProps) => {
  return (
    <GuidanceProvider>
      <GuidanceContent tooltips={tooltips}>{children}</GuidanceContent>
    </GuidanceProvider>
  );
};

// Create a hook wrapper to use in form fields
export const useGuidedField = (fieldName: string) => {
  const { setActiveField } = useGuidance();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return {
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      const element = e.currentTarget;
      const rect = element.getBoundingClientRect();
      const verticalCenter = rect.top + rect.height / 2;

      setActiveField(
        fieldName,
        {
          top: verticalCenter - 32,
          left: rect.right - 60,
        },
        false
      );
    },
    onBlur: () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setActiveField(null, undefined, false);
    },
    onInput: () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setActiveField(fieldName, undefined, true);

      timeoutRef.current = setTimeout(() => {
        setActiveField(null, undefined, false);
      }, 1000);
    },
  };
};
