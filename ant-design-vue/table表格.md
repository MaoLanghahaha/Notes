#### Table
|参数|	说明|	类型|	默认值|
|---|---|---|---|
|columns|	表格列的配置描述，具体项见下表|	array	| 无 |

````html
<a-table :columns="columns"></a-table>
````

##### Column
> 列描述数据对象，是 columns 中的一项，Column 使用相同的 API。

|参数|	说明|	类型|	默认值|
|---|---|---|---|
|align|	设置整列内容的对齐方式|	'left' \|  'right' \|  'center'	|'left'|
|ellipsis|	超过宽度将自动省略，==暂不支持和排序筛选一起使用==，设置为 true 时，表格布局将变成 tableLayout="fixed"|	boolean	|false|
|colSpan|	==表头列合并==,设置为 0 时，不渲染|	number	|
|customRender|	生成复杂数据的渲染函数，参数[^customRender-param]
 分别为当前行的值，当前行数据，行索引，@return 里面可以设置表格行/列合并,可参考 demo 表格行/列合并|	Function(text, record, index) {} \| slot-scope|
||
|? dataIndex|	列数据在数据项中对应的 key，支持 a.b.c 的嵌套写法|	string|
|? key|	Vue 需要的 key。如果没有使用 template 风格的 API，且已经设置了唯一的 dataIndex，可以忽略这个属性|	string	|
||
|defaultFilteredValue|	默认筛选值|	string[]|
|filters|	表头的筛选菜单项|	object[]|
|onFilter|	本地模式下，确定筛选的运行函数, 使用 template 或 jsx 时作为filter事件使用	|Function|
|filterDropdown|	可以自定义筛选菜单，此函数只负责渲染图层，需要自行编写各种交互|	VNode \| slot-scope


[^customRender-param]:(customRender:(text, record, index)=>{}):text:当前行（数据项）的当前列的值，record：当前行数据项，index：当前行（数据项）的索引

````js
const columns = [
  {
    align: 'right',
    ellipsis: 'true',
    colSpan: 2, // 表头列合并
    
    // g-eg:
    dataIndex: 'age',
    key: 'age',
  },
]
````
````js
// eg:表格行/列合并
https://www.antdv.com/components/table-cn/#components-table-demo-colspan-and-rowspan
````
````js
// g-eg : 列数据过滤筛选使用组合1
const columns = [
  {
    align: 'right',
    ellipsis: 'true',
    colSpan: 2,
    
    // g-eg:
    dataIndex: 'age',
    key: 'age',

    // g-eg：
    defaultFilteredValue: [32],
    filters: [
      { text: '32', value: 32 },
      { text: '42', value: 42 }
    ],
    onFilter: (value, record) => record.age === value // record：一条数据记录对象（数据项） value：filters中设置的value
  },
]
````
