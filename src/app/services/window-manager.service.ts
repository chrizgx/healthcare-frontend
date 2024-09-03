import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ComponentInstance {
  id: string;
  component: any;
  componentId: number,
  title: string;
}


@Injectable({
  providedIn: 'root'
})
export class WindowManagerService {

  public instances: ComponentInstance[] = [];
  private activeInstanceId = new BehaviorSubject<string | null>(null);
  public get activeInstance$() {
    return this.activeInstanceId.asObservable();
  }

  // 1
  // constructor() { }
  setActiveInstance(instanceId: string): void {
    this.activeInstanceId.next(instanceId);
  }

  //2
  addInstance(componentType: any, title: string, cid: number): string {
    const newId = this.generateInstanceId();

    const newInstance: ComponentInstance = {
      id: newId,
      component: componentType,
      componentId: cid,
      title: title
    };

    this.instances.push(newInstance);
    this.setActiveInstance(newId);

    console.log(this.instances);

    return newId;
  }

  // 3
  private generateInstanceId(): string {
    return 'instance-' + Math.random().toString(36).substring(2, 15);
  }
}
