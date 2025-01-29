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
  @Input() teamId: any;
  @Input() userId: any;
  savePlaying11Data: any = {};  

  constructor(public teamService: TeamsService) {}

  ngOnInit() {}

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    
    this.updatePlaying11Positions();
    this.preparePlaying11Data();
  }
  
  private updatePlaying11Positions(): void {
    this.playing11.forEach((player: any, index: number) => {
      player.playing11_position = index + 1;
    });
  }
  
  private preparePlaying11Data(): void {
    this.savePlaying11Data = {
      teamId: this.teamId,
      userId: this.userId,
      players: this.playing11.map((player: any, index: number) => ({
        playerId: player.id,
        playing11Position: index + 1,
      }))
    };
    console.log(this.savePlaying11Data);
  }

  savePlaying11(){
    this.teamService.savePlaying11(this.savePlaying11Data).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  
}
