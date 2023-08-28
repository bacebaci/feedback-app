 import {motion, AnimatePresence} from 'framer-motion';
 import { useContext } from 'react';

 import FeedbackItem from "./Feedbackitem";
 import FeedbackContext from '../context/FeedbackCondex';

function FeedbackList(){

    const {feedback} = useContext(FeedbackContext)
  
    if (!feedback || feedback.length === 0){
        return <p>No Feedback Yet</p>
    }

    return(
        <div className="feedback-list">
            <AnimatePresence>
            {feedback.map((item => (
                <motion.div 
                key={item.id}
                initial={{opacity: 0}}
                animate={{opacity:1}}
                exit={{opacity: 0}}
                >
             <FeedbackItem key={item.id} item={item} ></FeedbackItem>
             </motion.div>
              )))}
          </AnimatePresence>
        </div>
    )

//     return(
//         <div className="feedback-list">
// {feedback.map((item => (
//   <FeedbackItem key={item.id} item={item} handaleDelete={handaleDelete}></FeedbackItem>
// )))}
//         </div>
//     )
}




export default FeedbackList;