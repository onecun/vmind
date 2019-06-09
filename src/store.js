import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        'node': {
            'topic': '主节点',
            'id': 'root',
            'expanded': true,
            'children': [],
            'childNumber': 0,
        }
    },
    mutations: {
        ADD_CHILDREN(state, node) {
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
