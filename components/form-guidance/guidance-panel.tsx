import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface GuidanceItem {
  title: string;
  items: string[];
}

interface GuidancePanelProps {
  activeField: string | null;
  tooltips: Record<string, GuidanceItem>;
  position: { top: number; left: number } | null;
}

const TooltipContent = ({ title, items }: GuidanceItem) => (
  <div>
    <h2 className='font-bold text-lg mb-2'>{title}</h2>
    <ul className='list-disc pl-4 space-y-2'>
      {items.map((item, index) => (
        <li key={index} className='text-gray-700'>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export const GuidancePanel = ({
  activeField,
  tooltips,
  position,
}: GuidancePanelProps) => {
  if (!activeField || !tooltips[activeField] || !position) return null;

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
        <TooltipContent {...tooltips[activeField]} />
      </CardContent>
    </Card>
  );
};
