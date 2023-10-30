import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MenssageService } from 'src/app/shared/notification/notification.service';
import { ConfUserService } from './conf-user.service';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-conf-user',
  templateUrl: './conf-user.component.html',
  styleUrls: ['./conf-user.component.css'],
})
export class ConfUserComponent implements OnInit {
  formulario: FormGroup | undefined;
  userConf;
  parametrosNatOperacao: any[] | undefined;
  selectedNatOperacaoParam;
  editing = false;

  confNatOperacaoDataSource;
  displayedColumns: string[] = ['name', 'active', 'actions'];

  task: Task = {
    name: 'Naturezas de Operação à se considerar nas análises',
    completed: false,
    color: 'primary',
    subtasks: [],
  };

  confName;
  isConfActive;

  allComplete: boolean = false;

  constructor(
    private location: Location,
    private confUserService: ConfUserService,
    private notificationService: MenssageService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
   
  }

  loadActiveConf() {
    const activeConf = this.userConf.parametroNatOperacaoList.find(
      (c) => c.active == true
    );
    if (activeConf) {
      this.loadConfNatOperacao(activeConf.id, activeConf);
    } else {
      this.loadConfNatOperacao(0, {
        active: '',
        name: '',
        nfeProcessaveisList: [],
      });
      this.newConf();
    }
  }

  loadConfNatOperacao(index, config) {
    
  }

  saveConfig() {}

  voltar() {
    this.location.back();
  }

  updateAllComplete() {
    this.allComplete =
      this.task.subtasks != null &&
      this.task.subtasks.every((t) => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return (
      this.task.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach((t) => (t.completed = completed));
  }

  newConf() {
    this.selectedNatOperacaoParam = null;
    this.setAll(false);
    this.confName = '';
    this.isConfActive = false;
    this.editing = true;
  }

  cancelNewConf() {
    this.loadData();
  }

  selectedRowIndex;
  highlight(row) {
    let newIndex = row.id;
    if (newIndex == this.selectedRowIndex) {
      this.selectedRowIndex = -1;
    } else {
      this.selectedRowIndex = newIndex;
      this.loadConfNatOperacao(newIndex, row);
    }
  }

  ativar(item) {}

  remove(item) {}
}
