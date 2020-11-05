import React, { Component } from 'react'
import { Upload, Modal } from 'antd';

class Test extends Component {
    constructor(props) {
        super(props)

        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: [],
        };
    }
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }  
    handleCancel(){
        this.setState({ previewVisible: false })
    };

    async handlePreview(file){
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }
        this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
        previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    async handleChange({ fileList }){
        let workMsg
        if(fileList[0]){
            workMsg = await this.getBase64(fileList[0].originFileObj)
            this.props.handleWork(workMsg)
        }
        this.setState({ fileList })
    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        return (
            <div>
                <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={(file)=>{this.handlePreview(file)}}
                onChange={(fileliust)=>{this.handleChange(fileliust)}}
                >
                    {fileList.length >= 1 ? null : <div style={{ marginTop: 8 }}>Upload</div>}
                </Upload>
                <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={()=>{this.handleCancel()}}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}

export default Test