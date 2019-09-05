import React,{Component} from 'react';
import { connect } from 'react-redux';
import ReportPresentational from '../Presentational/ReportPresentational';
import FetchReportAction from '../../Actions/FetchReportAction';
class ReportContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            report:{},
            spin:true,
            thresholdGood:5,
            thresholdAvgHigh:3,
            thresholdBadHigh:5,
            thresholdBadSecondHigh:3,
            thresholdAvgSecondHigh:5
        }
    }
    componentDidMount(){
       if(!this.props.logged_in){
           alert("Plese select Dates and Device from Dashboard")
           this.props.history.push('/')
       }
       
    }
    static getDerivedStateFromProps(props,state){
        if(props.report_data !== state.report)
        return{ 
            report:props.report_data     //get the valeu of the report
        }
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.report_data !== this.props.report_data ){
           
             this.setState({spin:false})
           }else if(this.props.report_data !== prevState.report){
               alert("Please Select device and Date from the Dashboard")
               this.props.history.push('/')
           }
       
          
           
    }
    onChangeSlider = (variable,e) =>{
        this.setState({[variable]:e})
      }
    render(){
        return (
           <ReportPresentational 
           onChangeSlider={this.onChangeSlider}
           thresholdAvgHigh={this.state.thresholdAvgHigh}
          thresholdAvgSecondHigh={this.state.thresholdAvgSecondHigh}
          thresholdBadHigh={this.state.thresholdBadHigh}
          thresholdBadSecondHigh={this.state.thresholdBadSecondHigh}
          thresholdGood={this.state.thresholdGood}
           {...this.state.report} 
           device_list={this.props.device_list}
           spin={this.state.spin}/>

        )
    }
}
const mapActionToProps = {
FetchReportAction:FetchReportAction
}
const mapStateToProps = state =>({
report_data:state.FetchReportReducer,
device_list:state.FetchDeviceReducer.device_list,
logged_in:state.UserLoginReducer.logged_in
})
export default connect(mapStateToProps,mapActionToProps)(ReportContainer);