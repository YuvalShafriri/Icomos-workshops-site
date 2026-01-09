import React, { useEffect, useRef, useState } from 'react';

type SwitchTransitionProps = {
  transitionKey: string;
  duration?: number;
  className?: string;
  children: React.ReactNode;
};

const SwitchTransition: React.FC<SwitchTransitionProps> = ({
  transitionKey,
  duration = 250,
  className = '',
  children,
}) => {
  const [renderKey, setRenderKey] = useState<string>(transitionKey);
  const [renderChildren, setRenderChildren] = useState<React.ReactNode>(children);
  const [phase, setPhase] = useState<'enter' | 'entered' | 'exit'>('entered');
  const timeoutRef = useRef<number | null>(null);
  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
      if (tickRef.current !== null) window.clearTimeout(tickRef.current);
    };
  }, []);

  useEffect(() => {
    if (transitionKey === renderKey) {
      setRenderChildren(children);
      return;
    }

    setPhase('exit');

    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    if (tickRef.current !== null) window.clearTimeout(tickRef.current);

    timeoutRef.current = window.setTimeout(() => {
      setRenderKey(transitionKey);
      setRenderChildren(children);
      setPhase('enter');

      tickRef.current = window.setTimeout(() => {
        setPhase('entered');
      }, 20);
    }, duration);
  }, [children, duration, renderKey, transitionKey]);

  const visible = phase === 'entered';

  return (
    <div
      className={`${className} transition-opacity ease-out ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDuration: `${duration}ms` }}
      data-switch-transition={renderKey}
    >
      {renderChildren}
    </div>
  );
};

export default SwitchTransition;
