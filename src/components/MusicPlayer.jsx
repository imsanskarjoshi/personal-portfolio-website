import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef(null);
  const hasInteractedRef = useRef(false);

  // Sync initial volume and mute settings
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, []);

  // Handle autoplay on user interaction (scroll, click, touch, keydown)
  useEffect(() => {
    const handleInteraction = () => {
      if (hasInteractedRef.current) return;
      hasInteractedRef.current = true;

      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log("Autoplay was blocked by the browser. Play manually.", err);
          });
      }

      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchmove', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('scroll', handleInteraction, { passive: true });
    window.addEventListener('touchmove', handleInteraction, { passive: true });
    window.addEventListener('click', handleInteraction, { passive: true });
    window.addEventListener('keydown', handleInteraction, { passive: true });

    return () => {
      removeListeners();
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.error("Playback failed:", err);
          });
      }
    }
  };

  const handleMute = () => {
    if (audioRef.current) {
      const nextMuteState = !isMuted;
      audioRef.current.muted = nextMuteState;
      setIsMuted(nextMuteState);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      audioRef.current.muted = val === 0;
      setIsMuted(val === 0);
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
      {/* Hidden local audio tag */}
      <audio
        ref={audioRef}
        src="/headlights.m4a"
        loop
      />

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
