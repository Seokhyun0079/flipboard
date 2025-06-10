import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flipboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flipboard.html',
  styleUrls: ['./flipboard.scss']
})
export class FlipboardComponent implements OnInit {
  inputText: string = '';
  displayText: string[] = [];
  offset: number = 0;
  animationId: number | null = null;
  speed: number = 2; // 픽셀 단위 이동 속도
  isFlipping: boolean[] = [];
  newText: string[] = [];
  currentLanguage: 'ko' | 'en' | 'ja' = 'ko';

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    // 초기 텍스트 설정
    this.displayText = '환영합니다!'.split('');
    this.isFlipping = Array(this.displayText.length).fill(false);
  }

  detectLanguage(text: string): 'ko' | 'en' | 'ja' {
    const koreanRegex = /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF]/;
    const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/;

    if (koreanRegex.test(text)) return 'ko';
    if (japaneseRegex.test(text)) return 'ja';
    return 'en';
  }

  getRandomKoreanChar(): string {
    const start = 0xAC00;  // 한글 시작
    const end = 0xD7A3;    // 한글 끝
    const randomCode = Math.floor(Math.random() * (end - start + 1)) + start;
    return String.fromCharCode(randomCode);
  }

  getRandomJapaneseChar(): string {
    // 히라가나 (3040-309F) 또는 카타카나 (30A0-30FF) 중 랜덤 선택
    const isHiragana = Math.random() < 0.5;
    const start = isHiragana ? 0x3040 : 0x30A0;
    const end = isHiragana ? 0x309F : 0x30FF;
    const randomCode = Math.floor(Math.random() * (end - start + 1)) + start;
    return String.fromCharCode(randomCode);
  }

  getRandomEnglishChar(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return chars.charAt(Math.floor(Math.random() * chars.length));
  }

  getRandomChar(): string {
    switch (this.currentLanguage) {
      case 'ko':
        return this.getRandomKoreanChar();
      case 'ja':
        return this.getRandomJapaneseChar();
      case 'en':
        return this.getRandomEnglishChar();
      default:
        return this.getRandomKoreanChar();
    }
  }

  startAnimation() {
    if (this.newText.length > 0) {
      return;
    }
    const randomIdx: number[] = [];
    console.log(this.inputText);

    if (this.inputText.length > 0) {
      this.newText = this.inputText.split('');
      this.currentLanguage = this.detectLanguage(this.inputText);
    }

    while (randomIdx.length < this.inputText.length) {
      const idx = Math.floor(Math.random() * this.inputText.length);
      if (!randomIdx.includes(idx)) {
        randomIdx.push(idx);
      }
    }

    const max = 20;
    this.displayText = this.displayText.splice(0, this.newText.length);
    while (this.displayText.length < this.newText.length) {
      this.displayText.push('');
    }
    this.isFlipping = Array(this.newText.length).fill(false);
    this.cdr.detectChanges();
    for (let i = 0; i < randomIdx.length; i++) {
      for (let j = 0; j < max; j++) {
        setTimeout(() => {
          this.isFlipping[randomIdx[i]] = true;
          this.cdr.detectChanges();
          const randomChar = j === max - 1 ? this.newText[randomIdx[i]] : this.getRandomChar();

          setTimeout(() => {
            this.displayText[randomIdx[i]] = randomChar;
            this.isFlipping[randomIdx[i]] = false;
            if (i === randomIdx.length - 1 && j === max - 1) {
              this.newText = [];
            }
            this.cdr.detectChanges();
          }, 150);
        }, 200 * (j + i));
      }
    }
  }

  flipCard(index: number) {
    this.isFlipping[index] = true;
    setTimeout(() => {
      this.displayText[index] = this.newText[index];
      this.isFlipping[index] = false;
      this.cdr.detectChanges();
    }, 150);
  }

  stopAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
} 