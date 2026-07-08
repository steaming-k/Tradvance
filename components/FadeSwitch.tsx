'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface Props {
  activeKey: string;
  children: ReactNode;
}

const OUT_DURATION_MS = 220;

// 화면(activeKey) 자체가 바뀔 때만 나가는 화면을 스냅샷으로 고정해 페이드아웃시키고,
// 같은 화면 안에서 children 내용만 바뀔 때는 항상 최신 내용을 즉시 반영한다.
export function FadeSwitch({ activeKey, children }: Props) {
  const [renderKey, setRenderKey] = useState(activeKey);
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const frozenRef = useRef<ReactNode>(children);
  const latestChildrenRef = useRef(children);
  const pendingKeyRef = useRef(activeKey);

  if (activeKey !== pendingKeyRef.current) {
    if (phase !== 'out') {
      frozenRef.current = latestChildrenRef.current;
      setPhase('out');
    }
    pendingKeyRef.current = activeKey;
  }
  latestChildrenRef.current = children;

  useEffect(() => {
    if (phase !== 'out') return;

    const timer = setTimeout(() => {
      setRenderKey(pendingKeyRef.current);
      setPhase('in');
    }, OUT_DURATION_MS);

    return () => clearTimeout(timer);
  }, [phase]);

  const displayChildren = phase === 'out' ? frozenRef.current : children;

  return (
    <div key={renderKey} className={phase === 'out' ? 'animate-screen-out' : 'animate-screen-in'}>
      {displayChildren}
    </div>
  );
}
