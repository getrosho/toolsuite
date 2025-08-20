interface AdSlotProps {
  size?: 'banner' | 'rectangle' | 'square';
  className?: string;
}

export function AdSlot({ size = 'banner', className = '' }: AdSlotProps) {
  const sizeClasses = {
    banner: 'h-24',
    rectangle: 'h-64 w-72',
    square: 'h-64 w-64',
  };

  const sizeText = {
    banner: 'Google AdSense - Banner Ad (728x90)',
    rectangle: 'Google AdSense - Rectangle Ad (300x250)',
    square: 'Google AdSense - Square Ad (250x250)',
  };

  return (
    <div className={`ad-slot rounded-lg ${sizeClasses[size]} ${className}`}>
      {sizeText[size]}
    </div>
  );
}
