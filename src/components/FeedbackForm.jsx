import { useContext, useState, useEffect } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RaitingSelect from "./RaitingSelect";
import FeedbackContext from "../context/FeedbackCondex";

function FeedbackForm({handaleAdd}){
 const [text, setText] = useState('');
 const [btnDisabled, setBtnDisabled] = useState(true);
 const [message, setMessage] = useState('');
 const [rating, setRating] = useState(10);

 const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

 useEffect(()=>{
    if (feedbackEdit.edit === true) {
        setBtnDisabled(false)
        setText(feedbackEdit.item.text)
        setRating(feedbackEdit.item.rating)
    }
 }, [feedbackEdit]) 

 const handaleTextChange = (e) => {
    if(text === ''){
        setBtnDisabled(true)
        setMessage(null)
    }else if(text !== '' && text.trim().length <= 10){
        setMessage('Text must be at least 10 characters')
        setBtnDisabled(true)
    }else {
        setMessage(null)
        setBtnDisabled(false)
    }

    setText(e.target.value);
 }

 const handleSubmit = (e) => {
    e.preventDefault()
    if(text.trim().length > 10){
        const newFeedback = {
            text,
            rating,
        } 

        console.log(feedbackEdit, feedbackEdit.edit);

        if(feedbackEdit.edit === true){
            updateFeedback(feedbackEdit.item.id, newFeedback)
        }else{
            addFeedback(newFeedback)
        }

        // addFeedback(newFeedback)

        setText('')
    }
 }

    return(
        <Card>
         <form  onSubmit={handleSubmit}>

            <h2>How would you rate your service with us?</h2>
              <RaitingSelect select={(rating) => setRating(rating)}></RaitingSelect>

            <div className="input-group">
                <input 
                type="text" 
                placeholder="Write a review" 
                onChange={handaleTextChange} 
                value={text} />
                <Button 
                type="submit" 
                version='secondary' 
                isDisabled={btnDisabled}>
                    Send</Button>
            </div>

            {message && <div className="message">{message}</div>}
         </form>
        </Card>
    )
}

export default FeedbackForm