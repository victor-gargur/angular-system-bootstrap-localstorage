import { Component, Injectable } from '@angular/core';
import { AlertaService } from './alerta.service';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class AlertaComponent {
  constructor(public alertaService: AlertaService) {}
}
