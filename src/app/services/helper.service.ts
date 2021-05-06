import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as moment_ from 'moment';

const moment = moment_;

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  complement: string;

  constructor(private http: HttpClient) {
    this.complement = 'ay';
  }

  translateToPigLatin(text: string[]): string {
    let phrase: string = '';

    text.forEach(word => {
      phrase += `${this.startTranslateProcess(word)} `;
    });

    return phrase;
  }

  startTranslateProcess(word: string): string {
    word = this.validationIfIsEmpty(word);
    const isThereCapitalLatter: boolean = this.checkIfThereCapitalLatter(word);
    const index = this.getIndexOfTheFirstVowel(word);
    const prefix = this.getPrefix(word, index);
    const stem = this.getSteam(word, index);

    const result = stem + prefix + this.complement;
    if (isThereCapitalLatter) {
      let formatResult =  result.toLowerCase();
      return `${formatResult.substr(0,1).toUpperCase()}${formatResult.substr(1,formatResult.length)}` ;
    } else {
      return result;
    }

  }

  validationIfIsEmpty(text: string) {
    if (text === '') {
      return '';
    } else {
      return text;
    }
  }

  checkIfThereCapitalLatter(word: string): boolean {
    if (word.substr(0, 1) === word.substr(0, 1).toUpperCase()) {
      return true;
    } else {
      return false;
    }
  }

  getPrefix(word: string, index): string {
    return word.substr(0, index);
  }

  getSteam(word: string, index): string {
    return word.substr(index, word.length);
  }

  getIndexOfTheFirstVowel(word: string): number {
    let index: number[] = [];
    index.push(word.indexOf('A'));
    index.push(word.indexOf('a'));
    index.push(word.indexOf('E'));
    index.push(word.indexOf('e'));
    index.push(word.indexOf('I'));
    index.push(word.indexOf('i'));
    index.push(word.indexOf('O'));
    index.push(word.indexOf('o'));
    index.push(word.indexOf('U'));
    index.push(word.indexOf('u'));
    index.push(word.indexOf('Y'));
    index.push(word.indexOf('y'));

    const indexFormated = index.map(i => {
      if (i < 0) {
        return i = 10000000000000000000;
      } else {
        return i;
      }
    });

    return indexFormated.sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0
    }).shift();
  }

  getPunctuation(stem: string): string {
    return '';
  }
}
