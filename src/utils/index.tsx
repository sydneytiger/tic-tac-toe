export type ValueType = -1 | 0 | 1;

export const valueResolver = (value: ValueType) => value === -1 ? '❌' : value === 1 ? '⭕' : '';