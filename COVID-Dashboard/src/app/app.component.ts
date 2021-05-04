import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { YoutubeService } from './youtube.service';
import { OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'COVID-Dashboard';
  /*
  videos: any[];
  constructor(private spinner: NgxSpinnerService, private youTubeService: YoutubeService) { }
  ngOnInit() {
    this.spinner.show()

    setTimeout(() => 
    {
      this.spinner.hide()
    }, 3000)

    this.videos = [];

    this.youTubeService.getVideo('UC_LtA_EtCr7Jp5ofOsYt18g', 3.).pipe(takeUntil(this.unsubscribe$)).subscribe(lista => {
      for (let element of lista["items"]) {
        this.videos.push(element)
      }
    });
  }
  */
}
