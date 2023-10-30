import { Component, OnInit } from "@angular/core";
import { ConfUserService } from "../conf-user.service";
import { MenssageService } from "src/app/shared/notification/notification.service";
import { MustConfirm } from "src/app/decorators/must-confirm.decorators";

@Component({
  selector: "app-manutencao-registros",
  templateUrl: "./manutencao-registros.component.html",
  styleUrls: ["./manutencao-registros.component.css"],
})
export class ManutencaoRegistrosComponent implements OnInit {
  tipoCadastriList;

  constructor(
    private confUserService: ConfUserService,
    private notificationService: MenssageService
  ) {}

  ngOnInit(): void {
    this.confUserService.getEstatisticaUtilizacao().subscribe((data: any) => {
      this.tipoCadastriList = data.map( i => 
        ({
          labelCadastro: i.labelEntry,
          qtd: i.qty,
          labelBotao: i.labelButton,
          tipoCadastro: i.entryType,
        })
      )
    });
  }

  @MustConfirm("Deseja realmente excluir todas os Registros?")
  executarAcao(item) {
    switch (item.tipoCadastro) {
      case "TRANSACTIONS":
        {
          this.confUserService.deleteAllTransactions()
          .subscribe( () => {
            this.notificationService.showSucess("All transactions have been deleted")
            window.location.reload()
          })
        }
        break;
    }
  }
}
