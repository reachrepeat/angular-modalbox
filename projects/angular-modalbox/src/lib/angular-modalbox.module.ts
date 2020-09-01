import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularModalboxComponent } from './angular-modalbox.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		AngularModalboxComponent,
	],
	exports: [
		AngularModalboxComponent,
	],
})
export class AngularModalboxModule {}
