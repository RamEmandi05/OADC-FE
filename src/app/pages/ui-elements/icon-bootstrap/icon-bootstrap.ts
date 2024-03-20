import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ui-icon-bootstrap',
  templateUrl: './icon-bootstrap.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./icon-bootstrap.css'] 
})

export class UIIconBootstrapPage {
	code1 = `@import "~bootstrap-icons/font/bootstrap-icons.css";

<!-- icon -->
<i class="bi bi-person"></i>`;
}
