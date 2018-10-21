import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input } from 'antd';
import DeleteIcon from 'icons/DeleteIcon';
import './styles.css';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      tempProperties: {
        ...props.project,
      }
    };
  }

  componentDidMount() {
    if (this.props.project.name === '') {
      this.setState({isEditing: true});
    }
  }

  getEditingMode = () => {
    this.setState({isEditing: true});
  }

  changeProject = () => {
    this.setState({isEditing: false});
    this.props.onChangeProject(this.state.tempProperties);
  }

  changeName = (evt) => {
    const name = evt.target.value;
    this.setState({
      tempProperties: {
        ...this.state.tempProperties,
        name,
      }
    });
  }

  deleteProject = () => {
    const { project } = this.props;
    this.props.onDeleteProject(project.id);
  }

  getDateDisplay = (date) => {
    return `${date.toDateString()}`;
  }

  render() {
    const { project } = this.props;
    const { name, lastModified } = project;
    const { isEditing, tempProperties } = this.state;
    const formattedModified = this.getDateDisplay(lastModified);
    
    if (isEditing) {
      return (
        <Row className="list-item-editing" type="flex" justify="space-between">
          <Col span={8} className="list-item-name">
            <Input value={tempProperties.name} onPressEnter={this.changeProject} onChange={this.changeName} placeholder="Name of your project"/>
          </Col>
          <Col span={8} className="list-item-last-modified">
            {formattedModified}
          </Col>
          <Col span={4}>
            <DeleteIcon onClick={this.deleteProject} />
          </Col>
        </Row>
      )
    } else {
      return (
        <Row className="list-item" type="flex" justify="space-between">
          <Col span={8} className="list-item-name" onClick={this.getEditingMode}>
            <div className="list-item-name">
              {name}
            </div>
          </Col>
          <Col span={8} className="list-item-last-modified">
            {formattedModified}
          </Col>
          <Col span={4}>
            <DeleteIcon onClick={this.deleteProject} />
          </Col>
        </Row>
      );
    }
  }
}

ListItem.propTypes = {
  onChangeProject: PropTypes.func,
  onDeleteProject: PropTypes.func,
};

export default ListItem;
