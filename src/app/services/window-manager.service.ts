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
    active: boolean;
  };
}


@Injectable({
  providedIn: 'root'
})
export class WindowManagerService {

  public instances: ComponentInstance[] = [];
  // addInstance()
  private activeInstanceId = new BehaviorSubject<string>('null');

  public get activeInstance$() {
    return this.activeInstanceId.asObservable();
  }

  public index: Index = {};

  // Should run after every method that affects instances.
  public makeIndex(): void {
    let newIndex: any = {};

    for (let i = 0; i < 12; i++) {
      newIndex[i.toString()] = {
        ids: [],
        active: false,
      };
    }

    this.instances.forEach(instance => {
      if (newIndex[instance.componentId]) {
        newIndex[instance.componentId.toString()].ids.push([instance.id]);
      } else {
        newIndex[instance.componentId.toString()] = {
          ids: [instance.id]
        }
      }

      

      if (instance.id === this.activeInstanceId.value) {
        newIndex[instance.componentId].active = true;
      }

    });

    this.index = newIndex;
    console.log(this.index);
  }
  // 1
  // constructor() { }
  setActiveInstance(instanceId: string): void {
    this.activeInstanceId.next(instanceId);
    this.makeIndex();
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

  constructor() {
    this.makeIndex();
  }
}
