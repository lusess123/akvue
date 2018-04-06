var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
        reactrender: function () {
            return /** @class */ (function (_super) {
                __extends(Hello, _super);
                function Hello() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Hello.prototype.render = function () {
                    return React.createElement("h1", null,
                        "Hello from ",
                        this.props.compiler,
                        " and ",
                        this.props.framework,
                        "!");
                };
                Hello.prototype.componentDidMount = function () {
                    alert("end");
                };
                return Hello;
            }(React.Component));
        },
    },
    mounted: function () {
        this.reactNode = this.reactrender();
        ReactDOM.render(React.createElement(this.reactNode, __assign({}, this.$props)), this.$el);
    },
    beforeDestroy: function () {
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
            debugger;
            if (this.reactNode) {
                // const _createReact = this.reactrender();
                alert(this.$props.compiler);
                ReactDOM.render(React.createElement(this.reactNode, __assign({}, this.$props)), this.$el);
            }
        }
    }
};
