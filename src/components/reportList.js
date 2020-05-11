import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// import {Modal} from 'react-bootstrap'
import Hero1 from './hero1';

const Report = props => {
    return(
        <tr>
            <td>{props.report.reporter}</td>
            <td>{props.report.date.substring(0,10)}</td>
            <td>{props.report.riskLocation}</td>
            <td>{props.report.riskOwner}</td>
            <td>{props.report.riskDescription}</td>
            <td>{props.report.potentialRisk}</td>
            <td>{props.report.likelihood}</td>
            <td>{props.report.potentialImpact}</td>
            <td>{props.report.mitigatingMeasures}</td>
            <td>{props.report.residualRiskOption}</td>
            <td>{props.report.residualRisk}</td>
            <td>
                <Link to={"/edit/"+props.report._id}>Edit</Link> | <button href="#" onClick={() => {props.deleteReport(props.report._id)}}>Delete</button>
            </td>
        </tr>
    )
}



class ReportList extends Component {
    constructor(props){
        super(props);
        this.deleteReport = this.deleteReport.bind(this);
        this.reportList = this.reportList.bind(this);
        // this.editReportModal = this.editReportModal.bind(this);
        this.state = {
            reports: []
        }
    }

    // editReportModal = () => {
    //     // const [lgShow, setLgShow] = useState(false);
    //     return (
    //         <Modal
    //             size="lg"
    //             show={'true'}
    //             onHide={'false'}
    //             // show={lgShow}
    //             // onHide={() => setLgShow(false)}
    //             aria-labelledby="example-modal-sizes-title-lg"
    //         >
    //             <Modal.Header closeButton>
    //             <Modal.Title id="example-modal-sizes-title-lg">
    //                 Large Modal
    //             </Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>...</Modal.Body>
    //         </Modal>
    //     )
    // }

    componentDidMount() {
        axios.get('http://localhost:5000/risks/')
        .then(response => {
            this.setState({
                reports: response.data
            })
        })
        .catch(err => console.log(err));
    }

    deleteReport(id){
        axios.delete('http://localhost:5000/risks/'+id)
        .then(response => console.log(response.data));
        this.setState({
            //This removes the deleted element from DOM
            reports: this.state.reports.filter(element => element._id !== id)
        })
    }

    reportList(){
        return this.state.reports.map(newReport => {
            return <Report report = {newReport} deleteReport = {this.deleteReport} key = {newReport._id}/>
        })
    }
    


    render() {
        return (
            <div>
                <Hero1 />
                <h3>Registered Report(s)</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Reporter</th>
                            <th>Date</th>
                            <th>Risk Location</th>
                            <th>Risk Owner</th>
                            <th>Description</th>
                            <th>Potential Risk</th>
                            <th>Likelihood of Occurance</th>
                            <th>Potential Impact</th>
                            <th>Mitigation Measures</th>
                            <th>Are there Residual Risk?</th>
                            <th>Residual Risk</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.reportList()}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default ReportList
