import { Component, AfterViewInit } from '@angular/core';
import Masonry from 'masonry-layout';

@Component({
  selector: 'bootstrap-5',
  templateUrl: './bootstrap-5.html'
})

export class Bootstrap5Page {
	ngAfterViewInit() {
		const msnry = new Masonry('[data-masonry]');
	}
}
