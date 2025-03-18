import React from "react";
import SearchBox from "../../components/SearchBox";
import image from '../../assets/images/profileAvatar.png';

const Chat = () => {
    const customStyles = {
        height: '35px',
    }
    return (
        <div className="right-content container-fluid overflow-hidden" style={{ paddingTop: '70px' }}>
            <div className="row" style={{ border: '2px solid #ddd', borderRadius: '0.5rem' }}>
                {/* Left Column */}
                <div className="col-md-3 left-column contact-list ps-2 pt-2">
                    <div className="row hd ps-2 pb-2">Chats</div>
                    <div className="row m-0 "><SearchBox style={customStyles} /></div>
                    <div className="contact-wrapper">
                        <div className="row m-0 mt-1 d-flex align-items-center ps-1">
                            <div className="col-auto mt-1 ps-0">
                                <div className="userImg">
                                    <span className="rounded-circle">
                                        <img src={image} />
                                    </span>
                                </div>
                            </div>
                            <div className="col mt-1 ps-1 d-flex flex-column">
                                <b className="p-0 m-0">Danish</b>
                                <small className="m-0" style={{ fontSize: '0.7rem' }}>Assalam o alaikum</small>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Right Column */}
                <div className="col-md-9 right-column chat-screen">

                </div>
            </div>
        </div>

    );
}

export default Chat;