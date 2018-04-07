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
    data: function () {
        return {
            reactNode: null,
        };
    },
    template: '<div></div>',
    methods: {
        getReactProps: function () {
            return this.$props;
        },
        getReactType: function () {
            return /** @class */ (function (_super) {
                __extends(Hello, _super);
                function Hello() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Hello.prototype.render = function () {
                    return React.createElement("div", null, "reactvuemixin");
                };
                Hello.prototype.componentDidMount = function () {
                    // alert("end");
                };
                return Hello;
            }(React.Component));
        },
        reactrender: function () {
            ReactDOM.render(React.createElement(this.reactNode, __assign({}, this.getReactProps())), this.$el);
        },
    },
    mounted: function () {
        this.reactNode = this.getReactType();
        this.reactrender();
    },
    beforeDestroy: function () {
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
