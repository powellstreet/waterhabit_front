import { connect } from 'react-redux';
import UserRecords from '../components/UserRecords'

function mapStateToProps(state){
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(UserRecords);