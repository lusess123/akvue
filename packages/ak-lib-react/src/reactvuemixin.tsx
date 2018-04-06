import * as React from "react";
import * as ReactDOM from "react-dom";



export default {

    props: ["compiler", "framework"],

    data: function () {
        return {
            aa: 234,
            bb: "fff",
            reactNode: null,
        };
    },

    methods: {
        reactrender() {
            return class Hello extends React.Component<any, {}> {

                render() {
                    return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
                }
                componentDidMount() {
                   // alert("end");
                }

            }
        },
    },





    mounted: function () {
        this.reactNode = this.reactrender();
        ReactDOM.render(<this.reactNode  {...this.$props}></this.reactNode>, this.$el);
    },

    beforeDestroy() {
        this.reactNode = null;
        ReactDOM.unmountComponentAtNode(this.$el);

    },

    updated: function () {
        if (this.reactNode) {
            this.reactNode.forceUpdate();
        }
    },
    watch: {
        compiler: function (a, b) {

           // debugger;
            if (this.reactNode) {
                // const _createReact = this.reactrender();
                // alert(this.$props.compiler);
                ReactDOM.render(<this.reactNode  {...this.$props}></this.reactNode>, this.$el);
            }
        }
    }


}