import type { Theme, ThemeOptions } from '@mui/material/styles';

export type NovahMode = 'light' | 'dark';

/** Opções de tema do Constela (objeto puro). */
export declare function getNovahThemeOptions(mode?: NovahMode): ThemeOptions;

/** Tema do Material UI com os tokens do Constela. `overrides` é mesclado por cima. */
export declare function createNovahTheme(mode?: NovahMode, overrides?: ThemeOptions): Theme;

/** Cores resolvidas do tema (hexadecimal ou rgba), indexadas pelo nome do token. */
export declare function novahColors(mode?: NovahMode): Record<string, string>;

export default createNovahTheme;
