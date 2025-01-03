import { NgFor, CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ref, get } from 'firebase/database';
import { SearchBarComponent } from '../../components/shared/search-bar/search-bar.component';
import { db } from '../../../../firebase-config';
import { ReloadWordsService } from '../../services/reloadWords.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [SearchBarComponent, NgFor, CommonModule, NgIf],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  constructor(private reloadWordsService: ReloadWordsService) {
    this.reloadSubscription = this.reloadWordsService.getLoad().subscribe(() => {
      this.search='';
      this.loadWords();
    });
  }
  search: string = '';
  wordsMap: Map<string, string> = new Map();
  groupedWordsMap: { [letter: string]: { [word: string]: string } } = {};
  show: boolean = true;
  private reloadSubscription: any;

  ngOnDestroy(): void {
    if (this.reloadSubscription) {
      this.reloadSubscription.unsubscribe();
    }
  }

  searchInput(event: string) {
    this.show = true;
    console.log(event);
    this.search = event;
    this.loadWords();
  }

  ngAfterContentInit(): void {
    this.loadWords();
  }

  async loadWords() {
    this.show = true;
    const wordsRef = ref(db, 'words');

    try {
      const snapshot = await get(wordsRef);
      if (snapshot.exists()) {
        const words = snapshot.val();

        this.organizeWords(words);
        if(this.search != ''){
          const filteredWords = this.filterWords(words, this.search);

          if (Object.keys(filteredWords).length > 0) {
            this.organizeWords(filteredWords);
          } else {
            this.show = false;
            console.log("No se encontraron palabras que coincidan con la búsqueda");
          }
        }
      } else {
        this.show = false;
        console.log("No words data available");
      }
    } catch (error) {
      this.show = false;
      console.error("Error getting words: ", error);
    }
  }

  organizeWords(words: { [key: string]: { word: string, mean: string } }) {
    const tempWordsMap = new Map<string, string>();
    const tempGroupedWordsMap: any = {};

    Object.values(words).forEach((wordObj) => {
      const word = wordObj.word;
      const meaning = wordObj.mean;

      if (word && typeof word === 'string' && word.length > 0) {
        tempWordsMap.set(word, meaning);

        const firstLetter = word.charAt(0).toUpperCase();

        if (!tempGroupedWordsMap[firstLetter]) {
          tempGroupedWordsMap[firstLetter] = {};
        }

        tempGroupedWordsMap[firstLetter][word] = meaning;
      } else {
        this.show = false;
        console.warn('Palabra indefinida o vacía:', word);
      }
    });

    this.wordsMap = tempWordsMap;

    Object.keys(tempGroupedWordsMap).forEach(letter => {
      const sortedMap = Object.fromEntries(
        Object.entries(tempGroupedWordsMap[letter]).sort(([a], [b]) => a.localeCompare(b))
      );
      tempGroupedWordsMap[letter] = sortedMap;
    });

    this.groupedWordsMap = tempGroupedWordsMap;
  }

  filterWords(words: { [key: string]: { word: string, mean: string } }, searchTerm: string) {
    const filtered: { [key: string]: { word: string, mean: string } } = {};

    Object.keys(words).forEach(key => {
      const wordObj = words[key];
      const wordText = wordObj.word.toLowerCase().trim();
      if (wordText.includes(searchTerm)) {
        filtered[key] = wordObj;
      }
    });

    return filtered;
  }
}
