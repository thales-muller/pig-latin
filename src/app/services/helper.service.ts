import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as moment_ from 'moment';
import { AY, YAY } from '../shered/const/complement';
import { CONSONANTS } from '../shered/const/consonants';
import { PUNCTUATION } from '../shered/const/punctuation';

const moment = moment_;

@Injectable({
  providedIn: 'root'
})
export class HelperService {


  constructor() { }

  translateToPigLatin(text: string[]): string {
    let phrase: string = '';

    text.forEach(word => {
      phrase += `${this.translateProcess(word)} `;
    });

    return phrase;
  }

  translateProcess(word: string): string {
    if (this.validationIfIsEmpty(word)) {
      return '';
    } else if (this.validationIfIsANumber(word)) {
      return word;
    }
    else {

      const isThereCapitalLatter: boolean = this.checkIfThereIsCapitalLatter(word);
      const isTherePunctuation: boolean = this.checkIfThereIsPunctuation(word);

      let punctuation = '';

      if (isTherePunctuation) {
        punctuation = word.substr(word.length - 1, word.length);
        word = word.substr(0, word.length - 1);
      }

      const areThereConsonant: boolean = this.checkIfThereAreConsonants(word);

      let index, prefix, stem, result: string;
      if (areThereConsonant) {
        index = this.getIndexOfTheFirstVowel(word);
        prefix = this.getPrefix(word, index);
        stem = this.getSteam(word, index);
        result = stem + prefix + AY + punctuation;
      } else {
        prefix = '';
        stem = this.getSteam(word, 0);
        result = stem + prefix + YAY + punctuation;
      }

      if (isThereCapitalLatter) {
        let formatResult = result.toLowerCase();
        return `${formatResult.substr(0, 1).toUpperCase()}${formatResult.substr(1, formatResult.length)}`;
      } else {
        return result;
      }
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
      if (i >= 0) {
        return i;
      }
    });

    return indexFormated.sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0
    }).shift();
  }

  validationIfIsEmpty(word: string): boolean {
    if (word === '') {
      return true
    } else {
      return false;
    }
  }

  validationIfIsANumber(word: string): boolean {
    return /^-?\d+$/.test(word);
  }

  checkIfThereIsCapitalLatter(word: string): boolean {
    if (word.substr(0, 1) === word.substr(0, 1).toUpperCase()) {
      return true;
    } else {
      return false;
    }
  }

  checkIfThereIsPunctuation(word: string): boolean {
    return PUNCTUATION.split(' ').some(punctuation => word.includes(punctuation));
  }

  checkIfThereAreConsonants(word: string): boolean {
    return CONSONANTS.split(' ').some(consonant => word.includes(consonant));
  }
}
