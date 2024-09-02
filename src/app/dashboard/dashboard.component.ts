import { Component } from '@angular/core';
import { LaunchBarComponent } from './launch-bar/launch-bar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LaunchBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
