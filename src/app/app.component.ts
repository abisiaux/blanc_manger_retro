import { Component } from '@angular/core';
import { GameMode } from './game-mode'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blanc-manger-retro';
  mode = GameMode.PLAYER;
  serverURL = 'https://blanc-manger-retro-server.onrender.com';
  cardUrls: string[] = [];
  cardTranslations: string[] = [];

  translations = [
    'Burn Down chart',
    'The pope',
    'Extrem programming',
    'A mycosis',
    'A user story',
    'Fail fast concept',
    'Neglected foreplay',
    'Scrum',
    'A finger',
    'A masked avenger',
    'A detox cure',
    'Poker planning',
    'Our sprint',
    'A scientific debat',
    'Saturday night fever',
    'Shuhari',
    'A lego scrum workshop',
    'A deep depression',
    'Cycle time',
    'Product increments',
    'Organization quality',
    'Framework safe',
    'Drink fast to catch up with friends',
    'Cry like a madeleine',
    'Technical debt',
    'The roadmap',
    'The Velocity',
    'A feature',
    'The definition of done',
    'A big disgusting bug',
    'Agile values',
    'Our product owner',
    'xxx movie plots',
    'Our scrum master',
    'The retro',
    'Our demo',
    'The sprint planning',
    'Edible underwear',
    'The stand-up meeting',
    'Gandalf the magician',
    'The backlog'
  ]
  constructor(private _httpClient: HttpClient) {
  }

  setGameToPlayer() {
    this.mode = GameMode.PLAYER;
  }

  setGameToMaster() {
    this.mode = GameMode.MASTER;
  }

  startGame() {
    this.cardUrls = [];
    this.cardTranslations = [];
    this._httpClient.get(`${this.serverURL}/start`, {responseType: 'text'}).subscribe(() => {
      if (this.mode === GameMode.MASTER) {
        this._httpClient.get(`${this.serverURL}/master`, {responseType: 'text'}).subscribe((card) => {
          this.cardUrls.push(`assets/masterCards/CARDS-FRONT-${card}.png`);
          this.cardTranslations.push(this.translations[+card - 1]);
        });
      } else if (this.mode === GameMode.PLAYER) {
        this._httpClient.get(`${this.serverURL}/player`, {responseType: 'text'}).subscribe((cards) => {
          cards.split(',').forEach(card => {
            this.cardUrls.push(`assets/playerCards/CARDS-FRONT-${card}.png`);
            this.cardTranslations.push(this.translations[+card - 1]);
          });
        });
      }
    });
  }

  resetGame() {
    this._httpClient.get(`${this.serverURL}/reset`, {responseType: 'text'}).subscribe(() => {
      this.cardUrls = [];
      this.cardTranslations = [];
    });
  }
}