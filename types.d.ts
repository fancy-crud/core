declare module "src/forms/axioma/constants/form" {
    export const DEFAULT_LOOKUP_FIELD = "id";
    export enum FormModes {
        CREATE_MODE = 0,
        UPDATE_MODE = 1
    }
}
declare module "src/forms/axioma/constants/index" {
    export * from "src/forms/axioma/constants/form";
}
declare module "src/forms/axioma/typing/buttons" {
    export type EventHandlers<E = {}> = {
        [K in keyof E]?: E[K] extends (...args: any) => any ? E[K] : (payload?: E[K]) => void;
    };
    export interface ButtonEvent {
        onClick: MouseEvent;
        onDblclick: MouseEvent;
        onMousedown: MouseEvent;
        onMousemove: MouseEvent;
        onMouseup: MouseEvent;
        onMouseover: MouseEvent;
        onMouseout: MouseEvent;
        onMouseenter: MouseEvent;
        onMouseleave: MouseEvent;
        onSubmit: Event;
        onChange: Event;
        onFocus: FocusEvent;
        onBlur: FocusEvent;
        onInput: InputEvent;
        onDrag: DragEvent;
        onDrop: DragEvent;
    }
    export interface RawButton extends EventHandlers<Partial<ButtonEvent>> {
        label?: {
            create?: string;
            update?: string;
        };
        isLoading?: boolean;
        icon?: string;
        class?: string;
        isDisabled?: boolean;
    }
    export interface NormalizedButton extends RawButton, EventHandlers<Partial<ButtonEvent>> {
        label: {
            create: string;
            update: string;
        };
        isLoading: boolean;
        icon: string;
        class: string;
    }
    export type ButtonType = 'main' | 'aux';
    export type NormalizedButtons<T> = T & Record<string, NormalizedButton>;
    export interface ObjectWithRawButtons extends Record<string, RawButton> {
    }
    export interface ObjectWithNormalizedButtons extends Record<string, NormalizedButton> {
    }
}
declare module "src/forms/axioma/typing/settings" {
    import type { FormModes } from "src/forms/axioma/constants/index";
    export interface RawSetting {
        url?: string;
        lookupField?: string;
        lookupValue?: string;
        mode?: FormModes;
        disableResponseHandlers?: boolean;
        disableNotifications?: boolean;
    }
    export interface NormalizedSettings extends RawSetting {
        mode: FormModes;
        url: string;
        lookupField: string;
    }
}
declare module "src/forms/axioma/typing/titles" {
    export interface RawTitle {
        create?: string;
        update?: string;
    }
    export interface NormalizedTitles extends Required<RawTitle> {
    }
}
declare module "src/forms/axioma/typing/form" {
    import type { NormalizedButtons, ObjectWithNormalizedButtons } from "src/forms/axioma/typing/buttons";
    import type { NormalizedSettings } from "src/forms/axioma/typing/settings";
    import type { NormalizedTitles } from "src/forms/axioma/typing/titles";
    export enum FieldType {
        text = "text",
        password = "password",
        color = "color",
        textarea = "textarea",
        radio = "radio",
        checkbox = "checkbox",
        select = "select",
        file = "file",
        datepicker = "datepicker"
    }
    export interface BaseRawField extends Record<string, any> {
        type: string | FieldType;
        wrapper?: Record<string, unknown>;
        class?: string;
        label?: string;
        errors?: string[];
        createOnly?: boolean;
        updateOnly?: boolean;
        hidden?: boolean;
        hintText?: string;
        rules?: any;
        bounceTime?: number;
        modelKey?: string;
        modelValue?: unknown;
    }
    export interface RawTextField extends BaseRawField {
        type: FieldType.text;
    }
    export interface RawPasswordField extends BaseRawField {
        type: FieldType.password;
        showPassword?: boolean;
    }
    export interface RawColorField extends BaseRawField {
        type: FieldType.color;
    }
    export interface RawTextareaField extends BaseRawField {
        type: FieldType.textarea;
    }
    export interface RawRadioField extends BaseRawField {
        type: FieldType.radio;
        inRow?: boolean;
        optionLabel?: string;
        optionValue?: string;
        options?: any[];
    }
    export interface RawCheckboxField extends BaseRawField {
        type: FieldType.checkbox;
        inRow?: boolean;
        optionLabel?: string;
        optionValue?: string;
        options?: any[];
        multiple?: boolean;
    }
    export interface RawSelectField extends BaseRawField {
        type: FieldType.select;
        clearable?: boolean;
        multiple?: boolean;
        optionLabel?: string;
        optionValue?: string;
        options?: any[];
        url?: string;
        filterParams?: Record<string, unknown>;
    }
    export interface File {
        name: string;
    }
    export interface RawFileField extends BaseRawField {
        type: FieldType.file;
        fileUrl?: string;
        modelValue: File | File[] | null;
    }
    export interface RawDatepickerField extends BaseRawField {
        type: FieldType.datepicker;
    }
    export type RawField = BaseRawField | RawTextField | RawPasswordField | RawColorField | RawTextareaField | RawRadioField | RawCheckboxField | RawSelectField | RawFileField | RawDatepickerField;
    export interface DefaultAttributes {
        name: string;
        class: string;
        modelKey: string;
        modelValue: unknown;
        ref: any;
        errors: string[];
    }
    export type FieldNormalizer<T> = T & DefaultAttributes;
    export type NormalizedField = FieldNormalizer<RawField>;
    export type NormalizedTextField = FieldNormalizer<RawTextField>;
    export type NormalizedColorField = FieldNormalizer<RawColorField>;
    export type NormalizedPasswordField = FieldNormalizer<RawPasswordField>;
    export type NormalizedTextareaField = FieldNormalizer<RawTextareaField>;
    export type NormalizedRadioField = FieldNormalizer<RawRadioField>;
    export type NormalizedCheckboxField = FieldNormalizer<RawCheckboxField>;
    export type NormalizedSelectField = FieldNormalizer<RawSelectField>;
    export type NormalizedFileField = FieldNormalizer<RawFileField>;
    export type NormalizedDatepickerField = FieldNormalizer<RawDatepickerField>;
    export type NormalizedFields<T> = {
        [K in keyof T]: NormalizedField & T[K];
    };
    export interface Form<T, U> {
        originalNormalizedFields: NormalizedFields<T>;
        clonedNormalizedFields: NormalizedFields<T>;
        normalizedButtons: NormalizedButtons<U>;
        normalizedTitles: NormalizedTitles;
        normalizedSettings: NormalizedSettings;
    }
    export interface ObjectWithRawFields extends Record<string, RawField> {
    }
    export interface ObjectWithNormalizedFields extends Record<string, NormalizedField> {
    }
    export interface FieldErrors extends Record<string, string[]> {
    }
    export enum NotificationType {
        success = "success",
        warning = "warning",
        error = "error",
        info = "info",
        default = "default"
    }
    export interface Notification {
        type: NotificationType;
        message?: string;
        data?: any;
    }
    export interface NotificationMap extends Partial<Record<NotificationType, (notification?: Notification) => void>> {
    }
    export type Handler = (response: any) => void;
    export interface ResponseMap extends Record<number, Handler> {
    }
    export interface FormMap {
        originalNormalizedFields: ObjectWithNormalizedFields;
        fields: ObjectWithNormalizedFields;
        titles: NormalizedTitles;
        settings: NormalizedSettings;
        buttons: ObjectWithNormalizedButtons;
    }
    export interface ResponseManager {
        removeResponseHandlers: () => void;
        setResponseHandler: (codes: ResponseMap) => void;
        getResponseHandler: (code: number) => Handler | null;
    }
    export interface NotificationManager {
        setNotificationHandler: (handler: NotificationMap) => void;
        pushNotification: (notification: Notification) => void;
        removeNotificationHandlers: () => void;
    }
    export interface FormManager {
        readonly responseManager: ResponseManager;
        readonly notificationManager: NotificationManager;
        fillWithRecordValues: (record: Record<string, unknown>) => void;
        getForeignKeyValues: (fields?: ObjectWithNormalizedFields) => void;
        resetFields: () => void;
        removeForm: () => void;
        addForm: (form: FormMap) => void;
        getFormData: (fields?: ObjectWithNormalizedFields) => {
            jsonForm: Record<string, unknown>;
            formData: FormData | null;
        };
        getForm: () => FormMap;
        setErrors: (errors: FieldErrors) => void;
        switchToCreateMode: () => void;
        switchToUpdateMode: () => void;
    }
}
declare module "src/forms/axioma/typing/index" {
    export * from "src/forms/axioma/typing/form";
    export * from "src/forms/axioma/typing/buttons";
    export * from "src/forms/axioma/typing/titles";
    export * from "src/forms/axioma/typing/settings";
}
declare module "src/forms/axioma/index" {
    export * from "src/forms/axioma/constants/index";
    export * from "src/forms/axioma/typing/index";
}
declare module "src/forms/capabilities/normalizers/normalize-fields" {
    import type { NormalizedFields, ObjectWithRawFields } from "src/forms/axioma/index";
    /**
      A utility class that normalizes form fields by merging them with default keys and values.
      Provides a static execute method that takes an object containing form fields and returns
      a new object with normalized fields.
    **/
    export class NormalizeFormFields {
        /**
          Creates a new object with default keys and values for a form field, merging it with the provided field object.
          Assigns a unique id, modelKey, name, and other properties. If the field object has any properties
          that conflict with the default keys, the field object's properties will take precedence.
          @param {string} fieldKey - The unique key for the form field.
          @param {RawField} field - The form field object containing the properties to be merged with the default keys.
          @returns {NormalizedField & RawField} - A new object combining the default keys and values with the provided field object.
        **/
        private createDefaultKeys;
        /**
          Normalizes an object containing form fields by merging each field with the default keys and values.
          Returns a new object with normalized fields.
          @template T - A generic type for the form fields object.
          @param {T} fields - An object containing form fields to be normalized.
          @returns {NormalizedFields<T>} - A new object with the normalized form fields.
        **/
        execute<T extends ObjectWithRawFields = {}>(fields: T): NormalizedFields<T>;
    }
}
declare module "src/forms/capabilities/normalizers/normalize-buttons" {
    import type { NormalizedButtons, RawButton } from "src/forms/axioma/index";
    /**
     * A utility class that normalizes button configurations by merging them with default properties.
     * Provides an `execute` method that takes an optional object containing button configurations
     * and returns a new object with normalized button properties.
    **/
    export class NormalizeButtons {
        /**
         * Normalizes an optional object containing button configurations by merging each configuration
         * with the default properties. Returns a new object with normalized button properties.
         *
         * @template T - A generic type for the button configurations object.
         * @param {T} buttons - An optional object containing button configurations to be normalized.
         * @returns {NormalizedButtons<T>} - A new object with the normalized button properties.
        **/
        execute<T extends Record<'main' | 'aux', RawButton>>(buttons?: T): NormalizedButtons<T>;
    }
}
declare module "src/forms/capabilities/normalizers/normalize-titles" {
    import type { NormalizedTitles, RawTitle } from "src/forms/axioma/index";
    /**
     * A utility class that normalizes title configurations by using the provided title or default values.
     * Provides an `execute` method that takes an optional object containing title configurations
     * and returns a new object with normalized title properties.
     */
    export class NormalizeTitles {
        /**
         * Normalizes an optional object containing title configurations by using the provided title
         * or default values. Returns a new object with normalized title properties.
         *
         * @param {RawTitle} titles - An optional object containing title configurations to be normalized.
         * @returns {NormalizedTitles} - A new object with the normalized title properties.
         */
        execute(titles?: RawTitle): NormalizedTitles;
    }
}
declare module "src/forms/capabilities/normalizers/normalize-settings" {
    import type { NormalizedSettings, RawSetting } from "src/forms/axioma/index";
    /**
     * A utility class that normalizes form settings configurations by merging them with default properties.
     * Provides an `execute` method that takes an optional object containing settings configurations
     * and returns a new object with normalized settings properties.
     */
    export class NormalizeSettings {
        /**
         * Normalizes an optional object containing settings configurations by merging each configuration
         * with the default properties. Returns a new object with normalized settings properties.
         *
         * @param {RawSetting} settings - An optional object containing settings configurations to be normalized.
         * @returns {NormalizedSettings} - A new object with the normalized settings properties.
         */
        execute(settings?: RawSetting): NormalizedSettings;
    }
}
declare module "src/forms/capabilities/normalizers/index" {
    export * from "src/forms/capabilities/normalizers/normalize-fields";
    export * from "src/forms/capabilities/normalizers/normalize-buttons";
    export * from "src/forms/capabilities/normalizers/normalize-titles";
    export * from "src/forms/capabilities/normalizers/normalize-settings";
}
declare module "src/forms/capabilities/create-form" {
    import type { Form, ObjectWithRawFields, RawButton, RawSetting, RawTitle } from "src/forms/axioma/index";
    /**
     * A class that provides functionality to create a form from raw fields and settings.
     */
    export class CreateForm {
        /**
         * Creates a form from raw fields and settings.
         *
         * @typeparam T - A generic type parameter that extends `ObjectWithRawField`.
         * @param rawFields - A `ObjectWithRawField` object containing the raw fields to be normalized.
         * @param rawSettings - An optional `RawSettings` object containing the raw settings to be normalized.
         * @returns A `Form` object containing the normalized fields and settings.
         */
        execute<T extends ObjectWithRawFields, U extends RawSetting, V extends Record<string, RawButton>>(rawFields: T, rawTitles?: RawTitle, rawButtons?: V, rawSettings?: U): Form<T, V>;
    }
}
declare module "src/forms/capabilities/fields/fill-with-record-values" {
    import type { NormalizedField, NormalizedFields } from "src/forms/axioma/index";
    type RecordValues = Record<string, unknown>;
    /**
     * Class that fills the normalized fields of a form with corresponding values from a record.
     */
    export class FillWithRecordValues {
        /**
         * Sets the value of a normalized field.
         *
         * @param field The normalized field.
         * @param value The value to set.
         */
        private setFieldValue;
        /**
         * Recursively traverses the record value object until the value corresponding to
         * the normalized field key is found and sets it.
         *
         * @param record The record value object.
         * @param fieldKey The normalized field key.
         * @param field The normalized field.
         */
        private traverseRecord;
        /**
         * Fills the normalized fields with corresponding values from the record.
         *
         * @param normalizedFields The normalized fields of the form.
         * @param recordValues The values of the record.
         */
        execute<T extends Record<string, NormalizedField>>(normalizedFields: NormalizedFields<T>, recordValues: RecordValues): void;
    }
}
declare module "src/forms/capabilities/fields/generate-form-data" {
    import type { NormalizedFields } from "src/forms/axioma/index";
    /**
     * Class responsible for generating form data in the appropriate format.
     */
    export class GenerateFormData {
        private jsonForm;
        private formData;
        /**
         * Handles list values in the form.
         *
         * @param fieldKey The key of the field being handled.
         * @param field The field being handled.
         */
        private handleListValues;
        /**
         * Handles file values in the form.
         *
         * @param fieldKey The key of the field being handled.
         * @param field The field being handled.
         */
        private handleFileValue;
        /**
         * Handles values in the form that are not lists or files.
         *
         * @param fieldKey The key of the field being handled.
         * @param field The field being handled.
         */
        private handleValue;
        /**
         * Generates the form data in the appropriate format.
         *
         * @param fields The normalized form fields.
         * @returns An object containing the form data in the appropriate format.
         */
        execute<T = object>(fields: NormalizedFields<T>): {
            jsonForm: Record<string, unknown>;
            formData: FormData | null;
        };
    }
}
declare module "src/forms/capabilities/fields/reset-fields" {
    import type { ObjectWithNormalizedFields } from "src/forms/axioma/index";
    /**
     * A class that provides functionality to reset the model value of fields in a normalized fields object.
     */
    export class ResetFields {
        /**
         * Resets the model value of fields in a normalized fields object to their original values.
         *
         * @typeparam T - A generic type parameter that extends `Record<string, NormalizedField>`.
         * @param clonedFields - A `NormalizedFields` object containing the fields whose model values need to be reset.
         * @param originalFields - A `NormalizedFields` object containing the original fields whose model values need to be used for resetting.
         */
        execute(clonedFields: ObjectWithNormalizedFields, originalFields: ObjectWithNormalizedFields): void;
    }
}
declare module "src/forms/capabilities/fields/handle-errors" {
    import type { FieldErrors, ObjectWithNormalizedFields } from "src/forms/axioma/index";
    /**
     * Class that fills the normalized fields of a form with corresponding values from a record.
     */
    export class HandleErrors {
        execute<T extends ObjectWithNormalizedFields>(normalizedFields: T, errors: FieldErrors): void;
    }
}
declare module "src/forms/capabilities/fields/index" {
    export * from "src/forms/capabilities/fields/fill-with-record-values";
    export * from "src/forms/capabilities/fields/generate-form-data";
    export * from "src/forms/capabilities/fields/reset-fields";
    export * from "src/forms/capabilities/fields/handle-errors";
}
declare module "src/forms/capabilities/manager/response" {
    import type { Handler, ResponseManager, ResponseMap } from "src/forms/axioma/index";
    export class ResponseManagerHandler implements ResponseManager {
        private id;
        constructor(id: symbol);
        private getResponseHandlerFromMap;
        setResponseHandler(codes: ResponseMap): void;
        getResponseHandler(code: number): Handler | null;
        removeResponseHandlers(): void;
    }
}
declare module "src/forms/capabilities/manager/notification" {
    import type { Notification, NotificationManager, NotificationMap } from "src/forms/axioma/index";
    export class NotificationManagerHandler implements NotificationManager {
        private id;
        constructor(id: symbol);
        private getNotificationHandlerFromMap;
        setNotificationHandler(handler: NotificationMap): void;
        pushNotification(notification: Notification): void;
        removeNotificationHandlers(): void;
    }
}
declare module "src/http/axioma/typing/pagination" {
    export interface PaginationStructure {
        results: <T>(response: any) => T[];
        count: (response: any) => number;
    }
    export interface Pagination {
        page?: number;
        count?: number;
        rowsPerPage?: number;
    }
}
declare module "src/http/axioma/typing/http" {
    import type { PaginationStructure } from "src/http/axioma/typing/pagination";
    export interface HttpService {
        get<R = any, C = any>(url: string, config?: C): Promise<R>;
        post<T, R = any, C = any>(url: string, data: T, config?: C): Promise<R>;
        patch<T, R = any, C = any>(url: string, data: T, config?: C): Promise<R>;
        delete<R = any, C = any>(url: string, config?: C): Promise<R>;
        pagination: PaginationStructure;
    }
}
declare module "src/http/axioma/typing/index" {
    import type { Pagination } from "src/http/axioma/typing/pagination";
    export * from "src/http/axioma/typing/pagination";
    export * from "src/http/axioma/typing/http";
    export interface HandleRequestStatusCodes extends Record<number, (form: any, data: any) => void> {
    }
    export interface SameAPIEndpoint extends Record<string, string[]> {
    }
    export interface Params {
        [key: string]: unknown;
    }
    export interface JSONForm {
        [key: string]: unknown;
    }
    interface RequestRecord {
        url: string;
        form: JSONForm | FormData;
    }
    type FilterParams<T> = {
        [Key in keyof T]: unknown;
    };
    export interface GetListRequest<T = {}> {
        url: string;
        _search?: string;
        filterParams?: FilterParams<T> | {};
        pagination?: Pagination;
    }
    export interface UpdateRequest extends RequestRecord {
        lookupValue: string | number;
    }
    export interface RetrieveRequest {
        url: string;
        lookupValue: string | number;
    }
    export interface DeleteRequest {
        url: string;
        lookupValue: string | number;
        hardDelete?: boolean;
        fieldName?: string;
    }
    export interface RequestResponse {
        isActionSucceed: boolean;
        value: unknown;
    }
    export type OnSuccess = (response: any) => void;
    export type OnFailed = (error: any) => void;
    export type OnFinally = () => void;
    export interface DefaultOptions {
        onSuccess?: () => void;
        onFailed?: (e: any) => void;
    }
    export interface RequestDefaultOptions {
        onSuccess?: OnSuccess;
        onFailed?: OnFailed;
        onFinally?: OnFinally;
        autoTrigger?: boolean;
    }
    export interface CreateRequestOptions extends RequestDefaultOptions {
    }
    export interface UpdateRequestOptions extends RequestDefaultOptions {
    }
    export interface RetrieveRequestOptions extends RequestDefaultOptions {
    }
    export interface DeleteRequestOptions extends RequestDefaultOptions {
    }
    export interface ListRequestOptions extends RequestDefaultOptions {
        hotFetch?: boolean;
    }
}
declare module "src/http/axioma/value-objects/pagination" {
    import type { PaginationStructure } from "src/http/axioma/typing/index";
    export class PaginateResult<T> {
        private paginationStructure;
        private _results;
        private _count;
        constructor(paginationStructure: PaginationStructure, data: T);
        get results(): T[];
        get count(): number;
    }
}
declare module "src/http/axioma/services/get-foreign-key-values" {
    import type { HttpService } from "src/http/axioma/typing/index";
    export class GetForeignKeyValues {
        private http;
        constructor(http: HttpService);
        private getSameAPIEndpoint;
        private addOptionsToField;
        execute(fields: Record<string, {
            type: string;
            options?: any[];
            url?: string;
            filterParams?: Record<string, unknown>;
        }>): void;
    }
}
declare module "src/http/axioma/services/index" {
    export * from "src/http/axioma/services/get-foreign-key-values";
}
declare module "src/http/axioma/value-objects/url" {
    export class Url {
        private url;
        private lookupValue?;
        private _value;
        constructor(url: string, lookupValue?: string | number | undefined);
        private parseUrl;
        get value(): string;
    }
}
declare module "src/http/axioma/value-objects/index" {
    export * from "src/http/axioma/value-objects/url";
    export * from "src/http/axioma/value-objects/pagination";
}
declare module "src/http/axioma/index" {
    export * from "src/http/axioma/services/index";
    export * from "src/http/axioma/typing/index";
    export * from "src/http/axioma/value-objects/index";
}
declare module "src/forms/capabilities/manager/form" {
    import type { FieldErrors, FormManager, FormMap, NotificationManager, ObjectWithNormalizedFields, ResponseManager } from "src/forms/axioma/index";
    export class FormManagerHandler implements FormManager {
        private id;
        readonly responseManager: ResponseManager;
        readonly notificationManager: NotificationManager;
        constructor(id: symbol);
        getForm(): FormMap;
        addForm(form: FormMap): void;
        removeForm(): void;
        fillWithRecordValues(record: Record<string, unknown>): void;
        resetFields(): void;
        getForeignKeyValues(fields?: ObjectWithNormalizedFields): void;
        getFormData(fields?: ObjectWithNormalizedFields): {
            jsonForm: Record<string, unknown>;
            formData: FormData | null;
        };
        setErrors(errors: FieldErrors): void;
        switchToCreateMode(): void;
        switchToUpdateMode(): void;
    }
}
declare module "src/locales/composables/locale" {
    interface Locale {
        locale: string;
        messages: Record<string, Record<string, string>>;
    }
    export const i18n: Locale;
    export function setLocale(locale: Locale): void;
    export function useLocale(): (text: string) => string;
}
declare module "src/locales/composables/index" {
    export * from "src/locales/composables/locale";
}
declare module "src/locales/index" {
    export * from "src/locales/composables/index";
    export const LOCALES: {
        en: {
            cancel: string;
            create: string;
            "create-new": string;
            "create-new-record": string;
            delete: string;
            edit: string;
            export: string;
            "update-record": string;
            "element-created": string;
            "element-updated": string;
        };
        es: {
            cancel: string;
            create: string;
            "create-new": string;
            "create-new-record": string;
            delete: string;
            edit: string;
            export: string;
            "update-record": string;
            "element-created": string;
            "element-updated": string;
        };
    };
}
declare module "src/tables/axioma/typing/column" {
    export interface RawColumn extends Record<string, unknown> {
        label?: string;
        value?: string;
        field?: (row: unknown, index: number) => unknown;
        format?: (value: unknown) => unknown;
        allowCheckbox?: boolean;
        allowImagePreview?: boolean;
        exclude?: boolean;
    }
    export type FieldAsColumn<T, U> = {
        [K in keyof T]: U;
    };
    export type MappedRawColumn<T, U> = {
        [K in keyof (Extract<T, U>)]?: RawColumn;
    };
    export interface NormalizedColumn extends RawColumn {
        label: string;
        value: string;
    }
    export interface ObjectWithRawColumns extends Record<string, RawColumn> {
    }
    export interface ObjectWithNormalizedColumns extends Record<string, NormalizedColumn> {
    }
    export interface BaseFormField extends Record<string, {
        type: string;
        label?: string;
        name?: string;
    }> {
    }
    export interface BaseTableForm {
        id: symbol;
        fields: BaseFormField;
    }
}
declare module "src/tables/axioma/typing/pagination" {
    export interface RawTablePagination {
        page?: number;
        rowsPerPage?: number;
        count?: number;
    }
    export interface NormalizedTablePagination extends Required<RawTablePagination> {
    }
}
declare module "src/tables/axioma/typing/filters" {
    export interface RawTableFilter extends Record<string, unknown> {
    }
}
declare module "src/tables/axioma/typing/settings" {
    export interface RawTableSetting extends Record<string, unknown> {
        url: string;
        lookupField?: string;
    }
    export interface NormalizedTableSetting extends Required<RawTableSetting> {
    }
}
declare module "src/tables/axioma/typing/table" {
    import type { ObjectWithNormalizedColumns } from "src/tables/axioma/typing/column";
    import type { NormalizedTablePagination } from "src/tables/axioma/typing/pagination";
    import type { NormalizedTableSetting } from "src/tables/axioma/typing/settings";
    import type { DeleteRequestOptions } from "src/http/axioma/index";
    import type { FormManager } from "src/forms/axioma/index";
    export interface TableMap {
        columns: ObjectWithNormalizedColumns;
        formManager: FormManager;
        settings: NormalizedTableSetting;
        pagination: NormalizedTablePagination;
    }
    export interface Row extends Record<string, unknown> {
    }
    export interface SetupOptions {
        onReady?: () => void;
        onClickAux?: () => void;
    }
    export interface DeleteRecordOptions extends DeleteRequestOptions {
        onRequestDeleteConfirmation?: (row: Row) => void;
    }
    export interface TableManager {
        getTable: () => TableMap;
        addTable: (table: TableMap) => void;
        removeTable: () => void;
        setupFormToCreateRecord: (options?: SetupOptions) => void;
        setupFormToEditRecord: (row: Row, options?: SetupOptions) => void;
        deleteRecord: (row: Row | null, options?: DeleteRecordOptions) => void;
        updateCheckbox: (value: {
            field: string;
            row: Row;
        }) => void;
    }
}
declare module "src/tables/axioma/typing/index" {
    export * from "src/tables/axioma/typing/column";
    export * from "src/tables/axioma/typing/pagination";
    export * from "src/tables/axioma/typing/filters";
    export * from "src/tables/axioma/typing/settings";
    export * from "src/tables/axioma/typing/table";
}
declare module "src/tables/axioma/index" {
    export * from "src/tables/axioma/typing/index";
}
declare module "src/tables/capabilities/normalizers/normalize-columns" {
    import type { BaseFormField, ObjectWithNormalizedColumns, ObjectWithRawColumns } from "src/tables/axioma/index";
    export class NormalizeColumns {
        execute(fields: BaseFormField, columns: ObjectWithRawColumns): ObjectWithNormalizedColumns;
    }
}
declare module "src/tables/capabilities/normalizers/normalize-pagination" {
    import type { NormalizedTablePagination, RawTablePagination } from "src/tables/axioma/index";
    export class NormalizePagination {
        execute(rawPagination: RawTablePagination): NormalizedTablePagination;
    }
}
declare module "src/http/capabilities/common" {
    import type { RequestDefaultOptions } from "src/http/axioma/index";
    import type { HttpService } from "src/http/axioma/index";
    export function onSuccess(response: unknown, options?: RequestDefaultOptions): void;
    export function onFailed(error: unknown, options?: RequestDefaultOptions): void;
    export function onFinally(options?: RequestDefaultOptions): void;
    export const httpService: HttpService;
    export function setHttpInstance(instance: Omit<HttpService, 'pagination'>): void;
    export function setHttpPagination(pagination: HttpService['pagination']): void;
}
declare module "src/http/capabilities/request-create" {
    import type { CreateRequestOptions, HttpService, JSONForm } from "src/http/axioma/index";
    export class RequestCreate {
        private http;
        constructor(http: HttpService);
        execute(url: string, form: JSONForm | FormData, options?: CreateRequestOptions): void;
    }
}
declare module "src/http/capabilities/request-delete" {
    import type { DeleteRequestOptions, HttpService } from "src/http/axioma/index";
    export class RequestDelete {
        private http;
        constructor(http: HttpService);
        execute(url: string, lookupValue: string | number, options?: DeleteRequestOptions): void;
    }
}
declare module "src/http/capabilities/request-list" {
    import type { HttpService, ListRequestOptions } from "src/http/axioma/index";
    export class RequestList {
        private http;
        constructor(http: HttpService);
        execute(url: string, params?: Record<string, unknown>, options?: ListRequestOptions): void;
    }
}
declare module "src/http/capabilities/request-retrieve" {
    import type { HttpService, RetrieveRequestOptions } from "src/http/axioma/index";
    export class RequestRetrieve {
        private http;
        constructor(http: HttpService);
        execute(url: string, lookupValue: string | number, options?: RetrieveRequestOptions): void;
    }
}
declare module "src/http/capabilities/request-update" {
    import type { HttpService, JSONForm, UpdateRequestOptions } from "src/http/axioma/index";
    export class RequestUpdate {
        private http;
        constructor(http: HttpService);
        execute(url: string, lookupValue: string | number, form: JSONForm | FormData, options?: UpdateRequestOptions): void;
    }
}
declare module "src/tables/capabilities/manager/table" {
    import type { DeleteRecordOptions, Row, SetupOptions, TableManager, TableMap } from "src/tables/axioma/index";
    export class TableManagerHandler implements TableManager {
        private id;
        private static readonly tables;
        constructor(id: symbol);
        getTable(): TableMap;
        addTable(table: TableMap): void;
        removeTable(): void;
        setupFormToCreateRecord(options?: SetupOptions): void;
        setupFormToEditRecord(row: Row, options?: SetupOptions): void;
        deleteRecord(row: Row | null, options?: DeleteRecordOptions): void;
        updateCheckbox(value: {
            field: string;
            row: Row;
        }): void;
    }
}
declare module "src/tables/capabilities/column-value" {
    import type { NormalizedColumn } from "src/tables/axioma/index";
    export function columnValue(row: any, header: NormalizedColumn, rowIndex: number): any;
}
declare module "src/settings/composables/index" {
    import type { HandleRequestStatusCodes } from "src/http/axioma/index";
    export const fields: Record<string, any>;
    export const utils: {
        button: {};
        modal: {};
    };
    export function setDefaultClasses(classes: {
        [k: string]: string;
    }): void;
    export function getDefaults(): {
        classes: Record<string, string>;
    };
    export function getStatusCodesHandlers(): HandleRequestStatusCodes;
    export function setStatusCodesHandlers(handlers: HandleRequestStatusCodes): void;
    export function setFields(newFields: unknown): void;
    export function setUtils(newUtils: unknown): void;
}
declare module "vite.config" {
    const _default: import("vite").UserConfigExport;
    export default _default;
}
declare module "src/http/capabilities/index" {
    export * from "src/http/capabilities/common";
    export * from "src/http/capabilities/request-create";
    export * from "src/http/capabilities/request-retrieve";
    export * from "src/http/capabilities/request-delete";
    export * from "src/http/capabilities/request-list";
    export * from "src/http/capabilities/request-update";
}
declare module "src/forms/capabilities/manager/index" {
    export * from "src/forms/capabilities/manager/form";
    export * from "src/forms/capabilities/manager/notification";
    export * from "src/forms/capabilities/manager/response";
}
declare module "src/forms/capabilities/index" {
    export * from "src/forms/capabilities/normalizers/index";
    export * from "src/forms/capabilities/fields/index";
    export * from "src/forms/capabilities/create-form";
    export * from "src/forms/capabilities/manager/index";
}
declare module "src/tables/capabilities/normalizers/index" {
    export * from "src/tables/capabilities/normalizers/normalize-columns";
    export * from "src/tables/capabilities/normalizers/normalize-pagination";
}
declare module "src/tables/capabilities/manager/index" {
    export * from "src/tables/capabilities/manager/table";
}
declare module "src/tables/capabilities/index" {
    export * from "src/tables/capabilities/normalizers/index";
    export * from "src/tables/capabilities/manager/index";
    export * from "src/tables/capabilities/column-value";
}
declare module "src/settings/index" {
    export * from "src/settings/composables/index";
}
declare module "src/index" {
    export * from "src/http/axioma/index";
    export * from "src/http/capabilities/index";
    export * from "src/forms/axioma/index";
    export * from "src/forms/capabilities/index";
    export * from "src/tables/axioma/index";
    export * from "src/tables/capabilities/index";
    export * from "src/locales/index";
    export * from "src/settings/index";
}
