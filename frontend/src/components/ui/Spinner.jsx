import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Spinner({ className, size = 24 }) {
  return (
    <div className={cn("flex items-center justify-center min-h-[50vh] w-full", className)}>
      <Loader2 className="animate-spin text-primary" size={size} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
