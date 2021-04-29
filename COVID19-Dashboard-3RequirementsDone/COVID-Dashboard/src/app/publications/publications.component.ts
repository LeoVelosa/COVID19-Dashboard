import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 2,
          Abstracts: {cols: 2, rows: 2},
          Visualization: {cols: 2, rows: 2}
        };
      }
      return {
        columns: 2,
        Abstracts: {cols: 1, rows: 2},
        Visualization: {cols: 1, rows: 2}
      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
