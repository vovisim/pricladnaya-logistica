import { defineStore } from "pinia";
import type { IItem } from '@/types/IItem.ts'

export const useItemsStore = defineStore('items', {
  state: () => ({
    item: {} as IItem,
  }),
  persist: true,
  actions: {
    updateItem(updated: Partial<IItem>) {
      this.item = { ...this.item, ...updated };
      this.item.amount = this.item.price * this.item.qty;
    }
  }
});
