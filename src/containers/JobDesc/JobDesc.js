import React, { Component } from 'react';
import axios from '../../axios';
import Courses from '../../components/Courses/Courses';
import './JobDesc.css';


class JobDesc extends Component {

    state = {
        jobDescValue: '',
        courses: null,
        coursesChosen: null,
        linkDisabled: true,
        showCourses:false,
        hasError: false
    }
    
    //get all course details from db
    componentDidMount() {
        axios.get('/courses.json')
            .then(response => {
                this.setState({ courses: response.data });
                //console.log(this.state.courses);
            })
            .catch(error => { this.setState({ hasError: true }) });
    }


    //Handler to match courses in the job description and set state
    findCoursesHandler = (e) => {
        e.preventDefault();
        if (this.state.hasError) {
            alert("Network Error! Please try agin later.");
            return false;
        }
        const courses = this.state.courses;
        const course = Object.keys(courses);
        const description = this.state.jobDescValue.toLowerCase();
        const coursesChosen = [];
        //console.log(course);
        for (var c = 0; c < course.length; c++) {
            var skill = course[c].toLowerCase();
            if (description.search(skill) > -1) {
                coursesChosen.push({ name: course[c], link: courses[course[c]] });
            }
        }

        // console.log(coursesChosen);
        this.setState({ coursesChosen: coursesChosen });
        this.setState({ showCourses: true });
    }

    //Change event handler for job Description text area
    jobDescHandler=(e)=>{
        e.preventDefault();
        let jobDesc=e.target.value;
        this.setState({ jobDescValue: jobDesc }) ;

        // Button should be enbaled on non empty job Description value
        if (jobDesc.length !== 0) {
            this.setState({ linkDisabled: false });  
        } 
        
        // Button should be disabled and no Course output when Job Description is empty
        if (jobDesc.length === 0) {
            this.setState({ linkDisabled: true });  
            this.setState({ showCourses: false });
        } 
    }


    render() {
    
        return (
            <React.Fragment>
                <div className="Main">
                   
                    <div className="JobDesc">
                        <textarea placeholder="Paste job description here." value={this.state.jobDescValue} onChange={this.jobDescHandler}></textarea>
                        <a href='/'  onClick={this.findCoursesHandler} style={this.state.linkDisabled ? { pointerEvents: "none", background: "#808080" } : null}>
                            <span>Find Courses</span></a>
                    </div>

                    <div className="CourseOutput">
                        {/* {courseOutput} */}
                        <Courses show={this.state.showCourses} coursesChosen={this.state.coursesChosen} />
                    </div>

                </div>
            </React.Fragment>
        );
    }
}
export default JobDesc;