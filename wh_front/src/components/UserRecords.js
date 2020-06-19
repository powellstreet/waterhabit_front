import React from "react";

// const UserRecords = ({ props, history }) => {
//   return (
//     <div>
//       UserRecords
//       <div>
//         <div>token : {props.token}</div>
//         <button
//           name="goUserConsole"
//           onClick={() => history.push('/profile')}
//         >
//           Go Profile!
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserRecords;

export default class UserRecords extends React.Component {
  render(){
    return(
      <div>
        token : {this.props.token}
      </div>
    )
  }
}

// class 에서는 mapStateToProps 를 사용하는데, hooks에서는 useSelector가 그 역할을 대신 해주는듯?