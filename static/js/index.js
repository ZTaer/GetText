let state = {};

/************ 数据处理模块-BGN  */
var dataModule = ( function(){

    /*** 功能 */
    var add = function( x,y ){ // 为了安全用局部变量创建函数
        return x+y;
    }

    const getStrInput = ( target ) => {
        return document.querySelector( target ).value;
    }

    const getNumInput = ( target) => {
        return parseInt(document.querySelector( target ).value);
    }

    return{
        publickAdd: function( x,y ){ // 创建API接口功能
            return add(x,y);
        },
        getStrInput: ( target )=>{
            return getStrInput( target );
        },
        getNumInput: ( target )=>{
            return getNumInput( target );
        },
    }

} )()

/************ 数据处理模块-END  */

/************ ui界面处理模块-BGN  */
var uiModule = ( function( oo7Str ){
    const Strings = {
        userClick: '#search .btn',
        topic: '.topic',
        len: '.len',
        targetP: '#content p',
        targetT: '#content h2',
    }
    const DocumentString = {
        userClick: document.querySelector( Strings.userClick ),
        targetT: document.querySelector( Strings.targetT ),
        targetP: document.querySelector( Strings.targetP ),
        inputTopic: document.querySelector( Strings.topic ),
    }

    const writeText = ( topic, len, target ) => {
        oo7Str.getText( topic, len, target );
    }

    const writeTitle = () => {
        DocumentString.targetT.textContent = state.topic;
    }

    return{
        string: Strings,
        domStr: DocumentString,
        writeText: ( topic, len, target ) => {
            writeText( topic, len, target );
        },
        writeTitle: () => {
            writeTitle();
        }
    }

} )( oo7Str )
/************ ui界面处理模块-END  */


/************ 主空模块-BGN  */
// 主空模块( 与模块建立联系,使用函数传递参数的方式，这样可以在函数内部修改模块名称，方便操作 - 不建议使用模块名称直接引用功能，这样会使代码阅读性大大降低 )
var controlModule = ( function( data,ui ){
    
    const getInputValue = () => {
        console.log( data.publickAdd(5,5) ); // 访问API接口功能
    }

    let mainWrite = () => {
        // 获取表单值
        state.topic = data.getStrInput( ui.string.topic );
        state.len = data.getNumInput( ui.string.len );
        // 生成文档
        ui.writeText( state.topic, state.len, ui.string.targetP );
    }

    let activeWriteTitle = ( data ) => {
        // 用户输入标题时
        // 标题内容发生改变
        state.topic = data.target.value;
        ui.writeTitle();
    }
    
    var setupEventLiteners = ()=>{
        // 监听用户单击按钮
        ui.domStr.userClick.addEventListener( 'click', mainWrite );
        // oninput实时监听表单数据变化( 等待笔记 )
        ui.domStr.inputTopic.oninput = activeWriteTitle;
    }
    return{
        init: ()=>{
            console.log('Start!!!');
            setupEventLiteners();
        }
    }

} )( dataModule,uiModule )
/************ 主空模块-END  */
controlModule.init();




