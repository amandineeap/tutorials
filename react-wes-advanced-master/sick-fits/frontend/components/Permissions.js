import { Query, Mutation } from 'react-apollo';
import Error from './ErrorMessage';
import gql from 'graphql-tag';
import Table from '../components/styles/Table';
import SickButton from '../components/styles/SickButton';
import Proptypes from 'prop-types';

const possiblePermissions = [
    'ADMIN',
    'USER',
    'ITEMCREATE',
    'ITEMUPDATE',
    'ITEMDELETE',
    'PERMISSIONUPDATE'
];

const ALL_USERS_QUERY = gql`
    query{
        users{
            id
            name
            email
            permission
        }
    }
`;

const UPDATE_PERMISSIONS_MUTATION = gql`
    mutation updatePermissions($permission: [Permission], $userId: ID!){
        updatePermissions(permission: $permission, userId: $userId){
            id
            permission
            name
            email
        }
    }
`;

const Permissions = props => (
    <Query query={ALL_USERS_QUERY}>
        {({data, loading, error}) => 
            console.log(data) || (
            <div>
                <Error error={error} /> 
                <h2>Manage permissions</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            {possiblePermissions.map(permission => <th key={permission}>{permission}</th>)}
                            <th>-</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.users.map(user => 
                            <UserPermissions user={user} key={user.id}/>)}
                    </tbody>
                </Table>
            </div>
            )
            
        }
    </Query>

);


class UserPermissions extends React.Component{
    static propTypes = {
        user: Proptypes.shape({
            name: Proptypes.string,
            email: Proptypes.string,
            id: Proptypes.string,
            permission: Proptypes.array
        }).isRequired
    }
    state = {
        permission: this.props.user.permission
    }
    handlePermissionChange = (e, updatePermissions) => {
        const checkbox = e.target;
        // copy current permission
        let updatedPermissions = [...this.state.permission];
        
        if(checkbox.checked){
            updatedPermissions.push(checkbox.value);
        }else{
            updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
        }
        this.setState({permission: updatedPermissions});
        updatePermissions();
        console.log(updatedPermissions);
    }
    render(){
        const user = this.props.user;
        return (
            <Mutation mutation={UPDATE_PERMISSIONS_MUTATION} variables={{
                permission: this.state.permission,
                userId: this.props.user.id
            }}>{(updatePermissions, { loading, error }) => (
                <>

                    { error && <tr><td colspan="8"><Error error={error} /></td></tr> }
                
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        {possiblePermissions.map(permission => (
                            <td key={permission}>
                                <label htmlFor={`${user.id}-permission-${permission}`}>
                                    <input 
                                        id={`${user.id}-permission-${permission}`}
                                        type="checkbox" 
                                        checked={this.state.permission.includes(permission)}
                                        value={permission}
                                        onChange={(e) => {
                                            this.handlePermissionChange(e, updatePermissions)}
                                        }    
                                    />
                                </label>
                            </td>
                        ))}
                        <td>
                            <SickButton
                            type="button"
                            disabled={loading}
                            onClick={updatePermissions}
                        >Updat{loading? 'ing' : 'e'}</SickButton></td>
                    </tr> 
                </>
            )}
            </Mutation>
        )
    }
}
export default Permissions;