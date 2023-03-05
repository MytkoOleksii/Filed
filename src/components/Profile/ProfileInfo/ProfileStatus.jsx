import React from 'react';

class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }

    activateEditMode = () => {
        this.setState( {
            editMode: true,
        });
}
    deactivateEditMode =  () => {
        this.setState({
            editMode: false,
        });
    }
   /* activateEditMode () {
        //Варіант 2
        this.setState( {
            editMode: true,
        });
        //Варіант 1
       /!* this.state.editMode = true;
        this.forceUpdate();*!/
    }*/
   /* deactivateEditMode () {
        this.setState({
            editMode: false,
        });
    }*/

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={ this.activateEditMode}>{this.props.status}</span>

                        {/*
                        <span onDoubleClick={ this.activateEditMode.bind(this)}>{this.props.status}</span>
*/}
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus={true} onBlur={this.deactivateEditMode} value={this.props.status}/>

                        {/*
                        <input autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={this.props.status}/>
*/}
                    </div>
                }
            </div>
        );
    }
}

export default ProfileStatus;