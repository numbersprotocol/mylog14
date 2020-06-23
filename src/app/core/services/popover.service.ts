import { Injectable } from '@angular/core';
import { Observable, defer } from 'rxjs';
import { PopoverComponent } from '../components/popover/popover.component';
import { PopoverController } from '@ionic/angular';
import { switchMap, delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  constructor(
    private readonly popoverCtrl: PopoverController,
  ) { }

  showPopover(componentProps: PopoverProps, dismissTime?: number): Observable<any> {
    return this.createPopover(componentProps)
      .pipe(
        switchMap(popover => this.presentPopover(popover, dismissTime)),
      );
  }

  showPopoverManualDismiss(componentProps: PopoverProps): Observable<HTMLIonPopoverElement> {
    return this.createPopover(componentProps)
      .pipe(
        switchMap(popover => this.presentPopoverManualDismiss(popover)),
      );
  }

  private createPopover(componentProps: PopoverProps): Observable<HTMLIonPopoverElement> {
    return defer(() => this.popoverCtrl.create({
      component: PopoverComponent,
      componentProps,
      animated: false,
    }));
  }

  private presentPopover(popover: HTMLIonPopoverElement, dismissTime?: number): Observable<any> {
    const manualDismiss$ = defer(() => popover.present())
      .pipe(
        switchMap(() => popover.onDidDismiss()),
      );
    const autoDismiss$ = defer(() => popover.present())
      .pipe(
        delay(dismissTime),
        switchMap(() => popover.dismiss()),
      );
    return (dismissTime) ? autoDismiss$ : manualDismiss$;
  }

  private presentPopoverManualDismiss(popover: HTMLIonPopoverElement): Observable<HTMLIonPopoverElement> {
    return defer(() => popover.present())
      .pipe(
        map(() => popover),
      );
  }
}

export const enum PopoverIcon {
  CHECK = 'check',
  CONFIRM = 'confirm',
  EMPTY = 'empty',
  FAIL = 'fail',
  LOADING = 'loading',
  SORRY = 'sorry',
  VERIFICATION = 'verification',
}

export const enum PopoverButtonSet {
  CONFIRM = 'confirm',
  NONE = 'none', // NOT IMPLEMENTED
}

export interface PopoverProps {
  i18nTitle: string;
  icon?: PopoverIcon;
  i18nMessage?: string;
  i18nExtraMessage?: string;
  buttonSet?: PopoverButtonSet;
  onConfirm?: () => { };
  onCancel?: () => { };
}
