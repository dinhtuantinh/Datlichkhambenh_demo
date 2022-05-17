import React, { Component } from 'react';
import { connect } from "react-redux";
import {FormattedMessage} from 'react-intl';
import './ManageNote.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import {CommonUtils} from '../../../utils';
import {createNewNote} from '../../../services/userService';
import {toast} from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageNote extends Component {
    constructor(props) {
        super(props);
        this.state={
            name: '',
            imageBase64:'',
            descriptionHTML: '',
            descriptionMarkdown: '',
        };
    }
    async componentDidMount() {
        
    }

    async componentDidUpdate(prevProps, prevState,snapshot) {
        if(this.props.language !== prevProps.language){
            
        }
        
    }

    handleOnChangeInput = (event, id) =>{
        let stateCopy={...this.state}
        stateCopy[id]=event.target.value;
        this.setState({
            ...stateCopy,
        })
    }

    handleEditorChange = ({html, text})=>{
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }

    handleOnchangeImage=async(event) => {
        let data=event.target.files;
        let file = data[0];
        if(file){
            let base64=await CommonUtils.getBase64(file);
            this.setState({
                imageBase64:base64,
            })
        }
    }

    handleSaveNewNote=async()=>{
        let res = await createNewNote(this.state)
        if(res && res.errCode===0){
            toast.success('Add new clinic succeeds!')
            this.setState({
                name: '',
                imageBase64:'',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        }else{
            toast.error('Something wrongs...!')
            console.log('check error: ', res);
        }
    }
    render() {
        
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">Quản lý cẩm nang</div>
                <div className="all-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên danh mục</label>
                        <input className="form-control" type="text" value={this.state.name}
                        onChange={(event)=>this.handleOnChangeInput(event,'name')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh về danh mục</label>
                        <input className="form-control-file" type="file"
                        onChange={(event)=>this.handleOnchangeImage(event)}
                        />
                    </div>
                    <div className="col-12">
                    <MdEditor 
                        style={{ height: '300px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                        value={this.state.descriptionMarkdown}
                    />
                    </div>
                    <div className="col-12">
                        <button className="btn-save-specialty"
                        onClick={()=>this.handleSaveNewNote()}
                        >Save</button>
                    </div>
                </div>
            
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageNote);
