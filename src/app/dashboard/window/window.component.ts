import { Component, inject } from '@angular/core';
import { NgIf, NgFor, AsyncPipe, NgComponentOutlet } from '@angular/common';
import { WindowManagerService } from '../../services/window-manager.service';


@Component({
  selector: 'app-window',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, NgComponentOutlet],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss'
})
export class WindowComponent {
  windowManager: WindowManagerService = inject(WindowManagerService);
  instances = this.windowManager.instances;
}
