// import { useSelector } from "react-redux";
import { connect } from 'react-redux';
import "./process.scss";
import React from "react";
import { process } from "../store/action/index";

// function Process() {

//     const state = useSelector((state) => state.ProcessReducer);

//     return (
//         <div className="process">
//             <h5>
//                 Secret Key : <span>"uI2ooxtwHeI6q69PS98fx9SWVGbpQohO"</span>
//             </h5>
//             <div className="incoming">
//                 <h4>Incoming Data</h4>
//                 <p>{state.cypher}</p>
//             </div>
//             <div className="crypt">
//                 <h4>Decypted Data</h4>
//                 <p>{state.text}</p>
//             </div>
//         </div>
//     );
// }

class Process extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="process">
                <h5>
                    Secret Key : <span>"uI2ooxtwHeI6q69PS98fx9SWVGbpQohO"</span>
                </h5>
                <div className="incoming">
                    <h4>Incoming Data</h4>
                    <p>{this.props.process.cypher}</p>
                </div>
                <div className="crypt">
                    <h4>Decypted Data</h4>
                    <p>{this.props.process.text}</p>
                </div>
            </div>
        );
    }


}

const mapStateToProps = state => {
    return {
        // gọi lên store, lấy các state (danh sách các Process) -> chuyển thành các props
        process: state.ProcessReducer //state.ProcessReducer là tên combine trong file index reducers
    }
}

const mapDispatchToProps = (dispatch, props) => {
    // return{
    //     dispatchProcess: (encrypt, msg, cipher) =>{
    //         dispatch(process(encrypt, msg, cipher));
    //     },
    
    // }
}
export default connect(mapStateToProps, mapDispatchToProps)(Process);