<template>
<main ref="main" id="jsmind_container">
    <popup ref="test"></popup>
</main>
</template>

<script>
import 'jsmind/style/jsmind.css'
import jsMind from 'jsmind/js/jsmind'
import 'jsmind/js/jsmind.draggable'
import 'jsmind/js/jsmind.screenshot'
import popup from './popup'
import local from '../utils/localSave'
import mindmapExport from '../utils/mindMapExport'
import downloadFile from '../utils/downloadFile'

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
                layout:{
                    hspace: 50,          // 节点之间的水平间距
                    vspace: 40,          // 节点之间的垂直间距
                    pspace: 13,           // 节点收缩/展开控制器的尺寸
                },
            },
            defaultMind: {
                // 元信息
                "meta": {
                    "name": "jsMind-demo-tree",
                    "author": "hizzgdev@163.com",
                    "version": "0.2"
                },
                // 格式
                "format": "node_tree",
                // 节点数据
                "data": {
                    "id": "root",
                    "topic": "主题",
                    "expanded": true,
                    "children": [{
                        "id": "bb228f7b14432504",
                        "topic": "分支1",
                        "expanded": true,
                        "direction": "right"
                    }, {
                        "id": "bb2290248041a7dd",
                        "topic": "分支2",
                        "expanded": true,
                        "direction": "right"
                    }, {
                        "id": "bb228fe58acbb22e",
                        "topic": "分支3",
                        "expanded": true,
                        "direction": "right"
                    }]
                }
            }
        }
    },
    methods: {
        init() {
            this.jm = new jsMind(this.options)
            let localMind = local.getLocal()
            if (localMind) {
                this.jm.show(localMind)
            } else {
                this.jm.show(this.defaultMind)
            }
            // console.log(jm)
        },
        downloawImg() {
        },
        download(format, title) {
            let file
            if (format === 'img') {
                this.jm.screenshot.shootDownload()
                return 
            } else if (format === 'mm') {
                file = this.jm.get_data('freemind')
            } else {
                file = this.jm.get_data()
            }
            // log(typeof mindmapExport(file, format), format)
            file = mindmapExport(file, format)
            downloadFile(file, title, format)
        },

        // 绑定 popup 上按钮的事件
        // 增删改等
        popupBindEevent() {
            this.$bus.$on('addNode', () => {
                let selectedNode = this.jm.get_selected_node()
                if (selectedNode) {
                    let nodeid = jsMind.util.uuid.newid()
                    let topic = '新建节点'
                    let newNode =  this.jm.add_node(selectedNode, nodeid, topic)
                    // 新建节点后，触发编辑 edit_node_begin 
                    this.$bus.$emit('editNode', newNode)
                }
                //
                local.saveLocal(this.jm.get_data())
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
                //
                local.saveLocal(this.jm.get_data())
            })
            this.$bus.$on('deleteNode', () => {
                let selectedNode = this.jm.get_selected_node()
                if (selectedNode) {
                    this.jm.remove_node(selectedNode)
                }
                //
                local.saveLocal(this.jm.get_data())
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
                this.jm.select_node(nodeid)
                setTimeout(function() { document.querySelector('.jsmind-editor').focus() }, 20)
                //
                local.saveLocal(this.jm.get_data())
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
        this.$bus.$on('download', (format, title) => {
            this.download(format, title)
        })
        this.$bus.$on('createNewMind', () => {
            this.jm.show(this.defaultMind)
            local.clearLocal()
        })
        this.$bus.$on('readFile', (str) => {
            // let file = JSON.parse(str)

            this.jm.show(file)
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
