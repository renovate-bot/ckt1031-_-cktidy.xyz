export function trim(text: string) {
  return text.trim();
}

type ClassArguments = (string | boolean | undefined | null)[];

export function classnames(...args: ClassArguments): string {
  return Array.prototype.slice
    .call(args)
    .reduce((prev, current) => prev.concat(current), [])
    .join(' ');
}
