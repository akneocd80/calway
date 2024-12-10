export interface PhysicsValues {
  [key: string]: number;
}

export type PhysicsFormula = (values: PhysicsValues) => number | undefined; 