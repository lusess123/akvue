import * as React from "react";
import * as ReactDOM from "react-dom";
export default {
    data: function () {
        return {
            reactNode: null,
        };
    },
    template: '<div></div>',
    methods: {
        getReactProps() {
            return this.$props;
        },
        getReactType() {
            return class Hello extends React.Component {
                render() {
                    return React.createElement("div", null, "reactvuemixin");
                }
                componentDidMount() {
                    // alert("end");
                }
            };
        },
        reactrender() {
            ReactDOM.render(React.createElement(this.reactNode, Object.assign({}, this.getReactProps())), this.$el);
        },
    },
    mounted: function () {
        this.reactNode = this.getReactType();
        this.reactrender();
    },
    beforeDestroy() {
        this.reactNode = null;
        ReactDOM.unmountComponentAtNode(this.$el);
    },
    updated: function () {
        if (this.reactNode) {
            if (this.reactNode.forceUpdate) {
                this.reactNode.forceUpdate();
            }
            else {
                this.reactrender();
            }
        }
    },
    watch: {
        compiler: function (a, b) {
            // debugger;
            if (this.reactNode) {
                // const _createReact = this.reactrender();
                // alert(this.$props.compiler);
                this.reactrender();
            }
        }
    }
};
