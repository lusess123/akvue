import * as React from "react";
import * as ReactDOM from "react-dom";
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component {
    render() {
        return React.createElement("h1", null,
            "Hello from ",
            this.props.compiler,
            " and ",
            this.props.framework,
            "!");
    }
}
export const renderTest = (dom, pops) => {
    ReactDOM.render(React.createElement(Hello, { compiler: pops.compiler, framework: pops.framework }), dom);
};
