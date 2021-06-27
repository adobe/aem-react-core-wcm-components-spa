
import {ContainerProperties, MappedComponentProperties} from "@adobe/aem-react-editable-components";
import {HasBaseCssClass} from "../../../AbstractCoreContainerComponent";

export interface ContentFragmentV1Element {
    "dataType": string
    "value": string
    "title": string
    ":type": string
    "multiValue": boolean
}

export interface ContentFragmentV1Properties extends ContainerProperties, MappedComponentProperties, HasBaseCssClass {

    id: string
    title: string
    description: string,
    elements: { [key: string]: ContentFragmentV1Element }
    elementsOrder: string[]
    model: string

}