import React, { Component } from 'react';
import axios from '../../axios';
import Courses from '../../components/Courses/Courses';
import './JobDesc.css';


class JobDesc extends Component {

    state = {
        jobDescValue: '',
        courses: null,
        coursesChosen: null,
        showCourses: false,
        hasError:false
    }
    //get all course details from db
    componentDidMount() {

        axios.get('/courses.json')
            .then(response => {
                this.setState({ courses: response.data });
                console.log(this.state.courses);
            })
            .catch(error => {this.setState({hasError:true})});

    }

    //Handler to match courses in the job description and route to skills page
    findCoursesHandler = (e) => {
        e.preventDefault();
        if (this.state.hasError){
            alert("Network Error! Please try agin later.");
            return false;
        }
        const courses = this.state.courses;
        const course = Object.keys(courses);
        const description = this.state.jobDescValue.toLowerCase();

        const coursesChosen = [];
        console.log(course);
        for (var c = 0; c < course.length; c++) {
            var skill = course[c].toLowerCase();
            if (description.search(skill) > -1) {
                coursesChosen.push({ name: course[c], link: courses[course[c]] });
            }
        }

        console.log(coursesChosen);
        this.setState({ coursesChosen: coursesChosen });
        this.setState({ showCourses: true });


        // this.props.history.replace('/courses');



    }

    render() {
        // for (let ingredientName in props.ingredients){
        //     ingredients.push({name:ingredientName,amount:props.ingredients[ingredientName]})
        // }

        // let courseOutput=null;
        // if (this.state.showCourses) {
        //      courseOutput = this.state.coursesChosen.map(ig => {
        //         return <span style={{
        //             textTransform: 'capitalize',
        //             display: 'block',
        //             margin: '0 8px',
        //             border: '1px solid #ccc',
        //             padding: '15px'
        //         }}
        //             key={ig.name}><strong>{ig.name} : </strong> <a href={ig.link}>{ig.link}</a></span>
        //     });
        // }
        let linkDisabled=true;
        let title='<-- Please paste Job Description. ';
        if (this.state.jobDescValue.length!==0){
            linkDisabled=false;
            title='';
        }
             
        return (
            <React.Fragment>
            <div className="Main">


            <div className="JobDesc">
            
            <textarea placeholder="Paste job description here." value={this.state.jobDescValue} onChange={(event) => this.setState({ jobDescValue: event.target.value })}></textarea>
             
             <a href='/' title={title} onClick={this.findCoursesHandler} style={linkDisabled ? {pointerEvents: "none",background:"#808080"} : null}>
            <span>Find Courses</span></a>
           
            </div>
           
                <div className="CourseOutput">
                {/* {courseOutput} */}
                <Courses show={this.state.showCourses} coursesChosen={this.state.coursesChosen}/>
                </div>
              
              </div>
              
            </React.Fragment>
        );
    }
}
export default JobDesc;