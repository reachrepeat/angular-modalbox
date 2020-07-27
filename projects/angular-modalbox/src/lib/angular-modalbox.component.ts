import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AngularModalboxOptions, AngularModalboxService } from './angular-modalbox.service';

@Component({
	selector: 'rr-angular-modalbox',
	styleUrls: ['./angular-modalbox.component.scss'],
	templateUrl: './angular-modalbox.component.html',
})
export class AngularModalboxComponent implements OnInit, OnDestroy {
	
	// PROPERTIES /////////////////////////////////////////////////////////////////////////////////////////////////////
	
	modalboxActive = false;
	modalboxOptions!: AngularModalboxOptions;
	
	private _destroyed$: Subject<void> = new Subject<void>();
	
	// CONSTRUCTOR ////////////////////////////////////////////////////////////////////////////////////////////////////
	
	constructor(
		private modalboxService: AngularModalboxService,
	) {
	}
	
	// ANGULAR HOOKS //////////////////////////////////////////////////////////////////////////////////////////////////
	
	ngOnDestroy() {
		this._destroyed$.next();
		this._destroyed$.complete();
	}
	
	// ----------------------------------------------------------------------------------------------------------------
	
	ngOnInit() {
		this.modalboxService.modalActive$
			.pipe(takeUntil(this._destroyed$))
			.subscribe(modalActive => {
				this.modalboxActive = modalActive;
				this.modalboxOptions = this.modalboxService.modalOptions;
			});
	}
	
	// GETTER / SETTER ////////////////////////////////////////////////////////////////////////////////////////////////
	
	// PUBLIC FUNCTIONS ///////////////////////////////////////////////////////////////////////////////////////////////
	
	closeModal() {
		this.modalboxService.destroy();
	}
	
	// PROTECTED FUNCTIONS ////////////////////////////////////////////////////////////////////////////////////////////
	
	// PRIVATE FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////////////
	
	// EVENT HANDLER //////////////////////////////////////////////////////////////////////////////////////////////////
	
	onShadeClick() {
		if (
			this.modalboxService.modalOptions.clickShadeToClose
		) {
			this.closeModal();
		}
	}
	
}
