import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Option } from '@models/interfaces';


@Component({
  selector: 'app-option-card',
  standalone: true,
  imports: [],
  templateUrl: './option-card.html',
  styleUrl: './option-card.scss'
})
export class OptionCardComponent {
  
  @Input() option!: Option;

  
  @Input() selected: boolean = false;

  
  @Input() disabled: boolean = false;

  
  @Output() optionSelect = new EventEmitter<void>();

  
  onSelect() {
    if (!this.disabled) {
      this.optionSelect.emit();
    }
  }

  
  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    const container = img.closest('.image-container');
    if (container) {
      const fallback = document.createElement('div');
      fallback.className = 'image-fallback';
      fallback.textContent = this.option.name.charAt(0).toUpperCase();
      container.insertBefore(fallback, img.nextSibling);
    }
  }
}
