
export interface DatePickerConfig {
  init?: number | string,
  onValueChange?(ts: number): void,
  onCandidateChange?(ts: number): void,
  onBlur?(ts: number): void,
  onInit?(ts: number): void,
  callbacks?: DatePickerUserConfig,
}

export interface DatePickerUserConfig {
  updateDate?(date: number | string | null): void,
  focus?(): void,
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
  ts: number,
}
