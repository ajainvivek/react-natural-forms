import React, { Component } from 'react';
import { ViewPager, Frame, Track, View } from 'react-view-pager';
import SelectField from './SelectField';
import Plain from './Plain';

import './styles.css';

const COMPONENT_MAP = {
  plain: Plain,
  select: SelectField
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      data: this.props.data || []
    };

    this.mountQuestion = this.mountQuestion.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onPrev = this.onPrev.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.data) {
      this.setState({
        data: nextProps.data
      });
      this.mountQuestion(nextProps.trigger);
    }
  }
  mountQuestion(type) {
    let current;
    if (type) {
      current = (type === 'next') ? this.state.current + 1 : this.state.current - 1;
    } else {
      current = this.state.current;
    }
    this.setState({
      current,
      question: this.state.data[current]
    }, () => {
      if (type === 'next') {
        this.onNext();
      } else if (type === 'prev') {
        this.onPrev();
      }
    });
  }
  onNext() {
    const current = this.state.data[this.state.current];
    const isNext = this.state.current < this.state.data.length;
    const isPrev = this.state.current <= 0;
    this.track.next();
    if (typeof this.props.onNext === 'function') {
      this.props.onNext(current, isNext, isPrev);
    }
  }
  onPrev() {
    const current = this.state.data[this.state.current];
    const isNext = this.state.current < this.state.data.length;
    const isPrev = this.state.current <= 0;
    this.track.prev();
    if (typeof this.props.onPrev === 'function') {
      this.props.onPrev(current, isNext, isPrev);
    }
  }
  render() {
    return (
      <div className="nl-form">
        <ViewPager tag="main">
          <Frame
            className="frame"
            style={{
              userSelect: 'none',
              outline: 'none'
            }}
          >
            <Track
              ref={(c) => {
                this.track = c;
              }}
              viewsToShow={1}
              infinite
              className="track"
            >
              {
                this.state.data.map((question, qindex) => (
                  <View className="view" key={qindex}>
                    {
                      <div
                        className="nl-question"
                        style={{
                          height: '500px'
                        }}
                      >
                        {
                          question.map((content, index) => {
                            const COMPONENT = COMPONENT_MAP[content.type];
                            return (
                              <COMPONENT data={content.data} key={index + this.state.current} />
                            );
                          })
                        }
                      </div>
                    }
                  </View>
                ))
              }
            </Track>
          </Frame>
        </ViewPager>
      </div>
    );
  }
}
