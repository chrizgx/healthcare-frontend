import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IndexComponent } from '../components/index/index.component';

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
  public history: string[] = [];
  
  private deleteActivated: boolean = false;

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

  public trackHistory(instanceId: string): void {
    // if (this.history[0] === instanceId) return;
    if (this.history.length > 10) this.history.pop();
    this.history.unshift(instanceId);
  }
  // 1
  // constructor() { }
  private setActiveInstance(instanceId: string): void {
    this.activeInstanceId.next(instanceId);
    this.trackHistory(instanceId);
    this.makeIndex();
  }

  // Since when the tab-bar close button is clicked, the switchActiveInstance method is called too,
  // the deleteActivated flag is used to prevent the setActiveInstance method from being called
  // if the action intended is to delete the instance clicked, and not activate it.
  async switchActiveInstance(instanceId: string): Promise<void> {
    let repeat = 0;
    const cancelSwitch = await new Promise(resolve  => {
      const intervalId = setInterval(() => {
        if (this.deleteActivated) {
          clearInterval(intervalId);
          resolve(true);
        } else if (repeat > 2 * this.instances.length) {
          clearInterval(intervalId);
          resolve(false);
        }
        repeat++;
      }, 10);
    });

    if (cancelSwitch) return;
    if (this.instances.find(i => i.id == instanceId)) {
      this.setActiveInstance(instanceId);
    }
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
  async removeInstance(instanceId: string): Promise<void> {
    this.deleteActivated = true;

    const instanceIndex = this.instances.findIndex(instance => instance.id === instanceId);
    this.instances.splice(instanceIndex, 1);
    
    let newActiveInstanceIndex: number = 0;

    if (this.history.length >= 1 && this.history[0] !== instanceId) {
      newActiveInstanceIndex = this.instances.findIndex(instance => instance.id === this.history[0])
    } else if (this.instances.length > 1) {
      newActiveInstanceIndex = this.instances.length - 1;
    } else if (this.instances.length == 2) {
      newActiveInstanceIndex = 1;
    }

    this.makeIndex();

    if (this.instances.length > 0) {
      this.setActiveInstance(this.instances[newActiveInstanceIndex].id);
    } else {
      this.setActiveInstance('dashboard');
    }

    this.makeIndex();
    this.deleteActivated = false;

  }

  private generateInstanceId(): string {
    return 'instance-' + Math.random().toString(36).substring(2, 15);
  }

  constructor() {
    this.makeIndex();
    // Create index page that is always present and unable to deactivate. The 'x' button is disabled on this type of element.
    this.addInstance(IndexComponent, 'Dashboard', 0);
  }
}
