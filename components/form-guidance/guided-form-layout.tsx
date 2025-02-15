import { ReactNode } from 'react';
import { GuidancePanel } from './guidance-panel';
import { GuidanceProvider, useGuidance } from './guidance-context';

import { TooltipContent } from '@/app/(skilins)/constants/tooltips';

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
    <div className='relative max-w-screen-md'>
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

  return {
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      const element = e.currentTarget;
      const rect = element.getBoundingClientRect();

      const verticalCenter = rect.top + rect.height / 2;

      setActiveField(fieldName, {
        top: verticalCenter - 32,
        left: rect.right - 24,
      });
    },
    onBlur: () => setActiveField(null),
  };
};
