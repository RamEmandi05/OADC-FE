import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ui-icon-simple-line-icons',
  templateUrl: './icon-simple-line-icons.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './icon-simple-line-icons.css' ]
})

export class UIIconSimpleLineIconsPage {
	code = `<!-- css -->
@import "~simple-line-icons/css/simple-line-icons.css";

<!-- icon -->
<i class="icon-user"></i>`;
}
