import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularModalboxComponent } from './angular-modalbox.component';
import { AngularModalboxHeaderComponent } from './components/angular-modalbox-header/angular-modalbox-header.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		AngularModalboxComponent,
		AngularModalboxHeaderComponent,
	],
	exports: [
		AngularModalboxComponent,
	],
})
export class AngularModalboxModule {}
