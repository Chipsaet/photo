
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  // لیستی از عکس‌های اولیه برای نمایش. می‌توانید این آدرس‌ها را با عکس‌های خودتان جایگزین کنید.
  // برای استفاده از فایل‌های محلی، پوشه assets را بسازید و عکس‌ها را آنجا قرار دهید (مثلا 'assets/1.jpg')
  // من از عکس‌های پیش‌فرض برای نمایش اولیه استفاده می‌کنم.
  images = signal<string[]>([
    'https://picsum.photos/seed/1/800/600',
    'https://picsum.photos/seed/2/800/600',
    'https://picsum.photos/seed/3/800/600',
    'https://picsum.photos/seed/4/800/600',
    'https://picsum.photos/seed/5/800/600',
    'https://picsum.photos/seed/6/800/600',
    'https://picsum.photos/seed/7/800/600',
    'https://picsum.photos/seed/8/800/600',
  ]);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          // اضافه کردن عکس جدید به ابتدای لیست
          this.images.update(currentImages => [e.target.result as string, ...currentImages]);
        }
      };
      
      reader.readAsDataURL(file);
    }
  }

  // این متد برای فعال کردن انتخاب فایل استفاده می‌شود
  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }
}
