import RoomProvider from '@/app/b-component/RoomProvider';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

const DocLayout = ({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return <p>Unauthorized. Please sign in to continue.</p>;
  }

  return (
    <RoomProvider roomId={id}> {/* Pass the roomId prop */}
      {children}
    </RoomProvider>
  );
};

export default DocLayout;
