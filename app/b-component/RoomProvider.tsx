'use client';

import React from 'react';
import {
  ClientSideSuspense,
  RoomProvider as RoomProviderWrapper,
} from '@liveblocks/react/suspense';
import LoadingSpinner from '../s-component/LoadingSpinner';
import LiveCursorProvider from './LiveCursorProvider'; // Ensure this import is correct

const RoomProvider = ({
  roomId,
  children,
}: {
  roomId: string;
  children: React.ReactNode;
}) => {
  if (!roomId) {
    console.error('roomId is required');
    return null;
  }

  return (
    <RoomProviderWrapper
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense fallback={<LoadingSpinner />}>
        <LiveCursorProvider>{children}</LiveCursorProvider>
      </ClientSideSuspense>
    </RoomProviderWrapper>
  );
};

export default RoomProvider;
