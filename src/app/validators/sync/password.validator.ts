import { Validators } from "@angular/forms";
import { AtLeastOneDigit } from "./at-least-one-digit.validator-fn";
import { AtLeastOneLetterLowercase } from "./at-least-one-letter-lowercase.validator-fn";
import { AtLeastOneLetterUppercase } from "./at-least-one-letter-uppercase.validator-fn";
import { AtLeastOneSpecialChar } from './at-least-one-special-char.validator-fn';

const Password = [
  Validators.required,
  Validators.minLength(8),
  AtLeastOneLetterLowercase,
  AtLeastOneLetterUppercase,
  AtLeastOneDigit,
  AtLeastOneSpecialChar('#?!@$ %^&*-')
];

export { Password };
