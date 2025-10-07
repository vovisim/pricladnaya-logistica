import { defineStore } from 'pinia';
import type { ILog } from '@/types/Log/ILog.ts';
import type { ServerResponse } from '@/types/Item/type';
import type { LogCreatePayload } from '@/types/Log/type';

export const useLogStore = defineStore('logs', {
  state: () => ({
    logs: [] as ILog[],
    id: 0,
  }),
  persist: true,
  actions: {
    // создание лога
    createLog(log: LogCreatePayload): ServerResponse {
      // генерация нужного сообщения
      const generateLog = (log: LogCreatePayload): ILog => {
        switch (log.type) {
          case 'inputChange':
            return {
              type: log.type,
              id: this.id,
              title: `Изменно поле`,
              content: `Вы изменили поле ${log.info}`,
            };
          case 'submitPress':
            return {
              type: log.type,
              id: this.id,
              title: `Вы нажали на кнопку`,
              content: `Вы нажали на кнопку ${log.info}`,
            };
          case 'hasResponse':
            return {
              type: log.type,
              id: this.id,
              title: `Отправка на сервер.`,
              content: `${log.info}`,
            };
        }
      };

      this.logs.unshift(generateLog(log));
      this.id++;
      return { success: true };
    },
    clearLogs() {
      this.logs = [] as ILog[];
    },
  },
});
