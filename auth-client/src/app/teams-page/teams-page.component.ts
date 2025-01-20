import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { TeamsService } from "./teams.service";

@Component({
  selector: "app-teams-page",
  standalone: false,

  templateUrl: "./teams-page.component.html",
  styleUrl: "./teams-page.component.scss",
})
export class TeamsPageComponent {
  teams!: any[];
  visible: boolean = false;
  isAdmin: boolean = false;
  players: any[] = [];
  playing11: any[] = [];

  selectedTeam!: any;

  constructor(
    private teamService: TeamsService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    console.log("init");
    this.getTeams();
  }

  getTeams() {
    try {
      this.teamService.getTeams().subscribe({
        next: (response) => {
          this.teams = [];
          this.teams = response;
        },
        error: (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.message,
          });
        },
      });
    } catch (error) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
      });
    }
  }

  selectProduct(product: any) {
    this.messageService.add({
      severity: "info",
      summary: "Product Selected",
      detail: product.name,
    });
  }

  addTeam() {
    console.log("add team");
  }

  onTeamChange(event: any) {
    try {
      console.log(event);
      this.teamService.getPlayersByTeam(event.id).subscribe((data) => {
        this.players = [];
        this.playing11 = [];
        data.map((player: any) => {
          if (!player.is_playing11) {
            this.players.push(player);
          } else {
            //check playing position and add to playing11
            if (
              player.playing11_position >= 1 &&
              player.playing11_position <= 11
            ) {
              this.playing11[player.playing11_position - 1] = player;
            }
          }
        });
      });
    } catch (error) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
      });
    }
  }

  showDialog() {
    this.visible = true;
  }
}
