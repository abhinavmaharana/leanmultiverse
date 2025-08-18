'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [showSoundPrompt, setShowSoundPrompt] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const [videoQuality, setVideoQuality] = useState('auto');
  const [isIOS, setIsIOS] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if device is mobile and iOS
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint for better mobile detection
    };

    const ua = navigator.userAgent || navigator.vendor || '';
    const isiOSDevice = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(isiOSDevice);

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Optimize for network conditions
    optimizeForNetwork();

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      // Enhanced video optimization for watermark removal and performance
      const optimizeVideo = async () => {
        try {
          // Set video properties for optimal performance
          video.preload = isIOS ? 'auto' : 'metadata';
          video.muted = true;
          video.volume = 0;
          video.playbackRate = 1.0;
          video.defaultPlaybackRate = 1.0;

          // Ensure inline playback attributes on iOS
          if (isIOS) {
            video.setAttribute('playsinline', '');
            video.setAttribute('muted', '');
            video.setAttribute('autoplay', '');
          }

          // Mobile-specific optimizations
          if (isMobile) {
            video.muted = true;
            video.volume = 0;
            video.playsInline = true;
            (video as HTMLVideoElement & {
              webkitPlaysinline?: boolean;
              x5Playsinline?: boolean;
              x5VideoPlayer?: boolean;
              x5VideoPlayerType?: string;
              x5VideoPlayerFullscreen?: boolean;
            }).webkitPlaysinline = true;
            (video as HTMLVideoElement & {
              webkitPlaysinline?: boolean;
              x5Playsinline?: boolean;
              x5VideoPlayer?: boolean;
              x5VideoPlayerType?: string;
              x5VideoPlayerFullscreen?: boolean;
            }).x5Playsinline = true;
            (video as HTMLVideoElement & {
              webkitPlaysinline?: boolean;
              x5Playsinline?: boolean;
              x5VideoPlayer?: boolean;
              x5VideoPlayerType?: string;
              x5VideoPlayerFullscreen?: boolean;
            }).x5VideoPlayer = true;
            (video as HTMLVideoElement & {
              webkitPlaysinline?: boolean;
              x5Playsinline?: boolean;
              x5VideoPlayer?: boolean;
              x5VideoPlayerType?: string;
              x5VideoPlayerFullscreen?: boolean;
            }).x5VideoPlayerType = 'h5';
            (video as HTMLVideoElement & {
              webkitPlaysinline?: boolean;
              x5Playsinline?: boolean;
              x5VideoPlayer?: boolean;
              x5VideoPlayerType?: string;
              x5VideoPlayerFullscreen?: boolean;
            }).x5VideoPlayerFullscreen = false;
            console.log('Mobile video optimization complete');
          }

          const attemptAutoplay = async () => {
            try {
              if (isIOS) {
                // iOS kickstart: nudge currentTime slightly after metadata
                if (video.currentTime === 0) {
                  try { video.currentTime = 0.001; } catch {}
                }
              }

              if (video.readyState >= 2) {
                await video.play();
                console.log('Video autoplay successful');
              } else {
                const canPlayHandler = async () => {
                  try {
                    if (isIOS && video.currentTime === 0) {
                      try { video.currentTime = 0.001; } catch {}
                    }
                    await video.play();
                    console.log('Video autoplay successful after canplay');
                  } catch (e) {
                    console.log('Video play failed after canplay:', e);
                    handleVideoError(e);
                  }
                };
                video.addEventListener('canplay', canPlayHandler, { once: true });
                video.addEventListener('canplaythrough', canPlayHandler, { once: true });
              }
            } catch (error) {
              console.log('Video autoplay failed:', error);
              if (isMobile) {
                video.muted = true;
                video.play().catch(e => {
                  console.log('Mobile video play failed:', e);
                  handleVideoError(e);
                });
              }
            }
          };

          // Wait for video metadata to load
          if (video.readyState >= 1) {
            await attemptAutoplay();
          } else {
            video.addEventListener('loadedmetadata', attemptAutoplay, { once: true });
          }

          // Avoid applying CSS filters/transforms on the <video> element itself on iOS
        } catch (error) {
          console.log('Video optimization failed:', error);
          handleVideoError(error);
        }
      };

      // Add video event listeners for better control


      const handleVideoEnded = () => {
        console.log('Video loop completed');
      };

      const handleVideoStalled = () => {
        console.log('Video playback stalled, attempting recovery...');
        video.load();
      };

      video.addEventListener('ended', handleVideoEnded);
      video.addEventListener('stalled', handleVideoStalled);

      optimizeVideo();

      return () => {
        video.removeEventListener('ended', handleVideoEnded);
        video.removeEventListener('stalled', handleVideoStalled);
      };
    }
  }, [isMobile, isIOS]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setVideoError(false);
    console.log('Video loaded successfully');
  };

  const handleVideoError = (error: React.SyntheticEvent<HTMLVideoElement, Event> | unknown) => {
    console.error('Video error:', error);
    setVideoLoaded(false);
    setVideoError(true);
  };

  const handleSoundPermission = (enableSound: boolean) => {
    setShowSoundPrompt(false);
    
    if (videoRef.current) {
      if (enableSound) {
        // Enable sound
        videoRef.current.muted = false;
        videoRef.current.volume = 0.5;
      } else {
        // Keep muted
        videoRef.current.muted = true;
        videoRef.current.volume = 0;
      }
    }
  };

  const retryVideo = () => {
    if (videoRef.current) {
      setVideoError(false);
      videoRef.current.load();
      videoRef.current.play().catch(handleVideoError);
    }
  };

  const handleQualityChange = (quality: string) => {
    setVideoQuality(quality);
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Adjust video quality based on selection
      switch (quality) {
        case 'low':
          video.playbackRate = 0.75;
          break;
        case 'medium':
          video.playbackRate = 1.0;
          break;
        case 'high':
          video.playbackRate = 1.25;
          break;
        default:
          video.playbackRate = 1.0;
      }
      
      console.log(`Video quality changed to: ${quality}`);
    }
  };

  const optimizeForNetwork = () => {
    // Detect network conditions and optimize accordingly
    if ('connection' in navigator) {
      const connection = (navigator as Navigator & {
        connection?: {
          effectiveType?: string;
        };
      }).connection;
      if (connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') {
        setVideoQuality('low');
        console.log('Slow network detected, switching to low quality');
      }
    }
  };

  return (
    <main className="w-full h-screen sm:h-screen relative overflow-hidden">
      {/* Video Background with Enhanced Watermark Removal */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          controls={false}
          playsInline 
          preload="metadata"
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          onCanPlay={handleVideoLoad}
          webkit-playsinline="true"
          x5-playsinline="true"
          x5-video-player="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="false"
          style={{
            objectPosition: isMobile ? 'center center' : 'center center',
            minHeight: isMobile ? '100vh' : '100vh'
          }}
        >
          <source src="/video/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Enhanced Watermark Removal Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-transparent to-black/10 pointer-events-none"></div>
        
        {/* Video Loading Indicator */}
        {!videoLoaded && !videoError && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 p-4">
            <div className="text-white text-center w-full max-w-sm sm:max-w-md">
              <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-white mx-auto mb-3 sm:mb-4"></div>
              <p className="text-base sm:text-lg font-medium mb-2">Loading video...</p>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">Please wait while we prepare your experience</p>
            </div>
          </div>
        )}
        
        {/* Video Error State */}
        {videoError && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 z-10 flex items-center justify-center p-4">
            <div className="text-white text-center w-full max-w-sm sm:max-w-md mx-auto">
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎬</div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 leading-tight">Video Unavailable</h2>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">We&apos;re having trouble loading the background video. This won&apos;t affect your experience.</p>
              <Button
                onClick={retryVideo}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-sm sm:text-base"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
        
        {/* Fallback Background for Video Issues */}
        {(!videoLoaded || videoError) && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 z-10"></div>
        )}
      </div>

      {/* Sound Permission Prompt */}
      {showSoundPrompt && videoLoaded && !videoError && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30 p-4">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 w-full max-w-sm sm:max-w-md">
            <CardHeader className="text-center px-4 sm:px-6 pt-6 pb-4">
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🔊</div>
              <CardTitle className="text-xl sm:text-2xl text-white leading-tight">Enable Sound?</CardTitle>
              <CardDescription className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Would you like to enable sound for the background video? You can change this later.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-6">
              {/* Video Quality Selector */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-white text-xs sm:text-sm font-medium mb-2">Video Quality:</label>
                <div className="flex justify-center space-x-1 sm:space-x-2">
                  {['low', 'medium', 'high'].map((quality) => (
                    <Button
                      key={quality}
                      variant={videoQuality === quality ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleQualityChange(quality)}
                      className={`text-xs px-2 sm:px-3 py-1 sm:py-2 ${
                        videoQuality === quality
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30 border-white/30'
                      }`}
                    >
                      {quality.charAt(0).toUpperCase() + quality.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col space-y-3 justify-center">
                <Button
                  onClick={() => handleSoundPermission(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-2 sm:py-3"
                >
                  Yes, Enable Sound
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSoundPermission(false)}
                  className="bg-gray-500 hover:bg-gray-600 border-gray-400 text-white text-sm sm:text-base py-2 sm:py-3"
                >
                  No, Keep Muted
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Coming Soon Content */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <div className="text-center text-white max-w-4xl mx-auto px-4">

          

        </div>
      </div>
    </main>
  );
}
