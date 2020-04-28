import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { RecordMeta } from '../classes/record-meta';
import { LocalStorageService } from './local-storage.service';
import { tap, map, switchMap, mergeMap } from 'rxjs/operators';
import { DailyRecords } from '../classes/daily-records';
import { OverviewDailyCard } from '../classes/overview-daily-card';
import { UserData } from '../interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private recordMetaList = new BehaviorSubject<RecordMeta[]>([]);
  public recordMetaList$ = this.recordMetaList.asObservable();

  public dailyRecords$ = this.recordMetaList$.pipe(
    map(recordMetaList => (recordMetaList) ? recordMetaList : []),
    switchMap(recordMetaList => this.localStorage.getRecords(recordMetaList)),
    map(records => new DailyRecords(records)),
    tap(res=>console.log("tAp:dailyRecords",res))
  );
  // public dailydrips$ = this.recordMetaList$.pipe(
  //   map(recordMetaList => (recordMetaList) ? recordMetaList : []),
  //   switchMap(recordMetaList => this.localStorage.getRecords(recordMetaList)),
  //   map(records => new DailyRecords(records)),
  //   tap(res=>console.log("tAp:dailydripsA",res)),
  //   switchMap(records =>records.list ),
  //   tap(res=>console.log("tAp:dailydripsB",res)),
  //   mergeMap(
  //     val => myPromise(val),
  //     (valueFromSource, valueFromPromise) => {
  //       return `Source: ${valueFromSource}, Promise: ${valueFromPromise}`;
  //     }
  //   )
  // );
  public dailydrips$ = this.recordMetaList$.pipe(
    map(recordMetaList => (recordMetaList) ? recordMetaList : []),
    switchMap(recordMetaList => this.localStorage.getRecords(recordMetaList)),
    map(records => records.length),
  );
      // return records.list.map((index => { index.records.length}))


  public overviewCards$ = this.dailyRecords$.pipe(
    map(dailyRecords => {
      return dailyRecords.list
        .map(dailyRecord => new OverviewDailyCard(dailyRecord))
        .filter(card => card.hasData === true);
    }),
    tap(res=>console.log("tAp:overviewCards",res))
  );

  private userData = new BehaviorSubject<UserData>({ newUser: true, eulaAccepted: false });
  public userData$ = this.userData.asObservable();

  constructor(
    private localStorage: LocalStorageService,
  ) {
    this.updateRecordMetaList().subscribe(); // Initial update (load from storage)
  }

  updateRecordMetaList(recordMetaList?: RecordMeta[]): Observable<RecordMeta[]> {
    const loadList$ = this.localStorage.getRecordMetaList();
    const saveList$ = this.localStorage.saveRecordMetaList(recordMetaList);
    const update$ = (recordMetaList) ? saveList$ : loadList$;
    return update$.pipe(
      tap((list: RecordMeta[]) => this.recordMetaList.next(list)),
    );
  }

  updateUserData(userData?: UserData): Observable<UserData> {
    const load$ = this.localStorage.getUserData();
    const save$ = this.localStorage.saveUserData(userData);
    const update$ = (userData) ? save$ : load$;
    return update$.pipe(
      tap((data: UserData) => this.userData.next(data)),
    );
  }

}
