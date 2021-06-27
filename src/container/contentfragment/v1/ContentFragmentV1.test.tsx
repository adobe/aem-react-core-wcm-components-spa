/*
 *  Copyright 2020 Adobe
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import * as React from 'react';
import {
    ContentFragmentV1, ContentFragmentV1Element,
    ContentFragmentV1Properties,
    DefaultContentFragmentV1Renderer,
    MapToContentFragmentModel
} from "./";

import {mount, ReactWrapper} from "enzyme";
import ReactDOM from 'react-dom';

import * as modelJson from "./ContentFragmentV1.test.model.json";
import ComponentMapping from "../../../TestComponentMapping";
import {ContainerState, MapTo} from "@adobe/aem-react-editable-components";
import {withStandardBaseCssClass} from "../../../AbstractCoreContainerComponent";
import {ModelManager} from "@adobe/aem-spa-page-model-manager";

const defaultProps = modelJson as unknown as ContentFragmentV1Properties;

MapTo<ContentFragmentV1Properties>("core-components-examples/wcm-react/components/content-fragment")(ContentFragmentV1);

class TestModel extends DefaultContentFragmentV1Renderer<ContentFragmentV1Properties, ContainerState> {

    protected renderElement(element:ContentFragmentV1Element, name:string, index:number):JSX.Element{
        return (
            <div key={"index-" + index}>{element.value}</div>
        )
    }

    render() {
        return (
            <div id={this.props.id} className={this.props.baseCssClass}>

                <h3>Hi! This is my custom CF component! My name is: {this.props.elements["name"].value}</h3>
                {this.elements}
                {this.childComponents}

            </div>
        )
    }
}

MapToContentFragmentModel("testing-frontend-react/models/custom-model")(withStandardBaseCssClass(TestModel, "cmp-custom-contentfragment"));

let AddListenerSpy,RemoveListener,GetDataSpy: jest.SpyInstance;

beforeEach(() => {
    AddListenerSpy = jest.spyOn(ModelManager, 'addListener');
    RemoveListener = jest.spyOn(ModelManager, 'removeListener');
    GetDataSpy = jest.spyOn(ModelManager, 'getData');

    AddListenerSpy.mockReturnValue();
    RemoveListener.mockReturnValue();
    GetDataSpy.mockResolvedValue({});

});

it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ContentFragmentV1 {...defaultProps as ContentFragmentV1Properties} />,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
    expect(1).toBe(1);
});

it('Renders everything properly.', () => {

    const wrapper = mount(<ContentFragmentV1  {...defaultProps} componentMapping={ComponentMapping}/>);
    const contentFragment = wrapper.find('.cmp-contentfragment');

    expect(contentFragment).toHaveLength(1);

    const subContentFragment = wrapper.find('.cmp-custom-contentfragment');

    expect(subContentFragment).toHaveLength(1);

});

it('Renders an empty placeholder', () => {

    const emptyProps:ContentFragmentV1Properties = {
        cqItems: {},
        cqItemsOrder: [],
        cqPath: "",
        description: "",
        elements: {},
        elementsOrder: [],
        id: "",
        isInEditor: true,
        model: "",
        title: "",
        componentMapping: ComponentMapping,

    }
    const wrapper = mount(<ContentFragmentV1 {...emptyProps} />);

    const contentFragment = wrapper.find('.cmp-contentfragment');

    expect(contentFragment).toHaveLength(0);

    const placeholder = wrapper.find('.cf-placeholder');

    expect(placeholder).toHaveLength(1);

});

it('Renders no placeholder if not in author', () => {

    const emptyProps:ContentFragmentV1Properties = {
        cqItems: {},
        cqItemsOrder: [],
        cqPath: "",
        description: "",
        elements: {},
        elementsOrder: [],
        id: "",
        isInEditor: false,
        model: "",
        title: "",
        componentMapping: ComponentMapping,

    }
    const wrapper = mount(<ContentFragmentV1 {...emptyProps} />);

    const contentFragment = wrapper.find('.cmp-contentfragment');

    expect(contentFragment).toHaveLength(0);

    const placeholder = wrapper.find('.cf-placeholder');

    expect(placeholder).toHaveLength(0);

});



