import type { ILog } from '@/types/Log/ILog.ts';

export type LogId = number;

export interface LogCreatePayload extends Pick<ILog, 'type'> {
  info?: string;
}
