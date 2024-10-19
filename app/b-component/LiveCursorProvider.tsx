'use client';

import { useMyPresence, useOthers } from '@liveblocks/react/suspense';
import React from 'react';
import FollowPointer from '../s-component/FollowPointer';

const LiveCursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [myPresence, updateMyPresence] = useMyPresence();
  const others = useOthers();

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();

    const cursor = {
      x: e.clientX + rect.left + 100 + window.scrollX, // Adjust for scrolling
      y: e.clientY - rect.top + window.scrollY,  // Adjust for scrolling
    };

    updateMyPresence({ cursor });
  }

  function handlePointerLeave() {
    updateMyPresence({ cursor: null });
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ position: 'relative', width: '100%', height: 'auto', overflow: 'hidden' }}
    >
      {others
        .filter((other) => other.presence?.cursor !== null)
        .map(({ connectionId, presence, info }) => {
          const x = presence.cursor?.x;
          const y = presence.cursor?.y;

          return (
            <FollowPointer
              key={connectionId}
              info={info}
              x={x}
              y={y}
              style={{
                position: 'absolute',
                left: `${x - 200}px`, // Move pointer 100% to the left of its x position
                top: `${y}px`,
                transform: 'translate(-50%, -100%)', // Center the pointer correctly
                pointerEvents: 'none',
              }}
            />
          );
        })}
      {children}
    </div>
  );
};

export default LiveCursorProvider;
