import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridWeek from '@fullcalendar/timegrid';
import { ViewApi } from 'fullcalendar';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { MenssageService } from 'src/app/shared/notification/notification.service';
import { ModalAgendamentoComponent } from './modal-agendamento/modal-agendamento.component';
import { PlanningService } from './planning.service';
import { MustConfirm } from 'src/app/decorators/must-confirm.decorators';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
  providers: [CurrencyPipe],
})
export class PlanningComponent implements OnInit {
  calendar!: Calendar;
  planningSummary$!: Observable<any>;
  currentView: ViewApi | undefined;

  constructor(
    public dialog: MatDialog,
    private service: PlanningService,
    private currencyPipe: CurrencyPipe,
    private messageService: MenssageService
  ) {}

  ngOnInit(): void {
    const calendarEl = document.getElementById('calendar');
    this.calendar = new Calendar(calendarEl!!, {
      plugins: [dayGridPlugin, timeGridWeek, interactionPlugin],
      initialView: 'dayGridMonth',
      height: 700,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay',
      },
      showNonCurrentDates: false,
      selectable: true,
      themeSystem: 'Lux',
      editable: false,
      titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
      businessHours: {
        daysOfWeek: [1, 2, 3, 4, 5],
      },
      dateClick: (args) => {
        this.dayClick(args.date, args.dateStr, args.jsEvent, args.view);
      },
      eventClick: (args) => {
        this.openDialog(args.event.extendedProps);
      },
      eventContent: function (info) {
        return { html: info.event.title };
      },
      eventDrop: (args) => {
        const props = args.event.extendedProps;
        const formData = {
          uuid: props['uuid'],
          date: args.event.startStr,
          item: props['item'],
          amount: props['amount'],
          payed: props['payed'],
          amountPayed: props['amountPayed'],
        };
        this.service.save(formData).subscribe(() => this.carregarEventos());
      },
      datesSet: (arg) => {
        const startDate = moment(arg.view.currentStart).format('YYYY-MM-DD');
        const endDate = moment(arg.view.currentEnd)
          .subtract(1, 'd')
          .format('YYYY-MM-DD');
        this.loadSummary(startDate, endDate);
        this.currentView = arg.view;
      },
    });
    this.calendar.render();
    this.carregarEventos();
  }

  loadSummary(startDate, endDate) {
    this.planningSummary$ = this.service.getPlanningSummary(startDate, endDate);
  }

  dayClick(date: Date, dateStr, jsEvent, activeView: ViewApi) {
    this.openDialog({ date: date });
  }

  openDialog(info): void {
    const dialogRef = this.dialog.open(ModalAgendamentoComponent, {
      width: '850px',
      data: {
        info: info,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.state == 'SUCCESS') {
          const startDate = moment(this.calendar.view.currentStart).format(
            'YYYY-MM-DD'
          );
          const endDate = moment(this.calendar.view.currentEnd)
            .subtract(1, 'd')
            .format('YYYY-MM-DD');
          this.carregarEventos();
          this.loadSummary(startDate, endDate);
        }
      }
    });
  }

  carregarEventos() {
    this.calendar.removeAllEvents();
    this.service.getAll().subscribe((planning: any[]) => {
      planning.forEach((plan) => {
        if (!this.calendar.getEventById('' + plan.uuid)) {
          this.calendar.addEvent({
            date: plan.date.toString().substring(0, 10),
            id: plan.uuid,
            editable: true,
            title:
              '<b>' +
              plan.item +
              '</b>' +
              '<div style="display: flex;justify-content: space-between; padding: 1%; line-height: normal">' +
              '<div>Amount:</div>' +
              '<div>' +
              this.currencyPipe.transform(plan.amount) +
              '</div>' +
              '</div>',
            backgroundColor: plan.payed ? '#067321b0' : '#fb0000b0',

            extendedProps: {
              uuid: plan.uuid,
              amount: plan.amount,
              item: plan.item,
              date: plan.date.toString().substring(0, 10),
              payed: plan.payed,
              amountPayed: plan.amountPayed,
            },
          });
        }
      });
    });
  }

  copyOverEvents() {
    if (this.currentView?.type != 'dayGridMonth') {
      this.messageService.showError('Operation just allowed in Monthly view!');
      return;
    }
    const yearMonth = moment(this.currentView.currentStart).format('YYYY-MM');
    this.service.copyOver(yearMonth).subscribe((data) => {
      this.carregarEventos();
    });
  }

  @MustConfirm("Are you sure you want to delete all events that have been copied over?")
  cleanUpEventsForTheMonth() {
    if (this.currentView?.type != 'dayGridMonth') {
      this.messageService.showError('Operation just allowed in Monthly view!');
      return;
    }

    const yearMonth = moment(this.currentView.currentStart).format('YYYY-MM');
    this.service.cleanUpCopyOver(yearMonth).subscribe(() => {
      this.carregarEventos();
    });
  }
}
