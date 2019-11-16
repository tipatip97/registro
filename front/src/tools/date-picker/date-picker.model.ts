
export interface DatePickerConfig {
  init?: number | string,
  onValueChange?(date: number): void,
}

export interface WeekDay {
  title: string,
  isWeekend?: boolean,
  value?: number,
  num?: number,
}
