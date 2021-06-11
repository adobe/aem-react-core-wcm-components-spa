import {ContentFragmentV1Properties} from "./model";

export function ContentFragmentV1IsEmptyFn(props:ContentFragmentV1Properties) {
    return (props.elementsOrder == null || props.elementsOrder.length === 0) && (props.cqItemsOrder == null || props.cqItemsOrder.length === 0);
}