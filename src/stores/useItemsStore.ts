import { defineStore } from 'pinia';
import type { IItem } from '@/types/Item/IItem.ts';
import type { ServerResponse } from '@/types/Item/type';

export const useItemsStore = defineStore('items', {
  state: () => ({
    item: {} as IItem, // товар
    counter: 0, // Счетчик
  }),
  persist: true,
  actions: {
    // Обновления товара
    updateItem(updated: Partial<IItem>): Promise<ServerResponse> {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (this.counter % 2 === 0) {
            this.item = { ...this.item, ...updated, counter: this.counter };
            this.item.amount = (this.item.price ?? 0) * (this.item.qty ?? 0); // пересчитываем сумму

            this.counter++;
            resolve({ success: true });
          } else {
            this.counter++;
            this.item = { ...this.item, counter: this.counter };
            resolve({ success: false });
          }
        }, 1000);
      });
    },
  },
});
