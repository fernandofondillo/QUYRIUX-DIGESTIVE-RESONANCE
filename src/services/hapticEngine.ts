/**
 * Haptic Vibration Engine using Web Vibration API
 * Provides gentle, rhythmically synchronized tactile feedback for breathing, humming, and coherence.
 */

class HapticEngine {
  private enabled: boolean = true;

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'vibrate' in navigator;
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  public triggerPhase(phase: 'inhale' | 'holdIn' | 'exhale' | 'holdOut' | 'humming') {
    if (!this.enabled || !this.isSupported()) return;

    try {
      if (phase === 'inhale') {
        // Two short gentle pulses building up
        navigator.vibrate([40, 60, 60]);
      } else if (phase === 'exhale') {
        // Smooth long single gentle decay pulse
        navigator.vibrate([120]);
      } else if (phase === 'holdIn' || phase === 'holdOut') {
        // Very quick double tap
        navigator.vibrate([25, 40, 25]);
      } else if (phase === 'humming') {
        // Rhythmic continuous pulsing
        navigator.vibrate([100, 50, 100, 50, 100]);
      }
    } catch {
      // Ignore vibration permissions errors on non-mobile devices
    }
  }

  public triggerSuccess() {
    if (!this.enabled || !this.isSupported()) return;
    try {
      navigator.vibrate([60, 80, 100, 80, 140]);
    } catch {}
  }

  public stop() {
    if (this.isSupported()) {
      try {
        navigator.vibrate(0);
      } catch {}
    }
  }
}

export const hapticEngine = new HapticEngine();
