import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

const videoSources = [
  { id: 'k_l_w9nQfW0', start: 0 }, // Official Audio - starts directly at 0:00
  { id: 'zDy8K0o_ksA', start: 4 }, // Official Music Video - starts at 4s (skips ambient intro)
  { id: 'ovpDU1thF94', start: 0 }  // Alternate/Lyrics video fallback
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Default to unmuted
  const [volume, setVolume] = useState(0.4);
  const playerRef = useRef(null);
  const hasScrolledRef = useRef(false);
  const videoIndexRef = useRef(0);

  // Initialize YouTube Player with robust polling
  useEffect(() => {
    let checkInterval;

    const initPlayer = () => {
      if (playerRef.current) return; // Already initialized
      
      const currentSource = videoSources[videoIndexRef.current];
      try {
        playerRef.current = new window.YT.Player('yt-player-placeholder', {
          height: '200',
          width: '200',
          videoId: currentSource.id,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            loop: 1,
            playlist: currentSource.id, // Enable looping
            modestbranding: 1,
            rel: 0,
            origin: window.location.origin, // Crucial for Appwrite hosted domains
            start: currentSource.start // Set exact direct start second
          },
          events: {
            onReady: (event) => {
              event.target.setVolume(volume * 100);
              event.target.unMute(); // Start unmuted
              
              if (hasScrolledRef.current) {
                event.target.playVideo();
                setIsPlaying(true);
              }
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              } else if (event.data === window.YT.PlayerState.ENDED) {
                // Force loop/auto-repeat when song finishes
                const loopSource = videoSources[videoIndexRef.current];
                event.target.seekTo(loopSource.start); // Seek back to direct start second
                event.target.playVideo();
                setIsPlaying(true);
              }
            },
            onError: (event) => {
              console.warn(`YouTube Player error ${event.data} on video ID ${videoSources[videoIndexRef.current].id}. Trying fallback...`);
              if (videoIndexRef.current < videoSources.length - 1) {
                videoIndexRef.current += 1;
                const nextSource = videoSources[videoIndexRef.current];
                if (playerRef.current && typeof playerRef.current.loadVideoById === 'function') {
                  playerRef.current.loadVideoById({
                    videoId: nextSource.id,
                    startSeconds: nextSource.start
                  });
                  playerRef.current.playVideo();
                  setIsPlaying(true);
                }
              } else {
                console.error("All YouTube video fallbacks failed.");
              }
            }
          }
        });
      } catch (err) {
        console.error("Failed to initialize YT Player", err);
      }
    };

    const checkYT = () => {
      if (window.YT && window.YT.Player) {
        initPlayer();
        clearInterval(checkInterval);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const hasScript = Array.from(document.getElementsByTagName('script')).some(
        script => script.src === 'https://www.youtube.com/iframe_api'
      );
      if (!hasScript) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
      checkInterval = setInterval(checkYT, 200);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, []);

  // Handle Autoplay on User Interaction (scroll, touch, click, keypress)
  useEffect(() => {
    const handleAutoplay = () => {
      hasScrolledRef.current = true;
      if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
        playerRef.current.unMute();
        setIsMuted(false);
        playerRef.current.playVideo();
        setIsPlaying(true);
        removeListeners();
      }
    };

    const removeListeners = () => {
      window.removeEventListener('scroll', handleAutoplay);
      window.removeEventListener('touchmove', handleAutoplay);
      window.removeEventListener('click', handleAutoplay);
      window.removeEventListener('keydown', handleAutoplay);
      window.removeEventListener('touchstart', handleAutoplay);
    };

    window.addEventListener('scroll', handleAutoplay, { passive: true });
    window.addEventListener('touchmove', handleAutoplay, { passive: true });
    window.addEventListener('click', handleAutoplay, { passive: true });
    window.addEventListener('keydown', handleAutoplay, { passive: true });
    window.addEventListener('touchstart', handleAutoplay, { passive: true });

    return () => {
      removeListeners();
    };
  }, []);

  const togglePlay = () => {
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.unMute();
        setIsMuted(false);
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    }
  };

  const handleMute = () => {
    if (playerRef.current && typeof playerRef.current.mute === 'function') {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
      playerRef.current.setVolume(val * 100);
      if (val === 0) {
        playerRef.current.mute();
        setIsMuted(true);
      } else {
        playerRef.current.unMute();
        setIsMuted(false);
      }
    }
  };

  return (
    <div className="glass-panel music-player-container" style={{
      position: 'fixed',
      bottom: '30px',
      left: '30px',
      zIndex: 999,
      padding: '12px 20px',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      width: 'max-content',
      maxWidth: '320px'
    }}>
      {/* Off-screen YouTube Player wrapper */}
      <div style={{ 
        position: 'fixed', 
        bottom: '-1000px', 
        right: '-1000px', 
        width: '200px', 
        height: '200px', 
        opacity: '0.001', 
        pointerEvents: 'none',
        zIndex: -1
      }}>
        <div id="yt-player-placeholder"></div>
      </div>

      {/* Music Icon & Dynamic Animation waves when playing */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Music size={18} style={{ color: 'var(--accent-secondary)' }} />
        
        {/* Equalizer animation bars */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '14px', width: '20px' }}>
          <div className={`bar ${isPlaying ? 'active' : ''}`} style={{ width: '3px', height: '60%', background: 'var(--accent-secondary)' }}></div>
          <div className={`bar ${isPlaying ? 'active-fast' : ''}`} style={{ width: '3px', height: '100%', background: 'var(--accent-primary)' }}></div>
          <div className={`bar ${isPlaying ? 'active' : ''}`} style={{ width: '3px', height: '40%', background: 'var(--accent-tertiary)' }}></div>
        </div>
      </div>

      {/* Text Info */}
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: '110px' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', display: 'block', lineHeight: '1.2' }}>
          Headlights
        </span>
        <span style={{ fontSize: '0.65rem', color: 'var(--text-dark)' }}>
          Alok & Alan Walker
        </span>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={togglePlay}
          style={{
            background: 'var(--grad-primary)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
            boxShadow: '0 0 10px rgba(6, 182, 212, 0.3)',
            transition: 'var(--transition-fast)'
          }}
          className="play-btn"
        >
          {isPlaying ? <Pause size={14} fill="#fff" /> : <Play size={14} fill="#fff" style={{ marginLeft: '2px' }} />}
        </button>

        <button
          onClick={handleMute}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          style={{
            width: '50px',
            accentColor: 'var(--accent-primary)',
            cursor: 'pointer',
            height: '4px'
          }}
        />
      </div>

      {/* Internal component animations */}
      <style>{`
        .play-btn:hover {
          transform: scale(1.1);
        }
        .bar {
          border-radius: 1px;
          transition: height 0.3s ease;
        }
        .bar.active {
          animation: dance 1.2s infinite ease-in-out alternate;
        }
        .bar.active-fast {
          animation: dance 0.8s infinite ease-in-out alternate;
        }
        @keyframes dance {
          0% { height: 20% }
          100% { height: 100% }
        }
      `}</style>
    </div>
  );
}
