<template>
<main ref="main" id="jsmind_container" @mousedown="setPopupPosition($event)">
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
    components: {
        popup
    },
    data() {
        return {
            options: {
                container: 'jsmind_container', // [必选] 容器的ID，或者为容器的对象
                editable: true, // [可选] 是否启用编辑
                theme: 'warning', // [可选] 主题
                mode: 'full',
                view: {
                    hmargin: 100, // 思维导图距容器外框的最小水平距离
                    vmargin: 100, // 思维导图距容器外框的最小垂直距离
                    line_width: 2, // 思维导图线条的粗细
                    line_color: '#555' // 思维导图线条的颜色
                },
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

        // 设置点击节点后 popup 出现的位置
        setPopupPosition(event) {
            var ele = event.target
            if (ele.tagName === 'JMNODE') {
                // console.log(ele.tagName)
                let top = ele.offsetTop
                let left = ele.offsetLeft
                this.$bus.$emit('setPosition', true, top, left)
                // // log(left, ele.scrollWidth)
                // // 
                // window.scrollTo(left, top - ele.scrollWidth / 2)
            } else if (ele.tagName !== 'BUTTON' && ele.tagName !== 'SPAN') {
                this.$bus.$emit('setPosition', false)
            }
        },

        // 绑定 popup 上按钮的事件
        // 增删改等
        popupBindEevent() {
            this.$bus.$on('addNode', () => {
                let selectedNode = this.jm.get_selected_node()
                if (selectedNode) {
                    let nodeid = jsMind.util.uuid.newid()
                    let topic = '新建节点'
                    this.jm.add_node(selectedNode, nodeid, topic)
                    // 新建节点后，触发编辑
                    this.$bus.$emit('editNode', nodeid)
                }
            })
            this.$bus.$on('addBrotherNode', () => {
                let selectedNode = this.jm.get_selected_node()
                if (selectedNode) {
                    let nodeid = jsMind.util.uuid.newid()
                    let topic = '新建节点'
                    this.jm.insert_node_after(selectedNode, nodeid, topic)
                    // 新建节点后，触发编辑
                    this.$bus.$emit('editNode', nodeid)
                }
            })
            this.$bus.$on('deleteNode', () => {
                let selectedNode = this.jm.get_selected_node()
                if (selectedNode) {
                    this.jm.remove_node(selectedNode)
                }
            })
            this.$bus.$on('editNode', (nodeid) => {
                if (nodeid) {
                    // this.jm.select_node(nodeid)
                    this.jm.begin_edit(nodeid)
                } else {
                    let selectedNode = this.jm.get_selected_node()
                    if (selectedNode) {
                        this.jm.begin_edit(selectedNode)
                    }
                }
            })
            this.$bus.$on('toggleNode', () => {
                let selectedNode = this.jm.get_selected_node()
                if (selectedNode) {
                    this.jm.toggle_node(selectedNode)
                }
            })
        }
    },
    created() {
        this.$bus.$on('downloadImg', () => {
            this.downloawImg()
        })
        // 绑定 popup 上按钮的事件
        this.popupBindEevent()

        // 切换主题
        this.$bus.$on('selectTheme', (themeName) => {
            this.jm.set_theme(themeName)
        })
    },
    mounted() {
        this.init()
    }
}
</script>

<style lang="scss">
</style>
