// Record<string, Aдрес сраницы , number позичия скрола
export type Scroll = Record<string, number>;

export interface SaveScrollSchema {
  scroll: Scroll;
}
