import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ComponentInstance {
  id: string;
  component: any;
  componentId: number,
  title: string;
}

interface Index {
  [key: string]: {
    ids: string[];
  };
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

  public index: Index = {
    
  };

  // Should run after every method that affects instances.
  public makeIndex(): void {
    let newIndex: any = {};

    this.instances.forEach(instance => {
      if (newIndex[instance.componentId]) {
        newIndex[instance.componentId.toString()].ids.push([instance.id]);
      } else {
        newIndex[instance.componentId.toString()] = {
          ids: [instance.id]
        }
      }

      // if (instance.id === this.activeInstanceId.value) {
      //   newStats[instance.componentId].active = true;
      // } else {
      //   newStats[instance.componentId].active = false;
      // }
    });

    this.index = newIndex;
    console.log(this.index);
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

    this.makeIndex();

    return newId;
  }

  // 3
  private generateInstanceId(): string {
    return 'instance-' + Math.random().toString(36).substring(2, 15);
  }
}
