import './App.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            text: "",
            wordArr: []
        }
        this.textBoxChanged = this.textBoxChanged.bind(this);
    }

    textBoxChanged(e) {
        this.setState({
            text: e.target.value,
            wordArr: e.target.value.replace(/\p{P}/gu, "").split(" ").filter(function(x) {return x !== "";})
        });
    }

    render () {
        const getMostCommonWords = () => {
            if(!this.state.wordArr)
                return "";
            var wordMap = new Map();
            this.state.wordArr.forEach((word) => {
                let val = wordMap.get(word);
                wordMap.set(word, val ? val + 1 : 1);
            });
            const sortedMap = [...wordMap].sort((a, b) => b[1] - a[1]);
            if(sortedMap[0])
                return `${sortedMap[0][0]}: ${sortedMap[0][1]} occurrences`;
            return "";            
        }
        return (
            <Container id="main-container">
                <Form.Group>
                    <Form.Label>Copy text below</Form.Label>
                    <Form.Control as="textarea" rows={10} onChange={this.textBoxChanged}/>
                </Form.Group>
                <Row>
                    <Col>
                        <Row>Characters:</Row>
                        <Row>{this.state.text.length}</Row>
                    </Col>
                    <Col>
                        <Row>Words:</Row>
                        <Row>{this.state.wordArr.length}</Row>
                    </Col>
                    <Col>
                        <Row>Most common words:</Row>
                        <Row>{getMostCommonWords()}</Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;
