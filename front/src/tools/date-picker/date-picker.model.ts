
export interface DatePickerConfig {
  init?: number | string,
  onValueChange?(date: number): void,
  onInit?(date: number): void,
  callbacks?: DatePickerUserConfig,
}

export interface DatePickerUserConfig {
  updateDate?(date: number | string | null): void,
}

export interface WeekDay {
  title: string,
  isWeekend?: boolean,
  value?: number,
  num?: number,
}

export interface CurrentTime {
  monthLines: WeekDay[][],
  year: number,
  day: number,
  month: number,
  ms: number,
}
