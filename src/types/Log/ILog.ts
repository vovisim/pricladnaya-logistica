import type { LogId } from '@/types/Log/type';

export interface ILog {
  id: LogId;
  type: 'inputChange' | 'submitPress' | 'hasResponse';
  title: string;
  content: string;
}
