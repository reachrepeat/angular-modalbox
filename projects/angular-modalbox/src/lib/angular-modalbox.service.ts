import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AngularModalboxOptions {
	title?: string;
	showCloseButton?: boolean;
	clickShadeToClose?: boolean;
}

const defaultAngularModalboxOptions: AngularModalboxOptions = {
	title: '',
	showCloseButton: true,
	clickShadeToClose: true,
};

@Injectable({
	providedIn: 'root',
})
export class AngularModalboxService {
	
	// PROPERTIES /////////////////////////////////////////////////////////////////////////////////////////////////////
	
	modalActive$ = new BehaviorSubject<boolean>(false);
	modalOptions: AngularModalboxOptions = defaultAngularModalboxOptions;
	
	private containerId: string = 'ModalboxContent';
	private componentRef: any;
	
	// CONSTRUCTOR ////////////////////////////////////////////////////////////////////////////////////////////////////
	
	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		private applicationRef: ApplicationRef,
		private injector: Injector,
	) {}
	
	// ANGULAR HOOKS //////////////////////////////////////////////////////////////////////////////////////////////////
	
	// GETTER / SETTER ////////////////////////////////////////////////////////////////////////////////////////////////
	
	// PUBLIC FUNCTIONS ///////////////////////////////////////////////////////////////////////////////////////////////
	
	create(
		component: any,
		modalOptions: AngularModalboxOptions = {},
		componentInputs: object = {},
		componentOutputs: object = {},
	) {
		Object.assign(this.modalOptions, modalOptions);
		
		this.modalActive$.next(true);
		
		this.componentRef = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);
		
		for (let [key, value] of Object.entries(componentInputs)) {
			this.componentRef.instance[key] = value;
		}
		
		for (let [key, value] of Object.entries(componentOutputs)) {
			this.componentRef.instance[key] = value;
		}
		
		this.applicationRef.attachView(this.componentRef.hostView);
		
		document
			.getElementById(this.containerId)
			?.appendChild((this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement);
		
		return this.componentRef.instance;
	}
	
	// ----------------------------------------------------------------------------------------------------------------
	
	destroy() {
		this.applicationRef.detachView(this.componentRef.hostView);
		this.componentRef.destroy();
		this.modalOptions = defaultAngularModalboxOptions;
		this.modalActive$.next(false);
	}
	
	// PROTECTED FUNCTIONS ////////////////////////////////////////////////////////////////////////////////////////////
	
	// PRIVATE FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////////////
	
	// EVENT HANDLER //////////////////////////////////////////////////////////////////////////////////////////////////
	
}
