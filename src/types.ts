import { Loja } from './@types/loja';

export type RootStackParamList = {
  Home: undefined;
  CadastrarLoja: undefined;
  Detalhes: { loja: Loja };
};

