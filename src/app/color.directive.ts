import {
  DestroyRef,
  Directive,
  ElementRef,
  input,
  OnInit,
} from '@angular/core';
import {
  style,
  animation,
  animate,
  AnimationBuilder,
} from '@angular/animations';
import { TimerService } from './pomodoro/timer/timer.service';

@Directive({
  selector: '[appColor]',
  standalone: true,
})
export class ColorDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private builder: AnimationBuilder,
    private timerService: TimerService,
    private destroyRef: DestroyRef
  ) {}

  category: string = '';
  type = input('primary');
  interval = input('0.8s');
  animType: string = ' ease';

  ngOnInit() {
    const colorSubscription = this.timerService.color.subscribe((val) => {
      const colorState = val.split('-');
      var anima;

      if (colorState.length > 1) {
        anima = animation([
          style({
            'background-color':
              'var(--' + colorState[0] + '-' + this.type() + '-color)',
          }),
          animate(
            this.interval() + ' ' + this.animType,
            style({
              'background-color':
                'var(--' + colorState[1] + '-' + this.type() + '-color)',
            })
          ),
        ]);
      } else {
        if (colorState[0] === 'reset') {
          const colorOld = window.getComputedStyle(
            this.el.nativeElement
          ).background;
          this.animType = 'ease-in-out';

          anima = animation([
            style({
              'background-color': colorOld,
            }),
            animate(
              this.interval() + ' ' + this.animType,
              style({
                'background-color': 'var(--work-' + this.type() + '-color)',
              })
            ),
          ]);
        } else {
          anima = animation([
            style({
              opacity: 0,
            }),
            animate(
              this.interval() + ' ' + this.animType,
              style({
                'background-color': 'var(--work-' + this.type() + '-color)',
                opacity: 1,
              })
            ),
          ]);
        }
      }

      const factory = this.builder.build(anima);
      const player = factory.create(this.el.nativeElement);
      player.play();
    });
    this.destroyRef.onDestroy(() => {
      colorSubscription.unsubscribe();
    });
  }
}
