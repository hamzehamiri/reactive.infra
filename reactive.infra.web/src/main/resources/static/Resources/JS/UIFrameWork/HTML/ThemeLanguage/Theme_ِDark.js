import {UiFrameWorkComponent} from "./Theme.js";

export let Theme_Dark = {
    [UiFrameWorkComponent.GeneratorStyle.GeneratorStyle]: {
        [UiFrameWorkComponent.GeneratorStyle.URL]: '',
        [UiFrameWorkComponent.GeneratorStyle.ThemeStyle]: {
            [UiFrameWorkComponent.GeneratorStyle.BaseText]: ['NoSelect', {
                '-webkit-touch-callout': 'none',
                '-webkit-user-select': 'none',
                '-khtml-user-select': 'none',
                '-moz-user-select': 'none',
                '-ms-user-select': 'none',
                'user-select': 'none',
                '$font_face$1': {
                    'font-family': 'B Lotus',
                    'src': "url('Resources/Themes/Fonts/Persian/B Lotus.ttf')",
                },
                '$font_face$2': {
                    'font-family': 'B Yekan',
                    'src': "url('Resources/Themes/Fonts/Persian/B Yekan.ttf')"
                },
            }],
            [UiFrameWorkComponent.Components.StandardGrid[0]]: {
                [UiFrameWorkComponent.GeneratorStyle.BaseComponent]: ['Grid-Div', {
                    'border': '1px',
                    'overflow': 'scroll',
                    'border-spacing': '0px',
                    '$webkit-scrollbar$': {
                        'width': '5px',
                        'height': '5px',
                        'background-color': 'rgba(229,226,34,0.85)'
                    },
                    '$webkit-scrollbar-thumb$': {
                        'background': '#de5050'
                    }
                }],
                [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridSelect]: [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridSelect, {
                    'background-color': '#8181c1 !important'
                }],
                [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridHover]: [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridHover, {
                    'background-color': 'yellow !important'
                }],
                [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTDBody]: [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTDBody, {
                    // 'border': '1px solid black',
                    'border-collapse': 'collapse',
                    'text-align': 'center',
                    'overflow': 'hidden',
                    'text-overflow': 'ellipsis',
                    'white-space': 'nowrap',
                    // 'padding': '4px 4px 4px',
                    'font-family': 'B Lotus',
                    'border-left': '1px solid'
                }],
                [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTDPLabelBody]: [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTDPLabelBody, {
                    'margin': '0px',
                    'text-overflow': 'ellipsis',
                    'white-space': 'nowrap',
                    'overflow': 'hidden'
                }],
                [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTrFirstRow]: [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTrFirstRow, {
                    'color': '#121212'
                }],
                [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTdFirstRow]: [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTdFirstRow, {
                    'padding': '0px'
                }],
                [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTRBody]: [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTRBody, {
                    'color': '#121212'
                }],
                [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTableHeader]: [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTableHeader, {
                    'border-collapse': 'collapse',
                    'position': 'relative',
                    'width': '100%',
                    'empty-cells': 'show',
                    'table-layout': 'fixed',
                    'overflow': 'hidden',
                }],
                [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTableHeaderTr]: [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTableHeaderTr, {
                    'box-shadow': '0 2px 5px 0 rgba(0,0,0,0.16)',
                    'background-color': 'lightgreen'
                }],
                [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTableBody]: [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridTableBody, {
                    'border-collapse': 'collapse',
                    'position': 'relative',
                    'table-layout': 'fixed',
                }],
                [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridStrip]: [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridStrip, {
                    'background-color': '#d9c9c9'
                }],
                [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridBodyDiv]: [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridBodyDiv, {
                    'overflow-x': 'hidden',
                    'overflow-y': 'auto',
                    'display': 'table-caption',
                    'box-shadow': '0 2px 5px 0 rgba(0,0,0,0.16)',
                    // 'border-right': '1px solid #DFDFDF',
                    'background-color': '#8f6161',
                    // 'border': '1px solid #DFDFDF'
                    '$webkit-scrollbar$': {
                        'width': '5px',
                        'height': '5px',
                        'background-color': 'rgba(229,226,34,0.85)'
                    },
                    '$webkit-scrollbar-thumb$': {
                        'background': '#de5050'
                    }
                }],
                [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridBodyChangeDetectorCell]: [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridBodyChangeDetectorCell, {
                    'background-color': '#e80101',
                }],
                [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridBezier]: [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridBezier, {
                    // 'position': 'absolute',
                    'right': '-4px',
                    'bottom': '-4px',
                    'width': '8px',
                    'height': '8px',
                    'background-color': '#fff',
                    'border': '1px solid #e80101',
                    'border-radius': '2px',
                    'cursor': 'crosshair',
                    'pointer-events': 'auto',
                }],
                [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridHeaderDiv]: [UiFrameWorkComponent.Components.StandardGrid[1].StandardGridHeaderDiv, {
                    'display': 'table-caption',
                    'box-shadow': '0 2px 5px 0 rgba(0,0,0,0.16)',
                    // 'border-right': '1px solid #DFDFDF',
                    'background-color': '#f4f4f4',
                    // 'border': '1px solid #DFDFDF'
                }]
            },
            [UiFrameWorkComponent.Components.StandardGridButtonHeader[0]]: {
                [UiFrameWorkComponent.Components.StandardGridButtonHeader[1].ButtonHeader]: [[UiFrameWorkComponent.Components.StandardGridButtonHeader[1].ButtonHeader], {
                    'position': 'absolute',
                    'top': '1px',
                    'overflow': 'hidden'
                }],
                [UiFrameWorkComponent.Components.StandardGridButtonHeader[1].SortButtonHeader]: [[UiFrameWorkComponent.Components.StandardGridButtonHeader[1].SortButtonHeader], {
                    'position': 'relative',
                    'color': '#737594',
                    '$hover$': {
                        'background-color': 'rgb(55,10,130)'
                    }
                }],
                [UiFrameWorkComponent.Components.StandardGridButtonHeader[1].FunnelButtonHeader]: [[UiFrameWorkComponent.Components.StandardGridButtonHeader[1].FunnelButtonHeader], {
                    '$hover$': {
                        'background-color': 'rgb(55,10,130)',
                    }
                }],
                [UiFrameWorkComponent.Components.StandardGridButtonHeader[1].DropDownHeaderClass]: [[UiFrameWorkComponent.Components.StandardGridButtonHeader[1].DropDownHeaderClass], {
                    '$hover$': {
                        'background-color': 'rgb(55,10,130)',
                    }
                }]
            },
            [UiFrameWorkComponent.Components.DividerComponent[0]]: {
                [UiFrameWorkComponent.Components.DividerComponent[1].DividerComponentMaster]: [UiFrameWorkComponent.Components.DividerComponent[1].DividerComponentMaster, {
                    'margin': '0px',
                    'flex-shrink': '0',
                    'border-width': '0px thin 0px 0px',
                    'border-style': 'solid',
                    'border-color': 'rgba(0, 0, 0, 0.12)',
                    'height': 'auto',
                    'align-self': 'stretch'
                }]
            },
            [UiFrameWorkComponent.Components.WebAdvancedTree[0]]: {
                [UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeMasterDiv]: [[UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeMasterDiv], {
                    'color': 'rgb(0 0 0)',
                    'box-shadow': 'rgba(0, 0, 0, 0.4) 0px 0px 10px',
                    'background-color': 'rgb(177,154,154)',
                    'border-radius': '15px',
                    '$webkit-scrollbar$': {
                        'width': '5px',
                        'height': '5px',
                        'background-color': 'rgba(229,226,34,0.85)'
                    },
                    '$webkit-scrollbar-thumb$': {
                        'background': '#de5050'
                    }
                }],
                [UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeGroupUl]: [[UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeGroupUl], {
                    'width': '100%',
                    'position': 'relative',
                    // 'padding': '0px',
                    'margin': '0px',
                    // 'overflow': 'auto'
                }],
                [UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeGroupLi]: [UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeGroupLi, {
                    'outline': 'none',
                    'margin': '0',
                    'padding': '0',
                    'list-style-type': 'none',
                    'transition': '1s all',
                    'white-space': 'nowrap',
                    'overflow-y': 'hidden',
                    'overflow-x': 'hidden'
                }],
                [UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeCollapseSpan]: [UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeCollapseSpan, {
                    'width': '24px',
                    'height': '24px',
                    'vertical-align': 'top',
                    'padding': '3px 3px 4px 3px',
                    'margin-top': '1px',
                    // 'float': 'left'
                }],
                [UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeCollapseSpanImg]: [UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeCollapseSpanImg, {
                    // 'margin-left': '10px',
                    // 'margin-top': '6px',
                    'background-image': 'url("Resources/Themes/IMG/Tree/arrow-tree.svg")',
                    'background-repeat': 'no-repeat',
                    'background-color': 'rgba(50, 50, 93, 0.25)',
                    'background-size': '24px 24px',
                    'cursor': 'pointer',
                    // 'border': '0',
                    // 'overflow-clip-margin': 'content-box',
                    // 'overflow': 'clip',
                    // 'background-position': '-146px -170px',
                    /*background-position: -110px -170px;*/
                    // 'background-size': '538px auto',
                    'width': '24px',
                    'height': '24px',
                }],
                [UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeLabelDiv]: [UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeLabelDiv, {
                    '-webkit-tap-highlight-color': 'transparent',
                    'margin-top': '1px',
                    // 'float': 'left',
                    'padding': '3px 0px 4px 3px',
                    'text-decoration': 'none',
                    'outline': '0 none',
                    'border': '1px solid transparent',
                    'transition': '0.5s all',
                    // 'display': 'flex'
                    '$hover$': {
                        'background-color': 'rgb(161,239,9)',
                    }
                }],
                [UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeLabelDivSelected]: [UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeLabelDivSelected, {
                    'background-color': 'rgb(158,219,23)',
                }],
                [UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeCheckbox]: [UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeCheckbox, {
                    'cursor': 'default',
                    'margin': '0 6px 0 0px',
                    'line-height': '100%',
                    'text-decoration': 'inherit',
                    'background-position': '-400px -76px',
                    /*background-position: -40px -98px;*/
                    'background-size': '538px auto',
                    'width': '18px',
                    'height': '18px',
                    'background-image': 'url("Resources/Themes/IMG/DevExpress/DXR.svg")',
                    'background-repeat': 'no-repeat',
                    'background-color': 'transparent',
                    'display': 'inline-block',
                    'vertical-align': 'middle'
                    // 'content': '"dxRippleTargetExternal" !important'
                }],
                [UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeIcon]: [UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeIcon, {
                    'cursor': 'default',
                    'margin': '0 6px 0 0px',
                    'width': '32px',
                    'height': '32px',
                    'display': 'inline-block',
                    'vertical-align': 'middle'
                }],
                [UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeLabelSpan]: [UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeLabelSpan, {
                    'white-space': 'nowrap',
                    'line-height': '100%',
                    'text-decoration': 'inherit',
                    'cursor': 'inherit !important',
                    'font-family': 'B Yekan',
                    'font-size': '1.3rem'
                }],
                [UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeBreakUl]: [UiFrameWorkComponent.Components.WebAdvancedTree[1].TreeNodeBreakUl, {
                    'clear': 'both',
                    'font-size': '0',
                    'height': '0',
                    'visibility': 'hidden',
                    'width': '0',
                    'display': 'block',
                    'line-height': '0'
                }],
            },
            [UiFrameWorkComponent.Components.WebAdvancedTree2[0]] : {
                [UiFrameWorkComponent.Components.WebAdvancedTree2[1].WebAdvancedTree2_TreeNodeMasterDiv]: [[UiFrameWorkComponent.Components.WebAdvancedTree2[1].WebAdvancedTree2_TreeNodeMasterDiv], {
                    'max-width': '100%',
                    'overflow': 'auto',
                    'font': '10px Verdana, sans-serif',
                    'box-shadow': '0 0 5px #ccc',
                    'padding': '10px',
                    'border-radius': '5px',
                    '$webkit-scrollbar$': {
                        'width': '5px',
                        'height': '5px',
                        'background-color': 'rgba(229,226,34,0.85)'
                    },
                    '$webkit-scrollbar-thumb$': {
                        'background': '#de5050'
                    }
                }],
                [UiFrameWorkComponent.Components.WebAdvancedTree2[1].WebAdvancedTree2_TreeNodeGroupUl]: [[UiFrameWorkComponent.Components.WebAdvancedTree2[1].WebAdvancedTree2_TreeNodeGroupUl], {
                    'position': 'relative',
                    'display': 'inline-block',
                    'min-width': '100%',
                    'margin': '0',
                    'padding': '0',
                    'list-style-type': 'none',
                    'list-style-image': 'none',
                    'box-sizing': 'border-box'
                }],
                [UiFrameWorkComponent.Components.WebAdvancedTree2[1].WebAdvancedTree2_TreeNodeGroupLi]: [[UiFrameWorkComponent.Components.WebAdvancedTree2[1].WebAdvancedTree2_TreeNodeGroupLi], {
                    'margin-left': '0',
                    'margin-right': '0',
                    'background': 'transparent',
                    'min-height': '24px',
                    'line-height': '24px',
                    'min-width': '24px'
                }],
            },
            [UiFrameWorkComponent.Components.StandardTree[0]]: {
                [UiFrameWorkComponent.GeneratorStyle.BaseComponent]: ['WebTree-Div', {
                    'border': '1px'
                }],
                [UiFrameWorkComponent.Components.StandardTree[1].Select]: [[UiFrameWorkComponent.Components.StandardTree[1].Select], {
                    'background-color': 'blue'
                }],
                [UiFrameWorkComponent.Components.StandardTree[1].Hover]: [[UiFrameWorkComponent.Components.StandardTree[1].Hover], {
                    'background-color': 'yellow'
                }],
                [UiFrameWorkComponent.Components.StandardTree[1].TD]: [[UiFrameWorkComponent.Components.StandardTree[1].TD], {
                    'border': '1px solid black',
                    'border-collapse': 'collapse',
                    'padding': '5px',
                    'text-align': 'left',
                }],
                [UiFrameWorkComponent.Components.StandardTree[1].TDTree]: [[UiFrameWorkComponent.Components.StandardTree[1].TDTree], {
                    'padding': '5px',
                    'text-align': 'right',
                }],
                [UiFrameWorkComponent.Components.StandardTree[1].TD_EXP]: [[UiFrameWorkComponent.Components.StandardTree[1].TD_EXP], {
                    'padding': '8px 7px 3px',
                    'text-align': 'center',
                    'font-size': '2px',
                    'line-height': '0',
                    '@keyframes glowing': {
                        '0%': {
                            'background-color': '#2ba805',
                            'box-shadow': '0 0 5px #2ba805'
                        },
                        '50%': {
                            'background-color': '#49e819',
                            'box-shadow': '0 0 20px #49e819'
                        },
                        '100%': {
                            'background-color': '#2ba805',
                            'box-shadow': '0 0 5px #2ba805'
                        }
                    },
                    'animation': 'glowing 1300ms infinite'
                }],
                [UiFrameWorkComponent.Components.StandardTree[1].TD_EMPTY]: [[UiFrameWorkComponent.Components.StandardTree[1].TD_EMPTY], {
                    'vertical-align': 'top',
                    'background': 'white none no-repeat top center',
                    'padding': '0 11px'
                }],

                [UiFrameWorkComponent.Components.StandardTree[1].TD_EXP_IMG]: [[UiFrameWorkComponent.Components.StandardTree[1].TD_EXP_IMG], {
                    'cursor': 'pointer',
                    'font-size': '12px',
                    'width': '8px',
                    'height': '8px',
                    'background-image': 'url("Resources/Themes/IMG/Tree/down-arrow.svg")'
                }],
                [UiFrameWorkComponent.Components.StandardTree[1].TR]: [UiFrameWorkComponent.Components.StandardTree[1].TR, {
                    color: 'red'
                }],
                [UiFrameWorkComponent.Components.StandardTree[1].Table]: [[UiFrameWorkComponent.Components.StandardTree[1].Table], {
                    'border-collapse': 'collapse',
                    'position': 'absolute',
                    'top': '5px'
                }],
                [UiFrameWorkComponent.Components.StandardTree[1].Header]: [[UiFrameWorkComponent.Components.StandardTree[1].Header], {
                    'background-color': 'green'
                }],
                [UiFrameWorkComponent.Components.StandardTree[1].LevelUpTD]: [[UiFrameWorkComponent.Components.StandardTree[1].LevelUpTD], {
                    padding: '0 11px'
                }],
                [UiFrameWorkComponent.Components.StandardTree[1].Expand]: [[UiFrameWorkComponent.Components.StandardTree[1].Expand], {
                    padding: '0 11px'
                }],
                [UiFrameWorkComponent.Components.StandardTree[1].Collapse]: [[UiFrameWorkComponent.Components.StandardTree[1].Collapse], {
                    padding: '0 11px'
                }]
            },
            [UiFrameWorkComponent.Components.PopUp[0]]: {
                [UiFrameWorkComponent.GeneratorStyle.BaseComponent]: ['Popup-Div', {
                    //'background': '-webkit-linear-gradient(to right, rgba(230, 233, 240, 0.5), rgba(238, 241, 245, 0.5))',
                    'background': 'linear-gradient(to right, rgba(230, 233, 240, 0.5), rgba(238, 241, 245, 0.5))',
                    'border': '1px',
                    'box-shadow': 'rgb(38, 57, 77) 0px 20px 30px -10px',
                    'transform': 'rotate3d(1,0,0, 0deg) rotate3d(0,1,0,0deg)',
                    'transition': 'transform 1s ease-in-out'
                }],
                [UiFrameWorkComponent.Components.PopUp[1].PopUpDrag]: [[UiFrameWorkComponent.Components.PopUp[1].PopUpDrag], {
                    'transform': 'rotate3d(1,0,0, 30deg) rotate3d(0,1,0,30deg)',
                }]
            },
            [UiFrameWorkComponent.Components.WebTextEditor[0]]: {
                [UiFrameWorkComponent.GeneratorStyle.BaseComponent]: ['Web-TextEditor', {
                    'display': 'inline-flex',
                    'position': 'relative',
                }],
                [UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorInput]: [[UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorInput], {
                    'font-weight': '500',
                    'font-size': '1.6rem',
                    'color': '#075693',
                    'padding': '15px 15px',
                    'border': '2px solid #D9D9D9',
                    'border-radius': '0.5rem',
                    'box-sizing': 'border-box',
                    'outline': 'none',
                    'font-family': 'B Lotus',
                }],
                [UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorSpanPlaceHolder]: [[UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorSpanPlaceHolder], {
                    'position': 'absolute',
                    'margin': '0px 8px',
                    'padding': '8px 0px',
                    'font-family': 'B Lotus',
                    'color': '#6c757d',
                    'display': 'flex',
                    'align-items': 'center',
                    'font-size': '1.2rem',
                    'top': '0px',
                    // 'left': '17px',
                    'transition': 'all 0.2s',
                    'transform-origin': '0% 0%',
                    'background': 'none',
                    'pointer-events': 'none',
                    'background-color': 'transparent'
                }],
                [UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorSpanPlaceHolderFocusText]: [[UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorSpanPlaceHolderFocusText], {
                    'transform': 'scale(0.8) translateY(-27px) translateX(-15px)',
                    // 'background': '#fff'
                }],
                [UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorSpanPlaceHolderFieldSet]: [[UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorSpanPlaceHolderFieldSet], {}],
                [UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorSpanPlaceHolderFieldSetLegend]: [[UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorSpanPlaceHolderFieldSetLegend], {}],
                [UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorSpanPlaceHolderFieldSetLegendSpan]: [[UiFrameWorkComponent.Components.WebTextEditor[1].WebTextEditorSpanPlaceHolderFieldSetLegendSpan], {
                    'padding-left': '5px',
                    'padding-right': '5px',
                    'display': 'inline-block',
                    'opacity': '0',
                    'visibility': 'visible'
                }]
            },
            [UiFrameWorkComponent.Components.WebTextEditorSimple[0]]: {
                [UiFrameWorkComponent.Components.WebTextEditorSimple[1].WebTextEditorSimpleInput]: [UiFrameWorkComponent.Components.WebTextEditorSimple[1].WebTextEditorSimpleInput, {
                    'font-weight': '500',
                    'font-size': '1rem',
                    'color': '#495055',
                    // 'padding': '15px 15px',
                    'border': '2px solid #D9D9D9',
                    'border-radius': '0.5rem',
                    'box-sizing': 'border-box',
                    'outline': 'none',
                    'font-family': 'B Lotus',
                }],
                [UiFrameWorkComponent.Components.WebTextEditorSimple[1].WebTextEditorSimpleSpanPlaceHolder]: [UiFrameWorkComponent.Components.WebTextEditorSimple[1].WebTextEditorSimpleSpanPlaceHolder, {
                    'position': 'absolute',
                    'margin': '0px 19px',
                    'padding': '0 0px',
                    'font-family': 'B Lotus',
                    'color': '#6c757d',
                    'display': 'flex',
                    'align-items': 'center',
                    'font-size': '1.6rem',
                    'top': '0px',
                    // 'left': '17px',
                    'transition': 'all 0.2s',
                    'transform-origin': '0% 0%',
                    'background': 'none',
                    'pointer-events': 'none',
                    'background-color': 'transparent'
                }],
                [UiFrameWorkComponent.Components.WebTextEditorSimple[1].WebTextEditorSimpleSpanPlaceHolderFocusText]: [UiFrameWorkComponent.Components.WebTextEditorSimple[1].WebTextEditorSimpleSpanPlaceHolderFocusText, {
                    'transform': 'scale(0.8) translateY(-27px) translateX(-15px)',
                    'background': '#fff'
                }]
            },
            [UiFrameWorkComponent.Components.WebCheckBoxEditor[0]]: {
                [UiFrameWorkComponent.GeneratorStyle.BaseComponent]: ['Web-CheckBoxEditor', {
                    'display': 'inline-flex',
                    'position': 'relative'
                }],
                [UiFrameWorkComponent.Components.WebCheckBoxEditor[1].CheckBox]: [[UiFrameWorkComponent.Components.WebCheckBoxEditor[1].CheckBox], {
                    'padding': '0px',
                }],
                [UiFrameWorkComponent.Components.WebCheckBoxEditor[1].SpanPlaceHolder]: [[UiFrameWorkComponent.Components.WebCheckBoxEditor[1].SpanPlaceHolder], {
                    'position': 'absolute',
                    'margin': '0px 35px',
                    'padding': '0 0px',
                    'font-family': 'B Lotus',
                    'color': '#6c757d',
                    'display': 'flex',
                    'align-items': 'center',
                    'font-size': '1.3rem',
                    'top': '0',
                    // 'left': '17px',
                    'transition': 'all 0.2s',
                    'transform-origin': '0% 0%',
                    'background': 'none',
                    'pointer-events': 'none',
                    'height': '100%'
                }]
            },
            [UiFrameWorkComponent.Components.SearchUI[0]]: {
                [UiFrameWorkComponent.Components.SearchUI[1].WebSearchContainerUI]: [[UiFrameWorkComponent.Components.SearchUI[1].WebSearchContainerUI], {
                    'background': '#abc1ab',
                    'width': 'auto',
                    'margin': '2px',
                    'display': 'flex',
                    'flex-direction': 'row',
                    'border-radius': '5px'
                }],
                [UiFrameWorkComponent.Components.SearchUI[1].WebSearchLabelItem]: [[UiFrameWorkComponent.Components.SearchUI[1].WebSearchLabelItem], {
                    // 'margin': '0px 0px 0px 0px',
                    // 'padding': '0px',
                    'width': '100%',
                    // 'height': '100%',
                    // 'flex': 1,
                    'font-family': 'B Lotus',
                    'color': '#075693'
                }],
            },
            [UiFrameWorkComponent.Components.SearchUIButtonFloatAble[0]]: {
                [UiFrameWorkComponent.Components.SearchUIButtonFloatAble[1].SearchUIButtonFloatAbleMaster]: [[UiFrameWorkComponent.Components.SearchUIButtonFloatAble[1].SearchUIButtonFloatAbleMaster], {
                    'transition': '0.5s all',
                    'background': '#8de30d',
                    'display': 'flex',
                    'overflow': 'hidden'
                }],
                [UiFrameWorkComponent.Components.SearchUIButtonFloatAble[1].SearchUIButtonFloatAbleDeleteIconButton]: [[UiFrameWorkComponent.Components.SearchUIButtonFloatAble[1].SearchUIButtonFloatAbleDeleteIconButton], {
                    'cursor': 'pointer',
                    'background-image': 'url("Resources/Themes/IMG/Components/SearchUI/close.svg")',
                    'background-repeat': 'no-repeat',
                    'background-size': 'contain',
                    'border': 'none',
                    'background-position': 'center',
                    'height': '100%',
                    'width': '100%',
                    'flex': '1',
                    '$hover$': {
                        'background-color': 'red'
                    }
                }],
                [UiFrameWorkComponent.Components.SearchUIButtonFloatAble[1].SearchUIButtonFloatAbleDeleteIconButtonActive]: [[UiFrameWorkComponent.Components.SearchUIButtonFloatAble[1].SearchUIButtonFloatAbleDeleteIconButtonActive], {
                    'height': '100%',
                    'width': '30px',
                    'flex': 'none'
                }],
                [UiFrameWorkComponent.Components.SearchUIButtonFloatAble[1].SearchUIButtonFloatAbleDeleteIconButtonHide]: [[UiFrameWorkComponent.Components.SearchUIButtonFloatAble[1].SearchUIButtonFloatAbleDeleteIconButtonHide], {
                    // 'height': '0px',
                    // 'flex': 0
                    'height': '100%',
                    'width': '0px',
                    'flex': 'none'
                }],
            },
            [UiFrameWorkComponent.Components.WebAttachmentEditorAttachmentUI[0]]: {
                [UiFrameWorkComponent.Components.WebAttachmentEditorAttachmentUI[1].WebAttachmentEditorAttachmentUIMaster]: [[UiFrameWorkComponent.Components.WebAttachmentEditorAttachmentUI[1].WebAttachmentEditorAttachmentUIMaster], {
                    // 'padding': '0.75rem 1.25rem',
                    'color': 'white',
                    'background': 'hsl(196, 78%, 61%)',
                    'border': '1px solid hsl(196, 78%, 61%)',
                    'border-radius': '4px'
                }],
                [UiFrameWorkComponent.Components.WebAttachmentEditorAttachmentUI[1].WebAttachmentEditorAttachmentUIIcon]: [[UiFrameWorkComponent.Components.WebAttachmentEditorAttachmentUI[1].WebAttachmentEditorAttachmentUIIcon], {
                    'color': '#c010d3',
                }],
                [UiFrameWorkComponent.Components.WebAttachmentEditorAttachmentUI[1].WebAttachmentEditorAttachmentUILabel]: [[UiFrameWorkComponent.Components.WebAttachmentEditorAttachmentUI[1].WebAttachmentEditorAttachmentUILabel], {
                    'margin': '0px',
                    'padding': '0px',
                    'text-overflow': 'ellipsis',
                    'text-align': 'left',
                    'overflow': 'hidden'
                }]
            },
            [UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[0]]: {
                [UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].AttachmentUiIconButtonFloatAbleActive]: [[UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].AttachmentUiIconButtonFloatAbleActive], {
                    'height': '16px'
                }],
                [UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].AttachmentUiIconButtonFloatAbleHide]: [[UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].AttachmentUiIconButtonFloatAbleHide], {
                    'height': '0px'
                }],
                [UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].AttachmentUiIconButtonFloatAbleContainer]: [[UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].AttachmentUiIconButtonFloatAbleContainer], {
                    'transition': '0.5s all',
                    'background': '#8de30d',
                    'display': 'flex',
                    'overflow': 'hidden',
                    '-webkit-box-shadow': '10px 10px 26px -8px rgba(0,0,0,1)',
                    '-moz-box-shadow': '10px 10px 26px -8px rgba(0,0,0,1)',
                    'box-shadow': '10px 10px 26px -8px rgba(0,0,0,1)'
                }],
                [UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].DownloadIconButton]: [[UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].DownloadIconButton], {
                    'cursor': 'pointer',
                    'background-image': 'url("Resources/Themes/IMG/Components/AttachmentUI/download.svg")',
                    'background-repeat': 'no-repeat',
                    'background-size': 'contain',
                    'border': 'none',
                    'background-position': 'center',
                    'height': '16px',
                    'flex': '1',
                    '$hover$': {
                        'background-color': 'red'
                    }
                }],
                [UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].DeleteIconButton]: [[UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].DeleteIconButton], {
                    'cursor': 'pointer',
                    'background-image': 'url("Resources/Themes/IMG/Components/AttachmentUI/remove.svg")',
                    'background-repeat': 'no-repeat',
                    'background-size': 'contain',
                    'border': 'none',
                    'background-position': 'center',
                    'height': '16px',
                    'flex': '1',
                    '$hover$': {
                        'background-color': 'red'
                    }
                }],
                [UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].EditIconButton]: [[UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].EditIconButton], {
                    'cursor': 'pointer',
                    'background-image': 'url("Resources/Themes/IMG/Components/AttachmentUI/edit.svg")',
                    'background-repeat': 'no-repeat',
                    'background-size': 'contain',
                    'border': 'none',
                    'background-position': 'center',
                    'height': '16px',
                    'flex': '1',
                    '$hover$': {
                        'background-color': 'red'
                    }
                }],
                [UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].PreviewIconButton]: [[UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].PreviewIconButton], {
                    'cursor': 'pointer',
                    'background-image': 'url("Resources/Themes/IMG/Components/AttachmentUI/preview.svg")',
                    'background-repeat': 'no-repeat',
                    'background-size': 'contain',
                    'border': 'none',
                    'background-position': 'center',
                    'height': '16px',
                    'flex': '1',
                    '$hover$': {
                        'background-color': 'red'
                    }
                }],
                [UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].UploadIconButton]: [[UiFrameWorkComponent.Components.AttachmentUiIconButtonFloatAble[1].UploadIconButton], {
                    'cursor': 'pointer',
                    'background-image': 'url("Resources/Themes/IMG/Components/AttachmentUI/upload.svg")',
                    'background-repeat': 'no-repeat',
                    'background-size': 'contain',
                    'border': 'none',
                    'background-position': 'center',
                    'height': '16px',
                    'flex': '1',
                    '$hover$': {
                        'background-color': 'red'
                    }
                }]
            },
            [UiFrameWorkComponent.Components.WebTriggerEditor[0]]: {
                [UiFrameWorkComponent.Components.WebTriggerEditor[1].InputTriggerField]: [[UiFrameWorkComponent.Components.WebTriggerEditor[1].InputTriggerField], {
                    'font-weight': '500',
                    'font-size': '1.6rem',
                    'color': '#495055',
                    'padding': '15px 15px',
                    'border': '2px solid #D9D9D9',
                    'border-radius': '0.5rem',
                    'box-sizing': 'border-box',
                    'outline': 'none',
                    'font-family': 'B Lotus',
                }],
                [UiFrameWorkComponent.GeneratorStyle.BaseComponent]: ['Web-TriggerEditor', {
                    'color': '#495055',
                    'display': 'inline-flex',
                    'position': 'relative',
                }],
                [UiFrameWorkComponent.Components.WebTriggerEditor[1].WebTriggerEditorContainerOfTrigger]: [[UiFrameWorkComponent.Components.WebTriggerEditor[1].WebTriggerEditorContainerOfTrigger], {
                    'display': 'inline-flex',
                    // 'position': 'relative',
                    'color': '#495055',
                    // 'border': '2px solid #D9D9D9',
                    // 'border-radius': '0.5rem',
                    // 'box-sizing': 'border-box',
                    'outline': 'none',
                    'overflow': 'hidden'
                }],
                [UiFrameWorkComponent.Components.WebTriggerEditor[1].SpanPlaceHolderTrigger]: [[UiFrameWorkComponent.Components.WebTriggerEditor[1].SpanPlaceHolderTrigger], {
                    'position': 'absolute',
                    'margin': '0px 35px',
                    'padding': '0 0px',
                    'font-family': 'B Lotus',
                    'color': '#6c757d',
                    'display': 'flex',
                    'align-items': 'center',
                    'font-size': '1.3rem',
                    'top': '0',
                    // 'left': '17px',
                    'transition': 'all 0.2s',
                    'transform-origin': '0% 0%',
                    'background': 'none',
                    'pointer-events': 'none',
                    'height': '100%'
                }],
                [UiFrameWorkComponent.Components.WebTriggerEditor[1].SpanPlaceHolderFocusTrigger]: [[UiFrameWorkComponent.Components.WebTriggerEditor[1].SpanPlaceHolderFocusTrigger], {
                    'transform': 'scale(0.8) translateY(-30px) translateX(-36px)',
                    // 'background': 'rgb(235,0,215 / 7%)',
                    'color': 'wheat'
                }],
                [UiFrameWorkComponent.Components.WebTriggerEditor[1].WebTriggerEditorRemove]: [[UiFrameWorkComponent.Components.WebTriggerEditor[1].WebTriggerEditorRemove], {
                    'cursor': 'pointer',
                    'background-image': 'url("Resources/Themes/IMG/Components/AttachmentUI/remove.svg")',
                    'background-repeat': 'no-repeat',
                    'background-size': '1rem',
                    'border': 'none',
                    'background-position': 'center',
                    'height': '16px',
                    'flex': '1',
                    'transition': 'all 0.2s',
                    '$hover$': {
                        'background-color': 'red'
                    }
                }],
                [UiFrameWorkComponent.Components.WebTriggerEditor[1].WebTriggerEditorFilter]: [[UiFrameWorkComponent.Components.WebTriggerEditor[1].WebTriggerEditorFilter], {
                    'cursor': 'pointer',
                    'background-image': 'url("Resources/Themes/IMG/Toolbar/Buttons/Tab/filter.svg")',
                    'background-repeat': 'no-repeat',
                    'background-size': '1rem',
                    'border': 'none',
                    'background-position': 'center',
                    'height': '16px',
                    'flex': '1',
                    'transition': 'all 0.2s',
                    '$hover$': {
                        'background-color': 'rgb(218,190,13)',
                    }
                }],
                [UiFrameWorkComponent.Components.WebTriggerEditor[1].WebTriggerEditorSpanPlaceHolderFieldSet]: [[UiFrameWorkComponent.Components.WebTriggerEditor[1].WebTriggerEditorSpanPlaceHolderFieldSet], {
                    // 'text-align': 'left',
                    'position': 'relative',
                    'bottom': '0',
                    'right': '0',
                    // 'top': '-5px',
                    'left': '0',
                    'margin': '0',
                    // 'padding': '0 8px',
                    // 'pointer-events': 'none',
                    'border-radius': '15px',
                    'border-style': 'solid',
                    'border-width': '1px',
                    'overflow': 'hidden',
                    'min-width': '0%',
                    'border-color': 'rgba(0, 0, 0, 0.23)',
                    'padding': '0px',
                    'margin-inline': '0px',
                    'padding-inline': '0px',
                    'padding-block': '0px'
                }],
                [UiFrameWorkComponent.Components.WebTriggerEditor[1].WebTriggerEditorSpanPlaceHolderFieldSetLegend]: [[UiFrameWorkComponent.Components.WebTriggerEditor[1].WebTriggerEditorSpanPlaceHolderFieldSetLegend], {
                    'padding': '0px',
                    'height': '1px',
                    'margin-inline': '0px',
                    'padding-inline': '0px',
                    'padding-block': '0px'
                }],
                [UiFrameWorkComponent.Components.WebTriggerEditor[1].WebTriggerEditorSpanPlaceHolderFieldSetLegendSpan]: [[UiFrameWorkComponent.Components.WebTriggerEditor[1].WebTriggerEditorSpanPlaceHolderFieldSetLegendSpan], {
                    'padding-left': '5px',
                    'padding-right': '5px',
                    'display': 'inline-block',
                    'opacity': '0',
                    'visibility': 'visible'
                }]
            },
            [UiFrameWorkComponent.Components.WebDateEditor[0]]: {
                [UiFrameWorkComponent.GeneratorStyle.BaseComponent]: ['Web-DateEditor', {
                    'display': 'inline-flex',
                    'position': 'relative'
                }],
                [UiFrameWorkComponent.Components.WebDateEditor[1].WebDateEditorInput]: [[UiFrameWorkComponent.Components.WebDateEditor[1].WebDateEditorInput], {
                    'font-weight': '500',
                    'font-size': '1.6rem',
                    'color': '#d5e6f3',
                    'border': 'none',
                    'border-radius': '1rem',
                    'box-sizing': 'border-box',
                    'outline': 'none',
                    'font-family': 'B Lotus',
                    'background-color': 'transparent'
                }],
                [UiFrameWorkComponent.Components.WebDateEditor[1].WebDateEditorTrigger]: [[UiFrameWorkComponent.Components.WebDateEditor[1].WebDateEditorTrigger], {
                    'cursor': 'pointer',
                    'background-image': 'url("Resources/Themes/IMG/Editors/date.svg")',
                    'background-repeat': 'no-repeat',
                    'background-size': 'contain',
                    'border': 'none',
                    'background-position': 'center',
                    '$hover$': {
                        'opacity': '1',
                        'background-color': 'rgb(218,190,13)',
                    }
                }]
            },
            [UiFrameWorkComponent.Components.WebComboBoxEditor[0]]: {
                [UiFrameWorkComponent.GeneratorStyle.BaseComponent]: ['Web-ComboBoxEditor', {}],
                [UiFrameWorkComponent.Components.WebComboBoxEditor[1].WebComboBoxEditorInput]: [[UiFrameWorkComponent.Components.WebComboBoxEditor[1].WebComboBoxEditorInput], {
                    'padding': '0px',
                    'border': '0px',
                    'outline': 'none'
                }],
                [UiFrameWorkComponent.Components.WebComboBoxEditor[1].WebComboBoxEditorTrigger]: [[UiFrameWorkComponent.Components.WebComboBoxEditor[1].WebComboBoxEditorTrigger], {
                    'cursor': 'pointer',
                    'background-image': 'url("Resources/Themes/IMG/Editors/arrow.svg")',
                    'background-repeat': 'no-repeat',
                    'background-size': '2rem',
                    'border': 'none',
                    'background-position': 'center',
                    '$hover$': {
                        'opacity': '1',
                        'background-color': 'rgb(218,190,13)',
                    }
                }],
                [UiFrameWorkComponent.Components.WebComboBoxEditor[1].WebComboBoxEditorItemTagP]: [[UiFrameWorkComponent.Components.WebComboBoxEditor[1].WebComboBoxEditorItemTagP], {
                    'text-align': 'center',
                    'overflow': 'hidden',
                    'text-overflow': 'ellipsis',
                    'white-space': 'nowrap',
                    'padding': '4px 4px 4px',
                    'margin': '0px',
                    'font-family': 'B Lotus',
                    'font-size': '14px'
                }]
            },
            [UiFrameWorkComponent.Components.WebNumberEditor[0]]: {
                [UiFrameWorkComponent.GeneratorStyle.BaseComponent]: ['WebNumberEditor', {}],
                [UiFrameWorkComponent.Components.WebNumberEditor[1].WebNumberEditorInput]: [[UiFrameWorkComponent.Components.WebNumberEditor[1].WebNumberEditorInput], {
                    'padding': '0px',
                    'border': '0px',
                    'outline': 'none'
                }],
                [UiFrameWorkComponent.Components.WebNumberEditor[1].WebNumberEditorAcceleratorSpinner]: [[UiFrameWorkComponent.Components.WebNumberEditor[1].WebNumberEditorAcceleratorSpinner], {
                    'padding': '0px',
                    'border': '0px',
                    'outline': 'none'
                }],
                [UiFrameWorkComponent.Components.WebNumberEditor[1].WebNumberEditorNormalSpinner]: [[UiFrameWorkComponent.Components.WebNumberEditor[1].WebNumberEditorNormalSpinner], {
                    'padding': '0px',
                    'border': '0px',
                    'outline': 'none'
                }],
            },
            [UiFrameWorkComponent.Components.WebAttachmentEditor[0]]: {
                [UiFrameWorkComponent.GeneratorStyle.BaseComponent]: ['Web-AttachmentEditor', {}],
                [UiFrameWorkComponent.Components.WebAttachmentEditor[1].AttachmentTrigger]: [[UiFrameWorkComponent.Components.WebAttachmentEditor[1].AttachmentTrigger], {
                    'cursor': 'pointer',
                    'background-image': 'url("Resources/Themes/IMG/Editors/attachments.svg")',
                    'background-repeat': 'no-repeat',
                    'background-size': 'contain',
                    'border': 'none',
                    // 'border-radius': '20px',
                    'background-position': 'center',
                    '$hover$': {
                        'opacity': '1',
                        'background-color': 'rgb(218,190,13)',
                    }
                }],
            },
            [UiFrameWorkComponent.Components.WebPictureEditor[0]]: {
                [UiFrameWorkComponent.Components.WebPictureEditor[1].WebPictureEditorMasterDiv]: [[UiFrameWorkComponent.Components.WebPictureEditor[1].WebPictureEditorMasterDiv], {
                    'cursor': 'pointer',
                    'background-image': 'url("Resources/Themes/IMG/Editors/attachments.svg")',
                    'background-repeat': 'no-repeat',
                    'background-size': 'contain',
                    'border': 'none',
                    'border-radius': '20px',
                    'background-position': 'center'
                }],
            },
            [UiFrameWorkComponent.Components.WebTextPageNumberEditor[0]]: {
                [UiFrameWorkComponent.Components.WebTextPageNumberEditor[1].WebTextPageNumberEditorInput]: [[UiFrameWorkComponent.Components.WebTextPageNumberEditor[1].WebTextPageNumberEditorInput], {
                    'font-weight': '500',
                    'font-size': '1rem',
                    'color': '#495055',
                    'padding': '0',
                    'border': '2px solid #d95cfb',
                    'border-radius': '13px',
                    'box-sizing': 'border-box',
                    'height': '100%'
                    // 'outline': 'none'
                }],
                [UiFrameWorkComponent.Components.WebTextPageNumberEditor[1].WebTextPageNumberEditorSpanPlaceHolder]: [[UiFrameWorkComponent.Components.WebTextPageNumberEditor[1].WebTextPageNumberEditorSpanPlaceHolder], {
                    'position': 'absolute',
                    'margin': '0px',
                    'padding': '0px',
                    'font-family': 'Roboto, sans-serif',
                    'color': '#6c757d',
                    'display': 'flex',
                    'align-items': 'center',
                    'font-size': '1rem',
                    'top': '0',
                    'left': '17px',
                    'transition': 'all 0.2s',
                    'transform-origin': '0% 0%',
                    'background': 'none',
                    'pointer-events': 'none',
                    'height': '100%'
                }],
                [UiFrameWorkComponent.Components.WebTextPageNumberEditor[1].WebTextPageNumberEditorSpanPlaceHolderFocusText]: [[UiFrameWorkComponent.Components.WebTextPageNumberEditor[1].WebTextPageNumberEditorSpanPlaceHolderFocusText], {
                    'transform': 'scale(0.7) translateY(-6px) translateX(-16px)',
                }]
            },
            [UiFrameWorkComponent.Components.PopupCalendar[0]]: {
                [UiFrameWorkComponent.GeneratorStyle.BaseComponent]: ['PopupCalendar', {
                    'background-color': 'white',
                    // 'box-shadow': 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',
                    // 'backdrop-filter': 'blur(5px)'
                }],
                [UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarTable]: [[UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarTable], {
                    'table-layout': 'fixed'
                }],
                [UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarHide]: [[UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarHide], {}],
                [UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarWeekName]: [[UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarWeekName], {
                    'text-align': 'center',
                    'box-shadow': 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                    'background-color': 'rgb(40,100,159)'
                }],
                [UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarDayNormal]: [[UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarDayNormal], {
                    'text-align': 'center',
                    'box-shadow': 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                    'transition': '0.3s',
                    '$hover$': {
                        'box-shadow': '0px 5px 10px 0px rgba(0, 0, 0, 0.5)',
                        'background-color': 'rgb(225,213,18)'
                    }

                }],
                [UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarSelectDay]: [[UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarSelectDay], {
                    'text-align': 'center',
                    'box-shadow': 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'
                }],
                [UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarNowDay]: [[UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarNowDay], {
                    'text-align': 'center',
                    'box-shadow': 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;'
                }],
                [UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarRestDay]: [[UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarRestDay], {
                    'text-align': 'center',
                    'box-shadow': 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;',
                    'background-color': 'rgb(246,5,5)'
                }],
                [UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarOtherMonthDay]: [[UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarOtherMonthDay], {
                    'text-align': 'center',
                    // 'box-shadow': 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset'
                }],
                [UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarMonthYear]: [[UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarMonthYear], {
                    'text-align': 'center',
                    // 'box-shadow': 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset'
                }],
                [UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarBeforeBtn]: [[UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarBeforeBtn], {
                    'text-align': 'center',
                    // 'background-image': 'url("Resources/Themes/IMG/Editors/arrow-calendar.svg")',
                    'background-repeat': 'no-repeat',
                    'background-size': 'contain',
                    'border': 'none',
                    // 'border-radius': '20px',
                    'transform': 'rotate(180deg)',
                }],
                [UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarNextBtn]: [[UiFrameWorkComponent.Components.PopupCalendar[1].PopupCalendarNextBtn], {
                    'text-align': 'center',
                    // 'background-image': 'url("Resources/Themes/IMG/Editors/arrow-calendar.svg")',
                    'background-repeat': 'no-repeat',
                    'background-size': 'contain',
                    'border': 'none',
                    // 'border-radius': '20px',
                    'transform': 'rotate(0deg)',
                    'transition': '0.5s all',
                    '$hover$': {
                        'background-color': 'red'
                    }
                }],
            },
            [UiFrameWorkComponent.Components.PopupComboBox[0]]: {
                [UiFrameWorkComponent.GeneratorStyle.BaseComponent]: ['PopupComboBox', {
                    'background-color': 'white',
                    'box-shadow': 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',
                    'transition': 'all .5s'
                }],
                [UiFrameWorkComponent.Components.PopupComboBox[1].PopupComboBox]: [[UiFrameWorkComponent.Components.PopupComboBox[1].PopupComboBox], {
                    // 'box-shadow': 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'
                }],
            },
            [UiFrameWorkComponent.Components.GlobalFloatButton[0]]: {
                [UiFrameWorkComponent.GeneratorStyle.BaseComponent]: ['GlobalFloatButton', {
                    'width': '40px',
                    'height': '40px',
                    'border': 'none',
                    'border-radius': '20px',
                    'outline': 'none',
                    'color': 'white',
                    'cursor': 'pointer',
                    'box-shadow': 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px'
                }]
            },
            [UiFrameWorkComponent.Components.Progress[0]]: {
                [UiFrameWorkComponent.Components.Progress[1].ProgressContainer]: [[UiFrameWorkComponent.Components.Progress[1].ProgressContainer], {
                    'position': 'relative',
                    'height': '100%',
                    'width': '100%'
                }],
                [UiFrameWorkComponent.Components.Progress[1].ProgressBar]: [[UiFrameWorkComponent.Components.Progress[1].ProgressBar], {
                    'position': 'absolute',
                    'height': '100%',
                    'background': 'red'
                }]
            },
            [UiFrameWorkComponent.Components.ResizeComponent[0]]: {
                [UiFrameWorkComponent.Components.ResizeComponent[1].Border]: [[UiFrameWorkComponent.Components.ResizeComponent[1].Border], {
                    'border': '1px solid',
                    'position': 'absolute',
                    'opacity': '0'
                }]
            },
            [UiFrameWorkComponent.Components.DragComponent[0]]: {
                [UiFrameWorkComponent.GeneratorStyle.BaseComponent]: ['DragComponent-Div', {
                    // 'transition': '0.5s all',
                    'opacity': '1',
                    '$hover$': {
                        'opacity': '1',
                        'background-color': 'rgb(55,10,130)',
                    }
                }],
                [UiFrameWorkComponent.Components.DragComponent[1].Border]: [[UiFrameWorkComponent.Components.DragComponent[1].Border], {
                    'opacity': '0'
                }]
            },
            [UiFrameWorkComponent.Components.ListView[0]]: {
                [UiFrameWorkComponent.GeneratorStyle.BaseComponent]: ['ListView-Div', {
                    '-moz-user-select': 'none',
                    '-khtml-user-select': 'none',
                    '-webkit-user-select': 'none',
                    '-ms-user-select': 'none',
                    'user-select': 'none'
                }],
                [UiFrameWorkComponent.Components.ListView[1].Container]: [[UiFrameWorkComponent.Components.ListView[1].Container], {
                    'margin': '1px',
                    'padding': '0px',
                    'overflow': 'auto',
                    'white-space': 'nowrap',
                    '$webkit-scrollbar$': {
                        'width': '5px',
                        'height': '5px',
                        'background-color': 'rgba(229,226,34,0.85)'
                    },
                    '$webkit-scrollbar-thumb$': {
                        'background': '#de5050'
                    }
                }],
                [UiFrameWorkComponent.Components.ListView[1].Item]: [[UiFrameWorkComponent.Components.ListView[1].Item], {
                    'display': 'flex',
                    'align-items': 'center',
                    // 'justify-content': 'center',
                    'position': 'relative',
                    // 'margin': '20px auto',
                    'height': '40px',
                    'background': 'white',
                    // 'border-radius': '75px',
                    'font-family': 'Montserrat, sans-serif',
                    'font-size': '20px',
                    'font-weight': 'lighter',
                    // 'letter-spacing': '2px',
                    'transition': '1s box-shadow',
                    //'width': '100%'
                    '$hover$': {
                        'box-shadow': '0 5px 35px 0px rgba(0,0,0,.1)',
                        'background-color': '#cce8ff',
                        'border-color': '#84bcea'
                    }
                }],
                [UiFrameWorkComponent.Components.ListView[1].ItemHover]: [[UiFrameWorkComponent.Components.ListView[1].ItemHover], {
                    'box-shadow': '0 5px 35px 0px rgba(0,0,0,.1)',
                    'background-color': '#cce8ff',
                    'border-color': '#84bcea'
                }],
                [UiFrameWorkComponent.Components.ListView[1].ItemSelected]: [[UiFrameWorkComponent.Components.ListView[1].ItemSelected], {
                    'background-color': 'rgb(60,60,10)'
                }]
            },
            [UiFrameWorkComponent.Components.TabPanel[0]]: {
                [UiFrameWorkComponent.Components.TabPanel[1].TabPanelMasterDiv]: [[UiFrameWorkComponent.Components.TabPanel[1].TabPanelMasterDiv], {
                    'background-color': '#442a2a63',
                }],
                [UiFrameWorkComponent.Components.TabPanel[1].TabItemContainer]: [[UiFrameWorkComponent.Components.TabPanel[1].TabItemContainer], {
                    '$webkit-scrollbar$': {
                        'width': '5px',
                        'height': '5px',
                        'background-color': 'rgba(229,226,34,0.85)'
                    },
                    '$webkit-scrollbar-thumb$': {
                        'background': '#de5050'
                    }
                }],
                [UiFrameWorkComponent.Components.TabPanel[1].TabPanelTitle]: [[UiFrameWorkComponent.Components.TabPanel[1].TabPanelTitle], {
                    'display': 'inline-block',
                    'border-top': '1px solid #dae0e700',
                    'list-style-type': 'none',
                    'overflow-x': 'auto',
                    'overflow-y': 'hidden',
                    '$webkit-scrollbar$': {
                        'width': '5px',
                        'height': '5px',
                        'background-color': 'rgba(229,226,34,0.85)'
                    },
                    '$webkit-scrollbar-thumb$': {
                        'background': '#de5050'
                    }
                }]
            },
            [UiFrameWorkComponent.Components.TabItemTitle[0]]: {
                [UiFrameWorkComponent.Components.TabItemTitle[1].TabItemTitleMasterTop]: [UiFrameWorkComponent.Components.TabItemTitle[1].TabItemTitleMasterTop, {
                    'transition': 'all .25s',
                    // 'float': 'left',
                    'margin': '-1px 8px -1px 0',
                    'border': '1px solid #DAE0E7',
                    'background': '#F9F9F9',
                    'border-radius': '8px 8px 0 0',
                    'overflow': 'hidden',
                    '$hover$': {
                        'background-color': 'rgb(190,166,234)',
                    }
                }],
                [UiFrameWorkComponent.Components.TabItemTitle[1].TabItemTitleMasterButton]: [UiFrameWorkComponent.Components.TabItemTitle[1].TabItemTitleMasterButton, {
                    'transition': 'all .25s',
                    // 'float': 'left',
                    'margin': '-1px 8px -1px 0',
                    'border': '1px solid #DAE0E7',
                    'background': '#F9F9F9',
                    'border-radius': '0 0 8px 8px',
                    'overflow': 'hidden',
                    '$hover$': {
                        'background-color': 'rgb(190,166,234)',
                    }
                }],
                [UiFrameWorkComponent.Components.TabItemTitle[1].TabItemTitleMasterTopActive]: [UiFrameWorkComponent.Components.TabItemTitle[1].TabItemTitleMasterTopActive, {
                    'transition': 'all .25s',
                    // 'float': 'left',
                    'margin': '0px 2px 0px 0px',
                    'border': '1px solid #DAE0E7',
                    'border-radius': '16px 16px 0 0',
                    'overflow': 'hidden',
                    'border-bottom': 'none',
                    'background': '#837ea9',
                    // '@keyframes tabItemActive': {
                    //     '0%': {
                    //         'background-color': '#0773f8',
                    //         'box-shadow': '0 0 5px #2ba805'
                    //     },
                    //     '50%': {
                    //         'background-color': '#9ecbea',
                    //         'box-shadow': '0 0 20px #49e819'
                    //     },
                    //     '100%': {
                    //         'background-color': '#72d0d0',
                    //         'box-shadow': '0 0 5px #2ba805'
                    //     }
                    // },
                    // 'animation': 'tabItemActive 1300ms infinite'
                }],
                [UiFrameWorkComponent.Components.TabItemTitle[1].TabItemTitleMasterButtonActive]: [UiFrameWorkComponent.Components.TabItemTitle[1].TabItemTitleMasterButtonActive, {
                    'transition': 'all .25s',
                    'margin': '-1px 2px -1px 0',
                    'border': '1px solid #DAE0E7',
                    'border-radius': '0 0 16px 16px',
                    'overflow': 'hidden',
                    'border-top': 'none',
                    'background': '#837ea9',
                }],
                [UiFrameWorkComponent.Components.TabItemTitle[1].TabItemText]: [UiFrameWorkComponent.Components.TabItemTitle[1].TabItemText, {
                    'transition': 'all .25s',
                    'display': 'inline-block',
                    'padding': '3px 8px 2px 8px',
                    'font-family': 'B Lotus',
                }],
                [UiFrameWorkComponent.Components.TabItemTitle[1].TabItemClose]: [[UiFrameWorkComponent.Components.TabItemTitle[1].TabItemClose], {
                    'transition': 'all .25s',
                    'display': 'inline-block',
                    'width': '16px',
                    'height': '16px',
                    'margin': '0 14px 0 12px',
                    'padding': '3px',
                    'border-radius': '16px',
                    'line-height': '16px',
                    'text-align': 'center',
                    'cursor': 'pointer',
                    '$hover$': {
                        'background': '#DAE0E7'
                    }
                }],
            },
            [UiFrameWorkComponent.Components.GraphTabPanel[0]]: {
                [UiFrameWorkComponent.Components.GraphTabPanel[1].GraphTabPanelMasterDiv]: [[UiFrameWorkComponent.Components.GraphTabPanel[1].GraphTabPanelMasterDiv], {
                    'background-color': 'transparent'
                }],
                [UiFrameWorkComponent.Components.GraphTabPanel[1].GraphTabPanelContainer]: [[UiFrameWorkComponent.Components.GraphTabPanel[1].GraphTabPanelContainer], {
                    'background-color': 'transparent'
                }],
            },
            [UiFrameWorkComponent.Components.GraphTabPanelTitle[0]]: {
                [UiFrameWorkComponent.Components.GraphTabPanelTitle[1].GraphTabPanelTitleMaster]: [[UiFrameWorkComponent.Components.GraphTabPanelTitle[1].GraphTabPanelTitleMaster], {}],
            },
            [UiFrameWorkComponent.Components.GraphTabItemTitle[0]]: {
                [UiFrameWorkComponent.Components.GraphTabItemTitle[1].GraphTabItemTitleText]: [[UiFrameWorkComponent.Components.GraphTabItemTitle[1].GraphTabItemTitleText], {
                    'font-size': '12px',
                    'font-family': 'B Yekan'
                }],
                [UiFrameWorkComponent.Components.GraphTabItemTitle[1].GraphTabItemTitleSVG]: [[UiFrameWorkComponent.Components.GraphTabItemTitle[1].GraphTabItemTitleSVG], {
                    '$hover$': {
                        'stroke': 'black !important',
                        'stroke-width': '2px !important'
                    }
                }],
                [UiFrameWorkComponent.Components.GraphTabItemTitle[1].GraphTabItemTitleSVGSelected]: [[UiFrameWorkComponent.Components.GraphTabItemTitle[1].GraphTabItemTitleSVGSelected], {
                    'stroke': 'blue !important',
                    'stroke-width': '1px !important'
                }]
            },
            [UiFrameWorkComponent.Components.GraphTabItem[0]]: {
                [UiFrameWorkComponent.Components.GraphTabItem[1].GraphTabItemMasterContainer]: [[UiFrameWorkComponent.Components.GraphTabItem[1].GraphTabItemMasterContainer], {
                    'transition': '0.3s all ease-in-out',
                    '$webkit-scrollbar$': {
                        'width': '5px',
                        'height': '5px',
                        'background-color': 'rgba(229,226,34,0.85)'
                    },
                    '$webkit-scrollbar-thumb$': {
                        'background': '#de5050'
                    }
                }],
            },
            [UiFrameWorkComponent.Components.MaskResourceComponent[0]]: {
                [UiFrameWorkComponent.Components.MaskResourceComponent[1].MaskResourceComponent]: [[UiFrameWorkComponent.Components.MaskResourceComponent[1].MaskResourceComponent], {
                    'flex': '1 1 auto',
                    'margin': '10px',
                    'padding': '30px',
                    'text-align': 'center',
                    'text-transform': 'uppercase',
                    'transition': '0.5s',
                    'background-size': '200% auto',
                    'color': 'white',
                    'box-shadow': '0 0 20px #eee',
                    'border-radius': '10px'
                }]
            },
            [UiFrameWorkComponent.Components.ButtonEditor[0]]: {
                [UiFrameWorkComponent.Components.ButtonEditor[1].ButtonEditor]: [[UiFrameWorkComponent.Components.ButtonEditor[1].ButtonEditor], {
                    'position': 'relative',
                    'color': 'var(--textColor2)',
                    'border-radius': '26px',
                    'background-image': 'linear-gradient(90deg, #0065ff, #6942ef, #6554c0, #008cff, #0065ff, #6942ef)',
                    'background-size': '400%',
                    'background-position': '0% 0%',
                    'display': 'block',
                    'min-height': '50px',
                    'padding': '13px 24px',
                    'font-family': '"Lucida Grande", "Helvetica", sans-serif',
                    'font-size': '16px',
                    'line-height': '20px',
                    'font-weight': 'bold',
                    'text-transform': 'uppercase',
                    'text-align': 'center',
                    'border': 'none',
                    'outline': 'none',
                    'box-shadow': 'none',
                    'background-color': 'transparent',
                    'cursor': 'pointer',
                    'transition': '0.3s ease-in-out',
                    'transition-property': 'background, color',
                    '$before$': {
                        'content': '""',
                        'position': 'absolute',
                        'left': '-2px',
                        'top': '-2px',
                        'right': '-2px',
                        'bottom': '-2px',
                        'border-radius': '26px',
                        'background-image': 'linear-gradient(90deg, #0065ff, #6942ef, #6554c0, #008cff, #0065ff, #6942ef)',
                        'background-size': '500%',
                        'background-position': '0% 0%',
                        'filter': 'blur(10px)',
                        'opacity': '0',
                        'z-index': '-1',
                        'transition': 'opacity 0.2s'
                    },
                    '$hover$': {
                        'animation': 'gradientRotate 2s infinite'
                    },
                    '$hover:before$': {
                        'opacity': '1',
                        'animation': 'gradientRotate 2s infinite'
                    }
                }]
            },
            [UiFrameWorkComponent.Components.BaseButton[0]]: {
                [UiFrameWorkComponent.Components.BaseButton[1].BaseButton]: ['BaseButton', {
                    'cursor': 'pointer',
                    'transition': '1s all',
                    '$hover$': {
                        'background-color': 'rgb(55,10,130)',
                    }
                }]
            },
            [UiFrameWorkComponent.Components.PagingToolbar[0]]: {
                [UiFrameWorkComponent.Components.PagingToolbar[1].PagingToolbarToolbar]: [[UiFrameWorkComponent.Components.PagingToolbar[1].PagingToolbarToolbar], {
                    'overflow': 'hidden'
                }],
                [UiFrameWorkComponent.Components.PagingToolbar[1].PagingToolbarFirstPage]: [[UiFrameWorkComponent.Components.PagingToolbar[1].PagingToolbarFirstPage], {
                    '$hover$': {
                        'background-image': 'linear-gradient(90deg, #0065ff, #6942ef, #6554c0, #008cff, #0065ff, #6942ef)'
                    }
                }],
                [UiFrameWorkComponent.Components.PagingToolbar[1].PagingToolbarNextPage]: [[UiFrameWorkComponent.Components.PagingToolbar[1].PagingToolbarNextPage], {
                    '$hover$': {
                        'background-image': 'linear-gradient(90deg, #0065ff, #6942ef, #6554c0, #008cff, #0065ff, #6942ef)'
                    }
                }],
                [UiFrameWorkComponent.Components.PagingToolbar[1].PagingToolbarPreviousPage]: [[UiFrameWorkComponent.Components.PagingToolbar[1].PagingToolbarPreviousPage], {
                    '$hover$': {
                        'background-image': 'linear-gradient(90deg, #0065ff, #6942ef, #6554c0, #008cff, #0065ff, #6942ef)'
                    }
                }],
                [UiFrameWorkComponent.Components.PagingToolbar[1].PagingToolbarLastPage]: [[UiFrameWorkComponent.Components.PagingToolbar[1].PagingToolbarLastPage], {
                    '$hover$': {
                        'background-image': 'linear-gradient(90deg, #0065ff, #6942ef, #6554c0, #008cff, #0065ff, #6942ef)'
                    }
                }]
            },
            [UiFrameWorkComponent.Components.Toolbar[0]]: {
                [UiFrameWorkComponent.Components.Toolbar[1].MasterDivToolbar]: [UiFrameWorkComponent.Components.Toolbar[1].MasterDivToolbar, {
                    'overflow': 'hidden',
                    'background-color': 'rgba(0, 0, 0, 0.4)',
                    'backdrop-filter': 'blur(10px)',
                }]
            },
            [UiFrameWorkComponent.Components.ViewPort[0]]: {
                [UiFrameWorkComponent.Components.ViewPort[1].ViewPortMasterDiv]: [[UiFrameWorkComponent.Components.ViewPort[1].ViewPortMasterDiv], {}]
            },
            [UiFrameWorkComponent.Components.Menu[0]]: {
                [UiFrameWorkComponent.Components.Menu[1].MenuMasterDiv]: [[UiFrameWorkComponent.Components.Menu[1].MenuMasterDiv], {
                    'padding': '0',
                    'margin': '0',
                    'border-radius': '5px',
                    'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.2)',
                    'position': 'absolute',
                    'top': '100%',
                    'left': '0',
                    'color': 'inherit',
                    'font': '400 18px Roboto',
                    'white-space': 'nowrap',
                    'cursor': 'default',
                    'transition': '0.3s',
                    'background-color': 'whitesmoke'
                }],
                [UiFrameWorkComponent.Components.Menu[1].MenuItem]: [[UiFrameWorkComponent.Components.Menu[1].MenuItem], {
                    'list-style': 'none',
                    'display': 'flex',
                    'width': '100%',
                    'border-bottom': 'solid 1px #f2f5ff',
                    'text-align': 'center',
                    'position': 'relative',
                    'flex-grow': '1',
                    'align-items': 'stretch',
                    '$last_child$': {
                        'border': 'none'
                    }
                }],
                [UiFrameWorkComponent.Components.Menu[1].MenuItemText]: [[UiFrameWorkComponent.Components.Menu[1].MenuItemText], {
                    'width': '100%',
                    'display': 'flex',
                    'align-items': 'center',
                    'flex-flow': 'column',
                    'justify-content': 'center',
                    'transition': 'all 0.2s ease',
                    'margin': '0px',
                    'padding': '10px',

                    // '$hover$': {
                    //     'background': '#fafafa',
                    //     'transition': 'all 0.2s ease'
                    // }
                }]
            },
            [UiFrameWorkComponent.Components.Login[0]]: {
                [UiFrameWorkComponent.Components.Login[1].LoginContainer]: [[UiFrameWorkComponent.Components.Login[1].LoginContainer], {
                    'border-radius': '5px',
                    'background-color': '#5d5b5e'
                }]
            },
            [UiFrameWorkComponent.Components.Logo[0]]: {
                [UiFrameWorkComponent.Components.Logo[1].LogoContainer]: [[UiFrameWorkComponent.Components.Logo[1].LogoContainer], {
                    'border-radius': '5px',
                    'background-color': '#5d5b5e'
                }]
            },
            [UiFrameWorkComponent.Components.Buttons[0]]: {
                [UiFrameWorkComponent.Components.Buttons[1].btn_multi]: [[UiFrameWorkComponent.Components.Buttons[1].btn_multi], {
                    // 'border-radius': '12px',
                    // 'border': '1px solid',
                    'overflow': 'hidden',
                    'padding': '4px 0px 0px 0px'
                }],
                [UiFrameWorkComponent.Components.Buttons[1].btn_single]: [[UiFrameWorkComponent.Components.Buttons[1].btn_single], {
                    'transition': '0.3s',
                    'overflow': 'hidden',
                }],
                [UiFrameWorkComponent.Components.Buttons[1].btn_table]: [[UiFrameWorkComponent.Components.Buttons[1].btn_table], {
                    'transition': '0.3s',
                    'overflow': 'hidden'
                }],
                [UiFrameWorkComponent.Components.Buttons[1].btn_form_table]: [[UiFrameWorkComponent.Components.Buttons[1].btn_form_table], {
                    'transition': '0.3s',
                    'overflow': 'hidden',
                }],
                [UiFrameWorkComponent.Components.Buttons[1].btn_active]: [[UiFrameWorkComponent.Components.Buttons[1].btn_active], {
                    'background-color': 'rgb(225,213,18)'
                }],
                [UiFrameWorkComponent.Components.Buttons[1].btn_general]: [[UiFrameWorkComponent.Components.Buttons[1].btn_general], {
                    'transition': '0.3s',
                    '$hover$': {
                        'box-shadow': '0px 5px 10px 0px rgba(0, 0, 0, 0.5)',
                        'background-color': 'rgb(225,213,18)'
                    }
                }],
                [UiFrameWorkComponent.Components.Buttons[1].btn_refresh]: [[UiFrameWorkComponent.Components.Buttons[1].btn_refresh], {
                    'overflow': 'hidden',
                }],
            },
            [UiFrameWorkComponent.Components.ButtonPlug[0]]: {
                [UiFrameWorkComponent.Components.ButtonPlug[1].ButtonPlug_Master]: [[UiFrameWorkComponent.Components.ButtonPlug[1].ButtonPlug_Master], {
                    'display': 'flex',
                    'border-radius': '5px',
                    'overflow': 'hidden'
                }],
                [UiFrameWorkComponent.Components.ButtonPlug[1].ButtonPlug_Icon]: [[UiFrameWorkComponent.Components.ButtonPlug[1].ButtonPlug_Icon], {
                    'background-repeat': 'no-repeat',
                    'background-size': '1rem',
                    'border': 'none',
                    'background-position': 'center',
                }],
                [UiFrameWorkComponent.Components.ButtonPlug[1].ButtonPlug_Arrow]: [[UiFrameWorkComponent.Components.ButtonPlug[1].ButtonPlug_Arrow], {
                    'background-image': 'url(Resources/Themes/IMG/Editors/arrow.svg)',
                    'background-repeat': 'no-repeat',
                    'background-size': '1rem',
                    'border': 'none',
                    'background-position': 'center',
                    'transition': '0.3s',
                    'cursor': 'pointer',
                    '$hover$': {
                        'background-color': '#3354f1'
                    }
                }],
                [UiFrameWorkComponent.Components.ButtonPlug[1].ButtonPlug_PopUpItemPTag]: [[UiFrameWorkComponent.Components.ButtonPlug[1].ButtonPlug_PopUpItemPTag], {
                    'text-align': 'center',
                    'overflow': 'hidden',
                    'text-overflow': 'ellipsis',
                    'white-space': 'nowrap',
                    'padding': '4px 4px 4px',
                    'margin': '0px',
                    'font-family': 'B Lotus',
                    'font-size': '14px'
                }],
            },
            [UiFrameWorkComponent.Components.MaskComponent[0]]: {
                [UiFrameWorkComponent.Components.MaskComponent[1].MaskComponentMaster]: [[UiFrameWorkComponent.Components.MaskComponent[1].MaskComponentMaster], {
                    'background-color': 'rgb(255,255,255)',
                    'opacity': '0.5'
                }],
                [UiFrameWorkComponent.Components.MaskComponent[1].MaskComponentIcon]: [[UiFrameWorkComponent.Components.MaskComponent[1].MaskComponentIcon], {
                    'width': '40px',
                    'height': '30px',
                    '--c': 'no-repeat linear-gradient(#000 0 0)',
                    'background': 'var(--c) 0    100%/8px 30px,var(--c) 50%  100%/8px 20px,var(--c) 100% 100%/8px 10px',
                    'position': 'relative',
                    'clip-path': 'inset(-100% 0)',
                    'margin': '0 auto',
                    'top': '50%',
                    'transform': 'translate(0, -50%)',
                    '$before$': {
                        'content': '""',
                        'position': 'absolute',
                        'width': '8px',
                        'height': '8px',
                        'border-radius': '50%',
                        'background': '#000',
                        'left': '-16px',
                        'top': '0',
                        'animation': 'l5-1 2s   linear infinite, l5-2 0.5s cubic-bezier(0,200,.8,200) infinite',
                        '@keyframes l5-1': {
                            '0%': {
                                'left': '-16px',
                                'transform': 'translateY(-8px)'
                            },
                            '100%': {
                                'left': 'calc(100% + 8px)',
                                'transform': 'translateY(22px)'
                            }
                        },
                        '@keyframes l5-2': {
                            '100%': {
                                'top': '-0.1px'
                            }
                        }
                    }
                }],
                [UiFrameWorkComponent.Components.MaskComponent[1].MaskComponentTitle]: [[UiFrameWorkComponent.Components.MaskComponent[1].MaskComponentTitle], {}],
            },
            [UiFrameWorkComponent.Components.Accordion[0]]: {
                [UiFrameWorkComponent.Components.Accordion[1].AccordionMaster]: [[UiFrameWorkComponent.Components.Accordion[1].AccordionMaster], {
                    'display': 'block'
                }],
                [UiFrameWorkComponent.Components.Accordion[1].AccordionFrame]: [[UiFrameWorkComponent.Components.Accordion[1].AccordionFrame], {
                    'overflow': 'hidden',
                    'background-color': '#fff',
                    '-webkit-box-shadow': '0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12)',
                    'box-shadow': '0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12)',
                    '-webkit-transition': 'margin .2s cubic-bezier(.4, 0, .2, 1)',
                    'transition': 'all .2s cubic-bezier(.4, 0, .2, 1)',
                    'will-change': 'margin, height',
                    'border-top': '1px solid #e0e0e0',
                    '$first_child$': {
                        'border-radius': '16px 16px 0 0'
                    },
                    '$last_child$': {
                        'border-radius': '0 0 16px 16px'
                    }
                }],
                [UiFrameWorkComponent.Components.Accordion[1].AccordionFrameOpen]: [UiFrameWorkComponent.Components.Accordion[1].AccordionFrameOpen, {
                    // 'margin': '7px 1px'
                }],
                [UiFrameWorkComponent.Components.Accordion[1].AccordionFrameClose]: [UiFrameWorkComponent.Components.Accordion[1].AccordionFrameClose, {
                    // 'margin': '2px 1px'
                }],
                [UiFrameWorkComponent.Components.Accordion[1].AccordionTitleP]: [UiFrameWorkComponent.Components.Accordion[1].AccordionTitleP, {
                    'margin': '0px'
                }],
                [UiFrameWorkComponent.Components.Accordion[1].AccordionTitle]: [UiFrameWorkComponent.Components.Accordion[1].AccordionTitle, {
                    'margin': '0',
                    'font-size': '18px',
                    'cursor': 'pointer',
                    '-webkit-user-select': 'none',
                    '-moz-user-select': 'none',
                    '-ms-user-select': 'none',
                    'user-select': 'none',
                    '-webkit-touch-callout': 'none',
                    'position': 'relative',
                    'padding': '4px 14px',
                    'background-color': '#48d9f3',
                    'display': 'flex',
                    'justify-content': 'space-between',
                    'font-family': 'B Lotus',
                    '$active$': {
                        'background-color': '#FF0000'
                    }
                }],
                [UiFrameWorkComponent.Components.Accordion[1].AccordionTitleOpen]: [UiFrameWorkComponent.Components.Accordion[1].AccordionTitleOpen, {}],
                [UiFrameWorkComponent.Components.Accordion[1].AccordionTitleClose]: [UiFrameWorkComponent.Components.Accordion[1].AccordionTitleClose, {
                    'font-style': 'italic'
                }],
                [UiFrameWorkComponent.Components.Accordion[1].AccordionIcon]: [UiFrameWorkComponent.Components.Accordion[1].AccordionIcon, {
                    'align-content': 'center',
                    'height': 'auto',
                    'transition': 'all 1s'
                }],
                [UiFrameWorkComponent.Components.Accordion[1].AccordionIconClose]: [UiFrameWorkComponent.Components.Accordion[1].AccordionIconClose, {
                    'transform': 'rotate(180deg)'
                }],
                [UiFrameWorkComponent.Components.Accordion[1].AccordionBody]: [UiFrameWorkComponent.Components.Accordion[1].AccordionBody, {
                    'overflow': 'hidden',
                    'font-size': '12px',
                    'transition': 'all 1s'
                }],
                [UiFrameWorkComponent.Components.Accordion[1].AccordionBodyOpen]: [UiFrameWorkComponent.Components.Accordion[1].AccordionBodyOpen, {
                    'display': 'block',
                    'overflow': 'scroll'
                }],
                [UiFrameWorkComponent.Components.Accordion[1].AccordionBodyClose]: [UiFrameWorkComponent.Components.Accordion[1].AccordionBodyClose, {
                    'display': 'none'
                }],
                [UiFrameWorkComponent.Components.Accordion[1].AccordionBodyItem]: [UiFrameWorkComponent.Components.Accordion[1].AccordionBodyItem, {
                    'margin': '0px',
                    'transition': 'all 0.5s',
                    'padding': '3px',
                    'font-size': '18px',
                    'font-family': 'B Lotus',
                    '$hover$': {
                        'background-color': '#FFCC00'
                    }
                }],
                [UiFrameWorkComponent.Components.Accordion[1].AccordionBodyItemSelected]: [UiFrameWorkComponent.Components.Accordion[1].AccordionBodyItemSelected, {
                    'background-color': '#0c47e1'
                }],
            },
            [UiFrameWorkComponent.Components.PivotGridComponent[0]]: {
                [UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterTable]: [[UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterTable], {
                    'table-layout': 'fixed'
                }],
                [UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr1]: [[UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr1], {
                    'table-layout': 'auto',
                    'height': '34px'
                }],
                [UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr2]: [[UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr2], {
                    'table-layout': 'auto',
                    'box-sizing': 'border-box'
                }],
                [UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr3]: [[UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr3], {
                    'table-layout': 'auto',
                    'box-sizing': 'border-box'
                }],
                [UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr4]: [[UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr4], {
                    'table-layout': 'auto',
                    'box-sizing': 'border-box'
                }],
                [UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr1_FilterField]: [[UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr1_FilterField], {
                    'border-left': '0 none',
                    'border-color': '#e3e3e3',
                    'color': '#5f5f5f',
                    'background-color': '#e3e3e3',
                    'background-image': 'linear-gradient(white, #e3e3e3)',
                    'padding': '8px',
                    'text-align': 'left',
                    'vertical-align': 'top',
                    'border-style': 'solid',
                    'border-width': '0 0 1px 1px',
                    'border-collapse': 'separate',
                    'border-spacing': '0',
                    'width': '100%',
                }],
                [UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr2_DataField]: [[UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr2_DataField], {
                    'border-left': '0 none',
                    'border-color': '#e3e3e3',
                    'color': '#5f5f5f',
                    'background-color': '#e3e3e3',
                    'background-image': 'linear-gradient(white, #e3e3e3)',
                    'padding': '8px',
                    'text-align': 'left',
                    'vertical-align': 'top',
                    'border-style': 'solid',
                    'border-width': '0 0 1px 1px',
                    'border-collapse': 'separate',
                    'border-spacing': '0',
                    'width': '100%',
                }],
                [UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr2_ColumnField]: [[UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr2_ColumnField], {
                    'border-left': '0 none',
                    'border-color': '#e3e3e3',
                    'color': '#5f5f5f',
                    'background-color': '#e3e3e3',
                    'background-image': 'linear-gradient(white, #e3e3e3)',
                    'padding': '8px',
                    'text-align': 'left',
                    'vertical-align': 'top',
                    'border-style': 'solid',
                    'border-width': '0 0 1px 1px'
                }],
                [UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr3_RowField]: [[UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr3_RowField], {
                    'border-left': '0 none',
                    'border-color': '#e3e3e3',
                    'color': '#5f5f5f',
                    'background-color': '#e3e3e3',
                    'background-image': 'linear-gradient(white, #e3e3e3)',
                    'padding': '8px',
                    'text-align': 'left',
                    'vertical-align': 'top',
                    'border-style': 'solid',
                    'border-width': '0 0 1px 1px'
                }],
                [UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr3_ColumnGrid]: [[UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr3_ColumnGrid], {
                    'border-left': '0 none',
                    'border-color': '#e3e3e3',
                    'color': '#5f5f5f',
                    'background-color': '#e3e3e3',
                    'background-image': 'linear-gradient(white, #e3e3e3)',
                    'padding': '8px',
                    'text-align': 'left',
                    'vertical-align': 'top',
                    'border-style': 'solid',
                    'border-width': '0 0 1px 1px'
                }],
                [UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr4_RowGrid]: [[UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr4_RowGrid], {
                    'border-left': '0 none',
                    'border-color': '#e3e3e3',
                    'color': '#5f5f5f',
                    'background-color': '#e3e3e3',
                    'background-image': 'linear-gradient(white, #e3e3e3)',
                    'padding': '8px',
                    'text-align': 'left',
                    'vertical-align': 'top',
                    'border-style': 'solid',
                    'border-width': '0 0 1px 1px'
                }],
                [UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr4_DataGrid]: [[UiFrameWorkComponent.Components.PivotGridComponent[1].PivotGridComponent_MasterRowTr4_DataGrid], {
                    'border-left': '0 none',
                    'border-color': '#e3e3e3',
                    'color': '#5f5f5f',
                    'background-color': '#e3e3e3',
                    'background-image': 'linear-gradient(white, #e3e3e3)',
                    'padding': '8px',
                    'text-align': 'left',
                    'vertical-align': 'top',
                    'border-style': 'solid',
                    'border-width': '0 0 1px 1px'
                }],
            },
            [UiFrameWorkComponent.Components.PivotFieldComponent[0]]: {
                [UiFrameWorkComponent.Components.PivotFieldComponent[1].PivotFieldComponent_Master]: [[UiFrameWorkComponent.Components.PivotFieldComponent[1].PivotFieldComponent_Master], {
                    'display': 'inline-block',
                    'position': 'relative',
                    'overflow': 'hidden',
                    'white-space': 'nowrap',
                    'border': '1px solid',
                    'padding': '5px',
                    'margin': '0 8px 0 0'
                }],
                [UiFrameWorkComponent.Components.PivotFieldComponent[1].PivotFieldComponent_Title]: [[UiFrameWorkComponent.Components.PivotFieldComponent[1].PivotFieldComponent_Title], {
                    'display': 'inline-block',
                    'position': 'relative',
                    'overflow': 'hidden',
                    'white-space': 'nowrap',
                    'padding': '5px',
                    'margin': '0 8px 0 0'
                }],
                [UiFrameWorkComponent.Components.PivotFieldComponent[1].PivotFieldComponent_FilterIcon_None]: [[UiFrameWorkComponent.Components.PivotFieldComponent[1].PivotFieldComponent_FilterIcon_None], {
                    'margin': '0 6px 0 0px',
                    'line-height': '100%',
                    'text-decoration': 'inherit',
                    'width': '18px',
                    'height': '18px',
                    'background-color': 'transparent',
                    'display': 'inline-block',
                    'vertical-align': 'middle',
                    'cursor': 'pointer',
                    'background-image': 'url("Resources/Themes/IMG/Editors/arrow.svg")',
                    'background-repeat': 'no-repeat',
                    'background-size': 'contain',
                    'border': 'none',
                    'border-radius': '20px',
                    'background-position': 'center'
                }],
                [UiFrameWorkComponent.Components.PivotFieldComponent[1].PivotFieldComponent_FilterIcon_Filter]: [[UiFrameWorkComponent.Components.PivotFieldComponent[1].PivotFieldComponent_FilterIcon_Filter], {
                    'margin': '0 6px 0 0px',
                    'line-height': '100%',
                    'text-decoration': 'inherit',
                    'width': '18px',
                    'height': '18px',
                    'background-color': 'transparent',
                    'display': 'inline-block',
                    'vertical-align': 'middle',
                    'cursor': 'pointer',
                    'background-image': 'url("Resources/Themes/IMG/Toolbar/Buttons/filter.svg")',
                    'background-repeat': 'no-repeat',
                    'background-size': 'contain',
                    'border': 'none',
                    'border-radius': '20px',
                    'background-position': 'center'
                }],
            },
            [UiFrameWorkComponent.Modules.DashboardSidePanelConfigs[0]]: {
                [UiFrameWorkComponent.Modules.DashboardSidePanelConfigs[1].Container]: [[UiFrameWorkComponent.Modules.DashboardSidePanelConfigs[1].Container], {}]
            },
            [UiFrameWorkComponent.Modules.DashboardSidePanelItems[0]]: {
                [UiFrameWorkComponent.Modules.DashboardSidePanelItems[1].Container]: [[UiFrameWorkComponent.Modules.DashboardSidePanelItems[1].Container], {}]
            },
            [UiFrameWorkComponent.Modules.DashboardGadget[0]]: {
                [UiFrameWorkComponent.Modules.DashboardGadget[1].DashboardGadgetContainer]: [UiFrameWorkComponent.Modules.DashboardGadget[1].DashboardGadgetContainer, {
                    'border-width': '1px',
                    'border-style': 'outset',
                    'border-radius': '5px'
                }],
            },
            [UiFrameWorkComponent.Modules.DashboardGadgetListView[0]]: {
                [UiFrameWorkComponent.Modules.DashboardGadgetListView[1].DashboardGadgetListViewContainer]: [[UiFrameWorkComponent.Modules.DashboardGadgetListView[1].DashboardGadgetListViewContainer], {
                    // 'border': '1px solid',
                    'margin': '0px',
                    'padding': '0px',
                    'overflow': 'auto',
                    'white-space': 'nowrap',
                    'display': 'flex',
                    'border-radius': '30px 30px 0px 0px',
                    'box-shadow': '-3px -14px 34px -8px rgba(0,0,0,0.75)'
                }],
                [UiFrameWorkComponent.Modules.DashboardGadgetListView[1].DashboardGadgetListViewItem]: [[UiFrameWorkComponent.Modules.DashboardGadgetListView[1].DashboardGadgetListViewItem], {
                    // 'border': '1px solid',
                    'margin': '0px',
                    'padding': '0px',
                    'overflow': 'auto',
                    'white-space': 'nowrap',
                    'background-color': '#eeeeee',
                    'cursor': 'grab',
                    'display': 'flex',
                    'align-content': 'center',
                    'justify-content': 'flex-start',
                    'flex-direction': 'column',
                    'align-items': 'stretch',
                    'height': '150px',
                    'width': '100%',
                    'flex-wrap': 'nowrap'
                }],
                [UiFrameWorkComponent.Modules.DashboardGadgetListView[1].DashboardGadgetListViewItemHover]: [[UiFrameWorkComponent.Modules.DashboardGadgetListView[1].DashboardGadgetListViewItemHover], {
                    'background-color': '#FFCC00'
                }],
                [UiFrameWorkComponent.Modules.DashboardGadgetListView[1].DashboardGadgetListViewItemSelected]: [[UiFrameWorkComponent.Modules.DashboardGadgetListView[1].DashboardGadgetListViewItemSelected], {
                    'background-color': '#0800ff'
                }],
            },
            [UiFrameWorkComponent.Modules.DashboardLayoutListView[0]]: {
                [UiFrameWorkComponent.Modules.DashboardLayoutListView[1].DashboardLayoutListViewContainer]: [[UiFrameWorkComponent.Modules.DashboardLayoutListView[1].DashboardLayoutListViewContainer], {
                    // 'border': '1px solid',
                    'margin': '0px',
                    'padding': '0px',
                    'overflow': 'auto',
                    'white-space': 'nowrap',
                    // 'display': 'flex',
                    'border-radius': '30px 30px 0px 0px',
                    'box-shadow': '-3px -14px 34px -8px rgba(0,0,0,0.75)'
                }],
                [UiFrameWorkComponent.Modules.DashboardLayoutListView[1].DashboardLayoutListViewItem]: [[UiFrameWorkComponent.Modules.DashboardLayoutListView[1].DashboardLayoutListViewItem], {
                    // 'border': '1px solid',
                    'margin': '0px',
                    'padding': '0px',
                    'overflow': 'auto',
                    'white-space': 'nowrap',
                    'width': '100%',
                    'background-color': '#eeeeee'
                }],
                [UiFrameWorkComponent.Modules.DashboardLayoutListView[1].DashboardLayoutListViewItemHover]: [[UiFrameWorkComponent.Modules.DashboardLayoutListView[1].DashboardLayoutListViewItemHover], {
                    'background-color': '#FFCC00'
                }],
                [UiFrameWorkComponent.Modules.DashboardLayoutListView[1].DashboardLayoutListViewItemSelected]: [[UiFrameWorkComponent.Modules.DashboardLayoutListView[1].DashboardLayoutListViewItemSelected], {
                    'background-color': '#0800ff'
                }],
            },
            [UiFrameWorkComponent.Modules.ProfileContainer[0]]: {
                [UiFrameWorkComponent.Modules.ProfileContainer[1].ProfileContainerMaster]: [[UiFrameWorkComponent.Modules.ProfileContainer[1].ProfileContainerMaster], {
                    'box-shadow': 'rgba(0, 0, 0, 0.8) 0px 0px 10px',
                    'background-color': 'rgb(94,88,88)',
                    'border-radius': '12px',
                    'overflow': 'hidden'
                }]
            },
            [UiFrameWorkComponent.Modules.WebFilter[0]]: {
                [UiFrameWorkComponent.Modules.WebFilter[1].WebFilterMasterDiv]: [UiFrameWorkComponent.Modules.WebFilter[1].WebFilterMasterDiv, {
                    'box-shadow': 'rgba(0, 0, 0, 0.8) 0px 0px 10px',
                    'background-color': 'rgb(244, 244, 244)',
                    'border-radius': '12px',
                }]
            },
            [UiFrameWorkComponent.Modules.WebFilterFilterViewPanel[0]]: {
                [UiFrameWorkComponent.Modules.WebFilterFilterViewPanel[1].WebFilterFilterViewPanelMasterDiv]: [UiFrameWorkComponent.Modules.WebFilterFilterViewPanel[1].WebFilterFilterViewPanelMasterDiv, {
                    '$webkit-scrollbar$': {
                        'width': '5px',
                        'height': '5px',
                        'background-color': 'rgba(229,226,34,0.85)'
                    },
                    '$webkit-scrollbar-thumb$': {
                        'background': '#de5050'
                    }
                }],
                [UiFrameWorkComponent.Modules.WebFilterFilterViewPanel[1].WebFilterFilterViewPanelFilterFieldContainer]: [UiFrameWorkComponent.Modules.WebFilterFilterViewPanel[1].WebFilterFilterViewPanelFilterFieldContainer, {
                    'overflow-y': 'auto',
                    'overflow-x': 'hidden',
                    '$webkit-scrollbar$': {
                        'width': '5px',
                        'height': '5px',
                        'background-color': 'rgba(229,226,34,0.85)'
                    },
                    '$webkit-scrollbar-thumb$': {
                        'background': '#de5050'
                    }
                }],
                [UiFrameWorkComponent.Modules.WebFilterFilterViewPanel[1].WebFilterFilterViewPanelToolbarMasterDiv]: [UiFrameWorkComponent.Modules.WebFilterFilterViewPanel[1].WebFilterFilterViewPanelToolbarMasterDiv, {
                    'box-shadow': 'rgba(0, 0, 0, 0.8) 0px 0px 10px',
                    'background-color': 'rgb(244, 244, 244)',
                    'border-radius': '12px',
                }],
            },
            [UiFrameWorkComponent.Modules.WizardComponentStateTitleBar[0]]: {
                [UiFrameWorkComponent.Modules.WizardComponentStateTitleBar[1].WizardTitleBarMasterContainer]: [UiFrameWorkComponent.Modules.WizardComponentStateTitleBar[1].WizardTitleBarMasterContainer, {
                    'display': 'flex',
                    '-webkit-flex-direction': 'row',
                    '-ms-flex-direction': 'row',
                    'flex-direction': 'row',
                    '-webkit-align-items': 'flex-start',
                    '-webkit-box-align': 'flex-start',
                    '-ms-flex-align': 'flex-start',
                    'align-items': 'flex-start'
                }]
            },
            [UiFrameWorkComponent.Modules.WebSliderEditor[0]]: {
                [UiFrameWorkComponent.Modules.WebSliderEditor[1].WebSliderEditorMasterDiv]: [UiFrameWorkComponent.Modules.WebSliderEditor[1].WebSliderEditorMasterDiv, {
                    'border': '1px'
                }],
                [UiFrameWorkComponent.Modules.WebSliderEditor[1].WebSliderEditorTrackDiv]: [UiFrameWorkComponent.Modules.WebSliderEditor[1].WebSliderEditorTrackDiv, {
                    // 'background': 'linear-gradient(to right, #f00 0, #ff0 16%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 84%, #ff0004 100%)',
                    'height': '100%',
                    'top': 'calc(50% - 4px)',
                    'border-radius': '4px'
                }],
                [UiFrameWorkComponent.Modules.WebSliderEditor[1].WebSliderEditorSliderDiv]: [UiFrameWorkComponent.Modules.WebSliderEditor[1].WebSliderEditorSliderDiv, {
                    'box-shadow': '0 1px 2px rgba(0,0,0,.3)',
                    'background-color': '#fff',
                    'border-color': '#fff',
                    'border-radius': '6px',
                    'cursor': 'pointer',
                    'height': '14px',
                    'top': 'calc(50% - 7px)',
                    'width': '14px',
                    'position': 'absolute'
                }],
            },
            [UiFrameWorkComponent.Modules.WebWindowDesigner[0]]: {
                [UiFrameWorkComponent.Modules.WebWindowDesigner[1].WebWindowDesignerMasterDiv]: [UiFrameWorkComponent.Modules.WebWindowDesigner[1].WebWindowDesignerMasterDiv, {
                    'border': '1px'
                }],
            },
            [UiFrameWorkComponent.Modules.WizardComponentStateTitle[0]]: {
                [UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateMaster]: [UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateMaster, {
                    'padding-left': '8px',
                    'padding-right': '8px',
                    '-webkit-flex': '1',
                    '-ms-flex': '1',
                    'flex': '1',
                    'position': 'relative',
                    'transition': '0.5s all',
                    '$hover$': {
                        'color': '#4879d0',
                        'background-color': '#a1e022',
                        'text-shadow': '0 0 5px #ffee10',
                    },
                }],
                [UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateSelectedMaster]: [UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateSelectedMaster, {
                    'color': '#d04848',
                    'background-color': '#6f168c',
                    'text-shadow': '0 0 5px #ffee10',
                }],
                [UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateItemLineDiv]: [UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateItemLineDiv, {
                    '-webkit-flex': '1 1 auto',
                    '-ms-flex': '1 1 auto',
                    'flex': '1 1 auto',
                    'position': 'absolute',
                    'top': '12px',
                }],
                [UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateItemLineSpan]: [UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateItemLineSpan, {
                    'display': 'block',
                    'border-color': '#bdbdbd',
                    'border-top-style': 'solid',
                    'border-top-width': '1px',
                }],
                [UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateItemTitleMaster]: [UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateItemTitleMaster, {
                    '-webkit-flex-direction': 'column',
                    '-ms-flex-direction': 'column',
                    'flex-direction': 'column',
                    'display': 'flex',
                    '-webkit-align-items': 'center',
                    '-webkit-box-align': 'center',
                    '-ms-flex-align': 'center',
                    'align-items': 'center',
                }],
                [UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateIconContainer]: [UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateIconContainer, {
                    '-webkit-flex-shrink': '0',
                    '-ms-flex-negative': '0',
                    'flex-shrink': '0',
                    'display': 'flex',
                    'padding-right': '8px',
                }],
                [UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateIconSVG]: [UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateIconSVG, {
                    '-webkit-user-select': 'none',
                    '-moz-user-select': 'none',
                    '-ms-user-select': 'none',
                    'user-select': 'none',
                    'width': '1em',
                    'height': '1em',
                    'fill': 'currentColor',
                    '-webkit-flex-shrink': '0',
                    '-ms-flex-negative': '0',
                    'flex-shrink': '0',
                    'font-size': '1.5rem',
                    'display': 'block',
                    '-webkit-transition': 'color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    'transition': 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    'color': 'rgba(0, 0, 0, 0.38)',
                    '$hover:before$': {
                        'transform': 'scale(1.1)',
                        'box-shadow': '0 0 15px #ffee10',
                    },
                    '$hover$': {
                        'color': '#4879d0',
                        'text-shadow': '0 0 5px #ffee10',
                    },
                    '$before$': {
                        'content': '""',
                        'position': 'absolute',
                        'top': '0',
                        'left': '0',
                        'width': '100%',
                        'height': '100%',
                        'border-radius': '50%',
                        'background': '#f30e16',
                        'transition': '1s',
                        'transform': 'scale(.9)',
                        'z-index': '-1',
                    }
                }],
                [UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateLabelContainer]: [UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateLabelContainer, {
                    'text-align': 'center',
                    'width': '100%',
                    'color': 'rgba(0, 0, 0, 0.6)',
                }],
                [UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateCounterText]: [UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateCounterText, {
                    'fill': '#fff',
                    'font-size': '0.75rem',
                    'font-family': "Arial"
                }],
                [UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateLabelText]: [UiFrameWorkComponent.Modules.WizardComponentStateTitle[1].WizardStateLabelText, {
                    'fill': '#cc1717',
                    'font-size': '0.75rem',
                    'font-family': "Arial"
                }],
            },
            [UiFrameWorkComponent.Components.Window[0]]: {
                [UiFrameWorkComponent.Components.Window[1].WindowMasterElement]: [[UiFrameWorkComponent.Components.Window[1].WindowMasterElement], {
                    'box-shadow': 'rgba(0,0,0,0.8) 0 0 10px',
                    'background-color': '#f4f4f4',
                    'border-radius': '20px 20px 20px 20px'
                }],
                [UiFrameWorkComponent.Components.Window[1].WindowHeader]: [[UiFrameWorkComponent.Components.Window[1].WindowHeader], {
                    'background-color': '#5eb7b7',
                    'border-radius': '20px 20px 0px 0px'
                }],
                [UiFrameWorkComponent.Components.Window[1].WindowContent]: [[UiFrameWorkComponent.Components.Window[1].WindowContent], {
                    'border-radius': '0px 0px 20px 20px',
                    'overflow': 'hidden'
                }],
            },
            [UiFrameWorkComponent.Components.AlertDialog[0]]: {
                [UiFrameWorkComponent.Components.AlertDialog[1].AlertDialogMaster]: [[UiFrameWorkComponent.Components.AlertDialog[1].AlertDialogMaster], {
                    'box-shadow': 'rgba(0,0,0,0.8) 0 0 10px',
                    'background-color': '#f4f4f4',
                    'border-radius': '20px 20px 20px 20px'
                }],
                [UiFrameWorkComponent.Components.AlertDialog[1].AlertDialogHeader_Error]: [[UiFrameWorkComponent.Components.AlertDialog[1].AlertDialogHeader_Error], {
                    'background-color': 'rgb(255 0 0)',
                }],
                [UiFrameWorkComponent.Components.AlertDialog[1].AlertDialogHeader_Info]: [[UiFrameWorkComponent.Components.AlertDialog[1].AlertDialogHeader_Info], {
                    'background-color': 'rgb(201,255,2)',
                }],
                [UiFrameWorkComponent.Components.AlertDialog[1].AlertDialogMessageContainer_Error]: [[UiFrameWorkComponent.Components.AlertDialog[1].AlertDialogMessageContainer_Error], {
                    'border-radius': '0px 0px 20px 20px',
                    'background-color': '#f5d7b4',
                    'overflow': 'auto'
                }],
                [UiFrameWorkComponent.Components.AlertDialog[1].AlertDialogMessageContainer_Info]: [[UiFrameWorkComponent.Components.AlertDialog[1].AlertDialogMessageContainer_Info], {
                    'border-radius': '0px 0px 20px 20px',
                    'background-color': '#9b9292',
                    'overflow': 'auto'
                }],
            },
            [UiFrameWorkComponent.Components.WrapSVGComponent[0]]: {
                [UiFrameWorkComponent.Components.WrapSVGComponent[1].WrapSVGComponentMaster]: [[UiFrameWorkComponent.Components.WrapSVGComponent[1].WrapSVGComponentMaster], {
                    'overflow': 'auto',
                    '$webkit-scrollbar$': {
                        'width': '5px',
                        'height': '5px',
                        'background-color': 'rgba(229,226,34,0.85)'
                    },
                    '$webkit-scrollbar-thumb$': {
                        'background': '#de5050'
                    }
                }],
                [UiFrameWorkComponent.Components.WrapSVGComponent[1].WrapSVGComponentSVG]: [[UiFrameWorkComponent.Components.WrapSVGComponent[1].WrapSVGComponentSVG], {
                    'background-color': 'rgba(232,196,196,0.62)',
                    'box-shadow': '10px 10px 23px 0px rgba(0,0,0,0.75)'
                }]
            }
        },
    }
};
