import React, { ReactNode } from 'react';
import { Priority, Status } from '../../types/common';

interface BadgeProps {
  children: ReactNode;
  variant?: 'rose' | 'gray' | 'done' | 'progress' | 'review' | 'todo' | 'p1' | 'p2' | 'p3' | 'custom';
  color?: string;
  bgColor?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'rose',
  color,
  bgColor,
  className = ''
}) => {
  const customStyle: React.CSSProperties = {};
  if (color) customStyle.color = color;
  if (bgColor) customStyle.backgroundColor = bgColor;

  return (
    <span 
      className={`badge badge-${variant} ${className}`}
      style={customStyle}
    >
      {children}
    </span>
  );
};

export const PriorityBadge: React.FC<{ priority: Priority }> = ({ priority }) => {
  const label = priority === 'p1' ? 'P1 Urgent' : priority === 'p2' ? 'P2 Medium' : 'P3 Low';
  return <Badge variant={priority}>{label}</Badge>;
};

export const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const labels: Record<Status, string> = {
    todo: 'To Do',
    in_progress: 'In Progress',
    review: 'Review',
    done: 'Completed'
  };
  const variant = status === 'in_progress' ? 'progress' : status;
  return <Badge variant={variant}>{labels[status]}</Badge>;
};
