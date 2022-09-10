type BaseArugmentType =
  | BaseArugmentType[]
  | string
  | number
  | boolean
  | undefined
  | null;

type ClassArguments = (BaseArugmentType | BaseArugmentType[])[];

export default function classnames(...args: ClassArguments) {
  return args.flat().filter(Boolean).join(' ');
}
