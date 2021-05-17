import React from 'react';
import { Upload, message} from 'antd';

import {ossConfig }from '@/services/common'

class AliyunOSSUpload extends React.Component{
  state = {
    OSSData: {},
  };

  async componentDidMount() {
    await this.init();
  }


  //初始化，获取oss上传签名
  init = async () => {
    try {
      const OSSData = await ossConfig();
      this.setState({
        OSSData,
      });
    } catch (error) {
      message.error(error);
    }
  };
//额外的上传参数
getExtraData = (file:any) => {
    const { OSSData } :any= this.state;

    return {
      key: file.key,
      OSSAccessKeyId: OSSData.accessid,
      policy: OSSData.policy,
      Signature: OSSData.signature,
    };
  }

  //文件上传过程中触发的回调函数，直到上传完成
  onChange = ({ file }:any) => {
   if(file.status==='done'){
   if( this.props.setCoverKey)this.props.setCoverKey(file.key)
   
   
   this.props.setFlag(false)
    //上传成功过后，把文件的key,设置某个字段的值
    if(this.props.insertImage)this.props.insertImage(file.url)
    //上传完成之后，如果需要url
    message.success('上传成功')
     
   }


 
  };



//上传文件之前
  beforeUpload = async (file:any) => {
    const { OSSData }:any = this.state;
    const expire = OSSData.expire * 1000;

    if (expire < Date.now()) {
      await this.init();
    }
    const dir='ws/'
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    file.key= OSSData.dir +dir+ Date.now()+suffix;
    file.url =OSSData.host+dir+OSSData.dir + filename;

    return file;
  };

  render() {
    const { value,accept, showUploadList}:any = this.props;
    const props = {
      name: 'file',
      accept:accept||'',
      fileList: value,
      action: this.state.OSSData.host,
      onChange: this.onChange,
      data: this.getExtraData,
      beforeUpload: this.beforeUpload,
      listType:'picture',
      maxCount:1,
      showUploadList: showUploadList
    };
    return (
      <Upload {...props}   >
   {this.props.children}
      </Upload>
    );
  }
}


export default AliyunOSSUpload