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

import React from "react";

import {ComponentMapping, Container,} from '@adobe/aem-react-editable-components';
import {ContentFragmentV1IsEmptyFn} from "./ContentFragmentV1IsEmptyFn";
import {ContentFragmentV1Properties} from "./model";
import registry from "./ContentFragmentV1Registry";
import DefaultContentFragmentV1Renderer from "./DefaultContentFragmentV1Renderer";
import {CoreContainerState, withStandardBaseCssClass} from "../../../AbstractCoreContainerComponent";


class ContentFragmentV1Impl extends Container<ContentFragmentV1Properties, CoreContainerState> {

    constructor(props: ContentFragmentV1Properties) {
        super(props);

        this.state = {
            componentMapping: this.props.componentMapping || ComponentMapping,
        };

    }

    get renderEmptyPlaceHolder() :JSX.Element{
        if(this.props.isInEditor){
            return <div>ContentFragment is empty.</div>;
        }
        return <></>;
    }

    render() {

        let Component = registry.getRenderer(this.props.model);

        if(!Component){
            Component = DefaultContentFragmentV1Renderer;
        }
        const isEmpty = ContentFragmentV1IsEmptyFn(this.props);
        return isEmpty ? this.renderEmptyPlaceHolder : (
             <Component {...this.props} componentMapping={this.state.componentMapping}/>
        )

    }

}


export default withStandardBaseCssClass(ContentFragmentV1Impl, "cmp-contentfragment");
