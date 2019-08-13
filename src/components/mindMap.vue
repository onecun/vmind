<template>
<main ref="main" id="jsmind_container">
    <popup></popup>
</main>
</template>

<script>
import 'jsmind/style/jsmind.css'
import jsMind from 'jsmind/js/jsmind'
import 'jsmind/js/jsmind.draggable'
import 'jsmind/js/jsmind.screenshot'
//
import popup from './popup'
import local from '../utils/localSave'
//
import mindmapExport from '../utils/mindMapExport'
import downloadFile from '../utils/downloadFile'
import openFile from '../utils/openFile'
import mindmapParse from '../utils/mindMapParse'
//
import jmOpitions from '../mindmap_config/jsmind_options'
import jmDefaultMindmap from '../mindmap_config/jsmind_default_mindmap'

export default {
    components: {
        popup
    },
    methods: {
        init() {
            this.jm = new jsMind(jmOpitions)
            let localMind = local.getLocal()
            if (localMind) {
                this.jm.show(localMind)
            } else {
                this.jm.show(jmDefaultMindmap)
            }
            // jsmind.js 1649 行
            let _jm = this.jm
            this.jm.add_event_listener((type, data) => {
                // type === 3, 即 event_type.edit 触发
                if (type === 3) {
                    // 保存
                    local.saveLocal(_jm.get_data())
                    // 隐藏 popup
                    this.$bus.$emit('popup-hide')
                }
            })
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
                    // 新建节点后，触发编辑
                    this.$bus.$emit('editNode', newNode)
                }
            })
            this.$bus.$on('addBrotherNode', () => {
                let selectedNode = this.jm.get_selected_node()
                if (selectedNode.isroot) {
                    return
                }
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
                if (selectedNode.isroot) {
                    return
                }
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
                // 延迟选择 input。focus() 避免，input 还没插入 DOM
                setTimeout(() => { document.querySelector('.jsmind-editor').focus() }, 20)
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
            this.jm.show(jmDefaultMindmap)
            local.clearLocal()
        })
        this.$bus.$on('openFile', () => {
            openFile().then((file) => {
                let {data, format} = file
                let newMindmap = mindmapParse(data, format)
                this.jm.show(newMindmap)
            })
        })
        // 绑定 popup 上按钮的事件
        this.popupBindEevent()

        // 切换主题
        this.$bus.$on('selectTheme', (themeName) => {
            this.jm.set_theme(themeName)
        })
        this.$bus.$on('unfoldAllNodes', (unfold) => {
            if (unfold) {
                this.jm.expand_all()
            } else {
                this.jm.collapse_all()
            }
        })
    },
    mounted() {
        this.init()
    }
}
</script>

<style lang="scss">
</style>
