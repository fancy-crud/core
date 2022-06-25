import { Form } from '@/types';

export interface HandleRequestStatusCodes extends Record<number, (form: Form, data: any) => void> {}