import React from 'react'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './index.less'
import AliyunUploadOSS from '@/components/AliyunUploadOSS'
import { ContentUtils } from 'braft-utils'
export default class EditorDemo extends React.Component {

    state = {
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(this.props.content??null)
    }


    handleEditorChange = (editorState:any) => {
        if(!editorState.isEmpty()){
            this.setState({ editorState })
            //将编辑器输入的内容跟传递回去
            const content:any=editorState.toHTML()
            this.props.setEditorKey(content)
        }
      else{
        this.props.setEditorKey('')
      }
    }

    insertImage=(url:any)=>  {
      console.log(url,"ggggggggg");
      
      this.setState({
        editorState: ContentUtils.insertMedias(this.state.editorState, [{
          type: 'IMAGE',
          url
        }])
      })
    }
    render () {

        const { editorState } = this.state
        const extendControls = [
            {
              key: 'antd-uploader',
              type: 'component',
              component: (
                <AliyunUploadOSS showUploadList={false}   insertImage={this.insertImage}> 
                        <button type="button" className="control-item button upload-button" data-title="插入图片">
                          插入图片
                        </button>
                </AliyunUploadOSS>
              )
            }
          ]
        return (
            <div className="my-editor">
                <BraftEditor
                    value={editorState}
                    onChange={this.handleEditorChange}
                    extendControls={extendControls}
                />
            </div>
        )

    }

}