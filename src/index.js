import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import './index.css';
 
 const MyTextInput = ({ label, ...props }) => {
   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
   // which we can spread on <input>. We can use field meta to show an error
   // message if the field is invalid and it has been touched (i.e. visited)
   const [field, meta] = useField(props);
   return (
     <>
       <label htmlFor={props.id || props.name}>{label}</label>
       <input className="text-input" {...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </>
   );
 };
 
 const MyCheckbox = ({ children, ...props }) => {
   // React treats radios and checkbox inputs differently other input types, select, and textarea.
   // Formik does this too! When you specify `type` to useField(), it will
   // return the correct bag of props for you
   const [field, meta] = useField({ ...props, type: 'checkbox' });
   return (
     <div>
       <label className="checkbox">
         <input type="checkbox" {...field} {...props} />
         {children}
       </label>
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </div>
   );
 };

 const MyRadio = ({ children, ...props }) => {
    // React treats radios and checkbox inputs differently other input types, select, and textarea.
    // Formik does this too! When you specify `type` to useField(), it will
    // return the correct bag of props for you
    const [field, meta] = useField({ ...props, type: 'radio' });
    return (
      <div>
        <label className="radio">
          <input type="radio" {...field} {...props} />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };
 
 const MySelect = ({ label, ...props }) => {
   const [field, meta] = useField(props);
   return (
     <div>
       <label htmlFor={props.id || props.name}>{label}</label>
       <select {...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </div>
   );
 };

 const showInfo = () => {

  
 }
 
 // And now we can use these
 const SignupForm = () => {
   return (
     <>
       <h1>Minimal Sociodemographic Info</h1>
       <Formik
         initialValues={{
           firstName: '',
           lastName: '',
           acceptedTerms: false, // added for our checkbox
           racialEthnic: '', // added for our select
         }}
         validationSchema={Yup.object({
           firstName: Yup.string()
             .max(15, 'Must be 15 characters or less')
             .required('Required'),
           lastName: Yup.string()
             .max(20, 'Must be 20 characters or less')
             .required('Required'),
           gender: Yup.string()
             .oneOf(
               ['boy', 'girl', 'other'],
               'Invalid selection'
             )
             .required('Required'),
           school: Yup.string()
             .max(100, 'Must be 100 characters or less')
             .required('Required'),
            grade: Yup.mixed()
             .oneOf(
               ['4', '5', '6', '7', '8', 'other'],
               'Invalid selection'
             )
             .required('Required'),
            racialEthnic:  Yup.array().of( 
              Yup.string().oneOf(
                ['white', 'black', 'latino', 'asian', 'amerindian', 'pacific', 'other'],
                'Invalid racial/ethnic selection')
            )
              .required('Please select at least one racial/ethnic background.'),
            languagesYou:  Yup.array().of( 
                Yup.string().oneOf(
                  ['spanish', 'arabic', 'chinese', 'english', 'other'],
                  'Invalid language selection')
              )
                .required('Please select at least one language.'),

         })}
         onSubmit={(values, { setSubmitting }) => {
           setTimeout(() => {
             alert(JSON.stringify(values, null, 2));
             setSubmitting(false);
           }, 400);
         }}
       >
         <Form>
            <div>
           <MyTextInput
             label="First Name"
             name="firstName"
             type="text"
             placeholder="Jane"
           /> 
           </div>
           <div>
           <MyTextInput
             label="Last Name"
             name="lastName"
             type="text"
             placeholder="Doe"
           />
           </div>
           <div>
           <label>Gender: </label>
            <MyRadio type="radio" name="gender" value="boy"> Boy </MyRadio>
            <MyRadio type="radio" name="gender" value="girl"> Girl </MyRadio>
            <MyRadio type="radio" name="gender" value="other"> Other </MyRadio>

           </div>
           <div>
           <MyTextInput
             label="What is your school's name?"
             name="school"
             type="text"
             placeholder=""
           />
           </div>
           <div>
           <MySelect label="What grade are you in?" name="grade">
             <option value="">Select a grade level</option>
             <option value="4">4</option>
             <option value="5">5</option>
             <option value="6">6</option>
             <option value="7">7</option>
             <option value="8">8</option>
             <option value="other">Other</option>
           </MySelect>
           </div>
           <div style={{ display: showInfo ? "block" : "none" }}> 
           <MyTextInput
             label="Other"
             name="school-other"
             type="text"
             placeholder=""
           />
           </div>
           <div>
           <MyTextInput
             label="What is the name of your homeroom teacher?"
             name="teacher"
             type="text"
             placeholder=""
           />
           </div>
          <div><label htmlFor="racialEthnic">What is your racial/ethnic background (Please check all that apply)?</label>
           <MyCheckbox 
            multiple={true} 
            value="white" 
            name="racialEthnic">White</MyCheckbox>
           <MyCheckbox multiple={true}
            value="black" 
            name="racialEthnic">Black or African American
            </MyCheckbox>
            <MyCheckbox multiple={true} 
            value="latino" 
            name="racialEthnic">Hispanic or Latino
            </MyCheckbox>
            <MyCheckbox multiple={true} 
            value="asian" 
            name="racialEthnic">Asian
            </MyCheckbox>
            <MyCheckbox multiple={true} 
            value="amerindian" 
            name="racialEthnic">American Indian or Alaska Native
            </MyCheckbox>
            <MyCheckbox multiple={true} 
            value="pacific" 
            name="racialEthnic">Native Hawaiian or Other Pacific Islander
            </MyCheckbox>
            <MyCheckbox multiple={true} 
            value="other" 
            name="racialEthnic">Other
            </MyCheckbox>
           </div>
           <div><label htmlFor="languagesYou">What language or languages do <strong>you</strong> speak at home (Please check all that apply)? </label>
           <MyCheckbox 
            multiple={true} 
            value="spanish" 
            name="languagesYou">Spanish</MyCheckbox>
           <MyCheckbox multiple={true} 
            value="arabic" 
            name="languagesYou">Arabic
            </MyCheckbox>
            <MyCheckbox multiple={true} 
            value="chinese" 
            name="languagesYou">Chinese
            </MyCheckbox>
            <MyCheckbox multiple={true} 
            value="english" 
            name="languagesYou">English
            </MyCheckbox>
            <MyCheckbox multiple={true} 
            value="other" 
            name="languagesYou">Other
            </MyCheckbox>
           </div>
           <div><label htmlFor="languagesHome">What language or languages do <strong>people in your home</strong> speak (Please check all that apply)?</label>
           <MyCheckbox 
            multiple={true} 
            value="spanish" 
            name="languagesHome">Spanish</MyCheckbox>
           <MyCheckbox multiple={true} 
            value="arabic" 
            name="languagesHome">Arabic
            </MyCheckbox>
            <MyCheckbox multiple={true} 
            value="chinese" 
            name="languagesHome">Chinese
            </MyCheckbox>
            <MyCheckbox multiple={true} 
            value="english" 
            name="languagesHome">English
            </MyCheckbox>
            <MyCheckbox multiple={true} 
            value="other" 
            name="languagesHome">Other
            </MyCheckbox>
           </div>
           <button type="submit">Submit</button>
         </Form>
       </Formik>
     </>
   );
 };

 ReactDOM.render(<SignupForm />, document.getElementById('root'));