import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpService } from './core/services/http-service/http.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule],
  providers: [HttpService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'front-end';
}
