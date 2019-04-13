import React from 'react';
import {Modal, ModalBody,} from 'reactstrap';

export default props => {
    
    const clickHandler = () => {
        props.toggle();
    }

    const handleSubmit = e => {
        props.setPost(e);
    }

    return (
        <div>
            <Modal isOpen={props.activeModal} toggle={clickHandler} style={{background: 'white'}}>
                <ModalBody className='theme-border' style={{marginTop: 'none', paddingTop: 'none'}}>
                        <span className='balsamiq-bold'>Create Post</span>                    
                </ModalBody>
                <ModalBody className='theme-border'>
                    <form>
                        <input type='text' className='col-12 theme-border balsamiq-reg' placeholder='Add Text...'/>
                        <label htmlFor="avatar" className="submit-button col-3 text-center mt-1">Add Image</label>
                        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" style={{display: 'none'}}/>
                        <div className='col-12 text-right'>
                            <button type="submit" className="submit-button balsamiq-reg" onClick={handleSubmit}>POST</button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    )
}