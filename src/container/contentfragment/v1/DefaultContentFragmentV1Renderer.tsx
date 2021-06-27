import React from "react";
import {Container, ContainerState, MappedComponentProperties, Utils} from "@adobe/aem-react-editable-components";
import {ContentFragmentV1Element, ContentFragmentV1Properties} from "./model";

export class DefaultContentFragmentV1Renderer<T extends ContentFragmentV1Properties, S extends ContainerState> extends Container<T, S> {

    protected renderElement(element:ContentFragmentV1Element, name:string, index:number):JSX.Element{
        return (
            <div key={this.props.id + "-element-" + element + "-" + index} className={this.props.baseCssClass + "__element"}>
                <div className={this.props.baseCssClass + "__elemententry " + this.props.baseCssClass + "__elemententry--key"}><h4>{name}</h4></div>
                <div className={this.props.baseCssClass + "__elemententry " + this.props.baseCssClass + "__elemententry--value"}>value: {element.value}</div>
                <div className={this.props.baseCssClass + "__elemententry " + this.props.baseCssClass + "__elemententry--datatype"}>datatype: {element.dataType}</div>
                <div className={this.props.baseCssClass + "__elemententry " + this.props.baseCssClass + "__elemententry--multivalue"}>multivalue: {element.multiValue ? 'true': 'false'}</div>
                <div className={this.props.baseCssClass + "__elemententry " + this.props.baseCssClass + "__elemententry--type"}>type: {element[":type"]}</div>
            </div>
        )
    }

    protected get elements():JSX.Element{
        return (
            <div className={this.props.baseCssClass + "__elements"}>
                {this.props.elementsOrder.map((element, index) => this.renderElement(this.props.elements[element], element,index))};
            </div>
        )
    }

    render() {
        return (
            <div id={this.props.id} className={this.props.baseCssClass}>

                <h3 className={this.props.baseCssClass + "__title"}>{this.props.title}</h3>
                {
                    !!this.props.description && this.props.description.length > 0 && (
                        <p className={this.props.baseCssClass + "__description"}>{this.props.description}</p>
                    )
                }

                {this.props.elementsOrder && this.props.elementsOrder.length && this.elements}

                {this.childComponents}

            </div>
        )
    }
}
