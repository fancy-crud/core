import { HandleRequestStatusCodes } from '@/types';
import { ButtonHTMLAttributes, InputHTMLAttributes } from 'vue';

export enum FormModes {
  CREATE_MODE,
  UPDATE_MODE
}

export interface Button extends ButtonHTMLAttributes {
  label?: { create?: string; update?: string};
  loading?: boolean;
  icon?: string;
  onClick?: (payload?: MouseEvent) => void
}

export interface Buttons {
  main?: Button;
  aux?: Button;
}

export interface NormalizedButtons extends Required<Buttons> {}

export interface FieldStructure extends InputHTMLAttributes {
  label?: string;
  multiple?: boolean;
  valueString?: string | null;
  url?: string;
  showPassword?: boolean;
  optionLabel?: string;
  optionValue?: string;
  modelKey?: string;
  modelValue?: unknown;
  chips?: boolean;
  fileUrl?: string;
  wrapClass?: string;
  class?: string;
  wrapCols?: string;
  type?: string;
  errors?: string[];
  filterParams?: unknown;
  options?: any[];
  ref?: unknown;
  createOnly?: boolean;
  updateOnly?: boolean;
  hidden?: boolean;
  hintText?: string;
  bounceTime?: number;
  table?: {
    label?: string;
    value?: string;
    field?: (row: unknown, index: number) => unknown;
    format?: (value: unknown) => unknown;
    exclude?: boolean
    allowCheckbox?: boolean
    allowImagePreview?: boolean,
  };
  xlsx?: Record<string, unknown>
  // [key: string]: unknown;
}

export interface NormalizedFieldStructure extends FieldStructure {
  name: string;
  type: string;
  class: string;
  modelKey: string;
  modelValue: unknown;
  ref: any;
  // RenderField: any;
  errors: string[];
  rules: Array<(value: any) => string | boolean> | never[];
  onInput?: (e: Event) => void
}

export interface Actions {
  [k: string]: {
    onInput?: null | ((field: NormalizedFieldStructure) => (e: Event) => void);
    onChange?: null | ((field: NormalizedFieldStructure) => (e: Event) => void);
    onFocus?: null | ((field: NormalizedFieldStructure) => (e: Event) => void);
  }
}

export interface Fields extends Record<string, FieldStructure>{}

export interface NormalizedFields extends Record<string, NormalizedFieldStructure> {}

export interface Title {
  create?: string;
  update?: string;
}

export interface Settings {
  url: string;
  buttons?: Buttons;
  mode?: FormModes;
  title?: string | Title
  lookupField?: string
  isValid?: boolean
  statusCodesHandlers?: Record<number, HandleRequestStatusCodes>
}

export interface NormalizedSettings extends Settings {
  url: string
  buttons: Required<Buttons>
  mode: FormModes
  title: string | Title
  lookupField: string
  statusCodesHandlers: Record<number, HandleRequestStatusCodes>
}

export interface FieldWatcher {
  value: unknown;
  oldValue: unknown;
}

export interface IFormRecord extends Record<string, any>{}

export interface Form {
  id: string;
  fields: NormalizedFields;
  settings: NormalizedSettings;
  generalErrors?: string[];
  record?: IFormRecord;
}
export interface CreateForm {
  id: string;
  fields: Fields;
  settings: Settings;
  record?: IFormRecord;
}
