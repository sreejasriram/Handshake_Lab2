import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
// import StudentNav from './studentNavbar';
import { Card, CardContent, Avatar} from '@material-ui/core/';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import emptyPic from '../../images/empty-profile-picture.png';
import {environment} from '../../Utils/constants'
import { connect } from "react-redux";
import { fetchConversations } from "../../redux/actions/index";

//create the Student Home Component
class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentId: 0,
            messagelist: null,
            messageindex: 0,
            convofilter: [],
            namesearch:"",
            locsearch:"",
            appiledJob:[],
            style:[],
            uploadresume:false,
            resume:null,
            currentjobId:0,
            currentcompanyId:0,
            emptyprofilepic:emptyPic,
            rowsPerPage:5,
            page:0,
            messagetext:""
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.showJob = this.showJob.bind(this);
     
    }

    

    inputChangeHandler = (e) => {
        const value = e.target.value
        this.setState({
            [e.target.name]: value
        })
    }

   

    showJob = (e) => {
        this.setState({
            messageindex: e
        })

    }

    
    sendMessage = (receiverId) =>{
            let currentdate = new Date()

            const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
            const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(currentdate) 

            let datestr  = mo+" "+da+" "+ye+" "+currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds()
            
            let data = null
                data={
                    id1 : this.state.studentId,
                    id2 : receiverId,
                    update :  { $push:{messages:[{
                        fromId: this.state.studentId,
                        message: this.state.messagetext,
                        dateTime: datestr
                        // dateTime: currentdate.getDay() + " " + currentdate.getMonth() + " " + currentdate.getDate() + " " + currentdate.getFullYear() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds()
                    }]}}
                }
           
            console.log(data)
            axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

            axios.post(environment.baseUrl+'/company/send_message', data)
                .then(response => {
                    console.log("in frontend after response");
                    console.log(response.data)
                    if (response.data) {
                        this.fetchmessages()
                    } else if (response.data.error) {
                        console.log("response" + response.data.error)
                    }
                }
            )
    }


    componentDidMount() {
        this.setState({ studentId: sessionStorage.getItem('id') })

        this.fetchmessages()
    }

    fetchmessages = () =>{
        console.log(sessionStorage.getItem('id'))
        this.setState({
            messagetext:"",
            messageindex:0
        })
        this.props.fetchConversations();

        // axios.get(environment.baseUrl+'/company/fetch_convos/' + sessionStorage.getItem('id'))
        //     .then((response) => {
        //         console.log(response.data)
        //         if (response.data.rows.length>0) {
        //             this.setState({
        //                 messagelist: response.data,
        //                 messagetext:"",
        //                 messageindex:0

        //             })
        //     }
        // })
        // console.log(this.state.messagelist)
    }

    render() {
        let conversations = null;
        let detailedconvo = null;
        let convodetailed = null;
      
        let messagelist = this.props.messagelist
        console.log(typeof(messagelist))
        if (messagelist.length) {
           
                let compare = (a,b) =>{
                let comparison = 0
                console.log(a)
                var alastmsg = a[0].messages
                var blastmsg = b[0].messages
                if (a[0].messages[(alastmsg.length)-1].dateTime < b[0].messages[(blastmsg.length)-1].dateTime) {
                    comparison = 1;
                  } else if (a[0].messages[(alastmsg.length)-1].dateTime > b[0].messages[(blastmsg.length)-1].dateTime) {
                    comparison = -1;
                  }
                  return comparison;
            }
            if (messagelist.length)
                messagelist.sort(compare);
            console.log(this.state.studentId)
            console.log(messagelist)
 
            if (messagelist.length > 0) {
                

                console.log("aa")
              
                conversations = (
                    <div style = {{height : '310px', paddingTop:'10px', overflow:'auto',marginLeft:'10px',paddingLeft:'10px'}}>
                        {/* {messagelist.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((message,index) => { */}
                            {messagelist.length?messagelist.map((message, index) => {
                            var lastmsg = message[0].messages
                            console.log(lastmsg.length)
                            return (<div >
                                <Link onClick={() => this.showJob(index)} style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                                    <div class="col-md-2"   ><Avatar src={message[0].info[0].image?message[0].info[0].image:this.state.emptyprofilepic} style={{height:'50px', width:'50px',position:'relative',left:'-20px'}} >DP</Avatar></div>
                                    <div class="col-md-8" style={{padding: '0px',marginBottom:'16px'}}>
                                    <p style={{ fontSize: '16px', color: 'rgba(0,0,0,.8)', fontWeight: '400', marginBottom: '0px' }}>{message[0].info[0].name}</p>
                                    <p style={{ fontSize: '14px', color: 'rgba(0,0,0,.8)', fontWeight: '400', marginBottom: '0px' }}>{message[0].info[0].college?message[0].info[0].college:message[0].info[0].location}</p>
                                    <p style={{ fontSize: '14px', color: 'rgba(0,0,0,.56)', fontWeight: '400', marginBottom: '0px' }}>{message[0].messages[(lastmsg.length)-1].message}</p></div>
                                    <div class="col-md-2" style={{padding: '0px', fontSize: '14px', color: 'rgba(0,0,0,.56)'}}>
                                        {message[0].messages[(lastmsg.length)-1].dateTime.substring(0,6)}
                                    </div>
                                    <hr style = {{width:'100%', position:"relative", left:"-50px"}}></hr>
                                    </Link>
                            </div>
                            )
                        }):""}
                        
                    </div>
                )
                convodetailed = messagelist[this.state.messageindex]

                console.log(this.state.messageindex)
                if (this.state.messageindex === -1){
                    detailedconvo = (
                        <div style={{height:'200px', textAlign:'center'}}>
                            <p style={{ fontSize: '13px', fontWeight: '500', margin : '0px', lineheight : '20px', color : 'rgba(0,0,0,.60)' }}>No conversation selected.</p>
                        </div>
                    )
                }else{
                detailedconvo = (
                    <div>
                        <div style={{height:'45px', textAlign:'center'}}>
                        <h4 style = {{fontFamily : "Arial",fontWeight:"700", fontSize : '18px', margin : '0px'}}>{convodetailed[0].info[0].name}</h4>
                        <p style={{ fontSize: '13px', fontWeight: '400', margin : '0px', lineheight : '20px', color : 'rgba(0,0,0,.56)', }}>{convodetailed[0].info[0].college}</p>
                        <hr style = {{width:'105%', position:"relative", left:"-16px",marginTop:'12px'}}></hr></div>
                        <div style = {{height : '250px', paddingTop:'10px', overflow:'auto',marginTop: '10px'}}>
                            {console.log(convodetailed[0].messages[0].fromId)}
                            {convodetailed[0].messages.map((data,index) => {
                                if(data.fromId===this.state.studentId){
                                    return(
                                    <div>
                                    <div style={{display:'flex',flexWrap:'row wrap', alignItems:'flex-start',float:'right'}}>
                                        <div style={{backgroundColor:'#e6f0f',marginRight:'10px'}}>{data.message}</div>
                                    </div><br/></div>)
                                }
                                else{
                                    return(
                                    <div style={{display:'flex',flexWrap:'row wrap', alignItems:'flex-end'}}>
                                        <Avatar src={convodetailed[0].info[0].image} style={{height:'25px',width:'25px'}}></Avatar>
                                        <div style={{paddingLeft:'10px'}}>{data.message}</div>
                                    </div>)
                                }
                            })}
                        </div>
                        <hr style = {{width:'105%', position:"relative", left:"-16px",marginTop:'12px'}}></hr>
                        <textarea onChange = {this.inputChangeHandler} name = "messagetext" value = {this.state.messagetext} style = {{border:'solid .75px #cccccc', borderColor:'', borderRadius:'2px', width:'90%', marginLeft:'20px',resize:'none'}} height = '50'/>
                        <SendRoundedIcon onClick={()=>this.sendMessage(convodetailed[0].info[0]._id)} fontSize='large' style={{position:'relative',top:'5px',left:'5px',backgroundColor:'#1569e0',color:'white',borderRadius:'110%'}}></SendRoundedIcon>
                   
                    </div>
                )}
            }
        }
        return (
            <div>
                <div style={{ paddingLeft: '5%', paddingRight: '5%', fontFamily: 'Arial' }}>
                
                <div style={{ padding: '0px 0px 16px' }}>
                    <div class="col-md-4" style={{ paddingRight: '5px' }}>
                        <Card style ={{width:'101%', borderRadius:'0px'}}>
                            <CardContent>
                                <h4 style = {{fontFamily : "Arial",fontWeight:"700", fontSize : '18px', textAlign:'center'}}>Messages</h4>
                                <hr style = {{width:'200%', position:"relative", left:"-50px"}}></hr>
                                {conversations}
                            </CardContent>
                        </Card>
                    </div>
                    <div class="col-md-8" style={{ padding: '0px', marginBottom:'30px'}}>
                        <Card style ={{borderRadius:'0px', height:'420px'}}>
                            <CardContent>
                                {detailedconvo}
                            </CardContent>
                        </Card>
                    </div>
                </div>
                </div>
            </div>
        )
    }


}

// export default Messages;
const mapStateToProps = state => {
    console.log(state.messagelist)
    
    return {

        messagelist:state.messagelist

    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
        fetchConversations: payload => dispatch(fetchConversations(payload))
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Messages);