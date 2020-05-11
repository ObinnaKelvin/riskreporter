import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import {Form, Button, Col} from 'react-bootstrap'
import Hero from './hero3'


class EditReport extends Component {
    constructor(props) {
        super(props);
        this.onChangeReporter = this.onChangeReporter.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeOwner = this.onChangeOwner.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePotentialRisk = this.onChangePotentialRisk.bind(this);
        this.onChangeLikelihood = this.onChangeLikelihood.bind(this);
        this.onChangePotential = this.onChangePotential.bind(this);
        this.onChangeMitigate = this.onChangeMitigate.bind(this);
        this.onChangeResidualOption = this.onChangeResidualOption.bind(this);
        this.onChangeResidual = this.onChangeResidual.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleVisibility = this.handleVisibility.bind(this);
        
        this.state = {
            reporter: '',
            date: '',
            location: '',
            owner: '',
            description: '',
            potentialRisk: '',
            likelihood: '',
            potential: '',
            mitigate: '',
            residualOption: '',
            residual: '',
            //Arrays down here
            locations: [],
            owners: [],
            likelihoods: [],
            impacts: [],
            visibility: "hidden"
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/risks/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                reporter: response.data.reporter,
                date: new Date(response.data.date),
                location: response.data.riskLocation,
                owner: response.data.riskOwner,
                description: response.data.riskDescription,
                potentialRisk: response.data.potentialRisk,
                likelihood: response.data.likelihood,
                potential: response.data.potentialImpact,
                mitigate: response.data.mitigatingMeasures,
                residualOption: response.data.residualRiskOption,
                residual: response.data.residualRisk,
                visibility: response.data.visibility
            })
        })
        .catch(err => console.log("Error: "+ err))

        axios.get('http://localhost:5000/locations/')
        .then(response => {
            console.log(response);
            if(response.data.length > 0) {
                this.setState({
                    locations: response.data.map(loc => loc.location)
                    
                })
                console.log(this.state.locations);
            }
            
        })

        axios.get('http://localhost:5000/likelihoods/')
        .then(response => {
            console.log(response);
            if(response.data.length > 0) {
                this.setState({
                    likelihoods: response.data.map(info => info.likelihood)
                })
            }
        })

        axios.get('http://localhost:5000/owners/')
        .then(response => {
            console.log(response);
            if(response.data.length > 0) {
                this.setState({
                    owners: response.data.map(data => data.owner)
                })
            }
        })

        axios.get('http://localhost:5000/impacts/')
        .then(response => {
            console.log(response);
            if(response.data.length > 0 ) {
                this.setState({
                    impacts: response.data.map(data => data.impact)
                })
            }
        })        


    }

    onChangeReporter = (e) => {
        this.setState({reporter: e.target.value})
    }

    onChangeDate = (e) => {
        this.setState({date: e.target.value})
    }

    onChangeLocation(e){
        this.setState({
            location: e.target.value
        });
    }

    onChangeOwner(e){
        this.setState({
            owner: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangePotentialRisk(e){
        this.setState({
            potentialRisk: e.target.value
        });
    }

    onChangeLikelihood(e){
        this.setState({
            likelihood: e.target.value
        });
    }

    onChangePotential(e){
        this.setState({
            potential: e.target.value
        });
    }

    onChangeMitigate(e){
        this.setState({
            mitigate: e.target.value
        });
    }

    onChangeResidualOption(e){
        this.setState({
            residualOption: e.target.value
        });
    }

    onChangeResidual(e){
        this.setState({
            residual: e.target.value
        });
    }

    handleVisibility() {
        if (this.state.residualOption === 'Yes'){
            this.setState({visibility: 'visible'})
        } else {
            this.setState({visibility: 'hidden', residual: ''})
        }
    }    

    onSubmit(e){
        e.preventDefault();
        const updatedReport = {
            reporter: this.state.reporter,
            date: this.state.date,
            location: this.state.location,
            owner: this.state.owner,
            description: this.state.description,
            potentialRisk: this.state.potentialRisk,
            likelihood: this.state.likelihood,
            potential: this.state.potential,
            mitigate: this.state.mitigate,
            residualOption: this.state.residualOption,
            residual: this.state.residual,
            visibility: this.state.visibility
        }
        console.log("Updated Report: ", updatedReport);

        axios.post('http://localhost:5000/risks/update/'+this.props.match.params.id, updatedReport)
        .then(result => console.log("Updated Report: ", result.data))

        // this.setState({
        //     reporter: '',
        //     date: '',
        //     location: '',
        //     owner: '',
        //     description: '',
        //     potentialRisk: '',
        //     likelihood: '',
        //     potential: '',
        //     mitigate: '',
        //     residualOption: '',
        //     residual: '',
        //     visibility: 'hidden'
        // })        


        window.location ='/';

    }
    
    render() {
        return (
            <>
            <Hero />
                <div>
                    <h1>Edit Report</h1>
                <br/>
                <form onSubmit = {this.onSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Reporter</Form.Label>
                        <Form.Control 
                            type="text" 
                            required
                            placeholder="Enter your Name" 
                            value = {this.state.reporter}
                            onChange = {this.onChangeReporter}
                        />
                        <Form.Text className="text-muted">
                            Simply type 'Anonymous' if you don't want your identity revealed.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicDate">
                        <Form.Label>Date</Form.Label>
                        <div>
                            <DatePicker 
                                selected = {this.state.date}
                                onChange = {this.onChangeDate}
                            />
                        </div>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Risk Location</Form.Label>
                            <Form.Control as="select"
                                required
                                value = {this.state.location}
                                onChange = {this.onChangeLocation}
                            >
                                <option>Choose...</option>
                                {/* <option>...</option> */}
                                {
                                    this.state.locations.map((loc) => {
                                        return <option key={loc} value={loc}>
                                                    {loc}
                                                </option>
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Risk Owner</Form.Label>
                            <Form.Control as="select"
                                required
                                value = {this.state.owner}
                                onChange = {this.onChangeOwner}
                            >
                                <option>Choose...</option>
                                {/* <option>...</option> */}
                                {
                                    this.state.owners.map(owner => {
                                        return  <option key={owner} value={owner}>
                                                    {owner}
                                                </option>
                                    })
                                }

                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" 
                                    rows="3" 
                                    placeholder="Describe the Risk you are reporting" 
                                    value = {this.state.description}
                                    onChange = {this.onChangeDescription}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Potential Risk</Form.Label>
                        <Form.Control type="text" 
                                    placeholder="What likely potential risk does it pose?" 
                                    value = {this.state.potentialRisk}
                                    onChange = {this.onChangePotentialRisk}
                        />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Likelihood of Occurance</Form.Label>
                            <Form.Control as="select"
                                value = {this.state.likelihood}
                                onChange = {this.onChangeLikelihood}
                            >
                                <option>Choose...</option>
                                {
                                    this.state.likelihoods.map(info => {
                                        return <option key={info} value={info}>
                                                    {info}
                                                </option>
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Potential Impact</Form.Label>
                            <Form.Control as="select"
                                value = {this.state.potential}
                                onChange = {this.onChangePotential}
                            >
                                <option>Choose...</option>
                                {
                                    this.state.impacts.map(info => {
                                        return <option key={info} value={info}>
                                                    {info}
                                                </option>
                                    })
                                }
                                
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Mitigating Measures</Form.Label>
                        <Form.Control type="text" 
                                value = {this.state.mitigate}
                                onChange = {this.onChangeMitigate}
                                placeholder="What Measures do you think could be used to mitigate the risk?" 
                        />
                    </Form.Group>
                    <Form.Group controlId="formGridState">
                        <Form.Label>Are there Residual Risk?</Form.Label>
                        <Form.Control as="select"
                            value = {this.state.residualOption}
                            onChange = {this.onChangeResidualOption}
                            onClick = {this.handleVisibility}
                        >
                            <option>Choose...</option>
                            <option value={"Yes"}>Yes</option>
                            <option value={"No"}>No</option>
                        </Form.Control>
                    </Form.Group>
                    
                    <div style = {{visibility: this.state.visibility}}>
                        <Form.Group controlId="formBasicEmail"
                            // style = {{visibility: this.state.visibility}}
                        >
                            <Form.Label>Residual Risk</Form.Label>
    
                            <Form.Control 
                                type="text" 
                                placeholder="Residual Risk" 
                                value = {this.state.residual}
                                onChange = {this.onChangeResidual}
                            />
                        </Form.Group>
                    </div>
{/* 
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                    <br/>
                    <br/>
                </form>
            </div>
            </>
        )
    }

}

export default EditReport