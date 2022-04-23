import { NormalizedFieldStructure } from "@/types";

interface BaseArgs {
  errorMessage?: string;
  min?: number;
  max?: number;
}

interface Rules {
  [key: string]: (obj: BaseArgs) => (value: any) => boolean | string
}

export function parseRules(_rules: string[] | ((value: any) => boolean | string)[]) {
  const rules = useRules()
  _rules.forEach((rule, index: number) => {
    if (typeof rule === "string") {
      const ruleFunction = `${rule}Rule`;
      if (Object.prototype.hasOwnProperty.call(rules, ruleFunction)) {
        _rules[index] = rules[ruleFunction]({});
      }
    }
  })
}

export function validateRules(field: NormalizedFieldStructure, noMessages?: boolean) {
  return field.rules.every(rule => {
    const validation = rule(field.modelValue)
    let errors: string[] = []

    if (noMessages) return validation === true

    if (typeof validation === 'string') {
      errors = [validation]
    }

    field.errors = errors

    return validation === true
  })
}

export function useRules(): Rules {
  const requiredRule = ({ errorMessage }: { errorMessage?: string }) => {
    const validate = (value: any): boolean | string => {
      return (
        !!value || value === 0 || errorMessage || "Este campo es requerido"
      );
    };

    return validate;
  };

  const isNumberRule = ({ errorMessage }: { errorMessage?: string }) => {
    const validate = (value: any): boolean | string => {
      const strValue = String(value);
      const isValid = !isNaN(Number(strValue));

      return isValid || errorMessage || "Solo se permiten números";
    };

    return validate;
  };

  const emailRule = ({ errorMessage }: { errorMessage?: string }) => {
    const validate = (value: string): boolean | string => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || errorMessage || "Correo no válido";
    };

    return validate;
  };

  const numberInRangeRule = ({
    errorMessage,
    min,
    max,
  }: {
    min?: number;
    max?: number;
    errorMessage?: string;
  }): ((value: string | number) => boolean | string) => {
    const validate = (value: number | string) => {
      const _value = Number(value);

      return (
        ((!!_value || _value === 0) && _value >= (min || 0) && _value <= (max || 0)) ||
        errorMessage ||
        `Este valor debe estar entre ${min} y ${max}`
      );
    };
    return validate;
  };

  return {
    requiredRule,
    isNumberRule,
    emailRule,
    numberInRangeRule,
  };
}
