import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Vector2 } from '../models/vector2.model';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {

  contextMenuOpen: BehaviorSubject<boolean>; 
  clickPosition: BehaviorSubject<Vector2>;

  constructor() {
    this.contextMenuOpen = new BehaviorSubject<boolean>(false);
    this.clickPosition = new BehaviorSubject<Vector2>({x: 0, y: 0});
  }

  openContextMenu(event) {
    if (!this.contextMenuOpen.getValue()) {
      console.log("open context menu");
      this.contextMenuOpen.next(true);

      this.clickPosition.next({x: event.clientX, y: event.clientY});
    }
  }

  closeContextMenu() {
    console.log("close context menu");
    this.contextMenuOpen.next(false);
  }
}