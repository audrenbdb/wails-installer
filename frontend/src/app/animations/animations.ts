import {animate, query, stagger, state, style, transition, trigger} from '@angular/animations';

export const fadeInList =
  trigger('fadeInList', [
    transition('* => *', [ // each time the binding value changes
      query(':leave', [
        stagger(100, [
          animate('0.5s', style({ opacity: 0 }))
        ])
      ], { optional: true }),
      query(':enter', [
        style({ opacity: 0 }),
        stagger(100, [
          animate('0.5s', style({ opacity: 1 }))
        ])
      ], { optional: true })
    ])
  ]);

export const fadeIn = trigger('fadeIn', [
  state('in', style({opacity: 1})),

  transition(':enter', [
    style({opacity: 0}),
    animate(300 )
  ]),

  transition(':leave',
    animate(300, style({opacity: 0})))
]);

