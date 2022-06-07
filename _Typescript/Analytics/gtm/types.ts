import { YouTubePlayer } from 'youtube-player/dist/types';

type ComponentEvent = {
  action?: string;
  category: string;
  label?: string;
  guid?: string;
  event?: string;
  page?: string;
};

type FormEvent = {
  errorMessage?: string;
  returnCode?: string;
  formName?: string;
  heading?: string;
  guid?: string;
  stepIndex?: number;
  stepName?: string;
  subhead?: string;
};

type NavEvent = {
  event?: 'send-page';
  page: string;
  jurisdiction?: string;
  segment?: string;
};

type VideoEvent = {
  id: string;
  target: YouTubePlayer;
  videoType?: 'multi' | 'modal';
  page?: string;
};

type VpvData = {
  guid?: string;
  pageTitle: string;
  stepName?: string;
  stepIndex?: number;
};

export type { ComponentEvent, FormEvent, NavEvent, VideoEvent, VpvData };
