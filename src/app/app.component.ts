import { Component, EventEmitter, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header.component';
import { ReloadWordsService } from './services/reloadWords.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private reloadWordsService: ReloadWordsService){}
  title = 'Diccionario';
  @Output() titleClicked = new EventEmitter<boolean>();

  onTitleClicked(event:boolean){
    if(event){
      this.reloadWordsService.loadEmitt();
    }
  }
}
