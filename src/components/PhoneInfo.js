import React, { Component } from 'react';

class PhoneInfo extends Component {
    static defaultProps = {
        info: {
            name: '이름',
            phone: '010-0000-0000',
            id: 0
        }
    }
    //수정시에만 적용되는 state
    state = {
        editing: false,
        name: '',
        phone:'',
    }

    handleRemove = () => {
        //삭제 버튼이 클릭되면 onRemove에 id넣어서 호출
        const { info, onRemove } = this.props;
        onRemove(info.id);
    }
    //editting을 반전시키는 함수
    handleToggleEdit = () => {
        const { editing } = this.state;
        this.setState({ editing: !editing });
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        //수정 상태가 아니고, info값이 같다면 리렌더링 안함
        console.log(nextProps);
        console.log(this.props);
        if (!this.state.editing
            && !nextState.editing
            && nextProps.info === this.props.info) {
            return false;
        }
        return true;
    }
    componentDidUpdate(prevProps, prevState) {
        //editing 값이 바뀔 때
        //수정 눌렀을 땐 기존의 값 input에 출력
        //수정 적용할 땐 input의 값 부모에 전달
        const { info, onUpdate } = this.props;
        if (!prevState.editing && this.state.editing) {
            //editing 값이 false -> true 전환 == info의 값을 state에 넣어줌
            this.setState({
                name: info.name,
                phone:info.phone
            })
        }
        if (prevState.editing && !this.state.editing) {
            onUpdate(info.id, { name: this.state.name, phone: this.state.phone });
        }
    }
    render() {
        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        };
        //수정모드
        const { editing } = this.state;
        if (editing) {
            return (
                <div style={style}>
                    <div>
                        <input
                            value={this.state.name}
                            name="name"
                            placeholder='이름'
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <input
                            value={this.state.phone}
                            name="phone"
                            placeholder='전화번호'
                            onChange={this.handleChange}
                        />
                    </div>
                    <button onClick={this.handleToggleEdit}>적용</button>
                    <button onClick={this.handleRemove}>삭제</button>
                </div>
            );
        }
        //일반 모드
        const {
            name, phone } = this.props.info;
        return (
            <div style={style}>
                <div><b>{name}</b></div>
                <div>{phone}</div>
                <button onClick={this.handleToggleEdit}>수정</button>
                <button onClick={this.handleRemove}>삭제</button>
            </div>
        );
        }
    }

    export default PhoneInfo;