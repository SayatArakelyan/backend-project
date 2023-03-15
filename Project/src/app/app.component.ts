import {Component} from '@angular/core';
import {AppHelperService} from '@services/app-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Project';
  isCollapsed = false;

  constructor(private helper: AppHelperService) {
    this.helper.setIp();
  }
}
