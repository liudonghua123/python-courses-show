import "react-ui-tree/dist/react-ui-tree.css";
import "./navTree.css";
import cx from "classnames";
import React, { Component } from "react";
import Tree from "react-ui-tree";

class NavTree extends Component {

  render() {
    const { tree, active, onClickNode } = this.props;
    // console.info(tree, this.props.active, onClickNode);
    const renderNode = node => {
      // console.info(node, this.props.active, node === this.props.active);
      // console.info(node, active, node === active);
      return (
        <span
          className={cx("node", {
            "is-active": node === this.props.active
          })}
          onClick={() => onClickNode(node)}
        >
          {node.module}
        </span>
      );
    };
    return (
      <div className="tree">
        <Tree
          tree={tree}
          renderNode={renderNode}
        />
      </div>
    );
  }
}

export default NavTree;
