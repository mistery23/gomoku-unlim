import { ValidatorFn, AbstractControl } from '@angular/forms';


export function DifferentName(): ValidatorFn {
  return (control: AbstractControl): { [s: string]: boolean } => {
    const firstName = control.value.firstName.toLowerCase();
    const secondName = control.value.secondName.toLowerCase();
    if (firstName && secondName && firstName === secondName ) {
      return { 'namesMatch': true };
    } else {
      return null;
    }
  };
}
