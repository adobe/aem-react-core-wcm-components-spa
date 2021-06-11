
import {MappedComponentProperties} from "@adobe/aem-react-editable-components";
import {CoreContainerProperties} from "../../../AbstractCoreContainerComponent";

export interface ContentFragmentV1Element {
    "dataType": string
    "value": string
    "title": string
    ":type": string
    "multiValue": boolean
}

export interface ContentFragmentV1Properties extends CoreContainerProperties, MappedComponentProperties {

    id: string
    title: string
    description: string,
    elements: { [key: string]: ContentFragmentV1Element }
    elementsOrder: string[]
    model: string

}

