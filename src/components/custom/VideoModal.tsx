import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import ReactPlayer from 'react-player';
import { Button } from '../Button';

const VideoModal = ({ videoUrl }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="lg" className="w-full sm:w-auto">
          Watch Demo
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* 1. OVERLAY: Acts as the "Centerer" for the content */}
        <Dialog.Overlay 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4 md:p-10"
        >
          {/* 2. CONTENT: Defined size, no more translate classes */}
          <Dialog.Content 
            className="relative w-full max-w-[1280px] aspect-video bg-black rounded-2xl shadow-2xl border border-white/10 focus:outline-none overflow-visible"
            onClick={(e) => e.stopPropagation()} // Prevents accidental closing
          >
            
            {/* 3. CLOSE BUTTON: High Z-index, positioned OUTSIDE the video area */}
            <Dialog.Close 
              className="absolute -top-12 right-0 md:-right-12 md:-top-2 z-[10000] p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="sr-only">Close</span>
            </Dialog.Close>

            {/* 4. PLAYER CONTAINER */}
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <ReactPlayer
                playsinline={true}
                src={videoUrl}
                controls
                width="100%"
                height="100%"
                playing={true}
                config={{
                  youtube: { playerVars: { autoplay: 1, rel: 0 } }
                }}
              />
            </div>

          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default VideoModal;
