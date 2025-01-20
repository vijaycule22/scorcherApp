import { Component, Input } from "@angular/core";
import { SelectItemGroup, TreeNode } from "primeng/api";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { TeamsService } from "../teams-page/teams.service";

interface Country {
  name: string;
  code: string;
}

// status.enum.ts
export enum Status {
  Active = 0,
  Inactive = 1,
  Suspended = 2,
}

@Component({
  selector: "app-players-page",
  standalone: false,

  templateUrl: "./players-page.component.html",
  styleUrl: "./players-page.component.scss",
})
export class PlayersPageComponent {
  @Input() players: any[] = [];
  @Input() playing11: any[] = [];
  @Input() isAdmin: boolean = false;

  constructor(public teamService: TeamsService) {}

  ngOnInit() {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
