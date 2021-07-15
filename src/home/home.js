import React, { useState } from "react";
import "./home.scss";
import { Link } from "react-router-dom";

// function Homepage({ socket }) {
//     const [username, setusername] = useState("");
//     const [roomname, setroomname] = useState("");

//     const sendData = () => {
//         if (username !== "" && roomname !== "") {
//             socket.emit("joinRoom", { username, roomname });
//         } else {
//             alert("username and roomname are must !");
//             window.location.reload();
//         }
//     };

//     return (
//         <div className="homepage">
//             <h1>Welcome to ChatApp</h1>
//             <input
//                 placeholder="Input your user name"
//                 value={username}
//                 onChange={(e) => setusername(e.target.value)}
//             ></input>
//             <input
//                 placeholder="Input the room name"
//                 value={roomname}
//                 onChange={(e) => setroomname(e.target.value)}
//             ></input>
//             <Link to={`/chat/${roomname}/${username}`}>
//                 <button onClick={sendData}>Join</button>
//             </Link>
//         </div>
//     );
// }


class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            roomname: "",
        }
    }

    setusername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    setroomname = (event) => {
        this.setState({
            roomname: event.target.value
        })
    }

    sendData = () => {
        const {username, roomname} = this.state;

        if(username !== "" && roomname !== ""){
            this.props.socket.emit("joinRoom", { username, roomname })
        } else {
            alert("username and roomname are must !");
            window.location.reload();
        }
    }

    render() {
        return (
            <div className="homepage">
                <h1>Welcome to ChatApp</h1>
                <input
                    placeholder="Input your user name"
                    value={this.state.username}
                    onChange={(e) => this.setusername(e)}
                ></input>
                <input
                    placeholder="Input the room name"
                    value={this.state.roomname}
                    onChange={(e) => this.setroomname(e)}
                ></input>
                <Link to={`/chat/${this.state.roomname}/${this.state.username}`}>
                    <button onClick={this.sendData}>Join</button>
                </Link>
            </div>
        );
    }

}
export default Homepage;