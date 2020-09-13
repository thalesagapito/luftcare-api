import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';

export enum ComparisonOperator {
  GREATER_THAN,
  GREATER_THAN_OR_EQUAL_TO,
  LESS_THAN,
  LESS_THAN_OR_EQUAL_TO,
  EQUAL_TO,
  INEQUAL_TO,
}

type ValidatorConstraints = [string, ComparisonOperator];

@ValidatorConstraint({ name: 'CompareToField' })
export class CompareToFieldConstraint implements ValidatorConstraintInterface {
  validate(value: number, args: ValidationArguments) {
    const [comparedFieldName, comparisonOperator] = args.constraints as ValidatorConstraints;
    const relatedValue = (args.object)[comparedFieldName];

    switch (comparisonOperator) {
      case ComparisonOperator.GREATER_THAN:
        return value > relatedValue;

      case ComparisonOperator.GREATER_THAN_OR_EQUAL_TO:
        return value >= relatedValue;

      case ComparisonOperator.LESS_THAN:
        return value < relatedValue;

      case ComparisonOperator.LESS_THAN_OR_EQUAL_TO:
        return value <= relatedValue;

      case ComparisonOperator.EQUAL_TO:
        return value === relatedValue;

      case ComparisonOperator.INEQUAL_TO:
      default:
        return value !== relatedValue;
    }
  }

  defaultMessage(args: ValidationArguments) {
    const { property: validatedFieldName } = args;
    const [comparedFieldName, comparisonOperator] = args.constraints as ValidatorConstraints;

    switch (comparisonOperator) {
      case ComparisonOperator.GREATER_THAN:
        return `${validatedFieldName} deve ser maior que ${comparedFieldName}`;

      case ComparisonOperator.GREATER_THAN_OR_EQUAL_TO:
        return `${validatedFieldName} deve ser maior ou igual que ${comparedFieldName}`;

      case ComparisonOperator.LESS_THAN:
        return `${validatedFieldName} deve ser menor que ${comparedFieldName}`;

      case ComparisonOperator.LESS_THAN_OR_EQUAL_TO:
        return `${validatedFieldName} deve ser menor ou igual que ${comparedFieldName}`;

      case ComparisonOperator.EQUAL_TO:
        return `${validatedFieldName} deve ser igual a ${comparedFieldName}`;

      case ComparisonOperator.INEQUAL_TO:
      default:
        return `${validatedFieldName} deve ser diferente de ${comparedFieldName}`;
    }
  }
}

// eslint-disable-next-line max-len
export function CompareToField(comparedFieldName: string, comparisonOperator: ComparisonOperator, validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [comparedFieldName, comparisonOperator],
      validator: CompareToFieldConstraint,
    });
  };
}
