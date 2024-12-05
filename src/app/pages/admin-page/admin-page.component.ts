import { NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ref, set } from 'firebase/database';
import { db } from '../../../../firebase-config';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  word: string = '';
  mean: string = '';

  invalid: boolean = false;
  errorMessage: string = '';

  async validation(){
    this.invalid = false;
    if(this.word === '' || this.mean === ''){
      this.errorMessage = 'Please fill in all fields';
      this.invalid = true;
      return;
    } else {
      await this.saveWord(this.word, this.mean);
      this.word = '';
      this.mean = '';
    }
  }

  private async saveWord(word: string, mean:string ){
    const wordRef = ref(db, 'words/'+word);

    try{
      await set(wordRef, {
        word: this.word,
        mean: this.mean
      });
      console.log('Data saved successfully');
    } catch(err){
      console.log('Error',err);
    }
  }
}
