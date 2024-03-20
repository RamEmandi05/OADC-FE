import { Component } from '@angular/core';

@Component({
  selector: 'ui-modal-notification',
  templateUrl: './modal-notification.html'
})

export class UIModalNotificationPage {
  code1 = `<!-- toggler -->
<a href="#modal-dialog" class="btn btn-primary" data-bs-toggle="modal">Modal</a>

<!-- #modal-dialog -->
<div class="modal fade" id="modal-dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Modal Dialog</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <a href="javascript:;" class="btn btn-white" data-bs-dismiss="modal">Close</a>
        <a href="javascript:;" class="btn btn-success">Action</a>
      </div>
    </div>
  </div>
</div>`;
  
  code2 = `// modal-notification.html
<a href="javascript:;" [swal]="['Question Type', 'description here', 'question']" class="btn btn-primary">Primary</a>`;
}
