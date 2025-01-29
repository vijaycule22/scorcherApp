import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { TeamsService } from "./teams.service";
import { AuthService } from "../services/auth.service";

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
  nonPlaying11: any[] = [];
  playing11: any[] = [];
  currentUser: any;
  playing11s: any[] = [];
  teamId!: any;

  selectedTeam!: any;

  constructor(
    private teamService: TeamsService,
    private messageService: MessageService,
    private authservice: AuthService
  ) {}

  async ngOnInit() {
    console.log("init");
    await this.getTeams();
    this.currentUser = this.authservice.getCurrentUserData();
    console.log(this.playing11s);
  }

  async getPlaying11s() {
    try{
      this.teamService.getPlaying11ByUser(this.currentUser.id).subscribe({
        next: (response) => {
          this.playing11s = response;
          console.log(this.players);
          this.playing11s.map((player: any) => {
            if (player.team_id === this.teamId) {
              console.log(this.getPlayerById(player.player_id));
              this.playing11[player.playing11_position - 1] = this.getPlayerById(player.player_id); 
            }
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.message,
          });
        },
      });
    }
    catch (error) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
      });
    }
  }

  getPlayerById(id: any) {
    return this.players.find((player) => player.id === id);
  }
    

 async getTeams() {
    try {
      await this.teamService.getTeams().subscribe({
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

  async onTeamChange(event: any) {
    try {
      this.teamId = event.id;
      console.log(event);
      await this.teamService.getPlayersByTeam(event.id).subscribe((data) => {
        this.players = [];
        this.playing11 = [];
        data.map((player: any) => {
          this.players.push(player);
          if (!player.is_playing11) {
            this.nonPlaying11.push(player);
          }
           else {
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
      await this.getPlaying11s();
    
      console.log(this.playing11);
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
