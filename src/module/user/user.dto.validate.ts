import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class IsValidEmail implements ValidatorConstraintInterface {
  validate(value: any, args?: ValidationArguments): boolean | Promise<boolean> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return '邮箱无效';
  }
}
