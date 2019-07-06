export default {
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
    layout: {
        hspace: 50, // 节点之间的水平间距
        vspace: 40, // 节点之间的垂直间距
        pspace: 13, // 节点收缩/展开控制器的尺寸
    },
    shortcut:{
       enable:true,        // 是否启用快捷键
       handles:{},         // 命名的快捷键事件处理器
       mapping:{           // 快捷键映射
           addchild   : 9,     // <Tab>
           addbrother : 13,    // <Enter>
           editnode   : 113,   // <F2>
           delnode    : 46,    // <Delete>
           toggle     : 32,    // <Space>
           left       : 37,    // <Left>
           up         : 38,    // <Up>
           right      : 39,    // <Right>
           down       : 40,    // <Down>
       }
    }

}