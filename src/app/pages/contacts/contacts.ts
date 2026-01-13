import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import emailjs from '@emailjs/browser';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';

interface EmailParams {
  name: string;
  email: string;
  message: string;
  to_name: string;
  [key: string]: string;
}

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, LucideAngularModule, RouterLink],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
  animations: [
    trigger('scrollReveal', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(
          '0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('0.6s 0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({ opacity: 0, transform: 'translateY(-10px)' })),
      ]),
    ]),
  ],
})
export class Contacts implements OnDestroy {
  private fb = inject(FormBuilder);
  private successTimeout?: ReturnType<typeof setTimeout>;
  private copyTimeout?: ReturnType<typeof setTimeout>;

  isSubmitting = false;
  showSuccess = false;
  isCopied = false;
  emailTooltipText = 'itdev.step@gmail.com';

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  ngOnDestroy(): void {
    this.clearTimeouts();
  }

  private clearTimeouts(): void {
    if (this.successTimeout) clearTimeout(this.successTimeout);
    if (this.copyTimeout) clearTimeout(this.copyTimeout);
  }

  async copyEmail(event: MouseEvent): Promise<void> {
    event.preventDefault();
    const email = 'itdev.step@gmail.com';

    if (!navigator.clipboard) {
      this.emailTooltipText = 'Press Ctrl+C';
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      this.isCopied = true;
      this.emailTooltipText = 'Copied!';

      this.resetCopyStatus(email);
    } catch (err) {
      console.error('Could not copy text: ', err);
      this.emailTooltipText = 'Error copying';
    }
  }

  private resetCopyStatus(email: string): void {
    if (this.copyTimeout) clearTimeout(this.copyTimeout);
    this.copyTimeout = setTimeout(() => {
      this.emailTooltipText = email;
      this.isCopied = false;
    }, 2500);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid || this.isSubmitting) {
      this.markFormAsTouched();
      return;
    }

    this.isSubmitting = true;

    try {
      const templateParams: EmailParams = {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        message: this.contactForm.value.message,
        to_name: 'Denys Goida',
      };

      await emailjs.send(
        'service_xn500wf',
        'template_2m0zgcp',
        templateParams,
        'hWfV2QnG1-Xmhs9qE'
      );

      this.handleSuccess();
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Oops! Something went wrong. Please try again later.');
    } finally {
      this.isSubmitting = false;
    }
  }

  private handleSuccess(): void {
    this.showSuccess = true;
    this.contactForm.reset();

    setTimeout(() => {
      const note = document.querySelector('.success-note');
      note?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);

    if (this.successTimeout) clearTimeout(this.successTimeout);
    this.successTimeout = setTimeout(() => {
      this.showSuccess = false;
    }, 6000);
  }

  private markFormAsTouched(): void {
    Object.values(this.contactForm.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach((c) => c.markAsTouched());
      }
    });
  }
}
