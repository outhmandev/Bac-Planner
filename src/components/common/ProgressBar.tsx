import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  height?: number;
  color?: string;
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  height = 6,
  color,
  showLabel = false
}) => {
  const clampedValue = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div className="progress-wrapper">
      {showLabel && (
        <div className="progress-label-row">
          <span>Progress</span>
          <span className="progress-percent-text">{clampedValue}%</span>
        </div>
      )}
      <div className="progress-track" style={{ height: `${height}px` }}>
        <div 
          className="progress-fill" 
          style={{ 
            width: `${clampedValue}%`,
            ...(color ? { background: color } : {})
          }} 
        />
      </div>
    </div>
  );
};
