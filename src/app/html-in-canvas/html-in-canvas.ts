import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-html-in-canvas',
  imports: [FormsModule],
  templateUrl: './html-in-canvas.html',
  styleUrl: './html-in-canvas.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HtmlInCanvas {
  canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  content = viewChild<ElementRef<HTMLElement>>('content');

  ctx = computed(() => {
    return this.canvas()?.nativeElement.getContext('2d');
  });

  title = signal('こんにちは');

  text = model('Canvas 内の HTML です');

  constructor() {
    effect(() => {
      const ctx = this.ctx();
      const ct = this.content()?.nativeElement;
      if (!ctx || !ct) {
        console.error('Canvas or content element not found');
        return;
      }

      // canvas がレンダリングした後じゃないとだめらしい
      setTimeout(() => {
        const transform = this.ctx()?.drawElementImage(ct, 100, 0);
        ct.style.transform = transform.toString();
      }, 0);
    });
  }

  clickBtn() {
    this.title.set('こんにちは、世界！');
  }

  canvasPaint(ev: Event) {
    const ctx = this.ctx();
    if (!ctx) return;

    ctx.reset();
    ctx.drawElementImage((ev as any).changedElements[0], 100, 0);
  }

  filter() {
    setInterval(() => {
      this.d();
    }, 1000 / 10);
  }

  d() {
    const canvas = this.canvas()?.nativeElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || canvas.width === 0 || canvas.height === 0) return;

    const { width, height } = canvas;
    const source = ctx.getImageData(0, 0, width, height);
    const filtered = new ImageData(new Uint8ClampedArray(source.data), width, height);
    const distance = 4;
    const scale = 0.025;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const noise =
          Math.sin(x * scale) * 0.5 +
          Math.cos(y * scale * 1.3) * 0.3 +
          Math.sin((x + y) * scale * 0.7) * 0.2;
        const angle = noise * Math.PI * 2;
        const sourceX = Math.round(x - Math.cos(angle) * distance);
        const sourceY = Math.round(y - Math.sin(angle) * distance);

        if (sourceX < 0 || sourceX >= width || sourceY < 0 || sourceY >= height) continue;

        const targetIndex = (y * width + x) * 4;
        const sourceIndex = (sourceY * width + sourceX) * 4;
        filtered.data.set(source.data.subarray(sourceIndex, sourceIndex + 4), targetIndex);
      }
    }

    ctx.putImageData(filtered, 0, 0);
  }
}

// 雑に型定義を上書きしておく
declare global {
  interface CanvasRenderingContext2D {
    drawElementImage(element: HTMLElement, x: number, y: number): any;
  }
}
