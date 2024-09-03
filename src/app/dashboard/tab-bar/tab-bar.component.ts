import { inject, Component } from '@angular/core';
import { WindowManagerService } from '../../services/window-manager.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './tab-bar.component.html',
  styleUrl: './tab-bar.component.scss'
})
export class TabBarComponent {
  protected windowManager: WindowManagerService = inject(WindowManagerService);

}
