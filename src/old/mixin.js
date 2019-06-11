export const createNode = {
        methods: {
            createNode(parent) {
                console.log('父节点',parent)
                let child = this.getChild(parent.childNumber, parent.id)
                // this.subNode.push(child)
                parent.childNumber++
                let children = this.findChildren(parent.id, this.$store.state.mindMap.nodes[0])
                console.log('create node', children)
                this.$store.dispatch('add_children', [child, children])
            },

            getChild(number, id) {
                console.log('getchild start',number, id)
                let child = {
                    'expanded': true,
                    'topic': '新建节点',
                    'id': `${id}-${number + 1}`,
                    'children': [],
                    'childNumber': 0,
                }
                return child
            },

            findChildren(id, node) {
                console.log('findChildren start', node)
                let arr = id.split('-')
                let children = node.children
                for (let i = 1; i < arr.length; i++) {
                    children = children[Number(arr[i]) - 1].children
                }
                return children
            }
    }
}