import { Card, CardContent } from '../ui/card';
import { useGuidance } from './guidance-context';

interface GuidanceItem {
  title: string;
  items: string[];
}

interface GuidancePanelProps {
  activeField: string | null;
  tooltips: Record<string, GuidanceItem>;
  position: { top: number; left: number } | null;
}

export const GuidancePanel = ({
  activeField,
  tooltips,
  position,
}: GuidancePanelProps) => {
  const { isTyping } = useGuidance();

  if (!activeField || !tooltips[activeField] || !position || isTyping)
    return null;

  return (
    <Card
      className='hidden lg:block w-72'
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <CardContent className='p-8'>
        <h2 className='font-bold text-lg mb-2'>
          {tooltips[activeField].title}
        </h2>
        <ul className='list-disc pl-4 space-y-2'>
          {tooltips[activeField].items.map((item, index) => (
            <li key={index} className='text-gray-700'>
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
