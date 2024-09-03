import { Component } from '@angular/core';
import { TabBarComponent } from './tab-bar/tab-bar.component';
import { WindowComponent } from './window/window.component';
import { LaunchBarComponent } from './launch-bar/launch-bar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TabBarComponent, WindowComponent, LaunchBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
