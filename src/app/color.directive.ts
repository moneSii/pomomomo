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

  category: string = ''; // work | short | long
  type = input(); // primary | secondary | tertiary

  colorStateInit: string = '';
  colorStateAfter: string = '';

  ngOnInit() {
    console.log(this.type());
    const colorSubscription = this.timerService.color.subscribe((val) => {
      switch (val) {
        case 'init':
          this.colorStateInit = 'init';
          break;
        case 'reset':
          this.colorStateInit = 'reset';
          break;
        case 'work-short':
          this.colorStateInit = 'work';
          this.colorStateAfter = 'short';
          break;
        case 'work-long':
          this.colorStateInit = 'work';
          this.colorStateAfter = 'long';
          break;
        case 'short-work':
          this.colorStateInit = 'short';
          this.colorStateAfter = 'work';
          break;
        case 'long-work':
          this.colorStateInit = 'long';
          this.colorStateAfter = 'work';
          break;
      }

      var anima;

      // Init page load
      if (this.colorStateInit === 'init' || this.colorStateInit === 'reset') {
        anima = animation([
          style({
            opacity: 0,
          }),
          animate(
            '0.5s ease-in',
            style({
              'background-color': 'var(--work-' + this.type() + '-color)',
              opacity: 1,
            })
          ),
        ]);
      } else {
        console.log('here');
        anima = animation([
          style({
            'background-color':
              'var(--' + this.colorStateInit + '-' + this.type() + '-color)',
          }),
          animate(
            '0.8s ease-in',
            style({
              'background-color':
                'var(--' + this.colorStateAfter + '-' + this.type() + '-color)',
            })
          ),
        ]);
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
