import React from "react";
import {Container, MappedComponentProperties, Utils} from "@adobe/aem-react-editable-components";
import {ContentFragmentV1Properties} from "./model";
import {withStandardBaseCssClass} from "../../../AbstractCoreContainerComponent";

class DefaultContentFragmentV1Renderer extends Container<ContentFragmentV1Properties, any> {

    /**
     * Returns the child components of this Container.
     * It will instantiate the child components if mapping exists.
     *
     * @returns An array with the components instantiated to JSX
     */
    get childComponents(): JSX.Element[] {
        const childComponents: JSX.Element[] = [];

        if (!this.props.elements || !this.props.elementsOrder) {
            return childComponents;
        }

        this.props.elementsOrder.map((itemKey) => {
            const itemProps = Utils.modelToProps(this.props.elements[itemKey]);

            if (itemProps) {
                const ItemComponent: React.ComponentType<MappedComponentProperties> = this.state.componentMapping.get(itemProps.cqType);

                if (ItemComponent) {
                    childComponents.push(this.connectComponentWithItem(ItemComponent, itemProps, itemKey));
                }
            }
        });

        return childComponents;
    }

    get elements():JSX.Element{
        return (
            <div className={this.props.baseCssClass + "__elements"}>
                {this.props.elementsOrder.map(
                    element => <div className={this.props.baseCssClass + "__element"}>
                        <div className={this.props.baseCssClass + "__elemententry " + this.props.baseCssClass + "__elemententry--key"}><h4>{element}</h4></div>
                        <div className={this.props.baseCssClass + "__elemententry " + this.props.baseCssClass + "__elemententry--value"}>value: {this.props.elements[element].value}</div>
                        <div className={this.props.baseCssClass + "__elemententry " + this.props.baseCssClass + "__elemententry--datatype"}>datatype: {this.props.elements[element].dataType}</div>
                        <div className={this.props.baseCssClass + "__elemententry " + this.props.baseCssClass + "__elemententry--multivalue"}>multivalue: {this.props.elements[element].multiValue ? 'true': 'false'}</div>
                        <div className={this.props.baseCssClass + "__elemententry " + this.props.baseCssClass + "__elemententry--type"}>type: {this.props.elements[element][":type"]}</div>
                    </div>
                )}
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


export default withStandardBaseCssClass(DefaultContentFragmentV1Renderer, "cmp-contentfragment");
