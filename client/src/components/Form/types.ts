export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  asynchronousValidation?: (value: any) => Promise<string[]>;
  label?: string;
  leftAddonItem?: React.ReactType;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onValidation: (isValid: boolean) => void;
  rightAddonItem?: React.ReactType;
  serverErrors?: string[];
  synchronousValidation?: (value: any) => string[];
}

export interface IInputState {
  asyncValidationErrors: string[];
  isPristine: boolean;
  isShowingServerErrors: boolean;
  syncValidationErrors: string[];
}
