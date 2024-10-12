import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFooter, IonImg, LoadingController } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFooter, IonImg, NgFor, NgClass],
})
export class HomePage {
  loading!: HTMLIonLoadingElement;
  languages = [
    { code: 'es', icon: 'assets/idiomas/spain.png' },
    { code: 'en', icon: 'assets/idiomas/eeuu.png' },
    { code: 'pt', icon: 'assets/idiomas/portugal.png' },
  ];

  themes = [
    { code: 'colors', icon: 'assets/temas/colores.png' },
    { code: 'numbers', icon: 'assets/temas/numeros.png' },
    { code: 'animals', icon: 'assets/temas/leon.png' },
  ];

  langCode = 'es';
  themeCode = 'colors';
  
  selectedLanguage = this.langCode;
  selectedTheme = this.themeCode;

  constructor(public authService: AuthService, private router: Router, private loadingCtrl: LoadingController) {
    this.loadingCtrl.create()
      .then(loading => {
        this.loading = loading;
      });
  }

  cerrarSesion() {
    this.loading.present();

    this.authService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .finally(() => {
        this.loading.dismiss();
      });
  }

  changeLanguage(langCode: string) {
    this.langCode = langCode;
    this.selectedLanguage = this.langCode;
  }

  changeTheme(themeCode: string) {
    this.themeCode = themeCode;
    this.selectedTheme = this.themeCode;
  }

  playSound(buttonIndex: number) {
    const audioPath = `assets/sounds/${this.langCode}/${this.themeCode}/${buttonIndex}.ogg`;
    const audio = new Audio(audioPath);

    audio.play();
  }
}
