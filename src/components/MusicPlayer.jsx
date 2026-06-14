import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

const videoIds = ['F1S-r5vC2xI', 'ovpDU1thF94', 'p4vW7Gg5sZc'];
const AAC_FALLBACK_URL = 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/69/b9/6e/69b96ef3-4357-3899-44d8-74a944c02715/mzaf_15178080055496793205.plus.aac.p.m4a';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [useHTML5, setUseHTML5] = useState(false);
  
  const playerRef = useRef(null);
  const audioRef = useRef(null);
  const hasScrolledRef = useRef(false);
  const videoIndexRef = useRef(0);
  const ytReadyRef = useRef(false);

  // Initialize YouTube Player
  useEffect(() => {
    let ytTimeout = setTimeout(() => {
      if (!ytReadyRef.current) {
        console.warn("YouTube API initialization timed out. Switching to HTML5 Audio fallback.");
        setUseHTML5(true);
      }
    }, 4000); // 4-second timeout to load YT

    const initPlayer = () => {
      if (playerRef.current) return;
      
      try {
        playerRef.current = new window.YT.Player('yt-player-placeholder', {
          height: '200',
          width: '200',
          videoId: videoIds[videoIndexRef.current],
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            loop: 1,
            playlist: videoIds[videoIndexRef.current],
            modestbranding: 1,
            rel: 0,
            origin: window.location.origin // Crucial for hosted/production environments
          },
          events: {
            onReady: (event) => {
              clearTimeout(ytTimeout);
              ytReadyRef.current = true;
              event.target.setVolume(volume * 100);
              if (isMuted) {
                event.target.mute();
              } else {
                event.target.unMute();
              }
              if (hasScrolledRef.current) {
                event.target.playVideo();
                setIsPlaying(true);
              }
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
                setIsPlaying(false);
              }
            },
            onError: (event) => {
              console.warn(`YouTube Player error ${event.data} on video ID ${videoIds[videoIndexRef.current]}.`);
              if (videoIndexRef.current < videoIds.length - 1) {
                videoIndexRef.current += 1;
                const nextVideoId = videoIds[videoIndexRef.current];
                if (playerRef.current && typeof playerRef.current.loadVideoById === 'function') {
                  playerRef.current.loadVideoById({
                    videoId: nextVideoId,
                    startSeconds: 0
                  });
                  playerRef.current.playVideo();
                  setIsPlaying(true);
                }
              } else {
                console.warn("All YouTube video fallbacks failed. Switching to HTML5 Audio fallback.");
                setUseHTML5(true);
              }
            }
          }
        });
      } catch (err) {
        console.error("Failed to initialize YT Player", err);
        setUseHTML5(true);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (previousCallback) previousCallback();
        initPlayer();
      };

      const hasScript = Array.from(document.getElementsByTagName('script')).some(
        script => script.src === 'https://www.youtube.com/iframe_api'
      );
      if (!hasScript) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }

    return () => clearTimeout(ytTimeout);
  }, []);

  // Handle HTML5 fallback source initialization/volume
  useEffect(() => {
    if (useHTML5 && audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      if (isPlaying || hasScrolledRef.current) {
        audioRef.current.play().catch(err => {
          console.log("HTML5 Autoplay prevented. Click play manually.");
        });
      }
    }
  }, [useHTML5]);

  // Trigger play on scroll or click interaction
  useEffect(() => {
    const handleAutoplay = () => {
      hasScrolledRef.current = true;
      
      if (useHTML5) {
        if (audioRef.current) {
          audioRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        }
      } else {
        if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
          playerRef.current.playVideo();
          setIsPlaying(true);
        }
      }
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener('scroll', handleAutoplay);
      window.removeEventListener('touchmove', handleAutoplay);
      window.removeEventListener('click', handleAutoplay);
      window.removeEventListener('keydown', handleAutoplay);
    };

    window.addEventListener('scroll', handleAutoplay, { passive: true });
    window.addEventListener('touchmove', handleAutoplay, { passive: true });
    window.addEventListener('click', handleAutoplay, { passive: true });
    window.addEventListener('keydown', handleAutoplay, { passive: true });

    return () => {
      removeListeners();
    };
  }, [useHTML5]);

  const togglePlay = () => {
    if (useHTML5) {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        }
      }
    } else {
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
    }
  };

  const handleMute = () => {
    const nextMuteState = !isMuted;
    setIsMuted(nextMuteState);

    if (useHTML5) {
      if (audioRef.current) {
        audioRef.current.muted = nextMuteState;
      }
    } else {
      if (playerRef.current && typeof playerRef.current.mute === 'function') {
        if (nextMuteState) {
          playerRef.current.mute();
        } else {
          playerRef.current.unMute();
        }
      }
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);

    if (useHTML5) {
      if (audioRef.current) {
        audioRef.current.volume = val;
        audioRef.current.muted = val === 0;
        setIsMuted(val === 0);
      }
    } else {
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
      {/* Hidden Fallback HTML5 Audio Tag */}
      {useHTML5 && (
        <audio
          ref={audioRef}
          src={AAC_FALLBACK_URL}
          loop
          style={{ display: 'none' }}
        />
      )}

      {/* Off-screen YouTube Player wrapper */}
      {!useHTML5 && (
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
      )}

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
          Headlights {useHTML5 && "(AAC)"}
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
