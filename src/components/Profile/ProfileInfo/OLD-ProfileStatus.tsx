import React, {ChangeEvent} from 'react';

type PropsType = {
    status: string
    updateStatus: ( newStatus: string) => void

}
type StateType = {
    status?: string
    editMode?: boolean
}

class OLDProfileStatus extends React.Component <PropsType, StateType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState( { editMode: true, });
}

    deactivateEditMode =  () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status) // функция принимает новый статус
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status:  e.currentTarget.value
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

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
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