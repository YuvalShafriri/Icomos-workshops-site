import React, { useEffect, useState } from 'react';

interface TransitionProps {
  show: boolean;
  duration?: number; // ms
  className?: string;
  children: React.ReactNode;
}

const Transition: React.FC<TransitionProps> = ({ show, duration = 300, className = '', children }) => {
  const [mounted, setMounted] = useState<boolean>(show);
  const [entered, setEntered] = useState<boolean>(false);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    if (show) {
      setMounted(true);
      // trigger enter after next tick
      t = setTimeout(() => setEntered(true), 10);
      return () => t && clearTimeout(t);
    }
    if (!show && mounted) {
      setEntered(false);
      t = setTimeout(() => setMounted(false), duration);
      return () => t && clearTimeout(t);
    }
  }, [show, mounted, duration]);

  if (!mounted) return null;

  return (
    <div className={`${className} ${entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} transition-all`} style={{ transitionDuration: `${duration}ms` }}>
      {children}
    </div>
  );
};

export default Transition;
