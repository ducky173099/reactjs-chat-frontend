import "./chat.scss";
import { to_Decrypt, to_Encrypt } from "../aes.js";
import { process } from "../store/action/index";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { connect } from 'react-redux';

// function Chat({ username, roomname, socket }) {
//     const [text, setText] = useState("");
//     const [messages, setMessages] = useState([]);

//     const dispatch = useDispatch();

//     const dispatchProcess = (encrypt, msg, cipher) => {
//         dispatch(process(encrypt, msg, cipher));
//     };

//     useEffect(() => {
//         socket.on("message", (data) => {
//             //decypt
//             const ans = to_Decrypt(data.text, data.username);
//             dispatchProcess(false, ans, data.text);
//             console.log(ans);
//             let temp = messages;
//             temp.push({
//                 userId: data.userId,
//                 username: data.username,
//                 text: ans,
//             });
//             setMessages([...temp]);
//         });
//     }, [socket]);

//     const sendData = () => {
//         if (text !== "") {
//             //encrypt here
//             const ans = to_Encrypt(text);
//             socket.emit("chat", ans);
//             setText("");
//         }
//     };
//     const messagesEndRef = useRef(null);

//     const scrollToBottom = () => {
//         messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     };

//     useEffect(scrollToBottom, [messages]);

//     console.log(messages, "mess");

//     return (
//         <div className="chat">
//             <div className="user-name">
//                 <h2>
//                     {username} <span style={{ fontSize: "0.7rem" }}>in {roomname}</span>
//                 </h2>
//             </div>
//             <div className="chat-message">
//                 {messages.map((i) => {
//                     if (i.username === username) {
//                         return (
//                             <div className="message">
//                                 <p>{i.text}</p>
//                                 <span>{i.username}</span>
//                             </div>
//                         );
//                     } else {
//                         return (
//                             <div className="message mess-right">
//                                 <p>{i.text} </p>
//                                 <span>{i.username}</span>
//                             </div>
//                         );
//                     }
//                 })}
//                 <div ref={messagesEndRef} />
//             </div>
//             <div className="send">
//                 <input
//                     placeholder="enter your message"
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                     onKeyPress={(e) => {
//                         if (e.key === "Enter") {
//                             sendData();
//                         }
//                     }}
//                 ></input>
//                 <button onClick={sendData}>Send</button>
//             </div>
//         </div>
//     );
// }


class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef(); 
        this.state = {
            text: "",
            messages: [],
        }
    }

    componentWillMount = () => {
        this.props.socket.on("message", (data) => {
            //decypt
            const ans = to_Decrypt(data.text, data.username);
            this.props.dispatchProcess(false, ans, data.text);
            console.log(ans);
            let temp = this.state.messages;
            temp.push({
                userId: data.userId,
                username: data.username,
                text: ans,
            });

            this.setState({
                messages: [...temp]
            })
        });
    }



    setText = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    sendData = () => {
        if(this.state.text !== ""){
            //encrypt here
            const ans = to_Encrypt(this.state.text);
            this.props.socket.emit("chat", ans);
            this.setState({
                text: ""
            })
        }
    }
   

    render() {

        const {username, roomname} = this.props;
        const {messages, text} = this.state;

        

        return (
            <div className="chat">
                <div className="user-name">
                    <h2>
                        {username} <span style={{ fontSize: "0.7rem" }}>in {roomname}</span>
                    </h2>
                </div>
                <div className="chat-message">
                    {messages.map((i) => {
                        if (i.username === username) {
                            return (
                                <div className="message">
                                    <p>{i.text}</p>
                                    <span>{i.username}</span>
                                </div>
                            );
                        } else {
                            return (
                                <div className="message mess-right">
                                    <p>{i.text} </p>
                                    <span>{i.username}</span>
                                </div>
                            );
                        }
                    })}
                    <div ref={this.myRef} />
                </div>
                <div className="send">
                    <input
                        placeholder="enter your message"
                        value={text}
                        onChange={(e) => this.setText(e)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                this.sendData();
                            }
                        }}
                    ></input>
                    <button onClick={this.sendData}>Send</button>
                </div>
            </div>
        );
    }
    scrollToBottom = () => {
        this.myRef.current.scrollIntoView({behavior: "smooth"});
    }
    // executeScroll = () => this.myRef.current.scrollIntoView();
}

const mapStateToProps = state => {
    // return {
    //     // gọi lên store, lấy các state (danh sách các product) -> chuyển thành các props
    //     products: state.products //state.products là tên combine trong file index reducers
    // }
}

const mapDispatchToProps = (dispatch, props) =>{
    return{
        dispatchProcess: (encrypt, msg, cipher) =>{
            dispatch(process(encrypt, msg, cipher));
        },
    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);