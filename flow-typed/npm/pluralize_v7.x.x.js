// flow-typed signature: 0144fd5abe2a545f003530467349097f
// flow-typed version: aaaed7a8d0/pluralize_v7.x.x/flow_>=v0.25.x

declare module "pluralize" {
  declare module.exports: {
    (word: string, count?: number, inclusive?: boolean): string,

    addIrregularRule(single: string, plural: string): void,
    addPluralRule(rule: string | RegExp, replacemant: string): void,
    addSingularRule(rule: string | RegExp, replacemant: string): void,
    addUncountableRule(ord: string | RegExp): void,
    plural(word: string): string,
    singular(word: string): string,
    isPlural(word: string): boolean,
    isSingular(word: string): boolean
  };
}
