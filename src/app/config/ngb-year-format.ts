import {
    NgbDate, NgbDateParserFormatter, NgbDateStruct, NgbCalendar,
    NgbDateAdapter,NgbDatepickerConfig
  } from '@ng-bootstrap/ng-bootstrap';

export function ngbDateConfiguration() {
    const ngbDateConfig = new NgbDatepickerConfig();
    ngbDateConfig.minDate = {year: 1950, month: 1, day: 1};
    ngbDateConfig.maxDate = {year: 2035, month: 12, day: 31};
    return ngbDateConfig;
}