import React from 'react';

class OLDProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status,
       // status: "it-kamasutra.com"

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
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState({
            status:  e.currentTarget.value,
        })
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

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={ this.activateEditMode}>{this.props.status || "----"}</span>

                        {/*
                        <span onDoubleClick={ this.activateEditMode.bind(this)}>{this.props.status}</span>
*/}
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/>

                        {/*
                        <input autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={this.props.status}/>
*/}
                    </div>
                }
            </div>
        );
    }
}

export default OLDProfileStatus;