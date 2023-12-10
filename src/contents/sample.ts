import React, { PureComponent } from 'react';
import { Treebeard, TreeNode } from 'react-treebeard';

type TreeData = {
  name: string;
  toggled?: boolean;
  active?: boolean;
  children?: TreeData[];
  loading?: boolean;
};

type SampleState = {
  data: TreeData;
  cursor?: TreeNode;
};

class Sample extends PureComponent<{}, SampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: {
        name: 'root',
        toggled: true,
        children: [
          {
            name: 'parent',
            children: [{ name: 'child1' }, { name: 'child2' }],
          },
          {
            name: 'loading parent',
            loading: true,
            children: [],
          },
          {
            name: 'parent',
            children: [
              {
                name: 'nested parent',
                children: [{ name: 'nested child 1' }, { name: 'nested child 2' }],
              },
            ],
          },
        ],
      },
    };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(node: TreeNode, toggled: boolean) {
    const { cursor, data } = this.state;
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState({ cursor: node, data: { ...data } });
  }

  render() {
    const { data } = this.state;
    return <Treebeard data={data} onToggle={this.onToggle} />;
  }
}

export default Sample;
