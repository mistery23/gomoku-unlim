import { ValidatorFn, AbstractControl } from '@angular/forms';


export function DifferentColor(): ValidatorFn {
  return (control: AbstractControl): { [s: string]: boolean } => {
    const firstColor = control.value.firstColor;
    const secondColor = control.value.secondColor;
    if (firstColor && secondColor && firstColor === secondColor ) {
      return { 'colorsMatch': true };
    } else {
      return null;
    }
  };
}
