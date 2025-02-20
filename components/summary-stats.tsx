import {
  LucideIcon,
  AlertTriangle,
  Info,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

interface StatItem {
  label: string;
  value: number;
  variant: "success" | "danger" | "warning" | "info" | "default";
  icon?: LucideIcon;
}

interface SummaryStatsProps {
  items: StatItem[];
}

const variantStyles = {
  success:
    "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900 text-green-600 dark:text-green-400",
  danger:
    "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400",
  warning:
    "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-900 text-yellow-600 dark:text-yellow-400",
  info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400",
  default:
    "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-900 text-gray-600 dark:text-gray-400",
};

const defaultIcons = {
  success: CheckCircle,
  danger: AlertTriangle,
  warning: AlertTriangle,
  info: Info,
  default: HelpCircle,
};

export function SummaryStats({ items }: SummaryStatsProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4 my-6'>
      {items.map((item, index) => {
        const Icon = item.icon || defaultIcons[item.variant];
        return (
          <div
            key={index}
            className={`p-6 rounded-lg border ${
              variantStyles[item.variant]
            } relative overflow-hidden`}
          >
            <div className='flex items-start justify-between'>
              <div>
                <p className='text-sm font-medium mb-2'>{item.label}</p>
                <p className='text-3xl font-bold'>{item.value}</p>
              </div>
              <Icon className='h-5 w-5' />
            </div>
          </div>
        );
      })}
    </div>
  );
}
