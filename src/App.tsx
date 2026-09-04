/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { defaultSiteConfig } from './config/siteConfig';
import { SiteConfig, DatePlan } from './types';
import { FloatingHearts } from './components/FloatingHearts';
import { HeartCursor } from './components/HeartCursor';
import { ProgressIndicator } from './components/ProgressIndicator';
import { CustomizerModal } from './components/CustomizerModal';

// Scenes
import { IntroScene } from './scenes/IntroScene';
import { PersonalIntroScene } from './scenes/PersonalIntroScene';
import { ProposalScene } from './scenes/ProposalScene';
import { ReactionScene } from './scenes/ReactionScene';
import { MemoryScene } from './scenes/MemoryScene';
import { DateTimeScene } from './scenes/DateTimeScene';
import { LocationScene } from './scenes/LocationScene';
import { DateSummaryScene } from './scenes/DateSummaryScene';
import { ConfirmationScene } from './scenes/ConfirmationScene';
import { LoveLetterScene } from './scenes/LoveLetterScene';
import { FinalSurpriseScene } from './scenes/FinalSurpriseScene';

const STORAGE_KEYS = {
  SCENE: 'romantic_story_scene',
  PLAN: 'romantic_story_plan',
  CONFIG: 'romantic_story_config',
};

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Could not read saved config from localStorage', e);
      }
    }
    return defaultSiteConfig;
  });

  const [sceneIndex, setSceneIndex] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.SCENE);
        if (saved !== null) {
          const parsed = parseInt(saved, 10);
          if (!isNaN(parsed) && parsed >= 0 && parsed <= 10) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn('Could not read saved scene from localStorage', e);
      }
    }
    return 0;
  });

  const [datePlan, setDatePlan] = useState<DatePlan>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.PLAN);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Could not read saved plan from localStorage', e);
      }
    }
    // Default tomorrow date plan
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const isoString = tomorrow.toISOString().split('T')[0];
    const formatted = tomorrow.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    return {
      date: isoString,
      formattedDate: formatted,
      time: '7:00 PM',
      locationId: 'surprise',
      customLocation: '',
    };
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SCENE, sceneIndex.toString());
    } catch {}
  }, [sceneIndex]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(datePlan));
    } catch {}
  }, [datePlan]);

  const handleUpdatePlan = (partial: Partial<DatePlan>) => {
    setDatePlan((prev) => ({ ...prev, ...partial }));
  };

  const handleSaveConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(newConfig));
    } catch {}
  };

  const handleResetConfig = () => {
    setConfig(defaultSiteConfig);
    try {
      localStorage.removeItem(STORAGE_KEYS.CONFIG);
    } catch {}
  };

  const handleNextScene = () => {
    setSceneIndex((prev) => Math.min(prev + 1, 10));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevScene = () => {
    setSceneIndex((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setSceneIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDarkScene = sceneIndex === 7 || sceneIndex === 9;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden">
      {/* Ambient background particles & glowing gradients */}
      <FloatingHearts sceneIndex={sceneIndex} />

      {/* Desktop delicate heart sparkles cursor trail */}
      <HeartCursor />

      {/* Subtle top progress indicator & audio controls */}
      <ProgressIndicator
        currentIndex={sceneIndex}
        totalScenes={10}
        onBack={handlePrevScene}
        onRestart={handleRestart}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        isDarkScene={isDarkScene}
        herName={config.herName}
      />

      {/* Main Scene Presentation */}
      <main className="flex-1 flex flex-col justify-center items-center w-full z-10">
        <AnimatePresence mode="wait">
          {sceneIndex === 0 && (
            <IntroScene key="scene-0" config={config} onNext={handleNextScene} />
          )}
          {sceneIndex === 1 && (
            <PersonalIntroScene key="scene-1" config={config} onNext={handleNextScene} />
          )}
          {sceneIndex === 2 && (
            <ProposalScene key="scene-2" config={config} onAccept={handleNextScene} />
          )}
          {sceneIndex === 3 && (
            <ReactionScene key="scene-3" config={config} onNext={handleNextScene} />
          )}
          {sceneIndex === 4 && (
            <DateTimeScene
              key="scene-4"
              config={config}
              datePlan={datePlan}
              onUpdatePlan={handleUpdatePlan}
              onNext={handleNextScene}
            />
          )}
          {sceneIndex === 5 && (
            <LocationScene
              key="scene-5"
              config={config}
              datePlan={datePlan}
              onUpdatePlan={handleUpdatePlan}
              onNext={handleNextScene}
            />
          )}
          {sceneIndex === 6 && (
            <DateSummaryScene
              key="scene-6"
              config={config}
              datePlan={datePlan}
              onConfirm={handleNextScene}
              onChangeSomething={() => setSceneIndex(4)}
            />
          )}
          {sceneIndex === 7 && (
            <ConfirmationScene
              key="scene-7"
              config={config}
              datePlan={datePlan}
              onNext={handleNextScene}
            />
          )}
          {sceneIndex === 8 && (
            <LoveLetterScene key="scene-8" config={config} onNext={handleNextScene} />
          )}
          {sceneIndex === 9 && (
            <FinalSurpriseScene
              key="scene-9"
              config={config}
              datePlan={datePlan}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Clean Minimalism footer */}
      <footer className="relative z-20 px-6 sm:px-12 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-500">
        <div className="flex items-center gap-3 text-left">
          <div className={`w-2 h-2 rounded-full ${isDarkScene ? 'bg-[#E5989B]' : 'bg-[#6D071A]'}`} />
          <p
            className={`text-[11px] font-mono tracking-widest uppercase transition-colors duration-500 ${
              isDarkScene ? 'text-[#F5EFEB]/50' : 'text-[#B5838D]'
            }`}
          >
            {config.myName} & {config.herName} &bull; Forever & Always
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className={`w-24 sm:w-36 h-[1px] hidden sm:block ${isDarkScene ? 'bg-white/10' : 'bg-black/10'}`} />
          <div className="text-right">
            <p className={`text-[10px] uppercase tracking-widest font-bold ${isDarkScene ? 'text-white/40' : 'text-black/30'}`}>
              Interactive Experience
            </p>
            <p className={`text-[10px] ${isDarkScene ? 'text-white/30' : 'text-black/25'}`}>
              Built with love
            </p>
          </div>
        </div>
      </footer>

      {/* Real-time Customizer Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={config}
        onSave={handleSaveConfig}
        onReset={handleResetConfig}
      />
    </div>
  );
}
