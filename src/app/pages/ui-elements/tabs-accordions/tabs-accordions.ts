import { Component } from '@angular/core';

@Component({
  selector: 'ui-tabs-accordions',
  templateUrl: './tabs-accordions.html'
})

export class UITabsAccordionsPage {

	code1 = `<ul class="nav nav-tabs">
  <li class="nav-item">
    <a href="#default-tab-1" data-bs-toggle="tab" class="nav-link active">Tab 1</a>
  </li>
</ul>
<div class="tab-content panel p-3 rounded-0 rounded-bottom">
  <div class="tab-pane fade active show" id="default-tab-1">
    ...
  </div>
</div>`;

	code2 = `<ul class="nav nav-pills">
  <li class="nav-item">
    <a href="#default-tab-1" data-bs-toggle="tab" class="nav-link active">Tab 1</a>
  </li>
</ul>

<div class="tab-content panel p-3 rounded">
  <div class="tab-pane fade active show" id="default-tab-1">
    ...
  </div>
</div>`;
	
	code3 = `<div class="accordion" id="accordion">
  <div class="accordion-item border-0">
    <div class="accordion-header" id="headingOne">
      <button class="accordion-button bg-gray-900 text-white px-3 py-10px pointer-cursor" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
        <i class="fa fa-circle fa-fw text-blue me-2 fs-8px"></i> Collapsible Group Item #1
      </button>
    </div>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordion">
      <div class="accordion-body bg-gray-800 text-white">
        ...
      </div>
    </div>
  </div>
  ...
</div>`;
}
