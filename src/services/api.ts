import { LOJAS, addLoja } from '../data/mockData';
import { Loja } from '../@types/loja';

export const LojaService = {
  getLojas: async (): Promise<Loja[]> => {
    // Simula uma chamada de API
    return new Promise((resolve) => {
      setTimeout(() => resolve(LOJAS), 1000);
    });
  },

  createLoja: async (loja: Loja): Promise<Loja> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        addLoja(loja);
        resolve(loja);
      }, 500);
    });
  }
};

