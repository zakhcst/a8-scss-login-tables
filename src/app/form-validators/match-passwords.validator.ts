import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const matchPasswordsValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');
  return password.value && passwordConfirm.value && password.value !== passwordConfirm.value ? { matchPasswords: true } : null;
};
