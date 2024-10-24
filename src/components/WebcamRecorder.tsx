import React, { useRef, useEffect } from 'react';

interface WebcamRecorderProps {
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
}

const WebcamRecorder: React.FC<WebcamRecorderProps> = ({ 
  isRecording,
  setIsRecording
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: {
            aspectRatio: 16/9,
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: true 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        mediaRecorderRef.current = new MediaRecorder(stream, {
          mimeType: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
        });
        
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'video/mp4' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.style.display = 'none';
          a.href = url;
          a.download = 'recording.mp4';
          a.click();
          window.URL.revokeObjectURL(url);
          chunksRef.current = [];
        };
      } catch (err) {
        console.error('Error accessing camera:', err);
        // Fallback to WebM if MP4 is not supported
        try {
          if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            mediaRecorderRef.current = new MediaRecorder(stream, {
              mimeType: 'video/webm'
            });
            
            mediaRecorderRef.current.ondataavailable = (event) => {
              if (event.data.size > 0) {
                chunksRef.current.push(event.data);
              }
            };

            mediaRecorderRef.current.onstop = () => {
              const blob = new Blob(chunksRef.current, { type: 'video/webm' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              document.body.appendChild(a);
              a.style.display = 'none';
              a.href = url;
              a.download = 'recording.webm';
              a.click();
              window.URL.revokeObjectURL(url);
              chunksRef.current = [];
            };
          }
        } catch (fallbackErr) {
          console.error('Error setting up fallback recorder:', fallbackErr);
        }
      }
    }

    setupCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (isRecording && mediaRecorderRef.current) {
      chunksRef.current = [];
      mediaRecorderRef.current.start();
    } else if (!isRecording && mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }, [isRecording]);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-zinc-900/30 backdrop-blur">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full aspect-video bg-black object-cover"
      />
      
      {isRecording && (
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500/90 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-xs font-medium text-white">Recording</span>
        </div>
      )}
    </div>
  );
};

export default WebcamRecorder;