/**
 * Created by Haifa GHIDHAOUI on 09/12/16.
 */
import {Directive, ComponentFactoryResolver, ComponentFactory, ComponentRef} from '@angular/core';

import {ViewContainerRef} from '@angular/core';
import {PaletteComponent} from './palette.component';

@Directive({
    selector: '[dialogAnchor]'
})
export class DialogAnchorDirective {
    constructor(
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    createDialog(paletteComponent: { new(): PaletteComponent }): ComponentRef<PaletteComponent> {
        this.viewContainer.clear();

        let paletteComponentFactory =
            this.componentFactoryResolver.resolveComponentFactory(paletteComponent);
        let paletteComponentRef = this.viewContainer.createComponent(paletteComponentFactory);

        (paletteComponentRef.instance as any).close.subscribe(() => {
            paletteComponentRef.destroy();
        });

        return paletteComponentRef;
    }
}
