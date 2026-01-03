import React, { JSX } from 'react';
import { cn } from '@/lib/utils'; // hoặc tự tạo helper function

interface ResponsiveTextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'caption';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  variant = 'body',
  className,
  as
}) => {
  const variants = {
    h1: 'text-2xl sm:text-3xl md:text-4xl font-bold',
    h2: 'text-xl sm:text-2xl md:text-3xl font-semibold',
    h3: 'text-lg sm:text-xl md:text-2xl font-medium',
    body: 'text-sm sm:text-base',
    small: 'text-xs sm:text-sm',
    caption: 'text-xs'
  };

  const Component = as || 'p';

  return (
    <Component className={cn(variants[variant], className)}>
      {children}
    </Component>
  );
};

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn('px-4 sm:px-6 md:px-8 lg:px-10', className)}>
      {children}
    </div>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outline';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default'
}) => {
  const variants = {
    default: 'bg-white border border-gray-200 shadow-sm',
    elevated: 'bg-white shadow-lg border border-gray-100',
    outline: 'bg-white border-2 border-gray-200'
  };

  return (
    <div className={cn(
      'rounded-xl transition-all duration-200',
      variants[variant],
      className
    )}>
      {children}
    </div>
  );
};

interface InfoItemProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  className?: string;
}

export const InfoItem: React.FC<InfoItemProps> = ({
  label,
  value,
  icon,
  className
}) => {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-center gap-2">
        {icon}
        <ResponsiveText variant="small" className="font-medium text-gray-700">
          {label}
        </ResponsiveText>
      </div>
      <ResponsiveText className="text-gray-900 pl-6">
        {value}
      </ResponsiveText>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
  color?: 'green' | 'blue' | 'gray' | 'purple';
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  color = 'gray',
  icon
}) => {
  const colorClasses = {
    green: 'bg-green-50 border-green-200 text-green-700',
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    gray: 'bg-gray-50 border-gray-200 text-gray-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700'
  };

  return (
    <div className={cn(
      'flex-1 min-w-[140px] rounded-lg border p-4 transition-all hover:shadow-md',
      colorClasses[color]
    )}>
      {icon && <div className="mb-2">{icon}</div>}
      <ResponsiveText variant="caption" className="opacity-80 uppercase tracking-wide">
        {label}
      </ResponsiveText>
      <ResponsiveText variant="h2" className="font-bold mt-1">
        {value}
      </ResponsiveText>
    </div>
  );
};

interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  responsive?: boolean;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className,
  responsive = true
}) => {
  return (
    <div className={cn(
      'flex gap-3',
      responsive && 'flex-col sm:flex-row',
      className
    )}>
      {children}
    </div>
  );
};