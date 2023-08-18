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
  rulesVisible = false;
  selectedImage: number | undefined;

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
    'The backlog',
    'The story points',
    'Doing nothing',
    'The grooming',
    'Send sexting',
    'The holy bible',
    'MVP approach',
    'Abstinence',
    'Human rights',
    'Pascal our agile coach',
    'My genitals',
    'Continous improvement',
    'Our IT department',
    'Hope',
    'Arnaud the hipster',
    'The hormone injections',
    'Visual management',
    'Surprise sex',
    'Kervin our client',
    'Listening skills',
    'Catalyst processing',
    'A scrum life episod',
    'The velocity of our time is like [ HU HU HU ], it\'s useless',
    '[ HU HU HU ] like everything else, there\'s theory and practice',
    'In the evening I drink to forget: [ HU HU HU ]',
    'If I was the CIO, I would authorize [ HU HU HU ]',
    'God bless France and [ HU HU HU ]',
    'Our sprint was totally ruined by [ HU HU HU ]',
    'Next week on "question politique" the topic will be "how to explain to your child...". [ HU HU HU ]',
    'On this project [ HU HU HU ] gets better with age',
    'During lovemaking I like to think [ HU HU HU ]',
    'Our customer dreams of [ HU HU HU ]',
    'Oops! I\'ve just ruined [ HU HU HU ]',
    'Our management finally recognizes the positive effect of [ HU HU HU ]',
    'A study has just shown that chimpanzees have developed a primitive version of the [ HU HU HU ]',
    'This month in Gala: "Spice up your sex life by trying [ HU HU HU ]',
    'Before [ HU HU HU ] life was hard !',
    '[ HU HU HU ] Impossible to do without',
    'Rumor has it that the preferred indicator for [ HU HU HU ] is [ HU HU HU ]',
    'The last thing our scrum master thought about before leaving was [ HU HU HU ]',
    'But before I kill you, Mister Bond, I must show you [ HU HU HU ]',
    'My grandmother found [ HU HU HU ] disturbing at first, but then strangely pleasant.',
    'For flirting, I\'m talking about [ HU HU HU ]',
    'When I was a kid, I loved [ HU HU HU ], but now I prefer [ HU HU HU ].',
    'In retrospective, I like to think of [ HU HU HU ]',
    'Our team delivered [ HU HU HU ] for the last release',
    'The product owner presented us [ HU HU HU ] at the last sprint planning meeting ',
    'During his mid-life crisis, our agile coach became interested in [ HU HU HU ]',
    'You won`\'t see anything until you try [ HU HU HU ] and [ HU HU HU ] at the same time',
    'Before [ HU HU HU ], all we had was [ HU HU HU ]',
    '[ HU HU HU ] ? I can\'t do without it',
    'It is said that the Vatican has a secret room specially dedicated to [ HU HU HU ]',
    'Our users love [ HU HU HU ]'    
  ]
  constructor(private _httpClient: HttpClient) {
  }

  setGameToPlayer() {
    this.mode = GameMode.PLAYER;
  }

  showRules() {
    this.rulesVisible = !this.rulesVisible;
  }

  setGameToMaster() {
    this.mode = GameMode.MASTER;
  }

  startGame() {
    this.cardUrls = [];
    this.cardTranslations = [];
    this.selectedImage = undefined;
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
      this.selectedImage = undefined;
    });
  }

  imageSelected(index: number) {
    this.selectedImage = index;
  }
}