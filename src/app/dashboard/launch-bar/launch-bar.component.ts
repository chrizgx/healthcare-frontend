import { inject, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';

// Import components to include in window generation methods
import { ChatComponent } from '../../components/chat/chat.component';
import { DepartmentComponent } from '../../components/department/department.component';
import { PatientComponent } from '../../components/patient/patient.component';
import { WindowManagerService } from '../../services/window-manager.service';

@Component({
  selector: 'app-launch-bar',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './launch-bar.component.html',
  styleUrl: './launch-bar.component.scss'
})
export class LaunchBarComponent {
  protected windowManager: WindowManagerService = inject(WindowManagerService);

  components = [
    {
      component: PatientComponent,
      id: 1,
      title: 'Patients',
      icon: 'person',
      roles: null,
      maxInstances: 5,
    },
    {
      component: DepartmentComponent,
      id: 2,
      title: 'Department',
      icon: 'building',
      roles: null,
      maxInstances: 1,
    },
    {
      component: ChatComponent,
      id: 3,
      title: 'Chat',
      icon: 'chat',
      roles: null,
      maxInstances: 1,
    }
  ]

  launchComponent(id: number) {
    const component = this.components.find(c => c.id === id);
    if (component && this.launchCheck(id)) {
      this.windowManager.addInstance(component.component, component.title, component.id);
    }
  }

  // TODO: Show message based on condition
  launchCheck(id: number): boolean {
    const maxInstances = this.components[id-1].maxInstances;
    let idCounter: string[] = [];
    let counter: number = 0;

    for (const instance of this.windowManager.instances) {
      if (instance.componentId == id) idCounter.push(instance.id);
      counter++;
    }

    // For 1-instance-only components, switch to component's window
    if (maxInstances == 1 && idCounter.length == 1 ) this.windowManager.switchActiveInstance(idCounter[0]);

    return (counter < 12 && idCounter.length < maxInstances);
  }

}
