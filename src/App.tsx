import React, { useState, useEffect } from 'react';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { HeaderNavbar } from './components/HeaderNavbar';
import { SidebarNav, NavTab } from './components/SidebarNav';
import { DashboardView } from './components/DashboardView';
import { CheckInModal } from './components/CheckInModal';
import { BreathingSessionView } from './components/BreathingSessionView';
import { HummingSessionView } from './components/HummingSessionView';
import { SoundscapeMixerView } from './components/SoundscapeMixerView';
import { PureToneGeneratorView } from './components/PureToneGeneratorView';
import { HapticEngineView } from './components/HapticEngineView';
import { GuidedProtocolsView } from './components/GuidedProtocolsView';
import { DigestiveHabitsView } from './components/DigestiveHabitsView';
import { SymptomAnalyticsView } from './components/SymptomAnalyticsView';
import { EducationCenterView } from './components/EducationCenterView';
import { AiCoachView } from './components/AiCoachView';
import { RoutinePlannerView } from './components/RoutinePlannerView';
import { RemindersView } from './components/RemindersView';
import { ProgressExportView } from './components/ProgressExportView';
import { SettingsModal } from './components/SettingsModal';

import { storageService } from './services/storageService';
import { ruleEngine } from './services/ruleEngine';
import { UserProfile, CheckInLog, SessionRecord, SymptomRating } from './types';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => storageService.getProfile());
  const [checkIns, setCheckIns] = useState<CheckInLog[]>(() => storageService.getCheckIns());
  const [sessions, setSessions] = useState<SessionRecord[]>(() => storageService.getSessions());

  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isCheckInOpen, setIsCheckInOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Compute Rule Engine outputs dynamically
  const habits = storageService.getHabits();
  const vagalScore = ruleEngine.computeVagalScore(checkIns, habits);
  const recommended = ruleEngine.getRecommendedProtocols(checkIns);

  const handleUpdateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    storageService.saveProfile(newProfile);
  };

  const handleCheckInSubmit = (ratings: SymptomRating, timeOfDay: CheckInLog['timeOfDay']) => {
    const newLog = storageService.addCheckIn(ratings, timeOfDay);
    setCheckIns(prev => [newLog, ...prev]);
  };

  const handleSessionComplete = (protocolName: string, durationSeconds: number) => {
    const newSession = storageService.addSession({
      type: 'breathing',
      protocolName,
      durationSeconds
    });
    setSessions(prev => [newSession, ...prev]);
    setProfile(storageService.getProfile());
  };

  return (
    <div
      className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-slate-950 ${
        profile.highContrast ? 'contrast-125 border-4 border-white' : ''
      } ${profile.largeText ? 'text-lg' : 'text-sm'}`}
    >
      {/* Permanent Medical Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Primary Header */}
      <HeaderNavbar
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        onOpenCheckIn={() => setIsCheckInOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        vagalScore={vagalScore.score}
      />

      {/* Main Container Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col lg:flex-row my-2 sm:my-4 px-2 sm:px-4 gap-4">
        {/* Sidebar Nav */}
        <SidebarNav activeTab={activeTab} onSelectTab={(tab) => setActiveTab(tab)} />

        {/* View Content Area */}
        <main className="flex-1 bg-slate-950 min-w-0 pb-12">
          {activeTab === 'dashboard' && (
            <DashboardView
              profile={profile}
              vagalScore={vagalScore}
              recommended={recommended}
              checkIns={checkIns}
              onOpenCheckIn={() => setIsCheckInOpen(true)}
              onNavigateTab={(t) => setActiveTab(t)}
              onStartProtocol={(id) => setActiveTab('protocolos')}
            />
          )}

          {activeTab === 'checkin' && (
            <SymptomAnalyticsView
              checkIns={checkIns}
              onOpenCheckIn={() => setIsCheckInOpen(true)}
            />
          )}

          {activeTab === 'respiracion' && (
            <BreathingSessionView
              onSessionComplete={handleSessionComplete}
              hapticsEnabled={profile.hapticsEnabled}
              soundVolume={profile.soundVolume}
            />
          )}

          {activeTab === 'tarareo' && (
            <HummingSessionView
              onSessionComplete={handleSessionComplete}
              soundVolume={profile.soundVolume}
              hapticsEnabled={profile.hapticsEnabled}
            />
          )}

          {activeTab === 'sonidos' && <SoundscapeMixerView />}

          {activeTab === 'tonos' && <PureToneGeneratorView />}

          {activeTab === 'haptica' && <HapticEngineView />}

          {activeTab === 'protocolos' && (
            <GuidedProtocolsView
              onSessionComplete={handleSessionComplete}
              soundVolume={profile.soundVolume}
              hapticsEnabled={profile.hapticsEnabled}
            />
          )}

          {activeTab === 'habitos' && <DigestiveHabitsView />}

          {activeTab === 'sintomas' && (
            <SymptomAnalyticsView
              checkIns={checkIns}
              onOpenCheckIn={() => setIsCheckInOpen(true)}
            />
          )}

          {activeTab === 'educacion' && <EducationCenterView />}

          {activeTab === 'coach' && (
            <AiCoachView
              checkIns={checkIns}
              profile={profile}
              onNavigateTab={(t) => setActiveTab(t)}
            />
          )}

          {activeTab === 'rutinas' && (
            <RoutinePlannerView
              checkIns={checkIns}
              onNavigateTab={(t) => setActiveTab(t)}
            />
          )}

          {activeTab === 'recordatorios' && <RemindersView />}

          {activeTab === 'progreso' && (
            <ProgressExportView profile={profile} sessions={sessions} />
          )}
        </main>
      </div>

      {/* Modals */}
      <CheckInModal
        isOpen={isCheckInOpen}
        onClose={() => setIsCheckInOpen(false)}
        onSubmit={handleCheckInSubmit}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        profile={profile}
        onSaveProfile={handleUpdateProfile}
      />
    </div>
  );
}
