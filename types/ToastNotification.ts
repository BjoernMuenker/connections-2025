export interface ToastNotification {
  id: string;
  text: string;
  score?: number;
  type: 'info' | 'error' | 'success' | 'score';
}
