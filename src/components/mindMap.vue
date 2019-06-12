<template>
<main ref="main" id="jsmind_container" @mousedown="setPopupPosition">
    <popup ref="test"></popup>
</main>
</template>

<script>
import 'jsmind/style/jsmind.css'
import jsMind from 'jsmind/js/jsmind'
import 'jsmind/js/jsmind.draggable'
import 'jsmind/js/jsmind.screenshot'
import popup from './popup'

export default {
    components: {popup},
    data() {
        return {
            options: { 
                container: 'jsmind_container', // [必选] 容器的ID，或者为容器的对象
                editable: true, // [可选] 是否启用编辑
                theme: 'orange', // [可选] 主题
            },
            defaultMind: {
                /* 元数据，定义思维导图的名称、作者、版本等信息 */
                "meta": {
                    "name": "jsMind-demo-tree",
                    "author": "hizzgdev@163.com",
                    "version": "0.2"
                },
                /* 数据格式声明 */
                "format": "node_tree",
                /* 数据内容 */
                "data": {
                    "id": "root",
                    "topic": "jsMind",
                    "children": [{
                            "id": "easy",
                            "topic": "Easy",
                            "direction": "left",
                            "expanded": true,
                            "children": [{
                                    "id": "easy1",
                                    "topic": "Easy to show"
                                },
                                {
                                    "id": "easy2",
                                    "topic": "Easy to edit"
                                },
                                {
                                    "id": "easy3",
                                    "topic": "Easy to store"
                                },
                                {
                                    "id": "easy4",
                                    "topic": "Easy to embed"
                                }
                            ]
                        },
                        {
                            "id": "open",
                            "topic": "Open Source",
                            "direction": "right",
                            "expanded": true,
                            "children": [{
                                    "id": "open1",
                                    "topic": "on GitHub"
                                },
                                {
                                    "id": "open2",
                                    "topic": "BSD License"
                                }
                            ]
                        },
                        {
                            "id": "powerful",
                            "topic": "Powerful",
                            "direction": "right",
                            "children": [{
                                    "id": "powerful1",
                                    "topic": "Base on Javascript"
                                },
                                {
                                    "id": "powerful2",
                                    "topic": "Base on HTML5"
                                },
                                {
                                    "id": "powerful3",
                                    "topic": "Depends on you"
                                }
                            ]
                        },
                        {
                            "id": "other",
                            "topic": "test node",
                            "direction": "left",
                            "children": [{
                                    "id": "other1",
                                    "topic": "I'm from local variable"
                                },
                                {
                                    "id": "other2",
                                    "topic": "I can do everything"
                                }
                            ]
                        }
                    ]
                }
            },
        }
    },
    methods: {
        init() {
            this.jm = new jsMind(this.options)
            this.jm.show(this.defaultMind)
            // console.log(jm)
        },
        downloawImg() {
            this.jm.screenshot.shootDownload()
        },
        setPopupPosition(event) {
            var ele = event.target
            if (ele.tagName === 'JMNODE') {
                let top = ele.style.top
                let left = ele.style.left
                this.$bus.$emit('setPosition', top, left)
            }
        }
    },
    created() {
        this.$bus.$on('downloadImg', () => {
            this.downloawImg()
        })
        this.$bus.$on('addNode', () => {
            let selectedNode = this.jm.get_selected_node()
            if (selectedNode) {
                let nodeid = jsMind.util.uuid.newid()
                let topic = '新建节点'
                this.jm.add_node(selectedNode, nodeid, topic)
                // this.jm.insert_node_after(node_after, nodeid, topic)
            }
        })
        this.$bus.$on('addBrotherNode', () => {
            let selectedNode = this.jm.get_selected_node()
            if (selectedNode) {
                let nodeid = jsMind.util.uuid.newid()
                let topic = '新建节点'
                this.jm.insert_node_after(selectedNode, nodeid, topic)
            }
        })

    },
    mounted() {
        this.init()
    }
}
</script>

<style lang="scss">
// @import '..assets/styles/global';
// .test {
//     position: fixed;
//     z-index: 100;
//     background-color: red;
// }
</style>
