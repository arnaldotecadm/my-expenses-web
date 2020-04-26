import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "app/user/user.service";
import { Usuario } from "app/user/user.interface";
import { switchMap } from "rxjs/operators";
import { Observable } from "rxjs";

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: "user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  public users$: Observable<Usuario[]>;

  constructor(private router: Router, private userService: UserService) {}

  addNewUser() {
    this.router.navigate(["/user"]);
  }

  edit(usuarioId: number) {
    this.router.navigate(["/user", { usuarioId: usuarioId }]);
  }

  remove(usuarioId: number) {
    if (confirm("Você deseja realmente excluir o Usuário selecionado?")) {
      this.users$ = this.userService.removeById(usuarioId).pipe(
        switchMap(() => {
          return this.userService.getAll();
        })
      );
    }
  }

  ngOnInit() {
    this.users$ = this.userService.getAll();
  }

  alert(val) {
    console.log(val);
  }
}