import { inject, Component } from '@angular/core';

// Import components to include in window generation methods
import { ChatComponent } from '../../components/chat/chat.component';
import { DepartmentComponent } from '../../components/department/department.component';
import { PatientComponent } from '../../components/patient/patient.component';
import { WindowManagerService } from '../../services/window-manager.service';

@Component({
  selector: 'app-launch-bar',
  standalone: true,
  imports: [],
  templateUrl: './launch-bar.component.html',
  styleUrl: './launch-bar.component.scss'
})
export class LaunchBarComponent {
  private windowManager: WindowManagerService = inject(WindowManagerService);

  components = [
    {
      component: PatientComponent,
      id: 1,
      title: 'Patients',
      icon: 'person',
      roles: null,
    },
    {
      component: DepartmentComponent,
      id: 2,
      title: 'Department',
      icon: 'building',
      roles: null,
    },
    {
      component: ChatComponent,
      id: 3,
      title: 'Chat',
      icon: 'chat',
      roles: null,
    }
  ]

  launchComponent(id: number) {
    const component = this.components.find(c => c.id === id);
    if (component) {
      this.windowManager.addInstance(component.component, component.title, component.id);
    }
  }

}
