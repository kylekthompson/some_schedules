export interface IInputProps extends React.ChangeTargetHTMLProps<HTMLInputElement> {
  asynchronousValidation?: (value: any) => Promise<string[]>;
  label?: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onValidation: (isValid: boolean) => void;
  serverErrors?: string[];
  synchronousValidation?: (value: any) => string[];
}

export interface IInputState {
  asyncValidationErrors: string[];
  isPristine: boolean;
  syncValidationErrors: string[];
}
