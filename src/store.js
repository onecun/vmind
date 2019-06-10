import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 数据结构
        'mindMap': {
            'author': '小王',
            'date': 'now',
            'nodes': [
                {
                    'topic': '主节点',
                    'id': 'node',
                    'expanded': true,
                    'children': [],
                    'childNumber': 0,
                },
            ],
        }
    },
    mutations: {
        ADD_CHILDREN(state, node) {
            // node[1] children , node[0] child
            node[1].push(node[0])
            // state.node.childNumber++ 
        },
    },
    actions: {
        add_children({ commit, state }, node) {
            return commit('ADD_CHILDREN', node)
        },
    }
})
