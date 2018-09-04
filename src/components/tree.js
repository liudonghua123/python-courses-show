import React, { Component } from 'react';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';

class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
        searchString: '',
        searchFocusIndex: 0,
        searchFoundCount: null,
        treeData: [{
            title: 'Python-2018-春',
            isDirectory: true,
            expanded: true,
            children: [{
                    title: 'team1',
                    isDirectory: true,
                    children: [{
                        title: 'src',
                        isDirectory: true,
                        children: [{
                            title: 'hello.py'
                        }]
                    }, {
                        title: 'README.md'
                    }]
                },
                {
                    title: 'team2',
                    isDirectory: true,
                    children: [{
                        title: 'src',
                        isDirectory: true,
                        children: [{
                            title: 'hello.py'
                        }]
                    }, {
                        title: 'README.md'
                    }]
                }
            ],
        }],
    };

    this.updateTreeData = this.updateTreeData.bind(this);
    this.expandAll = this.expandAll.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
  }

  updateTreeData(treeData) {
    this.setState({ treeData });
  }

  expand(expanded) {
    this.setState({
      treeData: toggleExpandedForAll({
        treeData: this.state.treeData,
        expanded,
      }),
    });
  }

  expandAll() {
    this.expand(true);
  }

  collapseAll() {
    this.expand(false);
  }

  render() {
    const {
      treeData,
      searchString,
      searchFocusIndex,
      searchFoundCount,
    } = this.state;

    const alertNodeInfo = ({ node, path, treeIndex }) => {
      const objectString = Object.keys(node)
        .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
        .join(',\n   ');

      global.alert(
        'Info passed to the icon and button generators:\n\n' +
          `node: {\n   ${objectString}\n},\n` +
          `path: [${path.join(', ')}],\n` +
          `treeIndex: ${treeIndex}`
      );
    };

    const selectPrevMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
            : searchFoundCount - 1,
      });

    const selectNextMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFocusIndex + 1) % searchFoundCount
            : 0,
      });

    return (
        <div style={{ flex: '1 0 50%', padding: '15px 0', height: '100vh' }}>
          <SortableTree
            theme={FileExplorerTheme}
            treeData={treeData}
            onChange={this.updateTreeData}
            canDrag={false}
            canDrop={false}
            generateNodeProps={rowInfo => ({
              icons: rowInfo.node.isDirectory
                ? [
                    <div
                      style={{
                        borderLeft: 'solid 8px gray',
                        borderBottom: 'solid 10px gray',
                        marginRight: 10,
                        width: 16,
                        height: 12,
                        filter: rowInfo.node.expanded
                          ? 'drop-shadow(1px 0 0 gray) drop-shadow(0 1px 0 gray) drop-shadow(0 -1px 0 gray) drop-shadow(-1px 0 0 gray)'
                          : 'none',
                        borderColor: rowInfo.node.expanded ? 'white' : 'gray',
                      }}
                    />,
                  ]
                : [
                    <div
                      style={{
                        border: 'solid 1px black',
                        fontSize: 8,
                        textAlign: 'center',
                        marginRight: 10,
                        width: 12,
                        height: 16,
                      }}
                    >
                      F
                    </div>,
                  ]
            })}
          />
        </div>
    );
  }
}

export default Tree;