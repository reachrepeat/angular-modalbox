import { Component, ComponentFactory, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularModalboxService, ModalboxOptions, ModalboxProvider } from './angular-modalbox.service';

@Component({
	selector: 'rr-angular-modalbox',
	styleUrls: ['./angular-modalbox.component.scss'],
	templateUrl: './angular-modalbox.component.html',
})
export class AngularModalboxComponent implements OnInit, OnDestroy {
	
	// PROPERTIES /////////////////////////////////////////////////////////////////////////////////////////////////////
	
	@ViewChild('modalboxContainer', { static: true, read: ViewContainerRef }) modalboxContainerReference!: ViewContainerRef;
	
	modalboxActive = false;
	modalboxOptions?: ModalboxOptions;
	modalboxReference?: ComponentRef<any>;
	modalboxFactory?: ComponentFactory<any>;
	
	private _destroyed$: Subject<void> = new Subject<void>();
	
	// CONSTRUCTOR ////////////////////////////////////////////////////////////////////////////////////////////////////
	
	constructor(
		private _modalboxService: AngularModalboxService,
	) {}
	
	// ANGULAR HOOKS //////////////////////////////////////////////////////////////////////////////////////////////////
	
	ngOnDestroy() {
		this._destroyed$.next();
		this._destroyed$.complete();
	}
	
	// ----------------------------------------------------------------------------------------------------------------
	
	ngOnInit() {
		this._modalboxService.modal$
			.subscribe(modalbox => modalbox ? this.loadModalbox(modalbox) : this.resetModalbox());
	}
	
	// GETTER / SETTER ////////////////////////////////////////////////////////////////////////////////////////////////
	
	// PUBLIC FUNCTIONS ///////////////////////////////////////////////////////////////////////////////////////////////
	
	closeModal() {
		this._modalboxService.destroy();
	}
	
	// ----------------------------------------------------------------------------------------------------------------
	
	onShadeClick() {
		if (this.modalboxOptions?.clickShadeToClose) {
			this._modalboxService.destroy();
		}
	}
	
	// PROTECTED FUNCTIONS ////////////////////////////////////////////////////////////////////////////////////////////
	
	// PRIVATE FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////////////
	
	loadModalbox(
		modalbox: Partial<ModalboxProvider<any>>,
	) {
		const {
			modalboxFactory,
			modalboxOptions,
			modalboxInteractions,
		} = modalbox;
		
		if (
			this.modalboxReference === undefined ||
			(
				this.modalboxFactory !== modalboxFactory &&
				modalboxFactory
			)
		) {
			this.modalboxActive = true;
			this.modalboxOptions = modalboxOptions;
			this.modalboxContainerReference.clear();
			this.modalboxReference = this.modalboxContainerReference.createComponent(modalboxFactory);
			
			if (modalboxInteractions?.inputs) {
				for (let [key, value] of Object.entries(modalboxInteractions.inputs)) {
					this.modalboxReference.instance[key] = value;
				}
			}
			
			if (modalboxInteractions?.outputs) {
				for (let [key, value] of Object.entries(modalboxInteractions.outputs)) {
					this.modalboxReference.instance[key] = value;
				}
			}
		}
	}
	
	// ----------------------------------------------------------------------------------------------------------------
	
	resetModalbox() {
		this.modalboxActive = false;
		this.modalboxOptions = undefined;
		this.modalboxContainerReference.clear();
		this.modalboxReference = undefined;
	}
	
}
