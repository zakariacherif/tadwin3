import React from 'react';
import { motion } from 'framer-motion';
import stringToColor from '@/lib/stringToColor';

const FollowPointer = ({
    x,
    y,
    info
}: {
    x: number;
    y: number;
    info: {
        name: string;
        email: string;
        avatar: string;
    };
}) => {
    const color = stringToColor(info.email || '5');

    return (
        <motion.div
            className="h-5 w-2  font-alex text-white font-normal rounded-full absolute z-50 flex flex-row justify-center items-center"
            style={{
                top: y,
                left: x,
                pointerEvents: 'none',
            }}
            initial={{
                opacity: 1,
                scale: 1,
            }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            exit={{
                opacity: 0,
                scale: 0,
            }}
        >
             {/* New cursor implementation */}
      <svg
        width="24px" // Adjusted width
        height="24px" // Adjusted height
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute z-50 left-[-10rem]  top-[-50%]" // Added class for positioning
        style={{
          transform: 'translate(-50%, -50%)', // Centering the cursor
          pointerEvents: 'none', // Prevents cursor blocking interactions
          position: 'absolute', // Positioned relative to the parent div
        }}
      >
        <path
          d="M3 3L10 22L12.0513 15.8461C12.6485 14.0544 14.0544 12.6485 15.846 12.0513L22 10L3 3Z"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>


            <motion.div
                style={{
                    backgroundColor: color, // Corrected the spelling
                }}
                initial={{
                    opacity: 1,
                    scale: 1,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                exit={{
                    opacity: 0,
                    scale: 0,
                }}
                className="px-3 py-3   font-alex whitespace-nowrap min-w-max text-xs rounded-full"
            >
                {info?.name || info.email}
            </motion.div>
        </motion.div>
    );
};

export default FollowPointer;
