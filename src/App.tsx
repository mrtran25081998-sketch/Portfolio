import React, { useState, useEffect, useCallback } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { HUD } from './components/HUD';
import { StartScreen } from './components/StartScreen';
import { MobileControls } from './components/MobileControls';
import { AboutModal } from './components/Modals/AboutModal';
import { ExperienceModal } from './components/Modals/ExperienceModal';
import { MyWorkModal } from './components/Modals/MyWorkModal';
import { MyCVModal } from './components/Modals/MyCVModal';
import { ExploreModal } from './components/Modals/ExploreModal';
import { ContactModal } from './components/Modals/ContactModal';
import { CelebrationModal } from './components/Modals/CelebrationModal';
import { HelpModal } from './components/Modals/HelpModal';
import { ZoneId } from './types';
import { soundManager } from './audio/soundManager';
import { projectsData } from './data/portfolioData';

const LOCAL_STORAGE_KEY = 'voxel_portfolio_explored_v3';

export const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<ZoneId | null>(null);
  const [nearZone, setNearZone] = useState<ZoneId | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [hasCelebrated, setHasCelebrated] = useState<boolean>(false);
  const [fireworksSignal, setFireworksSignal] = useState<number>(0);
  const [currentProjectTitle, setCurrentProjectTitle] = useState<string>(projectsData[0].title);

  // Exploration progress tracking
  const [exploredZones, setExploredZones] = useState<Record<string, boolean>>({
    about: false,
    work: false,
    experience: false,
    explore: false,
    contact: false
  });

  // Mobile virtual touch controls state
  const [mobileInput, setMobileInput] = useState({
    moveX: 0,
    moveY: 0,
    isRunning: false,
    isJumping: false,
    isInteracting: false
  });

  // Load progress from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setExploredZones((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
  }, []);

  // Save progress to LocalStorage
  const markZoneExplored = useCallback((zoneId: ZoneId) => {
    setExploredZones((prev) => {
      if (prev[zoneId]) return prev;
      const updated = { ...prev, [zoneId]: true };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not save to localStorage', e);
      }

      // Check if all 5 are newly completed
      const allExplored = Object.values(updated).every(Boolean);
      if (allExplored && !hasCelebrated) {
        setHasCelebrated(true);
        setTimeout(() => {
          setShowCelebration(true);
          setFireworksSignal((sig) => sig + 1);
        }, 800);
      }

      return updated;
    });
  }, [hasCelebrated]);

  // Open modal for a zone
  const handleOpenZone = useCallback((zoneId: ZoneId) => {
    setActiveModal(zoneId);
    markZoneExplored(zoneId);
  }, [markZoneExplored]);

  // Close modal
  const handleCloseModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  // Global ESC key listener to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeModal) {
          handleCloseModal();
        } else if (showHelp) {
          setShowHelp(false);
        } else if (showCelebration) {
          setShowCelebration(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, showHelp, showCelebration, handleCloseModal]);

  // Start the game from the intro screen
  const handleStartGame = () => {
    setGameStarted(true);
  };

  // Toggle audio
  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  // Mobile movement callbacks
  const handleMobileMove = (x: number, y: number) => {
    setMobileInput((prev) => ({ ...prev, moveX: x, moveY: y }));
  };

  const handleMobileRunChange = (isRunning: boolean) => {
    setMobileInput((prev) => ({ ...prev, isRunning }));
  };

  const handleMobileJump = () => {
    setMobileInput((prev) => ({ ...prev, isJumping: true }));
    setTimeout(() => {
      setMobileInput((prev) => ({ ...prev, isJumping: false }));
    }, 150);
  };

  const handleMobileInteract = () => {
    setMobileInput((prev) => ({ ...prev, isInteracting: true }));
    setTimeout(() => {
      setMobileInput((prev) => ({ ...prev, isInteracting: false }));
    }, 150);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans select-none">
      {/* 3D WebGL Canvas Layer */}
      <GameCanvas
        gameStarted={gameStarted}
        activeModal={activeModal}
        exploredZones={exploredZones}
        onOpenZone={handleOpenZone}
        onNearZoneChange={setNearZone}
        mobileInput={mobileInput}
        currentProjectTitle={currentProjectTitle}
        triggerFireworksSignal={fireworksSignal}
      />

      {/* Start Screen Overlay */}
      {!gameStarted && <StartScreen onStart={handleStartGame} />}

      {/* In-Game HUD Overlay */}
      {gameStarted && (
        <>
          <HUD
            nearZone={nearZone}
            exploredZones={exploredZones}
            onOpenZone={handleOpenZone}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onShowHelp={() => setShowHelp(true)}
          />

          {/* Virtual Touch Joystick & Action Buttons for Mobile / Tablet */}
          <MobileControls
            onMove={handleMobileMove}
            onRunChange={handleMobileRunChange}
            onJump={handleMobileJump}
            onInteract={handleMobileInteract}
            isNearZone={!!nearZone}
          />
        </>
      )}

      {/* Zone Interactive Content Modals */}
      {activeModal === 'about' && (
        <AboutModal
          onClose={handleCloseModal}
          onGoToContact={() => handleOpenZone('contact')}
          onOpenCV={() => markZoneExplored('explore')}
        />
      )}

      {activeModal === 'experience' && (
        <ExperienceModal onClose={handleCloseModal} />
      )}

      {activeModal === 'work' && (
        <MyWorkModal
          onClose={handleCloseModal}
          onProjectChange={setCurrentProjectTitle}
        />
      )}

      {activeModal === 'explore' && (
        <ExploreModal
          onClose={handleCloseModal}
          onGoToContact={() => handleOpenZone('contact')}
        />
      )}

      {(activeModal === 'cv' || activeModal === 'cx') && (
        <MyCVModal
          onClose={handleCloseModal}
          onGoToContact={() => handleOpenZone('contact')}
        />
      )}

      {activeModal === 'contact' && (
        <ContactModal onClose={handleCloseModal} />
      )}

      {/* 5/5 Full Journey Completed Celebration Modal */}
      {showCelebration && (
        <CelebrationModal
          onClose={() => setShowCelebration(false)}
          onGoToContact={() => {
            setShowCelebration(false);
            handleOpenZone('contact');
          }}
        />
      )}

      {/* Controls & Features Guide Modal */}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </main>
  );
};

export default App;
