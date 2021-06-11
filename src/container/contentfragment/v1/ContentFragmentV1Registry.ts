import {ComponentType} from "react";
import {ContentFragmentV1Properties} from "./model";
import {ComponentMapping, MapTo} from "@adobe/aem-react-editable-components";

export interface ContentFragmentV1Registry {
    mapRenderer: <T extends ContentFragmentV1Properties>(models: string | string[], component:ComponentType<T>) => void
    getRenderer<T extends ContentFragmentV1Properties> (model:string) : ComponentType<T>
}

const MODEL_PREFIX = "ContentFragmentV1-"

class ContentFragmentRegistryV1Impl implements ContentFragmentV1Registry{

    public mapRenderer<T extends ContentFragmentV1Properties = ContentFragmentV1Properties>(resourceTypes: string | string[], clazz: ComponentType<T>): void {
        ContentFragmentRegistryV1Impl.mapRenderer(resourceTypes, clazz);
    }

    public static mapRenderer<T extends ContentFragmentV1Properties = ContentFragmentV1Properties>(resourceTypes: string | string[], clazz: ComponentType<T>): void {
        if (resourceTypes && clazz) {
            const resourceList = (typeof resourceTypes === 'string') ? [ resourceTypes ] : resourceTypes;

            resourceList.forEach((entry) => {
                MapTo<T>( this.getModelKey(entry) )( clazz);
            });
        }
    }



    public getRenderer<T extends ContentFragmentV1Properties = ContentFragmentV1Properties>(model: string): ComponentType<T> {
        return ContentFragmentRegistryV1Impl.getRenderer(model);
    }

    public static getRenderer<T extends ContentFragmentV1Properties = ContentFragmentV1Properties>(model: string): ComponentType<T> {
        const modelKey:string = this.getModelKey(model);
        return ComponentMapping.get<ComponentType<T>>(modelKey);
    }

    private static getModelKey(modelType:string){
        return MODEL_PREFIX + modelType;
    }

}

export default new ContentFragmentRegistryV1Impl();

export const MapToContentFragmentModel = <T extends ContentFragmentV1Properties = ContentFragmentV1Properties>(models: string | string[]): (clazz: ComponentType<T>) => void => {
    return (clazz: ComponentType<T>) => ContentFragmentRegistryV1Impl.mapRenderer<T>(models, clazz);
};

