import { ComponentFactory, ComponentFactoryResolver, EventEmitter, Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type PickKeysByType<T, K> = { [P in keyof T]: T[P] extends K ? P : never }[keyof T]
type PickByType<T, K> = Pick<T, PickKeysByType<T, K>>;

export interface ModalboxOptions {
	modalboxTitle?: string;
	showCloseButton?: boolean;
	clickShadeToClose?: boolean;
}

export interface ModalboxInteractions<T> {
	inputs?: { [prop in keyof T]?: T[prop] };
	outputs?: Partial<PickByType<T, EventEmitter<any>>>;
}

export interface ModalboxProvider<T> {
	modalboxFactory: ComponentFactory<T>;
	modalboxOptions: ModalboxOptions;
	modalboxInteractions: ModalboxInteractions<T>;
}

const defaultModalboxOptions: ModalboxOptions = {
	modalboxTitle: '',
	showCloseButton: true,
	clickShadeToClose: true,
};

@Injectable({
	providedIn: 'root',
})
export class AngularModalboxService {
	
	// PROPERTIES /////////////////////////////////////////////////////////////////////////////////////////////////////
	
	private readonly _modal$ = new BehaviorSubject<Partial<ModalboxProvider<any>> | undefined>(undefined);
	readonly modal$ = this._modal$.asObservable();
	
	// CONSTRUCTOR ////////////////////////////////////////////////////////////////////////////////////////////////////
	
	constructor(
		private readonly _componentFactoryResolver: ComponentFactoryResolver,
	) {}
	
	// ANGULAR HOOKS //////////////////////////////////////////////////////////////////////////////////////////////////
	
	// GETTER / SETTER ////////////////////////////////////////////////////////////////////////////////////////////////
	
	// PUBLIC FUNCTIONS ///////////////////////////////////////////////////////////////////////////////////////////////
	
	create<T>(
		component: Type<T>,
		modalOptions: ModalboxOptions = {},
		modalInteractions: ModalboxInteractions<T> = {},
	) {
		const modalComponentFac = this._componentFactoryResolver.resolveComponentFactory(component);
		
		this._modal$.next({
			modalboxFactory: modalComponentFac,
			modalboxOptions: { ...defaultModalboxOptions, ...modalOptions },
			modalboxInteractions: modalInteractions,
		});
	}
	
	// ----------------------------------------------------------------------------------------------------------------
	
	destroy() {
		this._modal$.next(undefined);
	}
	
	// ----------------------------------------------------------------------------------------------------------------
	
	updateModalboxOptions(
		modalOptions: Partial<ModalboxOptions>,
	) {
		if (
			this._modal$.value
		) {
			this._modal$.next({
				modalboxOptions: {
					...this._modal$.value.modalboxOptions,
					...modalOptions,
				},
			});
		}
	}
	
	// PROTECTED FUNCTIONS ////////////////////////////////////////////////////////////////////////////////////////////
	
	// PRIVATE FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////////////
	
	// EVENT HANDLER //////////////////////////////////////////////////////////////////////////////////////////////////
	
}
